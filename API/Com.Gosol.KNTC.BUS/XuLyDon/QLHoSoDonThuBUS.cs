using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workflow;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.DAL.KNTC;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System.Security.Claims;
using Com.Gosol.KNTC.Models.KNTC;
using Microsoft.AspNetCore.Http;
using Com.Gosol.KNTC.Models.BaoCao;
using Microsoft.Office.Interop.Word;
using System.IO;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class QLHoSoDonThuBUS
    {
        private readonly QLHoSoDonThuDAL _qLHoSoDonThuDAL;
        public QLHoSoDonThuBUS()
        {
            _qLHoSoDonThuDAL = new QLHoSoDonThuDAL();
        }


        public BaseResultModel DanhSach(QLHoSoDonThuParams thamSo, QLHoSoDonThuClaims Info)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = _qLHoSoDonThuDAL.DanhSach(thamSo, Info);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }

        public BaseResultModel ThongTinBoSung(QLHoSoDonThuMOD thamSo, QLHoSoDonThuClaims Info)
        {
            var Result = new BaseResultModel();

            //var buocInfo = new List<BuocInfo>();

            try
            {
                var lstState = new XuLyDonDAL().GetXuLyDonLogs(thamSo.XuLyDonID);
                var stateName = WorkflowInstance.Instance.GetCurrentStateOfDocument(thamSo.XuLyDonID);
                var buocInfo = new List<BuocInfo>();
                //if (stateName == Constant.LD_DuyetXuLy)
                //{
                //}
                BuocInfo item = new BuocInfo { Value = "0", TenBuoc = "Chọn bước thực hiện cần bổ sung hồ sơ" };
                buocInfo.Add(item);

                item = new BuocInfo() { Value = (int)EnumBuoc.ThongTinChung +"-0", TenBuoc = "Thông tin chung" };
                buocInfo.Add(item);

                switch (stateName)
                {
                    case Constant.LD_DuyetXuLy:
                        {
                            item = new BuocInfo() { Value = (int)EnumBuoc.XuLyDon + "-0", TenBuoc = "Xử lý đơn" };
                            buocInfo.Add(item);
                            break;
                        }
                    case Constant.LD_Phan_GiaiQuyet:
                    case Constant.TP_Phan_GiaiQuyet:
                    case Constant.LD_CapDuoi_Phan_GiaiQuyet:
                        {
                            List<XuLyDonLog> isHas = lstState
                            .Where(i => (Constant.LD_DuyetXuLy.Contains(i.CurrentState) || Constant.LD_DuyetXuLy.Contains(i.NextState))).ToList();
                            if (isHas.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.XuLyDon + "-0", TenBuoc = "Xử lý đơn" };
                                buocInfo.Add(item);
                            }

                            //item = new BuocInfo() { Value = (int)EnumBuoc.LDPhanGiaiQuyet + "-" + "0", TenBuoc = "Giao xác minh" };
                            //buocInfo.Add(item);

                            item = new BuocInfo() { Value = (int)EnumBuoc.YeuCauDoiThoai + "-0", TenBuoc = "Yều cầu đối thoại" };
                            buocInfo.Add(item);
                            break;
                        }
                    case Constant.LD_Duyet_GiaiQuyet:
                    case Constant.TruongDoan_GiaiQuyet:
                    case Constant.TP_DuyetGQ:
                    case Constant.LD_CQCapDuoiDuyetGQ:
                        {
                            List<XuLyDonLog> isHas = lstState
                                .Where(i => (Constant.LD_DuyetXuLy.Contains(i.CurrentState)
                                                || Constant.LD_DuyetXuLy.Contains(i.NextState))).ToList();
                            if (isHas.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.XuLyDon + "-0", TenBuoc = "Xử lý đơn" };
                                buocInfo.Add(item);
                            }

                            List<XuLyDonLog> isHas_lqpgq = lstState
                            .Where(i => Constant.LD_Phan_GiaiQuyet.Contains(i.CurrentState)
                            || Constant.LD_Phan_GiaiQuyet.Contains(i.NextState)
                            || Constant.TP_Phan_GiaiQuyet.Contains(i.NextState)
                            || Constant.LD_CapDuoi_Phan_GiaiQuyet.Contains(i.CurrentState)
                            || Constant.LD_CapDuoi_Phan_GiaiQuyet.Contains(i.NextState)
                            || Constant.TP_Phan_GiaiQuyet.Contains(i.NextState)
                            ).ToList();

                            if (isHas_lqpgq.Count > 0)
                            {
                                //item = new BuocInfo() { Value = (int)EnumBuoc.LDPhanGiaiQuyet + "-" + "0", TenBuoc = "Giao xác minh" };
                                //buocInfo.Add(item);
                            }

                            //IList<BuocXacMinhInfo> buocXacMinhs = new BuocXacMinhDAL();

                            //for (int i = 0; i < buocXacMinhs.Count; i++)
                            //{
                            //    item = new BuocInfo() { Value = (int)EnumBuoc.GiaiQuyetDon + "-" + buocXacMinhs[i].BuocXacMinhID.ToString(), TenBuoc = "Giải quyết đơn - " + buocXacMinhs[i].TenBuoc };
                            //    buocInfo.Add(item);
                            //}

                            //item = new BuocInfo() { Value = (int)EnumBuoc.YeuCauDoiThoai + "-" + "0", TenBuoc = "Yêu cầu đối thoại" };
                            //buocInfo.Add(item);

                            //int bcxm = new TheoDoiXuLyD().CheckBaoCaoXacMinh(xuLyDonID);
                            //if (bcxm > 0)
                            //{
                            //    item = new BuocInfo() { Value = (int)EnumBuoc.BaoCaoXacMinh + "-" + "0", TenBuoc = "Báo cáo xác minh" };
                            //    buocInfo.Add(item);
                            //}

                            List<XuLyDonLog> isHas_dgq = lstState
                            .Where(i => Constant.LD_Duyet_GiaiQuyet.Contains(i.CurrentState)
                               || Constant.LD_Duyet_GiaiQuyet.Contains(i.NextState)
                               || Constant.TP_DuyetGQ.Contains(i.NextState)
                               || Constant.TP_DuyetGQ.Contains(i.CurrentState)
                               || Constant.TruongDoan_GiaiQuyet.Contains(i.NextState)
                               || Constant.TruongDoan_GiaiQuyet.Contains(i.CurrentState)
                               || Constant.LD_CQCapDuoiDuyetGQ.Contains(i.CurrentState)
                               || Constant.LD_CQCapDuoiDuyetGQ.Contains(i.CurrentState)).ToList();

                            if (isHas_dgq.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.DuyetGiaiQuyet + "-0", TenBuoc = "Phê duyệt kết quả xác minh" };
                                buocInfo.Add(item);
                            }
                            break;
                        }

                    case Constant.Ket_Thuc:
                        {
                            List<XuLyDonLog> isHas_xl = lstState
                                .Where(i => Constant.LD_DuyetXuLy.Contains(i.NextState) || Constant.LD_DuyetXuLy.Contains(i.CurrentState)).ToList();

                            if (isHas_xl.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.XuLyDon + "-0", TenBuoc = "Xử lý đơn" };
                                buocInfo.Add(item);
                            }

                            List<XuLyDonLog> isHas_lqpgq = lstState
                                .Where(i => (Constant.LD_Phan_GiaiQuyet.Contains(i.CurrentState)
                                || Constant.LD_Phan_GiaiQuyet.Contains(i.NextState)
                                || Constant.TP_Phan_GiaiQuyet.Contains(i.NextState)
                                || Constant.LD_CapDuoi_Phan_GiaiQuyet.Contains(i.CurrentState)
                                || Constant.LD_CapDuoi_Phan_GiaiQuyet.Contains(i.NextState)
                                || Constant.LD_Phan_GiaiQuyet.Contains(i.NextState))).ToList();

                            List<XuLyDonLog> isHas_gq = lstState
                                .Where(i => Constant.TruongDoan_GiaiQuyet.Contains(i.CurrentState)
                                     || Constant.TruongDoan_GiaiQuyet.Contains(i.NextState)).ToList();

                            if (isHas_lqpgq.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.YeuCauDoiThoai + "-0", TenBuoc = "Yêu cầu đối thoại" };
                                buocInfo.Add(item);
                            }

                            List<XuLyDonLog> isHas_dgq = lstState
                                .Where(i => Constant.LD_Duyet_GiaiQuyet.Contains(i.CurrentState)
                                   || Constant.LD_Duyet_GiaiQuyet.Contains(i.NextState)
                                   || Constant.TP_DuyetGQ.Contains(i.NextState)
                                   || Constant.TP_DuyetGQ.Contains(i.CurrentState)
                                   || Constant.TruongDoan_GiaiQuyet.Contains(i.NextState)
                                   || Constant.TruongDoan_GiaiQuyet.Contains(i.CurrentState)
                                   || Constant.LD_CQCapDuoiDuyetGQ.Contains(i.CurrentState)
                                   || Constant.LD_CQCapDuoiDuyetGQ.Contains(i.CurrentState)).ToList();

                            if (isHas_dgq.Count > 0)
                            {
                                item = new BuocInfo() { Value = (int)EnumBuoc.DuyetGiaiQuyet + "-0", TenBuoc = "Phê duyệt kết quả xác minh" };
                                buocInfo.Add(item);
                            }


                            break;
                        }
                    default:
                        break;
                }

                Result.Status = 1;
                Result.Message = "Thành Công";
                Result.Data = buocInfo;
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }

            return Result;
        }
        public BaseResultModel Ds_HoSo()
        {
            var Result = new BaseResultModel();
            try
            {

                Result.Status = 1;
                Result.Message = "Thành Công";
                Result.Data = _qLHoSoDonThuDAL.File_Get_DanhSachDangSuDung(); ;
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel CapNhatHoSo(Models.KNTC.FileHoSoInfo[] fileInfos, IFormFile[] files, ClaimsPrincipal claims, string folderPath)
        {
            var Result = new BaseResultModel();


            //int idxulydon = Info.XuLyDonID;

            try
            {
                for (int i = 0; i < fileInfos.Length; i++)
                {
                    int canboID = IdentityHelper.GetCanBoID(claims);
                    string tenFile = $"{canboID}_{files[i].FileName}";
                    string fileUrl = $"{folderPath}/{tenFile}";
                    string filePath = $"/UploadFiles/filehoso/{tenFile}";
                    int idxulydon = fileInfos[i].XuLyDonID;

                    Models.KNTC.FileHoSoInfo info = new();
                    info.XuLyDonID = idxulydon;
                    info.DonThuID = fileInfos[i].DonThuID;
                    info.FileURL = filePath;
                    info.NgayUp = fileInfos[i].NgayUp;
                    info.TenFile = tenFile;
                    info.TomTat = fileInfos[i].TomTat;
                    info.NguoiUp = canboID;//IdentityHelper.GetUserID();
                    info.FileID = fileInfos[i].FileID;

                    string[] buoc = fileInfos[i].NDFILE.Split('-');
                    int val = 0;
                    switch (Utils.ConvertToInt32(buoc[0], 0))
                    {
                        case (int)EnumBuoc.ThongTinChung:
                            val = new FileHoSoDAL().Insert_New(info);
                            break;
                        case (int)EnumBuoc.XuLyDon:
                            val = new FileHoSoDAL().InsertFileYKienXL(info);
                            break;
                        case (int)EnumBuoc.LDPhanGiaiQuyet:
                            val = new FileHoSoDAL().InsertFileDonThuCanPhanGiaiQuyet(info);
                            break;
                        case (int)EnumBuoc.YeuCauDoiThoai:
                            {
                                if (Utils.ConvertToInt32(buoc[1], 0) == 0)
                                {
                                    TheoDoiXuLyInfo info_theodoi = new TheoDoiXuLyInfo();
                                    info_theodoi.XuLyDonID = info.XuLyDonID;
                                    info_theodoi.TheoDoiXuLyID = 0;
                                    info_theodoi.NgayCapNhat = info.NgayUp;
                                    info_theodoi.GhiChu = info.TomTat;
                                    info_theodoi.CanBoID = canboID;

                                    List<Models.KNTC.FileHoSoInfo> lst_File = new FileGiaiQuyetDAL().GetFileGiaiQuyetByTheoDoiID(info.XuLyDonID, (int)EnumLoaiFile.FileGiaiQuyet);
                                    if (lst_File.Count > 0)
                                    {
                                        info_theodoi.TheoDoiXuLyID = lst_File.First().TheoDoiXuLyID;
                                        int theoDoiXuLyID = info_theodoi.TheoDoiXuLyID;
                                        FileGiaiQuyetInfo fileInfo = new FileGiaiQuyetInfo();
                                        fileInfo.NgayCapNhat = info.NgayUp;
                                        fileInfo.NoiDung = info.TomTat;
                                        fileInfo.TheoDoiXuLyID = theoDoiXuLyID;
                                        fileInfo.DuongDanFile = info.FileURL;
                                        fileInfo.TenFile = info.TenFile;

                                        val = new FileGiaiQuyetDAL().Insert(fileInfo);
                                    }
                                    else
                                    {
                                        val = new TheoDoiXuLyDAL().Insert(info_theodoi);

                                        if (val > 0)
                                        {
                                            int theoDoiXuLyID = val;
                                            FileGiaiQuyetInfo fileInfo = new FileGiaiQuyetInfo();
                                            fileInfo.NgayCapNhat = info.NgayUp;
                                            fileInfo.NoiDung = info.TomTat;
                                            fileInfo.TheoDoiXuLyID = theoDoiXuLyID;
                                            fileInfo.DuongDanFile = info.FileURL;

                                            val = new FileGiaiQuyetDAL().Insert(fileInfo);
                                        }
                                    }
                                }
                                break;
                            }

                        case (int)EnumBuoc.GiaiQuyetDon:
                            {
                                if (Utils.ConvertToInt32(buoc[1], 0) > 0)
                                {
                                    TheoDoiXuLyInfo info_theodoi = new TheoDoiXuLyInfo();
                                    info_theodoi.XuLyDonID = info.XuLyDonID;
                                    info_theodoi.TheoDoiXuLyID = 0;
                                    info_theodoi.NgayCapNhat = info.NgayUp;
                                    info_theodoi.GhiChu = info.TomTat;
                                    info_theodoi.CanBoID = canboID;
                                    info_theodoi.BuocXacMinhID = Utils.ConvertToInt32(buoc[1], 0);

                                    List<Models.KNTC.FileHoSoInfo> lst_File = new FileGiaiQuyetDAL().GetFileGiaiQuyetByBuocXacMinhID(info.XuLyDonID, (int)EnumLoaiFile.FileGiaiQuyet, Utils.ConvertToInt32(buoc[1], 0));
                                    if (lst_File.Count > 0)
                                    {
                                        info_theodoi.TheoDoiXuLyID = lst_File.First().TheoDoiXuLyID;
                                        val = info_theodoi.TheoDoiXuLyID;
                                    }
                                    else
                                    {
                                        val = new TheoDoiXuLyDAL().Insert_New(info_theodoi);
                                    }

                                    if (val > 0)
                                    {
                                        int theoDoiXuLyID = val;
                                        FileGiaiQuyetInfo fileInfo = new FileGiaiQuyetInfo();
                                        fileInfo.NgayCapNhat = info.NgayUp;
                                        fileInfo.NoiDung = info.TomTat;
                                        fileInfo.TenFile = info.TenFile;
                                        fileInfo.TheoDoiXuLyID = theoDoiXuLyID;
                                        fileInfo.DuongDanFile = info.FileURL;

                                        val = new FileGiaiQuyetDAL().Insert(fileInfo);
                                    }
                                }
                                break;
                            }

                        case (int)EnumBuoc.BaoCaoXacMinh:
                            {
                                List<XuLyDonInfo> ykien = new XuLyDonDAL().GetYKienGiaiQuyet(idxulydon);
                                //int bcxm = new TheoDoiXuLy().CheckBaoCaoXacMinh(idxulydon);
                                if (ykien.Count > 0)
                                {
                                    info.YKienGiaiQuyetID = ykien.First().YKienGiaiQuyetID;
                                    val = new FileHoSoDAL().InsertBCXM(info);
                                }
                                break;
                            }

                        case (int)EnumBuoc.DuyetGiaiQuyet:
                            {
                                val = new FileHoSoDAL().InsertDonThuCDGQ(info);
                                break;
                            }

                        case (int)EnumBuoc.BanHanh:
                            {
                                Models.KNTC.KetQuaInfo kq = new KetQuaDAL().GetCustomByXuLyDonID(idxulydon);
                                if (kq != null)
                                {
                                    //infoFileLog.LoaiFile = (int)EnumLoaiFile.FileBanHanhQD;

                                    Models.KNTC.FileHoSoInfo infoFileHoSo = new();
                                    infoFileHoSo.KetQuaID = kq.KetQuaID;
                                    infoFileHoSo.FileURL = filePath;
                                    infoFileHoSo.NgayUp = info.NgayUp;
                                    infoFileHoSo.TenFile = tenFile;
                                    infoFileHoSo.TomTat = info.TomTat;
                                    infoFileHoSo.FileID = info.FileID;

                                    infoFileHoSo.NguoiUp = canboID;//IdentityHelper.GetUserID();


                                    val = new KetQuaDAL().InsertFileKetQua(infoFileHoSo);
                                }
                                break;
                            }
                        case (int)EnumBuoc.TheoDoi:
                            {
                                ThiHanhInfo th = new ThiHanhDAL().GetThiHanhBy_XLDID(idxulydon);

                                if (th != null)
                                {
                                    //infoFileLog.LoaiFile = (int)EnumLoaiFile.FileTheoDoi;

                                    Models.KNTC.FileHoSoInfo infoFileHoSo = new();
                                    infoFileHoSo.ThiHanhID = th.ThiHanhID;
                                    infoFileHoSo.FileURL = filePath;
                                    infoFileHoSo.NgayUp = info.NgayUp;
                                    infoFileHoSo.TenFile = tenFile;
                                    infoFileHoSo.TomTat = info.TomTat;
                                    infoFileHoSo.FileID = info.FileID;
                                }
                                break;
                            }
                        default:
                            break;
                    }

                    if (val <= 0)
                    {
                        Result.Status = -1;
                        Result.Message = "Cập Nhật Không Thành Công";

                        return Result;
                    }

                    if (System.IO.File.Exists(fileUrl))
                    {
                        System.IO.File.Delete(fileUrl);
                    }
                    using BinaryReader binaryFile = new BinaryReader(files[i].OpenReadStream());
                    byte[] byteArrFile = binaryFile.ReadBytes((int)files[i].OpenReadStream().Length);

                    using (FileStream output = System.IO.File.Create(fileUrl))
                    {
                        output.Write(byteArrFile);
                    }
                }


                Result.Status = 1;
                Result.Message = "Cập Nhật Thành Công";
                //Result.Data = IdentityHelper.GetCanBoID(claims);
            }
            catch (Exception ex)
            {

                Result.Status = -1;
                Result.Message = ex.Message;
                Result.Data = null;
            }
            return Result;
        }

        private class BuocXacMinhDAL 
        {
        }
    }


    public class BuocInfo
    {
        public string Value { get; set; }
        public string TenBuoc { get; set; }
    }
}
