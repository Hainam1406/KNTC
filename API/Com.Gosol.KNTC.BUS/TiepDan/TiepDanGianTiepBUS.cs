using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.DAL.DanhMuc;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Spire.Doc.Documents.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Workflow;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Com.Gosol.KNTC.BUS.TiepDan
{
    public class TiepDanGianTiepBUS
    {
        private TiepDanGianTiepDAL TiepDanGianTiepDAL;
        public TiepDanGianTiepBUS()
        {
            TiepDanGianTiepDAL = new TiepDanGianTiepDAL();
        }

        public BaseResultModel ThemMoiTiepDan(TiepDanGianTiepMOD item, TiepDanClaims tiepDanClaims)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                // validate data
                if (item == null)
                {
                    Result.Status = 0;
                    Result.Message = "Vui lòng nhập thông tin cần thêm!";
                    return Result;
                }
                else if (item.DoiTuongKN[i].HoTen == null || string.IsNullOrEmpty(item.DoiTuongKN[i].HoTen))
                {
                    Result.Status = 0;
                    Result.Message = "Họ tên không được để trống";
                    return Result;
                }
                else if (item.TiepNhanDT[i].SoDonThu == null || string.IsNullOrEmpty(item.TiepNhanDT[i].SoDonThu))
                {
                    Result.Status = 0;
                    Result.Message = "Số thứ tự hồ sơ không được để trống";
                    return Result;
                }
                /*else if (item.TiepNhanDT[i].NgayNhapDon == null)
                {

                }*/
                else if (item.TiepNhanDT[i].NguonDonDen == null || item.TiepNhanDT[i].NguonDonDen < 0)
                {
                    Result.Status = 0;
                    Result.Message = "Nguồn đơn đến không được để trống";
                    return Result;
                }
                else if (item.TiepNhanDT[i].CQChuyenDonDenID == null || item.TiepNhanDT[i].CQChuyenDonDenID < 0)
                {
                    Result.Status = 0;
                    Result.Message = "Cơ quan chuyển đến không được để trống";
                    return Result;
                }


                i++;
                // Thực hiện thêm mới
                int NhomKNID = 0;
                int DoiTuongBiKNID = 0;
                int DonThuID = 0;
                int XuLyDonID = 0;
                NhomKNID = TiepDanGianTiepDAL.ThemMoiNhomKN(item).Status;
                int dt = 0;
                List<DoiTuongKNInfo> DoiTuong = item.DoiTuongKN;
                if (item.DoiTuongBiKN[0].CheckAdd == true)
                {
                    DoiTuongBiKNID = TiepDanGianTiepDAL.ThemMoiDoiTuongBiKN(item).Status;
                }
                if (NhomKNID != 0)
                {
                    foreach (var info in DoiTuong)
                    {
                        DoiTuong[dt].NhomKNID = NhomKNID;
                        Result = TiepDanGianTiepDAL.ThemMoiDoiTuongKN(DoiTuong);
                    }
                }

                List<DonThuMOD> DonThu = item.DonThu;
                int kn = 0;
                if (DoiTuongBiKNID != 0)
                {
                    List<CaNhanBiKN> CaNhanBiKN = item.CaNhanBiKN;
                    CaNhanBiKN[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].NhomKNID = NhomKNID;
                    Result = TiepDanGianTiepDAL.ThemMoiCaNhanBiKN(CaNhanBiKN);
                    DonThuID = TiepDanGianTiepDAL.ThemMoiDonThu(DonThu).Status;
                }
                else
                {
                    DonThu[kn].DoiTuongBiKNID = null;
                    DonThu[kn].NhomKNID = NhomKNID;
                    DonThuID = TiepDanGianTiepDAL.ThemMoiDonThu(DonThu).Status;
                }

                int tn = 0;
                List<ThongTinTiepNhanDT> TiepNhanDT = item.TiepNhanDT;
                if (DonThuID != 0)
                {
                    TiepNhanDT[tn].DonThuID = DonThuID;
                    XuLyDonID = TiepDanGianTiepDAL.ThemMoiTiepNhanDT(TiepNhanDT).Status;
                    
                }

                if (item.themMoiFileHoSo[0].CheckFile == true)
                {
                    List<FileHoSoMOD> ListFile = item.themMoiFileHoSo;
                    
                    foreach (var file in ListFile)
                    {
                        file.DonThuID = DonThuID;
                        file.XuLyDonID = XuLyDonID;
                        Result = TiepDanGianTiepDAL.ThemMoiFileHoSo(file);
                    }
                    
                }

                WorkflowInstance.Instance.AttachDocument(XuLyDonID, "XuLyDon", tiepDanClaims.NguoiDungID, DateTime.Now);

                //XuLyDonInfo xulydonInfo = new XuLyDonInfo();
                
                if (!tiepDanClaims.SuDungQuyTrinh)
                {
                    #region == quy trinh don gian
                    int ThuLy = 4;
                    int KetThuc = 5;

                    int huongXL = 0;
                    int raVBDonDoc = (int)HuongGiaiQuyetEnum.RaVanBanDonDoc;
                    int cVanChiDao = (int)HuongGiaiQuyetEnum.CongVanChiDao;

                    var stateName = WorkflowInstance.Instance.GetCurrentStateOfDocument(XuLyDonID);
                    /*if (stateName == Constant.CV_TiepNhan)
                    {
                        if (xulydonInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.ChuyenDon)
                        {
                            ChuyenDon(xulydonInfo);
                        }
                    }*/

                    /*if (stateName == Constant.Ket_Thuc || stateName == Constant.LD_Phan_GiaiQuyet)
                    {

                        int nhomKNID = InsertChuDon();
                        int donthuID = InsertDonThu(nhomKNID);
                    }*/
                    if (stateName == Constant.CV_TiepNhan)
                    {
                        new XuLyDonDAL().UpdateCanBoTiepNhan(XuLyDonID, tiepDanClaims.CanBoID);

                        List<string> commandList = WorkflowInstance.Instance.GetAvailabelCommands(XuLyDonID);
                        string command = string.Empty;

                        bool isDeXuatThuLy = false;
                        if (TiepNhanDT[tn].HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.DeXuatThuLy) isDeXuatThuLy = true;

                        if (isDeXuatThuLy)
                        {
                            if (DonThu[kn].LoaiKhieuTo1ID == Constant.TranhChap && tiepDanClaims.CapID == (int)CapQuanLy.CapUBNDXa)
                            {
                                command = commandList.Where(x => x.ToString() == "TiepDanKetThuc").FirstOrDefault();
                            }
                            else
                            {
                                command = commandList.Where(x => x.ToString() == "TiepDanThuLy").FirstOrDefault();
                            }
                        }
                        else
                        {
                            if (huongXL == cVanChiDao || huongXL == raVBDonDoc)
                            {
                                command = commandList.Where(x => x.ToString() == "ChuyenDonHoacGuiVBDonDoc").FirstOrDefault();
                            }
                            else
                            {
                                command = commandList.Where(x => x.ToString() == "TiepDanKetThuc").FirstOrDefault();
                            }

                        }

                        WorkflowInstance.Instance.ExecuteCommand(XuLyDonID, tiepDanClaims.CanBoID, command, DateTime.Now.AddDays(10), string.Empty);
                    }

                    #endregion
                }
                if (Result.Status < 0)
                {
                    Result.Status = -1;
                    Result.Message = Constant.ERR_INSERT;
                }
                else
                {
                    Result.Status = 1;
                    Result.Message = "Thêm mới thành công!";
                }



            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel DanhSachLoaiDoiTuongKN()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.DanhSachLoaiDoiTuongKN();
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel GetDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? TotalRow)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.GetDonTrung(hoTen, cmnd, diachi, noidungdon, TotalRow);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel CheckSoDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? toCao, int? coQuanID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.CheckSoDonTrung(hoTen, cmnd, diachi, noidungdon, toCao, coQuanID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public int CoundTrungDon(int donthuID)
        {
            //var Result = new BaseResultModel();
            //try
            //{
            return TiepDanGianTiepDAL.CoundTrungDon(donthuID);
            //}
            /*catch (Exception ex)
            {
                *//*Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;*//*
            }*/
            //return result;
        }

        public BaseResultModel GetCTTrungDonByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.GetCTTrungDonByDonID(donthuID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel GetKhieuToLan2(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? stateID, int? TotalRow)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.GetKhieuToLan2(hoTen, cmnd, diachi, noidungdon, stateID, TotalRow);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public int CountSoLanGQ(int? donthuID, int? stateID)
        {
            //var Result = new BaseResultModel();
            /*try
            {*/
            return TiepDanGianTiepDAL.CountSoLanGQ(donthuID, stateID);
            /*}
            catch (Exception ex)
            {*/
            /*Result.Status = -1;
            Result.Message = ex.ToString();
            Result.Data = null;*/
            //}
            //return Result;
        }

        public BaseResultModel GetCTKhieuToLan2ByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.GetCTKhieuToLan2ByDonID(donthuID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel CapNhatTiepDan(TiepDanGianTiepMOD item, TiepDanClaims tiepDanClaims)
        {
            var Result = new BaseResultModel();
            try
            {
                int DoiTuongBiKNID = item.DoiTuongBiKN[0].DoiTuongBiKNID;
                int DonThuID = item.DonThu[0].DonThuID;
                int XuLyDonID = item.TiepNhanDT[0].XuLyDonID;
                int FileHoSoID = item.themMoiFileHoSo[0].FileHoSoID;
                List<ThongTinTiepNhanDT> TiepNhanDT = item.TiepNhanDT;
                List<DonThuMOD> DonThu = item.DonThu;
                List<CaNhanBiKN> CaNhanBiKN = item.CaNhanBiKN;
                int kn = 0;

                Result = TiepDanGianTiepDAL.CapNhatTiepNhanDT(TiepNhanDT);
                Result = TiepDanGianTiepDAL.CapNhatDoiTuongKN(item);
                Result = TiepDanGianTiepDAL.CapNhatNhomKN(item);

                if (item.DoiTuongBiKN[0].CheckAdd == true && DoiTuongBiKNID == 0)
                {
                    DoiTuongBiKNID = TiepDanGianTiepDAL.ThemMoiDoiTuongBiKN(item).Status;

                    CaNhanBiKN[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    Result = TiepDanGianTiepDAL.ThemMoiCaNhanBiKN(CaNhanBiKN);
                    Result = TiepDanGianTiepDAL.CapNhatDonThu(DonThu);
                }


                if (item.DoiTuongBiKN[0].CheckAdd == true && DoiTuongBiKNID != 0)
                {
                    Result = TiepDanGianTiepDAL.CapNhatDoiTuongBiKN(item);
                    Result = TiepDanGianTiepDAL.CapNhatCaNhanBiKN(CaNhanBiKN);
                    Result = TiepDanGianTiepDAL.CapNhatDonThu(DonThu);
                }
                else
                {
                    //DonThu[kn].DoiTuongBiKNID = null;
                    Result = TiepDanGianTiepDAL.CapNhatDonThu(DonThu);
                }


                if (item.themMoiFileHoSo[0].CheckFile == true && FileHoSoID == 0)
                {
                    List<FileHoSoMOD> ListFile = item.themMoiFileHoSo;

                    foreach (var file in ListFile)
                    {
                        file.DonThuID = DonThuID;
                        file.XuLyDonID = XuLyDonID;
                        Result = TiepDanGianTiepDAL.ThemMoiFileHoSo(file);
                    }

                }

                    //WorkflowInstance.Instance.AttachDocument(XuLyDonID, "XuLyDon", tiepDanClaims.NguoiDungID, DateTime.Now);

                if (Result.Status < 0)
                {
                    Result.Status = -1;
                    Result.Message = Constant.ERR_UPDATE;
                }
                else
                {
                    Result.Status = 1;
                    Result.Message = "Cập nhật thành công!";
                }
                //Result = TiepDanGianTiepDAL.CapNhatDonThu(item);
                //Result = TiepDanGianTiepDAL.CapNhatDoiTuongBiKN(item);
                //Result = TiepDanGianTiepDAL.CapNhatCaNhanBiKN(item);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel GetSoDonThu(int coQuanID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanGianTiepDAL.GetSoDonThu(coQuanID);
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
