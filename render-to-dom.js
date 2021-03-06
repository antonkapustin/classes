export const renderToDom = (data, template) => {
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
      result = result.replace(element, value);
    }
  });

  return result;
};

const l = [
  {
    country: ["sity"],
  },
  {
    sity: "grodno",
  },
];

let e = l.forEach((el) => {
  let arr = el;
  let x;
  for (let keys in arr) {
    x = arr[keys];
  }
  console.log(x);
  return x;
});
console.log(e);
