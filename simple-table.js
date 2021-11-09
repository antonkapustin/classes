import {renderToDom} from "./render-to-dom.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data;
        this.hostElement = hostElement,
        this.options = options
        this.headerTemplate = '<button class="grid__element" type="button" value="{{key}}">{{label}}</button>';
        this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>'
        this.render()
        this.applyHandler()
        this.pagination()
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

        return `<div class="grid__header" data-dom="header">
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
    pagination(){
        if (this.data.length > 10){
            const page = document.createElement("div");
            page.classList.add("pagination");
            let numbr = `<button class="pagination__button" type="button">1</button>`
            for(let i=2; i<=(this.data.length/10);i++){
                numbr = numbr + `<button class="pagination__button" type="button">${i}</button>`
            };

            page.innerHTML = numbr;

            this.hostElement.append(page);

        }
    };
}