import { EventEmiter } from "./EventEmiter";

export class Filter {
  hostElement: Element;
  emitter: EventEmiter;

  constructor(hostElement: Element) {
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
    if (button === null) {
      return;
    }
    button.addEventListener("click", this.onFilter.bind(this));
  }
  onFilter(): string {
    let input = this.hostElement.querySelector(
      ".filter__input"
    ) as HTMLInputElement;
    this.emitter.emit("filter", input.value);
    return input.value;
  }
}
