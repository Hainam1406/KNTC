using Com.Gosol.KNTC.DAL.DanhMuc;
using Com.Gosol.KNTC.DAL.HeThong;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.BUS.TiepDan
{
    public class TiepDanTrucTiepBUS
    {
        private TiepDanTrucTiepDAL TiepDanTrucTiepDAL;
        public TiepDanTrucTiepBUS()
        {
            TiepDanTrucTiepDAL = new TiepDanTrucTiepDAL();
        }

        public BaseResultModel ThemMoiTiepDan(TiepDanTrucTiepMOD item )
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
                else if (item.XuLyDon[i].SoDonThu == null || string.IsNullOrEmpty(item.XuLyDon[i].SoDonThu))
                {
                    Result.Status = 0;
                    Result.Message = "Số thứ tự hồ sơ không được để trống";
                    return Result;
                }
                else if (item.TiepDanKhongDon[i].NoiDungTiep == null || string.IsNullOrEmpty(item.TiepDanKhongDon[i].NoiDungTiep))
                {
                    Result.Status = 0;
                    Result.Message = "Nội dung tiếp không được để trống";
                    return Result;
                }

                i++;
                // Thực hiện thêm mới
                int NhomKNID = 0;
                int DoiTuongBiKNID = 0;
                int DonThuID = 0;
                int XuLyDonID = 0;
                int TiepDanKhongDonID = 0;
                NhomKNID = TiepDanTrucTiepDAL.ThemMoiNhomKN(item).Status;             
                List<TiepDanKhongDonMOD> TiepDanKhongDon = item.TiepDanKhongDon;
                if (item.DoiTuongBiKN[0].CheckAdd == true)
                {
                    DoiTuongBiKNID = TiepDanTrucTiepDAL.ThemMoiDoiTuongBiKN(item).Status;
                }
                if (NhomKNID != 0)
                {
                    int dt = 0;
                    List<DoiTuongKNMOD> DoiTuong = item.DoiTuongKN;
                    DoiTuong[dt].NhomKNID = NhomKNID;
                    TiepDanKhongDon[dt].NhomKNID = NhomKNID;
                    Result = TiepDanTrucTiepDAL.InsertDoiTuongKN(DoiTuong);

                }

                List<DonThuMod> DonThu = item.DonThu;

                int kn = 0;
                if (DoiTuongBiKNID != 0)
                {
                    List<CaNhanBiKNMOD> CaNhanBiKN = item.CaNhanBiKN;
                    CaNhanBiKN[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].NhomKNID = NhomKNID;
                    TiepDanKhongDon[kn].NhomKNID = NhomKNID;
                    TiepDanKhongDon[kn].DonThuID = DonThuID;
                    Result = TiepDanTrucTiepDAL.ThemMoiCaNhanBiKN(CaNhanBiKN);
                    DonThuID = TiepDanTrucTiepDAL.ThemMoiDonThu(DonThu).Status;

                }
                else
                {
                    DonThu[kn].DoiTuongBiKNID = null;
                    DonThu[kn].NhomKNID = NhomKNID;
                    TiepDanKhongDon[kn].NhomKNID = NhomKNID;
                    TiepDanKhongDon[kn].DonThuID = DonThuID;
                    DonThuID = TiepDanTrucTiepDAL.ThemMoiDonThu(DonThu).Status;

                }

                int tn = 0;
                List<XuLyDonMOD> XuLyDon = item.XuLyDon;
                
                if (DonThuID != 0)
                {                   
                    XuLyDon[tn].DonThuID = DonThuID;
                    XuLyDonID = TiepDanTrucTiepDAL.ThemMoiXuLyDon(XuLyDon).Status;
                   
                }
                int xl = 0;
                List<ThanhPhanThamGiaMOD> thanhPhanThamGiaMODs = item.ThanhPhanThamGia;
                if (XuLyDonID != 0)
                {
                   
                    TiepDanKhongDon[tn].DonThuID = DonThuID;
                    TiepDanKhongDon[kn].NhomKNID = NhomKNID;
                    TiepDanKhongDon[kn].XuLyDonID = XuLyDonID;
                    TiepDanKhongDonID = TiepDanTrucTiepDAL.ThemMoiTiepDanKhongDon(TiepDanKhongDon).Status;
                    //TiepDanKhongDonID = TiepDanTrucTiepDAL.Insert_ThanhPhanTG(thanhPhanThamGiaMODs).Status;

                }
                if (item.themMoiFile[0].CheckFile1 == true)
                {
                    List<FileHoSoMod> fileHoSos = item.themMoiFile;
                    foreach (var file in fileHoSos)
                    {
                        file.DonThuID = DonThuID;
                        file.XuLyDonID = XuLyDonID;
                        Result = TiepDanTrucTiepDAL.ThemMoiFileHoSo(file);
                    }
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
        // update
        /*public BaseResultModel CapNhatTiepDan(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {

                Result = TiepDanTrucTiepDAL.UpdateCaNhanBiKN(item);
                Result = TiepDanTrucTiepDAL.UpdateXuLyDon(item);
                Result = TiepDanTrucTiepDAL.UpdateDonThu(item);
                Result = TiepDanTrucTiepDAL.UpdateNhomKN(item);
                Result = TiepDanTrucTiepDAL.UpdateDoiTuongBiKN(item);
                Result = TiepDanTrucTiepDAL.UpdateDoiTuongKN(item);
                Result = TiepDanTrucTiepDAL.UpdateTiepDanKhongDon(item);
                if (Result.Status < 0)
                {
                    Result.Status = -1;
                    Result.Message = Constant.ERR_UPDATE;
                }
                else
                {
                    Result.Status = 1;
                    Result.Message = "Update thành công!";
                }
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }*/
        public BaseResultModel CapNhatTiepDan(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int DoiTuongBiKNID = item.DoiTuongBiKN[0].DoiTuongBiKNID;
                int DonThuID = item.DonThu[0].DonThuID;
                int XuLyDonID = item.XuLyDon[0].XuLyDonID;
                int FileHoSoID = item.themMoiFile[0].FileHoSoID;
                List<XuLyDonMOD> XuLyDon = item.XuLyDon;
                List<DonThuMod> DonThu = item.DonThu;
                List<CaNhanBiKNMOD> CaNhanBiKN = item.CaNhanBiKN;
                int kn = 0;

                Result = TiepDanTrucTiepDAL.UpdateXuLyDon(XuLyDon);
                Result = TiepDanTrucTiepDAL.UpdateDoiTuongKN(item);
                Result = TiepDanTrucTiepDAL.UpdateNhomKN(item);
                Result = TiepDanTrucTiepDAL.UpdateTiepDanKhongDon(item);

                if (item.DoiTuongBiKN[0].CheckAdd == true && DoiTuongBiKNID == 0)
                {
                    DoiTuongBiKNID = TiepDanTrucTiepDAL.ThemMoiDoiTuongBiKN(item).Status;

                    CaNhanBiKN[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    DonThu[kn].DoiTuongBiKNID = DoiTuongBiKNID;
                    Result = TiepDanTrucTiepDAL.ThemMoiCaNhanBiKN(CaNhanBiKN);
                    Result = TiepDanTrucTiepDAL.UpdateDonThu(DonThu);
                }


                if (item.DoiTuongBiKN[0].CheckAdd == true && DoiTuongBiKNID != 0)
                {
                    Result = TiepDanTrucTiepDAL.UpdateDoiTuongBiKN(item);
                    Result = TiepDanTrucTiepDAL.UpdateCaNhanBiKN(CaNhanBiKN);
                    Result = TiepDanTrucTiepDAL.UpdateDonThu(DonThu);
                }
                else
                {
                    DonThu[kn].DoiTuongBiKNID = null;
                    Result = TiepDanTrucTiepDAL.UpdateDonThu(DonThu);
                }


                if (item.themMoiFile[0].CheckFile1 == true && FileHoSoID == 0)
                {
                    List<FileHoSoMod> ListFile = item.themMoiFile;

                    foreach (var file in ListFile)
                    {
                        file.DonThuID = DonThuID;
                        file.XuLyDonID = XuLyDonID;
                        Result = TiepDanTrucTiepDAL.ThemMoiFileHoSo(file);
                    }

                }

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
                Result = TiepDanTrucTiepDAL.GetSoDonThu(coQuanID);
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
                Result = TiepDanTrucTiepDAL.DanhSachLoaiDoiTuongKN();
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        // 
        public BaseResultModel DanhSachLoaiDoiTuongBiKN()
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.DanhSachLoaiDoiTuongBiKN();
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // dan khong den
        public BaseResultModel Insert_TiepDan_DanKhongDen(Insert_TiepDan_DanKhongDenMOD item)
        {
            var Result = new BaseResultModel();
            try
            {

                if (item == null)
                {
                    Result.Status = 0;
                    Result.Message = "Vui lòng nhập thông tin cần thêm!";
                    return Result;
                }


                Result = TiepDanTrucTiepDAL.Insert_TiepDan_DanKhongDen(item);
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
            
            return TiepDanTrucTiepDAL.CountSoLanGQ(donthuID, stateID);
           
        }

        // check trung 
        public BaseResultModel CheckTrung(CheckTrungDonHoTen  p, int? TotalRow)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.CheckTrung(p, TotalRow);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // check khieu to lan 2
        public BaseResultModel CheckhieuToLan2(CheckKhieuToLan2  p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.CheckKhieuToLan2(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // dem so đơn trùng
        public BaseResultModel DemSoDonTrung(DemDonTrung p)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.DemSoDonTrung(p);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // STT
        public BaseResultModel STT(int CoQuanID )
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.STT(CoQuanID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
        // KhieuToLan2ByDonID
        public BaseResultModel KhieuToLan2ByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = TiepDanTrucTiepDAL.KhieuToLan2ByDonID(donthuID);
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
