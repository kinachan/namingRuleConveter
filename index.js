const CASES = {
  Camel: 0,
  Snake: 1,
  Pascal: 2,
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
  }
}

const conveterMapper = {
  [CASES.Camel]: converter.toCamelCase,
  [CASES.Snake]: converter.toSnakeCase,
  [CASES.Pascal]: converter.toPascalCase,
}

// html elements
const textFields = document.getElementById('textField');
const selectCase = document.getElementById('selectCase');
const resultElem = document.getElementById('result');

selectCase.addEventListener('change', (ev) => {
  const selectValue = parseInt(ev.target.value);
  const value = textFields.value;

  if (Number.isNaN(selectValue) || value == null) return;
  const convertFunc = conveterMapper[selectValue];

  if (CASES.Pascal === selectValue) {
    const splitValues = value.split(/\n/);
    resultElem.innerText = splitValues
      .map((val) => convertFunc(val.trim()))
      .join('\n');
  } else {
    resultElem.innerText = convertFunc(value.trim());
  }
});