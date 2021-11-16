import { SimpleTable } from "./simple-table.js";

export class PaginationTable extends SimpleTable{
    constructor(data, hostElement, options){
        super(data,hostElement, options)
        this.currentPage = 1
        this.rows = 10
    }

    render(){
        this.pagination([...this.data], this.rows,this.currentPage)
    }

    applyHandler(){
        this.hostElement.addEventListener("click", this.onPagination.bind(this));
    }

    onPagination(event){
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

          let key = current.value;


          this.pagination([...this.data],this.rows, key);
          this.hostElement.removeEventListener("click", this.onPagination);
    }

    renderBtn(n){
        let btns = `<button class="pagination__button" value="1">1</button>`;

        let pages = Math.ceil(this.data.length/n);

        for(let i = 2; i<=pages;i++){
            btns = btns + `<button class="pagination__button" type="button" value="${i}">${i}</button>`
        }

        return `<button class="pagination__button" type="button" value="prev">Prev</button>
                    ${btns}
                <button class="pagination__button" type="button" value="next">Next</button>`
    }

    pagination(data, rows, page){
        if(page === "prev"){
            if(this.currentPage === 1){
                let pushedBtn = this.hostElement.querySelector(`[value="${page}"]`);
                pushedBtn.disabled = true;
            }else{
            this.currentPage--;
            this.pagination([...this.data], rows,this.currentPage);
            }
        }else if(page === "next"){
            this.currentPage++
            this.pagination([...this.data], rows,this.currentPage);
        }else {
            this.currentPage = page;
        page--

        let start = rows * page;
        let end = start + rows;
        let showItem = data.slice(start, end);

        const grid = document.createElement("div");

        let headerStr = this.renderHeader();
        let bodyStr = this.renderBody(showItem)

        grid.classList.add('grid');
        
        grid.innerHTML = headerStr + bodyStr;
    
        this.hostElement.innerHTML = "";
        this.hostElement.append(grid);

        const paginationDiv = document.createElement("div");
        let paginationBtn = this.renderBtn(rows);


        paginationDiv.classList.add("paginationBtn");
        paginationDiv.innerHTML = paginationBtn;
        this.hostElement.append(paginationDiv);

        let pushedBtn = this.hostElement.querySelector(`[value="${this.currentPage}"]`);

        pushedBtn.classList.add("pagination__button_active");
        }
    }
}