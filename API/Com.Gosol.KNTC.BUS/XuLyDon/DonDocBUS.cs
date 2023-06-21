using Com.Gosol.KNTC.DAL.DanhMuc;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workflow;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class DonDocBUS
    {
        private DonDocDAL DonDocDAL;
        public DonDocBUS()
        {
            DonDocDAL = new DonDocDAL();
        }

        public BaseResultModel DanhSachDonDoc(dk_dondoc p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.DanhSachDonDoc(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel DanhSachDonDoc_NotPaging(dk_dondocNotPaing p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.DanhSachDonDoc_NotPaging(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // get data don doc
        public BaseResultModel GetDonDocByXLDID(int? XulyDonID)
        {
            var Result = new BaseResultModel();          
            
            try
            {
                Result = DonDocDAL.GetDonDocByXLDID(XulyDonID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        //CountDanhSachDonThuCanDonDoc 
        public BaseResultModel CountDanhSachDonThuCanDonDoc(dk_dondocNotPaing p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.CountDanhSachDonThuCanDonDoc(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // THEM vbdd
        /*public BaseResultModel Insert_RaVanBanDonDoc(KetQuaInfo cInfo, ref int DonDocID)
        {
            var Result = new BaseResultModel();
            try
            {

                // thực hiện thêm mới
                Result = DonDocDAL.Insert_RaVanBanDonDoc(cInfo, ref DonDocID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }*/
        //
        public BaseResultModel UpdateNhanVanBanDonDoc(int? XulyDonID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.UpdateNhanVanBanDonDoc(XulyDonID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        /*public BaseResultModel InsertFileDonDoc(FileHoSoInfo info, ref int FileHoSoID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.InsertFileDonDoc(info, ref FileHoSoID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }*/
        //UpdateCQNhanVBDonDoc(int XuLyDonID, int CQNhanVanBanDonDoc)
        public BaseResultModel UpdateCQNhanVBDonDoc(int XuLyDonID, int CQNhanVanBanDonDoc)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.UpdateCQNhanVBDonDoc(XuLyDonID, CQNhanVanBanDonDoc);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        public BaseResultModel DS_HuongGiaiQuyet(ThamSoLocDanhMuc p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DonDocDAL.DS_HuongGiaiQuyet(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        public BaseResultModel DuyetVBDD (DTDuyeDonDoc thamSo, DTDuyetDonDocClaims claims)
        {
            var Result = new BaseResultModel();
            const int CHUYENDON_GUIVBDONDOC = 6;
            bool kq = false;

            TimeSpan duration = (TimeSpan)(thamSo.NgayQuaHan == null ? new TimeSpan() : thamSo.NgayQuaHan - DateTime.Now);


            int canboID = claims.CanBoID;
            try
            {
                if (RoleInstance.IsLanhDao(claims.RoleID))
                {
                    if (thamSo.Check == true || duration.Days < 0)
                    {
                        bool CheckIsDeXuatThuLy = DonDocDAL.CheckIsHuongGiaiQuyetDD(thamSo.XuLyDonID, Constant.DeXuatThuLy);
                        string commandCode = "";
                        if (CheckIsDeXuatThuLy)
                        {
                            commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[0];
                            DateTime NgayThuLy = DateTime.Now;

                            DonDocDAL.UpdateNgayThuLy(thamSo.XuLyDonID, NgayThuLy);



                            DocumentInfo dCInfo = new DonThuDAL().GetDocumentByID(thamSo.XuLyDonID);

                            kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, claims.CanBoID, commandCode, DateTime.Now.AddDays(45), "Hủy bỏ");
                        }
                        else
                        {
                            TiepDanInfo info = new TiepDanInfo();
                            info = DonDocDAL.GetXuLyDonByXLDID(thamSo.XuLyDonID);
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

                                if (kq)
                                {
                                    /*if (suDungQTVanThuTiepDan == false)
                                    {
                                        new ChuyenXu
                                    }*/
                                }
                            }
                            else if (info.HuongGiaiQuyetID == vBDonDoc || info.HuongGiaiQuyetID == cVChiDao)
                            {
                                if (suDungQTVanThuTiepDan)
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[6];
                                else
                                    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[CHUYENDON_GUIVBDONDOC];

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
                        DonDocDAL.UpDateState(thamSo.XuLyDonID, 4);
                    }
                    Result.Status = 1;
                    Result.Message = "Đã duyệt ";
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
