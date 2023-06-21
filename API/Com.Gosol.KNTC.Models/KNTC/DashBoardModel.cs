using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.KNTC
{
    public class DashBoardModel
    {
        public List<Data> SoLieuTongHop { get; set; }
        public List<BieuDoCot> SoLieuBieuDoCot { get; set; }
        public List<Data> SoLieuBieuTron { get; set; }
        public List<Data> SoLieuBieuDoTronCungKy { get; set; }
        public List<int> ListCapID { get; set; }
        public List<BCTinhHinhTD_XLD_GQInfo> lsData { get; set; }
    }

    public class Data
    {
        public String Key { get; set; }
        public decimal Value { get; set; }
        public Data(String Key, decimal Value)
        {
            this.Key = Key;
            this.Value = Value;
        }
    }

    public class BieuDoCot
    {
        public string TenCot { get; set; }
        public int LoaiCot { get; set; }
        public int CapID { get; set; }
        public int TrongKy { get; set; }
        public int CungKy { get; set; }
        public int DaXuLy { get; set; }
        public int DaGiaiQuyet { get; set; }
        public int ChuaGiaiQuyet { get; set; }
        public List<Data> Data { get; set; }
        public BieuDoCot(string TenCot, int LoaiCot, int CapID, int TrongKy, int CungKy, int DaXuLy, int DaGiaiQuyet, int ChuaGiaiQuyet)
        {
            this.TenCot = TenCot;
            this.LoaiCot = LoaiCot;
            this.CapID = CapID;
            this.TrongKy = TrongKy;
            this.CungKy = CungKy;
            this.DaXuLy = DaXuLy;
            this.DaGiaiQuyet = DaGiaiQuyet;
            this.ChuaGiaiQuyet = ChuaGiaiQuyet;
            Data = new List<Data>();
            Data.Add(new Data("Trong kỳ", TrongKy));
            Data.Add(new Data("Cùng kỳ", CungKy));
            Data.Add(new Data("Đã xử lý", DaXuLy));
            Data.Add(new Data("Đã giải quyết", DaGiaiQuyet));
            Data.Add(new Data("Chưa giải quyết", ChuaGiaiQuyet));
        }
    }

}
