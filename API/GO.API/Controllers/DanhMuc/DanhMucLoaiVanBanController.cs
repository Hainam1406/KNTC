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
    [Route("api/v2/DanhMucLoaiVanBan")]
    [ApiController]
    public class DanhMucLoaiVanBanController : BaseApiController
    {

        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration _config;
        private IOptions<AppSettings> _appSettings;
        private DanhMucLoaiVanBanBUS _danhMucLoaiVanBanBUS;

        public DanhMucLoaiVanBanController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucDanTocController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.host = hostingEnvironment;
            this._config = config;
            this._appSettings = Settings;
            _danhMucLoaiVanBanBUS = new DanhMucLoaiVanBanBUS();
        }

        [HttpGet]
        [Route("DanhSachLoaiVanBan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery]ThamSoLocDanhMuc thamSoLocDanhMuc)
        {
            try
            {
                var Result = _danhMucLoaiVanBanBUS.DanhSach(thamSoLocDanhMuc);
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
        
        [HttpGet]
        [Route("ChiTietLoaiVanBan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet(int VanBanID)
        {
            try
            {
                var Result = _danhMucLoaiVanBanBUS.ChiTiet(VanBanID);
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

        [HttpPost]
        [Route("ThemMoiVanBan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ThemMoi([FromBody]ThemDanhMucLoaiVanBanModel vanBan)
        {
            try
            {
                var result = _danhMucLoaiVanBanBUS.ThemMoi(vanBan);
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
        [Route("CapNhatVanBan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult SuaVanBan(DanhMucLoaiVanBanModel vanBan)
        {
            try
            {
                var result = _danhMucLoaiVanBanBUS.SuaVanBan(vanBan);
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
        [Route("XoaVanBan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult XoaVanBan(XoaThemDanhMucLoaiVanBanModel vanBan)
        {
            try
            {
                var Result = _danhMucLoaiVanBanBUS.XoaVanBan(vanBan.LoaiVanBanID);
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