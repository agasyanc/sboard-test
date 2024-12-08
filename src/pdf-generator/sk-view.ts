import View from './view';
import CanvasKitInit, { CanvasKit, Canvas } from '../types/canvaskit';
import { savePDF } from './utils';
import Document from './doc';
import RectElement from './rect_element';
import Element from './element';


export default class SKView extends View {
  on_load:Function|null = null;
  kit:CanvasKit|null = null;
  canvas_el:HTMLCanvasElement|null = null;
  canvas:Canvas|null = null;
  constructor(width:number, height:number){
    super(width, height)
  }
  load(path:string){
    
    CanvasKitInit({
      locateFile: ()=> path
    }).then((CanvasKit)=>{
      this.kit = CanvasKit;
      
      this.canvas_el = document.createElement('canvas');
      this.canvas_el.width = this.width * devicePixelRatio;
      this.canvas_el.height = this.height * devicePixelRatio;

      this.container.appendChild(this.canvas_el)

      this.on_load && this.on_load();
      
    })
  }
  render(doc:Document){
    if (!this.kit || !this.canvas_el) return;
    const surface = this.kit.MakeSWCanvasSurface(this.canvas_el);
    if (!surface) {
      console.error('Failed to create CanvasKit surface');
      return;
    }
    this.canvas = surface.getCanvas();
    this.canvas.scale(devicePixelRatio, devicePixelRatio);
    
    for (const element of doc.children) {
      this._render_element(element, this.canvas);
    }
    surface.flush();
  }
  _render_element(element:Element, canvas:Canvas){
    if (!this.kit) return;
    const paint = new this.kit.Paint();
    if (element instanceof RectElement){
      canvas.save()
      canvas.scale(element.scale, element.scale)
      canvas.rotate(element.rotation, 0, 0)
      canvas.translate(element.x, element.y)
      
      
      const rect = this.kit.XYWHRect(0, 0, element.w, element.h)
      canvas.drawRect(rect, paint)
      canvas.restore()
    }
  }
  export_pdf(doc:Document){
    if (!this.kit || !this.canvas) return;
    
    const pageCanvas = this.canvas.beginPDFDocument(this.width, this.height);

    for (const element of doc.children) {
      this._render_element(element, pageCanvas);
    }

    const hex = this.canvas.exportToPDFHex();
    console.log(pageCanvas, hex);
    
    savePDF(hex , 'file.pdf')

  }
}