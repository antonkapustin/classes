import {SimpleTable} from "./simple-table.js";
import {data} from "./data.js";
//import {SortableTable} from "./sortable-table.js"

const options = [
{
    label:"имя",
    key:"name",
    template: "{{data.name}}",
},
{
    label:"фамилия",
    key:"surename",
    template: "{{data}}",
},
{
    label:"телефон",
    key:"phone",
    template: "{{data}} -",
}]

const simple = document.querySelector("#simple");

const values = document.querySelector("[data-dom=radio]:checked");


const simpleTable = new SimpleTable(data, simple, options);



//const sort = new SortableTable(data, simple, options);

//sort.render();


// const sortableDefault = ... new SortableTable()
// const sortablePredef = ... new SortableTable()
// const options = {
    // sortable: {
    //     key: 'name',
    //     value: 'ASC'
    // },
    // columnst: []
// }