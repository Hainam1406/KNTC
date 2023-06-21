using Com.Gosol.KNTC.Models.KNTC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class DonThuDonDocInfo
    {
        public int DonThuID { get; set; }

        public int LanGiaiQuyet { get; set; }

        public int XuLyDonIDLanHon1 { get; set; }

        public int Tong { get; set; }

        public int XuLyDonID { get; set; }

        public string TenChuDon { get; set; }

        public string SoDonThu { get; set; }

        public string NguonDonDen { get; set; }

        public DateTime? NgayDonDoc { get; set; }

        public string NgayDonDocStr { get; set; }

        public string NoiDungDon { get; set; }

        public string PhanLoai { get; set; }

        public string TenHuongXuLy { get; set; }

        public int HuongXuLyID { get; set; }

        public int CoQuanID { get; set; }

        public string TenCoQuan { get; set; }

        public DateTime? HanXuLy { get; set; }

        public string TenTrangThai { get; set; }

        public int TrangThaiID { get; set; }

        public int DonDocID { get; set; }

        public int? IsDonDoc { get; set; }

        public int? CanhBao { get; set; }

        public string TenTrangThaiDonDoc { get; set; }
        //public string DuongDanFile { get; set; }

        //public List<string> listDuongDanFile { get; set; }
    }
    public class dk_dondoc : dk_dondocNotPaing
    {

        public int? start { get; set; } = 0;
        public int? end { get; set; } = 10;
        public int PageSize { get; set; } = 10;
    }
    public class dk_dondocNotPaing
    {
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
        public int? CoQuanID { get; set; }
        public int? CanBoID { get; set; }
        public int SuDungQuyTrinh { get; set; }
        public int? HuongGiaiQuyetID { get; set; }
        public int? LoaiKhieuToID { get; set; }
        public int? TrangThaiID { get; set; }
        public string? Keyword { get; set; }
        public int CoQuanDangNhapID { get; set; }
    }
    public class KetQuaInfo
    {
        public int KetQuaID { get; set; }

        public int DonDocID { get; set; }

        public int? LanGiaiQuyet { get; set; }

        public int? LoaiKetQuaID { get; set; }

        public int? CanBoID { get; set; }

        public int? CoQuanID { get; set; }

        public DateTime NgayRaKQ { get; set; }

        public DateTime? NgayThayDoi { get; set; }

        public DateTime NgayDonDoc { get; set; }

        public DateTime? HanGiaiQuyetMoi { get; set; }

        public DateTime? HanGiaiQuyetCu { get; set; }

        public string LyDoDieuChinh { get; set; }

        public string NgayRaKQStr { get; set; }

        public string NoiDungDonDoc { get; set; }

        public int SoTien { get; set; }

        public int SoDat { get; set; }

        public int? SoNguoiDuocTraQuyenLoi { get; set; }

        public int? SoDoiTuongBiXuLy { get; set; }

        public int? SoDoiTuongDaBiXuLy { get; set; }

        public int XuLyDonID { get; set; }

        public string FileUrl { get; set; }

        public int? PhanTichKQ { get; set; }

        public int? KetQuaGQLan2 { get; set; }

        public int NguoiUp { get; set; }

        public string TenCanBoUp { get; set; }

        public string TenLoaiKetQua { get; set; }

        public string TenCanBo { get; set; }

        public string TenCoQuan { get; set; }

        public string SoQuyetDinh { get; set; }

        public List<FileHoSoInfo> lstFileKQ { get; set; }

        public int? QuyetDinh { get; set; }

        public decimal? SoTienD { get; set; }

        public decimal? SoDatD { get; set; }

        public string NoiDungQuyetDinh { get; set; }

        public DateTime? ThoiHanThiHanh { get; set; }

        public string ThoiHanThiHanhStr { get; set; }

        public int? CoQuanThiHanh { get; set; }

        public int? VaiTro { get; set; }

        public int? NoiDungID { get; set; }

        public int? CoQuanThiHanhQuyetDinhID { get; set; }

        public string TenCoQuanBanHanh { get; set; }
    }

    public class DS_HuongGiaiQuyet
    {
        public int HuongGiaiQuyetID { get; set; }
        public string TenHuongGiaiQuyet { get; set; }
        public string MaHuongGiaiQuyet { get; set; }
        public string GhiChu { get; set; }
        public bool? TrangThai { get; set; }
    }
    public class DTDuyeDonDoc
    {
        public int CoQuanID { get; set; }
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public string SoDonThu { get; set; }
        public int NguonDonDen { get; set; }
        public string TenNguonDonDen { get; set; }
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string TenHuongGiaiQuyet { get; set; }
        public string NoiDungDon { get; set; }
        public string StateName { get; set; }
        public int TransitionID { get; set; }
        public int StateID { get; set; }

        public DateTime? NgayQuaHan { get; set; }
        public DateTime? NgayGui { get; set; }

        public string FileUrl { get; set; }
        public string TenFile { get; set; }
        public string YKienXuLy { get; set; }
        public DateTime? NgayXuLy { get; set; }
        public int CanBoXuLyID { get; set; }
        public string TenCanBoXuLy { get; set; }

        public bool Check { get; set; }
    }

    public class DTDuyetDonDocClaims
    {
        public int? CoQuanID { get; set; } = -1;
        public int RoleID { get; set; } = -1;
        public int CanBoID { get; set; }
        public int PhongBanID { get; set; }
        public bool QTVanThuTiepDan { get; set; }
        public bool SuDungQuyTrinh { get; set; }
    }
}
