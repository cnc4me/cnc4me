export class Position {
  static create(vector?: { X: number; Y: number; Z: number }) {
    return new Position(vector?.X, vector?.Y, vector?.Z);
  }

  constructor(
    public X: number = NaN,
    public Y: number = NaN,
    public Z: number = NaN
  ) {
    //
  }
}
