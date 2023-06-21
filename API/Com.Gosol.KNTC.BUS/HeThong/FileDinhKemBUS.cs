using Com.Gosol.KNTC.DAL.HeThong;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Ultilities;

namespace Com.Gosol.KNTC.BUS.HeThong
{ 
    public class FileDinhKemBUS
    {
        private FileDinhKemDAL _FileDinhKemDAL;
        public FileDinhKemBUS()
        {
            this._FileDinhKemDAL = new FileDinhKemDAL();
        }
        public BaseResultModel Delete(List<FileDinhKemModel> ListFileDinhKem)
        {
            return _FileDinhKemDAL.Delete(ListFileDinhKem);
        }
     
        public FileDinhKemModel GetByID(int FileDinhKemID, int FileType)
        {
            return _FileDinhKemDAL.GetByID(FileDinhKemID, FileType);
        }

        public List<FileDinhKemModel> GetByNgiepVuID(int NghiepVuID, int FileType)
        {
            return _FileDinhKemDAL.GetByNgiepVuID(NghiepVuID, FileType);
        }

        public BaseResultModel Insert(FileDinhKemModel FileDinhKemModel)
        {
            BaseResultModel baseResultModel = new BaseResultModel();
            FileLogInfo infoFileLog = new FileLogInfo();
            infoFileLog.LoaiLog = (int)EnumLoaiLog.Them;
            infoFileLog.LoaiFile = FileDinhKemModel.FileType;
            if (FileDinhKemModel.IsBaoMat == true)
            {
                infoFileLog.IsBaoMat = true;
                infoFileLog.IsMaHoa = true;
            }
            else
            {
                infoFileLog.IsBaoMat = false;
                infoFileLog.IsMaHoa = false;
            }

            if (FileDinhKemModel.FileType == EnumLoaiFile.FileHoSo.GetHashCode())
            {
                var Result = _FileDinhKemDAL.InsertFileHoSo(FileDinhKemModel);
                var FileID = Utils.ConvertToInt32(Result.Data, 0);
                if (FileID > 0)
                {
                    infoFileLog.FileID = FileID;
                }
            }
            else if (FileDinhKemModel.FileType == EnumLoaiFile.FileDMBXM.GetHashCode())
            {
                var FileID = _FileDinhKemDAL.InsertDMBuocXacMinh(FileDinhKemModel);
                if(FileID > 0)
                {
                    infoFileLog.FileID = FileID;
                }
            }
            else if (FileDinhKemModel.FileType == EnumLoaiFile.FileBieuMau.GetHashCode() || FileDinhKemModel.FileType == EnumLoaiFile.FileHuongDanSuDung.GetHashCode())
            {
                var Result = _FileDinhKemDAL.Insert(FileDinhKemModel);
                var FileID = Utils.ConvertToInt32(Result.Data, 0);
                if (FileID > 0)
                {
                    infoFileLog.FileID = FileID; 
                }
            }
            _FileDinhKemDAL.InsertFileLog(infoFileLog);
            baseResultModel.Status = 1;
            baseResultModel.Data = infoFileLog.FileID;

            return baseResultModel;
        }

        // update file danh muc buoc xac minh
        public BaseResultModel Update(FileDinhKemModel FileDinhKemModel)
        {
            BaseResultModel baseResultModel = new BaseResultModel();
            FileLogInfo infoFileLog = new FileLogInfo();
            infoFileLog.LoaiLog = (int)EnumLoaiLog.Sua;
            infoFileLog.LoaiFile = FileDinhKemModel.FileType;
            if (FileDinhKemModel.IsBaoMat == true)
            {
                infoFileLog.IsBaoMat = true;
                infoFileLog.IsMaHoa = true;
            }
            else
            {
                infoFileLog.IsBaoMat = false;
                infoFileLog.IsMaHoa = false;
            }

            if (FileDinhKemModel.FileType == EnumLoaiFile.FileHoSo.GetHashCode())
            {

            }
            else if (FileDinhKemModel.FileType == EnumLoaiFile.FileDMBXM.GetHashCode())
            {
                var FileID = _FileDinhKemDAL.UpdateDMBuocXacMinh(FileDinhKemModel);
                if (FileID > 0)
                {
                    infoFileLog.FileID = FileID;
                }
            }
            /*else if (FileDinhKemModel.FileType == EnumLoaiFile.FileBieuMau.GetHashCode() || FileDinhKemModel.FileType == EnumLoaiFile.FileHuongDanSuDung.GetHashCode())
            {
                var Result = _FileDinhKemDAL.Insert(FileDinhKemModel);
                var FileID = Utils.ConvertToInt32(Result.Data, 0);
                if (FileID > 0)
                {
                    infoFileLog.FileID = FileID;
                }
            }*/
            _FileDinhKemDAL.InsertFileLog(infoFileLog);
            baseResultModel.Status = 1;
            baseResultModel.Data = infoFileLog.FileID;

            return baseResultModel;
        }
    }

}
