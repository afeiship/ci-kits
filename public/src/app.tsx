// @ts-ignore
import React from 'react';
import ReactAntAbstractForm from '../../src/main';
import styled from 'styled-components';
import nx from '@jswork/next';
import ReactUploadMedia from '@jswork/react-upload-media';
import './style.scss';

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

class App extends ReactAntAbstractForm {
  apiService = nx.$api;

  constructor(props) {
    super(props);
    this.state = {
      meta: {
        gutter: 100,
        formItemLayout: [6, 18],
        initialValues: {
          media: []
        },
        fields: [
          {
            key: 'username',
            label: 'User Name',
            tooltip: '用户名',
            rules: [{ max: 10, min: 5 }]
          },
          { key: 'password', label: 'Password', widget: 'password' },
          {
            key: 'media',
            label: 'Media',
            widget: ReactUploadMedia,
            widgetProps: {
              onUpload: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      default: 'https://www.baidu.com/img/bd_logo1.png'
                    });
                  }, 1000);
                });
              }
            }
          }
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
