import View from "./view";

export default class Controls extends View {
  on_random:Function|null = null;
  on_save:Function|null = null;
  constructor(){
    super(200);

    const random_btn = document.createElement('button')
    random_btn.innerText = 'Add random'
    random_btn.addEventListener('click', () => {
      this.on_random && this.on_random()
    })
    this.container.appendChild(random_btn);

    const save_pdf_btn = document.createElement('button');
    save_pdf_btn.innerText = 'Save PDF';
    save_pdf_btn.addEventListener('click', () => {
      this.on_save && this.on_save()
    })
    this.container.appendChild(save_pdf_btn);
  }
}