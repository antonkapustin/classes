import { SimpleTable } from "./simple-table.js";

export class SortableTable extends SimpleTable {
    constructor(data, hostElement, options){
        super(data, hostElement, options)
        this.initialData = [...this.data]
        this.sort();
    }
    render(){
        this.headerTemplate = '<button class="grid__element grid__element_button" type="button" value="{{key}}">{{label}}</button>';
        super.render()
    }
    applyHandler(){
        this.hostElement.addEventListener("click",this.onSort.bind(this));
    }

    onSort(event){
        let current = event.target;

        while (current !== this.hostElement) {
            if (current.classList.contains("grid__button")) {
              break;
            }
            current = current.parentElement;
          }
          if (current === this.hostElement) {
            return;
          }

          let key = current.value;


          if (key === this.options.sortable.key) {
            if (this.options.sortable.value === "ASC") {
              this.options.sortable.value = "DESC";
            } else if (this.options.sortable.value === "DESC") {
              this.options.sortable.value = null;
            } else if (this.options.sortable.value === null) {
              this.options.sortable.value = "ASC";
            }
          } else {
            this.options.sortable.key = key;
            this.options.sortable.value = "ASC";
          }

          this.sort()
          this.hostElement.removeEventListener("click", this.onSort)
          this.render()
    }
    sort(){
        let data = [...this.initialData].sort((a,b)=>{
            let valueA = a[this.options.sortable.key];
            let valueB = b[this.options.sortable.key];

            if(valueA > valueB){
                return 1
            }else if(valueA < valueB){
                return -1
            } else{
                return 0
            }
        })
        if (this.options.sortable.value === "ASC") {
            return this.data = data
          }
          if (this.options.sortable.value === "DESC") {
            return this.data = data.reverse();
              
          }
          if (this.options.sortable.value === null) {
            return this.data = [...this.initialData];
          }

    }
}
