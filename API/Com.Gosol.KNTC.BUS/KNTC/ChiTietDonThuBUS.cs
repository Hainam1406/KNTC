using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Model.HeThong;
using System.Security.Cryptography.Xml;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.DAL.XuLyDon;

namespace Com.Gosol.KNTC.BUS.KNTC
{
    public class ChiTietDonThuBUS
    {
        private DonThuDAL donThuDAL;
        private DoiTuongBiKNJoinDAL doiTuongBiKNJoin;
        private DoiTuongKNDAL doiTuongKNDAL;
        public ChiTietDonThuBUS()
        {
            donThuDAL = new DonThuDAL();
            doiTuongBiKNJoin = new DoiTuongBiKNJoinDAL();
            doiTuongKNDAL = new DoiTuongKNDAL();
        }

        public BaseResultModel GetChiTietDonThu(int DonThuID, int XuLyDonID, int CanBoID)
        {
            var Result = new BaseResultModel();
            try
            {
                DonThuChiTietModel DonThuChiTiet = new DonThuChiTietModel();
                DonThuChiTiet.DonThu = donThuDAL.GetByID(DonThuID, XuLyDonID);
                int DoiTuongBiKNID = DonThuChiTiet.DonThu.DoiTuongBiKNID;
                int DoiTuongKNID = DonThuChiTiet.DonThu.DoiTuongKNID;
                DonThuChiTiet.DoiTuongBiKN = doiTuongBiKNJoin.GetByID(DoiTuongBiKNID);
                DonThuChiTiet.DoiTuongKN = doiTuongKNDAL.GetByID(DoiTuongKNID);
                #region get all file
                try
                {
                    List<FileHoSoInfo> listFile = new List<FileHoSoInfo>();
                    List<FileHoSoInfo> listFileHoSo = new List<FileHoSoInfo>();
                    List<FileHoSoInfo> listFileHoSo_DonDoc = new List<FileHoSoInfo>();
                    List<RutDonInfo> rutdonInfo = new List<RutDonInfo>();
                    List<XuLyDonInfo> lsFileYKienXuLy = new List<XuLyDonInfo>();
                    List<FileHoSoInfo> lsFilePhanXL = new List<FileHoSoInfo>();
                    List<FileKetQuaTranhChapInfo> lsFileKQ = new List<FileKetQuaTranhChapInfo>();
                    List<ChuyenGiaiQuyetInfo> cgqList = new List<ChuyenGiaiQuyetInfo>();
                    List<TheoDoiXuLyInfo> lsFileXacMinh = new List<TheoDoiXuLyInfo>();
                    List<XuLyDonInfo> lsYKienGiaiQuyet = new List<XuLyDonInfo>();
                    List<TheoDoiXuLyInfo> lsFilePheDuyetXacMinh = new List<TheoDoiXuLyInfo>();
                    KetQuaInfo kqInfo = new KetQuaInfo();
                    ThiHanhInfo thiHanhInfo = new ThiHanhInfo();

                    CanBoInfo canBoInfo = new CanBo().GetCanBoByID(CanBoID);
                    if (canBoInfo.XemTaiLieuMat)
                    {
                        //lay thong tin file ho so
                        //listFileHoSoDAL = new FileHoSoDAL().GetByXuLyDonID(XuLyDonID).ToList();
                        listFileHoSo = new FileHoSoDAL().GetByXuLyDonID_TrungDon(XuLyDonID).ToList();
                        listFileHoSo_DonDoc = new FileHoSoDAL().GetByXuLyDonID_DonDoc(XuLyDonID).ToList();
                        //lay thong tin rut don
                        rutdonInfo = new RutDonDAL().GetByXuLyDonID(XuLyDonID);
                        //file y kien xl
                        lsFileYKienXuLy = new XuLyDonDAL().GetFileYKienXuLy(XuLyDonID).ToList();
                        if (lsFileYKienXuLy != null)
                        {
                            foreach (var fileInfo in lsFileYKienXuLy)
                            {
                                fileInfo.NgayUps = Format.FormatDate(fileInfo.NgayUp);
                            }
                        }
                        lsFilePhanXL = new FileHoSoDAL().GetFilePhanXuLyByXuLyDonID(XuLyDonID).ToList();
                        if (lsFilePhanXL != null)
                        {
                            foreach (var fileInfo in lsFilePhanXL)
                            {
                                fileInfo.NgayUps = Format.FormatDate(fileInfo.NgayUp);
                            }
                        }
                        //File tranh chấp
                        lsFileKQ = new KetQuaTranhChapDAL().GetFileByXuLyDonID(XuLyDonID).ToList();
                        // lay thong tin quyet dinh giao xac minh
                        cgqList = new TheoDoiXuLyDAL().GetQuyetDinhGiaoXacMinh(XuLyDonID).ToList();
                        // lay thong tin qua trinh xac minh
                        lsFileXacMinh = new TheoDoiXuLyDAL().GetQuaTrinhXacMinh(XuLyDonID).ToList();
                        lsYKienGiaiQuyet = new XuLyDonDAL().GetYKienGiaiQuyet(XuLyDonID).ToList();
                        if (lsYKienGiaiQuyet != null)
                        {
                            foreach (var donThuInfo in lsYKienGiaiQuyet)
                            {
                                donThuInfo.NgayGiaiQuyetStr = Format.FormatDate(donThuInfo.NgayGiaiQuyet);
                            }
                        }
                        lsFilePheDuyetXacMinh = new XuLyDonDAL().GetPheDuyetBaoCaoXacMinh(XuLyDonID);
                        //lay thong tin quyet dinh giai quyet don
                        kqInfo = new KetQuaDAL().GetCustomByXuLyDonID(XuLyDonID);
                        if (kqInfo != null)
                        {
                            kqInfo.NgayRaKQStr = Format.FormatDate(kqInfo.NgayRaKQ);
                        }
                        //lay thong tin ket qua thi hanh
                        thiHanhInfo = new ThiHanhDAL().ThiHanh_KetQua_GetByID(XuLyDonID);
                        if (thiHanhInfo != null)
                        {
                            thiHanhInfo.NgayThiHanhStr = Format.FormatDate(thiHanhInfo.NgayThiHanh);
                        }
                    }
                    else
                    {
                        //lay thong tin file ho so
                        //listFileHoSoDAL = new FileHoSoDAL().GetByXuLyDonID(XuLyDonID).Where(x => x.IsBaoMat != true || x.CanBoID == canBoID).ToList();
                        listFileHoSo = new FileHoSoDAL().GetByXuLyDonID_TrungDon(XuLyDonID).Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                        listFileHoSo_DonDoc = new FileHoSoDAL().GetByXuLyDonID_DonDoc(XuLyDonID).Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                        //lay thong tin rut don
                        rutdonInfo = new RutDonDAL().GetByXuLyDonID(XuLyDonID).Where(x => x.IsBaoMat != true || x.NguoiUp == CanBoID).ToList();
                        //file y kien xl
                        lsFileYKienXuLy = new XuLyDonDAL().GetFileYKienXuLy(XuLyDonID).Where(x => x.IsBaoMat != true || x.NguoiUp == CanBoID).ToList();
                        if (lsFileYKienXuLy != null)
                        {
                            foreach (var fileInfo in lsFileYKienXuLy)
                            {
                                fileInfo.NgayUps = Format.FormatDate(fileInfo.NgayUp);
                            }
                        }
                        lsFilePhanXL = new FileHoSoDAL().GetFilePhanXuLyByXuLyDonID(XuLyDonID).ToList().Where(x => x.IsBaoMat != true).ToList();
                        if (lsFilePhanXL != null)
                        {
                            foreach (var fileInfo in lsFilePhanXL)
                            {
                                fileInfo.NgayUps = Format.FormatDate(fileInfo.NgayUp);
                            }
                        }
                        //File tranh chấp
                        lsFileKQ = new KetQuaTranhChapDAL().GetFileByXuLyDonID(XuLyDonID).ToList().Where(x => x.IsBaoMat != true || x.CanBoUpID == CanBoID).ToList();
                        // lay thong tin quyet dinh giao xac minh
                        cgqList = new TheoDoiXuLyDAL().GetQuyetDinhGiaoXacMinh(XuLyDonID).ToList().Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                        // lay thong tin qua trinh xac minh
                        lsFileXacMinh = new TheoDoiXuLyDAL().GetQuaTrinhXacMinh(XuLyDonID).Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                        lsYKienGiaiQuyet = new XuLyDonDAL().GetYKienGiaiQuyet(XuLyDonID).Where(x => x.IsBaoMat != true || x.NguoiUp == CanBoID).ToList();
                        if (lsYKienGiaiQuyet != null)
                        {
                            foreach (var donThuInfo in lsYKienGiaiQuyet)
                            {
                                donThuInfo.NgayGiaiQuyetStr = Format.FormatDate(donThuInfo.NgayGiaiQuyet);
                            }
                        }
                        lsFilePheDuyetXacMinh = new XuLyDonDAL().GetPheDuyetBaoCaoXacMinh(XuLyDonID).Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                        //lay thong tin quyet dinh giai quyet don
                        kqInfo = new KetQuaDAL().GetCustomByXuLyDonID(XuLyDonID);
                        if (kqInfo != null)
                        {
                            kqInfo.lstFileKQ = kqInfo.lstFileKQ.Where(x => x.IsBaoMat != true || x.NguoiUp == CanBoID).ToList();
                            kqInfo.NgayRaKQStr = Format.FormatDate(kqInfo.NgayRaKQ);
                        }
                        //lay thong tin ket qua thi hanh
                        thiHanhInfo = new ThiHanhDAL().ThiHanh_KetQua_GetByID(XuLyDonID);
                        if (thiHanhInfo != null)
                        {
                            thiHanhInfo.lstFileTH = thiHanhInfo.lstFileTH.Where(x => x.IsBaoMat != true || x.CanBoID == CanBoID).ToList();
                            thiHanhInfo.NgayThiHanhStr = Format.FormatDate(thiHanhInfo.NgayThiHanh);
                        }

                        foreach (var item in listFileHoSo)
                        {
                            item.Type = 1;
                            item.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            item.NDFILE = "File hồ sơ";
                        }
                        listFile.AddRange(listFileHoSo);
                        foreach (var item in listFileHoSo_DonDoc)
                        {
                            item.Type = 2;
                            item.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            item.NDFILE = "File hồ sơ đôn đốc";
                        }
                        listFile.AddRange(listFileHoSo_DonDoc);
                        foreach (var item in rutdonInfo)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 3;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileRutDonID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.FileUrl;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBo;
                            file.TenCoQuanUp = item.TenCoQuanUp;
                            file.NguoiUp = item.NguoiUp;
                            file.NgayUps = item.NgayUps;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            file.NDFILE = item.LyDo;
                            listFile.Add(file);
                        }
                        foreach (var item in lsFileYKienXuLy)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 4;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileYKienXuLyID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.FileURL;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBoXuLy;
                            file.NguoiUp = item.NguoiUp;
                            file.TenCoQuanUp = item.TenCoQuanUp;
                            file.NgayUps = item.NgayUps;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBoXuLy + " (" + item.TenCoQuanUp + ")";
                            file.NDFILE = "Nội dung: " + item.YKienXuLy;
                            if ((item.YKienXuLy == null || item.YKienXuLy == "") && item.LoaiFile == 6)
                            {
                                file.NDFILE = "File xử lý";
                            }
                            else if (item.LoaiFile == 2 && (item.YKienXuLy == null || item.YKienXuLy == ""))
                            {
                                file.NDFILE = "LĐ phê duyệt kết quả xử lý";
                            }
                            else if (item.LoaiFile == 0)
                            {
                                file.NDFILE = "File chuyển đơn";
                            }
                            else
                            {
                                file.NDFILE = "Nội dung: " + item.YKienXuLy;
                            }
                            listFile.Add(file);
                        }
                        foreach (var item in lsFilePhanXL)
                        {
                            item.Type = 5;
                            item.FileHoSoID = item.FilePhanXuLyID;
                            item.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            item.NDFILE = "File phân xử lý";
                        }
                        listFile.AddRange(lsFilePhanXL);
                        foreach (var item in lsFileKQ)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 6;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.KetQuaTranhChapID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.FileUrl;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBo;
                            file.TenCoQuanUp = "";
                            file.NguoiUp = item.CanBoUpID;
                            file.NgayUps = item.NgayCapNhat_Str;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " - " + item.NgayCapNhat_Str;
                            file.NDFILE = "File tranh chấp";
                            listFile.Add(file);
                        }
                        foreach (var item in cgqList)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 7;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileHoSoID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.FileUrl;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBo;
                            file.TenCoQuanUp = item.TenCoQuanPhan;
                            file.NguoiUp = item.CanBoID;
                            file.NgayUps = item.NgayChuyen_Str;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanPhan + ")";
                            if (item.GhiChu != "")
                            {
                                file.NDFILE = "Nội dung: " + item.GhiChu;
                            }
                            else
                            {
                                file.NDFILE = "File quyết định giao xác minh";
                            }
                            listFile.Add(file);
                        }
                        foreach (var item in lsFileXacMinh)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 8;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileGiaiQuyetID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.DuongDanFile;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBo;
                            file.TenCoQuanUp = item.TenCoQuanUp;
                            file.NguoiUp = item.CanBoID;
                            file.NgayUps = item.StringNgayCapNhat;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            if (item.NoiDung != "" || item.NoiDung != null)
                            {
                                file.NDFILE = "Nội dung: " + item.NoiDung;
                            }
                            else
                            {
                                file.NDFILE = item.TenBuoc;
                            }
                            listFile.Add(file);
                        }
                        foreach (var item in lsYKienGiaiQuyet)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 9;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileBaoCaoXacMinhID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.FileUrl;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCanBo;
                            file.TenCoQuanUp = item.TenCoQuanUp;
                            file.NguoiUp = item.NguoiUp;
                            file.NgayUps = item.NgayGiaiQuyetStr;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                            if (item.YKienGiaiQuyet != "")
                            {
                                file.NDFILE = "Nội dung: " + item.YKienGiaiQuyet;
                            }
                            else
                            {
                                file.NDFILE = "Báo cáo kết quả xác minh";
                            }
                            listFile.Add(file);
                        }
                        foreach (var item in lsFilePheDuyetXacMinh)
                        {
                            FileHoSoInfo file = new FileHoSoInfo();
                            file.Type = 10;
                            file.IsBaoMat = item.IsBaoMat;
                            file.FileHoSoID = item.FileDonThuCanDuyetGiaiQuyetID;
                            file.FileID = item.FileID;
                            file.NhomFileID = item.NhomFileID;
                            file.TenNhomFile = item.TenNhomFile;
                            file.ThuTuHienThiNhom = item.ThuTuHienThiNhom;
                            file.ThuTuHienThiFile = item.ThuTuHienThiFile;
                            file.FileURL = item.DuongDanFile;
                            file.TenFile = item.TenFile;
                            file.TenCanBo = item.TenCapBoUp;
                            file.TenCoQuanUp = item.TenCoQuanUp;
                            file.NguoiUp = item.CanBoID;
                            file.NgayUps = item.StringNgayCapNhat;
                            file.CANBOTHEM = "Đã thêm bởi " + item.TenCapBoUp + " (" + item.TenCoQuanUp + ")";
                            file.NDFILE = "Duyệt báo cáo xác minh";
                            listFile.Add(file);
                        }
                        if (kqInfo != null && kqInfo.lstFileKQ != null)
                        {
                            foreach (var item in kqInfo.lstFileKQ)
                            {
                                item.Type = 11;
                                item.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                                item.NDFILE = "File ban hành kết quả";
                            }
                            listFile.AddRange(kqInfo.lstFileKQ);
                        }

                        if (thiHanhInfo != null && thiHanhInfo.lstFileTH != null)
                        {
                            foreach (var item in thiHanhInfo.lstFileTH)
                            {
                                item.Type = 12;
                                item.CANBOTHEM = "Đã thêm bởi " + item.TenCanBo + " (" + item.TenCoQuanUp + ")";
                                item.NDFILE = "File thi hành kết luận";
                            }
                            listFile.AddRange(thiHanhInfo.lstFileTH);
                        }

                        foreach (var item in listFile)
                        {
                            if (item.TenNhomFile == null || item.TenNhomFile == "")
                            {
                                item.TenNhomFile = "File chưa phân loại";
                            }

                        }

                        List<FileHoSoInfo> nhomFile = new List<FileHoSoInfo>();
                        foreach (var item in listFile)
                        {
                            if (item.NhomFileID > 0)
                            {
                                Boolean check = true;
                                foreach (var nhom in nhomFile)
                                {
                                    if (item.NhomFileID == nhom.NhomFileID)
                                    {
                                        check = false;
                                        break;
                                    }
                                }
                                if (check)
                                {
                                    nhomFile.Add(item);
                                }
                            }

                        }
                        nhomFile = nhomFile.OrderBy(x => x.ThuTuHienThiNhom).ToList();

                        DonThuChiTiet.FileHoSo = listFile;
                    }
                }
                catch
                {
                    //throw;
                }
                #endregion
                DonThuChiTiet.TienTrinhXuLy = new List<TransitionHistoryInfo>();
                try
                {
                    DonThuChiTiet.TienTrinhXuLy = new TransitionHistoryDAL().GetLuongDonByID(XuLyDonID).ToList();
                }
                catch
                {
                }

                Result.Status = 1;
                Result.Data = DonThuChiTiet;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }

            return Result;
        }

        public BaseResultModel GetBySearch_TraCuu(ThamSoLocDanhMuc p, int LoaiKhieuToID, int coquanID)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = donThuDAL.GetBySearch_TraCuu(p, LoaiKhieuToID, coquanID);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
                throw;
            }

            return Result;
        }

    }
}
