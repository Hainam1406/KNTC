using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.DAL.TiepDan;
using System.Security.Claims;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.DAL.KNTC;
using Workflow;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class DTDuyetKQXuLyBUS
    {
        private readonly DTDuyetKQXuLyDAL _duyetKQXuLyDAL;

        public DTDuyetKQXuLyBUS()
        {
            _duyetKQXuLyDAL = new DTDuyetKQXuLyDAL();
        }

        public BaseResultModel DanhSach(DTDuyetKQXuLyParams thamSo, DTDuyetKQXuLyClaims Info)
        {
            var Result = new BaseResultModel();
            //if (RoleInstance.IsChuyenVien(Info.RoleID))
            //{
            //    Result.Message = "Bạn không có quyền truy cập";

            //}
            try
            {
                switch (Info.RoleID)
                {
                    case (int)RoleEnum.LanhDaoDonVi:
                        Result = _duyetKQXuLyDAL.DanhSach_LanhDao(thamSo, Info);
                        break;
                    case (int)RoleEnum.LanhDaoPhong:
                        Result = _duyetKQXuLyDAL.DanhSach_TruongPhong(thamSo, Info);
                        break;
                    default:
                        Result.Status = -98;
                        Result.Message = "Người dùng không có quyền thực hiện chức năng này";
                        break;
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

        public BaseResultModel SuaKetQuaXuLyDetail(DTDuyetKQXuLyMOD thamSo, DTDuyetKQXuLyClaims claims)
        {
            var Result = new BaseResultModel();

            var yKienList = new List<DTDuyetKQXuLyMOD>();
            try
            {
                yKienList = _duyetKQXuLyDAL.GetYKienXuLy(thamSo.XuLyDonID);

                Result.Status = 1;
                Result.Message = "Thành công";
                Result.Data = new
                {
                    yKienList,
                };
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel SuaKetQuaXuLy(DTDuyetKQXuLyMOD thamSo, DTDuyetKQXuLyClaims claims)
        {
            var Result = new BaseResultModel();
            int yKienXuLy = 0;

            try
            {
                if (RoleInstance.IsLanhDao(claims.RoleID) || RoleInstance.IsTruongPhong(claims.RoleID))
                {
                    yKienXuLy = _duyetKQXuLyDAL.InsertYKienXL(thamSo, claims);

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
        public BaseResultModel DuyetKetQuaXuLy(DTDuyetKQXuLyMOD thamSo, DTDuyetKQXuLyClaims claims)
        {
            var Result = new BaseResultModel();
            const int CHUYENDON_GUIVBDONDOC = 6;
            bool kq = false;

            TimeSpan duration = (TimeSpan)(thamSo.NgayQuaHan == null ? new TimeSpan() : thamSo.NgayQuaHan - DateTime.Now);

            
            int canboID = claims.CanBoID;
            try
            {
                if (RoleInstance.IsLanhDao(claims.RoleID) )
                {
                    if (thamSo.Check == true || duration.Days < 0)
                    {
                        bool CheckIsDeXuatThuLy = _duyetKQXuLyDAL.CheckIsHuongGiaiQuyet(thamSo.XuLyDonID, Constant.DeXuatThuLy);
                        string commandCode = "";
                        if (CheckIsDeXuatThuLy)
                        {
                            commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[0];
                            DateTime NgayThuLy = DateTime.Now;

                            _duyetKQXuLyDAL.UpdateNgayThuLy(thamSo.XuLyDonID, NgayThuLy);



                            DocumentInfo dCInfo = new DonThuDAL().GetDocumentByID(thamSo.XuLyDonID);

                            kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, claims.CanBoID, commandCode, DateTime.Now.AddDays(45), "Hủy bỏ");
                        }
                        else
                        {
                            TiepDanInfo info = new TiepDanInfo();
                            info = _duyetKQXuLyDAL.GetXuLyDonByXLDID(thamSo.XuLyDonID);
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

                                //if (kq)
                                //{
                                //    if (suDungQTVanThuTiepDan == false)
                                //    {
                                //        new ChuyenXu
                                //    }
                                //}
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
                        _duyetKQXuLyDAL.UpDateState(thamSo.XuLyDonID, 4);
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

        //private void ChuyenDon(TiepDanInfo xldGocInfo)
        //{
        //    int cqNhapHoID = 0;
        //    //if (cbxNhapHo.Checked)
        //    //{
        //    //    cqNhapHoID = Utils.ConvertToInt32(ddlCoQuanNhapHo.SelectedValue, 0);
        //    //}

        //    ChuyenXuLyInfo cxlInfo = new ChuyenXuLyInfo();
        //    cxlInfo.XuLyDonID = xldGocInfo.XuLyDonID;
        //    if (cqNhapHoID != 0)
        //    {
        //        cxlInfo.CQGuiID = cqNhapHoID;
        //    }
        //    else
        //    {
        //        cxlInfo.CQGuiID = IdentityHelper.GetCoQuanID();
        //    }
        //    cxlInfo.CQNhanID = xldGocInfo.CQChuyenDonID;
        //    cxlInfo.NgayChuyen = DateTime.Now;
        //    CloneDonThuTaiCQDuocChuyenDon(cxlInfo.CQNhanID, xldGocInfo);

        //    try
        //    {
        //        new ChuyenXuLy().Insert(cxlInfo);
        //    }
        //    catch
        //    {
        //    }
        //}
    }
}