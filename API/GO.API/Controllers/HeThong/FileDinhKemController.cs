using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Controllers;
using Com.Gosol.KNTC.API.Controllers.HeThong;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace GO.API.Controllers.HeThong
{
    [Route("api/v2/FileDinhKem")]
    [ApiController]
    public class FileDinhKemController : BaseApiController
    {
        private FileDinhKemBUS _FileDinhKemBUS;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _host;
        private IOptions<AppSettings> _AppSettings;
        public FileDinhKemController(IHostingEnvironment HostingEnvironment, IOptions<AppSettings> Settings, ILogHelper _LogHelper, ILogger<FileDinhKemController> logger) : base(_LogHelper, logger)
        {
            this._FileDinhKemBUS = new FileDinhKemBUS();
            this._host = HostingEnvironment;
            this._AppSettings = Settings;
        }

        [HttpPost]
        [Route("Insert")]
        public async Task<IActionResult> Insert(IList<IFormFile> files, [FromForm] string FileDinhKemStr)
        {
            try
            {     
                var FileDinhKem = JsonConvert.DeserializeObject<FileDinhKemModel>(FileDinhKemStr);
                var clsCommon = new Commons();
                if (files != null && files.Count > 0 && FileDinhKem != null)
                {
                    FileDinhKem.NguoiCapNhat = CanBoID;          
                    List<FileDinhKemModel> ListFileUrl = new List<FileDinhKemModel>();
                    foreach (IFormFile source in files)
                    {
                        var file = await clsCommon.InsertFileAsync(source, FileDinhKem, _host);
                        if (file != null && file.FileID > 0) 
                        {
                            ListFileUrl.Add(file);
                        }
                    }

                    base.Data = ListFileUrl;
                    base.Status = 1;
                    base.Message = "Thêm mới file đính kèm thành công";
                }
                else
                {
                    base.Status = 0;
                    base.Message = "Vui lòng chọn file đính kèm";
                }
                return base.GetActionResult();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                base.GetActionResult();
                throw ex;
            }
        }

        [HttpGet]   
        [Route("GetByID")]
        public IActionResult GetByID([FromQuery] int FileDinhKemID, int FileType)
        {
            try
            {
                FileDinhKemModel Data = new FileDinhKemModel();
                Data = _FileDinhKemBUS.GetByID(FileDinhKemID, FileType);
                if (Data != null && Data.FileID > 0)
                {
                    base.Status = 1;
                    var clsCommon = new Commons();
                    string serverPath = clsCommon.GetServerPath(HttpContext);
                    Data.FileUrl = serverPath + Data.FileUrl;
                }
                else
                {
                    base.Status = 0;
                }
                base.Data = Data;
                return base.GetActionResult();
            }
            catch (Exception)
            {
                base.Status = -1;
                return base.GetActionResult();
                throw;
            }
        }

        [HttpGet]
        [Route("GetByNghiepVuID")]
        public IActionResult GetByNghiepVuID([FromQuery] int NghiepVuID, int FileType)
        {
            try
            {
                List<FileDinhKemModel> Data = new List<FileDinhKemModel>();
                Data = _FileDinhKemBUS.GetByNgiepVuID(NghiepVuID, FileType);
                if (Data != null && Data.Count > 0)
                {
                    base.Status = 1;
                    var clsCommon = new Commons();
                    string serverPath = clsCommon.GetServerPath(HttpContext);
                    foreach (var item in Data)
                    {
                        item.FileUrl = serverPath + item.FileUrl;
                    }
                }
                else
                {
                    base.Status = 0;
                }
                base.Data = Data;
                return base.GetActionResult();
            }
            catch (Exception)
            {
                base.Status = -1;
                return base.GetActionResult();
                throw;
            }
        }

        [HttpPost]
        [Route("Delete")]
        public IActionResult Delete(List<FileDinhKemModel> p)
        {
            try
            {
                var Result = _FileDinhKemBUS.Delete(p);
                base.Status = Result.Status;
                base.Message = Result.Message;
                return base.GetActionResult();
            }
            catch (Exception ex)
            {
                base.Status = -1;
                base.Message = ConstantLogMessage.API_Error_System;
                return base.GetActionResult();
                throw ex;
            }
        }

    }
}
