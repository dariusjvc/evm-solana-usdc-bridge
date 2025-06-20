export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function logStep(label: string): void {
  console.log(`\\n=== ${label.toUpperCase()} ===`);
}
