using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.BUS.TiepDan;
using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using DocumentFormat.OpenXml.Wordprocessing;
using GroupDocs.Viewer.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using Microsoft.Office.Interop.Word;
using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;

namespace GO.API.Controllers.TiepDan
{
    [Route("api/v2/TiepDanGianTiep")]
    [ApiController]
    public class TiepDanGianTiepController : BaseApiController
    {
        private TiepDanGianTiepBUS tiepDanGianTiepBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;

        public TiepDanGianTiepController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<TiepDanTrucTiepController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.tiepDanGianTiepBUS = new TiepDanGianTiepBUS();
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }

        [HttpPost]
        [Route("ThemMoiTiepDan")]
        public async Task<IActionResult> ThemMoi([FromBody] TiepDanGianTiepMOD item/*, IList<IFormFile> files, [FromForm] string FileHoSoStr*/)
        {
            try
            {
                int i = 0;
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("NguoiDungID")).Value, 0);
                var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CapID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);
                /*TiepDanGianTiepMOD tiepdan = new TiepDanGianTiepMOD
                {
                    item.TiepNhanDT[i].CoQuanID = CoQuanID,
                    CanBoTiepNhapID = CanBoID
                };*/
                TiepDanClaims tiepDanClaims = new TiepDanClaims()
                {
                    CanBoID = CanBoID,
                    CoQuanID = CoQuanID,
                    CapID = CapID,
                    NguoiDungID = NguoiDungID,
                    SuDungQuyTrinh = SuDungQuyTrinh
                };
                item.TiepNhanDT[i].CoQuanID = CoQuanID;
                item.TiepNhanDT[i].CanBoTiepNhapID = CanBoID;
                item.themMoiFileHoSo[i].NguoiUp = CanBoID;
                if (item == null) return BadRequest();
                var Result = tiepDanGianTiepBUS.ThemMoiTiepDan(item, tiepDanClaims);
                if (Result is null) return NotFound();
                else return Ok(Result);

                
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }


        [HttpPost]
        [Route("ThemFileHoSo")]
        public async Task<IActionResult> ThemFileHoSo(IList<IFormFile> files, [FromForm] string TiepDanStr)
        {
            try
            {

                var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                var clsComon = new Commons();

                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);
                var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("NguoiDungID")).Value, 0);
                TiepDanClaims tiepDanClaims = new TiepDanClaims()
                {
                    /*CanBoID = CanBoID,
                    CoQuanID = CoQuanID,
                    CapID = CapID,*/
                    NguoiDungID = NguoiDungID,
                    SuDungQuyTrinh = SuDungQuyTrinh
                };

                if (TiepDan == null) return BadRequest();
                var Result = tiepDanGianTiepBUS.ThemMoiTiepDan(TiepDan, tiepDanClaims);
                if (Result is null) return NotFound();
                else return Ok(Result);

                //var NghiepVuID = Utils.ConvertToInt32(Result.Data, 0);
                if (files != null && files.Count > 0 && TiepDan != null)
                {
                    List<FileDinhKemModel> ListFileUrl = new List<FileDinhKemModel>();

                    int i = 0;
                    foreach (IFormFile source in files)
                    {
                        FileDinhKemModel FileDinhKem = new FileDinhKemModel
                        {
                            FileType = 1,
                            NguoiCapNhat = 20,
                            TomTat = TiepDan.themMoiFileHoSo[i].TomTat,
                            DonThuID = TiepDan.themMoiFileHoSo[i].DonThuID,
                            XuLyDonID = TiepDan.themMoiFileHoSo[i].XuLyDonID,
                            FileID = (int)TiepDan.themMoiFileHoSo[i].FileID
                            //NghiepVuID = NghiepVuID
                        };
                        string TenFileGoc = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');
                        foreach (var info in TiepDan.themMoiFileHoSo)
                        {
                            if (info.TenFileGoc == TenFileGoc)
                            {
                                FileDinhKem.TenFile = info.TenFile;
                            }
                        }
                        var file = await clsComon.InsertFileAsync(source, FileDinhKem, _host);
                        if (file != null && file.FileID > 0)
                        {
                            ListFileUrl.Add(file);
                        }

                        i++;
                        base.Data = ListFileUrl;
                        base.Status = 1;
                        base.Message = "Thêm mới file thành công";

                    }
                }
                else
                {
                    base.Status = 0;
                    base.Message = "Vui lòng chọn file";
                }
                return base.GetActionResult();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("ThemMoiFile")]
        public async Task<IActionResult> ThemFile(List<IFormFile> files)
        {
            var clsComon = new Commons();
            List<FileDinhKemModel> ListFileUrl = new List<FileDinhKemModel>();
            foreach (IFormFile source in files)
            {
                FileDinhKemModel FileDinhKem = new FileDinhKemModel
                {
                    FileType = 1
                };

                var file = await clsComon.InsertFileAsync_v2(source, FileDinhKem, _host);
                if (file != null)
                {
                    ListFileUrl.Add(file);
                }
                base.Data = ListFileUrl;
                base.Status = 1;
                base.Message = "Thêm mới file thành công";
            }

            return base.GetActionResult();
        }

        [HttpGet]
        [Route("DanhSachLoaiDoiTuongKN")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachLoaiDoiTuongKN()
        {
            try
            {
                var Result = tiepDanGianTiepBUS.DanhSachLoaiDoiTuongKN();
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
        [Route("GetDonTrung")]
        public IActionResult GetDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? TotalRow)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.GetDonTrung(hoTen, cmnd, diachi, noidungdon, TotalRow);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("CheckSoDonTrung")]
        public IActionResult CheckSoDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? toCao, int? coQuanID)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.CheckSoDonTrung(hoTen, cmnd, diachi, noidungdon, toCao, CoQuanID);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("CoundTrungDon")]
        public IActionResult CoundTrungDon(int donthuID)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.CoundTrungDon(donthuID);
                if (Result < 0) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("GetCTTrungDonByDonID")]
        public IActionResult GetCTTrungDonByDonID(int donthuID)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.GetCTTrungDonByDonID(donthuID);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("GetKhieuToLan2")]
        public IActionResult GetKhieuToLan2(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? stateID, int? TotalRow)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.GetKhieuToLan2(hoTen, cmnd, diachi, noidungdon, stateID, TotalRow);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("CountSoLanGQ")]
        public IActionResult CountSoLanGQ(int? donthuID, int? stateID)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.CountSoLanGQ(donthuID, stateID);
                if (Result < 0) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("GetCTKhieuToLan2ByDonID")]
        public IActionResult GetCTKhieuToLan2ByDonID(int donthuID)
        {
            try
            {
                //var TiepDan = JsonConvert.DeserializeObject<TiepDanGianTiepMOD>(TiepDanStr);
                //var clsComon = new Commons();
                var Result = tiepDanGianTiepBUS.GetCTKhieuToLan2ByDonID(donthuID);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("CapNhatTiepDan")]
        public IActionResult CapNhatTiepDan([FromBody] TiepDanGianTiepMOD item)
        {
            try
            {
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("NguoiDungID")).Value, 0);
                var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CapID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);
                /*TiepDanGianTiepMOD tiepdan = new TiepDanGianTiepMOD
                {
                    item.TiepNhanDT[i].CoQuanID = CoQuanID,
                    CanBoTiepNhapID = CanBoID
                };*/
                TiepDanClaims tiepDanClaims = new TiepDanClaims()
                {
                    CanBoID = CanBoID,
                    CoQuanID = CoQuanID,
                    CapID = CapID,
                    NguoiDungID = NguoiDungID,
                    SuDungQuyTrinh = SuDungQuyTrinh
                };
                item.TiepNhanDT[0].CoQuanID = CoQuanID;
                item.TiepNhanDT[0].CanBoTiepNhapID = CanBoID;
                item.themMoiFileHoSo[0].NguoiUp = CanBoID;
                var Result = tiepDanGianTiepBUS.CapNhatTiepDan(item, tiepDanClaims);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("GetSoDonThu")]
        public IActionResult GetSoDonThu()
        {
            try
            {
                var coQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var MaCQ = Utils.ConvertToString(User.Claims.FirstOrDefault(x => x.Type == ("MaCQ")).Value, string.Empty);
                var soDonThu = tiepDanGianTiepBUS.GetSoDonThu(coQuanID);
                string maCQ = string.Empty;
                if (coQuanID == coQuanID)
                {
                    maCQ = MaCQ;
                }
                else
                {
                    CoQuanInfo cqInfo = new CoQuan().GetCoQuanByID(coQuanID);
                    maCQ = cqInfo.MaCQ;
                }

                string numberPart = Regex.Replace(soDonThu.Message.Replace(maCQ, ""), "[^0-9.]", "");
                int soDonMoi = Utils.ConvertToInt32(numberPart, 0) + 1;

                //if (Result is null) return NotFound();
                //else 
                    var Result = maCQ + soDonMoi;
                return Ok(Result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("DownloadFile")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DownloadFile(string FileName)
        {
            string path = $"/UploadFiles/filehoso/{FileName}";
            try
            {
                var filePath = _host.ContentRootPath + path;
                var bytes = System.IO.File.ReadAllBytes(filePath);

                new FileExtensionContentTypeProvider().TryGetContentType(FileName, out var contentType);

                return File(bytes, contentType ?? "application/octet-stream", FileName);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                //base.Message = "File không tồn tại!";
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }
    }
}
