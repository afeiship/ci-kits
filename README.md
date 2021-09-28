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

## usage
1. import css
  ```scss
  @import "~@jswork/boilerplate-react-component/dist/style.css";

  // or use sass
  @import "~@jswork/boilerplate-react-component/dist/style.scss";

  // customize your styles:
  $boilerplate-react-component-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactAntAbstractForm from '@jswork/boilerplate-react-component';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <ReactAntAbstractForm />
      </Container>
    );
  };

  ```

## preview
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
