export default class Eventer {
  events:Event[] = [];
  watch(name:string, callback:Function){
    this.events.push(new Event(name, callback));
  }
  fire(name:string, ...args:any[]){
    this.events.forEach(event => {
      if(event.name === name){
        event.fire(...args);
      }
    })
  }
}

class Event{
  constructor(public name:string, public callback:Function) {
    
  }
  fire(...args:any[]){
    this.callback(...args);
  }
}