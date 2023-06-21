using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class QLHoSoDonThuController : ControllerBase
    {
        private readonly QLHoSoDonThuBUS _qLHoSoDonThuBUS = new();
        private readonly IWebHostEnvironment _env;
        public QLHoSoDonThuController(IWebHostEnvironment env)
        {
            
            _env = env;
        }

        [HttpGet("DanhSach")]
        [Authorize]
        public IActionResult DanhSach([FromQuery] QLHoSoDonThuParams thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;
                var CoQuanIDClaim = user.FindFirst("CoQuanID");
                var HuyenIDClaim = user.FindFirst("HuyenID");

                var info = new QLHoSoDonThuClaims
                {
                    CoQuanID = CoQuanIDClaim != null ? Convert.ToInt32(CoQuanIDClaim.Value) : -1,
                    HuyenID = HuyenIDClaim != null ? Convert.ToInt32(HuyenIDClaim.Value) : 0,
                };

                Result = _qLHoSoDonThuBUS.DanhSach(thamSo, info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpGet("ThongTinBoSung")]
        [Authorize]
        public IActionResult ThongTinBoSung([FromQuery] QLHoSoDonThuMOD thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var claims = this.HttpContext.User;

                var info = new QLHoSoDonThuClaims
                {
                    CoQuanID = IdentityHelper.GetCoQuanID(claims),
                    HuyenID = IdentityHelper.GetHuyenID(claims),
                };
                Result = _qLHoSoDonThuBUS.ThongTinBoSung(thamSo, info);

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpGet("DS_HoSo")]
        public IActionResult DS_HoSo()
        {
            var Result = new BaseResultModel();

            try
            {
                Result = _qLHoSoDonThuBUS.Ds_HoSo();
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpPost("CapNhat")]
        [Authorize]
        public IActionResult CapNhat([FromForm] string hoSoStr, IFormFile[] files)
        {

            var folderPath = _env.ContentRootPath + "/UploadFiles/filehoso";

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var Result = new BaseResultModel();

            var claims = this.HttpContext.User;

            try
            {
                var hoSoInfo = JsonConvert.DeserializeObject<Com.Gosol.KNTC.Models.KNTC.FileHoSoInfo[]>(hoSoStr);
                if (hoSoInfo == null || hoSoInfo.Length != files.Length)
                {
                    return BadRequest();
                }

                Result = _qLHoSoDonThuBUS.CapNhatHoSo(hoSoInfo, files, claims, folderPath);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }
    }
}

