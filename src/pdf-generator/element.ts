import Document from "./doc";
import Eventer from "./eventer";

export default class Element extends Eventer{
  parent:Document|null = null;
  x:number = 0;
  y:number = 0;
  rotation:number = 0;
  scale:number = 1;
  pointerdown:Function = ()=>{
    console.log("pointerdown");
  };
  pointerup:Function = ()=>{
    console.log("pointerup");
  };
  constructor() {
    super();
  }
  toJSON(){
    throw Error("Element toJSON not implemented");
  }
}