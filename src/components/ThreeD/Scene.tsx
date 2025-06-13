import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
interface SceneProps {
  className?: string;
}
const Scene: React.FC<SceneProps> = ({
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    // Create leaf geometry
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(5, 5, 5, 20, 0, 20);
    leafShape.bezierCurveTo(-5, 20, -5, 5, 0, 0);
    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 3
    };
    const leafGeometry = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    const leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x4caf50,
      shininess: 100,
      side: THREE.DoubleSide
    });
    // Create multiple leaves
    const leaves: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
      leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      leaf.scale.set(0.1, 0.1, 0.1);
      scene.add(leaf);
      leaves.push(leaf);
    }
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    // Position camera
    camera.position.z = 15;
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate leaves
      leaves.forEach((leaf, i) => {
        leaf.rotation.x += 0.003 + i * 0.0001;
        leaf.rotation.y += 0.004 + i * 0.0001;
        leaf.rotation.z += 0.002 + i * 0.0001;
        // Make leaves float up and down
        leaf.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);
  return <div ref={containerRef} className={`w-full h-full ${className || ''}`}></div>;
};
export default Scene;