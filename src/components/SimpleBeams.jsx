'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import './Beams.css';

// Simplified component that creates light beams effect
const SimpleBeams = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#ffffff',
  speed = 2,
  scale = 0.2,
  rotation = 0,
}) => {
  return (
    <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">
      <group rotation={[0, rotation * Math.PI / 180, 0]}>
        <BeamGroup 
          beamWidth={beamWidth}
          beamHeight={beamHeight}
          beamNumber={beamNumber}
          speed={speed}
          scale={scale}
        />
        <directionalLight color={lightColor} intensity={1} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={["#000000"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </Canvas>
  );
};

// Simplified beam group component
const BeamGroup = ({ beamWidth, beamHeight, beamNumber, speed, scale }) => {
  const meshRef = useRef();
  
  // Create beam geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(beamWidth, beamHeight, 1, 32);
  }, [beamWidth, beamHeight]);
  
  // Create beam material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.3,
      roughness: 0.3,
      transparent: true,
      opacity: 0.8
    });
  }, []);
  
  // Animation loop
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime() * speed;
    
    // Update beam positions to create wave effect
    const beams = meshRef.current.children;
    beams.forEach((beam, i) => {
      const offset = i * 0.2;
      beam.position.z = Math.sin(time + offset) * scale * 2;
      beam.rotation.x = Math.sin(time * 0.5 + offset) * 0.1;
    });
  });
  
  return (
    <group ref={meshRef}>
      {Array.from({ length: beamNumber }).map((_, i) => (
        <mesh 
          key={i} 
          geometry={geometry} 
          material={material}
          position={[
            (i - beamNumber / 2) * (beamWidth + 0.2) + beamWidth / 2, 
            0, 
            0
          ]}
        />
      ))}
    </group>
  );
};

export default SimpleBeams; 