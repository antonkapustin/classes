import { EventEmiter } from "./EventEmiter.js";
export class Filter {
  constructor(hostElement) {
    this.hostElement = hostElement;
    this.emitter = new EventEmiter();
    this.render();
    this.applyHandlers();
  }
  render() {
    let input = '<input class="filter__input" type="text">';
    let button = '<button class="filter__button" type="button">Search</button>';
    this.hostElement.innerHTML = input + button;
  }
  applyHandlers() {
    let button = this.hostElement.querySelector(".filter__button");
    if (button === null) {
      return;
    }
    button.addEventListener("click", this.onFilter.bind(this));
  }
  onFilter() {
    let input = this.hostElement.querySelector(".filter__input");
    this.emitter.emit("filter", input.value);
    return input.value;
  }
}
