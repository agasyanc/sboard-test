import Controls from './controls';
import Document from './doc';
import PIXIView from './pixi-view';
import SKView from './sk-view';

export default class PdfGegerator {
    doc: Document = new Document();
    constructor(container:HTMLElement) {
      
      // get path for wasm file, size of document
      const path = container.dataset.path || '/canvaskit.wasm';
      const w = Number(container.dataset.width || "800");
      const h = Number(container.dataset.height || "600");

      // create skia element
      const sk_view = new SKView(w, h);
      sk_view.on_load = ()=> {

        container.className = 'app'
        const controls_container = document.createElement('div')
        controls_container.className = 'app__controls'
        container.appendChild(controls_container)

        const conrols = new Controls()
        conrols.appendTo(controls_container)

        const pixi_container = document.createElement('div')
        pixi_container.className = 'app__pixi'
        container.appendChild(pixi_container)

        const pixiApp = new PIXIView(w, h);
        pixiApp.appendTo(pixi_container);

        const skia_container = document.createElement('div')
        skia_container.className = 'app__skia'
        container.appendChild(skia_container)
        sk_view.appendTo(skia_container)

        this.doc.watch('update', ()=>{
          pixiApp.render(this.doc);
          sk_view.render(this.doc);
        })

        conrols.on_random = ()=> {
          this.doc.random();
        }
        conrols.on_save = ()=> {
          sk_view.export_pdf(this.doc);
        }

        this.doc.add_rect(234, 123, 43, 54, 23, 1)

      }
      sk_view.load(path)

    }
}
