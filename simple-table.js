import {renderToDom} from "./render-to-dom.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data;
        this.hostElement = hostElement,
        this.options = options
        this.headerTemplate = '<p class="grid__element">{{label}}</p>';
        this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>'
        this.render()
        this.applyHandler();
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

        let template = this.options.map(el => {
            return renderToDom(el, this.headerTemplate);
        })
        console.log(template)

        return `<div class="grid__header" >
                    ${template.join("")}
                 </div>`
    }

    renderBody() {
        let template = this.options.map(el => {
            return renderToDom(el, this.bodyTemplate)
        })

        template = template.join("");

         let array = this.data.map(el => {
            return renderToDom(el, template)
        });

        return `<div class="grid__body">
                    ${array.join("")}
                </div>`
    }
    applyHandler(){};
}