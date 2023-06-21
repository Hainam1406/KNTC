using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.TiepDan
{
    public class TiepDanInfo
    {
        // tiep dan khong don
        public int TiepDanKhongDonID { get; set; }
        public DateTime NgayTiep { get; set; }
        public bool GapLanhDao { get; set; }
        public DateTime NgayGapLanhDao { get; set; }
        public string NoiDungTiep { get; set; }
        public string YeuCauNguoiDuocTiep { get; set; }
        public string ThongTinTaiLieu { get; set; }
        public bool VuViecCu { get; set; }
        public int CanBoTiepID { get; set; }
        //public int DonThuID { get; set; }
        //public int CoQuanID { get; set; }
        public string SoDon { get; set; }
        public int LanTiep { get; set; }
        public int LanGiaiQuyet { get; set; }
        public int DonThuGocID { get; set; }
        public string KetQuaTiep { get; set; }
        public string KetLuanNguoiChuTri { get; set; }
        public string NguoiDuocTiepPhatBieu { get; set; }
        public int LeTanChuyenID { get; set; }
        public string TenLanhDaoTiep { get; set; }
        public string ChucVu { get; set; }

        //xu ly don
        public int XuLyDonID { get; set; }
        public int XuLyDonIDGoc { get; set; }
        //public int DonThuID { get; set; }
        public int SoLan { get; set; }
        public string SoDonThu { get; set; }
        public DateTime NgayNhapDon { get; set; }
        public string NgayNhapDon_Str { get; set; }
        public DateTime NgayQuaHan { get; set; }
        public int NguonDonDen { get; set; }
        public int CQChuyenDonID { get; set; }
        public int CQChuyenDonDenID { get; set; }
        public string SoCongVan { get; set; }
        public DateTime NgayChuyenDon { get; set; }
        public bool ThuocThamQuyen { get; set; }
        public bool DuDieuKien { get; set; }
        public int HuongGiaiQuyetID { get; set; }
        public string NoiDungHuongDan { get; set; }
        public int CanBoXuLyID { get; set; }
        public int CanBoKyID { get; set; }
        public string CQDaGiaiQuyetID { get; set; }
        public int TrangThaiDonID { get; set; }
        public int PhanTichKQID { get; set; }
        public int CanBoTiepNhapID { get; set; }
        public int CoQuanID { get; set; }
        public DateTime NgayThuLy { get; set; }
        public string LyDo { get; set; }
        public int DuAnID { get; set; }
        public DateTime NgayXuLy { get; set; }
        public bool DaDuyetXuLy { get; set; }
        public string LanhDaoDangKy { get; set; }
        public int CBDuocChonXL { get; set; }
        public int QTTiepNhanDon { get; set; }
        public int StateID { get; set; }

        //don thu
        public int DonThuID { get; set; }
        public int NhomKNID { get; set; }
        public int DoiTuongBiKNID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public int LoaiKhieuTo2ID { get; set; }
        public int LoaiKhieuTo3ID { get; set; }
        public int LoaiKhieuToID { get; set; }
        public string NoiDungDon { get; set; }
        public bool TrungDon { get; set; }

        public string DiaChiPhatSinh { get; set; }
        public int TinhID { get; set; }
        public int HuyenID { get; set; }
        public int XaID { get; set; }
        public bool LeTanChuyen { get; set; }
        public DateTime NgayVietDon { get; set; }
        public string TenCQGiaiQuyet { get; set; }

        //trung don
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string TenHuongGiaiQuyet { get; set; }
        public string TenCoQuan { get; set; }

        // KT Lần 2
        public int LanGQ { get; set; }
        public string TenCoQuanDaGQ { get; set; }

        public int KQQuaTiepDan { get; set; }
    }

    public class ThanhPhanThamGiaInfo
    {
        public int TiepDanKhongDonID { get; set; }
        public string TenCanBo { get; set; }
        public string ChucVu { get; set; }
    }

    public class CheckTrungDonMOD
    {
        public int DonThuID { get; set; }
        public int XuLyDonID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string NoiDungDon { get; set; }
        public string TenCoQuan { get; set; }
        public int CoQuanID { get; set; }
        public int SoLan { get; set; }
    }

    public class CheckKhieuTo2MOD
    {
        public int DonThuID { get; set; }
        public int XuLyDonID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string NoiDungDon { get; set; }
        public string TenCoQuan { get; set; }
        public int CoQuanID { get; set; }
        public int HuongGiaiQuyetID { get; set; }
        public int LanGQ { get; set; }
    }
}

