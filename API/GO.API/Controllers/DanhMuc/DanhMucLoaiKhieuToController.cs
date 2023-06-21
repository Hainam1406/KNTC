using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;

namespace GO.API.Controllers.DanhMuc
{
    [Route("api/v2/DanhMucLoaiKhieuTo")]
    [ApiController]
    public class DanhMucLoaiKhieuToController : BaseApiController
    {
        private DanhMucLoaiKhieuToBUS danhMucLoaiKhieuToBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DanhMucLoaiKhieuToController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucLoaiKhieuToController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.danhMucLoaiKhieuToBUS = new DanhMucLoaiKhieuToBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }

        [HttpGet]
        [Route("DanhSachLoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = danhMucLoaiKhieuToBUS.DanhSach(p);
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
        [Route("DanhSachLoaiKhieuToCha")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachLoaiCha([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = danhMucLoaiKhieuToBUS.DanhSachLoaiCha(p);
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
        [Route("ChiTietLoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChiTiet(int? LoaiKhieuToID)
        {
            try
            {
                var Result = danhMucLoaiKhieuToBUS.ChiTiet(LoaiKhieuToID);
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
        [Route("ThemMoiLoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult ThemMoi([FromBody] DanhSachLoaiKhieuToThemMoiMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucLoaiKhieuToBUS.ThemMoi(item);
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
        [Route("CapNhatLoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult CapNhat([FromBody] DanhMucLoaiKhieuToMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucLoaiKhieuToBUS.CapNhat(item);
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
        [Route("CapNhatTrangThaiSuDung")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult CapNhatSuDung([FromBody] DanhSachLoaiKhieuToCapNhatSuDungMOD item)
        {
            try
            {
                if (item == null) return BadRequest();
                var Result = danhMucLoaiKhieuToBUS.CapNhatSuDung(item);
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
        [Route("XoaLoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Delete)]
        public IActionResult Xoa([FromBody] int? LoaiKhieuToID)
        {
            if (LoaiKhieuToID == null) return BadRequest();
            var Result = danhMucLoaiKhieuToBUS.Xoa(LoaiKhieuToID);
            if (Result != null) return Ok(Result);
            else return NotFound();
        }
    }
}
