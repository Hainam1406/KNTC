using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Com.Gosol.KNTC.API.Controllers.DanhMuc
{
    [Route("api/v2/DanhMucHuongGiaiQuyet")]
    [ApiController]
    public class DanhMucHuongGiaiQuyetController : BaseApiController
    {

        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration _config;
        private IOptions<AppSettings> _appSettings;
        private DanhMucHuongGiaiQuyetBUS _danhMucHuongGiaiQuyetBUS;

        public DanhMucHuongGiaiQuyetController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucDanTocController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.host = hostingEnvironment;
            this._config = config;
            this._appSettings = Settings;
            _danhMucHuongGiaiQuyetBUS = new DanhMucHuongGiaiQuyetBUS();
        }

        [HttpGet]
        [Route("DanhSachHuongGiaiQuyet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery]ThamSoLocDanhMuc thamSoLocDanhMuc)
        {
            try
            {
                var Result = _danhMucHuongGiaiQuyetBUS.DanhSach(thamSoLocDanhMuc);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }
        [HttpGet]
        [Route("HuongGiaiQuyetChiTiet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet(int HuongGiaiQuyetID)
        {
            try
            {
                var Result = _danhMucHuongGiaiQuyetBUS.ChiTietHuongGiaiQuyet(HuongGiaiQuyetID);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("ThemMoiHuongGiaiQuyet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ThemMoi([FromBody]ThemDanhMucHuongGiaiQuyetModel huongGiaiQuyet)
        {
            try
            {
                var result = _danhMucHuongGiaiQuyetBUS.ThemMoi(huongGiaiQuyet);
                return Ok(result);

            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }
        [HttpPost]
        [Route("CapNhatHuongGiaiQuyet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult SuaHuongGiaiQuyet(DanhMucHuongGiaiQuyetModel huongGiaiQuyet)
        {
            try
            {
                var result = _danhMucHuongGiaiQuyetBUS.SuaHuongGiaiQuyet(huongGiaiQuyet);
                return Ok(result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }
        [HttpPost]
        [Route("XoaHuongGiaiQuyet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult XoaHuongGiaiQuyet(XoaDanhMucHuongGiaiQuyetModel huongGiaiQuyet)
        {
            try
            {
                var Result = _danhMucHuongGiaiQuyetBUS.XoaHuongGiaiQuyet(huongGiaiQuyet.HuongGiaiQuyetID);
                return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }

    }
}