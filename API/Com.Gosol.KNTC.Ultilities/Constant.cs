using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Gosol.KNTC.Ultilities
{
    public class Constant
    {
        int pagesize = 0;
        public const int PageSize = 12;
        // Nguon Don Den
        public const int NguonDon_BuuChinh = 2;
        public const int NguonDon_CoQuanKhacChuyenToi = 3;

        public const string NguonDon_BuuChinhs = "Bưu chính";
        public const string NguonDon_CoQuanKhacs = "Cơ quan khác chuyển tới";
        public const string NguonDon_TrucTieps = "Trực tiếp";
        public const string NguonDon_TraoTays = "Trao tay";

        public const int TranhChap = 67;

        //
        //public static readonly int LengthNoiDungDon = 4000;

        //public static readonly string ChuoiCuoiNDDon = "...";

        public static readonly int CV = 1;

        public static readonly int Dispatch = 2;

        public static readonly int passGrade = 4;

        public const int Softcover = 1;

        public const int Hardcover = 2;

        public const int TinhTrienKhaiID = 21;

        public const int KhieuNai = 1;

        public const int ToCao = 8;

        public const int PhanAnhKienNghi = 9;

        public const int KienNghi = 62;

        public const int PhanAnh = 23;

        public const int KN_LinhVucHanhChinh = 13;

        public const int KN_LinhVucTuPhap = 2;

        public const int KN_VeDang = 20;

        public const int LinhVucCTVHXH = 15;

        public const int VeTranhChapDatDai = 16;

        public const int VeChinhSach = 17;

        public const int VeNhaTaiSan = 18;

        public const int VeCheDo = 19;

        public const int TC_LinhVucHanhChinh = 10;

        public const int TC_LinhVucTuPhap = 11;

        public const int ThamNhung = 12;

        public const int TC_VeDang = 21;

        public const int TC_LinhVucKhac = 22;

        //public const int TranhChap = 67;

        public const int KN_LinhVucKhac = 71;

        public const int ChuaGiaiQuyet = 0;

        public const int KienNghiXuLyHanhChinh = 8;

        public const int KienNghiThuHoiChoNhaNuoc = 14;

        public const int TraLaiChoCongDan = 15;

        public const int DieuTraKhoiTo = 17;

        public const int CongNhanQDLan1 = 12;

        public const int SuaQDLan1 = 13;

        public const int HuyQDLan1 = 23;

        public const int HuongDanTraLoi = 29;

        public const int ChuyenDon = 30;

        public const int ThuLyGiaiQuyet = 31;

        public const int CQHanhChinhCacCap = 11;

        public const int CQTuPhapCacCap = 14;

        public const int CQDang = 20;

        public const int Dung = 1;

        public const int Sai = 2;

        public const int Dung1Phan = 3;
        //StateName
        public const string LD_Phan_GiaiQuyet = "LD phân giải quyết";
        public const string LD_CapDuoi_Phan_GiaiQuyet = "LD cơ quan cấp dưới phân giải quyết";
        public const string TP_Phan_GiaiQuyet = "Phó chánh thanh tra hoặc lãnh đạo phòng phân giải quyết";

        public const string TP_XuLy = "TP xử lý";
        public const string TP_PhanXuLy = "TP phân xử lý";
        public const string LD_PhanXuLy = "LD phân xử lý";
        public const string CV_XuLy = "Chuyên viên xử lý";
        public const string LD_DuyetXuLy = "LD duyệt xử lý";

        public const string LD_Duyet_GiaiQuyet = "LD duyệt giải quyết";
        public const string TP_DuyetGQ = "Phó chánh thanh tra hoặc lãnh đạo phòng duyệt giải quyết";
        public const string LD_CQCapDuoiDuyetGQ = "LD cấp dưới duyệt giải quyết";

        public const string TruongDoan_GiaiQuyet = "Trưởng đoàn giải quyết";
        public const string CV_TiepNhan = "Chuyên viên tiếp nhận";
        public const string Ket_Thuc = "Kết thúc";
        public const string TP_DuyetXuLy = "TP duyệt xử lý";
        public const string RutDon = "Rút đơn";
        public const string CHUYENDON_RAVBDONDOC = "Chuyển đơn hoặc gửi văn bản đôn đốc";

        //ProfileTransferType const
        public static readonly int LengthNoiDungDon = 4000;
        public static readonly string ChuoiCuoiNDDon = "...";

        public static readonly DateTime DEFAULT_DATE = DateTime.ParseExact("01/01/1753 12:00:00 AM", "dd/MM/yyyy hh:mm:ss tt", System.Globalization.CultureInfo.InvariantCulture);

        public static readonly String CAPNHAT = "Cập nhật thông tin ";
        public static readonly String THEMMOI = "Thêm mới thông tin ";
        public static readonly String XOA = "Xóa thông tin ";

        public static readonly String CONTENT_TRINHKY_ERROR = "Đơn thư chưa có hướng xử lý không thể trình ký";

        public static readonly String MSG_SUKNTCESS = "Cập nhật dữ liệu thành công.";
        public static readonly String NO_FILE = "Không tìm thấy file cần download.";
        public static readonly String NO_DATA = "Không có dữ liệu.";
        public static readonly String ERR_INSERT = "Xảy ra lỗi trong quá trình thêm mới.";
        public static readonly String ERR_UPDATE = "Xảy ra lỗi trong quá trình cập nhật.";
        public static readonly String ERR_DELETE = "Xảy ra lỗi trong quá trình xóa dữ liệu.";
        public static readonly String ERR_UPLOAD = "Xảy ra lỗi trong quá trình upload file.";
        public static readonly String ERR_FILENOTFOUND = "Không tìm thấy file bạn cần download.";
        public static readonly String ERR_EXP_TOKEN = "Phiên làm việc đã hết hạn! Xin vui lòng đăng nhập lại.";
        public static readonly String NOT_AKNTCESS = "Người dùng không có quyền sử dụng chức năng này.";
        
        public static readonly String NOT_USINGAPP = "Gói đăng ký không bao gồm sử dụng dịch vụ di động.";
        public static readonly String NOT_ACCOUNT = "Tài khoản hoặc mật khẩu không đúng.";
        public static readonly String NOT_ACCOUNT_CAS = "Email chưa được đăng ký trên hệ thống. Vui lòng kiểm tra lại";
        public static readonly String NOT_USERTrangThai = "Tài khoản của bị đang bị khóa, vui lòng liên hệ quản trị viên để được hỗ trợ.";
        public static readonly String NOT_USERACTIVE = "Tài khoản của bạn chưa được kích hoạt, vui lòng kiểm tra Email để kích hoạt.";
        public static readonly string NOT_ACTIVE = "Nhà thuốc hiện tại đã ngưng hoạt động. Vui lòng liên hệ hotline của Medigate để biết thêm thông tin chi tiết. Xin cảm ơn.";
        public static readonly String NOT_USER_ACTIVE = "Tài khoản của nhà thuốc hiện chưa được kích hoạt. Vui lòng liên hệ hotline của Medigate để biết thêm thông tin chi tiết. Xin cảm ơn.";
        public static readonly string NOT_PAY = "Tài khoản của nhà thuốc hiện chưa thanh toán. Vui lòng liên hệ hotline của Medigate để biết thêm thông tin chi tiết. Xin cảm ơn.";
        public static readonly string NOT_EXPIRED = "Nhà thuốc hiện tại đã hết hạn sử dụng gói dịch vụ. Vui lòng liên hệ hotline của Medigate để biết thêm thông tin chi tiết. Xin cảm ơn.";
        public static readonly String API_Error_System = "Lỗi hệ thống, vui lòng liên hệ admin để được hỗ trợ!";

        //Các hình thức chấm công
        public static readonly string TheoThoiGianCaLam = "TheoThoiGianCaLam"; //theo thời gian thì đủ giờ là đủ công
        public static readonly string TheoKhungCaLam = "TheoKhungCaLam"; //theo khung thì fix giờ đến giờ về


        public static readonly string DeXuatThuLy = "Đề xuất thụ lý"; //theo khung thì fix giờ đến giờ về
        /*// Hướng Giải Quyết
        public static readonly string HuongDan = "Hướng dẫn"; //theo khung thì fix giờ đến giờ về
        public static readonly string ChuyenDon = "Chuyển đơn"; //theo khung thì fix giờ đến giờ về
        public static readonly string TraDon = "Trả đơn"; //theo khung thì fix giờ đến giờ về
        public static readonly string RaVanBanDonDoc = "Ra văn bản đôn đốc"; //theo khung thì fix giờ đến giờ về
        public static readonly string GuiVanBanDonDoc = "Gửi văn bản thông báo"; //theo khung thì fix giờ đến giờ về
        public static readonly string TuChoiTiep = "Từ chối tiếp"; //theo khung thì fix giờ đến giờ về
        public static readonly string ConvanChiDao = "Công văn chỉ đạo"; //theo khung thì fix giờ đến giờ về
        public static readonly string BaoCao = "Báo cáo"; //theo khung thì fix giờ đến giờ về
        public static readonly string LuuDon = "Lưu đơn"; //theo khung thì fix giờ đến giờ về
        public static readonly string ThongBaoKhongThuLy = "Thông báo không thụ lý"; //theo khung thì fix giờ đến giờ về


*/
        //TUAN BO SUNG
        #region -- loai email
        public static readonly int DM_EMAIL_DUYETXL = 1; //[KNTC] Thông báo phê duyệt kết quả xử lý
        public static readonly int DM_EMAIL_XLLAI = 2; //[KNTC] Thông báo cán bộ xử lý lại
        public static readonly int DM_EMAIL_COHS_GIAOXM = 3; //[KNTC] Thông báo LĐ có hồ sơ được giao nhiệm vụ xác minh
        public static readonly int DM_EMAIL_GIAOXM = 4; //[KNTC] Thông báo cán bộ được giao nhiệm vụ xác minh
        public static readonly int DM_EMAIL_DUYETXM = 5; //[KNTC] Thông báo LĐ phê duyệt kết quả xác minh
        public static readonly int DM_EMAIL_XMLAI = 6; //[KNTC] Thông báo cho cán bộ thực hiện xác minh lại
        public static readonly int DM_EMAIL_BTD_DUYETXM = 7; //[KNTC] Thông báo cho LĐ ban tiếp dân phê duyệt kết quả xác minh

        #endregion
        public static String GetUserMessage(int status)
        {
            switch (status)
            {
                default: return String.Empty;
                case 0: return NO_DATA;
                case -99: return ERR_EXP_TOKEN;
                case -98: return NOT_AKNTCESS;
            }
        }

        public static String GetSysMessage(int status)
        {
            switch (status)
            {
                default: return String.Empty;
                case 0: return NO_DATA;
                case -99: return ERR_EXP_TOKEN;
            }
        }

        public const int DonTrongCoQuan = 0;
        public const int DonDuocPhanXuLy = 1;
    }
}
