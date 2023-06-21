using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class QLHoSoDonThuMOD
    {
        public int DonThuID { get; set; }
        public int XuLyDonID { get; set; }
        //public string TenCoQuanGiaiQuyet { get; set; }
        public string NoiDungDon { get; set; }
        public int? CoQuanID { get; set; }
        public string SoDonThu { get; set; }
        //public int NguonDonDen { get; set; }
        public string TenNguonDonDen { get; set; }
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string HuongXuLy { get; set; }
        public string NoiDungHuongDan { get; set; }
        public string TenCoQuan { get; set; }
        public string TenTinh { get; set; }
        public string TenHuyen { get; set; }
        public string TenLoaiDoiTuong { get; set; }
        public DateTime? HanGiaiQuyet { get; set; }
        public DateTime? NgayNhapDon { get; set; }
    }
    public class DanhMucFileInfo
    {
        public int FileID { get; set; }
        public string TenFile { get; set; }
        public int ThuTuHienThi { get; set; }
        public bool TrangThaiSuDung { get; set; }
        public int NhomFileID { get; set; }
        public string TenNhomFile { get; set; }
        public int ChucNangID { get; set; }
        public string TenChucNang { get; set; }
        public List<int> DanhSachChucNangID { get; set; }
        public List<string> DanhSachTenChucNang { get; set; }
        public int FileChucNangID { get; set; }
    }
    public class QLHoSoDonThuParams:ThamSoLocDanhMuc
    {
        public int CoQuanID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? LoaiKhieuToID { get; set; }
    }

    public class CapNhatHoSoMOD
    {
        public int DonThuID { get; set; }
        public int XuLyDonID { get; set; }
        public string buoc { get; set; }
        public int IsBaoMat { get; set; }
    }

    public class QLHoSoDonThuClaims
    {
        public int CoQuanID { get; set; } = -1;
        public int HuyenID { get; set; } = 0;
    }
}
