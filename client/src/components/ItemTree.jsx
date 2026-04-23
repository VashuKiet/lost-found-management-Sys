import React, { useRef, useEffect } from 'react';

const OPACITY = 0.12;

// Branch tip positions as fractions [x, y] of viewport
const TIPS = [
  [0.07, 0.04], [0.17, 0.03], [0.27, 0.06], [0.36, 0.08],
  [0.11, 0.13], [0.22, 0.11], [0.33, 0.15], [0.41, 0.18],
  [0.14, 0.22], [0.26, 0.20], [0.38, 0.26],
  [0.09, 0.32], [0.22, 0.35], [0.34, 0.38],
  [0.06, 0.44], [0.17, 0.48], [0.28, 0.50],
  [0.05, 0.56], [0.13, 0.60],
];

const ItemTree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W = 0, H = 0;
    let time = 0;
    let spawnTimer = 0;

    const fallingItems = [];
    const settledItems = [];

    const getAccent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-accent').trim() || '#00ffff';

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', resize);
    resize();

    // Pre-seed settled pile at the bottom
    for (let i = 0; i < 10; i++) {
      settledItems.push({
        x: 15 + Math.random() * W * 0.42,
        y: H - 14 - Math.random() * 8,
        rotation: (Math.random() - 0.5) * 0.65,
      });
    }

    // Spawn a falling item from a random tip
    const spawnItem = () => {
      if (fallingItems.length >= 10) return;
      const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
      fallingItems.push({
        x: tip[0] * W + (Math.random() - 0.5) * 16,
        y: tip[1] * H,
        vx: (Math.random() - 0.35) * 0.55,
        vy: 0.35 + Math.random() * 0.35,
        rotation: (Math.random() - 0.5) * 0.35,
        vr: (Math.random() - 0.5) * 0.035,
        tumble: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.025 + Math.random() * 0.03,
      });
    };

    // Kick off
    for (let i = 0; i < 4; i++) spawnItem();

    // Draw one "?" item leaf
    const drawItem = (x, y, rot, perspY, accent, alpha) => {
      const BW = 32, BH = 32;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(1, perspY);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 3;
      ctx.lineWidth = 1.2;

      // Hexagon-ish or Box-ish shape for "item"
      ctx.beginPath();
      ctx.rect(-BW / 2, -BH / 2, BW, BH);
      ctx.stroke();

      // "?" glyph
      ctx.shadowBlur = 0;
      ctx.fillStyle = accent;
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', 0, 0);

      ctx.restore();
    };

    const render = () => {
      time++;
      const accent = getAccent();
      const floorY = H - 16;

      ctx.clearRect(0, 0, W, H);

      // Static items on branch tips
      TIPS.forEach((tip, i) => {
        if (i % 3 !== 0) return;
        const sway = Math.sin(time * 0.018 + i * 1.5) * 0.09;
        drawItem(tip[0] * W, tip[1] * H, sway, 0.5, accent, OPACITY);
      });

      // Spawn new falling items
      spawnTimer++;
      if (spawnTimer > 130) { spawnItem(); spawnTimer = 0; }

      // Update & draw falling items
      for (let i = fallingItems.length - 1; i >= 0; i--) {
        const b = fallingItems[i];
        b.vy += 0.055;
        b.vx *= 0.988;
        b.vx += (Math.random() - 0.5) * 0.015;
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.vr;
        b.tumble += b.tumbleSpeed;

        if (b.y >= floorY) {
          settledItems.push({
            x: b.x,
            y: floorY,
            rotation: (Math.random() - 0.5) * 0.6,
          });
          if (settledItems.length > 35) settledItems.shift();
          fallingItems.splice(i, 1);
          continue;
        }

        const tumblePerspY = 0.12 + Math.abs(Math.cos(b.tumble)) * 0.88;
        drawItem(b.x, b.y, b.rotation, tumblePerspY, accent, OPACITY);
      }

      // Settled items
      settledItems.forEach(b => {
        drawItem(b.x, b.y, b.rotation, 0.26, accent, OPACITY * 0.82);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <img
        src="/tree.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 'auto',
          maxWidth: '55vw',
          opacity: OPACITY,
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'saturate(0) brightness(1.4)',
          objectFit: 'contain',
          objectPosition: 'left top',
          mixBlendMode: 'screen',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </>
  );
};

export default ItemTree;
