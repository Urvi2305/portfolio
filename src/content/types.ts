export interface Job {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string | "present";
  location: string;
  domain: string;
  bullets: string[];
}

export type DiagramKey =
  | "kafka-dispatch"
  | "payment-orchestration"
  | "pricing-broadcast"
  | "booking-split-payment";

export interface Project {
  slug: string;
  name: string;
  company: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  diagrams?: DiagramKey[];
}

export interface Metric {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Award {
  title: string;
  org: string;
  period: string;
  description: string;
}
