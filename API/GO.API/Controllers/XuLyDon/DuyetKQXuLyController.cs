using Com.Gosol.KNTC.API.Authorization;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class DuyetKQXuLyController : ControllerBase
    {
        public readonly DTDuyetKQXuLyBUS _duyetKQXuLyBUS;

        public DuyetKQXuLyController()
        {
            _duyetKQXuLyBUS = new DTDuyetKQXuLyBUS();
        }

        [HttpGet("DanhSach")]
        [CustomAuth(ChucNangEnum.PheDuyetKetQuaXL, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] DTDuyetKQXuLyParams thamSo)
        {
            var Result = new BaseResultModel();


            try
            {
                var user = this.HttpContext.User;
                //var CoQuanIDClaim = user.FindFirst("CoQuanID");
                //var RoleIDClaim = user.FindFirst("RoleID");


                //int CoQuanID = CoQuanIDClaim != null ? Convert.ToInt32(CoQuanIDClaim.Value) : -1;
                //int RoleID = RoleIDClaim != null ? Convert.ToInt32(RoleIDClaim.Value) : -1;

                Result = _duyetKQXuLyBUS.DanhSach(thamSo, new DTDuyetKQXuLyClaims
                {
                    CoQuanID = IdentityHelper.GetCoQuanID(user),
                    RoleID = IdentityHelper.GetRoleID(user),
                    PhongBanID = IdentityHelper.GetPhongBanID(user)
                });

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpPost("InsertKQXuLy")]
        [CustomAuth(ChucNangEnum.PheDuyetKetQuaXL, AccessLevel.Create)]
        public IActionResult InsertKQXuLy([FromForm] string data)
        {
            var Result = new BaseResultModel();

            try
            {
                var thamSo = JsonConvert.DeserializeObject<DTDuyetKQXuLyMOD>(data);
                if (thamSo == null)
                    return BadRequest("Empty params");


                var user = this.HttpContext.User;
                var CanBoIDClaim = user.FindFirst("CanBoID");
                var RoleIDClaim = user.FindFirst("RoleID");


                int CanBoID = CanBoIDClaim != null ? Convert.ToInt32(CanBoIDClaim.Value) : 0;
                int RoleID = RoleIDClaim != null ? Convert.ToInt32(RoleIDClaim.Value) : -1;

                Result = _duyetKQXuLyBUS.SuaKetQuaXuLy(thamSo, new DTDuyetKQXuLyClaims
                {
                    CanBoID = CanBoID,
                    RoleID = RoleID,
                });
                Result.Data = thamSo;

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            

            return Ok(Result);
        }

        [HttpGet("SuaKetQuaXuLyDetail")]
        [Authorize]
        public IActionResult SuaKetQuaXuLyDetail([FromQuery] DTDuyetKQXuLyMOD thamSo)
        {
            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;
                //var CanBoIDClaim = user.FindFirst("CanBoID");
                //var RoleIDClaim = user.FindFirst("RoleID");


                //int CanBoID = CanBoIDClaim != null ? Convert.ToInt32(CanBoIDClaim.Value) : 0;
                //int RoleID = RoleIDClaim != null ? Convert.ToInt32(RoleIDClaim.Value) : -1;

                Result = _duyetKQXuLyBUS.SuaKetQuaXuLyDetail(thamSo, new DTDuyetKQXuLyClaims
                {
                    CanBoID = IdentityHelper.GetCanBoID(user),
                    RoleID = IdentityHelper.GetRoleID(user),
                });

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }

        [HttpPost("Duyet")]
        [Authorize]
        public IActionResult Duyet(DTDuyetKQXuLyMOD thamSo)
        {

            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;


                Result = _duyetKQXuLyBUS.DuyetKetQuaXuLy(thamSo, new DTDuyetKQXuLyClaims
                {
                    CanBoID = IdentityHelper.GetCanBoID(user),
                    CoQuanID = IdentityHelper.GetCoQuanID(user),
                    QTVanThuTiepDan = IdentityHelper.GetQTVanThuTiepDan(user),
                    RoleID = IdentityHelper.GetRoleID(user),
                    SuDungQuyTrinh = IdentityHelper.GetSuDungQuyTrinh(user)
                });

            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Ok(Result);
        }
        
        [HttpGet("demo")]
        public IActionResult demo(DateTime end)
        {
            var now = DateTime.Now;

            TimeSpan duration = end - now;


            return Ok(new
            {
                ngayconlai = duration.Days,
                hconlai = duration.Hours
            });
        }
    }
}
