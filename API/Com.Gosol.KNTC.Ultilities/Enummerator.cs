using Com.Gosol.KNTC.Models.HeThong;
using System;
using System.Security.Claims;
using System.Web;

namespace Com.Gosol.KNTC.Ultilities
{

    #region AnhVH
    public enum EnumLogType
    {
        Error = 0, // lỗi
        //Action = 1, // thực hiện các chức năng
        DangNhap = 100,

        Insert = 101,
        Update = 102,
        Delete = 103,

        GetByID = 201,// lấy dữ liệu theo ID
        GetByName = 202, // lấy dữ liệu theo tên, key
        GetList = 203, // lấy danh sách dữ liệu      

        BackupDatabase = 901,
        RestoreDatabase = 902,

        Other = 500,

    }




    public enum EnumCapCoQuan : Int32
    {
        CapTrungUong = 0,
        CapTinh = 1,
        CapSo = 2,
        CapHuyen = 3,
        CapPhong = 4,
        CapXa = 5,
    }

    public enum EnumCapQuanLyCanBo : Int32
    {
        CapTinh = 1,
        CapHuyen = 2,
        ToanTinh = 3
    }

    public enum EnumTrangThaiCanBo
    {
        DangLamViec = 0,
        NghiHuu = 1,
        ChuyenCongTac = 2,
        NghiViec = 3,
    }

    /// <summary>
    /// biến động tài sản của cán bộ
    /// </summary>

    public enum StatusResult
    {
        // -98 = hết hạn, -99 = không đủ quyền, -1 = lỗi hệ thống, 0 = lỗi validate, 1 = thành công, 2 = đã tồn tại
        HetHan = -98,
        KhongDuQuyen = -99,
        LoiHeThong = -1,
        LoiValidate = 0,
        ThanhCong = 1,
        DaTonTai = 2,
    }
    #endregion

    #region ChamCong
    public enum EnumTrangThaiAnh : Int32
    {
        DuAnh = 1,
        ThieuAnh = 2,
        ChuaCoAnh = 3,
    }
    public enum EnumLoaiDoiTuong : Int32
    {
        NhanVien = 1,
        PhongBan = 2,
        Nhom = 3,
    }

    public enum EnumTrangThaiNhanVien : Int32
    {
        DaNghi = 0,
        DangLam = 1,
    }

    public enum EnumTrangThaiChamCong : Int32
    {
        DuCong = 1,
        ThieuCong = 2,
        QuenChamVao = 3,
        QuenChamRa = 4,
    }

    public enum EnumLoaiDonTu : Int32
    {
        LamThem = 1,
        ChamCongBu = 2,
        XinNghi = 3,
        QuenChamVao = 4,
        QuenChamRa = 5,
        DiRaNgoai = 6,
        XinDenMuon = 7,
        XinVeSom = 8,
    }

    public enum EnumTrangThaiDonTu : Int32
    {
        ChoDuyet = 100,
        DaDuyet = 200,
        TuChoi = 101,
    }
    public enum EnumQuyMoLuaChon : Int32
    {
        TatCa = 1,
        LuaChon = 2,
    }

    public enum EnumLoaiAnhNhanVien : Int32
    {
        AnhChinhDien = 1,
        AnhTrai = 2,
        AnhPhai = 3,
        AnhNgua = 4,
        AnhCui = 5,
        AnhCanMat = 6,
        AnhXa = 7
    }

    public enum EnumLoaiThongBaoDonTu : Int32
    {
        CanDuyet = 1,
        DaDuyet = 2,
        TuChoi = 3
    }

    public enum EnumLoaiNgayNghi : Int32
    {
        NghiLe = 1,
        NghiThamNien = 2
    }

    //public enum EnumLoaiFile
    //{
    //    MatTruocCMND = 1,
    //    MatSauCMND = 2,
    //    AnhChanDung = 3,
    //    AnhCheckIn = 4,
    //}
    #endregion

    #region KNTC
    public enum CapQuanLy
    {
        CapSoNganh = 1,//
        CapUBNDHuyen = 2,
        CapUBNDXa = 3,//
        CapUBNDTinh = 4,//
        CapTrungUong = 5,
        ToanHuyen = 6, // Toàn huyện= Tổng UBND huyện  +UBND Xã
        CapPhong = 11,
        CapToanTinh = 12,
        ToanHuyenChiTiet = 13,
        CapUBNDXaChiTiet = 14,
        CapUBNDHuyenChiTiet = 15,
        CapUBNDTinhChiTiet = 16,
        CapSoNganhChiTiet = 17

    }
    public enum EnumChucVu
    {
        LanhDao = 1,
        TruongPhong = 2,
        ChuyenVien = 3,
    }
    public enum CapCoQuanViewChiTiet
    {
        ToanTinh = 13,//
        CapSoNganh = 9,//
        CapUBNDHuyen = 14,//
        CapUBNDXa = 10,//
        CapUBNDTinh = 8,//
        CapTrungUong = 7,
        ToanHuyen = 15, // Toàn huyện= Tổng UBND huyện  +UBND Xã //
        CapPhong = 12
    }
    public enum EnumLoaiFile
    {
        FileHoSo = 1,
        FileKQXL = 2,
        FileDTCPGQ = 3,
        FileBanHanhQD = 4,
        FileTheoDoi = 5,
        FileYKienXuLy = 6,
        //FileHSDS = 7,
        FileGiaiQuyet = 8,
        FileKetQuaTranhChap = 9,
        FileRutDon = 10,
        FileThiHanh = 11,
        FilePhanXuLy = 12,
        FileVBDonDoc = 13,
        FileDTCDGQ = 14,
        FileBCXM = 15, //File báo cáo xác minh
        FileDMBXM = 16,
        FileGiaHanGiaiQuyet = 17,
        FileBieuMau = 18,
        FileHuongDanSuDung = 19
    }
    public enum EnumDoBaoMat
    {
        BinhThuong = 1,
        BaoMat = 2,
    }
    public enum EnumLoaiLog
    {
        Them = 1,
        Sua = 2,
        Xoa = 2,
    }
    #endregion

    public enum EnumNguonDonDen
    {
        TrucTiep = 151,
        BuuChinh = 149,
        CoQuanKhac = 150,
        TraoTay = 28
    }

    public enum HuongGiaiQuyetEnum
    {
        HuongDan = 30,
        DeXuatThuLy = 31,
        ChuyenDon = 32,
        TraDon = 33,
        RaVanBanDonDoc = 34,
        GuiVanBanThongBao = 35,
        TuChoiTiep = 68,
        CongVanChiDao = 69,
        BaoCao = 70,
        LuuDon = 71,
        TuChoiThuLy = 72
    }

    public enum RoleEnum
    {
        ChuyenVien = 3,
        LanhDaoPhong = 2,
        LanhDaoDonVi = 1
    }

    public enum EnumBuoc
    {
        ThongTinChung = 1,
        XuLyDon = 2,
        GiaiQuyetDon = 3,
        BanHanh = 4,
        TheoDoi = 5,
        LDPhanGiaiQuyet = 6,
        YeuCauDoiThoai = 7,
        BaoCaoXacMinh = 8,
        DuyetGiaiQuyet = 9,
    }

    public class RoleInstance
    {
        public static bool IsLanhDao(int roleID)
        {
            if (roleID == (int)RoleEnum.LanhDaoDonVi) return true;
            else return false;
        }

        public static bool IsTruongPhong(int roleID)
        {
            if (roleID == (int)RoleEnum.LanhDaoPhong) return true;

            return false;
        }

        public static bool IsChuyenVien(int roleID)
        {
            if (roleID == (int)RoleEnum.ChuyenVien) return true;

            return false;
        }
    }

    

    //public enum EnumHuongGiaiQuyet
    //{
    //    HuongDan = 30,
    //    DeXuatThuLy = 31,
    //    ChuyenDon = 32,
    //    TraDon = 33,
    //    RaVanBanDonDoc = 34,
    //    GuiVanBanThongBao = 35,
    //    TuChoiTiep = 68,
    //    ConVanChiDao = 69,
    //    BaoCao = 70,
    //    LuuDon = 71,
    //    ThongBaoKhongThuLy = 72
    //}
};