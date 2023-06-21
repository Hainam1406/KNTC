using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.BUS.TiepDan;
using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Office.Interop.Word;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;

namespace GO.API.Controllers.TiepDan
{
    [Route("api/v2/TiepDan")]
    [ApiController]
    public class TiepDanTrucTiepController : BaseApiController
    {
        private TiepDanTrucTiepBUS tiepDanTrucTiepBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;

        public TiepDanTrucTiepController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<TiepDanTrucTiepController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.tiepDanTrucTiepBUS = new TiepDanTrucTiepBUS();
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }

        [HttpPost]
        [Route("InsertTiepDan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)] InsertDoiTuongKN(DoiTuongKNMOD item)
        public IActionResult ThemMoiTiepDan([FromBody] TiepDanTrucTiepMOD item)
        {
            try

            {
               /* int i = 0;
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("NguoiDungID")).Value, 0);
                
                item.XuLyDon[i].CoQuanID = CoQuanID;
                item.XuLyDon[i].CanBoTiepNhapID = CanBoID;*/
                if (item == null) return BadRequest();
                var Result = tiepDanTrucTiepBUS.ThemMoiTiepDan(item);
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
        [Route("ThemMoiTiepDan")]
        public async Task<IActionResult> ThemFileHoSo(IList<IFormFile> files, [FromForm] string TiepDanStr)
        {
            try
            {

                var TiepDan = JsonConvert.DeserializeObject<TiepDanTrucTiepMOD>(TiepDanStr);
                var clsComon = new Commons();

                //var NguoiDungID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("NguoiDungID")).Value, 0);
                if (TiepDan == null) return BadRequest();
                var Result = tiepDanTrucTiepBUS.ThemMoiTiepDan(TiepDan);
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
                            TomTat = TiepDan.themMoiFile[i].TomTat,
                            DonThuID = TiepDan.themMoiFile[i].DonThuID,
                            XuLyDonID = TiepDan.themMoiFile[i].XuLyDonID,
                            FileID = (int)TiepDan.themMoiFile[i].FileID
                            //NghiepVuID = NghiepVuID
                        };
                        string TenFileGoc = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');
                        foreach (var info in TiepDan.themMoiFile)
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
        //  CapNhatTiepDan
        [HttpPost]
        [Route("CapNhatTiepDan")]
        public IActionResult CapNhatTiepDan([FromBody] TiepDanTrucTiepMOD item)
        {
            try

            {
                if (item == null) return BadRequest();
                var Result = tiepDanTrucTiepBUS.CapNhatTiepDan(item);
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

        // get so don thu
        [HttpGet]
        [Route("Get_SoDonThu")]
        public IActionResult GetSoDonThu()
        {
            try
            {
                var coQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var MaCQ = Utils.ConvertToString(User.Claims.FirstOrDefault(x => x.Type == ("MaCQ")).Value, string.Empty);
                var soDonThu = tiepDanTrucTiepBUS.GetSoDonThu(coQuanID);
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
        // stt 
        [HttpGet]
        [Route("STT_DonThu")]
        public IActionResult STT([FromQuery] int CoQuanID)
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.STT(CoQuanID);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("DanhSachLoaiDoiTuongKN")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachLoaiDoiTuongKN()
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.DanhSachLoaiDoiTuongKN();
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }
        // danh sách loại đối tượng bị KN 
        [HttpGet]
        [Route("DanhSachLoaiDoiTuongBiKN")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachLoaiDoiTuongBiKN()
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.DanhSachLoaiDoiTuongBiKN();
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }
        //dem so don trung 
        [HttpGet]
        [Route("TongSoTrungDon")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DemSoDonTrung([FromQuery] DemDonTrung p)
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.DemSoDonTrung(p);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        // check trung don 
        [HttpGet]
        [Route("CheckTrungDon")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult CheckTrung([FromQuery] CheckTrungDonHoTen p)
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.CheckTrung(p,TotalRow);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        // check khieu to lan 2 
        [HttpGet]
        [Route("CheckKieuToLan2")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult CheckKieuToLan2([FromQuery] CheckKhieuToLan2  p)
        {
            try
            {
                var Result = tiepDanTrucTiepBUS.CheckhieuToLan2(p);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception )
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        // them dan khong den 
        [HttpPost]
        [Route("TiepDan_DanKhongDen")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult TiepDan_DanKhongDen([FromBody] Insert_TiepDan_DanKhongDenMOD item)
        {
            try

            {
                if (item == null) return BadRequest();
                var Result = tiepDanTrucTiepBUS.Insert_TiepDan_DanKhongDen(item);
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


        // KhieuToLan2ByDonID
        [HttpGet]
        [Route("KhieuToLan2ByDonID")]
        public IActionResult KhieuToLan2ByDonID(int donthuID)
        {
            try
            {              
                var Result = tiepDanTrucTiepBUS.KhieuToLan2ByDonID(donthuID);
                if (Result is null) return NotFound();
                else return Ok(Result);
            }
            catch (Exception )
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
                var Result = tiepDanTrucTiepBUS.CountSoLanGQ(donthuID, stateID);
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
        // thêm file
        [HttpPost]
        [Route("Insert_File")]
        public async Task<IActionResult> InsertFile(List<IFormFile> files)
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

    }
}
