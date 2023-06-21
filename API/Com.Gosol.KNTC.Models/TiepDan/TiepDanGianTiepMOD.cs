using Com.Gosol.KNTC.Models.KNTC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.TiepDan
{
    public class TiepDanGianTiepMOD
    {
        public List<ThongTinTiepNhanDT> TiepNhanDT { get; set; }
        public List<DoiTuongKNInfo> DoiTuongKN { get; set; }
        public List<NhomKNInfo> NhomKN { get; set; }
        public List<DonThuMOD> DonThu { get; set; }
        public List<DoiTuongBiKNMOD> DoiTuongBiKN { get; set; }
        public List<CaNhanBiKN> CaNhanBiKN { get; set; }
        public List<FileHoSoMOD> themMoiFileHoSo { get; set; }


    }

   /* public class ThemMoiFileHoSoMOD
    {
        public List<FileHoSoMOD> themMoiFileHoSo { get; set; }
    }*/

    /* public class DoiTuongKNMOD
     {
         // Đối tượng khiếu nại tố cáo
         public int DoiTuongKNID { get; set; }
         public string HoTen { get; set; }
         public string CMND { get; set; }
         public DateTime? NgayCap { get; set; }
         public string NoiCap { get; set; }
         public int HuyenID { get; set; }
         public int TinhID { get; set; }
         public int DanTocID { get; set; }
         public int QuocTichID { get; set; }
         public string SoDienThoai { get; set; }

         public int GioiTinh { get; set; }
         public string NgheNghiep { get; set; }
         public int XaID { get; set; }
         public string DiaChiCT { get; set; }

         public int NhomKNID { get; set; }
     }

     public class NhomKNMOD
     {
         public int NhomKNID { get; set; }
         public int SoLuong { get; set; }
         public string TenCQ { get; set; }
         public int LoaiDoiTuongKNID { get; set; }
         public string DiaChiCQ { get; set; }
         public bool DaiDienPhapLy { get; set; }
         public bool DuocUyQuyen { get; set; }
     }*/

    public class LoaiDoiTuongKNMOD
    {
        public int LoaiDoiTuongKNID { get; set; }
        public string TenLoaiDoiTuongKN { get; set; }
    }

    public class DonThuMOD
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

    public class CaNhanBiKN
    {
        public int? CaNhanBiKNID { get; set; }
        public string? NgheNghiep { get; set; }
        public string? NoiCongTac { get; set; }
        public int? ChucVuID { get; set; }
        public int? QuocTichID { get; set; }
        public int? DanTocID { get; set; }
        public int DoiTuongBiKNID { get; set; }
    }

    public class DoiTuongBiKNMOD
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

    public class ThongTinTiepNhanDT
    {
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public int SoLan { get; set; }
        public string SoDonThu { get; set; }
        public DateTime NgayNhapDon { get; set; }
        public int NguonDonDen { get; set; }
        public int CQChuyenDonDenID { get; set; }
        public DateTime NgayChuyenDon { get; set; }
        public string? SoCongVan { get; set; }
        public string CQDaGiaiQuyetID { get; set; }
        public int? CanBoXuLyID { get; set; }
        public int CoQuanID { get; set; }
        public int CanBoTiepNhapID { get; set; }
        public int? HuongGiaiQuyetID { get; set; }
        public int? CanBoKyID { get; set; }
        public string? NoiDungHuongDan { get; set; }
    }

    public class FileHoSoMOD
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
        public bool CheckFile { get; set; } = false;
    }

    public class TiepDanClaims
    {
        public int CanBoID { get; set; }
        public int CoQuanID { get; set; }
        public int CapID { get; set; }
        public int NguoiDungID { get; set; }
        public bool SuDungQuyTrinh { get; set; } = false;
    }
}
