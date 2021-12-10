import { SimpleTable } from "../simpleTable component/simpleTable";
import { IData } from "../simpleTable component/simpleTableInterfaces";
import { IOptions } from "../simpleTable component/simpleTableInterfaces";
import { Page } from "./PaginationEnums";

export class PaginationTable extends SimpleTable {
  currentPage: number;
  rows: number;

  constructor(data: IData[], hostElement: Element, options: IOptions) {
    super(data, hostElement, options);
    this.currentPage = 1;
    this.rows = 10;
  }

  render(): void {
    this.pagination([...this.data], this.rows, this.currentPage);
  }

  applyHandler(): void {
    this.hostElement.addEventListener("click", this.onPagination.bind(this));
  }

  onPagination(event: Event): void {
    let current = event.target as HTMLButtonElement;

    while (current !== this.hostElement) {
      if (current.classList.contains("pagination__button")) {
        break;
      }
      current = current.parentElement as HTMLButtonElement;
    }
    if (current === this.hostElement) {
      return;
    }

    let key = +current.value;

    this.pagination([...this.data], this.rows, key);
    this.hostElement.removeEventListener("click", this.onPagination);
  }

  renderBtn(n: number): string {
    let btns = `<button class="pagination__button" value="1">1</button>`;

    let pages = Math.ceil(this.data.length / n);

    for (let i = 2; i <= pages; i++) {
      btns =
        btns +
        `<button class="pagination__button" type="button" value="${i}">${i}</button>`;
    }

    return `<button class="pagination__button" type="button" value="prev">Prev</button>
                    ${btns}
                <button class="pagination__button" type="button" value="next">Next</button>`;
  }

  pagination(data: IData[], rows: number, page: Page | number): void {
    // TODO: ReThink
    if (page === Page.prev) {
      if (this.currentPage === 1) {
        let pushedBtn = this.hostElement.querySelector(
          `[value="${page}"]`
        ) as HTMLInputElement;
        pushedBtn.disabled = true;
      } else {
        this.currentPage--;
        this.pagination([...this.data], rows, this.currentPage);
      }
    } else if (page === Page.next) {
      this.currentPage++;
      this.pagination([...this.data], rows, this.currentPage);
    } else {
      this.currentPage = page;
      page--;

      let start = rows * page;
      let end = start + rows;
      let showItem = data.slice(start, end);

      const grid = document.createElement("div");

      let headerStr = this.renderHeader();
      let bodyStr = this.renderBody(showItem);

      grid.classList.add("grid");

      grid.innerHTML = headerStr + bodyStr;

      this.hostElement.innerHTML = "";
      this.hostElement.append(grid);

      const paginationDiv = document.createElement("div");
      let paginationBtn = this.renderBtn(rows);

      paginationDiv.classList.add("paginationBtn");
      paginationDiv.innerHTML = paginationBtn;
      this.hostElement.append(paginationDiv);

      let pushedBtn = this.hostElement.querySelector(
        `[value="${this.currentPage}"]`
      );
      if (pushedBtn === null) {
        return;
      }
      pushedBtn.classList.add("pagination__button_active");
    }
  }
}
