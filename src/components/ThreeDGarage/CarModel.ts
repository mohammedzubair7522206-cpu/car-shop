import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export interface HotspotData {
  id: string;
  name: string;
  category: string;
  position: THREE.Vector3;
  description: string;
  specs: string[];
}

// Precision 3D Hotspot Coordinates calibrated to the real supercar GLB model
export const CAR_HOTSPOTS: HotspotData[] = [
  {
    id: 'engine',
    name: 'Mid-Rear V8 Bi-Turbo Powertrain',
    category: 'Mechanical',
    position: new THREE.Vector3(0, 0.72, -0.65),
    description: '3.9L 90-degree Twin-Turbocharged V8 with flat-plane crankshaft, dry-sump lubrication, and zero-turbo-lag anti-lag turbine technology.',
    specs: ['710 Horsepower @ 8,000 RPM', '568 lb-ft Torque @ 3,000 RPM', 'Titanium Connecting Rods', 'Ion-Sensing Knock Detection']
  },
  {
    id: 'brakes',
    name: 'Brembo® Carbon-Ceramic Brakes',
    category: 'Chassis',
    position: new THREE.Vector3(0.94, 0.35, 1.25),
    description: 'Track-derived carbon-ceramic composite discs with 6-piston monobloc aluminum calipers, cooling ducts, and anti-fade compound.',
    specs: ['398mm Front / 360mm Rear Rotors', 'Monobloc 6-Piston Calipers', 'Zero Thermal Degradation', 'Integrated Brake Cooling Ducts']
  },
  {
    id: 'wheels',
    name: 'Forged Monoblock Alloy Wheels',
    category: 'Aerodynamics',
    position: new THREE.Vector3(0.96, 0.35, -1.25),
    description: 'Aerospace-grade 6061-T6 forged aluminum wheels wrapped in bespoke ultra-high performance Michelin Pilot Sport Cup 2 tires.',
    specs: ['20" x 9J Front / 20" x 11J Rear', 'Michelin Pilot Sport Cup 2 (305/30 ZR20)', 'Center-Locking Nut Technology', '-18.5 kg Unsprung Mass']
  },
  {
    id: 'headlights',
    name: 'Adaptive Full-LED Matrix Optics',
    category: 'Lighting',
    position: new THREE.Vector3(0.62, 0.58, 1.85),
    description: 'Full-LED headlights with dynamic beam leveling, signature illuminated daytime running lights, and high-intensity projector lenses.',
    specs: ['Adaptive Curve Illumination', 'High-Intensity Projector Array', 'Matte Carbon Housing', 'Integrated Side Marker LEDs']
  },
  {
    id: 'interior',
    name: 'Monocoque Cockpit & Driver Interface',
    category: 'Cockpit',
    position: new THREE.Vector3(-0.35, 0.85, 0.05),
    description: 'Driver-focused racing cockpit with carbon-fiber bucket seats, hand-stitched Italian leather, F1-style manettino steering wheel, and digital telemetry.',
    specs: ['Carbon Fiber Racing Seats', 'Alcantara® & Nappa Leather', 'F1-Derived Steering Wheel', 'Dual High-Res Driver Displays']
  },
  {
    id: 'exhaust',
    name: 'Quad Titanium Sport Exhaust',
    category: 'Exhaust',
    position: new THREE.Vector3(0, 0.38, -2.15),
    description: 'Lightweight titanium exhaust system with active bypass valves, producing an unmistakable high-pitch naturally tuned acoustic signature.',
    specs: ['Grade-5 Titanium Alloy', 'Pneumatic Active Exhaust Flaps', 'Dual Helmholtz Resonators', 'Thermal Barrier Ceramic Coating']
  },
  {
    id: 'splitter',
    name: 'Active Aerodynamic S-Duct & Diffuser',
    category: 'Aero',
    position: new THREE.Vector3(0, 0.22, 2.1),
    description: 'Patented S-Duct hood system and front carbon air splitter generating over 390 kg of downforce at 155 mph with minimal drag.',
    specs: ['390 kg Downforce @ 250 km/h', 'Pre-Preg Carbon Fiber Splitter', 'Underbody Vortex Generators', 'Active Rear Carbon Diffuser']
  }
];

export interface LoadedCarResult {
  modelGroup: THREE.Group;
  updateBodyColor: (hex: string) => void;
  updateExplodedView: (progress: number) => void;
  cleanup: () => void;
}

/**
 * Loads the real, authentic 3D supercar GLB model with full PBR materials and Draco decompression.
 * Replaces any block or cube geometry with true curved automotive meshes.
 */
export async function loadRealSupercar(
  modelUrl: string = '/models/car.glb',
  initialColorHex: string = '#c0c0c8',
  onProgress?: (percent: number) => void
): Promise<LoadedCarResult> {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  return new Promise((resolve, reject) => {
    gltfLoader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;
        root.name = 'real_supercar_root';

        // 1. Physically Based PBR Materials
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(initialColorHex),
          metalness: 0.9,
          roughness: 0.12,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x0a1018),
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.92,
          transparent: true,
          opacity: 0.35,
          ior: 1.52,
          reflectivity: 0.95
        });

        const rimMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x32353e),
          metalness: 0.95,
          roughness: 0.15
        });

        const tireMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x131316),
          roughness: 0.85,
          metalness: 0.05
        });

        const carbonMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x18181c),
          metalness: 0.5,
          roughness: 0.35
        });

        const brakeCaliperMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xd11c1c),
          metalness: 0.8,
          roughness: 0.2
        });

        const brakeDiscMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x60646c),
          metalness: 0.9,
          roughness: 0.3
        });

        const headlightGlassMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0xffffff),
          transmission: 0.9,
          transparent: true,
          opacity: 0.4,
          roughness: 0.05
        });

        const headlightLedMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xffffff),
          emissive: new THREE.Color(0xe6f2ff),
          emissiveIntensity: 2.2
        });

        const taillightMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xd90429),
          emissive: new THREE.Color(0xd90429),
          emissiveIntensity: 2.5
        });

        const interiorLeatherMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x1f1f24),
          roughness: 0.75,
          metalness: 0.1
        });

        const chromeMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xffffff),
          metalness: 1.0,
          roughness: 0.05
        });

        // Track separable components for real Exploded View
        interface ExplodedNode {
          object: THREE.Object3D;
          initialPos: THREE.Vector3;
          direction: THREE.Vector3;
        }
        const explodedNodes: ExplodedNode[] = [];

        // Traverse the real model and configure realistic materials and shadows
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const matName = child.material?.name || '';
            const nodeName = child.name?.toLowerCase() || '';

            // Apply targeted PBR materials based on real GLB material and node names
            if (matName === 'Body_Color' || nodeName.includes('body')) {
              child.material = bodyMaterial;
            } else if (matName.includes('Glass') || nodeName.includes('glass')) {
              child.material = glassMaterial;
            } else if (matName.includes('Tire') || nodeName.includes('tire')) {
              child.material = tireMaterial;
            } else if (nodeName.includes('rim') || matName.includes('metal_gray')) {
              child.material = rimMaterial;
            } else if (nodeName.includes('carbon') || matName.includes('Carbon')) {
              child.material = carbonMaterial;
            } else if (nodeName.includes('brake') || matName.includes('red')) {
              child.material = brakeCaliperMaterial;
            } else if (matName.includes('Taillight') || nodeName.includes('lights_red')) {
              child.material = taillightMaterial;
            } else if (matName.includes('Turn_Signal') || nodeName.includes('leds')) {
              child.material = headlightLedMaterial;
            } else if (matName.includes('Projector')) {
              child.material = headlightGlassMaterial;
            } else if (matName.includes('Leather') || matName.includes('Interior') || nodeName.includes('interior')) {
              child.material = interiorLeatherMaterial;
            } else if (matName.includes('chrome') || nodeName.includes('chrome')) {
              child.material = chromeMaterial;
            }
          }

          // Register separable real sub-assemblies for Exploded View
          const name = child.name?.toLowerCase() || '';
          if (name === 'wheel_fl') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(0.9, 0, 0) });
          } else if (name === 'wheel_fr') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(-0.9, 0, 0) });
          } else if (name === 'wheel_rl') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(0.9, 0, 0) });
          } else if (name === 'wheel_rr') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(-0.9, 0, 0) });
          } else if (name === 'body') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(0, 0.8, 0) });
          } else if (name === 'glass') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(0, 1.2, 0) });
          } else if (name === 'steering_wheel') {
            explodedNodes.push({ object: child, initialPos: child.position.clone(), direction: new THREE.Vector3(0, 0.4, 0.3) });
          }
        });

        // 2. Compute bounding box and center precisely on showroom floor
        const box = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.x -= center.x;
        root.position.z -= center.z;
        // Position car flush with floor
        root.position.y -= box.min.y;

        // 3. Ground Contact Shadow Plate
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const sCtx = shadowCanvas.getContext('2d')!;
        const sGrad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
        sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
        sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
        sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sCtx.fillStyle = sGrad;
        sCtx.fillRect(0, 0, 256, 256);
        const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

        const shadowPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(3.2, 5.8),
          new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            opacity: 0.85,
            depthWrite: false
          })
        );
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = 0.015; // Raised slightly above floor to prevent z-fighting
        root.add(shadowPlane);

        // Dynamic update callbacks
        const updateBodyColor = (hex: string) => {
          bodyMaterial.color.set(hex);
        };

        const updateExplodedView = (progress: number) => {
          const p = Math.max(0, Math.min(1, progress));
          explodedNodes.forEach(({ object, initialPos, direction }) => {
            object.position.x = initialPos.x + direction.x * p;
            object.position.y = initialPos.y + direction.y * p;
            object.position.z = initialPos.z + direction.z * p;
          });
        };

        const cleanup = () => {
          dracoLoader.dispose();
          root.traverse((c) => {
            if (c instanceof THREE.Mesh) {
              c.geometry?.dispose();
              if (Array.isArray(c.material)) {
                c.material.forEach((m) => m.dispose());
              } else {
                c.material?.dispose();
              }
            }
          });
        };

        resolve({
          modelGroup: root,
          updateBodyColor,
          updateExplodedView,
          cleanup
        });
      },
      (xhr) => {
        if (xhr.lengthComputable && onProgress) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          onProgress(percent);
        }
      },
      (err) => {
        console.error('Failed to load real GLB model:', err);
        dracoLoader.dispose();
        reject(err);
      }
    );
  });
}
