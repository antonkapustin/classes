import {renderToDom} from "./render-to-dom.js";

import { EventEmiter } from "./eventEmiter.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data
        this.hostElement = hostElement
        this.options = options
        this.headerTemplate = '<p class="grid__element" >{{label}}</p>'
        this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>'
        this.initialeData = [...data]

        setTimeout(()=>{
            this.render() 
            this.applyHandler()},
        )
        this.emitter = new EventEmiter();
    }
    applyData(){
        this.options.columns = this.options.columns.filter((el)=>{
            return el.showed === "checked";
        })
        console.log(this.options.columns)
        this.render();
    }
    render(data){
        const grid = document.createElement("div");

        let headerStr = this.renderHeader();
        let bodyStr = this.renderBody(data)

        grid.classList.add('grid');
        
        grid.innerHTML = headerStr + bodyStr;

        this.hostElement.innerHTML = "";
        this.hostElement.append(grid);

        

    }

    renderHeader() {

        let template = this.options.columns.map(el => {
            return renderToDom(el, this.headerTemplate);
        })

        return `<div class="grid__header" data-dom="grid">
                    ${template.join("")}
                 </div>`
    }

    renderBody(data=this.data) {
        let template = this.options.columns.map(el => {
            return renderToDom(el, this.bodyTemplate)
        })

        template = template.join("");

         let array = data.map(el => {
            return renderToDom(el, template)
        });

        return `<div class="grid__body" data-dom="grid">
                    ${array.join("")}
                </div>`
    }

    applyHandler(){};

    filter(element){
        this.data = this.initialeData.filter((el)=>{ 
           return el.name.toUpperCase().trim().indexOf(element.name.toUpperCase()) === 0;
        });
        this.render();
    }
}
