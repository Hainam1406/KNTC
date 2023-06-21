using Com.Gosol.KNTC.DAL.DanhMuc;
using Com.Gosol.KNTC.DAL.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.HeThong;
using System;
using System.Collections.Generic;
using System.Text;

namespace Com.Gosol.KNTC.BUS.HeThong
{
    public class QuanTriDuLieuBUS
    {
        private QuanTriDuLieuDAL _QuanTriDuLieuDAL;
        public QuanTriDuLieuBUS()
        {
            _QuanTriDuLieuDAL = new QuanTriDuLieuDAL();
        }
        public int BackupData(string fileName, string filePath)
        {
            return _QuanTriDuLieuDAL.BackupData(fileName, filePath);
        }

        public int RestoreDatabase(string fileName, string filePath)
        {
            return _QuanTriDuLieuDAL.RestoreData(fileName, filePath);
        }

        public List<QuanTriDuLieuModel> GetFileInDerectory()
        {
            return _QuanTriDuLieuDAL.GetFileInDerectory();
        }


        public BaseResultModel WirteFile(string ThaoTac, string ThoiGian, string NguoiThucHien, string filePath)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _QuanTriDuLieuDAL.WirteFile(ThaoTac, ThoiGian, NguoiThucHien, filePath);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        /*public BaseResultModel ReadFile()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _QuanTriDuLieuDAL.ReadFile();
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }*/

        public BaseResultModel ReadFileTXT(string filePath)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _QuanTriDuLieuDAL.ReadFileTXT(filePath);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel TimKiem(string? Keyword, string filePath)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _QuanTriDuLieuDAL.TimKiem(Keyword, filePath);
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
