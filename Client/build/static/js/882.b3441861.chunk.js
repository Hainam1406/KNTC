"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[882],{71285:function(n,e,a){a.d(e,{Z:function(){return s}});a(72791);var t,i=a(17186),o=a(63463),c=a(17192),r=o.ZP.div(t||(t=(0,i.Z)(["\n    text-align: right;\n    display: inline-block;\n    flex: 1;\n    padding: 0 3px 0 0;\n    @media only screen and (max-width: 1336px) {\n        text-align: left;\n        display: block;\n        flex: none;\n        width: 100%;\n        padding: 0 0 10px 0;\n    }\n    button {\n        margin-right: 0px;\n        margin-left: 10px;\n        @media only screen and (max-width: 1336px) {\n            margin-left: 0px;\n            margin-right: 10px;\n        }\n    }\n"]))),u=(0,c.Z)(r),l=a(80184),s=function(n){return(0,l.jsx)(u,{children:n.children})}},41145:function(n,e,a){a.d(e,{z:function(){return o}});var t=a(50678),i=a(72791);function o(n){var e=(0,i.useState)(0),a=(0,t.Z)(e,2),o=a[0],c=a[1];return[o,function(){c(o+1)}]}},36882:function(n,e,a){a.r(e),a.d(e,{default:function(){return fn}});var t,i,o=a(31303),c=a(18489),r=a(50678),u=a(72791),l=a(47375),s=a(4245),h=a(25161),d=a(12437),g=a(763),f=a.n(g),m=a(57144),p=a(52591),Z=a(35667),x=a(71285),N=a(7111),v=a(66914),D=a(36043),C=a(17186),b=a(63463),y=b.ZP.div(t||(t=(0,C.Z)(["\n  .ant-table-selection-column .ant-table-selection {display: none !important}\n"]))),S=a(33032),I=a(84322),j=a.n(I),P=a(65331),T=a(10916),M=a(87309),k=a(49389),w=a(61310),X=a(80184),E=T.Z.Item,L=T.Z.useForm,z=function(n){var e=L(),a=(0,r.Z)(e,1)[0],t=n.dataEdit,i=n.confirmLoading,o=n.visible,l=n.onCancel;(0,u.useEffect)((function(){t.NhomNguoiDungID&&a.setFieldsValue((0,c.Z)({},t))}),[]);var s=function(){var e=(0,S.Z)(j().mark((function e(t){var i;return j().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,a.validateFields();case 3:(i=e.sent).applyType=1,n.onCreate(i);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,X.jsx)(w.Z,{title:"".concat(t.NhomNguoiDungID?"S\u1eeda":"Th\xeam"," th\xf4ng tin nh\xf3m ng\u01b0\u1eddi d\xf9ng"),width:650,visible:o,onCancel:l,footer:[(0,X.jsx)(M.ZP,{onClick:l,children:"H\u1ee7y"},"back"),(0,X.jsx)(M.ZP,{htmlType:"submit",type:"primary",form:"myForm",loading:i,onClick:s,children:"L\u01b0u"},"submit")],children:(0,X.jsxs)(T.Z,{form:a,children:[(0,X.jsx)(E,{name:"NhomNguoiDungID",hidden:!0}),(0,X.jsx)(E,(0,c.Z)((0,c.Z)({label:"T\xean nh\xf3m ng\u01b0\u1eddi d\xf9ng",name:"TenNhom",rules:[(0,c.Z)({},P.REQUIRED)]},P.ITEM_LAYOUT_SMALL_2),{},{children:(0,X.jsx)(k.Z,{})})),(0,X.jsx)(E,(0,c.Z)((0,c.Z)({label:"Ghi ch\xfa",name:"GhiChu"},P.ITEM_LAYOUT_SMALL_2),{},{children:(0,X.jsx)(k.Z.TextArea,{autoSize:{minRows:3}})}))]})})},_=a(28532),B=a(70297),O=T.Z.Item,V=function(n){var e=u.createRef(),a=n.confirmLoading,t=n.visible,i=n.onCancel,o=n.dataModalAddUser,r=o.DanhSachNguoiDung,l=o.NhomNguoiDungID;(0,u.useEffect)((function(){var n=e.current;n&&n.setFieldsValue({NhomNguoiDungID:l})}),[]);var s=function(){var a=(0,S.Z)(j().mark((function a(t){var i;return j().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t.preventDefault(),a.next=3,e.current.validateFields();case 3:i=a.sent,(0,n.onCreate)(i);case 6:case"end":return a.stop()}}),a)})));return function(n){return a.apply(this,arguments)}}();return(0,X.jsx)(w.Z,{title:"Th\xeam ng\u01b0\u1eddi d\xf9ng v\xe0o nh\xf3m",width:600,visible:t,onCancel:i,footer:[(0,X.jsx)(_.Z,{onClick:i,children:"H\u1ee7y"},"back"),(0,X.jsx)(_.Z,{htmlType:"submit",type:"primary",form:"myForm",loading:a,onClick:s,children:"L\u01b0u"},"submit")],children:(0,X.jsxs)(T.Z,{ref:e,children:[(0,X.jsx)(O,{name:"NhomNguoiDungID",hidden:!0}),(0,X.jsx)(O,(0,c.Z)((0,c.Z)({label:"Ch\u1ecdn ng\u01b0\u1eddi d\xf9ng",name:"NguoiDungID",rules:[(0,c.Z)({},P.REQUIRED)]},P.ITEM_LAYOUT_SMALL_2),{},{children:(0,X.jsx)(B.Ph,{showSearch:!0,noGetPopupContainer:!0,placeholder:"Ch\u1ecdn ng\u01b0\u1eddi d\xf9ng",mode:"multiple",children:r.map((function(n){return(0,X.jsx)(B.ZN,{value:n.NguoiDungID,children:"".concat(n.TenNguoiDung," (").concat(n.TenCanBo,")")},n.NguoiDungID)}))})}))]})})},H=a(32014),A=a(66818),Q=T.Z.Item,F=T.Z.useForm,R=function(n){var e=F(),a=(0,r.Z)(e,1)[0],t=(0,u.useState)(!1),i=(0,r.Z)(t,2),s=i[0],h=i[1],d=(0,u.useState)([]),g=(0,r.Z)(d,2),f=g[0],p=g[1],Z=(0,u.useState)([]),x=(0,r.Z)(Z,2),N=x[0],v=x[1],D=(0,u.useState)([]),C=(0,r.Z)(D,2),b=C[0],y=C[1],I=(0,l.v9)((function(n){return n.ListSideBar})).ListSideBar,M=n.dataModalAddPermission,k=n.loading,E=n.visible,L=n.onCancel,z=M.NhomNguoiDungID,B=M.DanhSachChucNang;console.log(M,"dataModalAddPermission");var O=I,V=A.Z.Option;(0,u.useEffect)((function(){var n=[];O.forEach((function(e){e.Children&&e.Children.length?e.Children.some((function(a){return!!B.find((function(n){return n.MaChucNang===a.MaMenu&&a.HienThi}))&&(n.push({key:e.MaMenu,label:e.TenMenu,children:e.Children}),!0)})):e.HienThi&&B.some((function(a){return e.MaMenu===a.MaChucNang&&(n.push({key:e.MaMenu,label:e.TenMenu}),!0)}))})),console.log(n,"DanhSachNhomChucNangNews");var e=[];n.filter((function(n){return n.key})).forEach((function(n){var a={id:n.key,key:n.key,label:n.label,disabled:!1,isParent:!0};if(n.children&&n.children){a.children=[];var t=[];n.children.forEach((function(n){var e=B.find((function(e){return e.MaChucNang===n.MaMenu&&n.HienThi}));e&&t.push({id:e.ChucNangID,key:e.MaChucNang,label:e.TenChucNang,disabled:e.disabled,children:[],isParent:!1})})),a.children=t,e.push(a),t.forEach((function(n){e.push(n)}))}else B.forEach((function(n){a.key===n.MaChucNang&&(a.id=n.ChucNangID,a.disabled=n.disabled,a.isToggle=n.isToggle,e.push(a))}))})),h(z),v(e)}),[]);var R=function(){var e=(0,S.Z)(j().mark((function e(t){var i;return j().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,a.validateFields();case 3:i=b,(0,n.onCreate)(i);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),G=function(n,e){if(n.length){var a=(0,o.Z)(b);a.some((function(t,i){return t.ChucNangID===e&&(a[i]={NhomNguoiDungID:z,ChucNangID:e,Xem:n.indexOf("Xem")>=0?1:0,Them:n.indexOf("Them")>=0?1:0,Sua:n.indexOf("Sua")>=0?1:0,Xoa:n.indexOf("Xoa")>=0?1:0},!0)})),y(a)}else U(e)},U=function(n){var e=[],t=[],i=[];f.forEach((function(a){a.ChucNangID!==n&&(e.push(a),t.push(a.ChucNangID))})),b.forEach((function(e){e.ChucNangID!==n&&i.push(e)})),p(e),y(i),a.setFieldsValue({DanhSachChucNangThemID:t})},q=function(n){var e=[],t=n&&n.length?(0,o.Z)(b):[];B.forEach((function(a){if(n.indexOf(a.ChucNangID)>=0){e.push(a);var i=!1;if(t.forEach((function(e,t){a.ChucNangID===e.ChucNangID&&(i=!0),n.indexOf(e.ChucNangID)<0&&b.splice(t,1)})),!i){var o={NhomNguoiDungID:z,ChucNangID:a.ChucNangID,Xem:a.Xem?1:0,Them:a.Them?1:0,Sua:a.Sua?1:0,Xoa:a.Xoa?1:0};t.push(o)}}})),p(e),y(t),a.setFieldsValue({DanhSachChucNangThemID:n})};return console.log(f,"DanhSachChucNangThem"),s?(0,X.jsx)(w.Z,{title:"Th\xeam ch\u1ee9c n\u0103ng cho nh\xf3m",width:600,visible:E,onCancel:L,footer:[(0,X.jsx)(_.Z,{onClick:L,children:"H\u1ee7y"},"back"),(0,X.jsx)(_.Z,{htmlType:"submit",type:"primary",form:"myForm",loading:k,onClick:R,children:"L\u01b0u"},"submit")],children:(0,X.jsxs)(T.Z,{form:a,children:[(0,X.jsx)(Q,(0,c.Z)((0,c.Z)({label:"Ch\u1ecdn ch\u1ee9c n\u0103ng",name:"DanhSachChucNangThemID"},P.ITEM_LAYOUT_SMALL_2),{},{rules:[(0,c.Z)({},P.REQUIRED)],children:(0,X.jsx)(A.Z,{showSearch:!0,placeholder:"Ch\u1ecdn ch\u1ee9c n\u0103ng",onChange:function(n){var e=[];n.forEach((function(n,a){isNaN(n)?N.forEach((function(a){a.id===n&&a.children.forEach((function(n){!1===n.disabled&&e.push(n.id)}))})):e.push(n)}));var a=[];e.length&&N.forEach((function(n){!isNaN(n.id)&&e.indexOf(n.id)>=0&&a.push(n.id)})),q(a)},defaultActiveFirstOption:!1,allowClear:!0,noGetPopupContainer:!0,mode:"multiple",style:{marginTop:4},className:"scroll-select-selection--multiple",children:N.map((function(n){return n.isParent?(0,X.jsx)(V,{value:n.id,disabled:n.disabled,style:{fontWeight:"bold"},children:n.label},n.key):(0,X.jsx)(V,{value:n.id,disabled:n.disabled,style:{paddingLeft:20},children:n.label},n.key)}))})})),f&&f.length?function(n){var e="";return n&&n.length&&(e=n.map((function(n,e){var a=[],t=[],i=n.ChucNangID,r=null;if((0,o.Z)(B).some((function(n){return n.ChucNangID===i&&(r=(0,c.Z)({},n),!0)})),r)return a=[{label:"Xem",value:"Xem",disabled:0===r.Xem},{label:"Th\xeam",value:"Them",disabled:0===r.Them},{label:"S\u1eeda",value:"Sua",disabled:0===r.Sua},{label:"X\xf3a",value:"Xoa",disabled:0===r.Xoa}],n.Xem&&t.push("Xem"),n.Them&&t.push("Them"),n.Sua&&t.push("Sua"),n.Xoa&&t.push("Xoa"),(0,X.jsxs)("div",{className:"content_row",children:[(0,X.jsx)("div",{className:"tenchucnang",style:{display:"inline-block",width:184},children:(0,X.jsx)("b",{children:n.TenChucNang})}),(0,X.jsxs)("div",{className:"chonxoaquyen",style:{display:"inline-block"},children:[m.JM.includes(n.MaChucNang)?(0,X.jsx)(H.Z.Group,{defaultValue:t,options:[{label:"",value:"Xem",disabled:0===r.Xem}],onChange:function(e){return G(e,n.ChucNangID)}}):(0,X.jsx)(H.Z.Group,{options:a,defaultValue:t,onChange:function(e){return G(e,n.ChucNangID)}}),(0,X.jsx)("button",{style:{border:"none",background:"none",outline:"none",cursor:"pointer"},onClick:function(){return U(n.ChucNangID)},children:"\u2716"})]})]},n.ChucNangID)}))),e}(f):null]})}):null},G=b.ZP.div(i||(i=(0,C.Z)(["\n  position: relative;\n  margin-bottom: 10px !important;\n  .closeButton {\n    position: absolute !important;\n    top: -20px;\n    right: -20px;\n    border: none;\n    background: none;\n    outline: none;\n    font-size: 22px;\n    height: 40px;\n    width: 40px;\n    cursor: pointer;\n    @media only screen and (max-width: 767px) {\n      top: -48px;\n    }\n  }\n  .box_class {\n    padding: 15px !important;\n    height: 340px;\n  }\n  .ant-col {\n    margin-top: 28px;\n  }\n  h3 {\n    font-size: 14px;\n    position: absolute;\n    left: 15px;\n    top: -10px;\n    background: #ffffff;\n    padding: 0 5px;\n  }\n  .action_class {\n    padding-bottom: 8px;\n    button {\n      margin-left: 10px;\n      margin-right: 0px;\n      @media only screen and (max-width: 992px) {\n        margin-left: 0px;\n        margin-right: 10px;\n      }\n    }\n    @media only screen and (min-width: 992px) {\n      text-align: right;\n    }\n  }\n  .content_class {\n    height: 270px;\n    overflow: auto;\n    button {\n      border: none;\n      box-shadow: none;\n      background: none;\n      height: auto;\n      cursor: pointer;\n      outline: none;\n      margin-left: 10px;\n    }\n    button::focus, button:active{ outline: none !important }\n    ul {\n      padding: 20px;\n      list-style-type: circle;\n    }\n    .content_row {\n      display: flex;\n      .tenchucnang {\n        display: inline-block;\n        width: calc(100% - 300px);\n      }\n      .chonxoaquyen {\n        display: inline-block;\n        width: 305px;\n      }\n    }\n    .content_row:hover, li:hover {\n      background: #e6f7ff;\n    }\n    \n    .ul {\n      padding: 20px;\n      \n      .li {\n        button {\n          margin: 0 10px 0 0;\n        }\n      }\n    }\n  }\n  \n  .content_class::-webkit-scrollbar {\n    width: 4px;\n    background-color: #F5F5F5;\n  }\n   \n  .content_class::-webkit-scrollbar-track {\n      background-color: #F5F5F5;\n  }\n   \n  .content_class::-webkit-scrollbar-thumb {\n    background-color: rgba(0,0,0,0.05);\n  }\n"]))),U=a(57652),q=a(77027),K=a(66106),Y=a(30914),J=a(71810),W=a(55454),$=a(88428),nn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M892 772h-80v-80c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v80h-80c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h80v80c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-80h80c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM373.5 498.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 01-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.8-1.7-203.2 89.2-203.2 200 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 008 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.8-1.1 6.4-4.8 5.9-8.8zM824 472c0-109.4-87.9-198.3-196.9-200C516.3 270.3 424 361.2 424 472c0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 00-86.4 60.4C357 742.6 326 814.8 324 891.8a8 8 0 008 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C505.8 695.7 563 672 624 672c110.4 0 200-89.5 200-200zm-109.5 90.5C690.3 586.7 658.2 600 624 600s-66.3-13.3-90.5-37.5a127.26 127.26 0 01-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4-.1 34.2-13.4 66.3-37.6 90.5z"}}]},name:"usergroup-add",theme:"outlined"},en=a(54963),an=function(n,e){return u.createElement(en.Z,(0,$.Z)((0,$.Z)({},n),{},{ref:e,icon:nn}))};an.displayName="UsergroupAddOutlined";var tn=u.forwardRef(an),on={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"}}]},name:"setting",theme:"outlined"},cn=function(n,e){return u.createElement(en.Z,(0,$.Z)((0,$.Z)({},n),{},{ref:e,icon:on}))};cn.displayName="SettingOutlined";var rn=u.forwardRef(cn),un=a(65323),ln=a(79031),sn=a(31752),hn=a(82622),dn=a(41145),gn=a(53771),fn=function(n){document.title="Ph\xe2n quy\u1ec1n";var e=(0,l.I0)(),a=(0,u.useState)(s.parse(n.location.search)),t=(0,r.Z)(a,2),i=t[0],g=t[1],C=(0,u.useState)(!1),b=(0,r.Z)(C,2),S=b[0],I=b[1],j=(0,dn.z)(),P=(0,r.Z)(j,2),T=P[0],M=P[1],k=(0,gn.E)(),w=(0,r.Z)(k,3),E=w[0],L=w[1],_=w[2],O=(0,u.useState)({}),A=(0,r.Z)(O,2),Q=A[0],F=A[1],$=(0,u.useState)([]),nn=(0,r.Z)($,2),en=nn[0],an=nn[1],on=(0,gn.E)(),cn=(0,r.Z)(on,3),fn=cn[0],mn=cn[1],pn=cn[2],Zn=(0,dn.z)(),xn=(0,r.Z)(Zn,2),Nn=xn[0],vn=xn[1],Dn=(0,u.useState)(null),Cn=(0,r.Z)(Dn,2),bn=Cn[0],yn=Cn[1],Sn=(0,u.useState)({NhomNguoiDungID:0,DanhSachNguoiDung:[]}),In=(0,r.Z)(Sn,2),jn=In[0],Pn=In[1],Tn=(0,gn.E)(),Mn=(0,r.Z)(Tn,3),kn=Mn[0],wn=Mn[1],Xn=Mn[2],En=(0,u.useState)([]),Ln=(0,r.Z)(En,2),zn=Ln[0],_n=Ln[1],Bn=(0,u.useState)({NhomNguoiDungID:0,DanhSachChucNang:[]}),On=(0,r.Z)(Bn,2),Vn=On[0],Hn=On[1],An=(0,gn.E)(),Qn=(0,r.Z)(An,3),Fn=Qn[0],Rn=Qn[1],Gn=Qn[2],Un=(0,u.useState)("add"),qn=(0,r.Z)(Un,2),Kn=qn[0],Yn=qn[1],Jn=(0,u.useState)(0),Wn=(0,r.Z)(Jn,2),$n=Wn[0],ne=Wn[1],ee=(0,l.v9)((function(n){return n.ListSideBar})).ListSideBar,ae=(0,l.v9)((function(n){return n.QLPhanQuyen})),te=ae.DanhSachNhom,ie=ae.TotalRow,oe=ae.DanhSachCanBo,ce=ae.TableLoading,re=(0,l.v9)((function(n){return(0,W.Ry)(n.Auth.role,"phan-quyen")}));(0,u.useEffect)((function(){e(h.Z.getInitData())}),[]),(0,u.useEffect)((function(){(0,W.ZZ)(i),e(h.Z.getList(i))}),[i]);var ue=function(n,e){var a={value:n,property:e},t=(0,W.mB)(i,a,null);g(t)},le=function(){$n&&d.Z.danhSachNguoiDung({NhomNguoiDungID:$n}).then((function(n){n.data.Status>0?(wn(),Pn({NhomNguoiDungID:$n,DanhSachNguoiDung:n.data.Data}),M()):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))},se=function(){Xn(),Pn({NhomNguoiDungID:0,DanhSachNguoiDung:[]})},he=function(n){var e=n.NguoiDungID;delete n.NguoiDungID,I(!0),d.Z.themNhieuNguoiDung((0,c.Z)((0,c.Z)({},n),{},{DanhSachNguoiDungID:e})).then((function(n){I(!1),n.data.Status>0?(q.ZP.success("Th\xeam th\xe0nh c\xf4ng"),se(),Ne("open")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){I(!1),q.ZP.destroy(),q.ZP.error(n.toString())}))},de=function(n,e){var a=(0,c.Z)({},bn),t={PhanQuyenID:parseInt(e),Xem:0,Them:0,Sua:0,Xoa:0},i={};n.forEach((function(n){t[n]=1})),a.DanhSachChucNang.some((function(n){return n.PhanQuyenID===e&&(i={PhanQuyenID:parseInt(n.PhanQuyenID),Xem:parseInt(n.Xem),Them:parseInt(n.Them),Sua:parseInt(n.Sua),Xoa:parseInt(n.Xoa)},!0)}));var r=(0,o.Z)(zn);r.some((function(n,e){return n.PhanQuyenID===t.PhanQuyenID&&(r.splice(e,1),!0)})),f().isEqual(t,i)||r.push(t),_n(r)},ge=function(){var n=zn;n&&n.length&&U.Z.confirm({title:"L\u01b0u thay \u0111\u1ed5i",content:"B\u1ea1n c\xf3 mu\u1ed1n c\u1eadp nh\u1eadt thay \u0111\u1ed5i kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){d.Z.suaChucNang(n).then((function(n){n.data.Status>0?(q.ZP.success("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng"),_n([]),Ne("open")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))},onCancel:function(){_n([]),Ne("open")}})},fe=function(n){var e=[],a=(0,X.jsx)(D.o1,{scroll:{}});return n&&n.length&&(ee.forEach((function(a){a.Children&&a.Children.length?a.Children.some((function(t){return!!n.find((function(n){return n.MaChucNang===t.MaMenu&&t.HienThi}))&&(e.push({key:a.MaMenu,label:a.TenMenu,children:a.Children,isParent:!0}),!0)})):a.HienThi&&n.some((function(n){return a.MaMenu===n.MaChucNang&&(e.push({key:a.MaMenu,label:a.TenMenu,isParent:n.ChucNangChaID>0}),!0)}))})),a=e.map((function(e,a){return e.isParent?(0,X.jsxs)("div",{children:[(0,X.jsx)("div",{children:(0,X.jsx)("b",{children:e.label})}),n.map((function(n,a){if(e.children&&e.children.find((function(e){return e.MaMenu===n.MaChucNang}))){var t=[],i=[],r=n.ChucNangID,u=null;if((0,o.Z)(en).some((function(n){return n.ChucNangID===r&&(u=(0,c.Z)({},n),!0)})),u)return t=[{label:"Xem",value:"Xem",disabled:0===u.Xem},{label:"Th\xeam",value:"Them",disabled:0===u.Them},{label:"S\u1eeda",value:"Sua",disabled:0===u.Sua},{label:"X\xf3a",value:"Xoa",disabled:0===u.Xoa}],n.Xem&&i.push("Xem"),n.Them&&i.push("Them"),n.Sua&&i.push("Sua"),n.Xoa&&i.push("Xoa"),(0,X.jsxs)("div",{className:"content_row",children:[(0,X.jsx)("div",{className:"tenchucnang",children:n.TenChucNang}),(0,X.jsxs)("div",{className:"chonxoaquyen",children:[m.JM.includes(n.MaChucNang)?(0,X.jsx)(H.Z.Group,{defaultValue:i,options:[{label:"",value:"Xem"}],onChange:function(e){return de(e,n.PhanQuyenID)}}):(0,X.jsx)(H.Z.Group,{defaultValue:i,options:t,onChange:function(e){return de(e,n.PhanQuyenID)}}),(0,X.jsx)("button",{className:"float-right",onClick:function(){return me({PhanQuyenID:n.PhanQuyenID})},children:"\u2716"}),(0,X.jsx)("div",{className:"clearfix"})]})]},a)}}))]}):n.map((function(n,a){if(e.key===n.MaChucNang){var t=[];return n.Xem&&t.push("Xem"),n.Them&&t.push("Them"),n.Sua&&t.push("Sua"),n.Xoa&&t.push("Xoa"),(0,X.jsxs)("div",{className:"content_row",children:[(0,X.jsx)("b",{className:"tenchucnang",children:n.TenChucNang}),(0,X.jsxs)("div",{className:"chonxoaquyen",children:[m.JM.includes(n.MaChucNang)?(0,X.jsx)(H.Z.Group,{defaultValue:t,options:[{label:"",value:"Xem"}],onChange:function(e){return de(e,n.PhanQuyenID)}}):(0,X.jsx)(H.Z.Group,{options:[{label:"Xem",value:"Xem",disabled:!1},{label:"Th\xeam",value:"Them",disabled:!1},{label:"S\u1eeda",value:"Sua",disabled:!1},{label:"X\xf3a",value:"Xoa",disabled:!1}],defaultValue:t,onChange:function(e){return de(e,n.PhanQuyenID)}}),(0,X.jsx)("button",{className:"float-right",onClick:function(){return me({PhanQuyenID:n.PhanQuyenID})},children:"\u2716"}),(0,X.jsx)("div",{className:"clearfix"})]})]},a)}}))}))),a},me=function(n){U.Z.confirm({title:"X\xf3a d\u1eef li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ch\u1ee9c n\u0103ng n\xe0y ra kh\u1ecfi nh\xf3m?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){d.Z.xoaChucNang(n).then((function(n){n.data.Status>0?(q.ZP.success("X\xf3a th\xe0nh c\xf4ng"),Ne("open")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))}})},pe=function(){if($n){var n=$n,e=[],a=bn.DanhSachChucNang,t=a&&a.length?a.map((function(n){return n.ChucNangID.toString()})):[];console.log(en,"DanhSachChucNangNhom"),en.map((function(n){t.indexOf(n.ChucNangID.toString())<0?e.push((0,c.Z)((0,c.Z)({},n),{},{disabled:!1})):e.push((0,c.Z)((0,c.Z)({},n),{},{disabled:!0}))})),Rn(),Hn({NhomNguoiDungID:n,DanhSachChucNang:e}),M()}},Ze=function(){Gn(),Hn({NhomNguoiDungID:0,DanhSachChucNang:[]})},xe=function(n){I(!0),d.Z.themChucNang(n).then((function(n){I(!1),n.data.Status>0?(q.ZP.success("Th\xeam th\xe0nh c\xf4ng"),Ze(),Ne("open")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){I(!1),q.ZP.destroy(),q.ZP.error(n.toString())}))},Ne=function(n){if("open"===n){if($n){var e=$n;d.Z.sieuChiTietNhom({NhomNguoiDungID:e}).then((function(n){n.data.Status>0?d.Z.danhSachChucNang({NhomNguoiDungID:e}).then((function(e){mn(),console.log(n,"response"),yn(n.data.Data),_n([]),an(e.data.Data),vn()})):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))}}else pn(),yn(null),_n([]),an([]),ne(0)},ve=function(n){return(0,X.jsxs)("div",{className:"action-btn",children:[re.edit?(0,X.jsx)(J.Z,{title:"C\u1ea5u h\xecnh",children:(0,X.jsx)(rn,{onClick:function(){return e=n.NhomNguoiDungID,void($n!==e&&d.Z.sieuChiTietNhom({NhomNguoiDungID:e}).then((function(n){n.data.Status>0?d.Z.danhSachChucNang({NhomNguoiDungID:e}).then((function(a){mn(),console.log(n,"response"),yn(n.data.Data),_n([]),an(a.data.Data),ne(e),vn()})):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())})));var e}})}):"",re.edit?(0,X.jsx)(J.Z,{title:"S\u1eeda",children:(0,X.jsx)(sn.Z,{onClick:function(){return e=n.NhomNguoiDungID,void d.Z.chiTietNhom({NhomNguoiDungID:e}).then((function(n){n.data.Status>0?(F(n.data.Data),L(),Yn("edit"),M()):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}));var e}})}):"",re.delete?(0,X.jsx)(J.Z,{title:"X\xf3a",children:(0,X.jsx)(hn.Z,{onClick:function(){return a=n.NhomNguoiDungID,void U.Z.confirm({title:"X\xf3a d\u1eef li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a nh\xf3m ng\u01b0\u1eddi d\xf9ng n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){d.Z.xoaNhom({NhomNguoiDungID:a}).then((function(n){n.data.Status>0?(q.ZP.success("X\xf3a th\xe0nh c\xf4ng"),e(h.Z.getList(i)),Ne("close")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))}});var a}})}):""]})},De=i.PageNumber?parseInt(i.PageNumber):1,Ce=i.PageSize?parseInt(i.PageSize):(0,W.hL)(),be=[{title:"STT",align:"center",width:5,render:function(n,e,a){return e.NhomNguoiDungID===$n?(0,X.jsx)("b",{children:(De-1)*Ce+(a+1)}):(De-1)*Ce+(a+1)}},{title:"T\xean nh\xf3m ng\u01b0\u1eddi d\xf9ng",dataIndex:"TenNhom",width:50,render:function(n,e){return e.NhomNguoiDungID===$n?(0,X.jsx)("b",{children:n}):n}},{title:"Ghi ch\xfa",dataIndex:"GhiChu",width:30,render:function(n){return(0,X.jsx)("span",{className:"text-area-content",children:n})}},{title:"Thao t\xe1c",width:15,align:"center",render:function(n,e){return ve(e)}}];return(0,X.jsxs)(p.Z,{children:[(0,X.jsx)(Z.Z,{children:"QU\u1ea2N L\xdd PH\xc2N QUY\u1ec0N NG\u01af\u1edcI D\xd9NG"}),(0,X.jsx)(x.Z,{children:re.add?(0,X.jsxs)(B.zx,{type:"primary",onClick:function(){L(),F({}),Yn("add"),M()},children:[(0,X.jsx)(tn,{})," Th\xeam"]}):""}),function(){if(bn&&fn){var n=(0,c.Z)({},bn);if(n)return(0,X.jsx)(N.Z,{style:{marginBottom:20},children:(0,X.jsxs)(G,{children:[(0,X.jsx)("button",{className:"closeButton",onClick:function(){return Ne("close")},children:"\u2716"}),(0,X.jsxs)(K.Z,{gutter:8,children:[(0,X.jsx)(Y.Z,{lg:12,md:24,children:(0,X.jsxs)(N.Z,{className:"box_class",children:[(0,X.jsx)("h3",{children:"Th\xeam ng\u01b0\u1eddi d\xf9ng"}),(0,X.jsxs)("div",{className:"action_class",children:[re.add?(0,X.jsxs)(B.zx,{type:"primary",onClick:le,children:[(0,X.jsx)(tn,{})," Th\xeam ng\u01b0\u1eddi d\xf9ng"]}):"",(0,X.jsx)(V,{loading:S,visible:kn,dataModalAddUser:jn,onCancel:se,onCreate:he},"user_".concat(T))]}),(0,X.jsx)("div",{className:"content_class",children:n.DanhSachNguoiDung&&n.DanhSachNguoiDung.length?(0,X.jsx)("div",{className:"ul",children:n.DanhSachNguoiDung.map((function(e,a){return(0,X.jsxs)("div",{className:"li",children:[(0,X.jsx)("button",{onClick:function(){return a={NhomNguoiDungID:n.NhomNguoiDungID,NguoiDungID:e.NguoiDungID},void U.Z.confirm({title:"X\xf3a d\u1eef li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ng\u01b0\u1eddi d\xf9ng n\xe0y ra kh\u1ecfi nh\xf3m?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){d.Z.xoaNguoiDung(a).then((function(n){n.data.Status>0?(q.ZP.success("X\xf3a th\xe0nh c\xf4ng"),Ne("open")):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))}});var a},children:"\u2716"}),e.TenNguoiDung]},a)}))}):(0,X.jsx)(D.o1,{style:{width:"100%",border:"none"},scroll:{}})})]})}),(0,X.jsx)(Y.Z,{lg:12,md:24,children:(0,X.jsxs)(N.Z,{className:"box_class",children:[(0,X.jsx)("h3",{children:"Th\xeam ch\u1ee9c n\u0103ng"}),(0,X.jsxs)("div",{className:"action_class",children:[re.edit?(0,X.jsxs)(B.zx,{type:"primary",disabled:!zn.length,onClick:ge,children:[(0,X.jsx)(un.Z,{})," L\u01b0u"]}):"",re.edit?(0,X.jsxs)(B.zx,{type:"primary",onClick:pe,children:[(0,X.jsx)(ln.Z,{})," Th\xeam ch\u1ee9c n\u0103ng"]}):"",(0,X.jsx)(R,{loading:S,visible:Fn,dataModalAddPermission:Vn,onCancel:Ze,onCreate:xe},"permission_".concat(T))]}),(0,X.jsx)("div",{className:"content_class",children:fe(n.DanhSachChucNang)})]})})]})]})},Nn)}return null}(),(0,X.jsxs)(N.Z,{children:[(0,X.jsxs)(v.Z,{children:[(0,X.jsx)(B.Ph,{allowClear:!0,showSearch:!0,onChange:function(n){return ue(n,"CanBoID")},value:i.CanBoID,placeholder:"Ch\u1ecdn c\xe1n b\u1ed9",style:{width:200},children:null===oe||void 0===oe?void 0:oe.map((function(n){return(0,X.jsx)(B.Wx,{value:n.CanBoID.toString(),children:n.TenCanBo},n.CanBoID)}))}),(0,X.jsx)(B.Vr,{allowClear:!0,defaultValue:i.Keyword,placeholder:"T\xecm ki\u1ebfm theo t\xean nh\xf3m ng\u01b0\u1eddi d\xf9ng",onSearch:function(n){return ue(n,"Keyword")},style:{width:300}})]}),(0,X.jsx)(y,{children:(0,X.jsx)(D.ZP,{columns:be,rowKey:"NhomNguoiDungID",dataSource:te,loading:ce||S,onChange:function(n,e,a){var t={pagination:n,filters:e,sorter:a},o=(0,W.mB)(i,null,t);g(o)},pagination:{showSizeChanger:!0,showTotal:function(n,e){return"T\u1eeb ".concat(e[0]," \u0111\u1ebfn ").concat(e[1]," tr\xean ").concat(n," k\u1ebft qu\u1ea3")},total:ie,current:De,pageSize:Ce}})}),(0,X.jsx)(z,{loading:S,visible:E,onCancel:_,onCreate:function(n){delete n.applyType,I(!0),"add"===Kn?(delete n.NhomNguoiDungID,d.Z.themNhom(n).then((function(n){I(!1),n.data.Status>0?(q.ZP.success("Th\xeam th\xe0nh c\xf4ng"),_(),e(h.Z.getList(i))):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){q.ZP.destroy(),q.ZP.error(n.toString())}))):"edit"===Kn&&d.Z.suaNhom(n).then((function(n){I(!1),n.data.Status>0?(q.ZP.success("C\u1eadp nh\u1eadt th\xe0nh c\xf4ng"),_(),e(h.Z.getList(i))):(q.ZP.destroy(),q.ZP.error(n.data.Message))})).catch((function(n){I(!1),q.ZP.destroy(),q.ZP.error(n.toString())}))},dataEdit:Q},"group_".concat(T))]})]})}},82622:function(n,e,a){a.d(e,{Z:function(){return u}});var t=a(88428),i=a(72791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},c=a(54963),r=function(n,e){return i.createElement(c.Z,(0,t.Z)((0,t.Z)({},n),{},{ref:e,icon:o}))};r.displayName="DeleteOutlined";var u=i.forwardRef(r)},31752:function(n,e,a){a.d(e,{Z:function(){return u}});var t=a(88428),i=a(72791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},c=a(54963),r=function(n,e){return i.createElement(c.Z,(0,t.Z)((0,t.Z)({},n),{},{ref:e,icon:o}))};r.displayName="EditOutlined";var u=i.forwardRef(r)},79031:function(n,e,a){a.d(e,{Z:function(){return u}});var t=a(88428),i=a(72791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z"}}]},name:"file-add",theme:"outlined"},c=a(54963),r=function(n,e){return i.createElement(c.Z,(0,t.Z)((0,t.Z)({},n),{},{ref:e,icon:o}))};r.displayName="FileAddOutlined";var u=i.forwardRef(r)},65323:function(n,e,a){a.d(e,{Z:function(){return u}});var t=a(88428),i=a(72791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"},c=a(54963),r=function(n,e){return i.createElement(c.Z,(0,t.Z)((0,t.Z)({},n),{},{ref:e,icon:o}))};r.displayName="SaveOutlined";var u=i.forwardRef(r)},30914:function(n,e,a){var t=a(89752);e.Z=t.Z},66106:function(n,e,a){var t=a(37545);e.Z=t.Z}}]);
//# sourceMappingURL=882.b3441861.chunk.js.map