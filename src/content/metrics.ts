import type { Metric } from "./types";

export const metrics: Metric[] = [
  {
    id: "query-latency",
    value: 80,
    suffix: "%+",
    label: "PostgreSQL query latency cut",
    detail: "Execution-plan analysis, indexing, query rewriting",
  },
  {
    id: "api-response",
    value: 50,
    suffix: "%",
    label: "API response time cut",
    detail: "Redis caching on high-traffic workloads",
  },
  {
    id: "payment-gateways",
    value: 5,
    suffix: "+",
    label: "payment gateways orchestrated",
    detail: "Unified orchestration layer, admin-configurable routing",
  },
  {
    id: "zero-downtime-records",
    value: 10000,
    prefix: "",
    suffix: "+",
    label: "records migrated, zero downtime",
    detail: "Users, transactions, and inventory data",
  },
  {
    id: "lead-time",
    value: 70,
    suffix: "%",
    label: "faster feature change lead time",
    detail: "Admin-configurable payment routing, no engineering required",
  },
];
