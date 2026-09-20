'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

export interface MotorPart3DInfo {
  id: string;
  name: string;
  assembledPos: THREE.Vector3;
  explodedPos: THREE.Vector3;
}

interface Motor3DCanvasProps {
  explodeRatio: number;
  selectedPartId: string | null;
  onSelectPart: (id: string | null) => void;
  viewAngle: 'iso' | 'front' | 'side' | 'rear' | 'top';
  autoRotate: boolean;
  onToggleAutoRotate?: () => void;
}

export function Motor3DCanvas({
  explodeRatio,
  selectedPartId,
  onSelectPart,
  viewAngle,
  autoRotate,
}: Motor3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPartName, setHoveredPartName] = useState<string | null>(null);

  // References to keep animation loop and interaction updated without re-initializing Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsGroupRef = useRef<THREE.Group | null>(null);
  const partMeshesRef = useRef<Map<string, { group: THREE.Group; assembledX: number; explodedX: number; materials: THREE.Material[] }>>(new Map());
  
  // Interaction and Orbit state
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 28,
    theta: Math.PI / 4, // Horizontal rotation
    phi: Math.PI / 3,   // Vertical angle (from top down)
  });
  const targetSphericalRef = useRef({
    radius: 28,
    theta: Math.PI / 4,
    phi: Math.PI / 3,
  });
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const explodeRatioRef = useRef(explodeRatio);
  explodeRatioRef.current = explodeRatio;

  const selectedPartIdRef = useRef(selectedPartId);
  selectedPartIdRef.current = selectedPartId;

  // Sync camera angle presets
  useEffect(() => {
    switch (viewAngle) {
      case 'iso':
        targetSphericalRef.current = { radius: 28, theta: Math.PI / 4, phi: Math.PI / 3 };
        break;
      case 'front': // Looking directly at output shaft and front yellow cover
        targetSphericalRef.current = { radius: 25, theta: 0, phi: Math.PI / 2 };
        break;
      case 'side': // Looking directly at cylinder body & branding
        targetSphericalRef.current = { radius: 28, theta: Math.PI / 2, phi: Math.PI / 2 };
        break;
      case 'rear': // Looking at yellow back cover & mounting holes
        targetSphericalRef.current = { radius: 25, theta: Math.PI, phi: Math.PI / 2 };
        break;
      case 'top': // Looking from above
        targetSphericalRef.current = { radius: 26, theta: Math.PI / 4, phi: 0.1 };
        break;
    }
  }, [viewAngle]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // 3. Renderer Setup with high-quality antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting setup: Premium Studio Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key directional light (warm white)
    const keyLight = new THREE.DirectionalLight(0xfff6dd, 2.8);
    keyLight.position.set(20, 30, 20);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Fill light (cool sky light)
    const fillLight = new THREE.DirectionalLight(0xddeeff, 1.6);
    fillLight.position.set(-20, 15, -15);
    scene.add(fillLight);

    // Warm Yellow Accent Rim Light
    const yellowRimLight = new THREE.DirectionalLight(0xfacc15, 2.2);
    yellowRimLight.position.set(0, -10, 15);
    scene.add(yellowRimLight);

    // Top soft spot
    const topLight = new THREE.PointLight(0xffffff, 1.5, 50);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    // Subtle reflective shadow plane under the motor
    const shadowGeo = new THREE.PlaneGeometry(36, 36);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -5.5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Subtle 3D grid line accents
    const gridHelper = new THREE.GridHelper(32, 16, 0xeab308, 0x888888);
    gridHelper.position.y = -5.52;
    // Set grid opacity
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.12;
    scene.add(gridHelper);

    // 5. Build 3D Motor Geometry
    const partsGroup = new THREE.Group();
    scene.add(partsGroup);
    partsGroupRef.current = partsGroup;

    // Common Materials
    const yellowAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.82,
      roughness: 0.28,
    });

    const yellowGoldMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.88,
      roughness: 0.22,
    });

    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      metalness: 0.85,
      roughness: 0.35,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.14,
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xca6f2b,
      metalness: 0.88,
      roughness: 0.3,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.78,
      roughness: 0.32,
    });

    const rotorKevlarMat = new THREE.MeshStandardMaterial({
      color: 0x1e2024,
      metalness: 0.65,
      roughness: 0.5,
    });

    const steelShaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.96,
      roughness: 0.12,
    });

    const darkPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      metalness: 0.4,
      roughness: 0.6,
    });

    const partMap = new Map<string, { group: THREE.Group; assembledX: number; explodedX: number; materials: THREE.Material[] }>();

    // Helper to register part
    const registerPart = (id: string, group: THREE.Group, assembledX: number, explodedX: number, materials: THREE.Material[]) => {
      group.userData = { partId: id };
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.userData = { partId: id };
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      partsGroup.add(group);
      partMap.set(id, { group, assembledX, explodedX, materials });
    };

    // -------------------------------------------------------------------
    // PART 1: Back Cover (Electric Yellow Anodized Aluminum Endbell)
    // -------------------------------------------------------------------
    const backCoverGroup = new THREE.Group();
    // Main endbell disc
    const backDiscGeo = new THREE.CylinderGeometry(4.3, 4.3, 1.2, 48);
    backDiscGeo.rotateZ(Math.PI / 2);
    const backDiscMesh = new THREE.Mesh(backDiscGeo, yellowAnodizedMat.clone());
    backCoverGroup.add(backDiscMesh);

    // Beveled rim
    const backBevelGeo = new THREE.CylinderGeometry(4.35, 4.1, 0.4, 48);
    backBevelGeo.rotateZ(Math.PI / 2);
    const backBevelMesh = new THREE.Mesh(backBevelGeo, yellowGoldMat.clone());
    backBevelMesh.position.x = -0.6;
    backCoverGroup.add(backBevelMesh);

    // Center bearing boss ring
    const backBossGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.5, 32);
    backBossGeo.rotateZ(Math.PI / 2);
    const backBossMesh = new THREE.Mesh(backBossGeo, graphiteMat.clone());
    backBossMesh.position.x = 0.5;
    backCoverGroup.add(backBossMesh);

    // M3 Mounting screw holes (recessed cylinders)
    const holeGeo = new THREE.CylinderGeometry(0.32, 0.32, 1.3, 16);
    holeGeo.rotateZ(Math.PI / 2);
    const holeMat = darkPlasticMat.clone();
    [-2.2, 2.2].forEach(y => {
      [-2.2, 2.2].forEach(z => {
        const hole = new THREE.Mesh(holeGeo, holeMat);
        hole.position.set(0, y, z);
        backCoverGroup.add(hole);
      });
    });

    // CNC heat dissipation grooves
    const finRingGeo = new THREE.TorusGeometry(3.2, 0.12, 12, 48);
    finRingGeo.rotateY(Math.PI / 2);
    const finRingMesh = new THREE.Mesh(finRingGeo, yellowGoldMat.clone());
    finRingMesh.position.x = -0.55;
    backCoverGroup.add(finRingMesh);

    registerPart('back-cover', backCoverGroup, -4.8, -12.5, [yellowAnodizedMat, yellowGoldMat]);

    // -------------------------------------------------------------------
    // PART 2: Rear Bearing (F684ZZ)
    // -------------------------------------------------------------------
    const rearBearingGroup = new THREE.Group();
    // Outer race
    const bearingOuterGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.6, 32);
    bearingOuterGeo.rotateZ(Math.PI / 2);
    const rearBearingOuter = new THREE.Mesh(bearingOuterGeo, chromeMat.clone());
    rearBearingGroup.add(rearBearingOuter);

    // Bearing flange
    const flangeGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.15, 32);
    flangeGeo.rotateZ(Math.PI / 2);
    const rearFlange = new THREE.Mesh(flangeGeo, chromeMat.clone());
    rearFlange.position.x = -0.28;
    rearBearingGroup.add(rearFlange);

    // Inner race
    const bearingInnerGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.65, 32);
    bearingInnerGeo.rotateZ(Math.PI / 2);
    const rearBearingInner = new THREE.Mesh(bearingInnerGeo, chromeMat.clone());
    rearBearingGroup.add(rearBearingInner);

    // Dust shield ring
    const shieldGeo = new THREE.RingGeometry(0.68, 1.35, 32);
    shieldGeo.rotateY(Math.PI / 2);
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.3 });
    const rearShieldL = new THREE.Mesh(shieldGeo, shieldMat);
    rearShieldL.position.x = -0.31;
    const rearShieldR = new THREE.Mesh(shieldGeo, shieldMat);
    rearShieldR.position.x = 0.31;
    rearBearingGroup.add(rearShieldL, rearShieldR);

    registerPart('bearing-back', rearBearingGroup, -4.1, -9.0, [chromeMat]);

    // -------------------------------------------------------------------
    // PART 3: Stator Shell (Cylinder Can with Yellow Anodized Trim Rings & Etching)
    // -------------------------------------------------------------------
    const shellGroup = new THREE.Group();
    // Main graphite tube
    const canGeo = new THREE.CylinderGeometry(4.3, 4.3, 6.2, 48, 1, true);
    canGeo.rotateZ(Math.PI / 2);
    const canMesh = new THREE.Mesh(canGeo, graphiteMat.clone());
    shellGroup.add(canMesh);

    // Yellow Anodized Bevel Rim Ring (Rear edge)
    const rimRearGeo = new THREE.TorusGeometry(4.3, 0.22, 16, 48);
    rimRearGeo.rotateY(Math.PI / 2);
    const rimRearMesh = new THREE.Mesh(rimRearGeo, yellowAnodizedMat.clone());
    rimRearMesh.position.x = -3.05;
    shellGroup.add(rimRearMesh);

    // Yellow Anodized Bevel Rim Ring (Front edge)
    const rimFrontMesh = new THREE.Mesh(rimRearGeo, yellowAnodizedMat.clone());
    rimFrontMesh.position.x = 3.05;
    shellGroup.add(rimFrontMesh);

    // Laser-etched yellow Voltrix styling bands around can
    const stripeGeo = new THREE.CylinderGeometry(4.32, 4.32, 0.2, 48, 1, true);
    stripeGeo.rotateZ(Math.PI / 2);
    const stripeMat = yellowGoldMat.clone();
    [-1.6, 1.6].forEach(xPos => {
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.x = xPos;
      shellGroup.add(stripe);
    });

    // Outer cooling flutes (ribs running along length)
    const fluteGeo = new THREE.BoxGeometry(5.8, 0.14, 0.22);
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const flute = new THREE.Mesh(fluteGeo, graphiteMat.clone());
      flute.position.set(0, Math.sin(angle) * 4.32, Math.cos(angle) * 4.32);
      flute.rotation.x = -angle;
      shellGroup.add(flute);
    }

    // VOLTRIX 3D Emblem Plate
    const badgeGeo = new THREE.BoxGeometry(2.4, 1.2, 0.15);
    badgeGeo.rotateX(Math.PI / 2);
    const badgeMesh = new THREE.Mesh(badgeGeo, yellowAnodizedMat.clone());
    badgeMesh.position.set(0, 4.35, 0);
    shellGroup.add(badgeMesh);

    registerPart('shell', shellGroup, -1.0, -4.2, [graphiteMat, yellowAnodizedMat]);

    // -------------------------------------------------------------------
    // PART 4: Vortex Hand-Wound Copper Stator Windings
    // -------------------------------------------------------------------
    const coilGroup = new THREE.Group();
    // Central stator iron lamination stack
    const coreGeo = new THREE.CylinderGeometry(3.8, 3.8, 5.0, 36);
    coreGeo.rotateZ(Math.PI / 2);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.5 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coilGroup.add(coreMesh);

    // 12-Slot Hand-Wound High-Purity Copper Windings
    const coilBundleGeo = new THREE.CylinderGeometry(0.55, 0.55, 5.2, 16);
    coilBundleGeo.rotateZ(Math.PI / 2);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const coilBundle = new THREE.Mesh(coilBundleGeo, copperMat.clone());
      coilBundle.position.set(0, Math.sin(angle) * 2.8, Math.cos(angle) * 2.8);
      coilGroup.add(coilBundle);

      // End turn loop curves
      const loopGeo = new THREE.TorusGeometry(0.55, 0.25, 12, 16, Math.PI);
      loopGeo.rotateZ(Math.PI / 2);
      const loopFront = new THREE.Mesh(loopGeo, copperMat.clone());
      loopFront.position.set(2.6, Math.sin(angle) * 2.8, Math.cos(angle) * 2.8);
      const loopBack = new THREE.Mesh(loopGeo, copperMat.clone());
      loopBack.position.set(-2.6, Math.sin(angle) * 2.8, Math.cos(angle) * 2.8);
      loopBack.rotation.y = Math.PI;
      coilGroup.add(loopFront, loopBack);
    }

    registerPart('coil', coilGroup, -0.8, 0.2, [copperMat, coreMat]);

    // -------------------------------------------------------------------
    // PART 5: Precision Brass Gasket Spacer
    // -------------------------------------------------------------------
    const gasketGroup = new THREE.Group();
    const gasketGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.25, 32);
    gasketGeo.rotateZ(Math.PI / 2);
    const gasketMesh = new THREE.Mesh(gasketGeo, brassMat.clone());
    gasketGroup.add(gasketMesh);

    registerPart('gasket', gasketGroup, 1.8, 3.8, [brassMat]);

    // -------------------------------------------------------------------
    // PART 6: Neodymium Explosion-Proof 4-Pole Rotor
    // -------------------------------------------------------------------
    const rotorGroup = new THREE.Group();
    // High-modulus carbon-kevlar cylinder wrap
    const rotorCanGeo = new THREE.CylinderGeometry(1.9, 1.9, 4.4, 32);
    rotorCanGeo.rotateZ(Math.PI / 2);
    const rotorMesh = new THREE.Mesh(rotorCanGeo, rotorKevlarMat.clone());
    rotorGroup.add(rotorMesh);

    // 4 Neodymium pole stripes
    const poleGeo = new THREE.BoxGeometry(4.4, 0.1, 0.35);
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const pole = new THREE.Mesh(poleGeo, yellowGoldMat.clone());
      pole.position.set(0, Math.sin(angle) * 1.92, Math.cos(angle) * 1.92);
      pole.rotation.x = -angle;
      rotorGroup.add(pole);
    }

    // Dynamic balancing brass collar rings
    const collarGeo = new THREE.CylinderGeometry(1.92, 1.92, 0.35, 32);
    collarGeo.rotateZ(Math.PI / 2);
    [-2.0, 2.0].forEach(xPos => {
      const collar = new THREE.Mesh(collarGeo, brassMat.clone());
      collar.position.x = xPos;
      rotorGroup.add(collar);
    });

    registerPart('rotor', rotorGroup, 1.6, 7.2, [rotorKevlarMat, yellowGoldMat]);

    // -------------------------------------------------------------------
    // PART 7: Internal Turbine Cooling Fan (Electric Yellow Anodized)
    // -------------------------------------------------------------------
    const fanGroup = new THREE.Group();
    // Central hub
    const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 24);
    hubGeo.rotateZ(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, yellowAnodizedMat.clone());
    fanGroup.add(hubMesh);

    // Turbine blades (angled airfoils)
    const bladeGeo = new THREE.BoxGeometry(0.12, 1.4, 0.4);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, yellowAnodizedMat.clone());
      blade.position.set(0, Math.sin(angle) * 1.8, Math.cos(angle) * 1.8);
      blade.rotation.x = -angle + 0.45; // aerodynamic pitch angle
      fanGroup.add(blade);
    }

    registerPart('fan', fanGroup, 3.8, 10.8, [yellowAnodizedMat]);

    // -------------------------------------------------------------------
    // PART 8: Front Bearing (F684ZZ)
    // -------------------------------------------------------------------
    const frontBearingGroup = new THREE.Group();
    const fBearingOuterGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.6, 32);
    fBearingOuterGeo.rotateZ(Math.PI / 2);
    const fOuter = new THREE.Mesh(fBearingOuterGeo, chromeMat.clone());
    frontBearingGroup.add(fOuter);

    const fFlangeGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.15, 32);
    fFlangeGeo.rotateZ(Math.PI / 2);
    const fFlange = new THREE.Mesh(fFlangeGeo, chromeMat.clone());
    fFlange.position.x = 0.28;
    frontBearingGroup.add(fFlange);

    const fInnerGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.65, 32);
    fInnerGeo.rotateZ(Math.PI / 2);
    const fInner = new THREE.Mesh(fInnerGeo, chromeMat.clone());
    frontBearingGroup.add(fInner);

    const fShieldL = new THREE.Mesh(shieldGeo, shieldMat);
    fShieldL.position.x = -0.31;
    const fShieldR = new THREE.Mesh(shieldGeo, shieldMat);
    fShieldR.position.x = 0.31;
    frontBearingGroup.add(fShieldL, fShieldR);

    registerPart('bearing-front', frontBearingGroup, 4.4, 13.5, [chromeMat]);

    // -------------------------------------------------------------------
    // PART 9: Front Cover (Electric Yellow Anodized Aluminum Bell with Vortex Ports)
    // -------------------------------------------------------------------
    const frontCoverGroup = new THREE.Group();
    // Front disc
    const frontDiscGeo = new THREE.CylinderGeometry(4.3, 4.3, 1.2, 48);
    frontDiscGeo.rotateZ(Math.PI / 2);
    const frontDiscMesh = new THREE.Mesh(frontDiscGeo, yellowAnodizedMat.clone());
    frontCoverGroup.add(frontDiscMesh);

    // Front protruding nose boss
    const noseBossGeo = new THREE.CylinderGeometry(1.9, 2.4, 0.9, 32);
    noseBossGeo.rotateZ(Math.PI / 2);
    const noseBossMesh = new THREE.Mesh(noseBossGeo, yellowGoldMat.clone());
    noseBossMesh.position.x = 0.8;
    frontCoverGroup.add(noseBossMesh);

    // Vortex ventilation cutout ports (air intakes)
    const ventGeo = new THREE.BoxGeometry(1.4, 0.6, 1.2);
    ventGeo.rotateX(Math.PI / 4);
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const vent = new THREE.Mesh(ventGeo, darkPlasticMat.clone());
      vent.position.set(0.1, Math.sin(angle) * 2.8, Math.cos(angle) * 2.8);
      frontCoverGroup.add(vent);
    }

    // Front M3 motor mounting holes
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const hole = new THREE.Mesh(holeGeo, darkPlasticMat.clone());
      hole.position.set(0.2, Math.sin(angle) * 2.4, Math.cos(angle) * 2.4);
      frontCoverGroup.add(hole);
    }

    registerPart('front-cover', frontCoverGroup, 4.8, 16.8, [yellowAnodizedMat, yellowGoldMat]);

    // -------------------------------------------------------------------
    // PART 10: Precision Ground Stainless Steel Output Shaft (Φ4mm)
    // -------------------------------------------------------------------
    const shaftGroup = new THREE.Group();
    // Main shaft bar
    const shaftGeo = new THREE.CylinderGeometry(0.5, 0.5, 12.0, 32);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaftMesh = new THREE.Mesh(shaftGeo, steelShaftMat.clone());
    shaftGroup.add(shaftMesh);

    // Pinion gear flat (D-cut)
    const dCutGeo = new THREE.BoxGeometry(2.4, 0.25, 0.85);
    const dCutMesh = new THREE.Mesh(dCutGeo, steelShaftMat.clone());
    dCutMesh.position.set(4.8, 0.4, 0);
    shaftGroup.add(dCutMesh);

    // Rounded tip
    const tipGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const tipMesh = new THREE.Mesh(tipGeo, steelShaftMat.clone());
    tipMesh.position.x = 6.0;
    shaftGroup.add(tipMesh);

    registerPart('shaft', shaftGroup, 2.2, 10.2, [steelShaftMat]);

    partMeshesRef.current = partMap;

    // -------------------------------------------------------------------
    // 6. Raycasting setup for click & hover
    // -------------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedPartId = (clientX: number, clientY: number): string | null => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(partsGroup.children, true);

      if (intersects.length > 0) {
        let current: THREE.Object3D | null = intersects[0].object;
        while (current && current !== partsGroup) {
          if (current.userData && current.userData.partId) {
            return current.userData.partId;
          }
          current = current.parent;
        }
      }
      return null;
    };

    // Pointer Event Listeners for 3D Orbit & Drag
    let pointerDownPos = { x: 0, y: 0 };
    let didDrag = false;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      didDrag = false;
      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousPointerPosRef.current.x;
        const deltaY = e.clientY - previousPointerPosRef.current.y;

        if (Math.abs(e.clientX - pointerDownPos.x) > 4 || Math.abs(e.clientY - pointerDownPos.y) > 4) {
          didDrag = true;
        }

        // Orbit update
        targetSphericalRef.current.theta -= deltaX * 0.008;
        targetSphericalRef.current.phi -= deltaY * 0.008;
        // Clamp phi to prevent flip over poles
        targetSphericalRef.current.phi = Math.max(0.08, Math.min(Math.PI - 0.08, targetSphericalRef.current.phi));

        previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Hover check
        const hoveredId = getIntersectedPartId(e.clientX, e.clientY);
        canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
        setHoveredPartName(hoveredId);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      canvas.style.cursor = 'grab';

      // If clicked without dragging, select the clicked part!
      if (!didDrag) {
        const clickedId = getIntersectedPartId(e.clientX, e.clientY);
        onSelectPart(clickedId);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.02;
      targetSphericalRef.current.radius = Math.max(12, Math.min(48, targetSphericalRef.current.radius + zoomDelta));
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Resize Observer for fluid responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // -------------------------------------------------------------------
    // 7. Render Animation Loop with Smooth Damping
    // -------------------------------------------------------------------
    let animationFrameId: number;
    let currentExplode = explodeRatioRef.current;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotation when enabled and user is not actively dragging
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetSphericalRef.current.theta += 0.005;
      }

      // Smooth camera orbit lerp
      sphericalRef.current.theta += (targetSphericalRef.current.theta - sphericalRef.current.theta) * 0.1;
      sphericalRef.current.phi += (targetSphericalRef.current.phi - sphericalRef.current.phi) * 0.1;
      sphericalRef.current.radius += (targetSphericalRef.current.radius - sphericalRef.current.radius) * 0.1;

      // Convert spherical coordinates to Cartesian camera position
      const { radius, theta, phi } = sphericalRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      // Smooth Exploded view transition
      const targetExplode = explodeRatioRef.current;
      currentExplode += (targetExplode - currentExplode) * 0.14;

      // Update part positions along X-axis
      partMeshesRef.current.forEach((info, partId) => {
        const currentX = info.assembledX + (info.explodedX - info.assembledX) * currentExplode;
        info.group.position.x = currentX;

        // Visual selection glow / highlight
        const isSelected = selectedPartIdRef.current === partId;
        const isAnySelected = selectedPartIdRef.current !== null;

        info.group.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive) {
              if (isSelected) {
                mat.emissive.setHex(0xeab308);
                mat.emissiveIntensity = 0.55;
              } else if (isAnySelected) {
                mat.emissive.setHex(0x000000);
                mat.emissiveIntensity = 0;
              } else {
                mat.emissive.setHex(0x000000);
                mat.emissiveIntensity = 0;
              }
            }
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);

      // Dispose Three.js resources cleanly
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [onSelectPart]);

  // Zoom control callbacks
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const delta = direction === 'in' ? -4 : 4;
    targetSphericalRef.current.radius = Math.max(12, Math.min(48, targetSphericalRef.current.radius + delta));
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative select-none touch-none">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing outline-none" />

      {/* Floating Hover Indicator */}
      {hoveredPartName && (
        <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2 bg-black/80 dark:bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-yellow-500/40 shadow-lg text-xs font-mono text-yellow-400">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
          <span className="capitalize">{hoveredPartName.replace('-', ' ')}</span>
        </div>
      )}

      {/* Interactive Quick Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
        <button
          onClick={() => handleZoom('in')}
          aria-label="Zoom In"
          className="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center font-bold text-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          +
        </button>
        <button
          onClick={() => handleZoom('out')}
          aria-label="Zoom Out"
          className="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-500 dark:hover:text-black text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center font-bold text-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          −
        </button>
      </div>
    </div>
  );
}
