export const MOCK_LATENCY_MS = 300;

export function simulateRequest<T>(
  data: T,
  latencyMs = MOCK_LATENCY_MS,
): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), latencyMs);
  });
}
