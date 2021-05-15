import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Card, Button, message } from 'antd';
import FormBuilder from 'antd-form-builder';
import nxIsEmptyObject from '@jswork/next-is-empty-object';
import ReactAdminIcons from '@jswork/react-admin-icons';

const CLASS_NAME = 'react-ant-abstract-form';

// https://github.com/rekit/antd-form-builder
// https://rekit.github.io/antd-form-builder/examples-v4/

export default class ReactAntAbstractForm extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string
  };

  static defaultProps = {};

  resources = 'curds';
  size = 'small';
  options = {};
  actions = {
    reset: true,
    redirect: true
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      meta: {}
    };
  }

  get titleView() {
    return (
      <span className="mr-5_ mr_">
        <ReactAdminIcons value="form" />
        <span>操作面板</span>
      </span>
    );
  }

  get params() {
    return nx.get(this.props, 'match.params');
  }

  get isEdit() {
    return !nxIsEmptyObject(this.params);
  }

  get extraView() {
    return (
      <div className="is-extra">
        <Button size={'small'} onClick={() => this.routeService.back()}>
          <ReactAdminIcons size={12} value="return" />
          返回
        </Button>
      </div>
    );
  }

  get submitView() {
    const { reset } = this.actions;
    return (
      <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
        <div className="mr-10_ mr_">
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          {reset && (
            <Button htmlType="reset" type="default">
              取消
            </Button>
          )}
        </div>
      </Form.Item>
    );
  }

  componentDidMount() {
    this.handleInit();
    // route service is async
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }

  handleInit() {
    if (this.isEdit) {
      const data = nx.mix(null, this.params, this.options);
      const { meta } = this.state;
      this.apiService[`${this.resources}_show`](data).then((res) => {
        nx.mix(meta.initialValues, res);
        this.setState({ meta });
        this.formRef.setFieldsValue(res);
      });
    }
    return Promise.resolve();
  }

  handleFinish = (inEvent) => {
    const action = this.isEdit ? 'update' : 'create';
    const data = nx.mix(null, this.params, inEvent, this.options);
    const { redirect } = this.actions;
    return new Promise((resolve, reject) => {
      this.apiService[`${this.resources}_${action}`](data)
        .then((res) => {
          message.info('操作成功');
          redirect && this.routeService.back();
          resolve(res);
        })
        .catch(reject);
    });
  };

  view() {
    const { className, ...props } = this.props;
    const { meta } = this.state;
    return (
      <Card
        size={this.size}
        title={this.titleView}
        extra={this.extraView}
        data-component={CLASS_NAME}
        className={classNames('m-10', CLASS_NAME, className)}>
        <Form
          ref={(formRef) => (this.formRef = formRef)}
          onFinish={this.handleFinish}
          onValuesChange={() => this.forceUpdate()}>
          <FormBuilder meta={meta} form={this.formRef} />
          {this.submitView}
        </Form>
      </Card>
    );
  }

  render() {
    return null;
  }
}
