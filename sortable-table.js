import { SimpleTable } from "./simple-table.js";
import { renderToDom } from "./render-to-dom.js";

export class SortableTable extends SimpleTable {
    applyHandler(){
        const par = document.querySelectorAll("button");
         let btn = par.forEach(el=>{
             el.addEventListener("click", ()=>{
                 console.log(el.value)
             })
         });


        console.log(btn)

    }
};

