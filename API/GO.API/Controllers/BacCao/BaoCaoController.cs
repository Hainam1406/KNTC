using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers.DanhMuc;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.BaoCao;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace GO.API.Controllers.BacCao
{
    [Route("api/v2/BaoCao")]
    [ApiController]
    public class BaoCaoController : BaseApiController
    {
        private BaoCaoBUS _BaoCaoBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration _config;
        private IOptions<AppSettings> _AppSettings;
        public BaoCaoController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<BaoCaoController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this._BaoCaoBUS = new BaoCaoBUS();
            this._host = hostingEnvironment;
            this._config = config;
            this._AppSettings = Settings;
        }

        [HttpGet]
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("TCD01")]
        public IActionResult TongHopKetQuaTiepCongDanThuongXuyenDinhKyVaDotXuat([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.TCD01(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
                    base.Message = Data.Message;
                    return base.GetActionResult();
                });
            }
            catch (Exception ex)
            {
                base.Status = -1;
                //base.GetActionResult();
                //throw;
                base.Message = ex.Message;
                return base.GetActionResult();
            }
        }

        [HttpGet]
        [Route("TCD01_GetDSChiTietDonThu")]
        public IActionResult TCD01_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.TCD01_GetDSChiTietDonThu(ContentRootPath, p);
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

        //[HttpGet]
        ////[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        //[Route("TTR01")]
        //public IActionResult TongHopKetQuaThanhTraHanhChinh([FromQuery] BaseReportParams p)
        //{
        //    try
        //    {
        //        return CreateActionResult(false, "", EnumLogType.GetList, () =>
        //        {
        //            var Data = _BaoCaoBUS.TTR01(p);
        //            base.Status = Data.Status;
        //            base.Data = Data.Data;
        //            return base.GetActionResult();
        //        });
        //    }
        //    catch (Exception)
        //    {
        //        base.Status = -1;
        //        base.GetActionResult();
        //        throw;
        //    }
        //}

        [HttpGet]
        [Route("GetListCap")]
        public IActionResult GetListCap()
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    List<CapInfo> listCap = new List<CapInfo>();
                    CapInfo capTinh = new CapInfo();
                    capTinh.CapID = 4;
                    capTinh.TenCap = "UBND Cấp Tỉnh";
                    listCap.Add(capTinh);

                    CapInfo capSo = new CapInfo();
                    capSo.CapID = 1;
                    capSo.TenCap = "Cấp Sở, Ngành";
                    listCap.Add(capSo);

                    CapInfo capHuyen = new CapInfo();
                    capHuyen.CapID = 2;
                    capHuyen.TenCap = "UBND Cấp Huyện";
                    listCap.Add(capHuyen);

                    CapInfo capXa = new CapInfo();
                    capXa.CapID = 3;
                    capXa.TenCap = "UBND Cấp Xã";
                    listCap.Add(capXa);

                    base.Status = 1;
                    base.Data = listCap;
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("TCD02")]
        public IActionResult TongHopKetQuaPhanLoaiXuLyDonQuaTiepCongDan([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.TCD02(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("TCD02_GetDSChiTietDonThu")]
        public IActionResult TCD02_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.TCD02_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("XLD01")]
        public IActionResult TongHopKetQuaXuLyDon([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.XLD01(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("XLD01_GetDSChiTietDonThu")]
        public IActionResult XLD01_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.XLD01_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("XLD02")]
        public IActionResult TongHopKetQuaXuLyDonKhieuNai([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.XLD02(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("XLD02_GetDSChiTietDonThu")]
        public IActionResult XLD02_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.TCD02_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("XLD03")]
        public IActionResult TongHopKetQuaXuLyDonToCao([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.XLD03(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("XLD03_GetDSChiTietDonThu")]
        public IActionResult XLD03_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.TCD02_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("XLD04")]
        public IActionResult TongHopKetQuaXuLyDonKienNghiPhanAnh([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.XLD04(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("XLD04_GetDSChiTietDonThu")]
        public IActionResult XLD04_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.TCD02_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("KQGQ01")]
        public IActionResult TongHopKetQuaGiaiQuyetThuocThamQuyen([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.KQGQ01(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("KQGQ01_GetDSChiTietDonThu")]
        public IActionResult KQGQ01_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.KQGQ01_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("KQGQ02")]
        public IActionResult TongHopKetQuaThiHanhQuyetDinhGiaiQuyetKhieuNai([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.KQGQ02(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("KQGQ02_GetDSChiTietDonThu")]
        public IActionResult KQGQ02_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.KQGQ02_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("KQGQ03")]
        public IActionResult TongHopKetQuaGiaiQuyetToCaoThuocThamQuyen([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.KQGQ03(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("KQGQ03_GetDSChiTietDonThu")]
        public IActionResult KQGQ03_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.KQGQ03_GetDSChiTietDonThu(ContentRootPath, p);
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
        //[CustomAuthAttribute(ChucNangEnum.BaoCao, AccessLevel.Read)]
        [Route("KQGQ04")]
        public IActionResult TongHopKetQuaThucHienKetLuanNoiDungToCao([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    if (p.ListCapIDStr != null && p.ListCapIDStr.Length > 0)
                    {
                        var arr = p.ListCapIDStr.Split(",");
                        if (arr != null && arr.Length > 0)
                        {
                            p.ListCapID = new List<int>();
                            foreach (var item in arr)
                            {
                                p.ListCapID.Add(Utils.ConvertToInt32(item, 0));
                            }
                            p.ListCapID = p.ListCapID.Distinct().ToList();
                        }
                    }
                    string ContentRootPath = _host.ContentRootPath;
                    var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _BaoCaoBUS.KQGQ04(p, ContentRootPath, RoleID, CapID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID);
                    base.Status = Data.Status;
                    base.Data = Data.Data;
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
        [Route("KQGQ04_GetDSChiTietDonThu")]
        public IActionResult KQGQ04_GetDSChiTietDonThu([FromQuery] BaseReportParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    //var RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    //var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    //var CoQuanDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    //var CanBoDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    //var TinhDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    //var HuyenDangNhapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    if (p.CanBoID == null || p.CanBoID == 0) p.CanBoID = CanBoID;
                    var Data = _BaoCaoBUS.KQGQ03_GetDSChiTietDonThu(ContentRootPath, p);
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
    }
}
