export function isNotNull<TargetValue>(targetValue: TargetValue | null): targetValue is null {
  return targetValue !== null;
}
