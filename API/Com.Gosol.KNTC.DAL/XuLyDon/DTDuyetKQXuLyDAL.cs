using Com.Gosol.KNTC.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;

using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Models.KNTC;

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class DTDuyetKQXuLyDAL
    {
        #region Params
        private const string PARAM_XULYDON_ID = "@XuLyDonID";
        private const string PARAM_NGAYNHAPDON = "@NgayNhapDon";
        private const string PARAM_LOAIKHIEUTOID = "@LoaiKhieuToID";
        private const string PARAM_CQCHUYENDONDENID = "@CQChuyenDonDenID";

        private const string PARAM_KEY = "@Keyword";
        private const string PARAM_START = "@Start";
        private const string PARAM_END = "@End";

        private const string PARAM_TUNGAY = "@TuNgay";
        private const string PARAM_DENNGAY = "@DenNgay";
        private const string PARAM_DOCUMENTLIST = "DocumentIDList";
        private const string PARAM_COQUANID = "CoQuanID";
        private const string PARAM_STATENAME = "StateName";
        private const string PARAM_CANBOID = "CanBoID";
        private const string PARAM_DONTHUID = "DonThuID";
        private const string PARAM_XULYDONID = "XuLyDonID";
        private const string PARAM_PHONGBANID = "PhongBanID";
        private const string PARAM_CAN_BO_XU_LY_ID = "CanBoXuLyID";
        private const string PARM_FILEURL = @"FileUrl";
        private const string PARM_TENFILE = @"TenFile";
        private const string PARM_YKIENXULY = @"YKienXuLy";
        private const string PARM_NGAYXULY = @"NgayXuLy";
        #endregion

        #region --- Store Procedure

        private const string XULYDON_GETDTDUYETXL_LANHDAO_GETALL_BYCOQUANID_NEW = @"XuLyDon_GetDTDuyetXL_LanhDao_GetAll_ByCoQuanID_New";
        private const string GET_DTDUYETXL_LANHDAO_NEW = @"XuLyDon_GetDTDuyetXL_LanhDao_New";
        private const string GET_DTDUYETXL_TRUONGPHONG_NEW = @"XuLyDon_GetDTDuyetXL_TruongPhong_New";
        private const string GET_ALL_YKIENXL = @"YKienXuLy_GetByID";
        private const string GET_ALL_FILEYKIENXL_NEW = @"FileYKienXuLyGetByID_New";
        private const string INSERT_YKIENXL = @"YKienXuLy_InSert";
        private const string GET_LAST_FILEYKIENXL = @"FileYKienXuLyGetLastByID";
        private const string CHECK_ISHUONGGIAIQUYET = @"XuLyDon_CheckIsHuongGiaiQuyet";
        private const string UPDATE_NGAYTHULY = @"XuLyDon_UpdateNgayThuLy";
        private const string GET_ALLXULYDON_BY_ID = @"NVTiepDan_GetAllXuLyDonByID";
        private const string v2_DuyetKQXuLy_UpDate = @"v2_DuyetKQXuLy_UpDate";
        #endregion

        #region Function

        public BaseResultModel DanhSach_LanhDao(DTDuyetKQXuLyParams thamSo, DTDuyetKQXuLyClaims Info)
        {
            var result = new BaseResultModel();
            List<DTDuyetKQXuLyMOD> data = new List<DTDuyetKQXuLyMOD>();

            SqlParameter[] parameters =  {
                new SqlParameter(PARAM_COQUANID, SqlDbType.Int),
                new SqlParameter(PARAM_KEY, SqlDbType.NVarChar,50),
                new SqlParameter(PARAM_LOAIKHIEUTOID, SqlDbType.Int),
                new SqlParameter(PARAM_TUNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_DENNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_START, SqlDbType.Int),
                new SqlParameter(PARAM_END, SqlDbType.Int),
            };

            parameters[0].Value = Info.CoQuanID;
            parameters[1].Value = thamSo.Keyword ?? "";
            parameters[2].Value = thamSo.LoaiKhieuToID ?? 0;
            parameters[3].Value = thamSo.TuNgay ?? Convert.DBNull;
            parameters[4].Value = thamSo.DenNgay ?? Convert.DBNull;
            parameters[5].Value = thamSo.PageNumber <= 1 ? 0 : (thamSo.PageNumber - 1) * thamSo.PageSize;
            parameters[6].Value = thamSo.PageNumber * thamSo.PageSize;

            using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_DTDUYETXL_LANHDAO_NEW, parameters);

            while (dr.Read())
            {
                data.Add(new DTDuyetKQXuLyMOD
                {
                    DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0),
                    NgayQuaHan = Utils.ConvertToNullableDateTime(dr["HanXuLyDueDate"], null),
                    NgayGui = Utils.ConvertToNullableDateTime(dr["ModifiedDate"], null),
                    XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0),
                    CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0),
                    DiaChiCT = Utils.ConvertToString(dr["DiaChiCT"], ""),
                    HoTen = Utils.ConvertToString(dr["HoTen"], ""),
                    NguonDonDen = Utils.ConvertToInt32(dr["NguonDonDen"], 0),
                    SoDonThu = Utils.ConvertToString(dr["SoDonThu"], ""),
                    StateID = Utils.ConvertToInt32(dr["StateID"], 0),
                    TenHuongGiaiQuyet = Utils.ConvertToString(dr["TenHuongGiaiQuyet"], ""),
                    TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], ""),
                    TransitionID = Utils.ConvertToInt32(dr["TransitionID"], 0),
                    TenNguonDonDen = RenderTenNguonDonDen(Utils.ConvertToInt32(dr["NguonDonDen"], 0)),
                    NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], ""),
                    StateName = RenderSateName(Info.RoleID, Utils.ConvertToInt32(dr["StateID"], 0))
                });

                result.TotalRow = Utils.ConvertToInt32(dr["CountNum"], 0);
            }

            dr.Close();

            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;

            return result;
        }
        public BaseResultModel DanhSach_TruongPhong(DTDuyetKQXuLyParams thamSo, DTDuyetKQXuLyClaims Info)
        {
            var result = new BaseResultModel();
            List<DTDuyetKQXuLyMOD> data = new List<DTDuyetKQXuLyMOD>();
            SqlParameter[] parameters =  {
                new SqlParameter(PARAM_COQUANID, SqlDbType.Int),
                new SqlParameter(PARAM_KEY, SqlDbType.NVarChar,50),
                new SqlParameter(PARAM_LOAIKHIEUTOID, SqlDbType.Int),
                new SqlParameter(PARAM_TUNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_DENNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_START, SqlDbType.Int),
                new SqlParameter(PARAM_END, SqlDbType.Int),
                new SqlParameter("PhongBanID", SqlDbType.Int),
            };

            parameters[0].Value = Info.CoQuanID;
            parameters[1].Value = thamSo.Keyword ?? "";
            parameters[2].Value = thamSo.LoaiKhieuToID ?? 0;
            parameters[3].Value = thamSo.TuNgay ?? Convert.DBNull;
            parameters[4].Value = thamSo.DenNgay ?? Convert.DBNull;
            parameters[5].Value = thamSo.PageNumber <= 1 ? 0 : (thamSo.PageNumber - 1) * thamSo.PageSize;
            parameters[6].Value = thamSo.PageNumber * thamSo.PageSize;
            parameters[7].Value = Info.PhongBanID;

            using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_DTDUYETXL_TRUONGPHONG_NEW, parameters);
            try
            {
                while (dr.Read())
                {
                    data.Add(new DTDuyetKQXuLyMOD
                    {
                        DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0),
                        NgayQuaHan = Utils.ConvertToNullableDateTime(dr["HanXuLyDueDateLDPhan"], null),
                        NgayGui = Utils.ConvertToNullableDateTime(dr["ModifiedDate"], null),
                        XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0),
                        CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0),
                        //DiaChiCT = Utils.ConvertToString(dr["DiaChiCT"], ""),
                        HoTen = Utils.ConvertToString(dr["HoTen"], ""),
                        NguonDonDen = Utils.ConvertToInt32(dr["NguonDonDen"], 0),
                        SoDonThu = Utils.ConvertToString(dr["SoDonThu"], ""),
                        StateID = Utils.ConvertToInt32(dr["StateID"], 0),
                        TenHuongGiaiQuyet = Utils.ConvertToString(dr["TenHuongGiaiQuyet"], ""),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], ""),
                        TransitionID = Utils.ConvertToInt32(dr["TransitionID"], 0),
                        TenNguonDonDen = RenderTenNguonDonDen(Utils.ConvertToInt32(dr["NguonDonDen"], 0)),
                        NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], ""),
                        StateName = RenderSateName(Info.RoleID, Utils.ConvertToInt32(dr["StateID"], 0))
                    });

                    result.TotalRow = Utils.ConvertToInt32(dr["CountNum"], 0);
                }
            }
            catch (Exception)
            {

                throw;
            }
            dr.Close();

            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;

            return result;
        }


        public bool CheckIsHuongGiaiQuyet(int xulydonid, string tenhuonggiaiquyet)
        {
            bool result = false;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("TenHuongGiaiQuyet",SqlDbType.NVarChar,100),
                new SqlParameter(PARAM_XULYDONID,SqlDbType.Int)
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
        public TiepDanInfo GetXuLyDonByXLDID(int xulydonID)
        {

            TiepDanInfo DTInfo = null;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_XULYDON_ID,SqlDbType.Int)
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
        public int UpdateNgayThuLy(int xldID, DateTime ngaythuly)
        {

            object val = null;
            SqlParameter[] parms = new SqlParameter[] {
                new SqlParameter(PARAM_XULYDON_ID, SqlDbType.Int),
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

        public int UpDateState(int xldID, int stateID)
        {

            int val = 0;
            SqlParameter[] parms = new SqlParameter[] {
                new SqlParameter(PARAM_XULYDON_ID, SqlDbType.Int),
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

        public List<DTDuyetKQXuLyMOD> GetYKienXuLy(int XuLyDonID)
        {

            var lsYKienXuLy = new List<DTDuyetKQXuLyMOD>();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_XULYDON_ID,SqlDbType.Int),
            };
            parameters[0].Value = XuLyDonID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_ALL_YKIENXL, parameters))
                {
                    while (dr.Read())
                    {

                        lsYKienXuLy.Add(new DTDuyetKQXuLyMOD
                        {
                            CanBoXuLyID = Utils.ConvertToInt32(dr[PARAM_CANBOID], 0),
                            TenCanBoXuLy = Utils.ConvertToString(dr["TenCanBoXuLy"], ""),
                            NgayXuLy = Utils.ConvertToNullableDateTime(dr["NgayXuLy"], null),
                            YKienXuLy = Utils.ConvertToString(dr["YKienXuLy"], ""),
                            TenFile = Utils.ConvertToString(dr["TenFile"], ""),
                            FileUrl = Utils.ConvertToString(dr["FileUrl"], ""),
                        });
                    }
                    dr.Close();
                }
            }
            catch
            {
                throw;
            }
            return lsYKienXuLy;
        }

        public int InsertYKienXL(DTDuyetKQXuLyMOD DTInfo, DTDuyetKQXuLyClaims claims)
        {

            object val = null;

            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARM_FILEURL, SqlDbType.NVarChar, 2000),
                new SqlParameter(PARM_TENFILE, SqlDbType.NVarChar,2000),
                new SqlParameter(PARAM_CAN_BO_XU_LY_ID, SqlDbType.Int),
                new SqlParameter(PARM_NGAYXULY, SqlDbType.DateTime),
                new SqlParameter(PARM_YKIENXULY, SqlDbType.NVarChar,4000),
                new SqlParameter(PARAM_XULYDON_ID, SqlDbType.Int)
            };

            parameters[0].Value = DTInfo.FileUrl ?? Convert.DBNull;
            parameters[1].Value = DTInfo.TenFile ?? Convert.DBNull;
            parameters[2].Value = claims.CanBoID;
            parameters[3].Value = DTInfo.NgayXuLy ?? Convert.DBNull;
            parameters[4].Value = DTInfo.YKienXuLy ?? Convert.DBNull;
            parameters[5].Value = DTInfo.XuLyDonID;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        val = SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, INSERT_YKIENXL, parameters);
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

        private XuLyDonInfo GetYKienXLData(SqlDataReader rdr)
        {
            XuLyDonInfo info = new XuLyDonInfo();
            info.CanBoXuLyID = Utils.GetInt32(rdr["CanBoID"], 0);
            info.TenCanBoXuLy = Utils.GetString(rdr["TenCanBoXuLy"], string.Empty);
            info.NgayXuLy = Utils.ConvertToDateTime(rdr["NgayXuLy"], DateTime.MinValue);
            info.YKienXuLy = Utils.GetString(rdr["YKienXuLy"], string.Empty);
            info.TenFile = Utils.GetString(rdr["TenFile"], string.Empty);
            info.FileUrl = Utils.GetString(rdr["FileUrl"], string.Empty);
            return info;
        }

        private string RenderTenNguonDonDen(int id)
        {
            switch (id)
            {
                case (int)EnumNguonDonDen.TrucTiep:
                    return "Trực tiếp";

                case (int)EnumNguonDonDen.BuuChinh:
                    return "Bưu chính";

                case (int)EnumNguonDonDen.CoQuanKhac:
                    return "Cơ quan khác chuyển tới";

                case (int)EnumNguonDonDen.TraoTay:
                    return "Trao tay";
            }

            return "";
        }
        private string RenderSateName(int roleID, int stateID)
        {
            string stateName = "";
            if (RoleInstance.IsLanhDao(roleID))
            {
                if (stateID > (int)EnumState.LDDuyetXL)
                {
                    stateName = "Đã duyệt";
                }
                else if (stateID < (int)EnumState.LDDuyetXL)
                {
                    stateName = "Xử lý lại";
                }
                else
                {
                    stateName = "Chưa duyệt";
                }
            }

            if (RoleInstance.IsTruongPhong(roleID))
            {
                if (stateID > (int)EnumState.TPDuyetXL)
                {
                    stateName = "Đã duyệt";

                }
                else if (stateID < (int)EnumState.TPDuyetXL)
                {
                    stateName = "Xử lý lại";
                }
                else
                {
                    stateName = "Chưa duyệt";
                }
            }

            return stateName;
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

        #endregion
    }
}
