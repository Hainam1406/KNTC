using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.TiepDan;
using System;
using System.Data.SqlClient;

namespace Com.Gosol.KNTC.BUS.TiepDan
{
    public class SoTiepDanBUS
    {
        private SoTiepDanDAL _soTepDanDAL;
        public SoTiepDanBUS()
        {
            _soTepDanDAL = new SoTiepDanDAL();
        }

        public BaseResultModel DanhSach(SoTiepDanParam thamSo, SoTiepDanClaims claims)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.DanhSach(thamSo, claims);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel GetAll()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.GetAll();
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        
        public BaseResultModel DS_GapLanhDao(SoTiepDanClaims claims)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.DanhSachGapLanhDao(claims);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        
        public BaseResultModel DS_LoaiKhieuTo()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.DanhSachLoaiKhieuTo();
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel DS_DanKhongDen(TiepCongDan_DanKhongDenParam param, int CoQuanID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.DS_DanKhongDen(param, CoQuanID);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        
        public BaseResultModel GetTiepDanDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.GetTiepDanDanKhongDen(Info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        
        public BaseResultModel UpdateDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.UpdateDanKhongDen(Info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel DeleteDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.DeleteDanKhongDen(Info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel Xoa_SoTiepDan(SoTiepDanXoa param)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _soTepDanDAL.Xoa_SoTiepDan(param);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
    }
}
