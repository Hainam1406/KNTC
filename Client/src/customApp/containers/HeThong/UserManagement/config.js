import {
    apiGetAuth,
    apiPostAuth
  } from "../../../../api";
  import server from '../../../../settings';
  import {getDefaultPageSize} from "../../../../helpers/utility";
  
  const apiUrl = {
    listusermanagement: server.apiTemp + 'HeThongCanBo/GetListPaging',
    edituser : server.apiTemp + 'hethongcanbo/Update',
    deleteuser : server.apiTemp + 'hethongcanbo/Delete',
    adduser : server.apiTemp + 'hethongcanbo/insert',
    detailsUser: server.apiTemp + 'hethongcanbo/GetByID',
    // themuser: server.apiTemp + 'hethongcanbo/insert',
    // suauser: server.apiTemp + 'hethongcanbo/Update',
    // xoauser: server.apiTemp + 'hethongcanbo/Delete',
    resetmk: server.apiTemp + 'hethongcanbo/ResetPassword',
    taifilemau: server.apiTemp + 'hethongcanbo/DowloadExel',
    importfile: server.apiTemp + 'hethongcanbo/ReadExcelFile',
    getAlluser : server.apiTemp + 'hethongcanbo/GetAllVaiTro',
    resetpassword : server.apiTemp + 'hethongnguoidung/ResetPassword',
  };
  const api = {
    GetListUserManagement: (param) => {
      return apiGetAuth(apiUrl.listusermanagement, {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
        // LoaiDanhMuc: 6
      });
    },
    EditUser : params => {
      return apiPostAuth(apiUrl.edituser,{...params})
    },
    DeleteUser : params => {
      return apiPostAuth(apiUrl.deleteuser, {...params})
    },
    AddUser : params => {
      return apiPostAuth(apiUrl.adduser,{...params})
    },
    DetailsUser : params => {
      return apiGetAuth(apiUrl.detailsUser,{...params})
    },
    ResetPassword : params => {
      return apiGetAuth(apiUrl.resetpassword,{...params})
    }
  };
  
  export default api;