using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class RutDonMOD
    {
        public int DonThuID { get; set; }
        public int XuLyDonID { get; set; }
        public string NoiDungDon { get; set; }
        public int? CoQuanID { get; set; }
        public string SoDonThu { get; set; }
        public string HoTen { get; set; }
        public string DiaChiCT { get; set; }
        public string LyDo { get; set; }
        public string TenLoaiKhieuTo { get; set; }
        public string StateName { get; set; }
        public string TrangThaiRut { get; set; }
        public int RutDonID { get; set; }
        public DateTime? NgayRutDon { get; set; }
    }

    public class RutDonParams : ThamSoLocDanhMuc
    {
        public int CoQuanID { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public int? LoaiKhieuToID { get; set; }

        public DateTime NgayRutDon { get; set; }
        public string LyDo { get; set; }
        public int XuLyDonID { get; set; }
    }

    public class RutDonClaims
    {
        public int CoQuanID { get; set; } = 0;
        public int CanBoID { get; set; } = 0;
        public string severPath { get; set; }
    }
}
