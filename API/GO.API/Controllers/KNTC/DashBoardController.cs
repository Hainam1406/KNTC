using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.KNTC;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GO.API.Controllers.KNTC
{
    [Route("api/v2/DashBoard")]
    [ApiController]
    public class DashBoardController : BaseApiController
    {
        private DashBoardBUS _DashBoardBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration _config;
        private IOptions<AppSettings> _AppSettings;
        public DashBoardController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DashBoardController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this._DashBoardBUS = new DashBoardBUS();
            this._host = hostingEnvironment;
            this._config = config;
            this._AppSettings = Settings;
        }

        [HttpGet]
        [Route("GetDanhSachData")]
        public IActionResult GetDuLieuDashBoard([FromQuery] DashBoardParams p)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {
                    string ContentRootPath = _host.ContentRootPath;
                    p.RoleID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "RoleID").Value, 0);
                    p.CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    p.CoQuanID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CoQuanID").Value, 0);
                    p.CanBoID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CanBoID").Value, 0);
                    p.TinhID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    p.HuyenID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    //string tuNgay = "01/01/" + DateTime.Now.Year;
                    //string denNgay = "31/12/" + DateTime.Now.Year; 
                    //string tuNgayCungKy = "01/01/" + (DateTime.Now.Year - 1);
                    //string denNgayCungKy = "31/12/" + (DateTime.Now.Year - 1);
                    string tuNgay = "01/01/2010";
                    string denNgay = "31/12/2021";
                    string tuNgayCungKy = "01/01/2010";
                    string denNgayCungKy = "31/12/2020";
                    p.TuNgayCungKy = tuNgayCungKy;
                    p.DenNgayCungKy = denNgayCungKy;
                    if (p.TuNgay == null)
                    {
                        p.TuNgay = tuNgay;
                    }
                    else
                    {
                        if (p.TuNgay.Length > 8)
                        {
                            int Nam = Utils.ConvertToInt32(p.TuNgay.Substring(p.TuNgay.Length - 4, 4), 0);
                            p.TuNgayCungKy = p.TuNgay.Substring(0, 6) + (Nam - 1);
                        }
                    }

                    if (p.DenNgay == null)
                    {
                        p.DenNgay = denNgay;
                    }
                    else
                    {
                        if (p.DenNgay.Length > 8)
                        {
                            int Nam = Utils.ConvertToInt32(p.DenNgay.Substring(p.DenNgay.Length - 4, 4), 0);
                            p.DenNgayCungKy = p.DenNgay.Substring(0, 6) + (Nam - 1);
                        }
                    }
                    var Data = _DashBoardBUS.GetDuLieuDashBoard(p);
                    base.Status = 1;
                    base.Data = Data;
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
        [Route("GetCoQuanByPhamViID")]
        public IActionResult GetCoQuanByPhamViID([FromQuery] string PhamViID)
        {
            try
            {
                return CreateActionResult(false, "", EnumLogType.GetList, () =>
                {

                    //var optionToanTinh = $('<option value = "2">Toàn tỉnh</option>');
                    //var optionSo = $('<option value = "3">Cấp sở</option>');
                    //var optionHuyen = $('<option value = "4">Cấp huyện</option>');
                    //var optionToanHuyen = $('<option value = "4">Toàn huyện</option>');
                    //var optionXa = $('<option value = "5">Cấp xã</option>');
                    //mapping du lieu cũ
                    if (PhamViID == "12")
                    {
                        PhamViID = "2";
                    }
                    else if (PhamViID == "1")
                    {
                        PhamViID = "3";
                    }
                    else if (PhamViID == "2")
                    {
                        PhamViID = "4";
                    }
                    else if (PhamViID == "3")
                    {
                        PhamViID = "5";
                    }

                    var CapID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "CapID").Value, 0);
                    var TinhID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "TinhID").Value, 0);
                    var HuyenID = Utils.ConvertToInt32(User.Claims.FirstOrDefault(c => c.Type == "HuyenID").Value, 0);
                    var Data = _DashBoardBUS.GetCoQuanByPhamViID(PhamViID, CapID, TinhID, HuyenID);
                    base.Status = 1;
                    base.Data = Data;
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
