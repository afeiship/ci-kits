import React, { Component } from 'react';
import { Tag, Form, Card, Button, message, Tooltip, Space } from 'antd';
import { FormBuilder } from '@jswork/antd-form-builder';
import nx from '@jswork/next';
import type { CardSize } from 'antd/lib/card/Card';
import hotkeys from 'hotkeys-js/dist/hotkeys';
import {
  ArrowLeftOutlined,
  MehOutlined,
  FormOutlined,
  SaveOutlined,
  ReloadOutlined,
  DiffOutlined
} from '@ant-design/icons';

import '@jswork/next-dom-event';
import '@jswork/next-is-empty-object';
import '@jswork/next-get2get';

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
  location?: any;
  navigate?: any;
  params?: any;
}

interface ReactAntAbstractFormState {
  meta: any;
  previousState?: any;
  busy?: boolean;
}

export default class ReactAntAbstractForm extends Component<
  ReactAntAbstractFormProps,
  ReactAntAbstractFormState
> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};

  private hotkeysRes;
  private winkeyRes;

  resources = 'curds';
  size: CardSize = 'small';
  options = {};
  rawJSON = false;
  actions = {
    resetAble: true,
    backAble: true,
    refreshAble: true,
    redirectAble: true
  };

  apiService: any;
  formRef: any;

  constructor(inProps) {
    super(inProps);
    this.hotkeysRes = registerKey(HOT_KEYS, this.handleHotkey);
    this.state = nx.mix(null, { meta: {}, previousState: null, buzy: false }, this.initialState());
    this.init();
  }

  get touchedView() {
    return (
      <Tooltip title="此处有修改">
        <em style={{ color: '#f60' }}>{this.isTouched && <DiffOutlined />}</em>
      </Tooltip>
    );
  }

  get titleView() {
    const item = OPERATION_STATUS[+this.isEdit];
    return (
      <Space>
        <FormOutlined />
        <Tag style={{ margin: 0 }} color={item.color}>
          {item.label}
        </Tag>
        <Space>
          <span>操作面板</span>
          {this.touchedView}
        </Space>
      </Space>
    );
  }

  get params() {
    return nx.get2get(this.props, ['match.params', 'params']);
  }

  get isEdit() {
    return !nx.isEmptyObject(this.params);
  }

  get fieldsValue() {
    return this.formRef?.getFieldsValue();
  }

  get isTouched() {
    if (!this.rawJSON) return this.formRef?.isFieldsTouched();
    const { previousState } = this.state;
    if (!this.formRef || !previousState) return false;
    return JSON.stringify(previousState) !== JSON.stringify(this.fieldsValue);
  }

  get extraView() {
    const { busy } = this.state;
    return (
      <Space>
        <Button
          loading={busy}
          icon={<ReloadOutlined />}
          size={'small'}
          children="刷新"
          onClick={this.load}
        />
        <Button icon={<ArrowLeftOutlined />} size={'small'} onClick={() => history.back()}>
          返回
        </Button>
      </Space>
    );
  }

  get submitView() {
    const { resetAble, backAble } = this.actions;
    const { formItemLayout } = this.state.meta;
    return (
      <Form.Item wrapperCol={{ span: formItemLayout[1], offset: formItemLayout[0] }}>
        <Space>
          <Button
            disabled={!this.isTouched}
            htmlType="submit"
            type="primary"
            icon={<SaveOutlined />}
            children="保存"
          />
          {resetAble && <Button icon={<MehOutlined />} htmlType="reset" children="取消" />}
          {backAble && (
            <Button icon={<ArrowLeftOutlined />} onClick={() => history.back()} children="返回" />
          )}
        </Space>
      </Form.Item>
    );
  }

  /**
   * @template
   *
   */
  initialState(): any {
    return null;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {}

  /**
   * @template
   * Get form props.
   */
  getFormProps(): any {
    return {};
  }

  componentDidMount() {
    window['ss'] = this;
    this.winkeyRes = nx.DomEvent.on(window as any, 'keyup', this.handleWinKeyup);
    void this.load();
    // route service is async
    setTimeout(() => {
      nx.set(history, 'current', this.props);
    }, 0);
  }

  componentWillUnmount() {
    const hasMarked = document.title.includes('*');
    this.hotkeysRes.destroy();
    this.winkeyRes.destroy();
    if (hasMarked) document.title = document.title.slice(0, -1);
  }

  /**
   * @template
   * @param {*} inData
   * @returns
   */
  transformResponse(inData) {
    return inData;
  }

  /**
   * @template
   * Get value from api response.
   * @param inValue
   */
  fromRawValue(inValue) {
    return this.rawJSON ? { value: JSON.stringify(inValue, null, 2) } : inValue;
  }

  /**
   * @template
   * Transform value to submit.
   * @param inValue
   */
  toRawValue(inValue) {
    return this.rawJSON ? JSON.parse(inValue.value) : inValue;
  }

  load = () => {
    return this.handleResponse();
  };

  save(inEvent, inRedirect) {
    const action = this.isEdit ? 'update' : 'create';
    const value = this.toRawValue(inEvent);
    const data = nx.mix(null, this.params, value, this.options);
    if (!this.isTouched) return message.info(MESSAGES.CONTENT_NO_CHANGED);

    return new Promise((resolve, reject) => {
      this.apiService[`${this.resources}_${action}`](data)
        .then((res) => {
          void message.success(MESSAGES.OPERATION_DONE);
          inRedirect && history.back();
          this.isEdit && this.load();
          this.setState({ previousState: this.fieldsValue });
          resolve(res);
        })
        .catch(reject);
    });
  }

  handleWinKeyup = () => {
    const hasMarked = document.title.includes('*');
    if (this.isTouched) {
      !hasMarked && (document.title = document.title + '*');
    } else {
      hasMarked && (document.title = document.title.slice(0, -1));
    }
  };

  handleHotkey = (inEvent) => {
    inEvent.preventDefault();
    if (!this.isEdit) return message.info(MESSAGES.ONLY_CREATOR), Promise.resolve();
    return this.save(this.fieldsValue, false);
  };

  handleResponse() {
    if (this.isEdit) {
      const data = nx.mix(null, this.params, this.options);
      const { meta } = this.state;
      this.setState({ busy: true });
      return new Promise((resolve) => {
        this.apiService[`${this.resources}_show`](data).then((res) => {
          const response = this.transformResponse(res);
          const resValue = this.fromRawValue(response);
          nx.mix(meta.initialValues, resValue);
          this.setState({ meta, busy: false, previousState: resValue });
          this.formRef.setFieldsValue(resValue);
          resolve(resValue);
        });
      });
    }
    return Promise.resolve(this.fieldsValue);
  }

  handleFinish = (inEvent) => {
    const { value } = inEvent.target;
    const { redirectAble } = this.actions;
    return this.save(value, redirectAble);
  };

  handleInit = (inEvent) => {
    const { value } = inEvent.target;
    this.formRef = value;
  };

  handleChange = () => {
    this.forceUpdate();
  };

  view() {
    const { navigate, location, params, ...props } = this.props;
    const { meta, busy } = this.state;
    const computedBusy = this.rawJSON ? false : busy;

    return (
      <Card loading={computedBusy} size={this.size} title={this.titleView} extra={this.extraView}>
        <FormBuilder
          meta={meta}
          onInit={this.handleInit}
          onChange={this.handleChange}
          onFinish={this.handleFinish}
          {...this.getFormProps()}
          {...props}>
          {this.submitView}
        </FormBuilder>
      </Card>
    );
  }

  render(): React.ReactNode {
    return null;
  }
}
