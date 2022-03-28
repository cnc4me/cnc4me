export function hasDwell(gCodeFlags: Record<string, boolean>): boolean {
  return "G4" in gCodeFlags;
}
