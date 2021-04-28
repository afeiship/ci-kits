import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import nxIsEmptyObject from '@jswork/next-is-empty-object';

const CLASS_NAME = 'react-ant-abstract-form';

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

  get titleView() {
    return (
      <span className="mr-5_ mr_">
        {/* <Icon type="form" /> */}
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
        <Button size={'small'}>
          返回
        </Button>
      </div>
    );
  }

  componentDidMount() {
    // this.initUpsert();
  }

  initUpsert() {
    if (this.isEdit) {
      this.$api[`${this.resources}_show`](this.params).then((res) => {
        this.setState({
          fieldsValue: nx.antFieldsValue(res)
        });
      });
    }
  }

  handleSubmit = (inEvent) => {
    const action = this.isEdit ? 'update' : 'create';
    const data = nx.mix(null, this.params, inEvent);
    return new Promise((resolve) => {
      this.$api[`${this.resources}_${action}`](data).then((res) => {
        message.info('操作成功');
        resolve();
      });
    });
  };

  render() {
    const { className, children, ...props } = this.props;

    return (
      <Card
        title={this.titleView}
        extra={this.extraView}
        data-component={CLASS_NAME}
        className={classNames('m-10', CLASS_NAME, className)}
        {...props}>
        FORM START HERE@
      </Card>
    );
  }
}
