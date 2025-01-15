export class PointerArray<T> {
  protected items: T[] = [];
  protected pointer: number;

  constructor() {
    this.pointer = 0;
  }

  get length(): number {
    return this.items.length;
  }

  get pointerAtEnd() {
    return this.pointer === this.items.length;
  }

  /**
   * View the current item at the pointer location.
   */
  read(): T | undefined {
    return this.items[this.pointer];
  }

  append(item: T) {
    this.items.push(item);
  }

  prepend(item: T) {
    this.items = [item, ...this.items];
  }

  setItems(items: T[]) {
    this.items = items;
    this.resetPointer();
  }

  resetPointer() {
    this.pointer = 0;
  }

  getPointer(): number {
    return this.pointer;
  }

  setPointer(index: number | "head") {
    if (index === "head") {
      this.resetPointer();
    } else if (index >= 0 && index < this.items.length) {
      this.pointer = index;
    } else {
      throw new Error("Pointer out of bounds");
    }
  }

  advancePointer() {
    if (this.pointerAtEnd) {
      throw new Error(`Cannot advance pointer. Pointer at end.`);
    }
    this.pointer = this.pointer + 1;
  }

  findIndex(comparator: (item: T) => boolean) {
    return this.items.findIndex(item => comparator(item));
  }

  fromPointer() {
    return this.items.slice(this.pointer);
  }
}
