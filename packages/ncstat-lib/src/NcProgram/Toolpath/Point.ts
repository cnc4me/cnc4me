// import { Block } from "./Block";

export class Point {
  // static fromBlock(block: Block): Point {
  //   return new Point({
  //     X: block.values.X,
  //     Y: block.values.Y,
  //     Z: block.values.Z
  //   });
  // }

  X?: number;
  Y?: number;
  Z?: number;

  constructor({ X, Y, Z }: { X: number; Y: number; Z: number }) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }
}
