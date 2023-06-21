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
    [Route("api/v2/DanhMucDanToc")]
    [ApiController]
    public class DanhMucDanTocController : BaseApiController
    {
        private DanhMucDanTocBUS danhMucDanTocBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DanhMucDanTocController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucDanTocController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.danhMucDanTocBUS = new DanhMucDanTocBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }



        [HttpGet]
        [Route("DanhSachDanToc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = danhMucDanTocBUS.DanhSach(p);
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
        [Route("ChiTietDanToc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet([FromQuery] int? danTocID)
        {
            try
            {
                var Result = danhMucDanTocBUS.ChiTiet(danTocID);
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
        [Route("ThemMoiDanToc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult ThemMoi([FromBody] DanhMucDanTocThemMoiMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucDanTocBUS.ThemMoi(item);
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
        [Route("CapNhatDanToc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult CapNhat([FromBody] DanhMucDanTocMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucDanTocBUS.CapNhat(item);
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
        [Route("XoaDanToc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Delete)]
        public IActionResult Xoa([FromBody] int? danTocID)
        {
            if (danTocID == null) return BadRequest();
            var Result = danhMucDanTocBUS.Xoa(danTocID);
            if (Result != null) return Ok(Result);
            else return NotFound();
        }
    }
}