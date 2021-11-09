import {renderToDom} from "./render-to-dom.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data;
        this.hostElement = hostElement,
        this.options = options
        this.headerTemplate = '<button class="grid__element grid__button" type="button" value="{{key}}">{{label}}</button>';
        this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>'
        this.render()
        this.applyHandler()
    }
    render(){
        if (this.data.length > 10){
            const pagination = document.createElement("div");
            pagination.classList.add("pagination");
            let btn = `<button class="pagination__button" type="button" value="1">1</button>`
            for(let i=2;i<=(this.data.length/10);i++){
                btn = btn +  `<button class="pagination__button" type="button" value="${i}">${i}</button>`
            }
            pagination.innerHTML = btn;
            this.hostElement.append(pagination)
        }
        function showItems(data, rows, page){
            page--

            let start = rows * page;
            let end = start + rows;
            let showItem = data.slice(start, end);
            return showItem
        }

        this.data = showItems(this.data, 10, 1);
        let pagBtn = document.querySelectorAll(".pagination__button");
            pagBtn.forEach(el=>{
                el.addEventListener("click",()=>{
                    this.data = showItems(this.data, 10, el.value);
                    this.renderBody()
                })
            })

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
}
