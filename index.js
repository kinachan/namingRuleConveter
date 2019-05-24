const CASES = {
  Camel: 0,
  Snake: 1,
  Pascal: 2,
  Constant: 3,
}

const converter = {
  toCamelCase(str) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
  },
    
  toSnakeCase(str) {
    const camel = converter.toCamelCase(str);
    return camel.replace(/[A-Z]/g, (s) => {
      return "_" + s.charAt(0).toLowerCase();
    });
  },
  
  toPascalCase(str) {
    const camel = converter.toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  },

  toConstant(str) {
    const snake = converter.toSnakeCase(str);
    return snake.toUpperCase();
  }
}

const conveterMapper = {
  [CASES.Camel]: converter.toCamelCase,
  [CASES.Snake]: converter.toSnakeCase,
  [CASES.Pascal]: converter.toPascalCase,
  [CASES.Constant]: converter.toConstant,
}

// html elements
const textFields = document.getElementById('textField');
const selectCase = document.getElementById('selectCase');
const resultElem = document.getElementById('result');


const convertRun = (selectValue, text) => {
  if (Number.isNaN(selectValue) || text == null) return;
  const convertFunc = conveterMapper[selectValue];

  const splitValues = text.split(/\n/);
  resultElem.innerHTML = splitValues
    .map(val => renderLiElement(val, convertFunc))
    .join('');
}

textFields.addEventListener('change', ev => {
  const text = ev.target.value;
  const selectValue = parseInt(selectCase.value);

  convertRun(selectValue, text);
});

selectCase.addEventListener('change', (ev) => {
  const selectValue = parseInt(ev.target.value);
  const text = textFields.value;

  convertRun(selectValue, text);
});


const renderLiElement = (val, convertFunc) => {
  return `<li>${convertFunc(val.trim())}</li>`;
}