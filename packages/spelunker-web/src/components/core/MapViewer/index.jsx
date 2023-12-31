import React, { useEffect, useRef, useState } from 'react';
import { AssetManager, FormatManager, TextureManager, MapManager, MapControls } from '@wowserhq/scene';
import * as THREE from 'three';
import styles from './index.styl';

// Maps use z-up coordinates
THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

// We do our own color management!
THREE.ColorManagement.enabled = false;

const assetManager = new AssetManager(process.env.DATA_URI, true);
const formatManager = new FormatManager(assetManager);
const textureManager = new TextureManager(formatManager);

const camera = new THREE.PerspectiveCamera(
  60,
  16 / 9,
  0.1,
  1277.0,
);

const MapViewer = ({ map: { filename } }) => {
  const containerRef = useRef();
  const canvasRef = useRef();
  const mapManagerRef = useRef();
  const rendererRef = useRef();

  const [currentPosition, setCurrentPosition] = useState({ x: 0.0, y: 0.0, z: 0.0 });

  useEffect(() => {
    if (filename && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      camera.aspect = containerWidth / containerHeight;
      camera.position.set(100.0, 100.0, 100.0);
      camera.updateProjectionMatrix();

      const clock = new THREE.Clock();

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        canvas: canvasRef.current,
      });
      rendererRef.current = renderer;

      renderer.setSize(containerWidth, containerHeight);

      const clearColor = new THREE.Color(0.25, 0.5, 0.8);
      renderer.setClearColor(clearColor, 1.0);

      const scene = new THREE.Scene();
      scene.matrixAutoUpdate = false;

      const controls = new MapControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.panSpeed = 5.0;
      controls.keyPanSpeed = 20.0;
      controls.zoomSpeed = 5.0;

      const position = new THREE.Vector3(100.0, 100.0, 0.0);
      controls.setView(position);

      const mapManager = new MapManager(filename, formatManager, textureManager);
      mapManagerRef.current = mapManager;

      scene.add(mapManager.root);

      let rafId;

      const animate = () => {
        const delta = clock.getDelta();

        mapManager.setTarget(camera.position.x, camera.position.y);
        setCurrentPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z });

        controls.update(delta);
        mapManager.update(delta, camera);

        renderer.render(scene, camera);

        rafId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(rafId);

        renderer.dispose();
        controls.dispose();
      };
    }
  }, [filename]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();

        if (rendererRef.current) {
          rendererRef.current.setSize(containerWidth, containerHeight);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div ref={containerRef} className={styles.container}>
        <canvas ref={canvasRef} className={styles.viewer} />
      </div>

      <div className={styles.position}>
        <span className={styles.coordinate}>
          <span className={styles.label}>X:</span>
          <span className={styles.value}>{currentPosition.x.toFixed(1)}</span>
        </span>
        <span className={styles.coordinate}>
          <span className={styles.label}>Y:</span>
          <span className={styles.value}>{currentPosition.y.toFixed(1)}</span>
        </span>
        <span className={styles.coordinate}>
          <span className={styles.label}>Z:</span>
          <span className={styles.value}>{currentPosition.z.toFixed(1)}</span>
        </span>
      </div>
    </div>
  );
};

export default MapViewer;
