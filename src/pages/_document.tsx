import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        {/* App Loading Indicator */}
        <div id="app-loading" className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50">
          {/* 3D Canvas Container */}
          <div id="loading-canvas-container" className="absolute inset-0 z-0"></div>
          
          <div className="w-full max-w-md px-8 flex flex-col items-center z-10">
            {/* Logo */}
            <div className="mb-8 text-center logo-container">
              <h1 className="text-3xl sm:text-4xl font-bold text-white logo-text">
                THE360UNITY
              </h1>
              <div className="text-white/60 text-sm mt-2 tracking-wide">DEVELOPER COMMUNITY</div>
            </div>
            
            {/* Loading animation */}
            <div className="relative w-72 h-2 bg-white/10 rounded-full overflow-hidden mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <div className="loading-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
            </div>
            
            {/* Loading text */}
            <p className="loading-text text-white/80 text-base font-medium shadow-[0_0_10px_rgba(255,255,255,0.2)] tracking-wide">
              Initializing...
            </p>
          </div>
        </div>

        <Main />
        <NextScript />

        {/* Script to handle loading screen and 3D animation */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Initialize 3D background when document is loaded
            document.addEventListener('DOMContentLoaded', () => {
              // Check if Three.js is loaded
              if (typeof THREE !== 'undefined') {
                initThreeJsBackground();
              } else {
                // Fallback if Three.js failed to load
                console.warn('Three.js not loaded, falling back to static loading screen');
              }
            });

            // Initialize Three.js background
            function initThreeJsBackground() {
              try {
                // Initialize Three.js scene
                const container = document.getElementById('loading-canvas-container');
                if (!container) return;
                
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
                function animate() {
                  if (document.getElementById('loading-canvas-container')) {
                    requestAnimationFrame(animate);
                    
                    particlesMesh.rotation.y += 0.001;
                    particlesMesh.rotation.x += 0.0005;
                    
                    torus.rotation.x += 0.01;
                    torus.rotation.y += 0.005;
                    
                    torus2.rotation.x += 0.005;
                    torus2.rotation.z += 0.008;
                    
                    renderer.render(scene, camera);
                  }
                }
                
                // Handle window resize
                window.addEventListener('resize', () => {
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
                });
                
                animate();
              } catch (e) {
                console.error('Error initializing Three.js background:', e);
              }
            }

            // Update loading text periodically
            let loadingTexts = ["Initializing...", "Loading resources...", "Preparing workspace...", "Almost ready..."];
            let currentTextIndex = 0;
            
            const textInterval = setInterval(() => {
              const loadingTextEl = document.querySelector('.loading-text');
              if (loadingTextEl) {
                currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
                loadingTextEl.textContent = loadingTexts[currentTextIndex];
              }
            }, 2000);

            // Hide loading screen when app is loaded
            function hideLoadingScreen() {
              clearInterval(textInterval);
              const loadingEl = document.getElementById('app-loading');
              if (loadingEl) {
                loadingEl.style.opacity = '0';
                setTimeout(() => {
                  loadingEl.style.display = 'none';
                }, 500);
              }
            }
            
            // Add event listener for when the app is loaded
            window.addEventListener('load', () => {
              // Wait a bit to ensure React has hydrated
              setTimeout(hideLoadingScreen, 1000);
            });

            // Fallback in case the load event doesn't fire
            setTimeout(hideLoadingScreen, 5000);
          `
        }} />

        {/* Styles for loading animation */}
        <style jsx global>{`
          #app-loading {
            transition: opacity 0.5s ease;
            font-family: 'Inter', sans-serif;
          }
          
          .logo-container {
            animation: fadeInDown 1s ease-out forwards;
          }
          
          .logo-text {
            letter-spacing: -0.5px;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
          }
          
          .loading-bar {
            width: 30%;
            animation: loading-bar-animation 2s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
          }
          
          .loading-text {
            animation: loading-text-animation 2s infinite ease-in-out;
            letter-spacing: 0.5px;
          }
          
          @keyframes loading-bar-animation {
            0% { width: 0%; left: 0%; }
            50% { width: 100%; left: 0%; }
            100% { width: 0%; left: 100%; }
          }
          
          @keyframes loading-text-animation {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </body>
    </Html>
  );
} 