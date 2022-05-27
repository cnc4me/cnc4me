export function hasDwell(gCodeFlags) {
    return "G4" in gCodeFlags;
}
export function hasG10(gCodeFlags) {
    return "G10" in gCodeFlags;
}
