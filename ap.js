import {SimpleTable} from "./simple-table.js";
import {data} from "./data.js";
import {SortableTable} from "./sortable-table.js";
import { PaginationTable } from "./pagination-table.js";
import { EventEmiter } from "./eventEmiter.js";
import { Filter } from "./filter.js";

const options = {
    columns:[
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
}],
sortable:{}
};

const tableDataEmiter = new EventEmiter();

const simple = document.querySelector("#simple");
const simpleTable = new SimpleTable(data, simple, options);


const sort = document.querySelector("#sort");
const sortTable = new SortableTable(data, sort, options);

const preSort = document.querySelector("#pre-sort");

const preSortTable = new SortableTable(data, preSort, {
    ...options,
    ...{
        sortable:{
            key:"name",
            value:"ASC"
        }
    }
});

const pagination = document.querySelector("#pagination");
const paginationTable = new PaginationTable(data, pagination, options);

const filter = document.querySelector("#simple-filter");
const filterClass = new Filter(filter);

const pagination2 = document.querySelector("#pagination_filter");
const paginationFilter = new PaginationTable(data, pagination2, options)



// спред оператор 
// remove handler befor render
//this.hostElement
//dragonDrop движение мыши вниз вешать ивент, вверх убирать ивент
// js event loop telegramm
// read object assign();