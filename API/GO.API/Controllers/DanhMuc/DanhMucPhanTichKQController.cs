using Com.Gosol.KNTC.API.Authorization;
using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RestSharp;

namespace Com.Gosol.KNTC.API.Controllers.DanhMuc
{
    [Route("api/v2/DanhMucPhanTich")]
    [ApiController]
    public class DanhMucPhanTichKQController : BaseApiController
    {
        private DanhMucPhanTichKQBUS danhMucPhanTichKQBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DanhMucPhanTichKQController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucPhanTichKQController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.danhMucPhanTichKQBUS = new DanhMucPhanTichKQBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }



        [HttpGet]
        [Route("DanhSachPhanTichKQ")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = danhMucPhanTichKQBUS.DanhSach(p);
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
        [Route("ChiTietPhanTichKQ")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet([FromQuery] int? PhanTichKQID)
        {
            try
            {
                var Result = danhMucPhanTichKQBUS.ChiTiet(PhanTichKQID);
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
        [Route("ThemMoiPhanTichKQ")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult ThemMoi([FromBody] DanhMucPhanTichKQThemMoiMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucPhanTichKQBUS.ThemMoi(item);
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
        [Route("CapNhatPhanTichKQ")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult CapNhat([FromBody] DanhMucPhanTichKQMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucPhanTichKQBUS.CapNhat(item);
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
        [Route("XoaPhanTichKQ")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Delete)]
        public IActionResult Xoa([FromBody] int? PhanTichKQID)
        {
            if (PhanTichKQID == null) return BadRequest();
            var Result = danhMucPhanTichKQBUS.Xoa(PhanTichKQID);
            if (Result != null) return Ok(Result);
            else return NotFound();
        }
    }
}