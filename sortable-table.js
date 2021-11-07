import { SimpleTable } from "./simple-table.js";
import { renderToDom } from "./render-to-dom.js";

export class SortableTable extends SimpleTable {
    applyHandler(){
        const par = document.querySelectorAll("button");
         let btn = par.forEach(el=>{
             el.addEventListener("click", ()=>{
                 let sort = this.data.sort((a, b) =>{
                    var nameA = a[el.value].toUpperCase();
                    var nameB = b[el.value].toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                  this.data = sort;


             })
         });



    }
};