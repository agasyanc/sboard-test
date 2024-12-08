import * as PIXI from 'pixi.js-legacy';
import View from './view';
import Document from './doc';
import RectElement from './rect_element';

export default class PIXIView extends View {
  mainContainer:PIXI.Container;
  on_update:Function|null = null;
  selected:PIXI.DisplayObject|null = null;
  constructor(width:number, height:number){
    super(width, height);
    
    const app = new PIXI.Application<HTMLCanvasElement>({
      width: width,
      height: height,
      backgroundColor: 0xffffff,
      forceCanvas: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      eventFeatures: {
        click: true,
        move: true
      }
    });

    this.mainContainer = new PIXI.Container();
    app.stage.addChild(this.mainContainer)

    this.mainContainer.on("childAdded", ()=>{
      this.on_update && this.on_update();
    })
    this.mainContainer.on("childRemoved", ()=>{
      this.on_update && this.on_update();
    })
    this.container.appendChild(app.view)
  }
  render(doc:Document){
    this.mainContainer.removeChildren()
    for (const element of doc.children) {
      if (element instanceof RectElement){
        const rect = new PIXI.Graphics();
        rect.beginFill('black').drawRect(element.x, element.y, element.w, element.h).endFill();
        rect.angle = element.rotation;
        rect.scale.set(element.scale);
        rect.eventMode = "dynamic";
        rect.on('pointerdown', ()=>{
          element.pointerdown();
        })
        rect.on('pointerup', ()=>{
          element.pointerup();
        })
        this.mainContainer.addChild(rect);
      }
    }
  }
}