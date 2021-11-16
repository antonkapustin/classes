import { SimpleTable } from "./simple-table.js";

export class PaginationTable extends SimpleTable{
    constructor(data, hostElement, options){
        super(data,hostElement, options)
        this.initialeData = [...this.data]
        this.pagination()
    }
    applyHandler(){
        this.hostElement.addEventListener("click", this.onPagination.bind(this))
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

          this.pagination([...this.initialeData],10, key);
    }





    renderBtn(n=10){
        let btns = `<button class="pagination__button" value="1">1</button>`
        for(let i = 2; i<=(this.data.length/n);i++){
            btns = btns + `<button class="pagination__button" value="${i}">${i}</button>`
        }
        return `<div class="pagination">
                    ${btns}
                </div>`
    }
    pagination(data=this.data, rows=10, page=1){
        page--

        let start = rows * page;
        let end = start + rows;
        let showItem = data.slice(start, end);

        const grid = document.createElement("div");

        let headerStr = this.renderHeader();
        let bodyStr = this.renderBody(showItem)
        console.log(bodyStr)
    
        grid.classList.add('grid');
        
        grid.innerHTML = headerStr + bodyStr;
    
        this.hostElement.innerHTML = "";
        this.hostElement.append(grid);

        const paginationDiv = document.createElement("div");
        let paginationBtn = this.renderBtn();

        paginationDiv.classList.add("pagination");
        paginationDiv.innerHTML = paginationBtn;
        this.hostElement.append(paginationDiv);


    }
}