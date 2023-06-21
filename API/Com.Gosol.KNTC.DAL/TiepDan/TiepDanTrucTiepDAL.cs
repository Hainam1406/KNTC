using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using OfficeOpenXml.FormulaParsing.Excel.Functions.RefAndLookup;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.DAL.TiepDan
{
    public class TiepDanTrucTiepDAL  
    {
        //Su dung de goi StoreProcedure
        private const string INSERT_DOITUONGKN = @"DoiTuongKN_Insert_New";
        private const string INSERT_DOITUONBIGKN = @"DoiTuongBiKN_Insert";
        private const string Insert_dtbkn = @"DoiTuongBiKN_Insert_01";
        private const string CaNhanBiKN = @"CaNhanBiKN_Insert";//
        private const string INSERT_NHOMKN = @"NhomKN_Insert";
        private const string GET_ALL_LOAIDOITUONGKN = @"DM_LoaiDoiTuongKN_GetAll";
        private const string GET_ALLlOAIDOITUONGBIKN = @"DM_LoaiDoiTuongBiKN_GetAll";//
        private const string ThongTinTiepDan_v2 = @"NVTiepDan_InsertTiepDan_New_v2";
        private const string ThongTinTiepDan_3 = @"NVTiepDan_InsertTiepDan_New_v3";
        private const string ThongTinTiepDan = @"NVTiepDan_InsertTiepDan_New";
        private const string Insert_DonThu = @"NV_DonThu_Insert";
        private const string DanKhongDen = "TiepDan_DanKhongDen_Insert";
        private const string GET_CTKHIEUTOLAN2_BY_DONTHU_ID = @"NV_TiepDan_GetCTTrungDonByDonID_DonThuKTLan2";
        // UPDATE
        private const string Update_DoiTuongKN = "DoiTuongKN_Update_New";
        private const string Update_NhomKN = "NhomKN_Update";
        private const string Update_TiepDan_New_v2 = "NVTiepDan_UpdateTiepDan_New_v2";
        private const string Update_CaNhanBiKN = "CaNhanBiKN_Update";
        private const string Update_DoiTuongBiKN = "DoiTuongBiKN_Update";
        private const string Update_ThanhPhanTG = "";
        private const string Update_TiepDanKhongDon = "";
        private const string Update_DonThu = "NV_DonThu_Update";
        private const string NVTiepDan_UpdateXuLyDon = "NVTiepDan_UpdateXuLyDon";
        private const string Update_DanKhongDen = "TiepDan_DanKhongDen_Update";


        //Ten cac bien dau vao
        // param đối tượng khiếu nại

        private const string PARAM_DoiTuongKNID = "@DoiTuongKNID";
        private const string PARAM_HoTen = "@HoTen";
        private const string PARAM_CMND = "@CMND";
        private const string PARAM_GioiTinh = "@GioiTinh";
        private const string PARAM_NgheNghiep = "@NgheNghiep";
        private const string PARAM_QuocTichID = "@QuocTichID";
        private const string PARAM_DanTocID = "@DanTocID";
        private const string PARAM_TinhID = "@TinhID";
        private const string PARAM_HuyenID = "@HuyenID";
        private const string PARAM_XaID = "@XaID";
        private const string PARAM_DiaChiCT = "@DiaChiCT";
        private const string PARAM_NhomKNID = "@NhomKNID";
        private const string PARAM_SoDienThoai = "@SoDienThoai";
        private const string PARAM_NgayCap = "@NgayCap";
        private const string PARAM_NoiCap = "@NoiCap";
        // thêm mới đối tượng khiếu nại
        private const string PARAM_NHOMKN_ID = "@NhomKNID";
        private const string PARAM_SO_LUONG = "@SoLuong";
        private const string PARAM_TENCQ = "@TenCoQuan";
        private const string PARAM_LOAI_DOI_TUONG = "@LoaiDoiTuongKNID";
        private const string PARAM_DIACHI_CQ = "@DiaChiCQ";
        private const string PARAM_DAIDIEN_PHAPLY = "@DaiDienPhapLy";
        private const string PARAM_DUOC_UYQUYEN = "@DuocUyQuyen";
        // danh sách nhóm khiếu nại
        private const string PARAM_LOAI_DOI_TUONG_KN_ID = "@LoaiDoiTuongKNID";
        private const string PARAM_TEN_LOAI_DOI_TUONG_KN = "@TenLoaiDoiTuongKN";
        //private const string PARAM_DON_THU_ID = "@DonThuID";
        private const string INSERT_DONTHU = @"NVTiepDan_InsertDonThu";
        private const string INSERT_CANHANBIKN = @"CaNhanBiKN_Insert";
        private const string INSERT_DOITUONGBIKN = @"DoiTuongBiKN_Insert";
        private const string CHECK_TRUNG_DON_BY_HOTEN = @"NV_TiepDan_CheckTrungDonByHoTen";
        private const string COUND_TRUNGDON_BY_DONTHUID = @"NV_TiepDan_CountTrungDon";
        private const string GET_CTTRUNGDON_BY_DONTHU_ID = @"NV_TiepDan_GetCTTrungDonByDonID";
        private const string CHECK_KHIEUTOLAN2_BY_HOTEN = @"NV_TiepDan_CheckKhieuToLan2_ByHoTen";
        private const string CHECK_KHIEUTOLAN2_SOLANGQ = @"NV_TiepDan_CheckKhieuToLan2_SoLanGQ";
        private const string GET_SO_DON_BY_CO_QUAN = @"NV_XuLyDon_GetSoDonByCoQuan";
        private const string INSERT_FILEHOSO = @"FileHoSo_Insert_New";
        private const string DELETE_FILEHOSO = @"FileHoSo_Delete";



        private const string PARAM_FILEID = "FileID";
        private const string PARAM_TEN_FILE = "@TenFile";
        private const string PARAM_TOMTAT = "@TomTat";
        private const string PARAM_FILE_URL = "@FileURL";
        private const string PARAM_NGUOIUP = "@NguoiUp";
        private const string PARAM_NGAYUP = "@NgayUp";
        private const string PARAM_DMBuocXacMinhID = "@DMBuocXacMinhID";
        private const string PARAM_DM_TEN_FILEID = "@DMTenFileID";
        private const string PARAM_XULYDONID = "@XuLyDonID";
        private const string PARAM_DONTHUID = "@DonThuID";


        // param don thu
        private const string PARAM_DON_THU_ID = "@DonThuID";
        private const string PARAM_NHOM_KN_ID = "@NhomKNID";
        private const string PARAM_DOI_TUONG_BI_KN_ID = "@DoiTuongBiKNID";
        private const string PARAM_LOAI_KHIEU_TO_1ID = "@LoaiKhieuTo1ID";
        private const string PARAM_LOAI_KHIEU_TO_2ID = "@LoaiKhieuTo2ID";
        private const string PARAM_LOAI_KHIEU_TO_3ID = "@LoaiKhieuTo3ID";
        private const string PARAM_TENLANHDAOTIEP = @"TenLanhDaoTiep";
        private const string PARAM_LOAI_KHIEU_TO_ID = "@LoaiKhieuToID";
        private const string PARAM_NOI_DUNG_DON = "@NoiDungDon";
        private const string PARAM_TRUNG_DON = "@TrungDon";
        private const string PARAM_TINH_ID = "@TinhID";
        private const string PARAM_HUYEN_ID = "@HuyenID";
        private const string PARAM_XA_ID = "@XaID";
        private const string PARAM_LETANCHUYEN = "@LeTanChuyen";
        private const string PARAM_NGAYVIETDON = "@NgayVietDon";
        private const string PARAM_STATEID = "@StateID";
        private const string PARAM_DIACHI = "@DiaChi";

        //Ten cac bien dau vao
        private const string PARAM_CA_NHAN_BIKN_ID = "@CaNhanBiKNID";
        private const string PARAM_NGHE_NGHIEP = "@NgheNghiep";
        private const string PARAM_NOI_CONG_TAC = "@NoiCongTac";
        private const string PARAM_CHUC_VU_ID = "@ChucVuID";
        private const string PARAM_QUOC_TICH_ID = "@QuocTichID";
        private const string PARAM_DAN_TOC_ID = "@DanTocID";
        private const string PARAM_DOI_TUONG_BIKN_ID = "@DoiTuongBiKNID";

        private const string PARAM_DOITUONGBIKN_ID = "@DoiTuongBiKNID";
        private const string PARAM_TEN_DOI_TUONG_BI_KN = "@TenDoiTuongBiKN";

        private const string PARAM_DIACHICHITIET = "@DiaChiCT";
        private const string PARAM_LOAI_DOI_TUONG_BI_KN = "@LoaiDoiTuongBiKNID";
        //private const string PARAM_DONTHUID = "@DonThuID";

        private const string PARAM_XU_LY_DON_ID = "@XuLyDonID";
        private const string PARAM_SO_DON_THU = "@SoDonThu";
        private const string PARAM_NGAY_NHAP_DON = "@NgayNhapDon";
        private const string PARAM_NGUON_DON_DEN_ID = "@NguonDonDen";
        private const string PARAM_CQ_CHUYEN_DON_DEN_ID = "@CQChuyenDonDenID";
        private const string PARAM_SO_CONG_VAN = "@SoCongVan";
        private const string PARAM_NGAY_CHUYEN_DON = "@NgayChuyenDon";
        private const string PARAM_SO_LAN = "@SoLan";
        private const string PARAM_CQ_DA_GIAI_QUYET_ID = "@CQDaGiaiQuyetID";
        private const string PARAM_CAN_BO_GQ_ID = "@CanBoXuLyID";

        private const string PARAM_CO_QUAN_ID = "@CoQuanID";
        private const string PARAM_CAN_BO_TIEP_NHAN_ID = "@CanBoTiepNhanID";
        private const string infor_TiepDanKhongDonID = "@TiepDanKhongDonID";
        private const string infor_NgayTiep = "@NgayTiep";
        private const string infor_GapLanhDao = "@GapLanhDao";
        private const string infor_NgayGapLanhDao = "@NgayGapLanhDao";
        private const string infor_NoiDungTiep = "@NoiDungTiep";
        private const string VuViecCu = "@VuViecCu";
        private const string CanBoTiepID = "@CanBoTiepID";
        private const string DonThuID = "@DonThuID";
        private const string CoQuanID = "@CoQuanID";
        private const string XuLyDonID = "@XuLyDonID";
        private const string LanTiep = "@LanTiep";
        private const string KetQuaTiep = "@KetQuaTiep";
        private const string SoDon = "@SoDon";
        private const string infor_NhomKNID = "@NhomKNID";
        private const string LoaiKhieuTo1ID = "@LoaiKhieuTo1ID";
        private const string LoaiKhieuTo2ID = "@LoaiKhieuTo2ID";
        private const string LoaiKhieuTo3ID = "@LoaiKhieuTo3ID";
        private const string TenLanhDaoTiep = "@TenLanhDaoTiep";
        private const string LanhDaoDangKy = "@LanhDaoDangKy";
        private const string KQQuaTiepDan = "@KQQuaTiepDan";
        private const string YeuCauNguoiDuocTiep = "@YeuCauNguoiDuocTiep";
        private const string ThongTinTaiLieu = "@ThongTinTaiLieu";
        private const string KetLuanNguoiChuTri = "@KetLuanNguoiChuTri";
        private const string NguoiDuocTiepPhatBieu = "@NguoiDuocTiepPhatBieu";

        /// <summary>
        /// Thêm mới đối tượng khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>

        public BaseResultModel InsertDoiTuongKN(List<DoiTuongKNMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter(PARAM_HoTen, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_CMND, SqlDbType.VarChar),
                    new SqlParameter(PARAM_GioiTinh, SqlDbType.Int),
                    new SqlParameter(PARAM_NgheNghiep, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_QuocTichID, SqlDbType.Int),
                    new SqlParameter(PARAM_DanTocID, SqlDbType.Int),
                    new SqlParameter(PARAM_TinhID, SqlDbType.Int),
                    new SqlParameter(PARAM_HuyenID, SqlDbType.Int),
                    new SqlParameter(PARAM_XaID, SqlDbType.Int),
                    new SqlParameter(PARAM_DiaChiCT, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NhomKNID, SqlDbType.Int),
                    new SqlParameter(PARAM_SoDienThoai, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NgayCap, SqlDbType.DateTime),
                    new SqlParameter(PARAM_NoiCap, SqlDbType.NVarChar)
                };
                parameters[0].Value = item[i].HoTen;
                parameters[1].Value = item[i].CMND != null ? item[i].CMND : "";
                parameters[2].Value = item[i]?.GioiTinh;
                parameters[3].Value = item[i]?.NgheNghiep != null ? item[i].NgheNghiep : "";
                parameters[4].Value = item[i].QuocTichID;
                parameters[5].Value = item[i]?.DanTocID;
                parameters[6].Value = item[i]?.TinhID;
                parameters[7].Value = item[i]?.HuyenID;
                parameters[8].Value = item[i]?.XaID;
                parameters[9].Value = item[i].DiaChiCT ?? Convert.DBNull;
                parameters[10].Value = item[i]?.NhomKNID;
                parameters[11].Value = item[i]?.SoDienThoai != null ? item[i].SoDienThoai : "";
                parameters[12].Value = item[i].NgayCap;
                parameters[13].Value = item[i].NoiCap;
                if (item[i].NgayCap == null)
                {
                    parameters[12].Value = DBNull.Value;
                }
                if (item[i].NoiCap == null)
                {
                    parameters[13].Value = DBNull.Value;
                }


                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_DOITUONGKN, parameters).ToString(), 0);
                            trans.Commit();
                            /*Result.Message = "Thêm mới thành công!";
                            Result.Data = Result.Status;*/
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiNhomKN(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter(PARAM_SO_LUONG, SqlDbType.Int),
                    new SqlParameter(PARAM_TENCQ, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_LOAI_DOI_TUONG, SqlDbType.Int),
                    new SqlParameter(PARAM_DIACHI_CQ, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_DAIDIEN_PHAPLY, SqlDbType.Bit),
                    new SqlParameter(PARAM_DUOC_UYQUYEN, SqlDbType.Bit)
                };
                parameters[0].Value = item.NhomKN[i].SoLuong;
                parameters[1].Value = item.NhomKN[i].TenCQ ?? Convert.DBNull;
                parameters[2].Value = item.NhomKN[i].LoaiDoiTuongKNID;
                parameters[3].Value = item.NhomKN[i].DiaChiCQ ?? Convert.DBNull;
                parameters[4].Value = item.NhomKN[i].DaiDienPhapLy ?? Convert.DBNull;
                parameters[5].Value = item.NhomKN[i].DuocUyQuyen ?? Convert.DBNull;


                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_NHOMKN, parameters).ToString(), 0);
                            trans.Commit();
                            Result.Message = "Thêm mới thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiDonThu(List<DonThuMod> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]
                {
                    new SqlParameter(PARAM_NHOM_KN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_DOI_TUONG_BI_KN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_1ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_2ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_3ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_NOI_DUNG_DON, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_TRUNG_DON, SqlDbType.Bit),
                    new SqlParameter(PARAM_TINH_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_HUYEN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_XA_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LETANCHUYEN, SqlDbType.Bit),
                    new SqlParameter(PARAM_NGAYVIETDON, SqlDbType.DateTime),
                    new SqlParameter(PARAM_DIACHI, SqlDbType.NVarChar),
                };
                parms[0].Value = item[i].NhomKNID;
                //parms[0].Value = ThemMoiNhomKN(item).Status;
                parms[1].Value = item[i].DoiTuongBiKNID;
                //parms[1].Value = ThemMoiDoiTuongBiKN(item).Status;
                parms[2].Value = item[i]?.LoaiKhieuTo1ID;
                parms[3].Value = item[i]?.LoaiKhieuTo2ID;
                parms[4].Value = item[i]?.LoaiKhieuTo3ID;
                parms[5].Value = item[i]?.LoaiKhieuToID;
                parms[6].Value = item[i].NoiDungDon;
                parms[7].Value = item[i].TrungDon != null ? item[i].TrungDon : false;
                parms[8].Value = item[i]?.TinhID;
                parms[9].Value = item[i]?.HuyenID;
                parms[10].Value = item[i]?.XaID;
                parms[11].Value = item[i].LeTanChuyen ?? Convert.DBNull;

                if (item[i].NgayVietDon == DateTime.MinValue)
                {
                    parms[12].Value = DBNull.Value;
                }
                else
                {
                    parms[12].Value = item[i].NgayVietDon;
                }

                if (item[i].DoiTuongBiKNID == null) parms[1].Value = DBNull.Value;
                parms[13].Value = item[i].DiaChiPhatSinh ?? Convert.DBNull;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_DONTHU, parms).ToString(), 0);
                            trans.Commit();
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiCaNhanBiKN(List<CaNhanBiKNMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]{
                    //new SqlParameter(PARAM_CA_NHAN_BIKN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_NGHE_NGHIEP,SqlDbType.NVarChar, 200),
                    new SqlParameter(PARAM_NOI_CONG_TAC,SqlDbType.NVarChar,100),
                    new SqlParameter(PARAM_CHUC_VU_ID,SqlDbType.Int),
                    new SqlParameter(PARAM_QUOC_TICH_ID,SqlDbType.Int),
                    new SqlParameter(PARAM_DAN_TOC_ID,SqlDbType.Int),
                    new SqlParameter(PARAM_DOI_TUONG_BIKN_ID,SqlDbType.Int)
                };
                //parms[0].Value = item.CaNhanBiKNID;
                parms[0].Value = item[i].NgheNghiep != null ? item[i].NgheNghiep : "";
                parms[1].Value = item[i]?.NoiCongTac;
                parms[2].Value = item[i].ChucVuID ?? Convert.DBNull;
                parms[3].Value = item[i].QuocTichID ?? Convert.DBNull;
                parms[4].Value = item[i].DanTocID ?? Convert.DBNull;
                //parms[5].Value = ;
                parms[5].Value = item[i].DoiTuongBiKNID;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "CaNhanBiKN_Insert", parms).ToString(), 0);
                            trans.Commit();
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiDoiTuongBiKN(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]{   
                    //new SqlParameter(PARAM_DOITUONGBIKN_ID,SqlDbType.Int),
                    new SqlParameter(PARAM_TEN_DOI_TUONG_BI_KN,SqlDbType.NVarChar),
                    new SqlParameter(PARAM_TINH_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_HUYEN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_XA_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_DIACHICHITIET, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_LOAI_DOI_TUONG_BI_KN, SqlDbType.Int),
                };
                parms[0].Value = item.DoiTuongBiKN[i]?.TenDoiTuongBiKN;
                parms[1].Value = item.DoiTuongBiKN[i].TinhID ?? Convert.DBNull;
                parms[2].Value = item.DoiTuongBiKN[i].HuyenID ?? Convert.DBNull;
                parms[3].Value = item.DoiTuongBiKN[i].XaID ?? Convert.DBNull;
                parms[4].Value = item.DoiTuongBiKN[i].DiaChiCT ?? Convert.DBNull;
                parms[5].Value = item.DoiTuongBiKN[i]?.LoaiDoiTuongBiKNID;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_DOITUONGBIKN, parms).ToString(), 0);
                            trans.Commit();
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiTiepDanKhongDon(List<TiepDanKhongDonMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter(infor_NgayTiep , SqlDbType.DateTime),
                    new SqlParameter(infor_GapLanhDao, SqlDbType.Bit),
                    new SqlParameter(infor_NgayGapLanhDao , SqlDbType.DateTime),
                    new SqlParameter(infor_NoiDungTiep , SqlDbType.NVarChar),
                    new SqlParameter(VuViecCu , SqlDbType.Bit),
                    new SqlParameter(CanBoTiepID, SqlDbType.Int),
                    new SqlParameter(DonThuID, SqlDbType.Int),
                    new SqlParameter(CoQuanID, SqlDbType.Int),
                    new SqlParameter(XuLyDonID , SqlDbType.Int),
                    new SqlParameter(LanTiep , SqlDbType.Int),
                    new SqlParameter(KetQuaTiep , SqlDbType.NVarChar),
                    new SqlParameter(SoDon , SqlDbType.NVarChar),
                    new SqlParameter(infor_NhomKNID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo1ID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo2ID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo3ID , SqlDbType.Int),
                    new SqlParameter(TenLanhDaoTiep , SqlDbType.NVarChar),
                    new SqlParameter(LanhDaoDangKy , SqlDbType.NVarChar),
                    new SqlParameter(KQQuaTiepDan , SqlDbType.NVarChar),
                    new SqlParameter(YeuCauNguoiDuocTiep , SqlDbType.NVarChar),
                    new SqlParameter(ThongTinTaiLieu , SqlDbType.NVarChar),
                    new SqlParameter(KetLuanNguoiChuTri , SqlDbType.NVarChar),
                    new SqlParameter(NguoiDuocTiepPhatBieu, SqlDbType.NVarChar),
                };
                parameters[0].Value = item[i].NgayTiep;
                parameters[1].Value = item[i].GapLanhDao;
                parameters[2].Value = item[i].NgayGapLanhDao;
                parameters[3].Value = item[i].NoiDungTiep;
                parameters[4].Value = item[i].VuViecCu;
                parameters[5].Value = item[i].CanBoTiepID;
                parameters[6].Value = item[i].DonThuID;//
                parameters[7].Value = item[i].CoQuanID;
                parameters[8].Value = item[i].XuLyDonID;//
                parameters[9].Value = item[i].LanTiep;
                parameters[10].Value = item[i].KetQuaTiep;
                parameters[11].Value = item[i].SoDon;
                parameters[12].Value = item[i].NhomKNID;//
                //parameters[12].Value = ThemMoiNhomKN(item).Data;
                parameters[13].Value = item[i].LoaiKhieuTo1ID;
                parameters[14].Value = item[i].LoaiKhieuTo2ID;
                parameters[15].Value = item[i].LoaiKhieuTo3ID;
                parameters[16].Value = item[i].TenLanhDaoTiep;
                parameters[17].Value = item[i].LanhDaoDangKy;
                parameters[18].Value = item[i].KQTiepDan;
                parameters[19].Value = item[i].YeuCauNguoiDuocTiep;
                parameters[20].Value = item[i].ThongTinTaiTieu;
                parameters[21].Value = item[i].KetQuaNguoiChuTri;
                parameters[22].Value = item[i].NguoiDuocTiepPhatBieu;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, ThongTinTiepDan_v2, parameters).ToString(), 0);
                            trans.Commit();
                            /*Result.Message = "Thêm mới thành công!";
                            Result.Data = Result.Status;*/
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiFileHoSo(FileHoSoMod item)
        {
            var Result = new BaseResultModel();
            try
            {
                var i = 0;
                if (item == null || item.TenFile == null || item.TenFile.Trim().Length < 1)
                {
                    Result.Status = 0;
                    Result.Message = "Tên file gốc không được trống";
                    return Result;
                }
                else
                {
                    SqlParameter[] parameters = new SqlParameter[]
                    {
                        new SqlParameter(PARAM_TEN_FILE, SqlDbType.NVarChar),
                        new SqlParameter(PARAM_TOMTAT , SqlDbType.NVarChar),
                        new SqlParameter(PARAM_NGAYUP, SqlDbType.DateTime),
                        new SqlParameter(PARAM_NGUOIUP, SqlDbType.Int),
                        new SqlParameter(PARAM_FILE_URL, SqlDbType.NVarChar),
                        new SqlParameter(PARAM_XULYDONID , SqlDbType.Int),
                        new SqlParameter(PARAM_DONTHUID , SqlDbType.Int),
                        new SqlParameter(PARAM_FILEID , SqlDbType.Int)
                    };
                    parameters[0].Value = item.TenFile.Trim();
                    parameters[1].Value = item.TomTat ?? Convert.DBNull;
                    parameters[2].Value = item.NgayUp;
                    parameters[3].Value = item.NguoiUp;
                    parameters[4].Value = item.FileUrl;
                    parameters[5].Value = item.XuLyDonID ?? Convert.DBNull;
                    parameters[6].Value = item.DonThuID ?? Convert.DBNull;
                    parameters[7].Value = item.FileID;

                    using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                    {
                        conn.Open();
                        using (SqlTransaction trans = conn.BeginTransaction())
                        {
                            try
                            {
                                Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_FILEHOSO, parameters), 0);
                                trans.Commit();
                                
                            }
                            catch (Exception ex)
                            {
                                Result.Status = -1;
                                Result.Message = ConstantLogMessage.API_Error_System;
                                trans.Rollback();
                                throw ex;
                            }
                        }
                    }
                    i++;
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = ConstantLogMessage.API_Error_System;
                throw;
            }
            return Result;
        }
        public BaseResultModel Insert_ThanhPhanTG(List<ThanhPhanThamGiaMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {

                    new SqlParameter("@TenCanBo" , SqlDbType.NVarChar),
                    new SqlParameter("@ChucVu" , SqlDbType.NVarChar),
                    new SqlParameter("@TiepDanKhongDonID", SqlDbType.Int),

                };
                parameters[0].Value = item[i].TenCanBo;
                parameters[1].Value = item[i].ChucVu;
                parameters[2].Value = item[i].TiepDanKhongDonID;
                //parameters[2].Value = Insert_ThonTinTiepDan(item).Data;
                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, @"ThanhPhanThamGia_Insert", parameters).ToString(), 0);
                            trans.Commit();
                            Result.Message = "Thêm mới thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel ThemMoiXuLyDon(List<XuLyDonMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]{   
                    //new SqlParameter(PARAM_DOITUONGBIKN_ID,SqlDbType.Int),
                    new SqlParameter(PARAM_DONTHUID, SqlDbType.Int),
                    new SqlParameter(PARAM_SO_LAN, SqlDbType.Int),
                    new SqlParameter(PARAM_SO_DON_THU,SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NGAY_NHAP_DON, SqlDbType.DateTime),
                    new SqlParameter(PARAM_NGUON_DON_DEN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_CQ_CHUYEN_DON_DEN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_SO_CONG_VAN, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NGAY_CHUYEN_DON, SqlDbType.DateTime),
                    new SqlParameter(PARAM_CQ_DA_GIAI_QUYET_ID, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_CAN_BO_GQ_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_CO_QUAN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_CAN_BO_TIEP_NHAN_ID, SqlDbType.Int),
                    new SqlParameter("HuongGiaiQuyetID", SqlDbType.Int),
                };
                parms[0].Value = item[i].DonThuID;
                parms[1].Value = item[i].SoLan;
                parms[2].Value = item[i].SoDonThu;
                parms[3].Value = item[i].NgayNhapDon;
                parms[4].Value = item[i].NguonDonDen;
                parms[5].Value = item[i]?.CQChuyenDonDenID;
                parms[6].Value = item[i].SoCongVan ?? Convert.DBNull;
                parms[7].Value = item[i]?.NgayChuyenDon;
                parms[8].Value = item[i]?.CQDaGiaiQuyetID;
                parms[9].Value = item[i].CanBoXuLyID ?? Convert.DBNull;
                parms[10].Value = item[i].CoQuanID;
                parms[11].Value = item[i].CanBoTiepNhapID;
                parms[12].Value = item[i].HuongGiaiQuyetID ?? Convert.DBNull;
                if (item[i].SoLan != null || item[i].SoLan == 0)
                {
                    parms[1].Value = 1;
                }
                else if (item[i].SoLan == 1)
                {
                    parms[1].Value = 2;
                }


                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "NVTiepDan_InsertXuLyDon_New_v2", parms).ToString(), 0);
                            trans.Commit();
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel GetSoDonThu(int coQuanID)
        {
            var Result = new BaseResultModel();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter(PARAM_CO_QUAN_ID, SqlDbType.Int)
            };
            parameters[0].Value = coQuanID;
            using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_SO_DON_BY_CO_QUAN, parameters))
            {
                if (dr.Read())
                {
                    Result.Status = 1;
                    Result.Message = Utils.GetString(dr["SoDonThu"], string.Empty);
                    Result.Data = Utils.GetString(dr["SoDonThu"], string.Empty);
                }
                dr.Close();
            }
            return Result;
        }
        public BaseResultModel DanhSachLoaiDoiTuongKN()
        {
            var Result = new BaseResultModel();
            List<LoaiDoiTuongKNMOD> Data = new List<LoaiDoiTuongKNMOD>();
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_ALL_LOAIDOITUONGKN, null))
                {
                    while (dr.Read())
                    {
                        LoaiDoiTuongKNMOD item = new LoaiDoiTuongKNMOD();
                        item.LoaiDoiTuongKNID = Utils.ConvertToInt32(dr["LoaiDoiTuongKNID"], 0);
                        item.TenLoaiDoiTuongKN = Utils.ConvertToString(dr["TenLoaiDoiTuongKN"], string.Empty);
                        Data.Add(item);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = Data;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        public BaseResultModel DanhSachLoaiDoiTuongBiKN()
        {
            var Result = new BaseResultModel();
            List<LoaiDoiTuongBiKNMOD> Data = new List<LoaiDoiTuongBiKNMOD>();
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, @"DM_LoaiDoiTuongBiKN_GetAll", null))
                {
                    while (dr.Read())
                    {
                        LoaiDoiTuongBiKNMOD item = new LoaiDoiTuongBiKNMOD();
                        item.LoaiDoiTuongBiKNID = Utils.ConvertToInt32(dr["LoaiDoiTuongBiKNID"], 0);
                        item.TenLoaiDoiTuongBiKN = Utils.ConvertToString(dr["TenLoaiDoiTuongBiKN"], string.Empty);
                        Data.Add(item);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = Data;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        public BaseResultModel Insert_TiepDan_DanKhongDen (Insert_TiepDan_DanKhongDenMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {

                    new SqlParameter("@TenCanBo", SqlDbType.NVarChar),
                    new SqlParameter("@CanBoID", SqlDbType.Int),
                    new SqlParameter("@NguoiTaoID", SqlDbType.Int),
                    new SqlParameter("@NgayTruc", SqlDbType.DateTime),
                    new SqlParameter("@ChucVu", SqlDbType.NVarChar),
                    
                };
                parameters[0].Value = item.TenCanBo;
                parameters[1].Value = item.CanBoID != null;
                parameters[2].Value = item.NguoiTaoID != null;
                parameters[3].Value = item.NgayTruc;
                parameters[4].Value = item.ChucVu;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, @"TiepDan_DanKhongDen_Insert", parameters).ToString(), 0);
                            trans.Commit();
                            Result.Message = "Thêm mới thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        public BaseResultModel Update_TiepDan_DanKhongDen(Insert_TiepDan_DanKhongDenMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@DanKhongDenID",SqlDbType.Int),
                    new SqlParameter("@TenCanBo" , SqlDbType.NVarChar),
                    //new SqlParameter("@NguoiTaoID" , SqlDbType.Int),
                    new SqlParameter("@NgayTruc", SqlDbType.DateTime),
                    new SqlParameter("@ChucVu" , SqlDbType.NVarChar)

                };
                parameters[0].Value = item.DanKhongDenID;
                parameters[1].Value = item.TenCanBo;
                //parameters[3].Value = item.NguoiTaoID;
                parameters[2].Value = item.NgayTruc;
                parameters[3].Value = item.ChucVu;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_DanKhongDen, parameters);
                            trans.Commit();
                            Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_UPDATE;
            }
            return Result;
        }
        public int CoundTrungDon(int donthuID)
        {
            //var Result = new BaseResultModel();
            int result = 0;
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = donthuID;

            using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, @"NV_TiepDan_CountTrungDon", parameters))
            {
                if (dr.Read())
                {
                    result = Utils.ConvertToInt32(dr["SoLanTrung"], 0);
                }
                dr.Close();
            }

            return result;
        }
        public int CountSoLanGQ(int? donthuID, int? stateID)
        {
            int result = 0;
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int),
                new SqlParameter("StateID", SqlDbType.Int)
            };
            parameters[0].Value = donthuID != null ? donthuID : 0;
            parameters[1].Value = stateID != null ? stateID : 0;
            using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_CheckKhieuToLan2_SoLanGQ", parameters))
            {
                if (dr.Read())
                {
                    result = Utils.ConvertToInt32(dr["LanGQ"], 0);
                }
                dr.Close();
            }
            return result;
        }
        public BaseResultModel CheckTrung(CheckTrungDonHoTen p, int? TotalRow)
        {
            var Result = new BaseResultModel();
            List<NoiDungCheck> Data = new List<NoiDungCheck>();
            SqlParameter[] parameters = new SqlParameter[]
            {

                new SqlParameter("@HoTen" ,SqlDbType.NVarChar),
                new SqlParameter("@DiaChi" ,SqlDbType.NVarChar),
                new SqlParameter("@CMND" ,SqlDbType.NVarChar),
                new SqlParameter("@NoiDungDon" ,SqlDbType.NVarChar),
                new SqlParameter("@TotalRow", SqlDbType.Int),

            };

            parameters[0].Value = p.HoTen != null ? p.HoTen.ToString() : "";
            parameters[1].Value = p.DiaChi != null ? p.DiaChi.ToString() : "";
            parameters[2].Value = p.CMND != null ? p.CMND.ToString() : "";
            parameters[3].Value = p.NoiDungDon != null ? p.NoiDungDon.ToString() : "";
            parameters[4].Direction = ParameterDirection.Output;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_CheckTrungDonByHoTen", parameters))
                {
                    while (dr.Read())
                    {
                        NoiDungCheck item = new NoiDungCheck();
                        item.hoTen = Utils.ConvertToString(dr["HoTen"], string.Empty);
                        item.DiaChi = Utils.ConvertToString(dr["DiaChi"], string.Empty);
                        item.LanTrung = Utils.ConvertToInt32(dr["TrungDon"], 0);
                        item.NoiDungDon = Utils.ConvertToString(dr["noiDungDon"], string.Empty);
                        item.DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0);
                        item.TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], string.Empty);
                        item.LoaiKhieuTo1ID = Utils.ConvertToInt32(dr["LoaiKhieuTo1ID"], 0);
                        item.ConQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        item.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);                     
                        Data.Add(item);                      
                    }
                    dr.Close();
                }

                Result.Status = 1;
                Result.Message = "Danh sách trùng đơn ";
                Result.Data = Data;
                Result.TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);

            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        public BaseResultModel CheckKhieuToLan2(CheckKhieuToLan2 p)
        {
            var Result = new BaseResultModel();
            List<NoiDungCheckKhieuToLan2> Data = new List<NoiDungCheckKhieuToLan2>();

            SqlParameter[] parameters = new SqlParameter[]
            {

                new SqlParameter("@HoTen" ,SqlDbType.NVarChar),
                new SqlParameter("@DiaChi" ,SqlDbType.NVarChar),
                new SqlParameter("@CMND" ,SqlDbType.NVarChar),
                new SqlParameter("@NoiDungDon" ,SqlDbType.NVarChar),
                new SqlParameter("StateID" , SqlDbType.Int)


            };

            parameters[0].Value = p.HoTen != null ? p.HoTen.ToString() : "";
            parameters[1].Value = p.DiaChi != null ? p.DiaChi.ToString() : "";
            parameters[2].Value = p.CMND != null ? p.CMND.ToString() : "";
            parameters[3].Value = p.NoiDungDon != null ? p.NoiDungDon.ToString() : "";
            parameters[4].Value = p.StateID != null;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_CheckKhieuToLan2_ByHoTen", parameters))
                {
                    while (dr.Read())
                    {
                        NoiDungCheckKhieuToLan2 item = new NoiDungCheckKhieuToLan2();
                        item.hoTen = Utils.ConvertToString(dr["HoTen"], string.Empty);
                        item.DiaChi = Utils.ConvertToString(dr["DiaChi"], string.Empty);
                        item.noiDungDon = Utils.ConvertToString(dr["noiDungDon"], string.Empty);
                        item.DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0);
                        item.TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], string.Empty);
                        item.LoaiKhieuTo1ID = Utils.ConvertToInt32(dr["LoaiKhieuTo1ID"], 0);
                        item.ConQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        item.HuongGiaiQuyetID = Utils.ConvertToInt32(dr["HuongGiaiQuyetID"], 0);
                        item.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);

                        Data.Add(item);
                    }
                    dr.Close();
                }

                Result.Status = 1;
                Result.Message = "Danh sách kiểm tra trùng lần 2 ";
                Result.Data = Data;

            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        public BaseResultModel DemSoDonTrung(DemDonTrung p )
        {
            var Result = new BaseResultModel();
            int dem = 0;
            SqlParameter[] parameters = new SqlParameter[]
            {

                new SqlParameter("@HoTen" ,SqlDbType.NVarChar),
                new SqlParameter("@DiaChi" ,SqlDbType.NVarChar),
                new SqlParameter("@CMND" ,SqlDbType.NVarChar),
                new SqlParameter("@NoiDungDon" ,SqlDbType.NVarChar),
                new SqlParameter("@ToCao" ,SqlDbType.Int),
                new SqlParameter("@CoQuanID" ,SqlDbType.Int),


            };

            parameters[0].Value = p.HoTen != null ? p.HoTen.ToString() : "";
            parameters[1].Value = p.DiaChi != null ? p.DiaChi.ToString() : "";
            parameters[2].Value = p.CMND != null ? p.CMND.ToString() : "";
            parameters[3].Value = p.NoiDungDon != null ? p.NoiDungDon.ToString() : "";
            parameters[4].Value = p.ToCao != null ;
            parameters[5].Value = p.CoQuanID != null;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_CheckSoDonTrung ", parameters))
                {
                    while (dr.Read())
                    {                      
                       dem = Utils.GetInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }

                Result.Status = 1;
                Result.Message = "Tổng Số đơn trùng";
                Result.TotalRow = dem;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        public BaseResultModel STT(int CoQuanID)
        {
            var Result = new BaseResultModel();
           
            int result = 0;

            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("CoQuanID" , SqlDbType.Int)

            };

            parameters[0].Value = CoQuanID;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_GetSoDonByCoQuan ", parameters))
                {
                    while (dr.Read())
                    {
                        result = Utils.ConvertToInt32(dr["SoDon"], 0);
                    }
                    dr.Close();
                }

                Result.Status = 1;
                Result.Message = "STT";
                Result.Data = result;

            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }

            return Result;

        }
        public BaseResultModel KhieuToLan2ByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            List<TiepDanInfo> ls_donthu = new List<TiepDanInfo>();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(DonThuID,SqlDbType.Int)
            };

            parameters[0].Value = donthuID;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_CTKHIEUTOLAN2_BY_DONTHU_ID, parameters))
                {
                    while (dr.Read())
                    {
                        TiepDanInfo info = new TiepDanInfo();
                        info.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
                        info.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);
                        info.CoQuanID = Utils.GetInt32(dr["CoQuanID"], 0);
                        info.LoaiKhieuTo1ID = Utils.ConvertToInt32(dr["LoaiKhieuTo1ID"], 0);
                        //info.LanTiep = Utils.GetInt32(dr["LanTiep"], 0);
                        info.HoTen = Utils.GetString(dr["HoTen"], string.Empty);
                        info.DiaChiCT = Utils.GetString(dr["DiaChi"], string.Empty);
                        info.TenLoaiKhieuTo = Utils.GetString(dr["TenLoaiKhieuTo"], string.Empty);
                        info.NoiDungDon = Utils.GetString(dr["NoiDungDon"], string.Empty);
                        info.NoiDungHuongDan = Utils.GetString(dr["NoiDungHuongDan"], string.Empty);
                        info.TenHuongGiaiQuyet = Utils.GetString(dr["TenHuongGiaiQuyet"], string.Empty);
                        info.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);
                        info.TinhID = Utils.GetInt32(dr["TinhID"], 0);
                        info.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
                        info.XaID = Utils.GetInt32(dr["XaID"], 0);
                        info.NgayNhapDon = Utils.ConvertToDateTime(dr["NgayNhapDon"], DateTime.MinValue);
                        info.NgayNhapDon_Str = Format.FormatDate(info.NgayNhapDon);
                        info.KetQuaTiep = Utils.ConvertToString(dr["KetQuaTiep"], string.Empty);
                        info.SoDonThu = Utils.ConvertToString(dr["SoDonThu"], string.Empty);
                        info.TenCoQuanDaGQ = Utils.ConvertToString(dr["TenCoQuanDaGQ"], string.Empty);
                        info.StateID = Utils.ConvertToInt32(dr["StateID"], 0);
                        ls_donthu.Add(info);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = ls_donthu;
                Result.TotalRow = 0;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        // ---------------------------------
        // Update 
        public BaseResultModel UpdateXuLyDon(List<XuLyDonMOD> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]{
                     new SqlParameter(PARAM_XU_LY_DON_ID,SqlDbType.Int),
                     new SqlParameter(PARAM_SO_DON_THU,SqlDbType.NVarChar),
                     new SqlParameter(PARAM_NGAY_NHAP_DON, SqlDbType.DateTime),
                     new SqlParameter(PARAM_CQ_CHUYEN_DON_DEN_ID, SqlDbType.Int),
                     new SqlParameter(PARAM_NGAY_CHUYEN_DON, SqlDbType.DateTime),
                     new SqlParameter(PARAM_DONTHUID, SqlDbType.Int),
                     new SqlParameter(PARAM_SO_LAN, SqlDbType.Int),
                     new SqlParameter(PARAM_CQ_DA_GIAI_QUYET_ID, SqlDbType.NVarChar),
                     new SqlParameter(PARAM_CAN_BO_GQ_ID, SqlDbType.Int),
                     new SqlParameter("CoQuanID",SqlDbType.Int)
                 };
                parms[0].Value = item[i].XuLyDonID;
                parms[1].Value = item[i].SoDonThu;
                parms[2].Value = item[i].NgayNhapDon;
                parms[3].Value = item[i].CQChuyenDonDenID;
                parms[4].Value = item[i].NgayChuyenDon;
                parms[5].Value = item[i].DonThuID;
                parms[6].Value = item[i].SoLan;
                parms[7].Value = item[i].CQDaGiaiQuyetID;
                parms[8].Value = item[i].CanBoXuLyID;
                parms[9].Value = item[i].CoQuanID;


                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "NVTiepDan_UpdateXuLyDon_New_v2", parms);
                            trans.Commit();

                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_UPDATE;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_UPDATE;
            }
            return Result;
        }
        public BaseResultModel UpdateDonThu(List<DonThuMod> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]
                {
                    new SqlParameter(PARAM_DON_THU_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_NHOM_KN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_DOI_TUONG_BI_KN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_1ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_2ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_3ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LOAI_KHIEU_TO_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_NOI_DUNG_DON, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_TRUNG_DON, SqlDbType.Bit),
                    new SqlParameter(PARAM_TINH_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_HUYEN_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_XA_ID, SqlDbType.Int),
                    new SqlParameter(PARAM_LETANCHUYEN, SqlDbType.Bit),
                    new SqlParameter(PARAM_NGAYVIETDON, SqlDbType.DateTime),
                    new SqlParameter(PARAM_DIACHI, SqlDbType.NVarChar),
                };
                parms[0].Value = item[i].DonThuID;
                parms[1].Value = item[i].NhomKNID;
                parms[2].Value = item[i].DoiTuongBiKNID;
                parms[3].Value = item[i].LoaiKhieuTo1ID;
                parms[4].Value = item[i].LoaiKhieuTo2ID;
                parms[5].Value = item[i].LoaiKhieuTo3ID;
                parms[6].Value = item[i].LoaiKhieuToID;
                parms[7].Value = item[i].NoiDungDon;
                parms[8].Value = item[i].TrungDon;
                parms[9].Value = item[i].TinhID;
                parms[10].Value = item[i].HuyenID;
                parms[11].Value = item[i].XaID;
                parms[12].Value = item[i].LeTanChuyen;

                if (item[i].NgayVietDon == DateTime.MinValue)
                {
                    parms[13].Value = DBNull.Value;
                }
                else
                {
                    parms[13].Value = item[i].NgayVietDon;
                }

                if (item[i].DoiTuongBiKNID == 0) parms[1].Value = DBNull.Value;
                parms[14].Value = item[i].DiaChiPhatSinh;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "NVTiepDan_UpdateDonThu", parms);
                            trans.Commit();
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_UPDATE;
                            trans.Rollback();
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_INSERT;
            }
            return Result;
        }
        public BaseResultModel UpdateNhomKN(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                     new SqlParameter(PARAM_NHOMKN_ID, SqlDbType.Int),
                     new SqlParameter(PARAM_SO_LUONG, SqlDbType.Int),
                     new SqlParameter(PARAM_TENCQ, SqlDbType.NVarChar),
                     new SqlParameter(PARAM_LOAI_DOI_TUONG, SqlDbType.Int),
                     new SqlParameter(PARAM_DIACHI_CQ, SqlDbType.NVarChar),
                     new SqlParameter(PARAM_DAIDIEN_PHAPLY, SqlDbType.Bit),
                     new SqlParameter(PARAM_DUOC_UYQUYEN, SqlDbType.Bit)
                };
                parameters[0].Value = item.NhomKN[i].NhomKNID;
                parameters[1].Value = item.NhomKN[i].SoLuong;
                parameters[2].Value = item.NhomKN[i].TenCQ;
                parameters[3].Value = item.NhomKN[i].LoaiDoiTuongKNID;
                parameters[4].Value = item.NhomKN[i].DiaChiCQ;
                parameters[5].Value = item.NhomKN[i].DaiDienPhapLy;
                parameters[6].Value = item.NhomKN[i].DuocUyQuyen;

                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_NhomKN, parameters);
                            trans.Commit();
                            //Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_UPDATE;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_UPDATE;
            }
            return Result;
        }
        public BaseResultModel UpdateDoiTuongBiKN(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@DoiTuongBiKNID",SqlDbType.Int),
                    new SqlParameter("@TenDoiTuongBiKN" , SqlDbType.NVarChar),
                    new SqlParameter("@TinhID" , SqlDbType.Int),
                    new SqlParameter("@HuyenID", SqlDbType.Int),
                    new SqlParameter("@XaID", SqlDbType.Int),
                    new SqlParameter("@DiaChiCT", SqlDbType.NVarChar),
                    new SqlParameter("@LoaiDoiTuongBiKNID", SqlDbType.Int),
                };
                parameters[0].Value = item.DoiTuongBiKN[i].DoiTuongBiKNID;
                parameters[1].Value = item.DoiTuongBiKN[i].TenDoiTuongBiKN;
                parameters[2].Value = item.DoiTuongBiKN[i].TinhID;
                parameters[3].Value = item.DoiTuongBiKN[i].HuyenID;
                parameters[4].Value = item.DoiTuongBiKN[i].XaID;
                parameters[5].Value = item.DoiTuongBiKN[i].DiaChiCT;
                parameters[6].Value = item.DoiTuongBiKN[i].LoaiDoiTuongBiKNID;
                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_DoiTuongBiKN, parameters);
                            trans.Commit();
                            Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_INSERT;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_UPDATE;
            }
            return Result;
        }
        public BaseResultModel UpdateDoiTuongKN(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter(PARAM_DoiTuongKNID , SqlDbType.Int),
                    new SqlParameter(PARAM_HoTen, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_CMND, SqlDbType.VarChar),
                    new SqlParameter(PARAM_GioiTinh, SqlDbType.Int),
                    new SqlParameter(PARAM_NgheNghiep, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_QuocTichID, SqlDbType.Int),
                    new SqlParameter(PARAM_DanTocID, SqlDbType.Int),
                    new SqlParameter(PARAM_TinhID, SqlDbType.Int),
                    new SqlParameter(PARAM_HuyenID, SqlDbType.Int),
                    new SqlParameter(PARAM_XaID, SqlDbType.Int),
                    new SqlParameter(PARAM_DiaChiCT, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NhomKNID, SqlDbType.Int),
                    new SqlParameter(PARAM_SoDienThoai, SqlDbType.NVarChar),
                    new SqlParameter(PARAM_NgayCap, SqlDbType.DateTime),
                    new SqlParameter(PARAM_NoiCap, SqlDbType.NVarChar)
                };
                parameters[0].Value = item.DoiTuongKN[i].DoiTuongKNID;
                parameters[1].Value = item.DoiTuongKN[i].HoTen;
                parameters[2].Value = item.DoiTuongKN[i].CMND;
                parameters[3].Value = item.DoiTuongKN[i].GioiTinh;
                parameters[4].Value = item.DoiTuongKN[i].NgheNghiep;
                parameters[5].Value = item.DoiTuongKN[i].QuocTichID;
                parameters[6].Value = item.DoiTuongKN[i].DanTocID;
                parameters[7].Value = item.DoiTuongKN[i].TinhID;
                parameters[8].Value = item.DoiTuongKN[i].HuyenID;
                parameters[9].Value = item.DoiTuongKN[i].XaID;
                parameters[10].Value = item.DoiTuongKN[i].DiaChiCT;
                parameters[11].Value = item.DoiTuongKN[i].NhomKNID;
                parameters[12].Value = item.DoiTuongKN[i].SoDienThoai;
                parameters[13].Value = item.DoiTuongKN[i].NgayCap;
                parameters[14].Value = item.DoiTuongKN[i].NoiCap;
                if (item.DoiTuongKN[i].NgayCap == null)
                {
                    parameters[15].Value = DBNull.Value;
                }
                if (item.DoiTuongKN[i].NoiCap == null)
                {
                    parameters[16].Value = DBNull.Value;
                }

                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_DoiTuongKN, parameters);
                            trans.Commit();
                            //Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception ex)
                        {
                            Result.Status = -1;
                            Result.Message = Constant.ERR_UPDATE;
                            trans.Rollback();
                        }
                    }
                }
            }
            catch (Exception)
            {
                Result.Status = -1;
                Result.Message = Constant.ERR_UPDATE;
            }
            return Result;
        }
        public BaseResultModel UpdateTiepDanKhongDon(TiepDanTrucTiepMOD item)
        {
            var Result = new BaseResultModel();

            int i = 0;
            SqlParameter[] parameters = new SqlParameter[]
            {
                    new SqlParameter("TiepDanKhongDonID" , SqlDbType.Int),
                    new SqlParameter(infor_NgayTiep , SqlDbType.DateTime),
                    new SqlParameter(infor_GapLanhDao, SqlDbType.Bit),
                    new SqlParameter(infor_NgayGapLanhDao , SqlDbType.DateTime),
                    new SqlParameter(infor_NoiDungTiep , SqlDbType.NVarChar),
                    new SqlParameter(VuViecCu , SqlDbType.Bit),
                    new SqlParameter(CanBoTiepID, SqlDbType.Int),
                    new SqlParameter(DonThuID, SqlDbType.Int),
                    new SqlParameter(CoQuanID, SqlDbType.Int),
                    new SqlParameter(XuLyDonID , SqlDbType.Int),
                    new SqlParameter(LanTiep , SqlDbType.Int),
                    new SqlParameter(KetQuaTiep , SqlDbType.NVarChar),
                    new SqlParameter(SoDon , SqlDbType.NVarChar),
                    new SqlParameter(infor_NhomKNID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo1ID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo2ID , SqlDbType.Int),
                    new SqlParameter(LoaiKhieuTo3ID , SqlDbType.Int),
                    new SqlParameter(TenLanhDaoTiep , SqlDbType.NVarChar),
                    new SqlParameter(LanhDaoDangKy , SqlDbType.NVarChar),
                    new SqlParameter(KQQuaTiepDan , SqlDbType.NVarChar),
                    new SqlParameter(YeuCauNguoiDuocTiep , SqlDbType.NVarChar),
                    new SqlParameter(ThongTinTaiLieu , SqlDbType.NVarChar),
                    new SqlParameter(KetLuanNguoiChuTri , SqlDbType.NVarChar),
                    new SqlParameter(NguoiDuocTiepPhatBieu, SqlDbType.NVarChar),
            };
            parameters[0].Value = item.TiepDanKhongDon[i].TiepDanKhongDonID;
            parameters[1].Value = item.TiepDanKhongDon[i].NgayTiep;
            parameters[2].Value = item.TiepDanKhongDon[i].GapLanhDao;
            parameters[3].Value = item.TiepDanKhongDon[i].NgayGapLanhDao;
            parameters[4].Value = item.TiepDanKhongDon[i].NoiDungTiep;
            parameters[5].Value = item.TiepDanKhongDon[i].VuViecCu;
            parameters[6].Value = item.TiepDanKhongDon[i].CanBoTiepID;
            parameters[7].Value = item.TiepDanKhongDon[i].DonThuID;
            parameters[8].Value = item.TiepDanKhongDon[i].CoQuanID;
            parameters[9].Value = item.TiepDanKhongDon[i].XuLyDonID;
            parameters[10].Value = item.TiepDanKhongDon[i].LanTiep;
            parameters[11].Value = item.TiepDanKhongDon[i].KetQuaTiep;
            parameters[12].Value = item.TiepDanKhongDon[i].SoDon;
            parameters[13].Value = item.TiepDanKhongDon[i].NhomKNID;
            parameters[14].Value = item.TiepDanKhongDon[i].LoaiKhieuTo1ID;
            parameters[15].Value = item.TiepDanKhongDon[i].LoaiKhieuTo2ID;
            parameters[16].Value = item.TiepDanKhongDon[i].LoaiKhieuTo3ID;
            parameters[17].Value = item.TiepDanKhongDon[i].TenLanhDaoTiep;
            parameters[18].Value = item.TiepDanKhongDon[i].LanhDaoDangKy;
            parameters[19].Value = item.TiepDanKhongDon[i].KQTiepDan;
            parameters[20].Value = item.TiepDanKhongDon[i].YeuCauNguoiDuocTiep;
            parameters[21].Value = item.TiepDanKhongDon[i].ThongTinTaiTieu;
            parameters[22].Value = item.TiepDanKhongDon[i].KetQuaNguoiChuTri;
            parameters[23].Value = item.TiepDanKhongDon[i].NguoiDuocTiepPhatBieu;


            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        /*Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "Update_TiepDanKhongDon", parameters);
                        trans.Commit();*/
                        Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "Update_TiepDanKhongDon", parameters);
                        trans.Commit();
                        //Result.Message = "Cập nhật thành công!";
                        Result.Data = Result.Status;

                    }
                    catch (Exception ex)
                    {
                        Result.Status = -1;
                        Result.Message = Constant.ERR_INSERT;
                        trans.Rollback();
                    }
                }
            }

            return Result;
        }
        public BaseResultModel UpdateCaNhanBiKN(List<CaNhanBiKNMOD> item)
        {
            var Result = new BaseResultModel();

            int i = 0;
            SqlParameter[] parameters = new SqlParameter[]
            {
                    new SqlParameter("@CaNhanBiKNID" , SqlDbType.Int),
                    new SqlParameter("@NgheNghiep" , SqlDbType.NVarChar),
                    new SqlParameter("@NoiCongTac" , SqlDbType.NVarChar),
                    new SqlParameter("@ChucVuID", SqlDbType.Int),
                    new SqlParameter("@QuocTichID", SqlDbType.Int),
                    new SqlParameter("@DanTocID", SqlDbType.Int),
                    new SqlParameter("@DoiTuongBiKNID", SqlDbType.Int),
            };
            parameters[0].Value = item[i].CaNhanBiKNID;
            parameters[1].Value = item[i].NgheNghiep;
            parameters[2].Value = item[i].NoiCongTac;
            parameters[3].Value = item[i].ChucVuID;
            parameters[4].Value = item[i].QuocTichID;
            parameters[5].Value = item[i].DanTocID;
            parameters[6].Value = item[i].DoiTuongBiKNID;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "Update_CaNhanBiKN", parameters);
                        trans.Commit();

                    }
                    catch (Exception)
                    {
                        Result.Status = -1;
                        Result.Message = Constant.ERR_UPDATE;
                        trans.Rollback();
                    }
                }
            }
            return Result;
        }
    }   
}
