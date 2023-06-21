using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.BUS.TiepDan;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using DocumentFormat.OpenXml.EMMA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using Com.Gosol.KNTC.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.Models.DanhMuc;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/PhanXuLy")]
    [ApiController]
    public class PhanXuLyController : BaseApiController
    {
        private PhanXuLyBUS PhanXuLyBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public PhanXuLyController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<PhanXuLyController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.PhanXuLyBUS = new PhanXuLyBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }

        [HttpGet]
        [Route("DS_PhanXuLy_LanhDao")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DTCanPhanXL_LanhDao([FromQuery] paramPhanXuLy p)
        {
            try
            {
                
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanID != null)
                {
                    p.CoQuanID = CoQuanID_1;

                }
                var Result = PhanXuLyBUS.DTCanPhanXL_LanhDao(p);
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
        //  Count_DTCanPhanXL_LanhDao
        [HttpGet]
        [Route("Count_DTCanPhanXL_LanhDao")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Count_DTCanPhanXL_LanhDao([FromQuery] paramPhanXuLy p)
        {
            try
            {
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanID != null)
                {
                    p.CoQuanID = CoQuanID_1;

                }
                var Result = PhanXuLyBUS.Count_DTCanPhanXL_LanhDao(p);
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
        //
        [HttpGet]
        [Route("DS_PhanXuLy_TruongPhong")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DTCanPhanXL_TruongPhong([FromQuery] paramPhanXuLy p)
        {
            try
            {
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanID != null)
                {

                    p.CoQuanID = CoQuanID;
                }
                var PhongBanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("PhongBanID")).Value, 0);
                if (p.PhongBanID != null)
                {

                    p.PhongBanID = PhongBanID;
                }
                var Result = PhanXuLyBUS.DTCanPhanXL_TruongPhong(p);
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
        [Route("Count_DTCanPhanXL_TruongPhong")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Count_DTCanPhanXL_TruongPhong([FromQuery] paramPhanXuLy p)
        {
            try
            {
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanID != null)
                {

                    p.CoQuanID = CoQuanID;
                }
                var PhongBanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("PhongBanID")).Value, 0);
                if (p.PhongBanID != null)
                {

                    p.PhongBanID = PhongBanID;
                }
                var Result = PhanXuLyBUS.Count_DTCanPhanXL_TruongPhong(p);
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


        [HttpPost("InsertPhanXuLy")]
        [Authorize]
        public IActionResult InsertPhanXuLy([FromForm] string data)
        {


            var Result = new BaseResultModel();

            try
            {
                var thamSo = JsonConvert.DeserializeObject<FileHoSo>(data);
                if (thamSo == null)
                    return BadRequest("Empty params");


                var user = this.HttpContext.User;
                var CanBoIDClaim = user.FindFirst("CanBoID");
                var RoleIDClaim = user.FindFirst("RoleID");


                int CanBoID = CanBoIDClaim != null ? Convert.ToInt32(CanBoIDClaim.Value) : 0;
                int RoleID = RoleIDClaim != null ? Convert.ToInt32(RoleIDClaim.Value) : -1;

                Result = PhanXuLyBUS.InsertPhanXuLy(thamSo, new PhanXuLyClaims
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

        // ThemMoiPhanXuLyFile(FileHoSo info)

        [HttpPost]
        [Route("ThemMoiPhanXuLyFile")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public async Task<IActionResult> ThemMoiPhanXuLyFile(IList<IFormFile> files, [FromForm] string PhanXuLyStr)
        {
            try
            {
                var PhanXuLy = JsonConvert.DeserializeObject<FileHoSo>(PhanXuLyStr);
                var clsCommon = new Commons();
               
                if (PhanXuLy == null) return BadRequest();
                var Result = PhanXuLyBUS.ThemMoiPhanXuLyFile(PhanXuLy);
                if (Result is null) return NotFound();
                var NghiepVuID = Utils.ConvertToInt32(Result.Data, 0);
                foreach (IFormFile source in files)
                {
                    FileDinhKemModel FileDinhKem = new FileDinhKemModel
                    {
                        FileType = 16,
                        NguoiCapNhat = 20,
                        NghiepVuID = NghiepVuID
                    };
                    string TenFileGoc = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');
                    foreach (var item in PhanXuLy.FileMau)
                    {
                        if (item.TenFileGoc == TenFileGoc)
                        {
                            FileDinhKem.TenFile = item.TenFile;
                        }
                    }
                    var file = await clsCommon.UpdateFileAsync(source, FileDinhKem,host);

                    //DanhMucBuocXacMinh.FileMau = file.FileUrl;

                    if (file != null && file.FileID > 0)
                    {
                        PhanXuLy.FileMau.Add(file);
                    }
                }

                return Ok(Result);
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("ThemMoiPhanXuLyFile_v1")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]ThemMoiPhanXuLyFile(FileHoSo info)
        public async Task<IActionResult> ThemMoiPhanXuLyFile_v1([FromBody] FileHoSo info)
        {
            try
            {               
                var Result = PhanXuLyBUS.ThemMoiPhanXuLyFile(info);
                if (Result != null) return Ok(Result);
                else return NotFound();
                return Ok(Result);
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }
        [HttpPost("ChuyenDonPhanXuLy")]
        [Authorize]
        public IActionResult ChuyenDonPhanXuLy(DTDuyetKQXuLyMOD thamSo)
        {

            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;


                Result = PhanXuLyBUS.DuyetPhanXuLy(thamSo, new DTDuyetKQXuLyClaims
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
    }

}
