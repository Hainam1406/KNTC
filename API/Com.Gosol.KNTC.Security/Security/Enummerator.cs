using System;
using System.Web;

namespace Com.Gosol.KNTC.Security
{
    public enum ChucNangEnum
    {
        HeThong = 1,
        ThongTinCaNhan = 2,
        QuanLyNguoiDung = 4,
        QuanLyNhomNguoiDung = 5,
        QuanLyPhanQuyen = 6,
        QuanLyCanBo = 7,
        ThamSoHeThong = 9,
        SaoLuuDuLieu = 68,
        HuongDanSuDung = 104,

        DanhMuc = 20,
        DanhMucNgheNghiep = 21,
        DanhMucDanToc = 22,
        DanhMucQuocTich = 23,
        DanhMucTinhHuyenXa = 24,
        DanhMucLoaiDoiTuongKN = 25,
        DanhMucLoaiDoiTuongBiKN = 26,
        DanhMucCoQuan = 27,
        DanhMucThamQuyen = 28,
        DanhMucChucVu = 29,
        DanhMucNguonDonDen = 30,
        DanhMucLoaiKhieuTo = 31,
        DanhMucHuongGiaiQuyet = 32,
        DanhMucTrangThaiDon = 33,
        DanhMucLoaiKetQua = 34,
        DanhMucPhanTichKQ = 35,
        DanhMucLoaiVB = 36,
        DanhMucFileDinhKem = 37,

        DanhSachRutDon = 175,
        PheDuyetKetQuaXL = 162,

        BaoCao = 50,
        BaoCao2a = 51,
        BaoCao2b = 52,
        BaoCao2c = 53,
        BaoCao2d = 54,

    }

    public enum EnumState
    {
        LDPhanXuLy = 1,
        ChuyenVienXL = 4,
        TPDuyetXL = 5,
        LDDuyetXL = 6,
        LDPhanGQ = 7,
        TruongDoanGQ = 8,
        LDDuyetDQ = 9,
        KetThuc = 10,
        ChuyenVienTiepNhan = 11,
        TPPhanXL = 12,
        LDCapDuoiDuyetGQ = 22,
    }

    public enum EnumQTTiepNhanDon
    {
        QTTiepNhanGianTiep = 1,
        QTVanThuTiepNhan,
        QTVanThuTiepDan,
        QTGianTiepBTD
    }

    public enum TrangThaiDonEnum
    {
        DeXuatThuLy = 2,
        TuChoiThuLy = 3,
        DangXuLy = 4,
        CoKetQua = 5,
        RutDon = 11
    }

    public enum PhanTichKQEnum
    {
        Dung = 1,
        DungMotPhan = 2,
        Sai = 3
    }

    public enum EnumCoQuan
    {
        BanTCDTinh = 245,
        ThanhTraTinh = 275,
    }

};