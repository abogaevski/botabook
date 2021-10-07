export function getCSSVariableValue(variableName) {
  let hex = getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
  if (hex && hex.length > 0) {
    hex = hex.trim();
  }

  return hex;
}
