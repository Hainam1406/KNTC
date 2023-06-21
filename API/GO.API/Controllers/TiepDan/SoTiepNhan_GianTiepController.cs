using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.BUS.TiepDan;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Security.Claims;
using System.Text;

namespace GO.API.Controllers.TiepDan
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class SoTiepNhan_GianTiepController : BaseApiController
    {
        private IWebHostEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        private SoTiepNhan_GianTiepBUS _soTiepNhan_GianTiepBUS;

        public SoTiepNhan_GianTiepController(IWebHostEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<TiepDanTrucTiepController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
            _soTiepNhan_GianTiepBUS = new();
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] SoTiepNhanParams thamSo)
        {

            try
            {
                var user = this.HttpContext.User;
                var CoQuanIDClaim = user.FindFirst("CoQuanID");
                var SuDungQuyTrinhClaim = user.FindFirst("SuDungQuyTrinh");


                int CoQuanID = CoQuanIDClaim != null ? Convert.ToInt32(CoQuanIDClaim.Value) : -1;
                bool SuDungQuyTrinh = SuDungQuyTrinhClaim != null ? Convert.ToBoolean(SuDungQuyTrinhClaim.Value) : false;

                
                var Result = _soTiepNhan_GianTiepBUS.DanhSach(thamSo, new SoTiepNhanClaims
                {
                    CoQuanID = CoQuanID,
                    SuDungQuyTrinh = SuDungQuyTrinh
                });
                return Ok(Result);
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("DS_CoQuan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_CoQuan()
        {

            try
            {
                var Result = _soTiepNhan_GianTiepBUS.DS_CoQuan();
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
        [Route("Delete")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Delete_DonThuDaTiepNhan([FromBody] SoTiepNhan_GianTiepMOD thamSo)
        {

            try
            {
                var Result = _soTiepNhan_GianTiepBUS.Delete_DonThuDaTiepNhan(thamSo);
                return Ok(Result);
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }


        [HttpGet]
        [Route("GetFile")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetFile(int id)
        {
            try
            {
                using var ms = new MemoryStream();

                using Spire.Doc.Document doc = new Spire.Doc.Document();

                var section = doc.AddSection();

                section.PageSetup.Margins.All = 40f;

                var titleParagraph = section.AddParagraph();
                switch (id)
                {
                    case 1:
                        titleParagraph.AppendText("Phiếu đề xuất thụ lý đơn");
                        break;
                    case 2:
                        titleParagraph.AppendText("Thông báo về việc khiếu nại không đủ điều kiện thụ lý giải quyết");
                        break;
                    case 3:
                        titleParagraph.AppendText("Đơn không thuộc thẩm quyền sử lý");
                        break;
                    case 4:
                        titleParagraph.AppendText("Phiếu trả đơn không đủ thẩm quyền");
                        break;
                    case 5:
                        titleParagraph.AppendText("Phiếu chuyển đơn tố cáo");
                        break;
                    case 6:
                        titleParagraph.AppendText("Phiếu chuyển đơn");
                        break;
                    case 7:
                        titleParagraph.AppendText("Phiếu hướng dẫn đơn có nhiều nội dung khác nhau thuộc nhiều cơ quan có thẩm quyền giải quyết");
                        break;
                    default:
                        titleParagraph.AppendText("PHIẾU ĐỀ XUẤT THỤ LÝ ĐƠN KHIẾU NẠI");
                        break;
                }


                doc.SaveToStream(ms, Spire.Doc.FileFormat.Docx2013);
                ms.Position = 0;

                return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Mau_Phieu_In.docx");
            }
            catch (Exception)
            {
                throw;
                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("FileView")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult FileView(int id)
        {
            try
            {
                using var ms = new MemoryStream();

                using Spire.Doc.Document doc = new Spire.Doc.Document();

                var section = doc.AddSection();

                section.PageSetup.Margins.All = 40f;

                var titleParagraph = section.AddParagraph();
                titleParagraph.Format.HorizontalAlignment = Spire.Doc.Documents.HorizontalAlignment.Center;

                Spire.Doc.Fields.TextRange text;

                switch (id)
                {
                    case 1:
                        text = titleParagraph.AppendText("Phiếu đề xuất thụ lý đơn");
                        break;
                    case 2:
                        text = titleParagraph.AppendText("Thông báo về việc khiếu nại không đủ điều kiện thụ lý giải quyết");
                        break;
                    case 3:
                        text = titleParagraph.AppendText("Đơn không thuộc thẩm quyền sử lý");
                        break;
                    case 4:
                        titleParagraph.AppendText("Phiếu trả đơn không đủ thẩm quyền");
                        break;
                    case 5:
                        text = titleParagraph.AppendText("Phiếu chuyển đơn tố cáo");
                        break;
                    case 6:
                        text = titleParagraph.AppendText("Phiếu chuyển đơn");
                        break;
                    case 7:
                        text = titleParagraph.AppendText("Phiếu hướng dẫn đơn có nhiều nội dung khác nhau thuộc nhiều cơ quan có thẩm quyền giải quyết");
                        break;
                    default:
                        text = titleParagraph.AppendText("Trống");
                        break;
                }

                //if (text != null)
                //{

                //}




                //text?.CharacterFormat.AllCaps = true;

                doc.SaveToStream(ms, Spire.Doc.FileFormat.PDF);
                ms.Flush();
                ms.Position = 0;

                return File(ms.ToArray(), "application/pdf");

            }
            catch (Exception)
            {
                return NotFound();
                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("FileView_V2")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult FileViewV2(int id)
        {
            try
            {
                using var ms = new MemoryStream();

                using Spire.Doc.Document doc = new Spire.Doc.Document();

                //var section = doc.AddSection();

                var filePath = _host.ContentRootPath + "/Upload/MauPhieu_1.docx";

                doc.LoadFromFile(filePath);


                switch (id)
                {
                    case 1:
                        doc.Replace("ten_mau_phieu", "PHIẾU ĐỀ XUẤT THỤ LÝ ĐƠN", false, true);
                        break;
                    case 2:
                        doc.Replace("ten_mau_phieu", "THÔNG BÁO VỀ VIỆC KHIẾU NẠI KHÔNG ĐỦ ĐIỀU KIỆN THỤ LÝ GIẢI QUYẾT", false, true);

                        break;
                    case 3:
                        doc.Replace("ten_mau_phieu", "Đơn không thuộc thẩm quyền sử lý", false, true);

                        break;
                    case 4:
                        doc.Replace("ten_mau_phieu", "Phiếu trả đơn không đủ thẩm quyền", false, true);

                        break;
                    case 5:
                        doc.Replace("ten_mau_phieu", "Phiếu chuyển đơn tố cáo", false, true);

                        break;
                    case 6:
                        doc.Replace("ten_mau_phieu", "Phiếu chuyển đơn", false, true);
                        break;
                    case 7:
                        doc.Replace("ten_mau_phieu", "Phiếu hướng dẫn đơn có nhiều nội dung khác nhau thuộc nhiều cơ quan có thẩm quyền giải quyết", false, true);

                        break;
                    default:
                        doc.Replace("ten_mau_phieu", "PHIẾU ĐỀ XUẤT THỤ LÝ ĐƠN KHIẾU NẠI", false, true);
                        break;
                }

                doc.SaveToStream(ms, Spire.Doc.FileFormat.PDF);
                var bytes = ms.ToArray();
                ms.Flush();

                return File(bytes, "application/pdf");

            }
            catch (Exception)
            {
                return NotFound();
                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("UpLoadFileMau")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult UpLoadFile(IFormFile source)
        {
            var folderPath = _host.ContentRootPath + "/Upload";

            if (Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            try
            {
                using BinaryReader binaryFile = new BinaryReader(source.OpenReadStream());
                byte[] byteArrFile = binaryFile.ReadBytes((int)source.OpenReadStream().Length);
                var filePath = folderPath + "/MauPhieu_1.docx";

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                using (FileStream output = System.IO.File.Create(filePath))
                {
                    output.Write(byteArrFile);
                }


                return Ok("Thanh Cong");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        [Route("Exportexcel")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Exportexcel()
        {
            var user = this.HttpContext.User;
            var CoQuanIDClaim = user.FindFirst("CoQuanID");
            var SuDungQuyTrinhClaim = user.FindFirst("SuDungQuyTrinh");

            int CoQuanID = CoQuanIDClaim != null ? Convert.ToInt32(CoQuanIDClaim.Value) : -1;
            bool SuDungQuyTrinh = SuDungQuyTrinhClaim != null ? Convert.ToBoolean(SuDungQuyTrinhClaim.Value) : false;

            try
            {
                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);

                using var worksheet = package.Workbook.Worksheets.Add("Danh sach");


                //header
                worksheet.Cells["A1:K1"].Merge = true;
                worksheet.Cells["A1:K1"].Style.Font.Bold = true;

                worksheet.Cells["A1"].Value = "DANH SÁCH ĐƠN THƯ TIẾP NHẬN GIÁN TIẾP";
                worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                worksheet.Cells["A2:K2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:K2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A2:K2"].Style.Font.Bold = true;

                worksheet.Cells["A2"].Value = "Số đơn";
                worksheet.Cells["B2"].Value = "Nguồn đơn đến";
                worksheet.Cells["C2"].Value = "CQ chuyển đến";
                worksheet.Cells["D2"].Value = "Số CV";
                worksheet.Cells["E2"].Value = "Tên chủ đơn";
                worksheet.Cells["F2"].Value = "Địa chỉ chủ đơn";
                worksheet.Cells["G2"].Value = "Nội dung vụ việc";
                worksheet.Cells["H2"].Value = "Loại đơn";
                worksheet.Cells["I2"].Value = "Ngày tiếp nhận";
                worksheet.Cells["J2"].Value = "Tình trạng";
                worksheet.Cells["K2"].Value = "Kết quả";

                SoTiepNhanParams thamSo = new SoTiepNhanParams
                {
                    PageSize = 600
                };
                var data = (List<SoTiepNhan_GianTiepMOD>)_soTiepNhan_GianTiepBUS.DanhSach(thamSo, new SoTiepNhanClaims
                {
                    CoQuanID = 220,
                    SuDungQuyTrinh = SuDungQuyTrinh
                }).Data;

                var startcol = 3;
                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startcol}"].Value = d.SoDonThu;
                    worksheet.Cells[$"B{startcol}"].Value = d.NguonDonDen;
                    worksheet.Cells[$"C{startcol}"].Value = d.TenCQChuyenDonDen;
                    worksheet.Cells[$"D{startcol}"].Value = d.SoCongVan;
                    worksheet.Cells[$"E{startcol}"].Value = d.HoTen;
                    worksheet.Cells[$"F{startcol}"].Value = d.DiaChiCT;
                    worksheet.Cells[$"G{startcol}"].Value = d.NoiDungDon;
                    worksheet.Cells[$"H{startcol}"].Value = d.TenLoaiKhieuTo;
                    worksheet.Cells[$"I{startcol}"].Value = d.NgayNhapDon?.ToString("MM/dd/yyyy");
                    worksheet.Cells[$"J{startcol}"].Value = d.TrangThai;
                    worksheet.Cells[$"K{startcol}"].Value = "";

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

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"so_da_tiep_nhan_{DateTime.Now.Ticks}.xlsx");
            }
            catch (Exception)
            {
                return NotFound();

                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
            }
        }
    }
}
