import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeModel() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(
      mount.clientWidth,
      mount.clientHeight
    );

    mount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Material
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    // Mesh
    const cube = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(cube);

    // Camera Position
    camera.position.z = 5;

    // Animation
    function animate(time) {
      cube.rotation.x = time / 2000;
      cube.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // Cleanup
    return () => {
      renderer.setAnimationLoop(null);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}

export default ThreeModel;