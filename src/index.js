/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function evaluate({ x, y, operator }) {
  return {
    '+': x + y,
    '-': x - y,
    '*': x * y,
    '/': x / y,
    '=': y,
  }[operator];
}

function render(state = {
  accumulator: 0, value: 0, operator: '+', display: 0,
}) {
  const {
    accumulator, value, operator, display,
  } = state;

  function handleClickNumber(input) {
    if (!String(input).match(/[0-9]/g)) return;
    const newValue = value * 10 + input;

    render({
      ...state,
      value: newValue,
      display: newValue,
    });
  }

  function handleClickOperator(input) {
    if (!String(input).match(/[+\-*/=]/g)) return;
    const evaluation = evaluate({ x: accumulator, y: value, operator });

    render({
      accumulator: evaluation,
      value: 0,
      operator: input,
      display: evaluation,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
          <button type="button" onClick={() => handleClickNumber(item)}>{item}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((item) => (
          <button type="button" onClick={() => handleClickOperator(item)}>{item}</button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
