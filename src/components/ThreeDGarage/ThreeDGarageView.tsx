import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  RotateCcw,
  Eye,
  ChevronDown,
  ChevronUp,
  X,
  Volume2,
  Sparkles,
  Layers,
  Camera,
  Play,
  Pause,
  Compass,
  CheckCircle2,
  Calendar,
  Loader2
} from 'lucide-react';
import { loadRealSupercar, CAR_HOTSPOTS, HotspotData, LoadedCarResult } from './CarModel';
import { DynamicCar } from '../../types/database';
import { playEngineRev } from '../../utils/engineAudio';

interface ThreeDGarageViewProps {
  cars: DynamicCar[];
  selectedCarId?: string;
  onClose?: () => void;
  onBookDrive?: (car: DynamicCar) => void;
}

type CameraPreset = 'front' | 'rear' | 'left' | 'right' | 'top' | 'interior' | 'cinematic';

export const ThreeDGarageView: React.FC<ThreeDGarageViewProps> = ({
  cars,
  selectedCarId,
  onClose,
  onBookDrive
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const validCars = (Array.isArray(cars) ? cars : []).filter(Boolean);
  const [activeCarId, setActiveCarId] = useState<string>(
    selectedCarId || (validCars[0]?.id ?? 'porsche-911-carrera-gts')
  );

  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front');
  const [isCinematicOrbit, setIsCinematicOrbit] = useState(false);
  const [explodedProgress, setExplodedProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [currentColorHex, setCurrentColorHex] = useState('#d11c1c'); // Default to Rosso Corsa
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [loadProgress, setLoadProgress] = useState(15);
  const [loadError, setLoadError] = useState<string | null>(null);

  const activeCar = validCars.find((c) => c?.id === activeCarId) || validCars[0] || {
    id: 'porsche-911-carrera-gts',
    name: '911 Carrera GTS',
    brand: 'Porsche',
    year: 2025,
    price: 164900,
    mileage: 'Delivery Miles',
    fuelType: 'Twin-Turbo Flat-6',
    transmission: '8-Speed PDK',
    category: 'Sports Cars',
    horsepower: 532,
    topSpeed: '194 mph',
    acceleration: '2.9 s',
    engine: '3.6L Twin-Turbo Boxer 6',
    torque: '449 lb-ft',
    image: '/src/assets/images/car_porsche_911_1794232800353.jpg',
    gallery: [],
    features: ['Chrono Package', 'Sport Exhaust', 'PASM Active Suspension'],
    availabilityStatus: 'Available',
    featured: true,
    description: 'The definitive rear-engine benchmark sports car.',
    soundPreset: 'flat6'
  };

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const loadedCarRef = useRef<LoadedCarResult | null>(null);
  const updateExplodedFnRef = useRef<((progress: number) => void) | null>(null);
  const updateColorFnRef = useRef<((hex: string) => void) | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Target camera coordinates for smooth exponential damping
  const targetCamPos = useRef(new THREE.Vector3(3.2, 1.4, 3.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.45, 0.1));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.45, 0.1));

  // Mouse / Touch rotation control state
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const orbitAngle = useRef({ theta: 0.75, phi: 0.38, radius: 4.8 });

  // Camera presets coordinates calibrated for real supercar proportions
  const CAMERA_PRESETS: Record<CameraPreset, { pos: THREE.Vector3; lookAt: THREE.Vector3 }> = {
    front: { pos: new THREE.Vector3(2.8, 1.25, 3.2), lookAt: new THREE.Vector3(0, 0.42, 0.2) },
    rear: { pos: new THREE.Vector3(-2.8, 1.2, -3.2), lookAt: new THREE.Vector3(0, 0.45, -0.3) },
    left: { pos: new THREE.Vector3(-4.4, 1.05, 0), lookAt: new THREE.Vector3(0, 0.45, 0) },
    right: { pos: new THREE.Vector3(4.4, 1.05, 0), lookAt: new THREE.Vector3(0, 0.45, 0) },
    top: { pos: new THREE.Vector3(0.01, 5.2, 0.1), lookAt: new THREE.Vector3(0, 0.2, 0) },
    interior: { pos: new THREE.Vector3(-0.35, 0.88, 0.05), lookAt: new THREE.Vector3(-0.35, 0.82, 0.9) },
    cinematic: { pos: new THREE.Vector3(3.6, 1.4, 3.6), lookAt: new THREE.Vector3(0, 0.45, 0) }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene setup with studio depth
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060608);
    scene.fog = new THREE.Fog(0x060608, 8, 26);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(3.2, 1.4, 3.4);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic Tone Mapping and PBR Environment
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Photorealistic Environment Lighting (RoomEnvironment per Three.js skill)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 5. Studio 3-Point Lighting Rig with Softbox Panels
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x141420, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4.5, 5.5, 4.0);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 16;
      keyLight.shadow.camera.left = -4.5;
      keyLight.shadow.camera.right = 4.5;
      keyLight.shadow.camera.top = 4.5;
      keyLight.shadow.camera.bottom = -4.5;
    }
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Dynamic Crimson Rim Lighting
    const rimLight = new THREE.DirectionalLight(0xe10600, 1.4);
    rimLight.position.set(-4.5, 3.2, -4.5);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xcad4e0, 0.9);
    fillLight.position.set(-3.5, 3.5, 3.5);
    scene.add(fillLight);

    // Glowing Ceiling Softbox Arrays
    const softboxGeom = new THREE.PlaneGeometry(3.6, 8.5);
    const softboxMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const softbox = new THREE.Mesh(softboxGeom, softboxMat);
    softbox.position.set(0, 4.8, 0);
    softbox.rotation.x = Math.PI / 2;
    scene.add(softbox);

    // Subtle Architectural Red LED Runway Strip
    const ledGeom = new THREE.PlaneGeometry(0.04, 18);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xe10600, side: THREE.DoubleSide });
    const ledLeft = new THREE.Mesh(ledGeom, ledMat);
    ledLeft.rotation.x = Math.PI / 2;
    ledLeft.position.set(-4.2, 0.01, 0);
    const ledRight = new THREE.Mesh(ledGeom, ledMat);
    ledRight.rotation.x = Math.PI / 2;
    ledRight.position.set(4.2, 0.01, 0);
    scene.add(ledLeft, ledRight);

    // 6. Polished Showroom Floor with Reflective Precision Grid
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fCtx = floorCanvas.getContext('2d')!;
    fCtx.fillStyle = '#08080b';
    fCtx.fillRect(0, 0, 512, 512);
    // Draw precision architectural showroom lines
    fCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    fCtx.lineWidth = 1;
    for (let i = 0; i < 512; i += 64) {
      fCtx.beginPath();
      fCtx.moveTo(i, 0);
      fCtx.lineTo(i, 512);
      fCtx.stroke();
      fCtx.beginPath();
      fCtx.moveTo(0, i);
      fCtx.lineTo(512, i);
      fCtx.stroke();
    }
    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(16, 16);

    const floorGeom = new THREE.PlaneGeometry(70, 70);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.12,
      metalness: 0.88
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // 7. Load Real 3D Supercar Model (.GLB)
    setIsLoadingModel(true);
    let carModelGroup: THREE.Group | null = null;
    const hotspotMarkers: THREE.Group[] = [];

    loadRealSupercar(
      '/models/car.glb',
      currentColorHex,
      (percent) => setLoadProgress(percent)
    )
      .then((loadedResult) => {
        loadedCarRef.current = loadedResult;
        carModelGroup = loadedResult.modelGroup;
        scene.add(carModelGroup);
        updateExplodedFnRef.current = loadedResult.updateExplodedView;
        updateColorFnRef.current = loadedResult.updateBodyColor;

        // Attach Precision 3D Hotspot Markers
        CAR_HOTSPOTS.forEach((spot) => {
          const hGroup = new THREE.Group();
          hGroup.position.copy(spot.position);

          const sphereGeom = new THREE.SphereGeometry(0.065, 16, 16);
          const sphereMat = new THREE.MeshBasicMaterial({ color: 0xe10600 });
          const sphere = new THREE.Mesh(sphereGeom, sphereMat);

          const ringGeom = new THREE.RingGeometry(0.075, 0.1, 16);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85
          });
          const ring = new THREE.Mesh(ringGeom, ringMat);
          ring.rotation.x = -Math.PI / 2;

          hGroup.add(sphere, ring);
          hGroup.userData = { hotspot: spot };
          carModelGroup!.add(hGroup);
          hotspotMarkers.push(hGroup);
        });

        setIsLoadingModel(false);
      })
      .catch((err) => {
        console.error('Failed to load real supercar:', err);
        setLoadError('Real 3D model loading failed. Please ensure /models/car.glb is present.');
        setIsLoadingModel(false);
      });

    // 8. Animation & Damping Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Automated Cinematic Orbit Mode
      if (isCinematicOrbit) {
        orbitAngle.current.theta += delta * 0.25;
        const r = orbitAngle.current.radius;
        const t = orbitAngle.current.theta;
        const p = orbitAngle.current.phi;
        targetCamPos.current.set(
          r * Math.sin(t) * Math.cos(p),
          r * Math.sin(p) + 0.3,
          r * Math.cos(t) * Math.cos(p)
        );
      }

      // Smooth exponential camera damping
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.055);
        currentLookAt.current.lerp(targetLookAt.current, 0.055);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Hotspots gentle bobbing
      hotspotMarkers.forEach((m, idx) => {
        m.position.y = CAR_HOTSPOTS[idx].position.y + Math.sin(time * 0.0035 + idx) * 0.025;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Mouse / Touch Drag Orbiting
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      setIsCinematicOrbit(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevPointer.current.x;
      const deltaY = clientY - prevPointer.current.y;
      prevPointer.current = { x: clientX, y: clientY };

      orbitAngle.current.theta -= deltaX * 0.007;
      orbitAngle.current.phi = Math.max(0.08, Math.min(Math.PI / 2.15, orbitAngle.current.phi + deltaY * 0.007));

      const r = orbitAngle.current.radius;
      const t = orbitAngle.current.theta;
      const p = orbitAngle.current.phi;

      targetCamPos.current.set(
        r * Math.sin(t) * Math.cos(p),
        r * Math.sin(p) + 0.3,
        r * Math.cos(t) * Math.cos(p)
      );
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsCinematicOrbit(false);
      orbitAngle.current.radius = Math.max(2.2, Math.min(8.5, orbitAngle.current.radius + e.deltaY * 0.004));
      const r = orbitAngle.current.radius;
      const t = orbitAngle.current.theta;
      const p = orbitAngle.current.phi;

      targetCamPos.current.set(
        r * Math.sin(t) * Math.cos(p),
        r * Math.sin(p) + 0.3,
        r * Math.cos(t) * Math.cos(p)
      );
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domElement.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);
      loadedCarRef.current?.cleanup();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [isCinematicOrbit]);

  // Sync Exploded View Real Component Separation
  useEffect(() => {
    if (updateExplodedFnRef.current) {
      updateExplodedFnRef.current(explodedProgress);
    }
  }, [explodedProgress]);

  // Sync Dynamic PBR Body Color
  const handleColorChange = (hex: string) => {
    setCurrentColorHex(hex);
    if (updateColorFnRef.current) {
      updateColorFnRef.current(hex);
    }
  };

  // Camera Presets
  const applyCameraPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    if (preset === 'cinematic') {
      setIsCinematicOrbit(true);
      return;
    }
    setIsCinematicOrbit(false);
    const coords = CAMERA_PRESETS[preset];
    if (coords) {
      targetCamPos.current.copy(coords.pos);
      targetLookAt.current.copy(coords.lookAt);
      orbitAngle.current.radius = coords.pos.distanceTo(coords.lookAt);
    }
  };

  const handleRevAudio = () => {
    playEngineRev(activeCar.soundPreset || 'v8twin');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Mounting Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {isLoadingModel && (
        <div className="absolute inset-0 z-40 bg-neutral-950 flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin mb-6" />
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 mb-2">
            PBR Photorealistic Engine
          </div>
          <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white mb-2">
            STREAMING 3D SUPERCAR ASSET
          </h3>
          <p className="text-xs text-neutral-400 max-w-sm text-center mb-6">
            Decompressing Draco mesh geometry, compiling physical clearcoat shaders, and calibrating studio environment reflections.
          </p>
          <div className="w-64 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-red-600 transition-all duration-300 rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-[11px] font-mono-numbers text-neutral-500 mt-2">
            {loadProgress}% Loaded
          </span>
        </div>
      )}

      {/* Error Fallback Notice */}
      {loadError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl glass-panel border border-red-500/50 text-white shadow-2xl">
          <p className="text-xs font-semibold text-red-400">{loadError}</p>
        </div>
      )}

      {/* Top Header Overlay: Minimalist Branding & Quick Car Selector */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Showroom Tag */}
        <div className="glass-panel py-2 px-4 rounded-xl flex items-center gap-3 pointer-events-auto border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
              Photorealistic 3D Showroom
            </div>
            <div className="font-display font-black text-base text-white tracking-wider">
              {activeCar.brand} {activeCar.name}
            </div>
          </div>
        </div>

        {/* Center / Right: Car Switcher & Exit */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Quick Model Selector Dropdown */}
          <select
            value={activeCarId}
            onChange={(e) => setActiveCarId(e.target.value)}
            className="glass-panel text-xs font-semibold uppercase tracking-wider text-white py-2.5 px-3 rounded-xl border border-white/15 focus:outline-none cursor-pointer"
          >
            {validCars.map((c) => (
              <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                {c.brand} {c.name} (${(c.price || 0).toLocaleString()})
              </option>
            ))}
          </select>

          {/* Ignition Rev Audio */}
          <button
            onClick={handleRevAudio}
            title="Ignition throttle audio"
            className="p-2.5 rounded-xl glass-panel border border-white/15 text-neutral-300 hover:text-white hover:border-red-500 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-red-500" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Exit 3D Garage"
              className="p-2.5 rounded-xl glass-panel border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Hotspots Clickable Quick-Bar (Top Right Floating) */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto max-w-[210px]">
        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 px-1">
          Mechanical Hotspots
        </div>
        {CAR_HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setActiveHotspot(spot)}
            className={`text-left text-xs py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
              activeHotspot?.id === spot.id
                ? 'bg-red-600/90 border-red-500 text-white font-bold shadow-lg'
                : 'glass-panel-subtle border-white/10 text-neutral-300 hover:text-white hover:border-white/30'
            }`}
          >
            {spot.name}
          </button>
        ))}
      </div>

      {/* Active Hotspot Information Panel (Floating Upper Left) */}
      {activeHotspot && (
        <div className="absolute top-20 left-4 z-30 w-84 glass-panel rounded-2xl p-5 border border-red-500/40 text-white shadow-2xl animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                {activeHotspot.category} System
              </span>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-display font-bold text-base text-white mb-2">
            {activeHotspot.name}
          </h4>
          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            {activeHotspot.description}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-white/5">
            {activeHotspot.specs.map((spec, i) => (
              <div key={i} className="text-[11px] font-mono-numbers text-neutral-300 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-500" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UNIFIED COLLAPSIBLE BOTTOM DOCK (Zero Viewport Occlusion per Three.js skill §5) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-out w-full max-w-4xl px-4 pointer-events-auto ${
          isDockCollapsed ? 'bottom-[-165px]' : 'bottom-6'
        }`}
      >
        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="glass-panel py-1 px-4 rounded-t-lg border-t border-x border-white/15 text-[11px] font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-red-500" />
                <span>Show Configurator Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Cinema View / Hide Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Camera Perspectives (5 cols) */}
            <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-red-500" />
                  <span>Perspective Presets</span>
                </span>
                {isCinematicOrbit && (
                  <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                    <Compass className="w-3 h-3 animate-spin" />
                    Auto-Orbit
                  </span>
                )}
              </div>
              <div className="grid grid-cols-7 gap-1 text-[10px] font-semibold">
                {(['front', 'rear', 'left', 'right', 'top', 'interior', 'cinematic'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => applyCameraPreset(preset)}
                    className={`py-1.5 rounded uppercase tracking-wider text-center transition-all cursor-pointer ${
                      cameraPreset === preset
                        ? 'bg-red-600 text-white font-bold shadow'
                        : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {preset === 'interior' ? 'Inside' : preset === 'cinematic' ? 'Orbit' : preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Real Exploded View Slider (3 cols) */}
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:px-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-red-500" />
                  <span>Exploded Architecture</span>
                </span>
                <span className="font-mono-numbers text-red-400">
                  {Math.round(explodedProgress * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedProgress}
                  onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
                  className="w-full accent-red-600 bg-neutral-900 h-1.5 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setExplodedProgress(explodedProgress > 0.5 ? 0 : 1)}
                  className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-neutral-900 border border-white/15 text-neutral-300 hover:text-white shrink-0 cursor-pointer"
                >
                  {explodedProgress > 0.5 ? 'Reset' : 'Explode'}
                </button>
              </div>
            </div>

            {/* Finish & Action Hub (4 cols) */}
            <div className="md:col-span-4 md:pl-3 flex items-center justify-between gap-3">
              {/* PBR Paint Swatches */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Bespoke PBR Finish
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { hex: '#d11c1c', label: 'Rosso Corsa' },
                    { hex: '#c0c0c8', label: 'GT Silver' },
                    { hex: '#141416', label: 'Nero Black' },
                    { hex: '#1b4332', label: 'Racing Green' },
                    { hex: '#0a3d62', label: 'Cobalt Blue' },
                    { hex: '#e5a912', label: 'Giallo Modena' }
                  ].map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => handleColorChange(c.hex)}
                      title={c.label}
                      className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                        currentColorHex === c.hex ? 'border-red-500 scale-125 ring-2 ring-red-500/40' : 'border-white/30 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Book Drive CTA */}
              {onBookDrive && (
                <button
                  onClick={() => onBookDrive(activeCar)}
                  className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/60 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Drive</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
