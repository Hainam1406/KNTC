﻿using Com.Gosol.KNTC.API.Authorization;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using static Com.Gosol.KNTC.Models.HeThong.HeThongNguoiDungModelPartial;
//using LogHelper = Com.Gosol.KNTC.API.Formats.LogHelper;

namespace Com.Gosol.KNTC.API.Controllers.HeThong
{
    [Route("api/v2/HeThongNguoiDung")]
    [ApiController]
    public class HeThongNguoidungController : BaseApiController
    {
        private HeThongNguoidungBUS _HeThongNguoidungBUS;
        private HeThongCanBoBUS _HeThongCanBoBUS;
        private PhanQuyenBUS _PhanQuyenBUS;
        public HeThongNguoidungController(ILogHelper _LogHelper, ILogger<HeThongNguoidungController> logger) : base(_LogHelper, logger)
        {
            this._HeThongNguoidungBUS = new HeThongNguoidungBUS();
            this._HeThongCanBoBUS = new HeThongCanBoBUS();
            _PhanQuyenBUS = new PhanQuyenBUS();
        }

        [HttpPost]
        [CustomAuthAttribute(ChucNangEnum.QuanLyNguoiDung, AccessLevel.Create)]
        [Route("Insert")]
        public IActionResult Insert(HeThongNguoiDungModel HeThongNguoiDungModel)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_Nguoidung_ThemNguoidung, EnumLogType.Insert, () =>
                {
                    string Message = null;
                    int val = 0;
                    val = _HeThongNguoidungBUS.Insert(HeThongNguoiDungModel, ref Message);
                    base.Message = Message;
                    base.Status = val > 0 ? 1 : 0;
                    base.Data = Data;
                    return base.GetActionResult();
                });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpPost]
        [CustomAuthAttribute(ChucNangEnum.QuanLyNguoiDung, AccessLevel.Edit)]
        [Route("Update")]
        public IActionResult Update(HeThongNguoiDungModel HeThongNguoiDungModel)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_Nguoidung_SuaNguoidung, EnumLogType.Update, () =>
                {
                    string Message = null;
                    int val = 0;
                    val = _HeThongNguoidungBUS.Update(HeThongNguoiDungModel, ref Message);
                    base.Message = Message;
                    base.Status = val > 0 ? 1 : 0;
                    base.Data = Data;
                    return base.GetActionResult();
                });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpPost]
        [CustomAuthAttribute(ChucNangEnum.QuanLyNguoiDung, AccessLevel.Delete)]
        [Route("Delete")]
        public IActionResult Delete([FromBody] BaseDeleteParams p)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_Nguoidung_XoaNguoidung, EnumLogType.Delete, () =>
                 {
                     int Status = 0;
                     var Result = _HeThongNguoidungBUS.Delete(p.ListID, ref Status);
                     //if(Result.Count <= 0)
                     //{
                     //    base.Status = 1;
                     //    base.Message = "Xóa thành công!";
                     //    return base.GetActionResult();
                     //}
                     //else
                     //{
                     base.Status = Status;
                     base.Data = Result;
                     return base.GetActionResult();
                     //}

                 });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpGet]
        [CustomAuthAttribute(ChucNangEnum.QuanLyNguoiDung, AccessLevel.Read)]
        [Route("GetByID")]
        public IActionResult GetByID(int NguoiDungID)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_Nguoidung_GetByID, EnumLogType.GetByID, () =>
                 {
                     HeThongNguoiDungModel Data;
                     Data = _HeThongNguoidungBUS.GetByID(NguoiDungID);
                     base.Status = Data.CanBoID > 0 ? 1 : 0;
                     base.Data = Data;
                     return base.GetActionResult();
                 });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpGet]
        [CustomAuthAttribute(ChucNangEnum.QuanLyNguoiDung, AccessLevel.Read)]
        [Route("GetListPaging1")]
        public IActionResult GetPagingBySearch1([FromQuery] BasePagingParams p, int? CoQuanID, int? TrangThai)
        {
            try
            {
                return CreateActionResult(false, ConstantLogMessage.HT_Nguoidung_GetListPaging, EnumLogType.GetList, () =>
                 {
                     IList<object> Data;
                     int TotalRow = 0;
                     Data = _HeThongNguoidungBUS.GetPagingBySearch(p, ref TotalRow, CoQuanID, TrangThai);
                     int totalRow = Data.Count();
                     if (totalRow == 0)
                     {
                         base.Message = ConstantLogMessage.API_NoData;
                         base.Status = 1;
                         return base.GetActionResult();
                     }

                     base.Status = TotalRow > 0 ? 1 : 0;
                     base.Data = Data;
                     base.TotalRow = TotalRow;
                     return base.GetActionResult();
                 });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpGet]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.Read)]
        [Route("GetListPaging")]
        public IActionResult GetPagingBySearch([FromQuery] BasePagingParamsForFilter p)
        {
            try
            {
                var crCoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                var crNguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "NguoiDungID").Value, 0);
                //var crCanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                return CreateActionResult(false, ConstantLogMessage.HT_Nguoidung_GetListPaging, EnumLogType.GetList, () =>
                {
                    IList<object> Data;
                    int TotalRow = 0;
                    Data = _HeThongNguoidungBUS.GetPagingBySearch_New(p, ref TotalRow, Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0), crNguoiDungID, crCoQuanID);
                    int totalRow = Data.Count();
                    if (totalRow == 0)
                    {
                        base.Message = ConstantLogMessage.API_NoData;
                        base.Status = 1;
                        base.GetActionResult();
                    }
                    base.Status = totalRow > 0 ? 1 : 0;
                    base.Data = Data;
                    base.TotalRow = TotalRow;
                    return base.GetActionResult();
                });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpGet]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.Read)]
        [Route("ResetPassword")]
        public IActionResult ResetPassword([FromQuery] int NguoiDungID)
        {
            try
            {
                return CreateActionResult("Reset lại mật khẩu", EnumLogType.Other, () =>
                {
                    var Result = _HeThongNguoidungBUS.ResetPassword(NguoiDungID);
                    try
                    {
                        if (Utils.ConvertToInt32(Result.FirstOrDefault().Key, 0) > 0)
                        {
                            var clsCommon = new Commons();
                            var NguoiDung = _HeThongNguoidungBUS.GetByID(NguoiDungID);
                            HeThongNguoiDungModelPartial p = new HeThongNguoiDungModelPartial();
                            p.TenNguoiDung = NguoiDung.TenNguoiDung;
                            p.CoQuanID = NguoiDung.CoQuanID;
                            p.Url = clsCommon.GetServerPath(HttpContext);
                            SendMail(p);
                        }
                    }
                    catch (Exception)
                    {
                        //throw;
                    }
                    base.Message = Result.FirstOrDefault().Value.ToString();
                    base.Status = Utils.ConvertToInt32(Result.FirstOrDefault().Key, 0);
                    base.Data = Data;
                    return base.GetActionResult();
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [Route("GetByIDForPhanQuyen")]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.FullAKNTCess)]
        [HttpGet]
        public IActionResult GetByIDForPhanQuyen(int? NguoiDungID)
        {
            try
            {

                return CreateActionResult("Đăng nhập lại (f5)", EnumLogType.DangNhap, () =>
                {
                    if (NguoiDungID == null)
                    {
                        return Ok(new
                        {
                            Status = -1,
                            Message = "Param NguoiDungID is NULL",
                        });
                    }
                    else
                    {
                        var NguoiDungIDToken = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == "NguoiDungID").Value, 0);
                        if (NguoiDungIDToken != NguoiDungID)
                        {
                            return Ok(new
                            {
                                Status = -1,
                                Message = "Sai token",
                            });
                        }
                    }
                    NguoiDungModel NguoiDung = null;
                    NguoiDung = _HeThongNguoidungBUS.GetByIDForPhanQuyen(NguoiDungID.Value);

                    if (NguoiDung != null && NguoiDung.NguoiDungID > 0)
                    {
                        var clsCommon = new Commons();
                        var CanBoInfo = _HeThongCanBoBUS.GetCanBoByID(NguoiDung.CanBoID);
                        NguoiDung.AnhHoSo = CanBoInfo.AnhHoSo != string.Empty ? clsCommon.GetServerPath(HttpContext) + CanBoInfo.AnhHoSo : string.Empty;
                        //   Task.Run(() => _ILogHelper.Log(NguoiDung.CanBoID, "Đăng nhập hệ thống", (int)LogType.Action));
                        var ListChucNang = _PhanQuyenBUS.GetListChucNangByNguoiDungID(NguoiDungID.Value);
                        NguoiDung.ExpiresAt = Utils.ConvertToDateTime(User.Claims.FirstOrDefault(c => c.Type == "expires_at").Value, DateTime.Now.Date);
                        NguoiDung.expires_at = NguoiDung.ExpiresAt;
                        NguoiDung.CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                        return Ok(new
                        {
                            Status = 1,
                            User = NguoiDung,
                            ListRole = ListChucNang
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            Status = -98,
                            Message = Constant.NOT_ACCOUNT,
                        });
                    }
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.GetActionResult();
                throw ex;
            }
        }


        [Route("SendMail")]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.FullAKNTCess)]
        [HttpPost]
        public IActionResult SendMail([FromBody] HeThongNguoiDungModelPartial p)
        {
            try
            {
                return CreateActionResult(false, ConstantLogMessage.API_SendMail, EnumLogType.Other, () =>
                {

                    var Result = _HeThongNguoidungBUS.SendMail(p);
                    base.Status = Result.Status;
                    base.Message = Result.Message;
                    return base.GetActionResult();

                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }


        [Route("SetNewPassword")]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.FullAKNTCess)]
        [HttpPost]
        public IActionResult UpdateNguoiDung([FromBody] QuenMatKhauModelPar p)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.API_SendMail, EnumLogType.Other, () =>
                {
                    var Result = _HeThongNguoidungBUS.UpdateNguoiDung(p.TenDangNhap, p.MatKhauMoi);
                    base.Status = Result.Status;
                    base.Message = Result.Message;
                    return base.GetActionResult();

                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }



        }


        [Route("CheckMaMail")]
        [HttpGet]
        public IActionResult CheckMaMail([FromQuery] string Token)
        {
            try
            {
                return CreateActionResult(false, "Check mã mail", EnumLogType.Other, () =>
                {
                    var Result = _HeThongNguoidungBUS.CheckMaMail(Token);
                    base.Status = Result.Status;
                    base.Message = Result.Message;
                    base.Data = Result.Data;
                    return base.GetActionResult();
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }



        }


        [HttpPost]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.Read)]
        [Route("ChangePassword")]
        public IActionResult ChangePassword([FromBody] DoiMatKhauModel p)
        {
            try
            {
                //var expires_at = Utils.ConvertToDateTime(User.Claims.FirstOrDefault(c => c.Type == "expires_at").Value, DateTime.Now.Date);
                var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "NguoiDungID").Value, 0);
                return CreateActionResult("Đổi mật khẩu", EnumLogType.Other, () =>
                {
                    var Result = _HeThongNguoidungBUS.ChangePassword(NguoiDungID, p.OldPassword, p.NewPassword);
                    base.Status = Result.Status;
                    base.Message = Result.Message;
                    return base.GetActionResult();
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }


        [HttpGet]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_NguoiDung, AKNTCessLevel.Read)]
        [Route("HeThong_NguoiDung_GetListBy_NhomNguoiDungID")]
        public IActionResult HeThong_NguoiDung_GetListBy_NhomNguoiDungID(int NhomNguoiDungID)
        {
            try
            {
                return CreateActionResult(false, "Lấy danh sách người dùng theo nhóm người dùng", EnumLogType.GetList, () =>
                {
                    IList<HeThongNguoiDungModel> Data;
                    int TotalRow = 0;
                    //Data = _HeThongNguoidungBUS.HeThong_NguoiDung_GetListBy_NhomNguoiDungID(NhomNguoiDungID);
                    Data = _PhanQuyenBUS.HeThong_NguoiDung_GetListBy_NhomNguoiDungID(NhomNguoiDungID, Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "NguoiDungID").Value, 0));
                    int totalRow = Data.Count();
                    if (totalRow == 0)
                    {
                        base.Message = ConstantLogMessage.API_NoData;
                        base.Status = 1;
                        base.GetActionResult();
                    }
                    base.Status = totalRow >= 0 ? 1 : 0;
                    base.Data = Data;
                    base.TotalRow = TotalRow;
                    return base.GetActionResult();
                });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }
    }
}