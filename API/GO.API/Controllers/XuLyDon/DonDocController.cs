using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/donthudondoc")]
    [ApiController]
    public class DonDocController : BaseApiController
    {
        private DonDocBUS DonDocBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        public DonDocController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DonDocController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.DonDocBUS = new DonDocBUS();
            this.host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }



        [HttpGet]
        [Route("DS_DonThuCanDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachDonDoc([FromQuery] dk_dondoc p)
        {
            try
            {
                //var CoQuanID = 220;
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanDangNhapID != null)
                {
                    p.CoQuanDangNhapID = CoQuanID_1;

                }
                
                var Result = DonDocBUS.DanhSachDonDoc(p);
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
        /*[HttpGet]
        [Route("InsertFileDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)] InsertFileDonDoc(FileHoSoInfo info, ref int FileHoSoID)
        public IActionResult InsertFileDonDoc([FromQuery] FileHoSoInfo info, ref int FileHoSoID)
        {
            try
            {
                dk_dondoc p = new dk_dondoc();
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanDangNhapID != null)
                {
                    p.CoQuanDangNhapID = CoQuanID_1;

                }

                var Result = DonDocBUS.InsertFileDonDoc( info, ref FileHoSoID);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }*/

        [HttpGet]
        [Route("DS_DonThuCanDonDoc_NotPaging")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachDonDoc_NotPaging([FromQuery] dk_dondocNotPaing p)
        {
            try
            {
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanDangNhapID != null)
                {
                    p.CoQuanDangNhapID = CoQuanID_1;

                }
                var Result = DonDocBUS.DanhSachDonDoc_NotPaging(p);
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

        // get dataDonDoc
        [HttpGet]
        [Route("GetDataDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetDonDocByXLDID([FromQuery] int? XulyDonID)
        {
            try
            {
                
                var Result = DonDocBUS.GetDonDocByXLDID(XulyDonID);
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

        //CountDanhSachDonThuCanDonDoc
        [HttpGet]
        [Route("CountDanhSachDonThuCanDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult CountDanhSachDonThuCanDonDoc([FromQuery] dk_dondocNotPaing p)
        {
            try
            {
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanDangNhapID != null)
                {
                    p.CoQuanDangNhapID = CoQuanID_1;

                }
                var Result = DonDocBUS.CountDanhSachDonThuCanDonDoc(p);
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
        // insert 
        [HttpPost]
        [Route("UpdateCQNhanVBDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Create)]
        public IActionResult UpdateCQNhanVBDonDoc([FromBody] int XuLyDonID, int CQNhanVanBanDonDoc)
        {
            try
            { 
                var Result = DonDocBUS.UpdateCQNhanVBDonDoc( XuLyDonID, CQNhanVanBanDonDoc);
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
        [Route("UpdateNhanVanBanDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult UpdateNhanVanBanDonDoc([FromQuery] int? XulyDonID)
        {
            try
            {
                var Result = DonDocBUS.UpdateNhanVanBanDonDoc(XulyDonID);
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
        [Route("ExportExcel_DonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Exportexcel()
        {
            try
            {
                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);

                using var worksheet = package.Workbook.Worksheets.Add("Danh sách đơn thư cần đôn đốc");


                //header
                worksheet.Cells["A1:I1"].Merge = true;
                worksheet.Cells["A1:I1"].Style.Font.Bold = true;

                worksheet.Cells["A1"].Value = "DANH SÁCH ĐƠN THƯ CẦN ĐÔN ĐỐC";
                worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                worksheet.Cells["A2:I2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:I2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A2:I2"].Style.Font.Bold = true;

                worksheet.Cells["A2"].Value = "Số đơn";
                worksheet.Cells["B2"].Value = "Nguồn đơn đến";
                worksheet.Cells["C2"].Value = "Tên chủ đơn";
                worksheet.Cells["D2"].Value = "Nội Dung Đơn";
                worksheet.Cells["E2"].Value = "Phân Loại";
                worksheet.Cells["F2"].Value = "Tên Hướng xử lý";
                worksheet.Cells["G2"].Value = "Tên Cơ Quan";
                worksheet.Cells["H2"].Value = "Hạn Xử Lý";
                worksheet.Cells["I2"].Value = "Tên Trạng Thái";
                worksheet.Cells["J2"].Value = "Tên Trạng Thái Đôn Đốc";

                // body              
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);

                dk_dondoc p = new dk_dondoc
                {
                    CanBoID = CanBoID,
                    CoQuanDangNhapID =CoQuanID_1 ,
                    PageSize = 600
                };
                var data = (List<DonThuDonDocInfo>)DonDocBUS.DanhSachDonDoc_NotPaging(p).Data;

                var startcol = 3;
                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startcol}"].Value = d.SoDonThu;
                    worksheet.Cells[$"B{startcol}"].Value = d.NguonDonDen;
                    worksheet.Cells[$"C{startcol}"].Value = d.TenChuDon;
                    worksheet.Cells[$"D{startcol}"].Value = d.NoiDungDon;
                    worksheet.Cells[$"E{startcol}"].Value = d.PhanLoai;
                    worksheet.Cells[$"F{startcol}"].Value = d.TenHuongXuLy;
                    worksheet.Cells[$"G{startcol}"].Value = d.TenCoQuan;
                    worksheet.Cells[$"H{startcol}"].Value = d.HanXuLy;
                    worksheet.Cells[$"I{startcol}"].Value = d.TenTrangThai;
                    worksheet.Cells[$"J{startcol}"].Value = d.TenTrangThaiDonDoc;
                    //worksheet.Cells[$"K{startcol}"].Value = "";

                    startcol += 1;
                }

                // style all sheet
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns(5, 20);
                worksheet.Cells[worksheet.Dimension.Address].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[worksheet.Dimension.Address].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[worksheet.Dimension.Address].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[worksheet.Dimension.Address].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                worksheet.Cells[worksheet.Dimension.Address].Style.WrapText = true;
                worksheet.Cells[worksheet.Dimension.Address].Style.Font.Name = "Times New Roman";
                worksheet.Cells[worksheet.Dimension.Address].Style.Font.Size = 13;
                worksheet.Cells[worksheet.Dimension.Address].Style.VerticalAlignment = ExcelVerticalAlignment.Top;

                worksheet.Cells["A1:M3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1:M3"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                package.Save();
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"don_thu_can_don_doc_{DateTime.Now.Ticks}.xlsx");
            }
            catch (Exception)
            {
                return NotFound();

                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
            }
        }

        // Insert_RaVanBanDonDoc(KetQuaInfo cInfo, ref int DonDocID)
        /*[HttpGet]
        [Route("Insert_RaVanBanDonDoc")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)] InsertFileDonDoc(FileHoSoInfo info, ref int FileHoSoID)
        public IActionResult Insert_RaVanBanDonDoc([FromForm] KetQuaInfo cInfo, ref int DonDocID)
        {
            try
            {
                dk_dondoc p = new dk_dondoc();
                var CoQuanID_1 = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                if (p.CoQuanDangNhapID != null)
                {
                    p.CoQuanDangNhapID = CoQuanID_1;

                }

                var Result = DonDocBUS.Insert_RaVanBanDonDoc( cInfo, ref DonDocID);
                if (Result != null) return Ok(Result);
                else return NotFound();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }*/

        [HttpGet]
        [Route("DS_HuongGiaiQuyet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_HuongGiaiQuyet([FromQuery] ThamSoLocDanhMuc p)
        {
            try
            {
                var Result = DonDocBUS.DS_HuongGiaiQuyet(p);
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
        [HttpPost("DuyetVBDD")]
        [Authorize]
        public IActionResult DuyetVBDD(DTDuyeDonDoc thamSo)
        {

            var Result = new BaseResultModel();

            try
            {
                var user = this.HttpContext.User;


                Result = DonDocBUS.DuyetVBDD(thamSo, new DTDuyetDonDocClaims
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
