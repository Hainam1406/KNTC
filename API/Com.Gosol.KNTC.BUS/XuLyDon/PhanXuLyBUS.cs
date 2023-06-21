using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Workflow;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class PhanXuLyBUS
    {
        private PhanXuLyDAL PhanXuLyDAL;
        public PhanXuLyBUS()
        {
            PhanXuLyDAL = new PhanXuLyDAL();
        }

        public BaseResultModel DTCanPhanXL_LanhDao(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = PhanXuLyDAL.DTCanPhanXL_LanhDao(p);
            }
            catch (Exception ex) 
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        public BaseResultModel Count_DTCanPhanXL_LanhDao(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = PhanXuLyDAL.Count_DTCanPhanXL_LanhDao(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // DTCanPhanXL_TruongPhong
        public BaseResultModel DTCanPhanXL_TruongPhong(paramPhanXuLy p )
        {
            var Result = new BaseResultModel();
            try
            {
                Result = PhanXuLyDAL.DTCanPhanXL_TruongPhong(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // Count_DTCanPhanXL_TruongPhong(paramPhanXuLy p)
        public BaseResultModel Count_DTCanPhanXL_TruongPhong(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = PhanXuLyDAL.Count_DTCanPhanXL_TruongPhong(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // insert phan suly
        public BaseResultModel InsertPhanXuLy(FileHoSo info, PhanXuLyClaims claims)
        {
            var Result = new BaseResultModel();
            int yKienXuLy = 0;

            try
            {
                if (RoleInstance.IsLanhDao(claims.RoleID) || RoleInstance.IsTruongPhong(claims.RoleID))
                {
                    yKienXuLy = PhanXuLyDAL.InsertPhanXuLy(info, claims);

                    if (yKienXuLy > 0)
                    {
                        Result.Status = 1;
                        Result.Message = "Thêm thành công";
                    }
                    else
                    {
                        Result.Status = -1;
                        Result.Message = "Thêm không thành công";
                    }

                }
                else
                {
                    Result.Status = -99;
                    Result.Message = "Bạn không có quyền";
                }
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        // ThemMoiPhanXuLyFile(FileHoSo info)
        public BaseResultModel ThemMoiPhanXuLyFile(FileHoSo info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = PhanXuLyDAL.ThemMoiPhanXuLyFile(info);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        public BaseResultModel DuyetPhanXuLy(DTDuyetKQXuLyMOD thamSo, DTDuyetKQXuLyClaims claims)
        {
            var Result = new BaseResultModel();
            const int DuyetKQxuly = 6;
            bool kq = false;

            TimeSpan duration = (TimeSpan)(thamSo.NgayQuaHan == null ? new TimeSpan() : thamSo.NgayQuaHan - DateTime.Now);


            int canboID = claims.CanBoID;
            try
            {
                if (RoleInstance.IsLanhDao(claims.RoleID))
                {
                    if (thamSo.Check == true || duration.Days < 0)
                    {
                        bool CheckIsDeXuatThuLy = PhanXuLyDAL.CheckIsHuongGiaiQuyet(thamSo.XuLyDonID, Constant.DeXuatThuLy);
                        string commandCode = "";
                        if (CheckIsDeXuatThuLy)
                        {
                            commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[0];
                            DateTime NgayThuLy = DateTime.Now;

                            PhanXuLyDAL.UpdateNgayThuLy(thamSo.XuLyDonID, NgayThuLy);



                            DocumentInfo dCInfo = new DonThuDAL().GetDocumentByID(thamSo.XuLyDonID);

                            kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, claims.CanBoID, commandCode, DateTime.Now.AddDays(45), "Hủy bỏ");
                        }
                        else
                        {
                            TiepDanInfo info = new TiepDanInfo();
                            info = PhanXuLyDAL.GetXuLyDonByXLDID(thamSo.XuLyDonID);
                            int chuyenDon = (int)HuongGiaiQuyetEnum.ChuyenDon;
                            int vBDonDoc = (int)HuongGiaiQuyetEnum.RaVanBanDonDoc;
                            int cVChiDao = (int)HuongGiaiQuyetEnum.CongVanChiDao;
                            bool suDungQTVanThuTiepDan = claims.QTVanThuTiepDan;

                            if (info.HuongGiaiQuyetID == chuyenDon)
                            {
                                TiepDanInfo xldInfo = info;

                                DateTime NgayChuyen = DateTime.Now;
                                if (suDungQTVanThuTiepDan)
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[6];
                                else
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[3];

                                kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, canboID, commandCode, NgayChuyen, "");

                            }
                            else if (info.HuongGiaiQuyetID == vBDonDoc || info.HuongGiaiQuyetID == cVChiDao)
                            {
                                if (suDungQTVanThuTiepDan)
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[6];
                                else
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[DuyetKQxuly];

                                kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, canboID, commandCode, DateTime.Now, "");

                            }
                            else
                            {
                                commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[3];
                                kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, canboID, commandCode, DateTime.Now, "");
                            }
                        }
                    }
                    else
                    {
                        PhanXuLyDAL.UpDateState(thamSo.XuLyDonID, 4);
                    }
                    Result.Status = 1;
                    Result.Message = "Duyệt thành công";
                }
                else
                {
                    Result.Status = -98;
                    Result.Message = "Bạn không có quyền";
                }
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
