import { SortableOptions } from "./simpleTableEnums";

export interface ISortable {
    key:string,
    value: SortableOptions | null
}

export interface IFilter{
    name:string
}

export interface IData {
    [key:string]: string | boolean | number
}

export interface IOptions {
    columns: IOptionsColumn[],
    sortable?:ISortable 
}

export interface IOptionsColumn {
    label: string,
    key:string,
    template?:string
    checked:string
}