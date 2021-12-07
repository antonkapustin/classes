import { EventEmiter } from "../../eventEmiter";

export class Filter {
  hostElement: Element;
  emitter: EventEmiter;

  constructor(hostElement) {
    this.hostElement = hostElement;
    this.emitter = new EventEmiter();

    this.render();
    this.applyHandlers();
  }
  render(): void {
    let input = '<input class="filter__input" type="text">';
    let button = '<button class="filter__button" type="button">Search</button>';

    this.hostElement.innerHTML = input + button;
  }
  applyHandlers(): void {
    let button = this.hostElement.querySelector(".filter__button");
    button.addEventListener("click", this.onFilter.bind(this));
  }
  onFilter(): string {
    let input: HTMLInputElement =
      this.hostElement.querySelector(".filter__input");
    this.emitter.emit("filter", input.value);
    return input.value;
  }
}
