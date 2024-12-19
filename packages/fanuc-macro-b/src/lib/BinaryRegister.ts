export class BinaryRegister {
  bits: number[];

  /**
   * {@link BinaryRegister} is used to store and manipulate the contents
   * of a {@link MarcoMemory} parameter register.
   *
   * @param size Width of the register in bits (default: 8)
   * @param initialValue Initial binary string to populate the register (optional)
   */
  constructor(initialValue?: string, size = 8) {
    if (size <= 0) {
      throw new Error("Size must be a positive integer.");
    }
    this.bits = Array<number>(size).fill(0); // Default to all 0s

    if (initialValue) {
      if (!/^[01]+$/.test(initialValue)) {
        throw new Error("Invalid binary string.");
      }
      if (initialValue.length > size) {
        throw new Error("Binary string exceeds the size of the register.");
      }

      // Reverse to store LSB first
      const binaryArray = initialValue.split("").reverse().map(Number);
      for (let i = 0; i < binaryArray.length; i++) {
        this.bits[i] = binaryArray[i];
      }
    }
  }

  // Get the current state as a binary string
  get value(): string {
    return this.bits.slice().reverse().join("").padStart(this.bits.length, "0"); // Reverse for MSB-first format
  }

  toString() {
    return this.value;
  }

  clear(): void {
    this.bits.fill(0);
  }

  /**
   * Set a bit at the specified position
   */
  set(position: number, value: boolean | 0 | 1): void {
    if (position < 0 || position >= this.bits.length) {
      throw new Error("Position is out of range.");
    }
    this.bits[position] = value ? 1 : 0;
  }

  /**
   * Toggle a bit at the specified position
   */
  flip(position: number): void {
    if (position < 0 || position >= this.bits.length) {
      throw new Error("Position is out of range.");
    }
    this.bits[position] = this.bits[position] === 1 ? 0 : 1;
  }

  /**
   * Check if a bit at the specified position is set
   */
  bit(position: number): boolean {
    if (position < 0 || position >= this.bits.length) {
      throw new Error("Position is out of range.");
    }
    return Boolean(this.bits[position]);
  }

  /**
   * Static method to create an instance from a binary string
   */
  static fromBinary(binary: string, size?: number): BinaryRegister {
    if (!/^[01]+$/.test(binary)) {
      throw new Error("Invalid binary string.");
    }
    return new BinaryRegister(binary, size);
  }

  /**
   * Static method to create an instance from a numeric value
   */
  static fromValue(value: number, size?: number): BinaryRegister {
    if (value < 0) {
      throw new Error("Value must be non-negative.");
    }
    const binaryString = value.toString(2); // Convert to binary string
    return new BinaryRegister(binaryString, size);
  }
}
