"use client";

import { DiagramCanvas, Edge, Node, PacketDot, useDiagramActive } from "./DiagramPrimitives";

const dispatch = { x: 320, y: 44 };
const topic = { x: 320, y: 140 };
const channels = [
  { x: 80, y: 300, label: "Email", sublabel: "AWS SES" },
  { x: 240, y: 300, label: "Facebook", sublabel: "Graph API" },
  { x: 400, y: 300, label: "WhatsApp", sublabel: "Business API" },
  { x: 560, y: 300, label: "Twitter/X", sublabel: "API v2" },
];

const CYCLE = 2.6;

export function KafkaDispatchDiagram() {
  const { ref, active } = useDiagramActive();

  return (
    <div ref={ref}>
      <DiagramCanvas caption="1 event → 4 channels, from one Kafka topic">
        <Edge from={dispatch} to={topic} />
        {channels.map((c) => (
          <Edge key={c.label} from={topic} to={c} />
        ))}

        <Node x={dispatch.x} y={dispatch.y} label="Dispatch Service" sublabel="FastAPI" width={150} />
        <Node x={topic.x} y={topic.y} label="campaign.events" sublabel="Kafka topic" active />
        {channels.map((c) => (
          <Node key={c.label} x={c.x} y={c.y} label={c.label} sublabel={c.sublabel} width={112} />
        ))}

        <PacketDot
          from={dispatch}
          to={topic}
          duration={0.6}
          delay={0}
          repeat={Infinity}
          repeatDelay={CYCLE - 0.6}
          active={active}
        />
        {channels.map((c, i) => (
          <PacketDot
            key={c.label}
            from={topic}
            to={c}
            duration={0.7}
            delay={0.62 + i * 0.05}
            repeat={Infinity}
            repeatDelay={CYCLE - 0.7}
            active={active}
          />
        ))}
      </DiagramCanvas>
    </div>
  );
}
