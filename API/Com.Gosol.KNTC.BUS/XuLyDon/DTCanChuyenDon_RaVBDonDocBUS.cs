using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Workflow;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class DTCanChuyenDon_RaVBDonDocBUS
    {
        private DTCanChuyenDon_RaVBDonDoc DTCanChuyenDon_RaVBDonDoc;
        public DTCanChuyenDon_RaVBDonDocBUS()
        {
            DTCanChuyenDon_RaVBDonDoc = new DTCanChuyenDon_RaVBDonDoc();
        }

        
        public BaseResultModel ChuyenDon_RaVBDonDoc(QueryInfo info)
        {
            var Result = new BaseResultModel();
            List<RaVanBanDonDocMOD> donThuList = new List<RaVanBanDonDocMOD>();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.ChuyenDon_RaVBDonDoc(info);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            foreach (var donThuInfo in donThuList)
            {

                donThuInfo.SoNgayConLai = donThuInfo.NgayQuaHan.Subtract(DateTime.Now).Days;
            }

            return Result;
        }

        //CountDTCanChuyenDon_RaVBDonDoc 
        public BaseResultModel CountDTCanChuyenDon_RaVBDonDoc(QueryInfo info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.CountDTCanChuyenDon_RaVBDonDoc(info);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // GetAllCoQuanTiepNhan(int? CoQuanID)
        public BaseResultModel GetAllCoQuanTiepNhan(int? CoQuanID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.GetAllCoQuanTiepNhan(CoQuanID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // Insert_RaVanBanDonDoc
        
        public BaseResultModel InsertFileDonDoc(InforHoSo info, ref int FileHoSoID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.InsertFileDonDoc( info, ref FileHoSoID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        
        public BaseResultModel GetHuongGiaiQuyetRaVBDonDoc(string Keyword, DateTime? tuNgay, DateTime? denNgay, int start, int end, int? LoaiKhieuToID, ref int total, int? CoQuanDangNhapID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.GetHuongGiaiQuyetRaVBDonDoc( Keyword,  tuNgay,  denNgay,  start,  end,  LoaiKhieuToID, ref total,  CoQuanDangNhapID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        //Count_ListVanBanDonDoc(int HuongGiaiQuyetID, string Keyword, DateTime tuNgay, DateTime denNgay, int cQNhanVBDonDoc)
        public BaseResultModel Count_ListVanBanDonDoc(int HuongGiaiQuyetID, string Keyword, DateTime tuNgay, DateTime denNgay, int cQNhanVBDonDoc)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTCanChuyenDon_RaVBDonDoc.Count_ListVanBanDonDoc(HuongGiaiQuyetID,  Keyword,  tuNgay,  denNgay,  cQNhanVBDonDoc);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        public BaseResultModel DuyetVBDD(DTDuyeDonDoc thamSo, DTDuyetDonDocClaims claims)
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
                        bool CheckIsDeXuatThuLy = DTCanChuyenDon_RaVBDonDoc.CheckIsHuongGiaiQuyetDD(thamSo.XuLyDonID, Constant.DeXuatThuLy);
                        string commandCode = "";
                        if (CheckIsDeXuatThuLy)
                        {
                            commandCode = WorkflowInstance.Instance.GetAvailabelCommands(thamSo.XuLyDonID)[0];
                            DateTime NgayThuLy = DateTime.Now;

                            DTCanChuyenDon_RaVBDonDoc.UpdateNgayThuLy(thamSo.XuLyDonID, NgayThuLy);



                            DocumentInfo dCInfo = new DonThuDAL().GetDocumentByID(thamSo.XuLyDonID);

                            kq = WorkflowInstance.Instance.ExecuteCommand(thamSo.XuLyDonID, claims.CanBoID, commandCode, DateTime.Now.AddDays(45), "Hủy bỏ");
                        }
                        else
                        {
                            TiepDanInfo info = new TiepDanInfo();
                            info = DTCanChuyenDon_RaVBDonDoc.GetXuLyDonByXLDID(thamSo.XuLyDonID);
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
                        DTCanChuyenDon_RaVBDonDoc.UpDateState(thamSo.XuLyDonID, 4);
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
