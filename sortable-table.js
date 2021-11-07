import { SimpleTable } from "./simple-table.js";
import { renderToDom } from "./render-to-dom.js";

// export class SortableTable extends SimpleTable {
//     renderBody() {
//         let template = this.options.map(el => {
//             return `<p class="grid__element">{{${el.key}}}</p>`
//         })

//         template = template.join("");

//          let array = this.data.map(el => {
//             return renderToDom(el, template)
//         });

//         return `<div class="grid__body">
//         ${array.join("")}
//      </div>`
//     }
// };

