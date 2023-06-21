﻿using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.RegularExpressions;
using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.DAL;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Spire.Doc;
using Spire.Pdf;

namespace Com.Gosol.KNTC.API.Controllers.DanhMuc
{
    [Route("api/v2/DanhMucBieuMau")]
    [ApiController]
    public class DanhMucBieuMauController : BaseApiController
    {
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment host;
        private IConfiguration _config;
        private IOptions<AppSettings> _appSettings;
        private DanhMucBieuMauBUS _danhMucBieuMauBUS;
        private readonly IWebHostEnvironment _env;

        public DanhMucBieuMauController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment,
            IConfiguration config, ILogHelper _LogHelper, ILogger<DanhMucDanTocController> logger,
            IOptions<AppSettings> Settings, IWebHostEnvironment env) : base(_LogHelper, logger)
        {
            this.host = hostingEnvironment;
            this._config = config;
            this._appSettings = Settings;
            _danhMucBieuMauBUS = new DanhMucBieuMauBUS();
            _env = env;
        }

        [HttpGet]
        [Route("DanhSachBieuMau")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSach([FromQuery] DanhMucBieuMauThamSo thamSo)
        {
            try
            {
                var root = this.HttpContext.Request.Scheme + "://" + this.HttpContext.Request.Host.Value + "/api/v2/DanhMucBieuMau";
                var Result = _danhMucBieuMauBUS.DanhSach(thamSo, root);
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
        [Route("ExportExcel")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult ExportExcel()
        {
            try
            {
                DanhMucBieuMauThamSo thamSo = new DanhMucBieuMauThamSo
                {
                    PageSize = 100
                };
                var root = this.HttpContext.Request.Scheme + "://" + this.HttpContext.Request.Host.Value + "/api/v2/DanhMucBieuMau";
                var data = (List<DanhMucBieuMauModel>)_danhMucBieuMauBUS.DanhSach(thamSo, root).Data;

                var stream = new MemoryStream();
                using var package = new ExcelPackage(stream);

                using var worksheet = package.Workbook.Worksheets.Add("Danh sach");

                worksheet.Cells["A1:E1"].Merge = true;
                worksheet.Cells[1, 1].Value = "Danh sách biểu mẫu";
                worksheet.Cells["A1:E2"].Style.Font.Bold = true;
                worksheet.Cells["A1:E2"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                worksheet.Cells["A1:E2"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                worksheet.Cells["A2"].Value = "Biểu Mẫu ID";
                worksheet.Cells["B2"].Value = "Tên Biểu Mẫu";
                worksheet.Cells["C2"].Value = "Mã Phiếu In";
                worksheet.Cells["D2"].Value = "Được Sử Dụng";
                worksheet.Cells["E2"].Value = "Tên Cấp";

                int start = 3;
                foreach (var bm in data)
                {
                    worksheet.Cells[$"A{start}"].Value = bm.BieuMauID;
                    worksheet.Cells[$"B{start}"].Value = bm.TenBieuMau;
                    worksheet.Cells[$"C{start}"].Value = bm.MaPhieuIn;
                    worksheet.Cells[$"D{start}"].Value = bm.DuocSuDung == true ? "X" : "";
                    worksheet.Cells[$"E{start}"].Value = bm.TenCap;
                    start += 1;
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
                worksheet.Cells[worksheet.Dimension.Address].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                /*worksheet.Cells["A1:M3"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells["A1:M3"].Style.VerticalAlignment = ExcelVerticalAlignment.Center;*/

                package.Save();
                stream.Position = 0;

                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"danh_sach_bieu_mau_{DateTime.Now.Ticks}.xlsx");
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("DanhSachCap")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DanhSachCap()
        {
            try
            {
                var Result = _danhMucBieuMauBUS.DanhSachCap();
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
        [Route("BieuMauChiTiet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult BieuMauChiTiet(int BieuMauID)
        {
            try
            {
                var Result = _danhMucBieuMauBUS.ChiTiet(BieuMauID);
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
        [Route("LichSuChiTiet")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult LichSuChiTiet(int BieuMauID)
        {
            try
            {
                var Result = _danhMucBieuMauBUS.LichSuChiTiet(BieuMauID);
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
        [Route("d")]
        //[CustomAuthAttribute(ChucNangEnum.GoManager, AccessLevel.Read)]
        public IActionResult DowloadBieuMau([Required] string f)
        {
            string path = $"/UploadFiles/FileBieuMau/{f}";
            try
            {
                var filePath = host.ContentRootPath + path;
                var bytes = System.IO.File.ReadAllBytes(filePath);

                new FileExtensionContentTypeProvider().TryGetContentType(f, out var contentType);

                return File(bytes, contentType ?? "application/octet-stream", f);
            }
            catch (Exception)
            {

                return NotFound();
            }
        }


        [HttpPost]
        [Route("SuaBieuMau")]
        public async Task<IActionResult> SuaBieuMau(IFormFile? upload, [FromForm] string bieuMauStr)
        {
            try
            {
                var bieuMau = JsonConvert.DeserializeObject<SuaBieuMauModel>(bieuMauStr);
                if (bieuMau == null)
                    return BadRequest("Empty params");

                BaseResultModel result;

                result = _danhMucBieuMauBUS.VaidateSua(bieuMau);

                if (result.Status != 1)
                {
                    return Ok(result);
                }

                if (upload != null)
                {
                    result = _danhMucBieuMauBUS.VaidateFile(upload);

                    if (result.Status != 1)
                    {
                        return Ok(result);
                    }
                    
                    FileDinhKemModel FileDinhKem = new FileDinhKemModel
                    {
                        FileType = 18,
                        NguoiCapNhat = bieuMau.CanBoID
                    };
                    var clsCommon = new Commons();
                    var file = await clsCommon.InsertFileAsync(upload, FileDinhKem, host);

                    var model = (DanhMucBieuMauChiTietModel)_danhMucBieuMauBUS.ChiTiet(bieuMau.BieuMauID).Data;
                    if (model.FileUrl != null && model.FileUrl != "")
                    {
                        var path = host.ContentRootPath + "\\UploadFiles\\FileBieuMau\\" + model.FileUrl;
                        System.IO.File.Delete(path);
                    }
                    bieuMau.FileUrl = file.TenFile;
                }

                result = _danhMucBieuMauBUS.SuaBieuMau(bieuMau);
                return Ok(result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("XoaBieuMau")]
        public IActionResult XoaBieuMau(XoaBieuMau bieuMau)
        {
            try
            {
                var result = _danhMucBieuMauBUS.XoaBieuMau(bieuMau.BieuMauID, host.ContentRootPath);

                return Ok(result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("Preview")]
        public IActionResult Preview(string f)
        {
            try
            {
                string path = _env.ContentRootPath + "\\UploadFiles\\FileBieuMau\\";
                string filePath = _env.ContentRootPath + "\\UploadFiles\\FileBieuMau\\" + f;
                using var stream = new MemoryStream();
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound();
                }

                using Document document = new Document();
                document.LoadFromFile(filePath);
                //document.SaveToFile(_env.ContentRootPath + "\\UploadFiles\\FileBieuMau\\output.pdf", Spire.Doc.FileFormat.PDF);
                document.SaveToStream(stream, Spire.Doc.FileFormat.PDF);
                stream.Flush();
                stream.Position = 0;
                byte[] byteArray = stream.ToArray();

                    //System.IO.File.ReadAllBytes(_env.ContentRootPath + "\\UploadFiles\\FileBieuMau\\output.pdf");

                return new FileContentResult(byteArray, "application/pdf");
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }

        [HttpPost]
        [Route("ThemBieuMau")]
        public async Task<IActionResult> ThemBieuMau(IFormFile upload, [FromForm] string bieuMauStr)
        {
            try
            {
                var bieuMau = JsonConvert.DeserializeObject<ThemBieuMauModel>(bieuMauStr);
                if (bieuMau == null)
                    return BadRequest("Empty params");

                BaseResultModel result;
                //Kiem tra file
                result = _danhMucBieuMauBUS.VaidateFile(upload);
                if (result.Status != 1)
                {
                    return Ok(result);
                }

                result = _danhMucBieuMauBUS.VaidateThemMoi(bieuMau);
                if (result.Status != 1)
                {
                    return Ok(result);
                }

                FileDinhKemModel FileDinhKem = new FileDinhKemModel
                {
                    FileType = 18,
                    NguoiCapNhat = 20
                };
                var clsCommon = new Commons();
                var file = await clsCommon.InsertFileAsync(upload, FileDinhKem, host);

                bieuMau.FileUrl = file.TenFile;
                result = _danhMucBieuMauBUS.ThemBieuMau(bieuMau);
                return Ok(result);
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }
    }
}