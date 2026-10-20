// In-memory and per server instance: enough for a low-traffic form, not a hard guarantee.
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function isAllowed(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    const allowed = recent.length < limit;
    hits.set(key, allowed ? [...recent, now] : recent);
    return allowed;
  };
}
