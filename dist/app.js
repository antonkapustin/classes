import { data } from "./data";
import { SimpleTable } from "./components/simpleTable component/simpleTable";
import { SortableTable } from "./components/sortableTable component/sortableTable";
import { PaginationTable } from "./components/paginationTable component/PaginationTable components";
import { SortableOptions } from "./components/simpleTable component/simpleTableEnums";
import { Filter } from "./utils/Filter";
const options = {
    columns: [
        {
            label: "имя",
            key: "name",
            template: "{{data.name}}",
            checked: "checked",
        },
        {
            label: "фамилия",
            key: "surename",
            template: "{{data}}",
            checked: "checked",
        },
        {
            label: "телефон",
            key: "phone",
            template: "{{data}} -",
            checked: "checked",
        },
        {
            label: "возраст",
            key: "age",
            template: "{{data}}",
            checked: "checked",
        },
        {
            label: "замужество",
            key: "isActive",
            template: "{{data}}",
            checked: "checked",
        },
        {
            label: "Дата Рождения",
            key: "registered",
            template: "{{data}}",
            checked: "checked",
        },
        {
            label: "ID",
            key: "_id",
            template: "{{data}}",
            checked: "checked",
        },
    ],
};
const simple = document.querySelector("#simple");
const simpleTable = new SimpleTable(data, simple, options);
const sort = document.querySelector("#sort");
const sortTable = new SortableTable(data, sort, options);
const preSort = document.querySelector("#pre-sort");
const preSortTable = new SortableTable(data, preSort, Object.assign(Object.assign({}, options), {
    sortable: {
        key: "name",
        value: SortableOptions.Asc,
    },
}));
const pagination = document.querySelector("#pagination");
const paginationTable = new PaginationTable(data, pagination, options);
const filter = document.querySelector("#simple-filter");
const filterClass = new Filter(filter);
const pagination2 = document.querySelector("#pagination_filter");
const paginationFilter = new PaginationTable(data, pagination2, options);
filterClass.emitter.subscribe("filter", (filter) => {
    paginationFilter.filter.call(paginationFilter, { name: `${filter}` });
});
