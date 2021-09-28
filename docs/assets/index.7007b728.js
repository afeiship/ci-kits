import{r as e,n as t,m as s,R as r,a as i,b as a,B as n,F as o,C as c,c as l,d as m,s as u,e as h}from"./vendor.584da5d5.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const d="react-ant-abstract-form";class p extends e.exports.Component{constructor(e){super(e),this.resources="curds",this.size="small",this.options={},this.actions={reset:!0,redirect:!0},this.handleFinish=e=>{const r=this.isEdit?"update":"create",i=t.mix(null,this.params,e,this.options),{redirect:a}=this.actions;return new Promise(((e,t)=>{this.apiService[`${this.resources}_${r}`](i).then((t=>{s.info("操作成功"),a&&this.routeService.back(),e(t)})).catch(t)}))},this.state={meta:{}}}get titleView(){return r.createElement("span",{className:"mr-5_ mr_"},r.createElement(i,{value:"form"}),r.createElement("span",null,"操作面板"))}get params(){return t.get(this.props,"match.params")}get isEdit(){return!a(this.params)}get extraView(){return r.createElement("div",{className:"is-extra"},r.createElement(n,{size:"small",onClick:()=>this.routeService.back()},r.createElement(i,{size:12,value:"return"}),"返回"))}get submitView(){const{reset:e}=this.actions,{formItemLayout:t}=this.state.meta;return r.createElement(o.Item,{wrapperCol:{span:t[1],offset:t[0]}},r.createElement("div",{className:"mr-10_ mr_"},r.createElement(n,{htmlType:"submit",type:"primary"},"保存"),e&&r.createElement(n,{htmlType:"reset",type:"default"},"取消")))}componentDidMount(){this.handleInit(),setTimeout((()=>{t.set(this.routeService,"current",this.props)}),0)}handleInit(){if(this.isEdit){const e=t.mix(null,this.params,this.options),{meta:s}=this.state;this.apiService[`${this.resources}_show`](e).then((e=>{const r=this.setResponse(e);t.mix(s.initialValues,r),this.setState({meta:s}),this.formRef.setFieldsValue(r)}))}return Promise.resolve()}view(){const{className:e}=this.props,{meta:t}=this.state;return r.createElement(c,{size:this.size,title:this.titleView,extra:this.extraView,"data-component":d,className:l(d,e)},r.createElement(o,{ref:e=>this.formRef=e,onFinish:this.handleFinish,onValuesChange:()=>this.forceUpdate()},r.createElement(m,{meta:t,form:this.formRef}),this.submitView))}render(){return null}}p.displayName=d,p.version="__VERSION__",p.defaultProps={};const f=u.div`
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
`;t.$api={curds_index:function(){return Promise.resolve("index")},curds_show:function(){return Promise.resolve("show")},curds_update:function(){return Promise.resolve("update")}},t.$route={back:function(){console.log("back")}};class g extends p{constructor(e){super(e),this.apiService=t.$api,this.routeService=t.$route,this.state={meta:{formItemLayout:[6,18],initialValues:{},fields:[{key:"username",label:"User Name",tooltip:"用户名",rules:[{max:10,min:5}]},{key:"password",label:"Password",widget:"password"}]}}}componentDidMount(){const{meta:e}=this.state;e.initialValues={username:"afeiship"},this.setState({meta:e})}render(){return this.view()}}var v=()=>r.createElement(f,null,r.createElement(g,null));h.render(r.createElement(v,null),document.getElementById("root"));
