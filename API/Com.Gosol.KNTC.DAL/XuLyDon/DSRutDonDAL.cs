using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Ultilities;
using Com.Gosol.KNTC.Models.XuLyDon;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Com.Gosol.KNTC.Models.KNTC;
using System.IO;

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class DSRutDonDAL
    {
        #region --- Params
        private const string PARAM_CO_QUAN_ID = "@CoQuanID";
        private const string PARAM_TUNGAY = "@TuNgay";
        private const string PARAM_DENNGAY = "@DenNgay";
        private const string PARAM_LOAI_KHIEU_TO_ID = "@LoaiKhieuToID";
        private const string PARAM_KEYWORD = "@keyword";
        private const string PARAM_START = "@Start";
        private const string PARAM_END = "@End";
        private const string PARM_STATENAME = "@StateName";
        private const string PARM_PREVSTATE = "@PrevState";
        private const string PARM_STATE = "@State";
        private const string PARM_NGAYRUTDON = "@NgayRutDon";
        private const string PARM_LYDO = @"LyDo";
        private const string PARM_XULYDONID = @"XuLyDonID";
        private const string PARM_FILEQD = @"FileQD";
        private const string PARM_COMMAND = @"Command";
        private const string PARM_TotalRow = @"TotalRow";
        #endregion

        #region --- Store

        private const string GET_BY_SEARCH = "XuLyDon_GetSearch_RutDon";
        private const string COUNT_SEARCH = "XuLyDon_CountSearch_RutDon";
        private const string GET_BY_ID = @"RutDon_GetByID";
        private const string INSERT = @"RutDon_Insert";
        private const string DELETE = @"RutDon_Delete";
        #endregion

        #region Function
        public BaseResultModel DanhSach(RutDonParams thamSo, RutDonClaims Info)
        {
            var result = new BaseResultModel();

            List<RutDonMOD> data = new();

            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_CO_QUAN_ID, SqlDbType.Int),
                new SqlParameter(PARAM_KEYWORD, SqlDbType.NVarChar,50),
                new SqlParameter(PARAM_LOAI_KHIEU_TO_ID, SqlDbType.Int),
                new SqlParameter(PARAM_TUNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_DENNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_START, SqlDbType.Int),
                new SqlParameter(PARAM_END, SqlDbType.Int),
                new SqlParameter(PARM_STATENAME, SqlDbType.NVarChar,100),
                new SqlParameter(PARM_STATE, SqlDbType.NVarChar,100),
                new SqlParameter(PARM_COMMAND, SqlDbType.NVarChar,100),
                new SqlParameter(PARM_TotalRow, SqlDbType.Int),
            };


            parameters[0].Value = Info.CoQuanID;
            parameters[1].Value = thamSo.Keyword ?? "";
            parameters[2].Value = thamSo.LoaiKhieuToID ?? 0;
            parameters[3].Value = thamSo.TuNgay ?? Convert.DBNull;
            parameters[4].Value = thamSo.DenNgay ?? Convert.DBNull;
            parameters[5].Value = thamSo.PageNumber <= 1 ? 0 : (thamSo.PageNumber - 1) * thamSo.PageSize;
            parameters[6].Value = thamSo.PageNumber * thamSo.PageSize;
            parameters[7].Value = Convert.DBNull;
            parameters[8].Value = Convert.DBNull;
            parameters[9].Value = Convert.DBNull;
            parameters[10].Direction = ParameterDirection.Output;

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_BY_SEARCH, parameters);

                while (dr.Read())
                {
                    data.Add(new RutDonMOD
                    {
                        XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0),
                        DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0),
                        RutDonID = Utils.ConvertToInt32(dr["RutDonID"], 0),
                        CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0),
                        HoTen = Utils.ConvertToString(dr["HoTen"], ""),
                        NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], ""),
                        SoDonThu = Utils.ConvertToString(dr["SoDonThu"], ""),
                        StateName = Utils.ConvertToString(dr["StateName"], ""),
                        DiaChiCT =  "",//Utils.ConvertToString(dr["DiaChiCT"], ""),
                        LyDo = Utils.ConvertToString(dr["LyDo"], ""),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], ""),
                        TrangThaiRut = Utils.ConvertToInt32(dr["RutDonID"], 0) == 0 ? "Chưa rút" : "Đã rút",
                        NgayRutDon = Utils.ConvertToNullableDateTime(dr["NgayRutDon"], null)
                    });
                }

                dr.Close();

                result.TotalRow = Utils.ConvertToInt32(parameters[10].Value, 0);
            }
            catch (Exception)
            {

                throw;
            }


            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;

            return result;
        }

        public int InsertRutDon(RutDonInfo rutDonInfo)
        {
            object val = null;
            SqlParameter[] parameters =
            {
                new SqlParameter("NgayRutDon", SqlDbType.DateTime),
                new SqlParameter("LyDo", SqlDbType.NVarChar),
                new SqlParameter("XuLyDonID", SqlDbType.Int),
                new SqlParameter("FileQD", SqlDbType.NVarChar)
            };

            parameters[0].Value = rutDonInfo.NgayRutDon;
            parameters[1].Value = rutDonInfo.LyDo;
            parameters[2].Value = rutDonInfo.XuLyDonID;
            parameters[3].Value = rutDonInfo.FileQD;


            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        val = SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT, parameters);
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
            return Convert.ToInt32(val);
        }


        #endregion
    }
}
