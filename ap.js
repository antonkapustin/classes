import {SimpleTable} from "./simple-table.js";
import {data} from "./data.js";

const options = [{
    label:"телефон",
    key:"phone"
},
{
    label:"имя",
    key:"name"
},
{
    label:"фамилия",
    key:"surename"
}]
const simple = document.querySelector("#simple");

const simpleTable = new SimpleTable(data, simple, options);

class SortbleTable extends SimpleTable {};

const sort = new SortbleTable(data, simple, options);

simpleTable.render();