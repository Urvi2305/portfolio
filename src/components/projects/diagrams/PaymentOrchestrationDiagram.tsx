"use client";

import { useEffect, useState } from "react";
import { DiagramCanvas, Edge, Node, PacketDot, useDiagramActive } from "./DiagramPrimitives";

const orderService = { x: 320, y: 40 };
const orchestrator = { x: 320, y: 122 };
const ledger = { x: 320, y: 336 };

const gateways = [
  { x: 100, y: 229, label: "Card Gateway" },
  { x: 248, y: 229, label: "Bank Transfer" },
  { x: 396, y: 229, label: "Terminal Payment" },
  { x: 544, y: 229, label: "Pay by Link Payment" },
];

type Scenario = { gateway: number; down?: number; reroute?: number };

const scenarios: Scenario[] = [
  { gateway: 1 },
  { gateway: 0, down: 0, reroute: 2 },
  { gateway: 3 },
  { gateway: 2, down: 2, reroute: 1 },
];

const CYCLE_MS = 3600;

export function PaymentOrchestrationDiagram() {
  const { ref, active } = useDiagramActive();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStep((s) => (s + 1) % scenarios.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [active]);

  const scenario = scenarios[step];
  const finalGateway = scenario.down !== undefined ? scenario.reroute! : scenario.gateway;

  return (
    <div ref={ref}>
      <DiagramCanvas caption="Admin-configurable routing gateway down, orchestrator reroutes automatically">
        <Edge from={orderService} to={orchestrator} />
        {gateways.map((g) => (
          <Edge key={g.label} from={orchestrator} to={g} />
        ))}
        {gateways.map((g) => (
          <Edge key={`${g.label}-ledger`} from={g} to={ledger} />
        ))}

        <Node x={orderService.x} y={orderService.y} label="Order Service" />
        <Node x={orchestrator.x} y={orchestrator.y} label="Orchestrator" active sublabel="admin-configured" />
        {gateways.map((g, i) => (
          <Node
            key={g.label}
            x={g.x}
            y={g.y}
            width={138}
            fontSize={9.5}
            label={g.label}
            active={i === finalGateway}
            alert={scenario.down === i}
          />
        ))}
        <Node x={ledger.x} y={ledger.y} label="Ledger" sublabel="PostgreSQL" />

        <PacketDot
          key={`${step}-a`}
          from={orderService}
          to={orchestrator}
          duration={0.55}
          delay={0.1}
          active={active}
        />
        <PacketDot
          key={`${step}-b`}
          from={orchestrator}
          to={gateways[scenario.gateway]}
          duration={0.6}
          delay={0.7}
          color={scenario.down === scenario.gateway ? "var(--accent-alert)" : "var(--accent-signal)"}
          active={active}
        />
        {scenario.down !== undefined && (
          <PacketDot
            key={`${step}-reroute`}
            from={gateways[scenario.down]}
            to={gateways[scenario.reroute!]}
            duration={0.45}
            delay={1.35}
            color="var(--accent-alert)"
            active={active}
          />
        )}
        <PacketDot
          key={`${step}-c`}
          from={gateways[finalGateway]}
          to={ledger}
          duration={0.55}
          delay={scenario.down !== undefined ? 1.85 : 1.35}
          active={active}
        />
      </DiagramCanvas>
    </div>
  );
}
