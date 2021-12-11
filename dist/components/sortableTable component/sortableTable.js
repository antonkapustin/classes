import { SimpleTable } from "../simpleTable component/simpleTable.js";
import { SortableOptions } from "../simpleTable component/simpleTableEnums.js";
export class SortableTable extends SimpleTable {
  constructor(data, hostElement, options) {
    super(data, hostElement, options);
    this.initialData = [...this.data];
    this.sort();
  }
  render() {
    this.headerTemplate =
      '<button class="grid__element grid__element_button" type="button" value="{{key}}">{{label}}</button>';
    super.render();
  }
  applyHandler() {
    this.hostElement.addEventListener("click", this.onSort.bind(this));
  }
  onSort(event) {
    let current = event.target;
    while (current !== this.hostElement) {
      if (current.classList.contains("grid__element_button")) {
        break;
      }
      if (current.parentElement) {
        current = current.parentElement;
      }
    }
    if (current === this.hostElement) {
      return;
    }
    let key = current.value;
    if (this.options.sortable === undefined) {
      this.options.sortable = { key: key, value: SortableOptions.Asc };
    } else {
      if (key === this.options.sortable.key) {
        if (this.options.sortable.value === SortableOptions.Asc) {
          this.options.sortable.value = SortableOptions.Desc;
        } else if (this.options.sortable.value === SortableOptions.Desc) {
          this.options.sortable.value = null;
        } else if (this.options.sortable.value === null) {
          this.options.sortable.value = SortableOptions.Asc;
        }
      } else {
        this.options.sortable.key = key;
        this.options.sortable.value = SortableOptions.Asc;
      }
    }
    this.sort();
    this.hostElement.removeEventListener("click", this.onSort);
    this.render();
  }
  sort() {
    if (this.options.sortable === undefined) {
      return;
    }
    const key = this.options.sortable.key;
    let data = [...this.initialData].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];
      if (valueA > valueB) {
        return 1;
      } else if (valueA < valueB) {
        return -1;
      } else {
        return 0;
      }
    });
    if (this.options.sortable.value === SortableOptions.Asc) {
      this.data = data;
      return;
    }
    if (this.options.sortable.value === SortableOptions.Desc) {
      this.data = data.reverse();
      return;
    }
    if (this.options.sortable.value === null) {
      this.data = [...this.initialData];
      return;
    }
  }
}
