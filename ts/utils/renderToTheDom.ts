export const renderToDom = (data: Object, template: string): string => {
  let matchMarkers = template.match(/{{\w.+?}}/gi);

  let matchKeys = template.match(/(?<={{)\w.+?(?=}})/gi);

  let keys = matchKeys.map((element) => {
    element = element.replace("[", ".").replace("]", "");

    return element.split(".");
  });

  let result = template;

  matchMarkers.forEach((element, i) => {
    let value = keys[i].reduce((sum, curr) => {
      return sum[curr];
    }, data);

    if (value === undefined) {
      result = result.replace(element, "");
    } else {
      result = result.replace(element, value as string);
    }
  });
  return result;
};
