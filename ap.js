import {SimpleTable} from "./simple-table.js";
import {data} from "./data.js";
import {SortableTable} from "./sortable-table.js";
import { PaginationTable } from "./pagination-table.js";
import { EventEmiter } from "./eventEmiter.js";
import { Filter } from "./filter.js";
import { ShowOptions } from "./showOptions.js";

const options = {
    columns:[
{
    label:"имя",
    key:"name",
    template: "{{data.name}}",
    checked: "checked"
},
{
    label:"фамилия",
    key:"surename",
    template: "{{data}}",
    checked: "checked"
},
{
    label:"телефон",
    key:"phone",
    template: "{{data}} -",
    checked: "checked"
},
{
    label:"возраст",
    key:"age",
    template: "{{data}}",
    checked: "checked"
},
{
    label:"замужество",
    key:"isActive",
    template: "{{data}}",
    checked: "checked"
},
{
    label:"Дата Рождения",
    key:"registered",
    template: "{{data}}",
    checked: "checked"
},
{
    label:"ID",
    key:"_id",
    template: "{{data}}",
    checked: "checked"
}
],
sortable:{},
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

filterClass.emitter.subscribe("filter", (filter) => {
    paginationFilter.filter.call(paginationFilter, {name:`${filter}`});
});

const moreOptions = document.querySelector("#show-options");
const moreOptionsClass = new ShowOptions(moreOptions, options);
moreOptionsClass.emitter.subscribe("ShowOptions", simpleTable.applyData.bind(simpleTable));


