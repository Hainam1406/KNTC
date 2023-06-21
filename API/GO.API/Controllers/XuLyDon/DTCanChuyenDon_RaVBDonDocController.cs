using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/[controller]")]
    [ApiController]
    public class DTCanChuyenDon_RaVBDonDocController : BaseApiController
    {
        private DTCanChuyenDon_RaVBDonDocBUS DTCanChuyenDon_RaVBDonDocBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DTCanChuyenDon_RaVBDonDocController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DTCanChuyenDon_RaVBDonDocController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.DTCanChuyenDon_RaVBDonDocBUS = new DTCanChuyenDon_RaVBDonDocBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }

        [HttpGet]
        [Route("ChuyenDon_RaVBDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ChuyenDon_RaVBDonDoc([FromQuery] QueryInfo info)
        {
            try
            {
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                if (info.CanBoID != null)
                {
                    info.CanBoID = CanBoID;
                }
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);

                if (info.CoQuanID != null)
                {
                    info.CoQuanID = CoQuanID;
                }
                var Result = DTCanChuyenDon_RaVBDonDocBUS.ChuyenDon_RaVBDonDoc(info);
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
        [Route("DTCanChuyenDon_RaVBDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult CountDTCanChuyenDon_RaVBDonDoc([FromQuery] QueryInfo info)
        {
            try
            {
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (info.CanBoID != null)
                {
                    info.CanBoID = CanBoID;
                }
                if (info.CoQuanID != null)
                {
                    info.CoQuanID = CoQuanID;
                }
                var Result = DTCanChuyenDon_RaVBDonDocBUS.CountDTCanChuyenDon_RaVBDonDoc(info);
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
        [Route("GetAllCoQuanTiepNhan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetAllCoQuanTiepNhan([FromQuery] int? CoQuanID)
        {
            try
            {
                var Result = DTCanChuyenDon_RaVBDonDocBUS.GetAllCoQuanTiepNhan( CoQuanID);
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
        // Insert_RaVanBanDonDoc(KetQuaInfo cInfo, ref int DonDocID)
       
        [HttpGet]
        [Route("InsertFileDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult InsertFileDonDoc([FromForm] InforHoSo info, ref int FileHoSoID)
        {
            try
            {
               
                var Result = DTCanChuyenDon_RaVBDonDocBUS.InsertFileDonDoc(info, ref  FileHoSoID);
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
        //  GetHuongGiaiQuyetRaVBDonDoc(string Keyword, DateTime? tuNgay, DateTime? denNgay, int start, int end, int? LoaiKhieuToID, ref int total, int? CoQuanDangNhapID)
        [HttpGet]
        [Route("GetHuongGiaiQuyetRaVBDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetHuongGiaiQuyetRaVBDonDoc([FromQuery] string Keyword, DateTime? tuNgay, DateTime? denNgay, int start, int end, int? LoaiKhieuToID, ref int total, int? CoQuanDangNhapID)
        {
            try
            {
                var Result = DTCanChuyenDon_RaVBDonDocBUS.GetHuongGiaiQuyetRaVBDonDoc( Keyword,  tuNgay, denNgay,  start,  end,  LoaiKhieuToID, ref  total,  CoQuanDangNhapID);
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
        [Route("Count_ListVanBanDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Count_ListVanBanDonDoc([FromQuery] int HuongGiaiQuyetID, string Keyword, DateTime tuNgay, DateTime denNgay, int cQNhanVBDonDoc)
        {
            try
            {
                var Result = DTCanChuyenDon_RaVBDonDocBUS.Count_ListVanBanDonDoc( HuongGiaiQuyetID,  Keyword,  tuNgay,  denNgay,  cQNhanVBDonDoc);
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
        [HttpPost("DuyetRaVBDD")]
        [Authorize]
        public IActionResult DuyetVBDD(DTDuyeDonDoc thamSo)
        {

            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;


                Result = DTCanChuyenDon_RaVBDonDocBUS.DuyetVBDD(thamSo, new DTDuyetDonDocClaims
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
