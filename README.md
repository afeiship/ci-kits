# react-ant-abstract-form
> For curd form based on react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-abstract-form
```

## properties
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |
| value     | object | false    | null    | The changed value.                    |
| onChange  | func   | false    | noop    | The change handler.                   |


## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-abstract-form/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-abstract-form/dist/style.scss";

  // customize your styles:
  $react-ant-abstract-form-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactAntAbstractForm from '@jswork/react-ant-abstract-form';
  import './assets/style.scss';

  class App extends React.Component {
    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-ant-abstract-form">
          <ReactAntAbstractForm className="mb-5 has-text-white" />
          <button className="button is-primary is-fullwidth">Start~</button>
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-ant-abstract-form/


## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-abstract-form/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-abstract-form
[version-url]: https://npmjs.org/package/@jswork/react-ant-abstract-form

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-abstract-form
[license-url]: https://github.com/afeiship/react-ant-abstract-form/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-abstract-form
[size-url]: https://github.com/afeiship/react-ant-abstract-form/blob/master/dist/react-ant-abstract-form.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-abstract-form
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-abstract-form
