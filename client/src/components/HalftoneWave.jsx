import React, { useRef, useEffect } from 'react';

const HalftoneWave = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let observer;

    const dotSpacing = 12;
    const maxRadius = 5;

    const getThemeColor = () => {
      try {
        const accent = getComputedStyle(document.documentElement)
          .getPropertyValue('--theme-accent')
          .trim();
        return accent || '#00ffff';
      } catch {
        return '#00ffff';
      }
    };

    const getBgColor = () => {
      try {
        const bg = getComputedStyle(document.documentElement)
          .getPropertyValue('--theme-bg')
          .trim();
        return bg || '#05121e';
      } catch {
        return '#05121e';
      }
    };

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    const render = () => {
      time += 0.05;

      const color = getThemeColor();
      const bg = getBgColor();

      canvas.style.backgroundColor = bg;
      ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const wave1 = Math.sin(x * 0.02 + time) * Math.cos(y * 0.02 + time);
          const wave2 = Math.sin(distance * 0.01 - time * 2);
          const wave3 = Math.sin(x * 0.05 - y * 0.05 + time);

          let interference = (wave1 + wave2 + wave3) / 3;
          let radius = maxRadius * (interference + 1) / 2;

          if (radius > maxRadius * 0.7) {
            radius = maxRadius;
          } else if (radius < maxRadius * 0.3) {
            radius = 0;
          } else {
            radius = radius * 0.8;
          }

          if (radius > 0) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default HalftoneWave;
