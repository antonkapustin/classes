import { SimpleTable } from "../simpleTable component/simpleTable.js";
export class PaginationTable extends SimpleTable {
  constructor(data, hostElement, options) {
    super(data, hostElement, options);
    this.currentPage = 1;
    this.rows = 10;
    this.data = this.pagination(
      [...this.initialeData],
      this.rows,
      this.currentPage
    );
  }
  render() {
    super.render();
    const paginationDiv = document.createElement("div");
    let paginationBtn = this.renderBtn(this.rows);
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
  applyHandler() {
    this.hostElement.addEventListener("click", this.onPagination.bind(this));
  }
  onPagination(event) {
    let current = event.target;
    while (current !== this.hostElement) {
      if (current.classList.contains("pagination__button")) {
        break;
      }
      current = current.parentElement;
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
  renderBtn(n) {
    let btns = `<button class="pagination__button" value="1">1</button>`;
    let pages = Math.ceil(this.initialeData.length / n);
    for (let i = 2; i <= pages; i++) {
      btns =
        btns +
        `<button class="pagination__button" type="button" value="${i}">${i}</button>`;
    }
    return `<button class="pagination__button" type="button" value="prev">Prev</button>
                    ${btns}
                <button class="pagination__button" type="button" value="next">Next</button>`;
  }
  pagination(data, rows, page) {
    // TODO: ReThink
    this.currentPage = page;
    page--;
    let start = rows * page;
    let end = start + rows;
    let showItem = data.slice(start, end);
    return showItem;
  }
}
