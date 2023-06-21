using Com.Gosol.KNTC.Models.TiepDan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.KNTC
{
    public class ChiTietDonThuTiepDanMOD
    {
        public List<TiepDanKhongDonMOD> TiepDanKhongDon { get; set; }
        public List<XuLyDonMOD> XuLyDon { get; set; }
        public List<DonThuMod> DonThu { get; set; }
        public List<NhomKNMOD> NhomKN { get; set; }      
        public List<DoiTuongKNMOD> DoiTuongKN { get; set; }
        public List<NhomDoiTuongBiKN> NhomDoiTuongBiKN { get; set; }      
    }

    public class Detail_AllIdTiepDan
    {
        public int TiepDanKhongDonID { get; set; }
        public int XuLyDonID { get; set; }
        public int DonThuID { get; set; }
        public int NhomKNID { get; set; }
        public int DoiTuongKNID { get; set; }
        public int DoiTuongBiKNID { get; set; }
        public int CaNhanBiKNID { get; set; }
    }

    public class NhomDoiTuongBiKN
    {
        public int DoiTuongBiKNID { get; set; }
        public string? TenDoiTuongBiKN { get; set; }
        public int? TinhID { get; set; }
        public int? HuyenID { get; set; }
        public int? XaID { get; set; }
        public string? DiaChiCT { get; set; }
        public int? LoaiDoiTuongBiKNID { get; set; }
        public bool CheckAdd { get; set; } = false;
        public int? CaNhanBiKNID { get; set; }
        public string? NgheNghiep { get; set; }
        public string? NoiCongTac { get; set; }
        public int? ChucVuID { get; set; }
        public int? QuocTichID { get; set; }
        public int? DanTocID { get; set; }

    }
}
