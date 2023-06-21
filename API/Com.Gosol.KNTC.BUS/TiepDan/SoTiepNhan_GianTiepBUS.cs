using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.TiepDan;
using System;
using System.Data.SqlClient;

namespace Com.Gosol.KNTC.BUS.TiepDan
{
    public class SoTiepNhan_GianTiepBUS
    {
        private SoTiepNhan_GianTiepDAL _soTiepNhan_GianTiepDAL;
        public SoTiepNhan_GianTiepBUS()
        {
            _soTiepNhan_GianTiepDAL = new SoTiepNhan_GianTiepDAL();
        }

        public BaseResultModel DanhSach(SoTiepNhanParams thamSo, SoTiepNhanClaims info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTiepNhan_GianTiepDAL.DanhSach(thamSo, info);
            }
            catch (Exception ex)
            {
                
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel DS_CoQuan()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTiepNhan_GianTiepDAL.DS_CoQuan();
            }
            catch (Exception ex)
            {
                
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel Delete_DonThuDaTiepNhan(SoTiepNhan_GianTiepMOD thamSo)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTiepNhan_GianTiepDAL.Delete_DonThuDaTiepNhan(thamSo);
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
