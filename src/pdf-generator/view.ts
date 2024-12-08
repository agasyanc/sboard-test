export default class View {
  container:HTMLElement;
  constructor(public width:number = 500, public height:number = 500) {
    this.container = document.createElement('div');
  }
  appendTo(container:HTMLElement){
    this.container.className = 'view'
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
    container.appendChild(this.container);
  }
}