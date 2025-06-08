import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function LoadingScreen() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState("Initializing...");
  
  // Cycle through loading texts
  useEffect(() => {
    const loadingTexts = ["Initializing...", "Loading resources...", "Preparing workspace...", "Almost ready..."];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[currentIndex]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let cleanup: (() => void) | null = null;
    
    // Try to initialize Three.js
    try {
      if (typeof window !== 'undefined' && typeof THREE !== 'undefined') {
        const container = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
          // Create a sphere of particles
          posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        
        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Create a torus
        const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.2,
          wireframe: true
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(torus);
        
        // Create a second torus at different angle
        const torus2Geometry = new THREE.TorusGeometry(1.5, 0.2, 16, 100);
        const torus2Material = new THREE.MeshBasicMaterial({ 
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.15,
          wireframe: true
        });
        const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
        torus2.rotation.x = Math.PI / 4;
        scene.add(torus2);
        
        // Position camera
        camera.position.z = 3;
        
        // Animation
        let animationFrameId: number;
        
        function animate() {
          animationFrameId = requestAnimationFrame(animate);
          
          particlesMesh.rotation.y += 0.001;
          particlesMesh.rotation.x += 0.0005;
          
          torus.rotation.x += 0.01;
          torus.rotation.y += 0.005;
          
          torus2.rotation.x += 0.005;
          torus2.rotation.z += 0.008;
          
          renderer.render(scene, camera);
        }
        
        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        animate();
        
        // Cleanup function
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
          if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          
          // Dispose of geometries and materials
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          torusGeometry.dispose();
          torusMaterial.dispose();
          torus2Geometry.dispose();
          torus2Material.dispose();
        };
      }
    } catch (error) {
      console.error('Error initializing Three.js:', error);
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50 font-sans">
      {/* 3D Canvas Container */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>
      
      <div className="w-full max-w-md px-8 flex flex-col items-center z-10">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.5px', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }}>
            THE360UNITY
          </h1>
          <div className="text-white/60 text-sm mt-2 tracking-wide">DEVELOPER COMMUNITY</div>
        </motion.div>
        
        {/* Loading animation */}
        <div className="relative w-72 h-2 bg-white/10 rounded-full overflow-hidden mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            initial={{ width: "0%" }}
            animate={{ 
              width: ["0%", "100%", "0%"], 
              left: ["0%", "0%", "100%"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        </div>
        
        {/* Loading text */}
        <motion.p 
          className="text-white/80 text-base font-medium tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {loadingText}
        </motion.p>
      </div>
    </div>
  );
} 