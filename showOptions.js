import { EventEmiter } from "./eventEmiter.js";
import { renderToDom } from "./render-to-dom.js";

export class ShowOptions{
    constructor(hostElement, options){
        this.hostElement = hostElement
        this.options = options
        this.optionsShowed = [...options.columns]
        this.inpTemplate =`<li>
        <label class="options__label">
        <input class="options__input" type="checkbox" value="{{key}}" {{showed}}>
        <span class="options__text">{{key}}</span>
        </label>
        </li>`
        this.emitter = new EventEmiter()
        this.render()
        this.applyHandler()
    }
    render(){
        const list = document.createElement("ul");
        const inputs = this.renderInp()

        list.classList.add('options__list');
        
        list.innerHTML = inputs;

        this.hostElement.innerHTML = "";
        this.hostElement.append(list);
    }

    renderInp(){
        let template = this.options.columns.map(el => {
            return renderToDom(el, this.inpTemplate);
        })
        return template.join("");
    }

    applyHandler(){
        this.hostElement.addEventListener("click",this.onAdd.bind(this));
    }

    onAdd(event){
        let current = event.target;
        while (current !== this.hostElement) {
            if (current.classList.contains("options__input")){
              break;
            }
            current = current.parentElement;
          }
          if (current === this.hostElement) {
            return;
          }
          this.addOrRemove(current.value);
    }

    addOrRemove(value){
        this.options.columns = this.optionsShowed.map((el)=>{
            if(el.key === value){
                if(el.showed === "checked"){
                    el.showed = "";
                } else {
                    el.showed = "checked"
                }
                return el
            } else {
                return el
            }
        })


        this.emitter.emit("ShowOptions", this.options.columns);
    }
}