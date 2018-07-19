var plugin = require('./');
var { transform } = require('babel-core');

it('works', () => {
  var example = `
    console.log(a);
    console.warn(a);
    console.info(a);
    console.error(a);
  `;
  const { code } = transform(example, {
    plugins: [plugin],
  });

  expect(code).toMatchSnapshot();
});

it('works with a parent', () => {
  var example = `
  function onChange() {
    console.log(...things, a, b,'c', 4);
    console.warn(...things, a, b,'c', 4);
    console.info(...things, a, b,'c', 4);
    console.error(...things, a, b,'c', 4);
  }
  `;

  const { code } = transform(example, {
    plugins: [plugin],
  });

  expect(code).toMatchSnapshot();
});

it('does not change non-console logging functions', () => {
  var example = `
  function onChange(a) {
  }

  onChange(a);
  window.setTimeout(onChange, 500);
  console.group(a);
  console.groupEnd(a);
  `;

  const { code } = transform(example, {
    plugins: [plugin],
  });

  expect(code).toMatchSnapshot();
});
