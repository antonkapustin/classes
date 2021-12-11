import { renderToDom } from "../../utils/renderToTheDom.js";
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
  }
  render(data = this.data) {
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
    let gridElements = this.hostElement.querySelectorAll("[data-dom='grid']");
    gridElements.forEach((el) => {
      el.style.gridTemplateColumns = `25px repeat(${this.options.columns.length}, 1fr)`;
    });
  }
  renderHeader() {
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
  renderBody(data) {
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
  renderInp(data) {
    let template = data.map((el) => {
      return renderToDom(el, this.inpTemplate);
    });
    return `<ul class="options__list">
    ${template.join("")}
    </ul>`;
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
      if (current === null) {
        return;
      } else if (current.classList.contains("options__input")) {
        break;
      }
      if (current.parentElement) {
        current = current.parentElement;
      }
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
