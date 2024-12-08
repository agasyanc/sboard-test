import Element from "./element";

export default class RectElement extends Element {
  w:number
  h:number
  constructor(x:number, y: number, w:number, h:number, r:number=0, s:number=0){
    super()
    this.x = x
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = r;
    this.scale = s;
  }
  toJSON(): any {
    return {
      type: 'rect',
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      r: this.rotation,
      s: this.scale
    }
  }
} 