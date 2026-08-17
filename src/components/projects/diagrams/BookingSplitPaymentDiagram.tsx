"use client";

import { DiagramCanvas, Edge, Node, PacketDot, useDiagramActive } from "./DiagramPrimitives";

const entryTypes = [
  { x: 140, y: 40, label: "Court Booking", color: "var(--accent-signal)" },
  { x: 320, y: 40, label: "Tournament Entry", color: "var(--accent-gold)" },
  { x: 500, y: 40, label: "Recurring Game", color: "var(--ink-muted)" },
];

const bookingService = { x: 320, y: 130 };

const players = [
  { x: 140, y: 224, label: "Player 1" },
  { x: 320, y: 224, label: "Player 2" },
  { x: 500, y: 224, label: "Player 3" },
];

const notifications = { x: 180, y: 340 };
const splitPayment = { x: 460, y: 340 };

const CYCLE = 3.2;

export function BookingSplitPaymentDiagram() {
  const { ref, active } = useDiagramActive();

  return (
    <div ref={ref}>
      <DiagramCanvas
        viewBox="0 0 640 390"
        caption="one booking engine → court, tournament & recurring games → split payment + notifications"
      >
        {entryTypes.map((e) => (
          <Edge key={`entry-${e.label}`} from={e} to={bookingService} />
        ))}
        {players.map((p) => (
          <Edge key={`book-${p.label}`} from={bookingService} to={p} />
        ))}
        {players.map((p) => (
          <Edge key={`notify-${p.label}`} from={p} to={notifications} dashed />
        ))}
        {players.map((p) => (
          <Edge key={`pay-${p.label}`} from={p} to={splitPayment} dashed />
        ))}

        {entryTypes.map((e) => (
          <Node key={e.label} x={e.x} y={e.y} label={e.label} width={132} />
        ))}
        <Node
          x={bookingService.x}
          y={bookingService.y}
          label="Booking Service"
          sublabel="routes + splits bill"
          width={175}
          active
        />
        {players.map((p) => (
          <Node key={p.label} x={p.x} y={p.y} label={p.label} width={110} />
        ))}
        <Node x={notifications.x} y={notifications.y} label="Notifications" sublabel="WebSocket push" width={150} />
        <Node x={splitPayment.x} y={splitPayment.y} label="Split Payment" sublabel="Stripe" width={150} />

        {entryTypes.map((e, i) => (
          <PacketDot
            key={`entry-dot-${e.label}`}
            from={e}
            to={bookingService}
            duration={0.5}
            delay={i * 0.05}
            color={e.color}
            repeat={Infinity}
            repeatDelay={CYCLE - 0.5}
            active={active}
          />
        ))}
        {players.map((p, i) => (
          <PacketDot
            key={`book-dot-${p.label}`}
            from={bookingService}
            to={p}
            duration={0.55}
            delay={0.65 + i * 0.04}
            repeat={Infinity}
            repeatDelay={CYCLE - 0.55}
            active={active}
          />
        ))}
        {players.map((p, i) => (
          <PacketDot
            key={`notify-dot-${p.label}`}
            from={p}
            to={notifications}
            duration={0.5}
            delay={1.25 + i * 0.04}
            repeat={Infinity}
            repeatDelay={CYCLE - 0.5}
            active={active}
          />
        ))}
        {players.map((p, i) => (
          <PacketDot
            key={`pay-dot-${p.label}`}
            from={p}
            to={splitPayment}
            duration={0.5}
            delay={1.3 + i * 0.04}
            color="var(--accent-gold)"
            repeat={Infinity}
            repeatDelay={CYCLE - 0.5}
            active={active}
          />
        ))}
      </DiagramCanvas>
    </div>
  );
}
