using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Model.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.BUS.KNTC
{
    public class ChiTietDonThuTiepDanBUS
    {
        private ChiTietDonThuTiepDanDAL ChiTietDonThuTiepDanDAL;
        private DonThuDAL donThuDAL;
        private DoiTuongBiKNJoinDAL doiTuongBiKNJoin;
        private DoiTuongKNDAL doiTuongKNDAL;
        public ChiTietDonThuTiepDanBUS()
        {
            ChiTietDonThuTiepDanDAL = new ChiTietDonThuTiepDanDAL();
            donThuDAL = new DonThuDAL();
            doiTuongBiKNJoin = new DoiTuongBiKNJoinDAL();
            doiTuongKNDAL = new DoiTuongKNDAL();
        }

        
        // All_IdTiepDan(int? TiepDanKhongDonID)
        public BaseResultModel All_IdTiepDan(int CaNhanBiKNID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = ChiTietDonThuTiepDanDAL.GetDoiTuongBiKN1(CaNhanBiKNID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel DetailTiepDan(int DonThuID)
        {
            var Result = new BaseResultModel();
            try
            {
                ChiTietDonThuTiepDanMOD DetailTiepDan = new ChiTietDonThuTiepDanMOD();
                try
                {
                    DetailTiepDan.TiepDanKhongDon = new ChiTietDonThuTiepDanDAL().GetTiepDanKhongDonID(DonThuID).ToList();
                    DetailTiepDan.XuLyDon = new ChiTietDonThuTiepDanDAL().GetXuLyDonID(DonThuID).ToList();
                    DetailTiepDan.DonThu = new ChiTietDonThuTiepDanDAL().GetDonThu(DonThuID).ToList();
                    DetailTiepDan.NhomKN = new ChiTietDonThuTiepDanDAL().GetNhomKN(DonThuID).ToList();
                    DetailTiepDan.DoiTuongKN = new ChiTietDonThuTiepDanDAL().GetDoiTuongKN(DonThuID).ToList();
                    DetailTiepDan.NhomDoiTuongBiKN = new ChiTietDonThuTiepDanDAL().GetDoiTuongBiKN(DonThuID).ToList();
                   

                }
                catch 
                {
                    Result.Status = -1;
                    Result.Message = "Lỗi hệ thống";
                }
                Result.Status = 1;
                Result.Message = "Chi tiết đơn thư tiếp dân";
                Result.Data = DetailTiepDan;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }
    }
}
