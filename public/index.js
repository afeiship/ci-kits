import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactAntAbstractForm from '../src/main';
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
        initialValues: {
          username: 'afeiship'
        },
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
