import {renderToDom} from "./render-to-dom.js";

import { EventEmiter } from "./eventEmiter.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data
        this.hostElement = hostElement
        this.options = options
        this.headerTemplate = '<p class="grid__element" scope="col" >{{label}}</p>'
        this.bodyTemplate = '<p class="grid__element" scope="row">{{{{key}}}}</p>'

        setTimeout(()=>{
            this.render() 
            this.applyHandler()},
        )
        this.emitter = new EventEmiter();
    }
    render(){
        const grid = document.createElement("div");

        let headerStr = this.renderHeader();
        let bodyStr = this.renderBody()

        grid.classList.add('grid');
        
        grid.innerHTML = headerStr + bodyStr;

        this.hostElement.innerHTML = "";
        this.hostElement.append(grid);

    }

    renderHeader() {

        let template = this.options.columns.map(el => {
            return renderToDom(el, this.headerTemplate);
        })

        return `<div class="grid__header">
                    ${template.join("")}
                 </div>`
    }

    renderBody(data=this.data) {
        let template = this.options.columns.map(el => {
            return renderToDom(el, this.bodyTemplate)
        })

        template = template.join("");

         let array =data.map(el => {
            return renderToDom(el, template)
        });

        return `<div class="grid__body">
                    ${array.join("")}
                </div>`
    }

    applyHandler(){};

    filter(element){
        console.log(element)
        let value 
        let foundValue = this.data.map((el)=>{
            if(el.name.toUpperCase() === element.name.toUpperCase()){
                value = [el]
            } else {
                return 
            }
        })
        this.data = value;
        this.render()
    }
}
