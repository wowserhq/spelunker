import React, { useEffect, useRef, useState } from 'react';
import { FormatManager, TextureManager, MapManager, MapControls } from '@wowserhq/scene';
import * as THREE from 'three';
import styles from './index.styl';

// Maps use z-up coordinates
THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

// We do our own color management!
THREE.ColorManagement.enabled = false;

const assetHost = { baseUrl: process.env.DATA_URI, normalizePath: true };

const formatManager = new FormatManager({ host: assetHost });
const textureManager = new TextureManager({ host: assetHost });

const camera = new THREE.PerspectiveCamera(
  60,
  16 / 9,
  0.1,
  1277.0,
);

const GENERIC_VIEW = new THREE.Vector3(100.0, 100.0, 0.0);
const DEFAULT_VIEWS = {
  // Eastern Kingdoms - The Hinterlands, Aerie Peak
  0: new THREE.Vector3(323.513, -2227.2, 137.617),

  // Kalimdor - Mulgore, Thunder Bluff
  1: new THREE.Vector3(-981.917, -74.6465, 20.1265),

  // Outland - Hellfire Peninsula, Honor Hold
  530: new THREE.Vector3(-803.012, 2702.59, 106.758),

  // Northrend - Grizzly Hills, Amberpine GY
  571: new THREE.Vector3(3534.13, -2882.06, 204.625),
};

const MapViewer = ({ map: { id, filename } }) => {
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

      const view = DEFAULT_VIEWS[id] || GENERIC_VIEW;
      controls.setView(view);

      const mapManager = new MapManager({ host: assetHost, formatManager, textureManager });
      mapManager.load(filename);
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
  }, [id, filename]);

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
