import {SimpleTable} from "./simple-table.js";
import {data} from "./data.js";
import { renderToDom } from "./render-to-dom.js";

const options = [
{
    label:"имя",
    key:"name"
},
{
    label:"фамилия",
    key:"surename"
},
{
    label:"телефон",
    key:"phone"
}]

const simple = document.querySelector("#simple");

const values = document.querySelector("[data-dom=radio]:checked");


const simpleTable = new SimpleTable(data, simple, options);

class SortbleTable extends SimpleTable {
    renderBody() {
        let template = this.options.map(el => {
            return `<p class="grid__element">{{${el.key}}}</p>`
        })

        template = template.join("");

         let array = this.data.map(el => {
            return renderToDom(el, template)
        });
        console.log(options[0].key);

        return `<div class="grid__body">
        ${array.join("")}
     </div>`
    }
};

const sort = new SortbleTable(data, simple, options,);

//simpleTable.render();
sort.render();