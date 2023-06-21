using Com.Gosol.KNTC.Models.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.TiepDan
{
    public class SoTiepNhan_GianTiepMOD
    {
        public int XuLyDonID { get; set; }
        public string SoBienNhanMotCua { get; set; }
        public string MaHoSoMotCua { get; set; }
        public DateTime? NgayHenTraMotCua { get; set; }
        public int DonThuID { get; set; }
        public string SoDonThu { get; set; }
        public int DoiTuongBiKNID { get; set; }
        public int NhomKNID { get; set; }
        public string NoiDungDon { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string HoTen { get; set; }
        public string NguonDonDen { get; set; }
        public DateTime? NgayNhapDon { get; set; }
        public string SoCongVan { get; set; }
        public string TenCQChuyenDonDen { get; set; }
        public string DiaChiCT { get; set; }
        public string StateName { get; set; }
        public string TrangThai { get; set; }
        public int HuongGiaiQuyetID { get; set; }
        public int CBDuocChonXL { get; set; }
        public int QTTiepNhanDon { get; set; }
    }

    public class SoTiepNhanParams : ThamSoLocDanhMuc
    {
        public int? LoaiKhieuToID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? CQChuyenDonDenID { get; set; }
        public int? LoaiRutDon { get; set; }
    }

    public class SoTiepNhanClaims
    {
        public bool SuDungQuyTrinh { get; set; }
        public int CoQuanID { get; set; }
    }




    public class DS_CoQuanModel
    {
        public int CoQuanID { get; set; }
        public string TenCoQuan { get; set; }
    }
    /*public enum EnumNguonDonDenM

    {
        TrucTiep = 21,
        BuuChinh = 26,
        CoQuanKhac = 22,
        TraoTay = 28
    }*/

    /*public enum EnumNguonDonDenM
    {
        TrucTiep = 21,
        BuuChinh = 26,
        CoQuanKhac = 22,
        TraoTay = 28
    }*/
}
