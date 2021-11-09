import { SimpleTable } from "./simple-table.js";
import { options } from "./ap.js";

export class SortableTable extends SimpleTable {
    applyHandler(){
        let par = document.querySelectorAll(".grid__button");
        let div = document.querySelector(".grid");
        par.forEach((el, i)=>{
             el.addEventListener("click", ()=>{
                 const sort = this.data.sort((a, b) =>{
                    var valueA = a[el.value];
                    var valueB = b[el.value];
                    if (valueA < valueB) {
                      return -1;
                    }
                    if (valueA > valueB) {
                      return 1;
                    }
                    return 0;
                  });

                const element = this.options[i];

                if(element.value === "ASD"){
                    this.data = sort.reverse();
                    element.value = "DESK";
                }else{
                    this.data = sort;
                    element.value = "ASD";
                }
                div.remove();
                const sorted = new SortableTable(sort, simple, options);
             })
         });
    }
};