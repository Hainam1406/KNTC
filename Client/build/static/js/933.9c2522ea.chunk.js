"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[933,286],{44858:function(n,e,t){t.d(e,{c:function(){return l},Z:function(){return s}});var a,r=t(32014),c=t(17186),i=t(63463),o=t(15550),u=function(n){return(0,i.ZP)(n)(a||(a=(0,c.Z)(["\n  &.ant-checkbox-wrapper {\n    font-size: 13px;\n    color: ",";\n\n    .ant-checkbox {\n      top: inherit;\n    }\n\n    .ant-checkbox-checked .ant-checkbox-inner,\n    .ant-checkbox-indeterminate .ant-checkbox-inner {\n      background-color: ",";\n      border-color: ",";\n    }\n\n    .ant-checkbox:hover .ant-checkbox-inner,\n    .ant-checkbox-input:focus + .ant-checkbox-inner {\n      border-color: ",";\n    }\n\n    &:hover {\n      .ant-checkbox-inner {\n        border-color: ",";\n      }\n    }\n  }\n"])),(0,o.palette)("text",1),(0,o.palette)("primary",0),(0,o.palette)("primary",0),(0,o.palette)("primary",0),(0,o.palette)("primary",0))}(r.Z),l=r.Z.Group,s=u},71285:function(n,e,t){t.d(e,{Z:function(){return s}});t(72791);var a,r=t(17186),c=t(63463),i=t(17192),o=c.ZP.div(a||(a=(0,r.Z)(["\n    text-align: right;\n    display: inline-block;\n    flex: 1;\n    padding: 0 3px 0 0;\n    @media only screen and (max-width: 1336px) {\n        text-align: left;\n        display: block;\n        flex: none;\n        width: 100%;\n        padding: 0 0 10px 0;\n    }\n    button {\n        margin-right: 0px;\n        margin-left: 10px;\n        @media only screen and (max-width: 1336px) {\n            margin-left: 0px;\n            margin-right: 10px;\n        }\n    }\n"]))),u=(0,i.Z)(o),l=t(80184),s=function(n){return(0,l.jsx)(u,{children:n.children})}},41145:function(n,e,t){t.d(e,{z:function(){return c}});var a=t(50678),r=t(72791);function c(n){var e=(0,r.useState)(0),t=(0,a.Z)(e,2),c=t[0],i=t[1];return[c,function(){i(c+1)}]}},74933:function(n,e,t){t.r(e),t.d(e,{default:function(){return N}});var a=t(18489),r=t(50678),c=t(57652),i=t(77027),o=t(71810),u=t(55799),l=t(72791),s=t(47375),h=t(52591),d=t(35667),f=t(71285),Z=t(7111),g=t(66914),x=t(36043),p=t(44858),m=t(35057),v=t(70297),T=t(55454),P=t(41145),b=t(4245),y=t(59840),j=(t(72426),t(36222),t(33032)),k=t(84322),S=t.n(k),w=t(65331),M=t(10916),C=t(64422),z=(t(763),t(80184)),Q=M.Z.Item,I=M.Z.useForm,E=function(n){var e=I(),t=(0,r.Z)(e,1)[0],c=(0,l.useState)(!0),i=(0,r.Z)(c,2),o=i[0],u=i[1],s=n.dataEdit,h=n.loading,d=n.visible,f=n.action;(0,l.useEffect)((function(){s&&s.QuocTichID&&t&&t.setFieldsValue((0,a.Z)((0,a.Z)({},s),{},{TrangThai:s.TrangThai?1:0}))}),[]);var Z=function(){var e=(0,j.Z)(S().mark((function e(r){var c;return S().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,t.validateFields();case 3:c=e.sent,n.onCreate((0,a.Z)((0,a.Z)({},c),{},{TrangThai:Boolean(c.TrangThai)}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),g=function(){var n=(0,j.Z)(S().mark((function n(e,a){var r;return S().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=t.getFieldsError(),r.filter((function(n){return n.errors.length>0})).length>0?u(!0):u(!1);case 3:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();return(0,z.jsx)(v.u_,{title:"".concat("edit"===f?"S\u1eeda":"Th\xeam"," th\xf4ng tin qu\u1ed1c t\u1ecbch"),width:450,visible:d,onCancel:n.onCancel,footer:[(0,z.jsx)(v.zx,{onClick:n.onCancel,children:"H\u1ee7y"},"back"),(0,z.jsx)(v.zx,{htmlType:"submit",type:"primary",form:"formquoctich",loading:h,onClick:Z,disabled:o,children:"L\u01b0u"},"submit")],children:(0,z.jsxs)(M.Z,{form:t,initialValues:{TrangThai:1},onFieldsChange:g,children:["edit"===f?(0,z.jsx)(Q,{name:"QuocTichID",hidden:!0}):"",(0,z.jsx)(Q,(0,a.Z)((0,a.Z)({label:"M\xe3 Qu\u1ed1c T\u1ecbch",name:"MaQuocTich"},w.ITEM_LAYOUT),{},{rules:[(0,a.Z)({},w.REQUIRED)],children:(0,z.jsx)(v.PQ,{})})),(0,z.jsx)(Q,(0,a.Z)((0,a.Z)({label:"T\xean Qu\u1ed1c T\u1ecbch",name:"TenQuocTich"},w.ITEM_LAYOUT),{},{rules:[(0,a.Z)({},w.REQUIRED)],children:(0,z.jsx)(v.II,{})})),(0,z.jsx)(Q,(0,a.Z)((0,a.Z)({label:"Ghi Ch\xfa",name:"GhiChu"},w.ITEM_LAYOUT),{},{children:(0,z.jsx)(v.gx,{})})),(0,z.jsx)(Q,(0,a.Z)((0,a.Z)({label:"\u0110ang s\u1eed d\u1ee5ng",name:"TrangThai"},w.ITEM_LAYOUT),{},{children:(0,z.jsxs)(C.ZP.Group,{name:"radiogroup",children:[(0,z.jsx)(C.ZP,{value:1,children:"C\xf3"}),(0,z.jsx)(C.ZP,{value:0,children:"Kh\xf4ng"})]})}))]})})},q=t(31752),D=t(82622),L=t(79286);var N=(0,s.$j)((function(n){return(0,a.Z)((0,a.Z)({},n.DanhMucQuocTich),{},{role:(0,T.Ry)(n.Auth.role,"quan-ly-nam-hoc")})}),u.Z)((function(n){document.title="Danh M\u1ee5c Qu\u1ed1c T\u1ecbch";var e=(0,l.useState)(b.parse(n.location.search)),t=(0,r.Z)(e,2),u=t[0],s=t[1],j=(0,l.useState)({}),k=(0,r.Z)(j,2),S=k[0],w=k[1],M=(0,l.useState)(!1),C=(0,r.Z)(M,2),Q=C[0],I=C[1],N=(0,l.useState)(""),O=(0,r.Z)(N,2),R=O[0],H=O[1],B=(0,P.z)(),G=(0,r.Z)(B,2),U=G[0],V=G[1],A=(0,l.useState)([]),F=(0,r.Z)(A,2),K=(F[0],F[1]),_=(0,l.useState)(!1),Y=(0,r.Z)(_,2),X=Y[0],$=Y[1];(0,l.useEffect)((function(){(0,T.ZZ)(u),n.getList(u)}),[u]),(0,l.useEffect)((function(){n.getList(u)}),[]);var J=function(n,e){var t=u,a={value:n,property:e},r=(0,T.mB)(t,a,null);s(r),K([])},W=function(){K([]),w({}),I(!1)},nn=function(e){return(0,z.jsxs)("div",{className:"action-btn",children:[(0,z.jsx)(o.Z,{title:"S\u1eeda",children:(0,z.jsx)(q.Z,{onClick:function(){return function(n){var e=n;H("edit"),y.Z.ChiTietQuocTich({QuocTichID:e}).then((function(n){n.data.Status>0?(w(n.data.Data),V(),I(!0)):(i.ZP.destroy(),i.ZP.error(n.data.Message))})).catch((function(n){i.ZP.destroy(),i.ZP.error(n.toString())}))}(e.QuocTichID)}})}),(0,z.jsx)(o.Z,{title:"X\xf3a",children:(0,z.jsx)(D.Z,{onClick:function(){return t=e.QuocTichID,void c.Z.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a qu\u1ed1c t\u1ecbch n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){$(!0),y.Z.XoaQuocTich(t).then((function(e){e.data.Status>0?($(!1),n.getList((0,a.Z)((0,a.Z)({},u),{},{PageNumber:Math.ceil((tn-1)/u.PageSize)<u.PageNumber?Math.ceil((tn-1)/u.PageSize):u.PageNumber})),i.ZP.destroy(),i.ZP.success(e.data.Message),s((0,a.Z)((0,a.Z)({},u),{},{PageNumber:Math.ceil((tn-1)/u.PageSize)<u.PageNumber?Math.ceil((tn-1)/u.PageSize):u.PageNumber}))):(i.ZP.destroy(),i.ZP.error(e.data.Message))})).catch((function(n){i.ZP.destroy(),i.ZP.error(n.toString())}))}});var t}})})]})},en=n.DanhSachQuocTich,tn=n.TotalRow,an=(n.role,u.PageNumber?parseInt(u.PageNumber):1),rn=u.PageSize?parseInt(u.PageSize):(0,T.hL)(),cn=[{title:"STT",width:"5%",align:"center",render:function(n,e,t){return(0,z.jsx)("span",{children:(an-1)*rn+(t+1)})}},{title:"M\xe3 qu\u1ed1c t\u1ecbch",dataIndex:"MaQuocTich",align:"left",width:"15%"},{title:"T\xean qu\u1ed1c t\u1ecbch",dataIndex:"TenQuocTich",align:"left",width:"25%"},{title:"Ghi ch\xfa",dataIndex:"GhiChu",align:"left",width:"35%"},{title:"\u0110ang s\u1eed d\u1ee5ng",dataIndex:"TrangThai",align:"center",width:"10%",render:function(n,e){return(0,z.jsx)(p.Z,{checked:e.TrangThai})}},{title:"Thao t\xe1c",width:"10%",align:"center",render:function(n,e){return nn(e)}}];return(0,z.jsxs)(h.Z,{children:[(0,z.jsx)(d.Z,{children:"Danh M\u1ee5c Qu\u1ed1c T\u1ecbch"}),(0,z.jsx)(f.Z,{children:(0,z.jsxs)(v.zx,{type:"primary",onClick:function(){H("add"),w({}),V(),I(!0)},children:[(0,z.jsx)(L.Z,{}),"Th\xeam m\u1edbi"]})}),(0,z.jsxs)(Z.Z,{children:[(0,z.jsxs)(g.Z,{children:[(0,z.jsxs)(m.ZP,{style:{width:"200px"},defaultValue:u.Status?"true"===u.Status?"\u0110ang s\u1eed d\u1ee5ng":"Kh\xf4ng s\u1eed d\u1ee5ng":void 0,placeholder:"Ch\u1ecdn tr\u1ea1ng th\xe1i",allowClear:!0,onChange:function(n){return J(n,"Status")},children:[(0,z.jsx)(Option,{value:!0,children:"\u0110ang s\u1eed d\u1ee5ng"}),(0,z.jsx)(Option,{value:!1,children:"Kh\xf4ng s\u1eed d\u1ee5ng"})]}),(0,z.jsx)(v.Vr,{allowClear:!0,defaultValue:u.Keyword,placeholder:"Nh\u1eadp m\xe3 ho\u1eb7c t\xean qu\u1ed1c t\u1ecbch",style:{width:300},onSearch:function(n){return J(n,"keyword")}})]}),(0,z.jsx)(x.ZP,{size:"large",columns:cn,dataSource:en,onChange:function(n,e,t){var a=u,r={pagination:n,filters:e,sorter:t},c=(0,T.mB)(a,null,r);s(c),K([])},pagination:{showSizeChanger:!0,showTotal:function(n,e){return"T\u1eeb ".concat(e[0]," \u0111\u1ebfn ").concat(e[1]," tr\xean ").concat(n," k\u1ebft qu\u1ea3")},total:tn,current:an,pageSize:rn}})]}),(0,z.jsx)(E,{visible:Q,dataEdit:S,action:R,loading:X,onCreate:function(e){$(!0),"add"===R&&y.Z.THemQuocTich(e).then((function(e){$(!1),e.data.Status>0?(i.ZP.destroy(),i.ZP.success(e.data.Message),W(),n.getList(u)):($(!1),i.ZP.destroy(),i.ZP.error(e.data.Message))})).catch((function(n){$(!1),i.ZP.destroy(),i.ZP.error(n.toString())})),"edit"===R&&y.Z.CapNhatQuocTich(e).then((function(e){e.data.Status>0?($(!1),i.ZP.destroy(),i.ZP.success(e.data.Message),W(),n.getList(u)):($(!1),i.ZP.destroy(),i.ZP.error(e.data.Message))})).catch((function(n){$(!1),i.ZP.destroy(),i.ZP.error(n.toString())}))},onCancel:W,DanhSachQuocTich:en},U)]})}))},82622:function(n,e,t){t.d(e,{Z:function(){return u}});var a=t(88428),r=t(72791),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},i=t(54963),o=function(n,e){return r.createElement(i.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:c}))};o.displayName="DeleteOutlined";var u=r.forwardRef(o)},31752:function(n,e,t){t.d(e,{Z:function(){return u}});var a=t(88428),r=t(72791),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"},i=t(54963),o=function(n,e){return r.createElement(i.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:c}))};o.displayName="EditOutlined";var u=r.forwardRef(o)},79286:function(n,e,t){t.d(e,{Z:function(){return u}});var a=t(88428),r=t(72791),c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},i=t(54963),o=function(n,e){return r.createElement(i.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:e,icon:c}))};o.displayName="PlusOutlined";var u=r.forwardRef(o)}}]);
//# sourceMappingURL=933.9c2522ea.chunk.js.map