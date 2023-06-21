using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.KNTC
{
    public class DoiTuongBiKNJoinInfo
    {
        public int DoiTuongBiKNID { get; set; }
        public string TenDoiTuongBiKN { get; set; }
        public int TinhID { get; set; }
        public int HuyenID { get; set; }
        public int XaID { get; set; }
        public string DiaChiCT { get; set; }
        public int LoaiDoiTuongBiKNID { get; set; }

        public string TenChucVu { get; set; }
        public string TenDanToc { get; set; }
        public string TenNgheNghiep { get; set; }
    }
}
