import React from 'react';
import ReactAntAbstractForm from '../../src/main';
import styled from 'styled-components';
import nx from '@jswork/next';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
  .is-body {
    padding: 20px;
    background: #fff;
    width: 50%;
    min-width: 320px;
    margin: 0 auto;
  }

  .mr-5_ {
    > * {
      margin-right: 5px;
    }
  }

  .mr-10_ {
    > * {
      margin-right: 10px;
    }
  }
`;

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
    super.componentDidMount();
    const { meta } = this.state;
    meta.initialValues = {
      username: 'afeiship'
    };
    this.setState({ meta });
  }

  handleValuesChange(inValues, inAllValues) {
    super.handleValuesChange(inValues, inAllValues);
    console.log('handle chagne.', inValues, inAllValues);
  }

  render() {
    return this.view();
  }
}

export default () => {
  return (
    <Container>
      <App />
    </Container>
  );
};
