export  const renderToDom = (data, template) => {

      let matchMarkers = template.match(/{{\w.+?}}/gi);

      let matchKeys = template.match(/(?<={{)\w.+?(?=}})/gi);

      let keys = matchKeys.map((element)=>{
        element = element.replace("[",".").replace("]", "");
        return element.split(".");

      })

      let result = template;

      matchMarkers.forEach((element, i) => {
        let value = keys[i].reduce((sum, curr)=>{
          return sum[curr];
        },data);

        result = result.replace(element, value);
      });

      return result;
    };