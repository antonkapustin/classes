import { IData } from "./simpleTableInterfaces";
import { IFilter } from "./simpleTableInterfaces";
import { IOptions } from "./simpleTableInterfaces";

export class SimpleTable {
  data: IData[];
  hostElement: Element;
  options: IOptions;
  headerTemplate: string;
  bodyTemplate: string;
  initialeData: IData[];

  constructor(data: IData[], hostElement: Element, options: IOptions) {
    this.data = data;
    this.hostElement = hostElement;
    this.options = options;
    this.headerTemplate = '<p class="grid__element" >{{label}}</p>';
    this.bodyTemplate = '<p class="grid__element">{{{{key}}}}</p>';
    this.initialeData = [...data];

    setTimeout(() => {
      this.render();
      this.applyHandler();
    });
  }
  render(): void {
    const grid = document.createElement("div");

    let headerStr = this.renderHeader();
    let bodyStr = this.renderBody(this.data);

    grid.classList.add("grid");

    grid.innerHTML = headerStr + bodyStr;

    this.hostElement.innerHTML = "";
    this.hostElement.append(grid);
  }
  renderHeader(): string {
    let template = this.options.columns.map((el) => {
      return renderToDom(el, this.headerTemplate);
    });

    return `<div class="grid__header" data-dom="grid">
                    ${template.join("")}
                 </div>`;
  }
  renderBody(data: IData[]): string {
    let template = this.options.columns
      .map((el) => {
        return renderToDom(el, this.bodyTemplate);
      })
      .join("");

    let array = this.data.map((el) => {
      return renderToDom(el, template);
    });

    return `<div class="grid__body" data-dom="grid">
                    ${array.join("")}
                </div>`;
  }
  applyHandler(): void {}
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
}
