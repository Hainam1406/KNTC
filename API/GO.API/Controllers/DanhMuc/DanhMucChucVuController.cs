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
    [Route("api/v2/DanhMucChucVu")]
    [ApiController]
    public class DanhMucChucVuController : BaseApiController
    {
        private DanhMucChucVuBUS danhMucChucVuBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DanhMucChucVuController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucChucVuController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.danhMucChucVuBUS = new DanhMucChucVuBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }



        [HttpGet]
        [Route("DanhSachChucVu")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = danhMucChucVuBUS.DanhSach(p);
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
        [Route("ChiTietChucVu")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet([FromQuery] int? ChucVuID)
        {
            try
            {
                var Result = danhMucChucVuBUS.ChiTiet(ChucVuID);
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
        [Route("ThemMoiChucVu")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult ThemMoi([FromBody] DanhMucChucVuThemMoiMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucChucVuBUS.ThemMoi(item);
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
        [Route("CapNhatChucVu")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult CapNhat([FromBody] DanhMucChucVuMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucChucVuBUS.CapNhat(item);
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
        [Route("XoaChucVu")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Delete)]
        public IActionResult Xoa([FromBody] int? ChucVuID)
        {
            if (ChucVuID == null) return BadRequest();
            var Result = danhMucChucVuBUS.Xoa(ChucVuID);
            if (Result != null) return Ok(Result);
            else return NotFound();
        }
    }
}