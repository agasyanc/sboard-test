import Eventer from "./eventer";
import Element from "./element";
import RectElement from "./rect_element";

export default class Document extends Eventer{
  children:Element[] = [];
  constructor() {
    super();
  }
  add(element:Element){
    element.parent = this;
    element.watch('update', ()=>{
      this.fire('update')
    })
    this.children.push(element);
    this.fire('update');
  }
  add_rect(x:number, y: number, w: number, h:number, rotation:number=0, scale:number=1){
    const rect = new RectElement(x, y, w, h, rotation, scale);
    this.add(rect);
  }
  random(){
    const x = Math.random() * 250;
    const y = Math.random() * 250;
    const w = Math.random() * 250;
    const h = Math.random() * 250;
    const rotation = Math.random() * 30;
    const scale = Math.random() * 2;
    this.add_rect(x, y, w, h, rotation, scale);
    // this.add_rect(x, y, w, h);
  }
}