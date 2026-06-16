import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function PremiumGlassObject() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Continuous smooth rotation of the object
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;

    // Smooth hover tilt based on normalized mouse pointer coordinates
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.35,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.35,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {/* Abstract Torus Knot Geometry */}
        <torusKnotGeometry args={[0.7, 0.22, 150, 20, 2, 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.95} // High glass transmission
          ior={1.6} // Index of refraction for glass
          thickness={1.8} // Glass thickness
          specularIntensity={1.0}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
}

export default function Canvas3D() {
  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        
        {/* Strategic spotlight points to create stunning glass refraction highlights */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={1.0} color="#0ea5e9" />
        <spotLight position={[5, 15, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        
        <PremiumGlassObject />
      </Canvas>
    </div>
  );
}
