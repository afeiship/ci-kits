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

  // Mock api
  nx.$api = {
    curds_index: function () {
      return Promise.resolve('index');
    },
    curds_show: function () {
      return Promise.resolve('show');
    },
    curds_update: function () {
      return Promise.resolve('update');
    }
  };

  nx.$route = {
    back: function () {
      console.log('back');
    }
  };

  class App extends ReactAntAbstractForm {
    apiService = nx.$api;
    routeService = nx.$route;
    constructor(props) {
      super(props);
      this.state = {
        meta: {
          formItemLayout: [6, 18],
          initialValues: {},
          fields: [
            {
              key: 'username',
              label: 'User Name',
              tooltip: '用户名',
              rules: [{ max: 10, min: 5 }]
            },
            { key: 'password', label: 'Password', widget: 'password' }
          ]
        }
      };
    }

    componentDidMount() {
      const { meta } = this.state;
      meta.initialValues = {
        username: 'afeiship'
      };
      this.setState({ meta });
    }

    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-ant-abstract-form">
          {this.view()}
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
