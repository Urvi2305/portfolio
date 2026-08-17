"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number };
type Edge = { a: number; b: number; progress: number; speed: number };

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let rafId = 0;
    let visible = true;

    function buildGraph() {
      const cols = width < 640 ? 5 : 8;
      const rows = width < 640 ? 6 : 5;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.random() - 0.5) * (width / cols) * 0.5;
          const jitterY = (Math.random() - 0.5) * (height / rows) * 0.5;
          nodes.push({
            x: (c + 0.5) * (width / cols) + jitterX,
            y: (r + 0.5) * (height / rows) + jitterY,
          });
        }
      }
      edges = [];
      const edgeCount = Math.round(nodes.length * 0.9);
      for (let i = 0; i < edgeCount; i++) {
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;
        edges.push({ a, b, progress: Math.random(), speed: 0.06 + Math.random() * 0.1 });
      }
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      ctx!.strokeStyle = "rgba(56, 65, 75, 0.5)";
      ctx!.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      ctx!.fillStyle = "rgba(124, 135, 146, 0.6)";
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.fillStyle = "#35d0a0";
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const x = a.x + (b.x - a.x) * e.progress;
        const y = a.y + (b.y - a.y) * e.progress;
        ctx!.globalAlpha = 0.85;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;

        if (!prefersReducedMotion) {
          e.progress += e.speed * 0.016;
          if (e.progress > 1) e.progress = 0;
        }
      }
    }

    function loop() {
      if (visible) draw();
      rafId = requestAnimationFrame(loop);
    }

    function handleVisibility() {
      visible = document.visibilityState === "visible";
    }

    resize();
    draw();
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement as Element);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-60"
    />
  );
}
