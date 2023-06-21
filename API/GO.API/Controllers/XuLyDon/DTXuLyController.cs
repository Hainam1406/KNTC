using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.TiepDan;
using Com.Gosol.KNTC.BUS.XuLyDon;
using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using GO.API.Controllers.TiepDan;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OfficeOpenXml.Style;

using OfficeOpenXml;

namespace GO.API.Controllers.XuLyDon
{
    [Route("api/v2/XuLyDon")]
    [ApiController]
    public class DTXuLyController : BaseApiController
    {
        private DTXuLyBUS DTXuLyBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;

        public DTXuLyController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DTXuLyController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.DTXuLyBUS = new DTXuLyBUS();
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }


        [HttpGet]
        [Route("DonThuDaTiepNhan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DTDaTiepNhan([FromQuery] DTXuLyParam p)
        {
            try
            {
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);

                if (p.CanBoID != null)
                {
                    p.CanBoID = CanBoID;
                }
                if (p.CoQuanID != null)
                {
                    p.CoQuanID = CoQuanID;
                }
                var Result = DTXuLyBUS.GetDTDaTiepNhan(p, SuDungQuyTrinh);
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
        [Route("DonThuCanXuLy")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult GetDTCanXuLy([FromQuery] DTXuLyParam info)//, [FromQuery]  List<int> docList)
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
                var Result = DTXuLyBUS.GetDTCanXuLy(info);//, docList);
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
                worksheet.Cells["A1:I1"].Merge = true;
                worksheet.Cells["A1:I1"].Style.Font.Bold = true;

                worksheet.Cells["A1"].Value = "DANH SÁCH ĐƠN THƯ ĐÃ TIẾP NHẬN";
                worksheet.Cells["A1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                worksheet.Cells["A2:I2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A2:I2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A2:I2"].Style.Font.Bold = true;

                worksheet.Cells["A2"].Value = "Số đơn";
                worksheet.Cells["B2"].Value = "Nguồn đơn đến";
                worksheet.Cells["C2"].Value = "Tên chủ đơn";
                worksheet.Cells["D2"].Value = "Địa chỉ chủ đơn";
                worksheet.Cells["E2"].Value = "Nội dung vụ việc";
                worksheet.Cells["F2"].Value = "Loại khiếu tố";
                worksheet.Cells["G2"].Value = "Ngày tiếp nhận";
                worksheet.Cells["H2"].Value = "Tình trạng";
                worksheet.Cells["I2"].Value = "Kết quả";

                // body
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);

                DTXuLyParam thamSo = new DTXuLyParam
                {
                    CanBoID = CanBoID,
                    CoQuanID = CoQuanID,
                    PageSize = 600
                };
                var data = (List<DTXulyMOD>)DTXuLyBUS.GetDTDaTiepNhan(thamSo, SuDungQuyTrinh).Data;

                var startcol = 3;
                foreach (var d in data)
                {
                    worksheet.Cells[$"A{startcol}"].Value = d.SoDonThu;
                    worksheet.Cells[$"B{startcol}"].Value = d.NguonDonDen;
                    worksheet.Cells[$"C{startcol}"].Value = d.TenChuDon;
                    worksheet.Cells[$"D{startcol}"].Value = d.DiaChiCT;
                    worksheet.Cells[$"E{startcol}"].Value = d.NoiDungDon;
                    worksheet.Cells[$"F{startcol}"].Value = d.TenLoaiKhieuTo;
                    worksheet.Cells[$"G{startcol}"].Value = d.NgayNhapDon.ToString("MM/dd/yyyy");
                    worksheet.Cells[$"H{startcol}"].Value = d.StateName;
                    worksheet.Cells[$"I{startcol}"].Value = d.HuongXuLy;
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

        [HttpPost]
        [Route("XoaDTTiepNhan")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult XoaDonThu([FromBody] ParamXoa p)
        {
            try
            {
                var Result = DTXuLyBUS.XoaDonThu(p);
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
        [Route("TrinhLD")]
        public IActionResult TrinhLD([FromBody] DTXyLyID dT)
        {
            try
            {
                var CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CanBoID")).Value, 0);
                var CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("CoQuanID")).Value, 0);
                var SuDungQuyTrinh = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("SuDungQuyTrinh")).Value, false);
                var QTVanThuTiepDan = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("QTVanThuTiepDan")).Value, false);
                var QTVanThuTiepNhanDon = Utils.ConvertToBoolean(User.Claims.FirstOrDefault(x => x.Type == ("QTVanThuTiepNhanDon")).Value, false);
                var QuyTrinhGianTiep = Utils.ConvertToInt32(User.Claims.FirstOrDefault(x => x.Type == ("QuyTrinhGianTiep")).Value, 0);
                DTXuLyClaims dTXuLyClaims = new DTXuLyClaims()
                {
                    QTVanThuTiepDan = QTVanThuTiepDan,
                    SuDungQuyTrinh = SuDungQuyTrinh,
                    QTVanThuTiepNhanDon = QTVanThuTiepNhanDon,
                    QuyTrinhGianTiep = QuyTrinhGianTiep,
                    CanBoID = CanBoID,
                    CoQuanID = CoQuanID
                };
                var Result = DTXuLyBUS.TrinhLD(dT, dTXuLyClaims);
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
        [Route("HuongXuLy")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult Update_HuongXuLy([FromBody] DTXuLyInfo p)
        {
            try
            {
                var Result = DTXuLyBUS.Update_HuongXuLy(p);
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

    }
}
