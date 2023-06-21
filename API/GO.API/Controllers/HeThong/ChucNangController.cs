using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.Model.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;

namespace Com.Gosol.KNTC.API.Controllers.HeThong
{
    [Route("api/v2/ChucNang")]
    [ApiController]
    public class ChucNangController : BaseApiController
    {
        private ChucNangBUS _ChucNangBUS;

        public ChucNangController(ILogHelper _LogHelper, ILogger<ChucNangController> logger) : base(_LogHelper, logger)
        {
            this._ChucNangBUS = new ChucNangBUS();
        }


        [HttpGet]
        [Route("GetListPaging")]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_ChucNang, AKNTCessLevel.Read)]
        public IActionResult GetListPaging([FromQuery] BasePagingParamsForFilter p)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_ChucNang_GetListPaging, EnumLogType.GetList, () =>
                 {
                     int TotalRow = 0;
                     IList<ChucNangModel> Data;
                     Data = _ChucNangBUS.GetPagingBySearch(p, ref TotalRow);
                     base.Status = 1;
                     base.TotalRow = TotalRow;
                     base.Data = Data;
                     return base.GetActionResult();
                 });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
                throw ex;
            }
        }

        [HttpGet]
        [Route("GetListMenu")]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_ChucNang, AccessLevel.Read)]
        public IActionResult GetListMenu([FromQuery] BasePagingParamsForFilter p)
        {
            try
            {
                return CreateActionResult(ConstantLogMessage.HT_ChucNang_GetListPaging, EnumLogType.GetList, () =>
                {
                    int TotalRow = 0;
                    int nguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "NguoiDungID").Value, 0);
                    var Data = _ChucNangBUS.GetListMenuByNguoiDungID(nguoiDungID);
                    base.Status = 1;
                    base.TotalRow = Data.Count;
                    base.Data = Data;
                    return base.GetActionResult();
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
                throw ex;
            }
        }
        [HttpGet]
        [Route("DanhSach")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] ThamSoLocDanhMuc thamSo)
        {
            try
            {
                // var bytes = _danhMucBieuMauBUS.DowloadBieuMau(fileName);
                var data = _ChucNangBUS.DanhSach(thamSo);

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("DanhSachCapCha")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachCapCha()
        {
            try
            {
                var data = _ChucNangBUS.DanhSachCapCha();

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("ChiTiet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet(int? chucNangID)
        {
            try
            {
                var data = _ChucNangBUS.ChiTiet(chucNangID);

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }

        [HttpPost("ThemMoi")]
        public IActionResult ThemMoi(DanhMucChucNangThemMoi chucNang)
        {
            try
            {
                var data = _ChucNangBUS.ThemMoi(chucNang);

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }

        [HttpPost("Sua")]
        public IActionResult ThemMoi(DanhMucChucNangSua chucNang)
        {
            try
            {
                var data = _ChucNangBUS.Sua(chucNang);

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }

        [HttpPost("Xoa")]
        public IActionResult Xoa(XoaChucNang chucNang)
        {
            try
            {
                var data = _ChucNangBUS.Xoa(chucNang.ChucNangID);

                return Ok(data);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.ToString();
                return base.GetActionResult();
            }
        }
    }

}