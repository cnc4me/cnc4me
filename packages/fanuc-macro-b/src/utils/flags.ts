export function hasDwell(gCodeFlags: Record<string, boolean>): boolean {
  return "G4" in gCodeFlags;
}

export function hasG10(gCodeFlags: Record<string, boolean>): boolean {
  return "G10" in gCodeFlags;
}
