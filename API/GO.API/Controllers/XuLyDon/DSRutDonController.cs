using Com.Gosol.KNTC.API.Authorization;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class DSRutDonController : ControllerBase
    {
        private readonly RutDonBUS _rutDonBUS;
        private readonly IWebHostEnvironment _env;
        public DSRutDonController(IWebHostEnvironment env)
        {
            _rutDonBUS = new RutDonBUS();
            _env = env;
        }

        [HttpGet("DanhSach")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_ChucNang, AKNTCessLevel.Read)]
        public IActionResult DanhSach([FromQuery] RutDonParams thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;
                


                var info = new RutDonClaims
                {
                    CoQuanID = IdentityHelper.GetCoQuanID(user),
                };

                Result = _rutDonBUS.DanhSach(thamSo, info);

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpPost("RutDon")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.HeThong_QuanLy_ChucNang, AKNTCessLevel.Read)]
        public IActionResult RutDon([FromBody]RutDonInfo thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var folderPath = _env.ContentRootPath + "\\UploadFiles\\FilesRutDon";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var user = this.HttpContext.User;
                var CanBoIDClaim = user.FindFirst("CanBoID");
                var info = new RutDonClaims
                {
                    CanBoID = CanBoIDClaim != null ? Convert.ToInt32(CanBoIDClaim.Value) : 0
                };

                Result = _rutDonBUS.RutDon(thamSo, info);

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpPost("HuyRutDon")]
        //[Authorize]
        //[CustomAuthAttribute(ChucNangEnum.DanhSachRutDon, AccessLevel.Read)]
        public IActionResult HuyRutDon([FromBody] RutDonInfo thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var folderPath = _env.ContentRootPath + "\\UploadFiles\\FilesRutDon";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var user = this.HttpContext.User;
                var CoQuanIDClaim = user.FindFirst("CoQuanID");
                var info = new RutDonClaims
                {

                };

                Result = _rutDonBUS.HuyRutDon(thamSo, info);

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
