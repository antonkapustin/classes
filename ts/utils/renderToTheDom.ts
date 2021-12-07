import { IData } from "../components/simpleTable component/simpleTableInterfaces";

export const renderToDom = (data: IData[], template: string): string => {
  let matchMarkers = template.match(/{{\w.+?}}/gi);

  let matchKeys = template.match(/(?<={{)\w.+?(?=}})/gi);

  let keys = matchKeys.map((element) => {
    element = element.replace("[", ".").replace("]", "");

    return element.split(".");
  });

  let result = template;

  matchMarkers.forEach((element, i) => {
    let value = keys[i].reduce((sum, curr) => {
      let x = sum[curr];
      return x;
    }, data);

    if (value === undefined) {
      result = result.replace(element, "");
    } else {
      result = result.replace(element, value);
    }
  });
  return result;
};
