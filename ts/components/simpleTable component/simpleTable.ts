import { IData } from "./simpleTableInterfaces";
import { IFilter } from "./simpleTableInterfaces";
import { IOptions } from "./simpleTableInterfaces";
import { IOptionsColumn } from "./simpleTableInterfaces";
import { renderToDom } from "../../utils/renderToTheDom";

export class SimpleTable {
  data: IData[];
  hostElement: Element;
  options: IOptions;
  headerTemplate: string;
  bodyTemplate: string;
  initialeData: IData[];
  inpTemplate: string;
  showedOptions: IOptionsColumn[];

  constructor(data: IData[], hostElement: Element, options: IOptions) {
    this.data = data;
    this.hostElement = hostElement;
    this.options = options;
    this.headerTemplate = '<p class="grid__element" >{{label}}</p>';
    this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>';
    this.inpTemplate = `<li class="option__item">
        <label class="options__label">
        <input class="options__input" type="checkbox" value="{{key}}" {{checked}}>
        <span class="options__text">{{key}}</span>
        </label>
        </li>`;
    this.showedOptions = [...options.columns];
    this.initialeData = [...data];

    setTimeout(() => {
      this.render();
      this.applyHandler();
    });
  }
  render(data = this.data): void {
    this.options.columns = this.options.columns.filter((element) => {
      return element.checked.indexOf("checked") === 0;
    });
    const grid = document.createElement("div");

    let headerStr = this.renderHeader();
    let bodyStr = this.renderBody(data);

    grid.classList.add("grid");

    grid.innerHTML = headerStr + bodyStr;

    this.hostElement.innerHTML = "";
    this.hostElement.append(grid);

    let gridElements = this.hostElement.querySelectorAll(
      "[data-dom='grid']"
    ) as NodeListOf<HTMLElement>;
    gridElements.forEach((el) => {
      el.style.gridTemplateColumns = `25px repeat(${this.options.columns.length}, 1fr)`;
    });
  }
  renderHeader(): string {
    let template = this.options.columns.map((el) => {
      return renderToDom(el, this.headerTemplate);
    });
    const inputs = this.renderInp(this.showedOptions);

    return `<div class="grid__header" data-dom="grid">
    <label class="grid__element_label">
        <input type="checkbox" class="grid__element_input">

    ${inputs}
    </label>
                    ${template.join("")}
                 </div>`;
  }
  renderBody(data: IData[]): string {
    let template = this.options.columns
      .map((el) => {
        return renderToDom(el, this.bodyTemplate);
      })
      .join("");

    template = `<p class="grid__element"></p>` + template;

    let array = this.data.map((el) => {
      return renderToDom(el, template);
    });

    return `<div class="grid__body" data-dom="grid">
                    ${array.join("")}
                </div>`;
  }
  renderInp(data: IOptionsColumn[]): string {
    let template = data.map((el) => {
      return renderToDom(el, this.inpTemplate);
    });
    return `<ul class="options__list">
    ${template.join("")}
    </ul>`;
  }
  applyHandler(): void {
    this.hostElement.addEventListener("click", this.onShowOptions.bind(this));
  }
  filter(element: IFilter) {
    this.data = this.initialeData.filter((el) => {
      return (
        (el.name as string)
          .toUpperCase()
          .trim()
          .indexOf(element.name.toUpperCase()) === 0
      );
    });
    this.render();
  }
  onShowOptions(event: Event): void {
    let current = event.target as HTMLInputElement;
    while (current !== this.hostElement) {
      if (current === null) {
        return;
      } else if (current.classList.contains("options__input")) {
        break;
      }
      if (current.parentElement) {
        current = current.parentElement as HTMLInputElement;
      }
    }
    if (current === this.hostElement) {
      return;
    }
    this.showOptions(current.value);
    this.render();
  }
  showOptions(value: string): void {
    this.options.columns = this.showedOptions.map((el) => {
      if (el.key === value) {
        if (el.checked === "checked") {
          el.checked = "";
        } else {
          el.checked = "checked";
        }
        return el;
      } else {
        return el;
      }
    });
  }
}
