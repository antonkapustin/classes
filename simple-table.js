import { renderToDom } from "./render-to-dom.js";
import { EventEmiter } from "./eventEmiter.js";

export class SimpleTable {
  constructor(data, hostElement, options) {
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
    this.emitter = new EventEmiter();
  }
  render(data = this.data) {
    this.options.columns = this.options.columns.filter((element) => {
      return element.checked.indexOf("checked") === 0;
    });
    const grid = document.createElement("div");
    const list = document.createElement("ul");

    let headerStr = this.renderHeader();
    let bodyStr = this.renderBody(data);
    const inputs = this.renderInp(this.showedOptions);

    grid.classList.add("grid");
    list.classList.add("options__list");

    grid.innerHTML = headerStr + bodyStr;
    list.innerHTML = inputs;

    this.hostElement.innerHTML = "";
    this.hostElement.append(list);
    this.hostElement.append(grid);

    let gridElements = this.hostElement.querySelectorAll("[data-dom='grid']");
    gridElements.forEach((el) => {
      el.style.gridTemplateColumns = `25px repeat(${this.options.columns.length}, 1fr)`;
    });
  }

  renderHeader() {
    let template = this.options.columns.map((el) => {
      return renderToDom(el, this.headerTemplate);
    });

    return `<div class="grid__header" data-dom="grid">
    <label class="grid__element_label">
        <input type="checkbox" class="element_input">
    </label>
                    ${template.join("")}
                 </div>`;
  }

  renderBody(data = this.data) {
    let template = this.options.columns.map((el) => {
      return renderToDom(el, this.bodyTemplate);
    });

    template = `<p class="grid__element"></p>` + template.join("");

    let array = data.map((el) => {
      return renderToDom(el, template);
    });

    return `<div class="grid__body" data-dom="grid">
                    ${array.join("")}
                </div>`;
  }
  renderInp(data) {
    let template = data.map((el) => {
      return renderToDom(el, this.inpTemplate);
    });
    return template.join("");
  }

  applyHandler() {
    this.hostElement.addEventListener("click", this.onShowOptions.bind(this));
  }

  filter(element) {
    this.data = this.initialeData.filter((el) => {
      return (
        el.name.toUpperCase().trim().indexOf(element.name.toUpperCase()) === 0
      );
    });
    this.render();
  }

  onShowOptions(event) {
    let current = event.target;
    while (current !== this.hostElement) {
      if (current.classList.contains("options__input")) {
        break;
      }
      current = current.parentElement;
    }
    if (current === this.hostElement) {
      return;
    }
    this.showOptions(current.value);
    this.render();
  }

  showOptions(value) {
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
