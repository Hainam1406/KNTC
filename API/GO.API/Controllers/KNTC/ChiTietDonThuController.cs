using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.KNTC;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace GO.API.Controllers.KNTC
{
    [Route("api/v2/ChiTietDonThu")]
    [ApiController]
    public class ChiTietDonThuController : BaseApiController
    {
        private ChiTietDonThuBUS _ChiTietDonThuBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration _config;
        private IOptions<AppSettings> _AppSettings;
        public ChiTietDonThuController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<ChiTietDonThuController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this._ChiTietDonThuBUS = new ChiTietDonThuBUS();
            this._host = hostingEnvironment;
            this._config = config;
            this._AppSettings = Settings;
        }

        [HttpGet]
        [Route("GetChiTietDonThu")]
        public IActionResult GetChiTietDonThu([FromQuery] int DonThuID, int XuLyDonID)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath; 
                   
                    var Data = _ChiTietDonThuBUS.GetChiTietDonThu(DonThuID, XuLyDonID, CanBoID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
                    base.Message = Data.Message;
                    return base.GetActionResult();
                });
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }

        [HttpGet]
        [Route("TraCuuDonThu")]
        public IActionResult GetBySearch_TraCuu([FromQuery] ThamSoLocDanhMuc p, int LoaiKhieuToID, int coquanID)
        {
            try
            {
                /*return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;*/

                    //var coquanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                    var Data = _ChiTietDonThuBUS.GetBySearch_TraCuu(p, LoaiKhieuToID, coquanID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
                    base.Message = Data.Message;
                    base.TotalRow = Data.TotalRow;
                    return base.GetActionResult();
                /*});*/
            }
            catch (Exception)
            {
                base.Status = -1;
                base.GetActionResult();
                throw;
            }
        }

        [HttpGet]
        [Route("ExportExcel")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Exportexcel()
        {
            try
            {
                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);

                using var worksheet = package.Workbook.Worksheets.Add("Danh sách đơn thư đã tiếp nhận");


                //header
                //worksheet.Cells["A1:I1"].Merge = true;
                //worksheet.Cells["A1:I1"].Style.Font.Bold = true;

                //worksheet.Cells["A1"].Value = "DANH SÁCH ĐƠN THƯ ĐÃ TIẾP NHẬN";
                //worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                //worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                worksheet.Cells["A2:K2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:K2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A2:K2"].Style.Font.Bold = true;

                worksheet.Cells["A2"].Value = "Số đơn";
                worksheet.Cells["B2"].Value = "SL trùng";
                worksheet.Cells["C2"].Value = "Nguồn đơn đến";
                worksheet.Cells["D2"].Value = "Tên chủ đơn";
                worksheet.Cells["E2"].Value = "Nội dung";
                worksheet.Cells["F2"].Value = "Lần khiếu tố";
                worksheet.Cells["G2"].Value = "Loại đơn";
                worksheet.Cells["H2"].Value = "Ngày nhận";
                worksheet.Cells["I2"].Value = "Cơ quan tiếp nhận";
                worksheet.Cells["J2"].Value = "Hướng xử lý";
                worksheet.Cells["K2"].Value = "Hạn GQ";

                // body
                int LoaiKhieuToID = 0;
                var coquanID = 0;
                ThamSoLocDanhMuc thamSo = new ThamSoLocDanhMuc
                {
                    PageSize = 600
                };
                var data = (List<DonThuInfo>)_ChiTietDonThuBUS.GetBySearch_TraCuu(thamSo,LoaiKhieuToID,coquanID).Data;

                var startcol = 3;
                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startcol}"].Value = d.SoDonThu;
                    worksheet.Cells[$"B{startcol}"].Value = d.SoLuong;
                    worksheet.Cells[$"C{startcol}"].Value = d.NguonDonDen;
                    worksheet.Cells[$"D{startcol}"].Value = d.HoTen;
                    worksheet.Cells[$"E{startcol}"].Value = d.NoiDungDon;
                    worksheet.Cells[$"F{startcol}"].Value = d.SoLan;
                    worksheet.Cells[$"G{startcol}"].Value = d.TenLoaiKhieuTo;
                    worksheet.Cells[$"H{startcol}"].Value = d.NgayNhapDon.ToString("MM/dd/yyyy");
                    worksheet.Cells[$"I{startcol}"].Value = d.TenCoQuanTiepNhan;
                    worksheet.Cells[$"J{startcol}"].Value = d.HuongXuLy;
                    worksheet.Cells[$"K{startcol}"].Value = d.HanGiaiQuyetFrist_Str;
                    //worksheet.Cells[$"J{startcol}"].Value = d.TrangThai;
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

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"don_thu_da_tiep_nhan_{DateTime.Now.Ticks}.xlsx");
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
