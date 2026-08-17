"use client";

import { useEffect, useState } from "react";
import { DiagramCanvas, Edge, Node, PacketDot, useDiagramActive } from "./DiagramPrimitives";

const priceServiceBefore = { x: 130, y: 40 };
const clientBefore = { x: 130, y: 220 };

const priceServiceAfter = { x: 150, y: 40 };
const clientsAfter = [
  { x: 55, y: 220 },
  { x: 150, y: 220 },
  { x: 245, y: 220 },
];

const POLL_CYCLE = 1100;
const PUSH_CYCLE = 3000;

export function PricingBroadcastDiagram() {
  const { ref, active } = useDiagramActive();
  const [reqRate, setReqRate] = useState(47);
  const [pollTick, setPollTick] = useState(0);
  const [pushTick, setPushTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const rateId = setInterval(() => setReqRate(44 + Math.round(Math.random() * 8)), POLL_CYCLE);
    const pollId = setInterval(() => setPollTick((t) => t + 1), POLL_CYCLE);
    const pushId = setInterval(() => setPushTick((t) => t + 1), PUSH_CYCLE);
    return () => {
      clearInterval(rateId);
      clearInterval(pollId);
      clearInterval(pushId);
    };
  }, [active]);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2">
      <DiagramCanvas viewBox="0 0 260 260" caption={`Before · polling · ~${reqRate} req/min`}>
        <Edge from={clientBefore} to={priceServiceBefore} dashed />
        <Node x={priceServiceBefore.x} y={priceServiceBefore.y} label="Price Service" width={140} />
        <Node x={clientBefore.x} y={clientBefore.y} label="Client" width={100} />
        <PacketDot
          key={`req-${pollTick}`}
          from={clientBefore}
          to={priceServiceBefore}
          duration={0.4}
          delay={0}
          active={active}
        />
        <PacketDot
          key={`res-${pollTick}`}
          from={priceServiceBefore}
          to={clientBefore}
          duration={0.4}
          delay={0.5}
          color="var(--ink-faint)"
          active={active}
        />
      </DiagramCanvas>

      <DiagramCanvas viewBox="0 0 300 260" caption="Now · WebSocket push · 1 broadcast → 3 clients">
        {clientsAfter.map((c) => (
          <Edge key={c.x} from={priceServiceAfter} to={c} dashed />
        ))}
        <Node x={priceServiceAfter.x} y={priceServiceAfter.y} label="Price Service" width={150} active />
        {clientsAfter.map((c, i) => (
          <Node key={c.x} x={c.x} y={c.y} label={`Client ${i + 1}`} width={80} />
        ))}
        {clientsAfter.map((c, i) => (
          <PacketDot
            key={`push-${pushTick}-${i}`}
            from={priceServiceAfter}
            to={c}
            duration={0.6}
            delay={0.05 * i}
            active={active}
          />
        ))}
      </DiagramCanvas>
    </div>
  );
}
