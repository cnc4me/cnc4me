export class GenericPointerList<T> {
  protected items: T[] = [];
  protected pointer: number;

  constructor() {
    this.pointer = 0;
  }

  get length(): number {
    return this.items.length;
  }

  /**
   * Checks if the current pointer can be advanced to point to the next item in the list.
   *
   * @returns true if the pointer is not at the end of the list, false otherwise.
   */
  get pointerCanAdvance() {
    return this.pointer !== this.items.length;
  }

  /**
   * Checks if the current pointer has reached the end of the list.
   *
   * @returns true if the pointer is at the end of the list, false otherwise.
   */
  get pointerAtEnd() {
    return this.pointerCanAdvance === false;
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

  fromPointer() {
    return this.items.slice(this.pointer);
  }

  getPointer(): number {
    return this.pointer;
  }

  /**
   * Sets the pointer to a specific index in the list.
   * If the index is out of bounds, an Error is thrown.
   *
   * @param index The new index for the pointer.
   * @throws {Error} If the new index is out of bounds.
   */
  setPointer(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.pointer = index;
    } else {
      throw new Error("Pointer out of bounds");
    }
  }

  /**
   * Advances the pointer to the next item in the list.
   *
   * @throws {Error} If the pointer is already at the end of the list.
   */
  advancePointer() {
    if (this.pointerAtEnd) {
      throw new Error(`Cannot advance pointer. Pointer at end.`);
    }
    this.pointer = this.pointer + 1;
  }

  find(predicate: (item: T) => boolean) {
    return this.items.find(predicate);
  }

  filter(predicate: (item: T) => boolean) {
    return this.items.filter(predicate);
  }

  findIndex(predicate: (item: T) => boolean) {
    return this.items.findIndex(predicate);
  }

  forEach(predicate: (item: T) => void) {
    return this.items.forEach(predicate);
  }

  map<R>(predicate: (item: T) => R) {
    return this.items.map(predicate);
  }
}
