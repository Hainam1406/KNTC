using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class DTDuyetKQXuLyMOD
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




    public class DTDuyetKQXuLyParams : ThamSoLocDanhMuc
    {
        public int? LoaiKhieuToID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }

    public class DTDuyetKQXuLyClaims
    {
        public int? CoQuanID { get; set; } = -1;
        public int RoleID { get; set; } = -1;
        public int CanBoID { get; set; }
        public int PhongBanID { get; set; }
        public bool QTVanThuTiepDan { get; set; }
        public bool SuDungQuyTrinh { get; set; }
    }
}
