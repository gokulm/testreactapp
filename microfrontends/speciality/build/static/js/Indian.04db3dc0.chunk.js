(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(t,n,e){"use strict";e.r(n);var a=e(19),r=e(26),o=e(27),c=e(29),s=e(28),i=e(30),u=e(0),l=e.n(u),h=e(57),d=function(t){function n(t){var e;return Object(r.a)(this,n),(e=Object(c.a)(this,Object(s.a)(n).call(this,t))).state={loading:!0,error:!1,restaurant:null},e}return Object(i.a)(n,t),Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=this,n="https://content.demo.microfrontends.com";fetch("".concat(n,"/restaurants/5.json")).then(function(t){return t.json()}).then(function(e){t.setState({restaurant:Object(a.a)({},e,{imageSrc:"".concat(n).concat(e.imageSrc)}),loading:!1})}).catch(function(){t.setState({loading:!1,error:!0})})}},{key:"render",value:function(){return this.state.loading?"Loading":this.state.error?"Sorry, but that restaurant is currently unavailable.":l.a.createElement(h.a,{restaurant:this.state.restaurant})}}]),n}(l.a.Component);n.default=d}}]);
//# sourceMappingURL=Indian.04db3dc0.chunk.js.map