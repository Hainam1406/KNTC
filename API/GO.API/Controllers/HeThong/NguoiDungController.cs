using Com.Gosol.KNTC.API.Authorization;
using Com.Gosol.KNTC.API.Config;
using Com.Gosol.KNTC.API.Formats;
using Com.Gosol.KNTC.BUS.HeThong;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Com.Gosol.KNTC.API.Controllers.HeThong
{
    [Route("api/v2/Nguoidung")]
    [ApiController]
    public class NguoidungController : ControllerBase
    {
        private IOptions<AppSettings> _AppSettings;
        private NguoiDungBUS _NguoiDungBUS;
        private HeThongCanBoBUS _CanBoBUS;
        private PhanQuyenBUS _PhanQuyenBUS;
        private ILogger logger;
        private SystemConfigBUS _systemConfigBUS;
        private ILogHelper _LogHelper;
        public NguoidungController(IOptions<AppSettings> Settings, ILogHelper LogHelper)
        {
            _AppSettings = Settings;
            _NguoiDungBUS = new NguoiDungBUS();
            _CanBoBUS = new HeThongCanBoBUS();
            _PhanQuyenBUS = new PhanQuyenBUS();
            this.logger = logger;
            this._systemConfigBUS = new SystemConfigBUS();
            this._LogHelper = LogHelper;
        }


        [Route("DangNhap")]
        [HttpPost]
        public IActionResult Login(LoginModel User)
        {
            try
            {
                //string Password = Cryptor.EncryptPasswordUser(User.UserName.Trim().ToLower(), User.Password);
                string Password = Utils.HashFile(Encoding.ASCII.GetBytes(User.Password)).ToUpper();
                NguoiDungModel NguoiDung = null;
                if (_NguoiDungBUS.VerifyUser(User.UserName.Trim(), Password, User.Email, ref NguoiDung))
                {
                    Task.Run(() => _LogHelper.Log(NguoiDung.CanBoID, "Đăng nhập hệ thống", (int)EnumLogType.DangNhap));
                    var claims = new List<Claim>();
                    var ListChucNang = _PhanQuyenBUS.GetListChucNangByNguoiDungID(NguoiDung.NguoiDungID);

                    string ClaimRead = "," + string.Join(",", ListChucNang.Where(t => t.Xem == 1).Select(t => t.ChucNangID).ToArray()) + ",";
                    string ClaimCreate = "," + string.Join(",", ListChucNang.Where(t => t.Them == 1).Select(t => t.ChucNangID).ToArray()) + ",";
                    string ClaimEdit = "," + string.Join(",", ListChucNang.Where(t => t.Sua == 1).Select(t => t.ChucNangID).ToArray()) + ",";
                    string ClaimDelete = "," + string.Join(",", ListChucNang.Where(t => t.Xoa == 1).Select(t => t.ChucNangID).ToArray()) + ",";
                    string ClaimFullAccess = "," + string.Join(",", ListChucNang.Where(t => t.Xem == 1 && t.Them == 1 && t.Sua == 1 && t.Xoa == 1).Select(t => t.ChucNangID).ToArray()) + ",";

                    //claims.Add(new Claim(PermissionLevel.FULLACCESS, ClaimFull));
                    claims.Add(new Claim(PermissionLevel.READ, ClaimRead));
                    claims.Add(new Claim(PermissionLevel.CREATE, ClaimCreate));
                    claims.Add(new Claim(PermissionLevel.EDIT, ClaimEdit));
                    claims.Add(new Claim(PermissionLevel.DELETE, ClaimDelete));
                    claims.Add(new Claim(PermissionLevel.FULLACCESS, ClaimFullAccess));

                    claims.Add(new Claim("CanBoID", NguoiDung?.CanBoID.ToString()));
                    claims.Add(new Claim("NguoiDungID", NguoiDung?.NguoiDungID.ToString()));
                    claims.Add(new Claim("CoQuanID", NguoiDung?.CoQuanID.ToString()));
                    claims.Add(new Claim("MaCQ", NguoiDung?.MaCQ.ToString()));
                    claims.Add(new Claim("CapID", NguoiDung?.CapID.ToString()));
                    claims.Add(new Claim("RoleID", NguoiDung?.RoleID.ToString()));
                    claims.Add(new Claim("TinhID", NguoiDung?.TinhID.ToString()));
                    claims.Add(new Claim("HuyenID", NguoiDung?.HuyenID.ToString()));
                    claims.Add(new Claim("CapCoQuan", NguoiDung?.CapCoQuan.ToString()));
                    claims.Add(new Claim("VaiTro", NguoiDung?.VaiTro.ToString()));
                    claims.Add(new Claim("expires_at", Utils.ConvertToDateTime(DateTime.UtcNow.AddDays(_AppSettings.Value.NumberDateExpire).ToString(), DateTime.Now.Date).ToString()));
                    claims.Add(new Claim("TenCanBo", NguoiDung?.TenCanBo.ToString()));
                    claims.Add(new Claim("QuanLyThanNhan", NguoiDung?.QuanLyThanNhan.ToString()));
                    claims.Add(new Claim("SuDungQuyTrinh", NguoiDung?.SuDungQuyTrinh.ToString()));
                    claims.Add(new Claim("QTVanThuTiepDan", NguoiDung?.QTVanThuTiepDan.ToString()));
                    claims.Add(new Claim("QTVanThuTiepNhanDon", NguoiDung?.QTVanThuTiepNhanDon.ToString()));
                    claims.Add(new Claim("QuyTrinhGianTiep", NguoiDung?.QuyTrinhGianTiep.ToString()));
                    claims.Add(new Claim("PhongBanID", NguoiDung?.PhongBanID.ToString()));
                    //claims.Add(new Claim("expires_at", new DateTime(2020,01,07,13,45,00).ToString()));
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_AppSettings.Value.AudienceSecret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.UtcNow.AddDays(_AppSettings.Value.NumberDateExpire),
                        //new DateTime(2020, 01, 07, 13, 45, 00),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        //,Issuer = _AppSettings.Value.ApiUrl
                        //, Audience = _AppSettings.Value.AudienceSecret

                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    NguoiDung.Token = tokenHandler.WriteToken(token);
                    NguoiDung.expires_at = DateTime.UtcNow.AddDays(_AppSettings.Value.NumberDateExpire);
                    //tokenDescriptor.Expires;
                    //var clsCommon = new Commons();
                    //var listFile = _FileDinhKemBUS.GetAllField_FileDinhKem_ByNghiepVuID_AndType(NguoiDung.CanBoID, EnumLoaiFileDinhKem.AnhHoSo.GetHashCode());
                    //if (listFile.Count > 0)
                    //    NguoiDung.AnhHoSo = clsCommon.GetServerPath(HttpContext) + listFile[0].FileUrl;
                    return Ok(new
                    {
                        Status = 1,
                        User = NguoiDung,
                        ListRole = ListChucNang
                    });
                }
                else
                {
                    string message = Constant.NOT_ACCOUNT;
                    if (User.Email != null && User.Email != "")
                    {
                        message = Constant.NOT_ACCOUNT_CAS;
                    }
                    return Ok(new
                    {
                        Status = -1,
                        Message = message
                    });
                }
            }
            catch (Exception ex)
            {
                logger.LogInformation(ex.Message, "Đăng nhập hệ thống");
                throw;
            }


        }
    }
} 