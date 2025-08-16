"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";
import type { Engine } from "tsparticles-engine";

export const ParticlesBackground = () => {
  const { theme } = useTheme();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (isMobile) return null;
  const color = theme === "dark" ? "#00ff88" : "#000000";
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10 h-full w-full"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: {
            value: 150, // 💨 more particles
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: color,
          },
          opacity: {
            value: 0.5,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 2 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
          links: {
            enable: false, // ❌ No connection lines
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "attract",
              parallax: {
                enable: true,
                force: 20, // ← adjust force to simulate direction pull
                smooth: 20, // ← higher = smoother drag
              },
            },
            resize: true,
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              speed: 0.8,
            },
          },
        },
      }}
    />
  );
};
