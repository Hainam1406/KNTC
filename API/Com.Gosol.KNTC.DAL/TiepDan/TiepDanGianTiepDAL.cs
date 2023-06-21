using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.DAL.TiepDan
{
    public class TiepDanGianTiepDAL
    {
        #region Variable
        //Su dung de goi StoreProcedure
        private const string INSERT_DOITUONGKN = @"DoiTuongKN_Insert_New";
        private const string INSERT_NHOMKN = @"NhomKN_Insert";
        private const string GET_ALL_LOAIDOITUONGKN = @"DM_LoaiDoiTuongKN_GetAll";
        private const string INSERT_DONTHU = @"NVTiepDan_InsertDonThu";
        private const string INSERT_CANHANBIKN = @"CaNhanBiKN_Insert";
        private const string INSERT_DOITUONGBIKN = @"DoiTuongBiKN_Insert";
        private const string CHECK_TRUNG_DON_BY_HOTEN = @"NV_TiepDan_CheckTrungDonByHoTen";
        private const string COUND_TRUNGDON_BY_DONTHUID = @"NV_TiepDan_CountTrungDon";
        private const string GET_CTTRUNGDON_BY_DONTHU_ID = @"NV_TiepDan_GetCTTrungDonByDonID";
        private const string CHECK_KHIEUTOLAN2_BY_HOTEN = @"NV_TiepDan_CheckKhieuToLan2_ByHoTen";
        private const string CHECK_KHIEUTOLAN2_SOLANGQ = @"NV_TiepDan_CheckKhieuToLan2_SoLanGQ";
        private const string GET_CTKHIEUTOLAN2_BY_DONTHU_ID = @"NV_TiepDan_GetCTTrungDonByDonID_DonThuKTLan2";
        private const string GET_SO_DON_BY_CO_QUAN = @"NV_XuLyDon_GetSoDonByCoQuan";
        private const string INSERT_FILEHOSO = @"FileHoSo_Insert_New";
        private const string DELETE_FILEHOSO = @"FileHoSo_Delete";

        //Update
        private const string Update_DoiTuongKN = "DoiTuongKN_Update_New";
        private const string Update_NhomKN = "NhomKN_Update";
        private const string Update_DonThu = "NVTiepDan_UpdateDonThu";
        private const string Update_CaNhanBiKN = "CaNhanBiKN_Update";
        private const string Update_DoiTuongBiKN = "DoiTuongBiKN_Update";

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

        private const string PARAM_NHOMKN_ID = "@NhomKNID";
        private const string PARAM_SO_LUONG = "@SoLuong";
        private const string PARAM_TENCQ = "@TenCoQuan";
        private const string PARAM_LOAI_DOI_TUONG = "@LoaiDoiTuongKNID";
        private const string PARAM_DIACHI_CQ = "@DiaChiCQ";
        private const string PARAM_DAIDIEN_PHAPLY = "@DaiDienPhapLy";
        private const string PARAM_DUOC_UYQUYEN = "@DuocUyQuyen";

        private const string PARAM_LOAI_DOI_TUONG_KN_ID = "@LoaiDoiTuongKNID";
        private const string PARAM_TEN_LOAI_DOI_TUONG_KN = "@TenLoaiDoiTuongKN";

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
        //private const string PARAM_TINH_ID = "@TinhID";
        //private const string PARAM_HUYEN_ID = "@HuyenID";
        //private const string PARAM_XA_ID = "@XaID";
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
        private const string PARAM_HUONG_GIAI_QUYET_ID = "@HuongGiaiQuyetID";

        #endregion

        /// <summary>
        /// Thêm mới đối tượng khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel ThemMoiDoiTuongKN(List<DoiTuongKNInfo> item)
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
                //parameters[10].Value = ThemMoiNhomKN(item).Status;
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

        // Thêm mới nhóm khiếu nại
        public BaseResultModel ThemMoiNhomKN(TiepDanGianTiepMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    //new SqlParameter(PARAM_NHOMKN_ID, SqlDbType.Int),
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

        // Get danh sách Loại đối tượng khiếu nại
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

        // Thêm mới đơn thư
        public BaseResultModel ThemMoiDonThu(List<DonThuMOD> item)
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

        // thêm mới cá nhân bị khiếu nại
        public BaseResultModel ThemMoiCaNhanBiKN(List<CaNhanBiKN> item)
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
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_CANHANBIKN, parms).ToString(), 0);
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

        // Thêm mới đối tượng bị khiếu nại
        public BaseResultModel ThemMoiDoiTuongBiKN(TiepDanGianTiepMOD item)
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

        // thêm mới thông tin tiếp nhận đơn thư
        public BaseResultModel ThemMoiTiepNhanDT(List<ThongTinTiepNhanDT> item)
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
                    new SqlParameter(PARAM_HUONG_GIAI_QUYET_ID, SqlDbType.Int),
                };
                //parms[0].Value = ThemMoiDonThu(item).Status;
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

        /// <summary>
        /// Thêm mới file hồ sơ
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        /*public BaseResultModel InsertFileHoSo(FileDinhKemModel FileDinhKemModel)
        {
            var Result = new BaseResultModel();
            try
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
                parameters[0].Value = FileDinhKemModel.TenFile.Trim();
                parameters[1].Value = FileDinhKemModel.TomTat;
                parameters[2].Value = FileDinhKemModel.NgayCapNhat;
                parameters[3].Value = FileDinhKemModel.NguoiCapNhat;
                parameters[4].Value = FileDinhKemModel.FileUrl;
                parameters[5].Value = FileDinhKemModel.XuLyDonID;
                parameters[6].Value = FileDinhKemModel.DonThuID;
                parameters[7].Value = FileDinhKemModel.FileID;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            var query = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_FILEHOSO, parameters).ToString(), 0);
                            trans.Commit();
                            if (query > 0)
                            {
                                Result.Status = 1;
                                Result.Data = query;
                                Result.Message = ConstantLogMessage.Alert_Insert_Success("File đính kèm");
                            }
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
        }*/

        public BaseResultModel ThemMoiFileHoSo(FileHoSoMOD item)
        {
            var Result = new BaseResultModel();
            try
            {
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
                                /*if (query > 0)
                                {
                                    Result.Status = query;
                                    //Result.Data = query;
                                    Result.Message = ConstantLogMessage.Alert_Insert_Success("File hồ sơ");
                                }*/
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

        // check trùng đơn
        public BaseResultModel GetDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? TotalRow)
        {
            List<CheckTrungDonMOD> ls_donthu = new List<CheckTrungDonMOD>();
            var Result = new BaseResultModel();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_HoTen, SqlDbType.NVarChar, 150),
                new SqlParameter(PARAM_DIACHI, SqlDbType.NVarChar, 250),
                new SqlParameter(PARAM_CMND, SqlDbType.NVarChar, 50),
                new SqlParameter(PARAM_NOI_DUNG_DON, SqlDbType.NVarChar, 200),
                new SqlParameter("@TotalRow", SqlDbType.Int),
            };

            parameters[0].Value = hoTen != null ? hoTen : "";
            parameters[1].Value = diachi != null ? diachi : "";
            parameters[2].Value = cmnd != null ? cmnd : "";
            parameters[3].Value = noidungdon != null ? noidungdon : "";
            parameters[4].Direction = ParameterDirection.Output;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, CHECK_TRUNG_DON_BY_HOTEN, parameters))
                {
                    while (dr.Read())
                    {
                        //DonThuInfo DTInfo = GetDataByHoTen(dr);
                        CheckTrungDonMOD info = new CheckTrungDonMOD();
                        info.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
                        info.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);
                        //info.CoQuanID = Utils.GetInt32(dr["CoQuanID"], 0);
                        info.LoaiKhieuTo1ID = Utils.ConvertToInt32(dr["LoaiKhieuTo1ID"], 0);
                        //info.LanTiep = Utils.GetInt32(dr["LanTiep"], 0);
                        info.HoTen = Utils.GetString(dr["HoTen"], string.Empty);
                        info.DiaChiCT = Utils.GetString(dr["DiaChi"], string.Empty);
                        info.TenLoaiKhieuTo = Utils.GetString(dr["TenLoaiKhieuTo"], string.Empty);
                        info.NoiDungDon = Utils.GetString(dr["NoiDungDon"], string.Empty);
                        //info.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        info.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);
                        info.CoQuanID = Utils.GetInt32(dr["CoQuanID"], 0);
                        //info.TenCoQuan = Utils.GetString(dr["TenCoQuan"], string.Empty);
                        info.SoLan = CoundTrungDon(info.DonThuID);
                        ls_donthu.Add(info);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "Danh sách trùng đơn";
                Result.Data = ls_donthu;
                Result.TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // Kiểm tra số đơn trùng
        public BaseResultModel CheckSoDonTrung(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? toCao, int? coQuanID)
        {
            //IList<TiepDanInfo> ls_donthu = new List<TiepDanInfo>();
            var Result = new BaseResultModel();
            int dem = 0;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_HoTen, SqlDbType.NVarChar, 150),
                new SqlParameter(PARAM_DIACHI, SqlDbType.NVarChar, 250),
                new SqlParameter(PARAM_CMND, SqlDbType.NVarChar, 50),
                new SqlParameter(PARAM_NOI_DUNG_DON, SqlDbType.NVarChar, 200),
                new SqlParameter("@ToCao", SqlDbType.Int),
                new SqlParameter("@CoQuanID", SqlDbType.Int)
            };

            parameters[0].Value = hoTen != null ? hoTen : "";
            parameters[1].Value = diachi != null ? diachi : "";
            parameters[2].Value = cmnd != null ? cmnd : "";
            parameters[3].Value = noidungdon != null ? noidungdon : "";
            parameters[4].Value = toCao != null ? toCao : 0;
            parameters[5].Value = coQuanID != null ? coQuanID : 0;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDan_CheckSoDonTrung", parameters))
                {
                    if (dr.Read())
                    {
                        dem = Utils.GetInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = dem;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // Số đơn trùng
        public int CoundTrungDon(int donthuID)
        {
            //var Result = new BaseResultModel();
            int result = 0;
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter(PARAM_DON_THU_ID, SqlDbType.Int)
            };
            parameters[0].Value = donthuID;

            using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, COUND_TRUNGDON_BY_DONTHUID, parameters))
            {
                if (dr.Read())
                {
                    result = Utils.ConvertToInt32(dr["SoLanTrung"], 0);
                }
                dr.Close();
            }

            return result;
        }

        // chi tiet don trung
        public BaseResultModel GetCTTrungDonByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            List<TiepDanInfo> ls_donthu = new List<TiepDanInfo>();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_DON_THU_ID,SqlDbType.Int)
            };

            parameters[0].Value = donthuID;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_CTTRUNGDON_BY_DONTHU_ID, parameters))
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
                        info.NgayNhapDon = Utils.ConvertToDateTime(dr["NgayNhapDon"], DateTime.MinValue);
                        info.NgayNhapDon_Str = Format.FormatDate(info.NgayNhapDon);
                        info.KetQuaTiep = Utils.ConvertToString(dr["KetQuaTiep"], string.Empty);
                        info.SoDonThu = Utils.ConvertToString(dr["SoDonThu"], string.Empty);
                        info.TenCoQuanDaGQ = Utils.ConvertToString(dr["TenCoQuanDaGQ"], string.Empty);
                        info.StateID = Utils.ConvertToInt32(dr["StateID"], 0);
                        info.TinhID = Utils.ConvertToInt32(dr["TinhID"], 0);
                        info.HuyenID = Utils.ConvertToInt32(dr["HuyenID"], 0);
                        info.XaID = Utils.ConvertToInt32(dr["XaID"], 0);

                        if (info.TenHuongGiaiQuyet == "" && info.KetQuaTiep == "")
                        {
                            info.TenHuongGiaiQuyet = "";
                        }
                        else if (info.TenHuongGiaiQuyet != "" && info.KetQuaTiep == "")
                        {
                            info.TenHuongGiaiQuyet = info.TenHuongGiaiQuyet;
                        }
                        else
                        {
                            info.TenHuongGiaiQuyet = info.TenHuongGiaiQuyet + " : " + info.KetQuaTiep;
                        }
                        ls_donthu.Add(info);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = ls_donthu;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // kiểm tra khiếu tố lần 2
        public BaseResultModel GetKhieuToLan2(string? hoTen, string? cmnd, string? diachi, string? noidungdon, int? stateID, int? TotalRow)
        {
            var Result = new BaseResultModel();
            List<CheckKhieuTo2MOD> ls_donthu = new List<CheckKhieuTo2MOD>();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_HoTen, SqlDbType.NVarChar, 150),
                new SqlParameter(PARAM_DIACHI, SqlDbType.NVarChar, 250),
                new SqlParameter(PARAM_CMND, SqlDbType.NVarChar, 50),
                new SqlParameter(PARAM_NOI_DUNG_DON, SqlDbType.NVarChar, 200),
                new SqlParameter(PARAM_STATEID, SqlDbType.Int),
                new SqlParameter("@TotalRow", SqlDbType.Int)
            };

            parameters[0].Value = hoTen != null ? hoTen : "";
            parameters[1].Value = diachi != null ? diachi : "";
            parameters[2].Value = cmnd != null ? cmnd : "";
            parameters[3].Value = noidungdon != null ? noidungdon : "";
            parameters[4].Value = stateID != null ? stateID : 0;
            parameters[5].Direction = ParameterDirection.Output;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, CHECK_KHIEUTOLAN2_BY_HOTEN, parameters))
                {
                    while (dr.Read())
                    {
                        CheckKhieuTo2MOD info = new CheckKhieuTo2MOD();
                        info.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
                        info.HoTen = Utils.GetString(dr["HoTen"], string.Empty);
                        info.DiaChiCT = Utils.GetString(dr["DiaChi"], string.Empty);
                        info.TenLoaiKhieuTo = Utils.GetString(dr["TenLoaiKhieuTo"], string.Empty);
                        info.NoiDungDon = Utils.GetString(dr["NoiDungDon"], string.Empty);
                        info.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        info.LoaiKhieuTo1ID = Utils.ConvertToInt32(dr["LoaiKhieuTo1ID"], 0);
                        info.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        info.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);
                        info.HuongGiaiQuyetID = Utils.ConvertToInt32(dr["HuongGiaiQuyetID"], 0);
                        info.LanGQ = CountSoLanGQ(info.DonThuID, 10);
                        ls_donthu.Add(info);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "Danh sách loại khiếu tố lần 2";
                Result.Data = ls_donthu;
                Result.TotalRow = Utils.ConvertToInt32(parameters[5].Value, 0);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // Tổng số lần giải quyết
        public int CountSoLanGQ(int? donthuID, int? stateID)
        {
            int result = 0;
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter(PARAM_DON_THU_ID, SqlDbType.Int),
                new SqlParameter(PARAM_STATEID, SqlDbType.Int)
            };
            parameters[0].Value = donthuID != null ? donthuID : 0;
            parameters[1].Value = stateID != null ? stateID : 0;
            using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, CHECK_KHIEUTOLAN2_SOLANGQ, parameters))
            {
                if (dr.Read())
                {
                    result = Utils.ConvertToInt32(dr["LanGQ"], 0);
                }
                dr.Close();
            }
            return result;
        }

        // Chi tiết khiếu tố lần 2
        public BaseResultModel GetCTKhieuToLan2ByDonID(int donthuID)
        {
            var Result = new BaseResultModel();
            List<TiepDanInfo> ls_donthu = new List<TiepDanInfo>();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_DON_THU_ID,SqlDbType.Int)
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
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // số đơn thư
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

        /// <summary>
        /// Cập nhật đối tượng khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatDoiTuongKN(TiepDanGianTiepMOD item)
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
                            //Result.Data = Result.Status;
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

        /// <summary>
        /// Cập nhật nhóm khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatNhomKN(TiepDanGianTiepMOD item)
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
                            //Result.Data = Result.Status;
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

        /// <summary>
        /// Cập nhật đơn thư
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatDonThu(List<DonThuMOD> item)
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
                parms[2].Value = item[i].DoiTuongBiKNID ?? Convert.DBNull;
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

                //if (item[i].DoiTuongBiKNID == 0) parms[1].Value = DBNull.Value;
                parms[14].Value = item[i].DiaChiPhatSinh;

                i++;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_DonThu, parms);
                            trans.Commit();
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
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

        /// <summary>
        /// Cập nhật cá nhân bị khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatCaNhanBiKN(List<CaNhanBiKN> item)
        {
            var Result = new BaseResultModel();
            try
            {
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
                parameters[0].Value = item[i].NgheNghiep;
                parameters[1].Value = item[i].NoiCongTac;
                parameters[2].Value = item[i].ChucVuID;
                parameters[3].Value = item[i].QuocTichID;
                parameters[4].Value = item[i].DanTocID;
                parameters[5].Value = item[i].DoiTuongBiKNID;
                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, Update_CaNhanBiKN, parameters);
                            trans.Commit();
                            /*Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;*/
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

        /// <summary>
        /// Cập nhật đối tượng bị khiếu nại
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatDoiTuongBiKN(TiepDanGianTiepMOD item)
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
                            /*Result.Message = "Cập nhật thành công!";
                            Result.Data = Result.Status;*/
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

        /// <summary>
        /// Cập nhật tiếp nhận đơn thư
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public BaseResultModel CapNhatTiepNhanDT(List<ThongTinTiepNhanDT> item)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parms = new SqlParameter[]{   
                    new SqlParameter(PARAM_XU_LY_DON_ID,SqlDbType.Int),
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
                    new SqlParameter(PARAM_HUONG_GIAI_QUYET_ID, SqlDbType.Int),
                    new SqlParameter("@CanBoKyID", SqlDbType.Int),
                    new SqlParameter("@NoiDungHuongDan", SqlDbType.NText),
                };
                parms[0].Value = item[i].XuLyDonID;
                parms[1].Value = item[i].DonThuID;
                parms[2].Value = item[i].SoLan;
                parms[3].Value = item[i].SoDonThu;
                parms[4].Value = item[i].NgayNhapDon;
                parms[5].Value = item[i].NguonDonDen;
                parms[6].Value = item[i]?.CQChuyenDonDenID;
                parms[7].Value = item[i].SoCongVan ?? Convert.DBNull;
                parms[8].Value = item[i]?.NgayChuyenDon;
                parms[9].Value = item[i]?.CQDaGiaiQuyetID;
                parms[10].Value = item[i].CanBoXuLyID ?? Convert.DBNull;
                parms[11].Value = item[i].CoQuanID;
                parms[12].Value = item[i].CanBoTiepNhapID;
                parms[13].Value = item[i].HuongGiaiQuyetID ?? Convert.DBNull;
                parms[14].Value = item[i].CanBoKyID ?? Convert.DBNull;
                parms[15].Value = item[i].NoiDungHuongDan ?? Convert.DBNull;


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
                            //Result.Message = "Thêm mới thành công!";
                            //Result.Data = Result.Status;
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
    }
}
