using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.DanhMuc;
using Com.Gosol.KNTC.BUS.KNTC;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GO.API.Controllers.KNTC
{
    [Route("api/v2/DetailTiepDan")]
    [ApiController]
    public class DetailTiepDanController : BaseApiController
    {
        private ChiTietDonThuTiepDanBUS ChiTietDonThuTiepDanBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IConfiguration config;
        private IOptions<AppSettings> appSettings;

        public DetailTiepDanController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, IConfiguration config, ILogHelper _LogHelper, ILogger<DetailTiepDanController> logger, IOptions<AppSettings> Settings) : base(_LogHelper, logger)
        {
            this.ChiTietDonThuTiepDanBUS = new ChiTietDonThuTiepDanBUS();
            this._host = hostingEnvironment;
            this.config = config;
            this.appSettings = Settings;
        }
        //DetailTiepDan

        //All_IdTiepDan(int? TiepDanKhongDonID)
        

        [HttpGet]
        [Route("DetailTiepDan")]
        public IActionResult DetailTiepDan([FromQuery] int DonthuID )
        {
            try
            {
                var Result = ChiTietDonThuTiepDanBUS.DetailTiepDan(DonthuID);
                if (Result != null) return Ok(Result);
                else return NotFound();
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
