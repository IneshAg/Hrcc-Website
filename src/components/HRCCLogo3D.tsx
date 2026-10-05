"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Float, Environment, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Smooth pointer tracking ───────────────────────────────────────────────────
function useSmoothPointer() {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        "touches" in e ? e.touches[0] : (e as MouseEvent);
      target.current.x = (clientX / window.innerWidth - 0.5) * 2;
      target.current.y = -(clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return { target, current };
}

// ─── 3D Logo mesh with mouse tracking ─────────────────────────────────────────
function LogoMesh({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { target, current } = useSmoothPointer();
  const clock = useRef(0);

  const fontSize = isMobile ? 0.5 : 0.78;
  const depth = isMobile ? 0.08 : 0.16;
  const bevelThickness = isMobile ? 0.008 : 0.022;
  const bevelSize = isMobile ? 0.006 : 0.014;
  const curveSegments = isMobile ? 8 : 14;
  const bevelSegments = isMobile ? 3 : 6;

  useFrame((_, delta) => {
    clock.current += delta;

    // Smooth lerp pointer tracking
    const lerpFactor = 1 - Math.pow(0.03, delta);
    current.current.x += (target.current.x - current.current.x) * lerpFactor;
    current.current.y += (target.current.y - current.current.y) * lerpFactor;

    if (groupRef.current) {
      // Pointer tilt — max ±20°
      groupRef.current.rotation.y = current.current.x * 0.35;
      groupRef.current.rotation.x = current.current.y * 0.22;
      // Idle sine float
      groupRef.current.position.y = Math.sin(clock.current * 0.85) * 0.055;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={1.6}
        rotationIntensity={0.035}
        floatIntensity={0.1}
        floatingRange={[-0.03, 0.03]}
      >
        <Center>
          <Text3D
            font="/fonts/hrcc_bold.json"
            size={fontSize}
            height={depth}
            curveSegments={curveSegments}
            bevelEnabled
            bevelThickness={bevelThickness}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={bevelSegments}
          >
            HRCC
            {/* Metallic green material matching --green-primary */}
            <meshStandardMaterial
              color="#05C770"
              metalness={0.85}
              roughness={0.12}
              envMapIntensity={1.8}
            />
          </Text3D>
        </Center>
      </Float>

      {/* Soft floor reflection */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#05C770"
          opacity={0.05}
          transparent
          roughness={1}
        />
      </mesh>
    </group>
  );
}

// ─── Scene lighting ────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#050505" />
      {/* Key light — cool white from top-left */}
      <directionalLight position={[4, 8, 5]} intensity={2.4} color="#ffffff" castShadow />
      {/* Rim / accent — brand green from bottom-right */}
      <directionalLight position={[-4, -2, -3]} intensity={1.6} color="#05C770" />
      {/* Front fill — soft cyan */}
      <pointLight position={[0, 2, 4.5]} intensity={0.7} color="#00e5ff" />
    </>
  );
}

// ─── DPR-adaptive canvas ───────────────────────────────────────────────────────
function AdaptiveCanvas({ isMobile, isLowPower, children }: {
  isMobile: boolean;
  isLowPower: boolean;
  children: React.ReactNode;
}) {
  const dpr: [number, number] = isLowPower
    ? [1, 1]
    : [1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 2)];

  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 42 }}
      dpr={dpr}
      shadows
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ background: "transparent" }}
    >
      {children}
    </Canvas>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function HRCCLogo3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setIsLowPower(mobile && window.devicePixelRatio > 2.5);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven scale + fade + translate up
  const { scrollY } = useScroll();
  const rawScale = useTransform(scrollY, [0, 420], [1, 0.35]);
  const rawOpacity = useTransform(scrollY, [0, 340], [1, 0]);
  const rawY = useTransform(scrollY, [0, 420], [0, -48]);

  const scale = useSpring(rawScale, { stiffness: 110, damping: 26 });
  const opacity = useSpring(rawOpacity, { stiffness: 110, damping: 26 });
  const y = useSpring(rawY, { stiffness: 110, damping: 26 });

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="w-full h-full will-change-transform"
    >
      <AdaptiveCanvas isMobile={isMobile} isLowPower={isLowPower}>
        <Suspense fallback={null}>
          <Lights />
          <LogoMesh isMobile={isMobile} />
          <Environment preset="city" />
        </Suspense>
      </AdaptiveCanvas>
    </motion.div>
  );
}
