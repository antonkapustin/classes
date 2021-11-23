
export class Filter {
    constructor(hostElement){
        this.hostElement = hostElement

        this.render()
        this.applyHandlers()
    }
    render(){
        let input = '<input class="filter__input" type="text">';
        let button = '<button class="filter__button" type="button">Search</button>';

        this.hostElement.innerHTML = input + button;
    }
    applyHandlers(){
        let button = this.hostElement.querySelector(".filter__button");
        button.addEventListener("click", this.onFilter.bind(this));
    }
    onFilter(){
        let input = this.hostElement.querySelector(".filter__input");
        return input.value
    }
}