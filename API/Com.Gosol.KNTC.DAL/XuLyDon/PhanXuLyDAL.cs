using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class PhanXuLyDAL
    {
        private const string XuLyDon_GetDTCanPhanXL_LanhDao = "XuLyDon_GetDTCanPhanXL_LanhDao";
        private const string XuLyDon_GetDTCanPhanXL_LanhDao_v1 = "XuLyDon_GetDTCanPhanXL_LanhDao_v1";
        private const string XuLyDon_CountDTCanPhanXL_LanhDao = "XuLyDon_CountDTCanPhanXL_LanhDao";
        private const string CHECK_ISHUONGGIAIQUYET = @"XuLyDon_CheckIsHuongGiaiQuyet";
        private const string UPDATE_NGAYTHULY = @"XuLyDon_UpdateNgayThuLy";
        private const string GET_ALLXULYDON_BY_ID = @"NVTiepDan_GetAllXuLyDonByID";
        private DTXuLyInfo GetDataDTPhanXuLy(SqlDataReader dr)
        {
            DTXuLyInfo dTXuLyInfo = new DTXuLyInfo();
            dTXuLyInfo.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
            dTXuLyInfo.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);
            dTXuLyInfo.SoDonThu = Utils.GetString(dr["SoDonThu"], string.Empty);
            dTXuLyInfo.NguonDonDen = Utils.GetInt32(dr["NguonDonDen"], 0);
            dTXuLyInfo.NguonDonDens = "";
            if (dTXuLyInfo.NguonDonDen == 21)
            {
                dTXuLyInfo.NguonDonDens = "Trực tiếp";
            }

            if (dTXuLyInfo.NguonDonDen == 22)
            {
                dTXuLyInfo.NguonDonDens = "Cơ quan khác chuyển tới";
            }

            if (dTXuLyInfo.NguonDonDen == 26)
            {
                dTXuLyInfo.NguonDonDens = "Bưu chính";
            }

            if (dTXuLyInfo.NguonDonDen == 28)
            {
                dTXuLyInfo.NguonDonDens = "Cơ quan khác chuyển tới";
            }

            dTXuLyInfo.TenChuDon = Utils.GetString(dr["HoTen"], string.Empty);
            dTXuLyInfo.NoiDungDon = Utils.GetString(dr["NoiDungDon"], string.Empty);
            dTXuLyInfo.NgayNhapDon = Utils.ConvertToDateTime(dr["NgayNhapDon"], DateTime.MinValue);
            dTXuLyInfo.NgayNhapDons = "";
            if (dTXuLyInfo.NgayNhapDon != DateTime.MinValue)
            {
                dTXuLyInfo.NgayNhapDons = dTXuLyInfo.NgayNhapDon.ToString("dd/MM/yyyy");
            }

            dTXuLyInfo.TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], string.Empty);
            dTXuLyInfo.TenCBTiepNhan = Utils.ConvertToString(dr["TenCanBo"], string.Empty);
            return dTXuLyInfo;
        }
        public BaseResultModel DTCanPhanXL_LanhDao(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            List<DTXuLyInfo> Data = new List<DTXuLyInfo>();
            string trangthai ;
            SqlParameter[] parms = new SqlParameter[]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime),
                new SqlParameter("@Start", SqlDbType.Int),
                new SqlParameter("@End", SqlDbType.Int)

            };

            parms[0].Value = p.CoQuanID;
            parms[1].Value = p.KeyWord != null ? p.KeyWord : "";
            parms[2].Value = p.LoaiKhieuToID ?? 0;
            parms[3].Value = p.TuNgay ?? Convert.DBNull;
            parms[4].Value = p.DenNgay ?? Convert.DBNull;
            parms[5].Value = p.Start =0;
            parms[6].Value = p.End =10;
            if (p.TuNgay == DateTime.MinValue)
            {
                parms[3].Value = DBNull.Value;
            }

            if (p.DenNgay == DateTime.MinValue)
            {
                parms[4].Value = DBNull.Value;
            }
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, XuLyDon_GetDTCanPhanXL_LanhDao, parms))
                {
                    while (dr.Read())
                    {
                        DTXuLyInfo dataDTPhanXuLy = GetDataDTPhanXuLy(dr);
                        string value = Format.FormatDate(DateTime.Now);
                        DateTime value2 = Utils.ConvertToDateTime(value, DateTime.MinValue);
                        dataDTPhanXuLy.StateName = Utils.GetString(dr["StateName"], string.Empty);
                        dataDTPhanXuLy.StateID = Utils.ConvertToInt32(dr["StateID"], 0);
                        if (dataDTPhanXuLy.StateID == 25)
                        {
                            trangthai = "Chuyển Đơn";
                        }
                        else
                        {
                            trangthai = "Ðã chuyển";
                        }
                        
                        if (dataDTPhanXuLy.StateID == 1)
                        {
                            dataDTPhanXuLy.HanXuLy = Format.FormatDate(Utils.ConvertToDateTime(dr["HanXuLyDueDate"], DateTime.MinValue));
                            dataDTPhanXuLy.NgayXLConLai = Utils.ConvertToDateTime(dr["HanXuLyDueDate"], DateTime.MinValue).Subtract(value2).Days;
                            
                        }
                        else
                        {
                            dataDTPhanXuLy.HanXuLy = Format.FormatDate(Utils.ConvertToDateTime(dr["HanXuLyDueDateDaPhan"], DateTime.MinValue));
                            dataDTPhanXuLy.NgayXLConLai = Utils.ConvertToDateTime(dr["HanXuLyDueDateDaPhan"], DateTime.MinValue).Subtract(value2).Days;
                        }


                        dataDTPhanXuLy.TransitionID = Utils.ConvertToInt32(dr["TransitionID"], 0);
                        Data.Add(dataDTPhanXuLy);
                    }
                    dr.Close();
                }
               
                Result.Status = 1;
                Result.Message = "Danh sách phân sử lý lãnh đạo";
                Result.Data = Data;
                //Result.TotalRow = TotalRow;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        // Count_DTCanPhanXL_LanhDao
        public BaseResultModel Count_DTCanPhanXL_LanhDao(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            int Tong = 0;
            DonThuDonDocInfo CountData = new DonThuDonDocInfo();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime)

            };

            parameters[0].Value = p.CoQuanID;
            parameters[1].Value = p.KeyWord != null ? p.KeyWord : ""; 
            parameters[2].Value = p.LoaiKhieuToID ?? 0;
            parameters[3].Value = p.TuNgay ?? Convert.DBNull;
            parameters[4].Value = p.DenNgay ?? Convert.DBNull;
            if (p.TuNgay == DateTime.MinValue)
            {
                parameters[3].Value = DBNull.Value;
            }

            if (p.DenNgay == DateTime.MinValue)
            {
                parameters[4].Value = DBNull.Value;
            }

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, XuLyDon_CountDTCanPhanXL_LanhDao, parameters))
                {
                    while (dr.Read())
                    {
                        Tong = Utils.ConvertToInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "Count_DTCanPhanXL_LanhDao - 872";
                Result.Data = Tong;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // DTCanPhanXL_TruongPhong - 958
        public SqlParameter[] GetPara_Search_TruongPhong()
        {
            SqlParameter sqlParameter = new SqlParameter("@DocumentIDList", SqlDbType.Structured);
            sqlParameter.TypeName = "IntList";
            return new SqlParameter[8]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime),
                new SqlParameter("@Start", SqlDbType.Int),
                new SqlParameter("@End", SqlDbType.Int),
                new SqlParameter("@PhongBanID", SqlDbType.Int)
            };
        }
        public void SetPara_Search_TruongPhong(SqlParameter[] parms, paramPhanXuLy p)
        {
            /*List<int> documentIDlist;
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("n", typeof(int));
            foreach (int item in documentIDlist)
            {
                dataTable.Rows.Add(item);
            }*/

            parms[0].Value = p.CoQuanID;
            parms[1].Value = p.KeyWord != null ? p.KeyWord : "";
            parms[2].Value = p.LoaiKhieuToID;
            parms[3].Value = p.TuNgay ?? Convert.DBNull;
            parms[4].Value = p.DenNgay ?? Convert.DBNull;
            parms[5].Value = p.Start;
            parms[6].Value = p.End;
            parms[7].Value = p.PhongBanID;
            if (p.TuNgay == DateTime.MinValue)
            {
                parms[3].Value = DBNull.Value;
            }

            if (p.DenNgay == DateTime.MinValue)
            {
                parms[4].Value = DBNull.Value;
            }
        }
        
        public BaseResultModel DTCanPhanXL_TruongPhong(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            List<DTXuLyInfo> Data = new List<DTXuLyInfo>();
            SqlParameter[] para_Search_TruongPhong = GetPara_Search_TruongPhong();
            SetPara_Search_TruongPhong(para_Search_TruongPhong, p);
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_GetDTCanPhanXL_TruongPhong", para_Search_TruongPhong))
                {
                    while (dr.Read())
                    {
                        DTXuLyInfo dataDTPhanXuLy = GetDataDTPhanXuLy(dr);
                        dataDTPhanXuLy.HanXuLy = Format.FormatDate(Utils.ConvertToDateTime(dr["HanXuLyDueDate"], DateTime.MinValue));
                        dataDTPhanXuLy.StateName = Utils.GetString(dr["StateName"], string.Empty);
                        dataDTPhanXuLy.StateID = Utils.ConvertToInt32(dr["StateID"], 0);
                        string value = Format.FormatDate(DateTime.Now);
                        DateTime value2 = Utils.ConvertToDateTime(value, DateTime.MinValue);
                        dataDTPhanXuLy.NgayXLConLai = Utils.ConvertToDateTime(dr["HanXuLyDueDate"], DateTime.MinValue).Subtract(value2).Days;
                        Data.Add(dataDTPhanXuLy);
                    }
                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
                Result.Message = "Danh sách phân sử lý trưởng phòng";
                Result.Data = Data;
                //Result.TotalRow = TotalRow;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }
        //
        // Count_DTCanPhanXL_TruongPhong
        public BaseResultModel Count_DTCanPhanXL_TruongPhong(paramPhanXuLy p)
        {
            var Result = new BaseResultModel();
            int Tong = 0;          
            SqlParameter[] parms = new SqlParameter[]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime),
                new SqlParameter("@PhongBanID", SqlDbType.Int)

            };

            parms[0].Value = p.CoQuanID;
            parms[1].Value = p.KeyWord != null ? p.KeyWord : "";
            parms[2].Value = p.LoaiKhieuToID;
            parms[3].Value = p.TuNgay ?? Convert.DBNull;
            parms[4].Value = p.DenNgay ?? Convert.DBNull;
            parms[5].Value = p.PhongBanID;
            if (p.TuNgay == DateTime.MinValue)
            {
                parms[3].Value = DBNull.Value;
            }

            if (p.DenNgay == DateTime.MinValue)
            {
                parms[4].Value = DBNull.Value;
            }

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_CountDTCanPhanXL_LanhDao", parms))
                {
                    while (dr.Read())
                    {
                        Tong = Utils.ConvertToInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "Count_DTCanPhanXL_TruongPhong - 935";
                Result.Data = Tong;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        

        public int InsertPhanXuLy(FileHoSo info, PhanXuLyClaims claims)
        {

            object val = null;

            SqlParameter[] parms = new SqlParameter[]{
                new SqlParameter("@TenFile", SqlDbType.NVarChar),
                new SqlParameter("@TomTat", SqlDbType.NVarChar),
                new SqlParameter("@NgayUp", SqlDbType.DateTime),
                new SqlParameter("@NguoiUp", SqlDbType.Int),
                new SqlParameter("@FileURL", SqlDbType.NVarChar),
                new SqlParameter("@XuLyDonID", SqlDbType.Int),
                new SqlParameter("@FileID", SqlDbType.Int)
            };

            parms[0].Value = info.TenFile.Trim() ?? Convert.DBNull;
            parms[1].Value = info.TomTat.Trim() ?? Convert.DBNull;
            parms[2].Value = info.NgayUp ?? Convert.DBNull;
            parms[3].Value = claims.CanBoID;
            parms[4].Value = info.FileURL;
            parms[5].Value = info.XuLyDonID;
            parms[6].Value = info.FileID ?? Convert.DBNull;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        val = SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "FilePhanXuLy_Insert_New", parms);
                        trans.Commit();
                    }
                    catch
                    {
                        trans.Rollback();
                        throw;
                    }
                }
                conn.Close();
            }
            return Utils.ConvertToInt32(val, 0);
        }

        public BaseResultModel ThemMoiPhanXuLyFile(FileHoSo info)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parms = new SqlParameter[]{
                new SqlParameter("@TenFile", SqlDbType.NVarChar),
                new SqlParameter("@TomTat", SqlDbType.NVarChar),
                new SqlParameter("@NgayUp", SqlDbType.DateTime),
                new SqlParameter("@NguoiUp", SqlDbType.Int),
                new SqlParameter("@FileURL", SqlDbType.NVarChar),
                new SqlParameter("@XuLyDonID", SqlDbType.Int),
                new SqlParameter("@FileID", SqlDbType.Int)
            };

                parms[0].Value = info.TenFile.Trim() ?? Convert.DBNull;
                parms[1].Value = info.TomTat.Trim() ?? Convert.DBNull;
                parms[2].Value = info.NgayUp ?? Convert.DBNull;
                parms[3].Value = info.NguoiUp;
                parms[4].Value = info.FileURL;
                parms[5].Value = info.XuLyDonID;
                parms[6].Value = info.FileID ?? Convert.DBNull;

                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            var buocXacMinhID = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "FilePhanXuLy_Insert_New", parms).ToString(), 0);
                            
                            trans.Commit();
                            Result.Status = buocXacMinhID;
                            Result.Message = "Thêm mới thành công!";
                            Result.Data = buocXacMinhID;
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
        public bool CheckIsHuongGiaiQuyet(int xulydonid, string tenhuonggiaiquyet)
        {
            bool result = false;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("TenHuongGiaiQuyet",SqlDbType.NVarChar,100),
                new SqlParameter("XuLyDonID",SqlDbType.Int)
            };
            parameters[0].Value = tenhuonggiaiquyet;
            parameters[1].Value = xulydonid;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, CHECK_ISHUONGGIAIQUYET, parameters))
                {

                    if (dr.Read())
                    {
                        result = Utils.ConvertToBoolean(dr["IsHuongGiaiQuyet"], false);
                    }
                    dr.Close();
                }
            }
            catch
            {

                throw;
            }
            return result;
        }
        public int UpdateNgayThuLy(int xldID, DateTime ngaythuly)
        {

            object val = null;
            SqlParameter[] parms = new SqlParameter[] {
                new SqlParameter("XuLyDonID", SqlDbType.Int),
                new SqlParameter("NgayThuLy", SqlDbType.DateTime)
            };
            parms[0].Value = xldID;
            parms[1].Value = ngaythuly;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {

                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {

                    try
                    {
                        val = SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, UPDATE_NGAYTHULY, parms);
                        trans.Commit();
                    }
                    catch
                    {
                        trans.Rollback();
                        throw;
                    }
                }
                conn.Close();
            }
            return Utils.ConvertToInt32(val, 0); // tra ve so don thu
        }
        private TiepDanInfo GetAllXuLyDonData(SqlDataReader dr)
        {
            TiepDanInfo info = new TiepDanInfo();

            info.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);
            info.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
            info.SoLan = Utils.GetInt32(dr["SoLan"], 0);
            info.SoDonThu = Utils.GetString(dr["SoDonThu"], string.Empty);
            info.NgayNhapDon = Utils.GetDateTime(dr["NgayNhapDon"], DateTime.MinValue);
            info.NgayQuaHan = Utils.GetDateTime(dr["NgayQuaHan"], DateTime.MinValue);
            info.NguonDonDen = Utils.GetInt32(dr["NguonDonDen"], 0);
            info.CQChuyenDonID = Utils.GetInt32(dr["CQChuyenDonID"], 0);
            info.SoCongVan = Utils.GetString(dr["SoCongVan"], string.Empty);
            info.NgayChuyenDon = Utils.GetDateTime(dr["NgayChuyenDon"], DateTime.MinValue);
            info.ThuocThamQuyen = Utils.GetBoolean(dr["ThuocThamQuyen"], false);
            info.DuDieuKien = Utils.GetBoolean(dr["DuDieuKien"], false);
            info.HuongGiaiQuyetID = Utils.GetInt32(dr["HuongGiaiQuyetID"], 0);
            info.NoiDungHuongDan = Utils.GetString(dr["NoiDungHuongDan"], string.Empty);
            info.CanBoXuLyID = Utils.GetInt32(dr["CanBoXuLyID"], 0);
            info.CanBoKyID = Utils.GetInt32(dr["CanBoKyID"], 0);
            info.CQDaGiaiQuyetID = Utils.GetString(dr["CQDaGiaiQuyetID"], string.Empty);
            info.TrangThaiDonID = Utils.GetInt32(dr["TrangThaiDonID"], 0);
            info.PhanTichKQID = Utils.GetInt32(dr["PhanTichKQID"], 0);
            info.CanBoTiepNhapID = Utils.GetInt32(dr["CanBoTiepNhapID"], 0);
            info.CoQuanID = Utils.GetInt32(dr["CoQuanID"], 0);
            info.NgayThuLy = Utils.GetDateTime(dr["NgayThuLy"], DateTime.MinValue);
            info.LyDo = Utils.GetString(dr["LyDo"], string.Empty);
            info.DuAnID = Utils.GetInt32(dr["DuAnID"], 0);

            return info;
        }
        public TiepDanInfo GetXuLyDonByXLDID(int xulydonID)
        {

            TiepDanInfo DTInfo = null;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("XuLyDonID",SqlDbType.Int)
            };
            parameters[0].Value = xulydonID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_ALLXULYDON_BY_ID, parameters))
                {

                    if (dr.Read())
                    {
                        DTInfo = GetAllXuLyDonData(dr);
                        DTInfo.CBDuocChonXL = Utils.GetInt32(dr["CBDuocChonXL"], 0);
                        DTInfo.QTTiepNhanDon = Utils.GetInt32(dr["QTTiepNhanDon"], 0);
                    }
                    dr.Close();
                }
            }
            catch
            {
            }
            return DTInfo;
        }
        public int UpDateState(int xldID, int stateID)
        {

            int val = 0;
            SqlParameter[] parms = new SqlParameter[] {
                new SqlParameter("XuLyDonID", SqlDbType.Int),
                new SqlParameter("StateID", SqlDbType.Int),
            };
            parms[0].Value = xldID;
            parms[1].Value = stateID;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                var cmd = @"UPDATE dbo.Document SET StateID = @StateID WHERE DocumentID = @XuLyDonID";

                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {

                    try
                    {
                        val = SQLHelper.ExecuteNonQuery(trans, CommandType.Text, cmd, parms);
                        trans.Commit();
                    }
                    catch
                    {
                        trans.Rollback();
                        throw;
                    }
                }
                conn.Close();
            }
            return val; // tra ve so don thu
        }
    }
}
