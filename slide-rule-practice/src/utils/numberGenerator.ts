export function generateNumber(magnitude: number, significantFigures: number = 1): number {
  // Generate number between 1.1 and 9.9
  const base = 1.1 + Math.random() * 8.8;
  // Generate power between -magnitude and +magnitude
  const power = Math.floor(Math.random() * (2 * magnitude + 1)) - magnitude;
  const rawNumber = base * Math.pow(10, power);
  return roundToSignificantFigures(rawNumber, significantFigures);
}

export function roundToSignificantFigures(num: number, sigFigs: number): number {
  if (num === 0) return 0;
  const magnitude = Math.floor(Math.log10(Math.abs(num)));
  const scale = Math.pow(10, magnitude - sigFigs + 1);
  return Math.round(num / scale) * scale;
}