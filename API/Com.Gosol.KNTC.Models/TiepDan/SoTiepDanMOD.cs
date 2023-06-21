using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.TiepDan
{
    public class SoTiepDanMOD
    {
        public int TiepDanKhongDonID { get; set; }
        public DateTime? NgayTiep { get; set; }
        public bool GaplanhDao { get; set; }
        public string NoiDungTiep { get; set; }
        public bool VuViecCu { get; set; }
        public int? DonThuID { get; set; }
        public int CoQuanID { get; set; }
        public int XuLyDonID { get; set; }
        public int LanTiep { get; set; }
        public string KetQuaTiep { get; set; }
        public int SoDon { get; set; }
        public string TenLanhDaoTiep { get; set; }
        public string YeuCauNguoiDuocTiep { get; set; }
        public string ThongTinTaiLieu { get; set; }
        public string KetLuanNguoiChuTri { get; set; }
        public string NguoiDuocTiepPhatBieu { get; set; }
        public string TenCanBo { get; set; }
        public string TenCoQuan { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string NoiDungDon { get; set; }
        public string CQDaGiaiQuyetID { get; set; }
        public string TenHuongGiaiQuyet { get; set; }
        public int HuongGiaiQuyetID { get; set; }
        public string SoLuong { get; set; }
        public string TenLoaiKhieuTo { get; set; }
    }

    public class SoTiepDanParam : ThamSoLocDanhMuc
    {
        public int? LoaiKhieuToID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? LoaiCanBoTiep { get; set; }
        public int? LoaiRutDon { get; set; }
    }

    public class SoTiepDanClaims
    {
        public int CoQuanID { get; set; } = -1;
        public int CanBoID { get; set; } = -1;
    }

    public class LoaiKhieuToMOD
    {

        public int LoaiKhieuToID { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public int LoaiKhieuToCha { get; set; }
        public int Cap { get; set; }
        public string MappingCode { get; set; }
        public int ThuTu { get; set; }
        public bool SuDung { get; set; }
    }

    public class TiepCongDan_DanKhongDenParam
    {
        public int start { get; set; } = 0;
        public int end { get; set; } = 20;
        public string TenCanBo { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
    

    public class SoTiepDanXoa
    {
        public int TiepDanKhongDonID { get; set; }
    }
}
