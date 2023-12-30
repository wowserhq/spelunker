import React, { useEffect, useRef } from 'react';
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

const MapViewer = ({ map: { filename } }) => {
  const canvasRef = useRef();
  const mapManagerRef = useRef();

  useEffect(() => {
    if (filename && canvasRef.current) {
      const canvasWidth = canvasRef.current.clientWidth;
      const canvasHeight = canvasRef.current.clientHeight;

      const camera = new THREE.PerspectiveCamera(
        60,
        canvasWidth / canvasHeight,
        0.1,
        1277.0,
      );
      camera.position.set(100.0, 100.0, 100.0);

      const clock = new THREE.Clock();

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        canvas: canvasRef.current,
      });
      renderer.setSize(canvasWidth, canvasHeight);

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

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.viewer} />
    </div>
  );
};

export default MapViewer;
