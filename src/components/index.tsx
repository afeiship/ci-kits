import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';
import { Tag, Form, Card, Button, message, Tooltip } from 'antd';
import FormBuilder from 'antd-form-builder';
import nx from '@jswork/next';
import nxIsEmptyObject from '@jswork/next-is-empty-object';
import ReactAdminIcons from '@jswork/react-admin-icons';
import { CardSize } from 'antd/es/card';
import hotkeys from 'hotkeys-js';

const CLASS_NAME = 'react-ant-abstract-form';
const HOT_KEYS = 'cmd+s';
const MESSAGES = {
  OPERATION_DONE: '操作成功',
  ONLY_CREATOR: '请在编辑情况下调用此快捷操作',
  CONTENT_NO_CHANGED: '当前内容没有任何修改'
};
const OPERATION_STATUS = [
  { value: true, color: '#f50', label: '创建', action: 'create' },
  { value: false, color: '#87d068', label: '编辑', action: 'update' }
];

// By default hotkeys are not enabled for INPUT SELECT TEXTAREA elements
hotkeys.filter = nx.stubTrue;

const registerKey = (inName, inCallback) => {
  hotkeys(inName, inCallback);
  return {
    destroy: () => hotkeys.unbind(inName, inCallback)
  };
};

// https://github.com/rekit/antd-form-builder
// https://rekit.github.io/antd-form-builder/examples-v4/

export interface ReactAntAbstractFormProps {
  /**
   * The extended className for component.
   */
  className?: string;
}

interface ReactAntAbstractFormState {
  meta: any;
}

export default class ReactAntAbstractForm extends Component<
  ReactAntAbstractFormProps,
  ReactAntAbstractFormState
> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};

  private hotkeysRes;
  private initialData;

  resources = 'curds';
  size: CardSize = 'small';
  options = {};
  actions = {
    reset: true,
    back: true,
    redirect: true
  };

  routeService: any;
  apiService: any;
  formRef: any;

  constructor(inProps) {
    super(inProps);
    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.hotkeysRes = registerKey(HOT_KEYS, this.handleHotkey);
    this.initialData = null;
    this.state = {
      meta: {}
    };
  }

  get touchedView() {
    return (
      <Tooltip title="此处有修改">
        <em style={{ color: '#f60' }}>{this.isTouched && <ReactAdminIcons value="tree" />}</em>
      </Tooltip>
    );
  }

  get titleView() {
    const item = OPERATION_STATUS[+this.isEdit];
    return (
      <span className="mr-5_ mr_">
        <ReactAdminIcons value="form" />
        <Tag color={item.color}>{item.label}</Tag>
        <span>
          操作面板
          {this.touchedView}
        </span>
      </span>
    );
  }

  get params() {
    return nx.get(this.props, 'match.params');
  }

  get isEdit() {
    return !nxIsEmptyObject(this.params);
  }

  get fieldsValue() {
    return this.formRef.getFieldsValue();
  }

  get isTouched() {
    if (!this.formRef || !this.initialData) return false;
    return JSON.stringify(this.initialData) !== JSON.stringify(this.formRef.getFieldsValue());
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
    const { reset, back } = this.actions;
    const { formItemLayout } = this.state.meta;
    return (
      <Form.Item wrapperCol={{ span: formItemLayout[1], offset: formItemLayout[0] }}>
        <div className="mr-10_ mr_">
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          {reset && (
            <Button htmlType="reset" type="default">
              取消
            </Button>
          )}
          {back && (
            <Button type="default" onClick={() => this.routeService.back()}>
              返回
            </Button>
          )}
        </div>
      </Form.Item>
    );
  }

  componentDidMount() {
    this.handleInit().then((res) => {
      this.initialData = res;
      this.forceUpdate();
    });
    // route service is async
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }

  componentWillUnmount() {
    this.hotkeysRes.destroy();
  }

  /**
   * Template method.
   * @param {*} inData
   * @returns
   */
  setResponse(inData) {
    return inData;
  }

  save(inEvent, inRedirect) {
    const action = this.isEdit ? 'update' : 'create';
    const data = nx.mix(null, this.params, inEvent, this.options);
    if (!this.isTouched) return message.info(MESSAGES.CONTENT_NO_CHANGED);

    return new Promise((resolve, reject) => {
      this.apiService[`${this.resources}_${action}`](data)
        .then((res) => {
          message.success(MESSAGES.OPERATION_DONE);
          inRedirect && this.routeService.back();
          resolve(res);
        })
        .catch(reject);
    });
  }

  handleHotkey = (inEvent) => {
    inEvent.preventDefault();
    if (!this.isEdit) return message.info(MESSAGES.ONLY_CREATOR), Promise.resolve();
    return this.save(this.formRef.getFieldsValue(), false);
  };

  handleInit() {
    if (this.isEdit) {
      const data = nx.mix(null, this.params, this.options);
      const { meta } = this.state;
      return new Promise((resolve) => {
        this.apiService[`${this.resources}_show`](data).then((res) => {
          const response = this.setResponse(res);
          nx.mix(meta.initialValues, response);
          this.setState({ meta });
          this.formRef.setFieldsValue(response);
          resolve(this.fieldsValue);
        });
      });
    }
    return Promise.resolve(this.formRef.getFieldsValue());
  }

  handleFinish = (inEvent) => {
    const { redirect } = this.actions;
    return this.save(inEvent, redirect);
  };

  // @ts-ignore
  handleValuesChange(inValues?, inAllValues?) {
    this.forceUpdate();
  }

  view(): ReactNode {
    const { className } = this.props;
    const { meta } = this.state;
    return (
      <Card
        size={this.size}
        title={this.titleView}
        extra={this.extraView}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}>
        <Form
          ref={(formRef) => (this.formRef = formRef)}
          onFinish={this.handleFinish}
          onValuesChange={this.handleValuesChange}>
          <FormBuilder meta={meta} form={this.formRef} />
          {this.submitView}
        </Form>
      </Card>
    );
  }

  render(): ReactNode {
    return null;
  }
}
