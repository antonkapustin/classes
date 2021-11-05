import {renderToDom} from "./render-to-dom.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data;
        this.hostElement = hostElement,
        this.options = options
    }
    render(){
        const grid = document.createElement("div");
        let headerStr = this.renderHeader();
        let bodyStr = this.renderBody();

        grid.classList.add('grid');

        grid.innerHTML = headerStr + bodyStr;
        this.hostElement.append(grid);
    }

    renderHeader() {

        let head = this.options.map(el => {
            return `<p class="grid__element">${el.label}</p>`
        })

        return `<label class="grid__header" for="menu">
                    ${head.join("")}
                 </label>`
    }

    renderBody() {
        let template = this.options.map(el => {
            return `<p class="grid__element">{{${el.key}}}</p>`
        })

        template = template.join("");

         let array = this.data.map(el => {
            return renderToDom(el, template)
        });


        return `<div class="grid__body">
        ${array.join("")}
     </div>`
    }
}