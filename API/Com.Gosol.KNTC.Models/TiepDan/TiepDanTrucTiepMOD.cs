using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.TiepDan
{
    public class TiepDanTrucTiepMOD
    {
        public object themMoiFileHoSo;

        public List<DoiTuongKNMOD> DoiTuongKN { get; set; }
        public List<NhomKNMOD> NhomKN { get; set; }
        public List<TiepDanKhongDonMOD> TiepDanKhongDon { get; set; }
        public List<XuLyDonMOD> XuLyDon { get; set; }
        public List<DonThuMod> DonThu { get; set; }
        public List<DoiTuongBiKNMod> DoiTuongBiKN { get; set; }
        public List<CaNhanBiKNMOD> CaNhanBiKN { get; set; }
        public List <ThanhPhanThamGiaMOD> ThanhPhanThamGia { get; set; }
        public List<FileHoSoMod> themMoiFile{ get; set; }

    }


    public class ThanhPhanThamGiaMOD
    {
        public string TenCanBo { get; set; }
        public string ChucVu { get; set; }
        public int TiepDanKhongDonID { get; set; }
    }
    public class NhomKNMOD
    {
        public int NhomKNID { get; set; }
        public string? TenCQ { get; set; }
        public int SoLuong { get; set; }
        public int LoaiDoiTuongKNID { get; set; }       
        public string? DiaChiCQ { get; set; }
        public Boolean? DaiDienPhapLy { get; set; }
        public Boolean? DuocUyQuyen { get; set; }
    }

    public class TiepDanKhongDonMOD
    {
        public int TiepDanKhongDonID { get; set; }
        public DateTime? NgayTiep { get; set; }
        public bool GapLanhDao { get; set; }
        public DateTime? NgayGapLanhDao { get; set; }
        public string NoiDungTiep { get; set; }
        public bool VuViecCu { get; set; }
        public int CanBoTiepID { get; set; }
        public int DonThuID { get; set; }
        public int CoQuanID { get; set; }
        public int XuLyDonID { get; set; }
        public int LanTiep { get; set; }
        public string KetQuaTiep { get; set; }

        public string SoDon { get; set; }
        public int NhomKNID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public int LoaiKhieuTo2ID { get; set; }
        public int LoaiKhieuTo3ID { get; set; }
        public string TenLanhDaoTiep { get; set; }

        public string LanhDaoDangKy { get; set; }
        public int KQTiepDan { get; set; }
        public string YeuCauNguoiDuocTiep { get; set; }
        public string ThongTinTaiTieu { get; set; }
        public string KetQuaNguoiChuTri { get; set; }
        public string NguoiDuocTiepPhatBieu { get; set; }

    }
    public class XuLyDonMOD
    {
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public int SoLan { get; set; }
        public string SoDonThu { get; set; }
        public DateTime NgayNhapDon { get; set; }
        public int NguonDonDen { get; set; }
        public int CQChuyenDonDenID { get; set; }
        public int? HuongGiaiQuyetID { get; set; }
        public DateTime NgayChuyenDon { get; set; }
        public string? SoCongVan { get; set; }
        public string CQDaGiaiQuyetID { get; set; }
        public int? CanBoXuLyID { get; set; }
        public int CoQuanID { get; set; }
        public int? CanBoTiepNhapID { get; set; }
    }

    public class FileHoSoMod
    {
        public int FileHoSoID { get; set; }
        public string? TenFile { get; set; }
        public string? TenFileGoc { get; set; }
        public string? TomTat { get; set; }
        public DateTime? NgayUp { get; set; }
        public int? NguoiUp { get; set; }
        public string? FileUrl { get; set; }
        public int? XuLyDonID { get; set; }
        public int? DonThuID { get; set; }
        public int? FileID { get; set; }
        public bool CheckFile1 { get; set; } = false;
    }
    public class CaNhanBiKNMOD
    {
        public int? CaNhanBiKNID { get; set; }
        public string? NgheNghiep { get; set; }
        public string? NoiCongTac { get; set; }
        public int? ChucVuID { get; set; }
        public int? QuocTichID { get; set; }
        public int? DanTocID { get; set; }
        public int? DoiTuongBiKNID { get; set; }
    }

    public class DoiTuongBiKNMod
    {
        public int DoiTuongBiKNID { get; set; }
        public string? TenDoiTuongBiKN { get; set; }
        public int? TinhID { get; set; }
        public int? HuyenID { get; set; }
        public int? XaID { get; set; }
        public string? DiaChiCT { get; set; }
        public int? LoaiDoiTuongBiKNID { get; set; }
        public bool CheckAdd { get; set; } = false;
    }

    public class DoiTuongKNMOD
    {
        public int DoiTuongKNID { get; set; }
        public String HoTen { get; set; }
        public String CMND { get; set; }
        public DateTime? NgayCap { get; set; }
        public String NoiCap { get; set; }
        public int HuyenID { get; set; }
        public int TinhID { get; set; }
        public int DanTocID { get; set; }
        public int? QuocTichID { get; set; }
        public string SoDienThoai { get; set; }

        public int GioiTinh { get; set; }
        public string NgheNghiep { get; set; }
        public int XaID { get; set; }
        public string? DiaChiCT { get; set; }

        public int NhomKNID { get; set; }
        public string TenTinh { get; set; }
        public string TenHuyen { get; set; }
        public string TenXa { get; set; }
        public string TenQuocTich { get; set; }
        public string TenDanToc { get; set; }
    }
    public class DonThuMod
    {
        public int DonThuID { get; set; }
        public int NhomKNID { get; set; }
        public int? DoiTuongBiKNID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public int LoaiKhieuTo2ID { get; set; }
        public int LoaiKhieuTo3ID { get; set; }
        public int LoaiKhieuToID { get; set; }
        public string NoiDungDon { get; set; }
        public bool TrungDon { get; set; }

        public string? DiaChiPhatSinh { get; set; }
        public int TinhID { get; set; }
        public int HuyenID { get; set; }
        public int XaID { get; set; }
        public bool? LeTanChuyen { get; set; }
        public DateTime NgayVietDon { get; set; }
        //public string TenCQGiaiQuyet { get; set; }
    }



    public class LoaiDoiTuongBiKNMOD
    {
        public int LoaiDoiTuongBiKNID { get; set; }
        public string TenLoaiDoiTuongBiKN { get; set; }
    }
    // dan khong den 
    public class Insert_TiepDan_DanKhongDenMOD
    {
        public int DanKhongDenID { get; set; }
        public string? TenCanBo { get; set; }
        public int? CanBoID { get; set; }
        public int? NguoiTaoID { get; set; }
        public DateTime? NgayTruc { get; set; }
        public string? ChucVu { get; set; }


    }
    
    public class CheckTrungDonHoTen
    {
        public string? HoTen { get; set; }
        public string? CMND { get; set; }
        public string? DiaChi { get; set; }
        public string? NoiDungDon { get; set; }

    }
    public class DemDonTrung
    {
        public string? HoTen { get; set; }
        public string? CMND { get; set; }
        public string? DiaChi { get; set; }
        public string? NoiDungDon { get; set; }
        public int? ToCao { get; set; }
        public int? CoQuanID { get; set; }
    }
    public class CheckKhieuToLan2 : CheckTrungDonHoTen
    {
        public int? StateID { get; set; }
    }

    public class NoiDungCheck
    {
        public string hoTen { get; set; }
        public int LanTrung { get; set; }
        public string DiaChi { get; set; }
        public string NoiDungDon { get; set; }
        public int DonThuID { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public int XuLyDonID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public int ConQuanID { get; set; }
        public string TenCoQuan { get; set; }
        public int HuongGiaiQuyetID { get; set; }
        public int LanGiaiQuyet { get; set; }
    }

    public class NoiDungCheckKhieuToLan2
    {
        public string hoTen { get; set; }
        public string DiaChi { get; set; }
        public string noiDungDon { get; set; }
        public int DonThuID { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public int XuLyDonID { get; set; }
        public int LoaiKhieuTo1ID { get; set; }
        public int ConQuanID { get; set; }

        public int HuongGiaiQuyetID { get; set; }

    }
    public class File
    {      
        public string TenFile { get; set; }
        public string TenFileGoc { get; set; }
        public string? TomTat { get; set; }
        public DateTime? NgayUp { get; set; }
        public int? NguoiUp { get; set; }
        public string FileUrl { get; set; }
        public int? XuLyDonID { get; set; }
        public int? DonThuID { get; set; }
        public int? FileID { get; set; }
    }
}
