"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[836],{71285:function(a,n,t){t.d(n,{Z:function(){return s}});t(72791);var e,i=t(17186),h=t(63463),c=t(17192),r=h.ZP.div(e||(e=(0,i.Z)(["\n    text-align: right;\n    display: inline-block;\n    flex: 1;\n    padding: 0 3px 0 0;\n    @media only screen and (max-width: 1336px) {\n        text-align: left;\n        display: block;\n        flex: none;\n        width: 100%;\n        padding: 0 0 10px 0;\n    }\n    button {\n        margin-right: 0px;\n        margin-left: 10px;\n        @media only screen and (max-width: 1336px) {\n            margin-left: 0px;\n            margin-right: 10px;\n        }\n    }\n"]))),u=(0,c.Z)(r),o=t(80184),s=function(a){return(0,o.jsx)(u,{children:a.children})}},41145:function(a,n,t){t.d(n,{z:function(){return h}});var e=t(50678),i=t(72791);function h(a){var n=(0,i.useState)(0),t=(0,e.Z)(n,2),h=t[0],c=t[1];return[h,function(){c(h+1)}]}},51836:function(a,n,t){t.r(n),t.d(n,{default:function(){return G}});var e=t(18489),i=t(50678),h=t(57652),c=t(77027),r=t(71810),u=t(32014),o={DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST:"DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST",DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST_SUCCESS:"DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST_SUCCESS",DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST_ERROR:"DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST_ERROR",getList:function(a){return{type:o.DANHMUCCHIATACHSAPNHAP_GET_LIST_REQUEST,payload:{filterData:a}}}},s=o,p=t(72791),l=t(47375),d=t(52591),T=t(35667),S=t(71285),C=t(7111),f=t(66914),Z=t(36043),g=t(70297),x=t(55454),N=t(41145),P=t(4245),m=t(29396),A=t(53469),j={danhsachchiatachsapnhap:A.ZP.apiTemp+"DanhMucChiaTachSapNhap/DanhSachChiaTachSapNhap",chitietchiatachsapnhap:A.ZP.apiTemp+"DanhMucChiaTachSapNhap/ChiTietChiaTachSapNhap",themchiatachsapnhap:A.ZP.apiTemp+"DanhMucChiaTachSapNhap/ThemMoiChiaTachSapNhap",capnhatchiatachsapnhap:A.ZP.apiTemp+"DanhMucChiaTachSapNhap/CapNhatChiaTachSapNhap",xoachiatachsapnhap:A.ZP.apiTemp+"DanhMucChiaTachSapNhap/XoaChiaTachSapNhap"},v={DanhSachChiaTachSapNhap:function(a){return(0,m.Nr)(j.danhsachchiatachsapnhap,(0,e.Z)((0,e.Z)({},a),{},{PageNumber:a.PageNumber?a.PageNumber:1,PageSize:a.PageSize?a.PageSize:(0,x.hL)()}))},ChiTietChiaTachSapNhap:function(a){return(0,m.Nr)(j.chitietchiatachsapnhap,(0,e.Z)({},a))},ThemChiaTachSapNhap:function(a){return(0,m.No)(j.themchiatachsapnhap,(0,e.Z)({},a))},CapNhatChiaTachSapNhap:function(a){return(0,m.No)(j.capnhatchiatachsapnhap,(0,e.Z)({},a))},XoaChiaTachSapNhap:function(a){return(0,m.No)(j.xoachiatachsapnhap,a)}},E=(t(72426),t(33032)),I=t(84322),y=t.n(I),_=t(65331),H=t(10916),M=t(64422),D=t(66023),k=t(80184),b=H.Z.Item,w=H.Z.useForm,L=function(a){var n=(0,p.useRef)(null),t=w(),h=(0,i.Z)(t,1)[0],c=a.dataEdit,r=a.loading,u=a.visible,o=a.action,s=(0,p.useState)(),l=(0,i.Z)(s,2),d=l[0],T=l[1];(0,p.useEffect)((function(){n&&n.current&&n.current.input.focus();c&&c.ChucVuID&&h&&h.setFieldsValue((0,e.Z)({},c))}),[]);var S=function(){var n=(0,E.Z)(y().mark((function n(t){var e;return y().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.preventDefault(),n.next=3,h.validateFields();case 3:e=n.sent,a.onCreate(e);case 5:case"end":return n.stop()}}),n)})));return function(a){return n.apply(this,arguments)}}();return(0,k.jsx)(g.u_,{title:"".concat("edit"===o?"S\u1eeda":"Th\xeam"," th\xf4ng tin ch\u1ee9c v\u1ee5"),width:450,visible:u,onCancel:a.onCancel,footer:[(0,k.jsx)(g.zx,{onClick:a.onCancel,children:"H\u1ee7y"},"back"),(0,k.jsx)(g.zx,{htmlType:"submit",type:"primary",form:"formmonhoc",loading:r,onClick:S,children:"L\u01b0u"},"submit")],children:(0,k.jsxs)(H.Z,{form:h,name:"formmonhoc",children:["edit"===o?(0,k.jsx)(b,{name:"ChucVuID",hidden:!0}):"",(0,k.jsx)(b,(0,e.Z)((0,e.Z)({label:"M\xe3 ch\u1ee9c v\u1ee5",name:"MaChucVu"},_.ITEM_LAYOUT2),{},{children:(0,k.jsx)(g.II,{ref:n})})),(0,k.jsx)(b,(0,e.Z)((0,e.Z)({label:"T\xean ch\u1ee9c v\u1ee5",name:"TenChucVu"},_.ITEM_LAYOUT2),{},{children:(0,k.jsx)(g.II,{})})),(0,k.jsx)(b,(0,e.Z)((0,e.Z)({label:"Ghi ch\xfa",name:"GhiChu"},_.ITEM_LAYOUT2),{},{children:(0,k.jsx)(D.Z,{})})),(0,k.jsx)(b,(0,e.Z)((0,e.Z)({label:"\u0110ang s\u1eed d\u1ee5ng",name:"TrangThai"},_.ITEM_LAYOUT2),{},{children:(0,k.jsxs)(M.ZP.Group,{onChange:function(a){T(a.target.value)},value:d,children:[(0,k.jsx)(M.ZP,{value:!0,children:"C\xf3"}),(0,k.jsx)(M.ZP,{value:!1,children:"Kh\xf4ng"})]})}))]})})},U=t(31752),R=t(82622),z=t(79286);var G=(0,l.$j)((function(a){return(0,e.Z)((0,e.Z)({},a.DanhMucChiaTachSapNhap),{},{role:(0,x.Ry)(a.Auth.role,"quan-ly-nam-hoc")})}),s)((function(a){var n=(0,p.useState)(P.parse(a.location.search)),t=(0,i.Z)(n,2),e=t[0],o=t[1],s=(0,p.useState)({}),l=(0,i.Z)(s,2),m=l[0],A=l[1],j=(0,p.useState)(!1),E=(0,i.Z)(j,2),I=E[0],y=E[1],_=(0,p.useState)(""),H=(0,i.Z)(_,2),M=H[0],D=H[1],b=(0,N.z)(),w=(0,i.Z)(b,2),G=w[0],O=w[1],Q=(0,p.useState)([]),V=(0,i.Z)(Q,2),q=(V[0],V[1]),X=(0,p.useState)(!1),K=(0,i.Z)(X,2),Y=K[0],B=K[1];(0,p.useEffect)((function(){(0,x.ZZ)(e),a.getList(e)}),[e]),(0,p.useEffect)((function(){a.getList(e)}),[]);var F=function(){D(""),q([]),A({}),y(!1)},$=function(n){return(0,k.jsxs)("div",{className:"action-btn",children:[(0,k.jsx)(r.Z,{title:"S\u1eeda",children:(0,k.jsx)(U.Z,{onClick:function(){return function(a){var n=a;D("edit"),v.ChiTietChiaTachSapNhap({ChiaTachSapNhapID:n}).then((function(a){a.data.Status>0?(A(a.data.Data),O(),y(!0)):(c.ZP.destroy(),c.ZP.error(a.data.Message))})).catch((function(a){c.ZP.destroy(),c.ZP.error(a.toString())}))}(n.ChiaTachSapNhapID)}})}),(0,k.jsx)(r.Z,{title:"X\xf3a",children:(0,k.jsx)(R.Z,{onClick:function(){return t=n.ChiaTachSapNhapID,void h.Z.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ch\u1ee9c v\u1ee5 n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:function(){B(!0),v.XoaChiaTachSapNhap(t).then((function(n){n.data.Status>0?(B(!1),a.getList(e),c.ZP.destroy(),c.ZP.success(n.data.Message)):(c.ZP.destroy(),c.ZP.error(n.data.Message))})).catch((function(a){c.ZP.destroy(),c.ZP.error(a.toString())}))}});var t}})})]})},J=a.DanhSachChiaTachSapNhap,W=a.TotalRow,aa=(a.role,e.PageNumber?parseInt(e.PageNumber):1),na=e.PageSize?parseInt(e.PageSize):(0,x.hL)(),ta=[{title:"STT",width:"5%",align:"center",render:function(a,n,t){return(0,k.jsx)("span",{children:(aa-1)*na+(t+1)})}},{title:"T\xean c\u01a1 quan m\u1edbi",dataIndex:"MaChiaTachSapNhap",align:"left",width:30},{title:"T\xean c\u01a1 quan c\u0169",dataIndex:"TenChiaTachSapNhap",align:"left",width:30},{title:"Ghi Ch\xfa",dataIndex:"GhiChu",align:"left",width:30},{title:"\u0110ang s\u1eed d\u1ee5ng",align:"center",width:30,render:function(a,n){return function(a){return(0,k.jsx)(u.Z,{checked:a.TrangThai,disabled:!0})}(n)}},{title:"Thao t\xe1c",width:"15%",align:"center",render:function(a,n){return $(n)}}];return(0,k.jsxs)(d.Z,{children:[(0,k.jsx)(T.Z,{children:"Danh M\u1ee5c chia t\xe1ch, s\xe1p nh\u1eadp c\u01a1 quan"}),(0,k.jsx)(S.Z,{children:(0,k.jsxs)(g.zx,{type:"primary",onClick:function(){D("add"),A({}),O(),y(!0)},children:[(0,k.jsx)(z.Z,{}),"Th\xeam th\xf4ng tin"]})}),(0,k.jsxs)(C.Z,{children:[(0,k.jsx)(f.Z,{children:(0,k.jsx)(g.Vr,{defaultValue:e.Keyword,placeholder:"Nh\u1eadp t\xean ch\u1ee9c v\u1ee5",style:{width:300},onSearch:function(a){return function(a,n){var t=e,i={value:a,property:n},h=(0,x.mB)(t,i,null);o(h),q([])}(a,"keyword")}})}),(0,k.jsx)(Z.ZP,{columns:ta,dataSource:J,onChange:function(a,n,t){var i=e,h={pagination:a,filters:n,sorter:t},c=(0,x.mB)(i,null,h);o(c),q([])},pagination:{showSizeChanger:!0,showTotal:function(a,n){return"T\u1eeb ".concat(n[0]," \u0111\u1ebfn ").concat(n[1]," tr\xean ").concat(a," k\u1ebft qu\u1ea3")},total:W,current:aa,pageSize:na},rowKey:function(a){return a.ChiaTachSapNhapID}})]}),(0,k.jsx)(L,{visible:I,dataEdit:m,action:M,loading:Y,onCreate:function(n){B(!0),"add"===M&&v.ThemChiaTachSapNhap(n).then((function(n){B(!1),n.data.Status>0?(c.ZP.destroy(),c.ZP.success(n.data.Message),F(),a.getList(e)):(B(!1),c.ZP.destroy(),c.ZP.error(response.data.Message))})).catch((function(a){B(!1),c.ZP.destroy(),c.ZP.error(a.toString())})),"edit"===M&&v.CapNhatChiaTachSapNhap(n).then((function(n){n.data.Status>0?(B(!1),c.ZP.destroy(),c.ZP.success(n.data.Message),F(),a.getList(e)):(B(!1),c.ZP.destroy(),c.ZP.error(n.data.Message))})).catch((function(a){B(!1),c.ZP.destroy(),c.ZP.error(a.toString())}))},onCancel:F,DanhSachChiaTachSapNhap:J},G)]})}))}}]);
//# sourceMappingURL=836.39d7d6b3.chunk.js.map