import {renderToDom} from "./render-to-dom.js";

export class SimpleTable {
    constructor(data, hostElement, options){
        this.data = data
        this.hostElement = hostElement
        this.options = options
        this.headerTemplate = '<button class="grid__element grid__button" type="button" value="{{key}}">{{label}}</button>'
        this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>'
        this.render()
        this.applyHandler()

    }
    render(data=this.data){
        let pogBtns = document.querySelectorAll(".pogination__button");


        const grid = document.createElement("div");
        let headerStr = this.renderHeader();
        let bodyStr = this.pagination()

        grid.classList.add('grid');
        
        grid.innerHTML = headerStr + bodyStr;

        this.hostElement.append(grid);

       
        pogBtns.forEach(el =>{
            el.addEventListener("click", ()=>{

                bodyStr= this.pagination(this.data, 10, el.value);
                this.render();
            })
        })

    }

    renderHeader() {

        let template = this.options.map(el => {
            return renderToDom(el, this.headerTemplate);
        })

        return `<div class="grid__header" data-dom="header">
                    ${template.join("")}
                 </div>`
    }

    renderBody(data=this.data) {
        let template = this.options.map(el => {
            return renderToDom(el, this.bodyTemplate)
        })

        template = template.join("");

         let array = data.map(el => {
            return renderToDom(el, template)
        });

        return `<div class="grid__body">
                    ${array.join("")}
                </div>`
    }

    renderBtn(n=10){
        let btns = `<button class="pogination__button" value="1">1</button>`
        for(let i = 2; i<=(this.data.length/n);i++){
            btns = btns + `<button class="pogination__button" value="${i}">${i}</button>`
        }
        return `<div class="pogination">
                    ${btns}
                </div>`
    }
    applyHandler(){};

    pagination(data=this.data, rows=10, page=1){
        const pogination = document.querySelector(".pogination");
        let template = this.renderBtn();
        pogination.innerHTML = template



            page--

            let start = rows * page;
            let end = start + rows;
            let showItem = data.slice(start, end);

            return this.renderBody(showItem);
    }
}
