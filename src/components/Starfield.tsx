import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  density?: number;
  speed?: number;
};

export function Starfield({ density = 1800, speed = 0.00018 }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060d, 0.0009);

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 4000);
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Stars ----
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(density * 3);
    const colors = new Float32Array(density * 3);
    const sizes = new Float32Array(density);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xb6c7ff),
      new THREE.Color(0xfff1c4),
      new THREE.Color(0xffc1b6),
    ];

    for (let i = 0; i < density; i++) {
      const r = 200 + Math.random() * 1400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 400;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 1.6 + 0.4;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---- Nebula glow disc (sprite) ----
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 256;
    const ctx = glowCanvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(124,92,255,0.55)");
    grad.addColorStop(0.4, "rgba(124,92,255,0.18)");
    grad.addColorStop(1, "rgba(124,92,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebula1 = new THREE.Sprite(glowMat);
    nebula1.scale.set(900, 900, 1);
    nebula1.position.set(-200, 100, -300);
    scene.add(nebula1);

    const glowCanvas2 = document.createElement("canvas");
    glowCanvas2.width = glowCanvas2.height = 256;
    const ctx2 = glowCanvas2.getContext("2d")!;
    const grad2 = ctx2.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad2.addColorStop(0, "rgba(255,122,89,0.45)");
    grad2.addColorStop(0.45, "rgba(255,122,89,0.10)");
    grad2.addColorStop(1, "rgba(255,122,89,0)");
    ctx2.fillStyle = grad2;
    ctx2.fillRect(0, 0, 256, 256);
    const glowTex2 = new THREE.CanvasTexture(glowCanvas2);
    const glowMat2 = new THREE.SpriteMaterial({
      map: glowTex2,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebula2 = new THREE.Sprite(glowMat2);
    nebula2.scale.set(700, 700, 1);
    nebula2.position.set(350, -120, -200);
    scene.add(nebula2);

    // ---- Pointer parallax ----
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    // ---- Resize ----
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ---- Animate ----
    let raf = 0;
    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      stars.rotation.y += speed;
      stars.rotation.x += speed * 0.4;

      camera.position.x = pointer.x * 40;
      camera.position.y = -pointer.y * 30;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      glowTex.dispose();
      glowTex2.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [density, speed]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      aria-hidden
    />
  );
}
