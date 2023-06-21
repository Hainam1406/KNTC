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
using GroupDocs.Viewer.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Office.Interop.Word;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Spire.Doc;
using System.Drawing;
using System.Security.Claims;

namespace GO.API.Controllers.TiepDan
{
    [Route("api/v2/[controller]")]
    [ApiController]
    public class SoTiepDanController : BaseApiController
    {
        private IWebHostEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;
        private SoTiepDanBUS _soTiepDanBUS;


        public SoTiepDanController(IWebHostEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<SoTiepDanController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
            _soTiepDanBUS = new SoTiepDanBUS();
        }

        [HttpGet]
        [Route("GetAll")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] SoTiepDanParam parms)
        {
            try
            {
               
                var user = this.HttpContext.User;
               

                var Result = _soTiepDanBUS.DanhSach(parms, new SoTiepDanClaims
                {
                    CoQuanID = IdentityHelper.GetCoQuanID(user),
                    CanBoID = IdentityHelper.GetCanBoID(user),
                });

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
        [Route("DS_GapLanhDao")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_GapLanhDao()
        {
            try
            {
                var user = this.HttpContext.User as ClaimsPrincipal;
                
                
                var Result = _soTiepDanBUS.DS_GapLanhDao(new SoTiepDanClaims
                {
                    CoQuanID = IdentityHelper.GetCoQuanID(user),
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
        [Route("DS_DanKhongDen")]
        [Authorize]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_DanKhongDen([FromQuery]TiepCongDan_DanKhongDenParam thamso)
        {
            try
            {

                var user = this.HttpContext.User as ClaimsPrincipal;
                var CoQuanIDClaim = user.FindFirst("CoQuanID");
                int CoQuanID = CoQuanIDClaim != null ? Convert.ToInt32(CoQuanIDClaim.Value) : 0;
                //Console.WriteLine(CoQuanID);

                var Result = _soTiepDanBUS.DS_DanKhongDen(thamso, CoQuanID);
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
        [Route("DS_DanKhongDenExcel")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_DanKhongDenExcel()
        {
            try
            {
                TiepCongDan_DanKhongDenParam thamso = new TiepCongDan_DanKhongDenParam
                {
                    start = 0,
                    end = 100
                };

                var data = (List<TiepCongDan_DanKhongDenInfo>)_soTiepDanBUS.DS_DanKhongDen(thamso, 220).Data;

                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);
                using var worksheet = package.Workbook.Worksheets.Add("Danh sach");

                worksheet.Cells["A1:D1"].Merge = true;
                worksheet.Cells["A1:D1"].Style.Font.Bold = true;

                worksheet.Cells["A1"].Value = "DANH SÁCH ĐƠN THƯ TIẾP NHẬN GIÁN TIẾP";
                worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                worksheet.Cells["A2:D2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:D2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A2:D2"].Style.Font.Bold = true;

                worksheet.Cells["A2"].Value = "ID";
                worksheet.Cells["B2"].Value = "Tên Cán Bộ";
                worksheet.Cells["C2"].Value = "Ngày trực";
                worksheet.Cells["D2"].Value = "Chức Vụ";

                var startcol = 3;
                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startcol}"].Value = d.DanKhongDenID;
                    worksheet.Cells[$"B{startcol}"].Value = d.TenCanBo;
                    worksheet.Cells[$"C{startcol}"].Value = d.NgayTrucStr;
                    worksheet.Cells[$"D{startcol}"].Value = d.ChucVu;
                    startcol += 1;
                }


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

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"DS_Dan_Khong_Den_{DateTime.Now.Ticks}.xlsx");
            }
            catch (Exception)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }
        
        
        [HttpGet]
        [Route("GetTiepDanDanKhongDen")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetTiepDanDanKhongDen([FromQuery]TiepCongDan_DanKhongDenInfo Info)
        {
            try
            {
                var Result = _soTiepDanBUS.GetTiepDanDanKhongDen(Info);
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
        [Route("UpdateDanKhongDen")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult UpdateDanKhongDen([FromBody]TiepCongDan_DanKhongDenInfo Info)
        {
            try
            {
                var Result = _soTiepDanBUS.UpdateDanKhongDen(Info);
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
        [Route("DeleteDanKhongDen")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DeleteDanKhongDen([FromBody]TiepCongDan_DanKhongDenInfo Info)
        {
            try
            {
                var Result = _soTiepDanBUS.DeleteDanKhongDen(Info);
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
        [Route("DS_LoaiKhieuTo")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DS_LoaiKhieuTo()
        {
            try
            {
                var Result = _soTiepDanBUS.DS_LoaiKhieuTo();
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
        public IActionResult Xoa_SoTiepDan(SoTiepDanXoa param)
        {
            try
            {
                var Result = _soTiepDanBUS.Xoa_SoTiepDan(param);
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
        [Route("Exportexcel")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ExportExcel()
        {
            try
            {
                
                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);

                using var worksheet = package.Workbook.Worksheets.Add("Danh sach");
                worksheet.DefaultColWidth = 10;
                worksheet.DefaultRowHeight = 12;


                worksheet.Row(1).Height = 20;
                worksheet.Row(1).Height = 20;

                worksheet.Cells["A1:M1"].Merge = true;

                worksheet.Cells["F2:F3"].Merge = true;
                worksheet.Cells[1, 1].Value = "SỔ TIẾP CÔNG DÂN";
                worksheet.Cells["A1:M3"].Style.Font.Bold = true;



                worksheet.Cells["A2:A3"].Merge = true;
                worksheet.Cells["A2:A3"].Value = "Số Đơn";

                worksheet.Cells["B2:B3"].Merge = true;
                worksheet.Cells["B2:B3"].Value = "Ngày Tiếp";

                worksheet.Cells["C2:C3"].Merge = true;
                worksheet.Cells["C2:C3"].Value = "Họ tên - Địa chỉ - CMND/Hộ chiếu của công dân";

                worksheet.Cells["D2:D3"].Merge = true;
                worksheet.Cells["D2:D3"].Value = "Nội dung vụ việc";

                worksheet.Cells["E2:E3"].Merge = true;
                worksheet.Cells["E2:E3"].Value = "Phân loại đơn / Số người";

                worksheet.Cells["F2:F3"].Merge = true;
                worksheet.Cells["F2:F3"].Value = "Cơ quan đã GQ";

                worksheet.Cells["G2:I2"].Merge = true;
                worksheet.Cells["G2"].Value = "Hướng xử lý";
                worksheet.Column(7).Width = 5;
                worksheet.Column(8).Width = 5;
                worksheet.Column(9).Width = 5;
                worksheet.Cells["G3"].Value = "Thụ lý để giải quyết";
                worksheet.Cells["G3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["H3"].Value = "Trả lại đơn và hướng dẫn";
                worksheet.Cells["H3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["I3"].Value = "Chuyển đơn đến cơ quan, tổ chức đơn vị có thẩm quyền";
                worksheet.Cells["I3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                worksheet.Cells["J2:J3"].Merge = true;
                worksheet.Cells["J2:J3"].Value = "Theo dõi kết quả giải quyết";

                worksheet.Cells["K2:K3"].Merge = true;
                worksheet.Cells["K2:K3"].Value = "Ghi chú";

                worksheet.Cells["L2:L3"].Merge = true;
                worksheet.Cells["L2:L3"].Value = "Lãnh đạo tiếp";

                worksheet.Cells["M2:M3"].Merge = true;
                worksheet.Cells["M2:M3"].Value = "Kết quả";

                //var cells = worksheet.Cells["A1:J1"];

                var Result = _soTiepDanBUS.GetAll();

                int startRow = 4;

                var data = (IList<SoTiepDanMOD>)Result.Data;

                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startRow}"].Value = d.TiepDanKhongDonID;
                    worksheet.Cells[$"B{startRow}"].Value = d.NgayTiep?.ToString("MM/dd/yyyy") ?? null;
                    worksheet.Cells[$"C{startRow}"].Value = d.HoTen;
                    worksheet.Cells[$"D{startRow}"].Value = d.NoiDungDon;
                    worksheet.Cells[$"E{startRow}"].Value = $"{d.TenLoaiKhieuTo}/{d.SoLuong}";
                    worksheet.Cells[$"F{startRow}"].Value = d.CQDaGiaiQuyetID;

                    worksheet.Cells[$"G{startRow}"].Value = d.HuongGiaiQuyetID == 31 ? "X" : "";
                    worksheet.Cells[$"H{startRow}"].Value = d.HuongGiaiQuyetID == 32 ? "X" : "";
                    worksheet.Cells[$"I{startRow}"].Value = (d.HuongGiaiQuyetID == 33 || d.HuongGiaiQuyetID == 30) ? "X" : "";

                    worksheet.Cells[$"L{startRow}"].Value = d.TenLanhDaoTiep;
                    worksheet.Cells[$"M{startRow}"].Value = d.TenHuongGiaiQuyet;
                    startRow += 1;
                }


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

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"tiep_dan - {DateTime.Now.Ticks}.xlsx");
            }
            catch (Exception)
            {
                //base.Status = -1;
                //base.Message = ConstantLogMessage.API_Error_System;
                //return base.GetActionResult();
                //throw;
                return NotFound();
            }
        }
    }
}
