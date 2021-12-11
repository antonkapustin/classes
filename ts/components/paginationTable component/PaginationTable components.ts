import { SimpleTable } from "../simpleTable component/simpleTable";
import { IData } from "../simpleTable component/simpleTableInterfaces";
import { IOptions } from "../simpleTable component/simpleTableInterfaces";

export class PaginationTable extends SimpleTable {
  currentPage: number;
  rows: number;
  data: IData[];

  constructor(data: IData[], hostElement: Element, options: IOptions) {
    super(data, hostElement, options);
    this.currentPage = 1;
    this.rows = 10;
    this.data = this.pagination(
      [...this.initialeData],
      this.rows,
      this.currentPage
    );
  }

  render(): void {
    super.render();

    const paginationDiv = document.createElement("div");
    let paginationBtn = this.renderBtn();

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

    let maxPage = Math.ceil(this.initialeData.length / this.rows);
    if (this.currentPage === 1) {
      let button = this.hostElement.querySelector(
        "[value='prev']"
      ) as HTMLButtonElement;
      if (button === null) {
        return;
      }
      button.disabled = true;
    } else if (this.currentPage === maxPage) {
      let button = this.hostElement.querySelector(
        "[value='next']"
      ) as HTMLButtonElement;
      button.disabled = true;
    }
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
    if (current.value === "prev") {
      key = this.currentPage - 1;
    } else if (current.value === "next") {
      key = this.currentPage + 1;
    }

    this.data = this.pagination([...this.initialeData], this.rows, key);
    this.hostElement.removeEventListener("click", this.onPagination);
    this.render();
  }

  renderBtn(): string {
    let btns = `<button class="pagination__button" value="1">1</button>`;

    let pages = Math.ceil(this.initialeData.length / this.rows);

    for (let i = 2; i <= pages; i++) {
      btns =
        btns +
        `<button class="pagination__button" type="button" value="${i}">${i}</button>`;
    }

    return `<button class="pagination__button" type="button" value="prev">Prev</button>
                    ${btns}
                <button class="pagination__button" type="button" value="next">Next</button>`;
  }

  pagination(data: IData[], rows: number, page: number): IData[] {
    // TODO: ReThink
    this.currentPage = page;
    page--;
    let start = rows * page;
    let end = start + rows;
    let showItem = data.slice(start, end);
    return showItem;
  }
}
