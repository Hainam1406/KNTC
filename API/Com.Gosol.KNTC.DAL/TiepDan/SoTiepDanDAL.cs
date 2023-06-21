using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml.FormulaParsing.Excel.Functions.RefAndLookup;
using Com.Gosol.KNTC.Models.TiepDan;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Com.Gosol.KNTC.DAL.BaoCao;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using System.Runtime;

namespace Com.Gosol.KNTC.DAL.TiepDan
{
    public class SoTiepDanDAL
    {
        #region -- Params
        private const string pTiepDanKhongDonID = "TiepDanKhongDonID";
        private const string pNgayTiep = "NgayTiep";
        private const string pNgayGapLanhDao = "NgayGapLanhDao";
        private const string pNoiDungTiep = "NoiDungTiep";
        private const string pCoQuanID = "CoQuanID";
        private const string pDonThuID = "DonThuID";
        private const string pXuLyDonID = "XuLyDonID";
        private const string pLoaiKhieuToID = "LoaiKhieuToID";
        private const string pVuViecCu = "VuViecCu";
        private const string pSoDonThu = "SoDonThu";
        private const string pLanTiep = "LanTiep";
        private const string pNoiDungDon = "NoiDungDon";
        private const string pKetQuaTiep = "KetQuaTiep";
        private const string pTenLanhDaoTiep = "TenLanhDaoTiep";
        private const string pYeuCauNguoiDuocTiep = "YeuCauNguoiDuocTiep";
        private const string pKetLuanNguoiChuTri = "KetLuanNguoiChuTri";
        private const string pTenCanBo = "TenCanBo";
        private const string pTenCoQuan = "TenCoQuan";
        private const string pCQDaGiaiQuyetID = "CQDaGiaiQuyetID";
        private const string pTenHuongGiaiQuyet = "TenHuongGiaiQuyet";
        private const string pHuongGiaiQuyetID = "HuongGiaiQuyetID";
        private const string pNguoiDuocTiepPhatBieu = "NguoiDuocTiepPhatBieu";
        private const string pSoLuong = "SoLuong";
        private const string pCap = "Cap";
        private const string pTenLoaiKhieuTo = "TenLoaiKhieuTo";
        private const string pLoaiKhieuToCha = "LoaiKhieuToCha";
        private const string pThongTinTaiLieu = "ThongTinTaiLieu";
        private const string pHoTen = "HoTen";
        private const string pDiaChiCT = "DiaChiCT";
        private const string pLoaiRutDon = "LoaiRutDon";
        private const string pLoaiCanBoTiep = "LoaiCanBoTiep";

        private const string pTuNgay = "TuNgay";
        private const string pDenNgay = "DenNgay";
        private const string pKeyWord = "KeyWord";
        private const string pStart = "Start";
        private const string pEnd = "End";
        private const string pKeyword = "Keyword";
        private const string pTotalRow = "TotalRow";
        #endregion

        #region -- Procedure
        private const string GET_LOAI_KHIEU_TO_CHA = "DM_LoaiKhieuTo_Get_LoaiKhieuToCha";
        private const string DS_GAP_LANH_DAO = "TiepDanKhongDon_Get_GapLanhDao";
        private const string GET_INSO = @"NV_TiepDanKhongDon_GetInSo";
        #endregion
        public BaseResultModel DanhSach(SoTiepDanParam thamSo, SoTiepDanClaims claims)
        {
            BaseResultModel result = new BaseResultModel();

            IList<SoTiepDanMOD> data = new List<SoTiepDanMOD>();
            SqlParameter[] parameters =
            {
                new SqlParameter(pKeyword, SqlDbType.NVarChar),
                new SqlParameter(pCoQuanID, SqlDbType.Int),
                new SqlParameter(pLoaiKhieuToID, SqlDbType.Int),
                new SqlParameter(pTuNgay, SqlDbType.DateTime),
                new SqlParameter(pDenNgay, SqlDbType.DateTime),
                new SqlParameter(pStart, SqlDbType.Int),
                new SqlParameter(pEnd, SqlDbType.Int),
                new SqlParameter(pLoaiCanBoTiep, SqlDbType.Int),
                new SqlParameter(pLoaiRutDon, SqlDbType.Int),
                new SqlParameter(pVuViecCu, SqlDbType.Bit),
                new SqlParameter(pTotalRow, SqlDbType.Int),
            };
            int offset = thamSo.PageNumber <= 1 ? 0 : (thamSo.PageNumber - 1) * thamSo.PageSize;

            parameters[0].Value = thamSo.Keyword ?? Convert.DBNull;
            parameters[1].Value = claims.CoQuanID;
            parameters[2].Value = thamSo.LoaiKhieuToID ?? Convert.DBNull;
            parameters[3].Value = thamSo.TuNgay ?? Convert.DBNull;
            parameters[4].Value = thamSo.DenNgay ?? Convert.DBNull;
            parameters[5].Value = offset;
            parameters[6].Value = thamSo.PageSize;
            parameters[7].Value = thamSo.LoaiCanBoTiep ?? Convert.DBNull;
            parameters[8].Value = thamSo.LoaiRutDon ?? Convert.DBNull;
            parameters[9].Value = thamSo.Status ?? Convert.DBNull;
            parameters[10].Direction = ParameterDirection.Output;

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDanKhongDon_GetBySearch_v2", parameters);
                while (dr.Read())
                {
                    data.Add(new SoTiepDanMOD
                    {
                        TiepDanKhongDonID = Utils.ConvertToInt32(dr[pTiepDanKhongDonID], 0),
                        NgayTiep = Utils.ConvertToDateTime(dr[pNgayTiep], DateTime.MinValue),
                        GaplanhDao = Utils.ConvertToBoolean(dr[pNgayGapLanhDao], false),
                        NoiDungTiep = Utils.ConvertToString(dr[pNoiDungTiep], string.Empty),
                        VuViecCu = Utils.ConvertToBoolean(dr[pVuViecCu], false),
                        DonThuID = Utils.ConvertToInt32(dr[pDonThuID], 0),
                        XuLyDonID = Utils.ConvertToInt32(dr[pXuLyDonID], 0),
                        LanTiep = Utils.ConvertToInt32(dr[pLanTiep], 0),
                        KetQuaTiep = Utils.ConvertToString(dr[pKetQuaTiep], ""),
                        CoQuanID = Utils.ConvertToInt32(dr[pCoQuanID], 0),
                        //SoDon = Utils.ConvertToInt32(dr[pSoDonThu], 0),
                        TenLanhDaoTiep = Utils.ConvertToString(dr[pTenLanhDaoTiep], ""),
                        YeuCauNguoiDuocTiep = Utils.ConvertToString(dr[pYeuCauNguoiDuocTiep], ""),
                        ThongTinTaiLieu = Utils.ConvertToString(dr[pThongTinTaiLieu], ""),
                        NguoiDuocTiepPhatBieu = Utils.ConvertToString(dr[pNguoiDuocTiepPhatBieu], ""),
                        TenCanBo = Utils.ConvertToString(dr[pTenCanBo], ""),
                        TenCoQuan = Utils.ConvertToString(dr[pTenCoQuan], ""),
                        HoTen = Utils.ConvertToString(dr[pHoTen], ""),
                        NoiDungDon = Utils.ConvertToString(dr[pNoiDungDon], ""),
                        CQDaGiaiQuyetID = Utils.ConvertToString(dr[pCQDaGiaiQuyetID], ""),
                        TenHuongGiaiQuyet = Utils.ConvertToString(dr[pTenHuongGiaiQuyet], ""),
                        HuongGiaiQuyetID = Utils.ConvertToInt32(dr[pHuongGiaiQuyetID], 0),
                        SoLuong = Utils.ConvertToString(dr[pSoLuong], ""),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], ""),
                        KetLuanNguoiChuTri = Utils.ConvertToString(dr[pKetLuanNguoiChuTri], "")
                    });
                }

                dr.Close();

            }
            catch
            {
                throw;
            }
            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            result.TotalRow = Utils.ConvertToInt32(parameters[10].Value, 0);
            return result;
        }

        public BaseResultModel GetAll()
        {
            BaseResultModel result = new BaseResultModel();

            IList<SoTiepDanMOD> data = new List<SoTiepDanMOD>();
            SqlParameter[] parameters =
            {

            };

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NV_TiepDanKhongDon_GetAll_v2", parameters);
                while (dr.Read())
                {
                    data.Add(new SoTiepDanMOD
                    {
                        TiepDanKhongDonID = Utils.ConvertToInt32(dr[pTiepDanKhongDonID], 0),
                        NgayTiep = Utils.ConvertToDateTime(dr[pNgayTiep], DateTime.MinValue),
                        GaplanhDao = Utils.ConvertToBoolean(dr[pNgayGapLanhDao], false),
                        NoiDungTiep = Utils.ConvertToString(dr[pNoiDungTiep], string.Empty),
                        VuViecCu = Utils.ConvertToBoolean(dr[pVuViecCu], false),
                        DonThuID = Utils.ConvertToInt32(dr[pDonThuID], 0),
                        XuLyDonID = Utils.ConvertToInt32(dr[pXuLyDonID], 0),
                        LanTiep = Utils.ConvertToInt32(dr[pLanTiep], 0),
                        KetQuaTiep = Utils.ConvertToString(dr[pKetQuaTiep], ""),
                        //SoDon = Utils.ConvertToInt32(dr[pSoDonThu], 0),
                        TenLanhDaoTiep = Utils.ConvertToString(dr[pTenLanhDaoTiep], ""),
                        YeuCauNguoiDuocTiep = Utils.ConvertToString(dr[pYeuCauNguoiDuocTiep], ""),
                        ThongTinTaiLieu = Utils.ConvertToString(dr[pThongTinTaiLieu], ""),
                        NguoiDuocTiepPhatBieu = Utils.ConvertToString(dr[pNguoiDuocTiepPhatBieu], ""),
                        TenCanBo = Utils.ConvertToString(dr[pTenCanBo], ""),
                        TenCoQuan = Utils.ConvertToString(dr[pTenCoQuan], ""),
                        HoTen = Utils.ConvertToString(dr[pHoTen], ""),
                        NoiDungDon = Utils.ConvertToString(dr[pNoiDungDon], ""),
                        CQDaGiaiQuyetID = Utils.ConvertToString(dr[pCQDaGiaiQuyetID], ""),
                        TenHuongGiaiQuyet = Utils.ConvertToString(dr[pTenHuongGiaiQuyet], ""),
                        HuongGiaiQuyetID = Utils.ConvertToInt32(dr[pHuongGiaiQuyetID], 0),
                        SoLuong = Utils.ConvertToString(dr[pSoLuong], ""),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], ""),
                        KetLuanNguoiChuTri = Utils.ConvertToString(dr[pKetLuanNguoiChuTri], ""),
                    });
                }
                dr.Close();
            }
            catch
            {
                throw;
            }
            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            result.TotalRow = data.Count();
            return result;
        }

        public BaseResultModel DanhSachLoaiKhieuTo()
        {
            BaseResultModel result = new();
            List<LoaiKhieuToMOD> data = new();

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_LOAI_KHIEU_TO_CHA);
                while (dr.Read())
                {
                    data.Add(new LoaiKhieuToMOD
                    {
                        LoaiKhieuToID = Utils.ConvertToInt32(dr[pLoaiKhieuToID], 0),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], ""),
                        LoaiKhieuToCha = Utils.ConvertToInt32(dr[pLoaiKhieuToCha], 0),
                        Cap = Utils.ConvertToInt32(dr[pCap], 0),
                        MappingCode = Utils.ConvertToString(dr["MappingCode"], ""),
                        ThuTu = Utils.ConvertToInt32(dr["ThuTu"], 0),
                    });
                }

                dr.Close();

            }
            catch
            {
                throw;
            }
            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            return result;
        }
        public BaseResultModel DeleteDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var result = new BaseResultModel();
            object val = null;

            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                SqlParameter[] param = new SqlParameter[]{
                    new SqlParameter("DanKhongDenID", SqlDbType.Int),
                    };
                param[0].Value = Info.DanKhongDenID;
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        val = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "TiepDan_DanKhongDen_Delete", param);
                        trans.Commit();
                    }
                    catch
                    {
                        trans.Rollback();
                        throw;
                    }
                }
                conn.Close();

                if (Utils.ConvertToInt32(val, 0) > 0)
                {
                    result.Data = val;
                    result.Message = "Xóa thành Công";
                    result.Status = 1;
                }
                else
                {
                    result.Message = "Xóa thất bại";
                    result.Status = -1;
                }
            }

            return result;
        }

        public BaseResultModel UpdateDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var result = new BaseResultModel();
            object val = null;

            using SqlConnection conn = new(SQLHelper.appConnectionStrings);

            SqlParameter[] param = new SqlParameter[]
            {
                    new SqlParameter("CanBoID", SqlDbType.Int),
                    new SqlParameter("TenCanBo", SqlDbType.NVarChar),
                    new SqlParameter("NguoiTaoID", SqlDbType.Int),
                    new SqlParameter("DanKhongDenID", SqlDbType.Int),
                    new SqlParameter("ChucVu", SqlDbType.NVarChar),
                    new SqlParameter("NgayTruc", SqlDbType.DateTime),
            };

            param[0].Value = Info.CanBoID ?? Convert.DBNull;
            param[1].Value = Info.TenCanBo ?? Convert.DBNull;
            param[2].Value = Info.NguoiTaoID ?? Convert.DBNull;
            param[3].Value = Info.DanKhongDenID;
            param[4].Value = Info.ChucVu ?? Convert.DBNull;
            param[5].Value = Info.NgayTruc ?? DateTime.Now;
            conn.Open();
            using (SqlTransaction trans = conn.BeginTransaction())
            {

                try
                {
                    val = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "TiepDan_DanKhongDen_SoTiepDan_Update", param);
                    trans.Commit();
                    if (Utils.ConvertToInt32(val, 0) > 0) val = Info.DanKhongDenID;
                }
                catch
                {
                    trans.Rollback();
                    throw;
                }
            }
            conn.Close();

            if (val == null)
            {
                result.Message = "Cập nhật thất bại";
                result.Status = -1;
            }
            else
            {
                result.Data = val;
                result.Message = "Cập nhật thành Công";
                result.Status = 1;
            }

            return result;
        }

        public BaseResultModel GetTiepDanDanKhongDen(TiepCongDan_DanKhongDenInfo Info)
        {
            var result = new BaseResultModel();
            TiepCongDan_DanKhongDenInfo DTInfo = new TiepCongDan_DanKhongDenInfo();

            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("DanKhongDenID",SqlDbType.Int)
            };
            parameters[0].Value = Info.DanKhongDenID;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NVTiepDan_GetByDanKhongDenID", parameters))
                {

                    if (dr.Read())
                    {
                        DTInfo.DanKhongDenID = Utils.ConvertToInt32(dr["DanKhongDenID"], 0);
                        DTInfo.TenCanBo = Utils.ConvertToString(dr["TenCanBo"], string.Empty);
                        DTInfo.ChucVu = Utils.ConvertToString(dr["ChucVu"], string.Empty);
                        DTInfo.NguoiTaoID = Utils.ConvertToInt32(dr["NguoiTaoID"], 0);
                        DTInfo.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        DTInfo.NgayTruc = Utils.ConvertToDateTime(dr["NgayTruc"], DateTime.Now);
                        DTInfo.NgayTrucStr = DTInfo.NgayTruc.Value.ToString("dd/MM/yyyy");
                        DTInfo.ChucVu = Utils.ConvertToString(dr["ChucVu"], string.Empty);
                    }
                    dr.Close();
                }
            }
            catch
            {
                throw;
            }
            result.Data = DTInfo;
            result.Message = "Thành Công";
            result.Status = 1;

            return result;
        }

        public BaseResultModel DS_DanKhongDen(TiepCongDan_DanKhongDenParam param, int CoQuanID)
        {
            var result = new BaseResultModel();

            List<TiepCongDan_DanKhongDenInfo> list = new List<TiepCongDan_DanKhongDenInfo>();

            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("start",SqlDbType.Int),
                new SqlParameter("end",SqlDbType.Int),
                new SqlParameter("TenCanBo",SqlDbType.NVarChar),
                new SqlParameter("TuNgay",SqlDbType.DateTime),
                new SqlParameter("DenNgay",SqlDbType.DateTime),
                new SqlParameter("CoQuanID",SqlDbType.Int),
                new SqlParameter("TotalRow",SqlDbType.Int),
            };
            parameters[0].Value = param.start;
            parameters[1].Value = param.end;
            parameters[2].Value = param.TenCanBo ?? Convert.DBNull;
            parameters[3].Value = param.TuNgay ?? Convert.DBNull;
            parameters[4].Value = param.DenNgay ?? Convert.DBNull;
            parameters[5].Value = CoQuanID;  // 284
            parameters[6].Direction = ParameterDirection.Output;


            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "TiepDan_DanKhongDen_GetListPaging", parameters))
                {

                    while (dr.Read())
                    {
                        TiepCongDan_DanKhongDenInfo dkdInfo = new TiepCongDan_DanKhongDenInfo();
                        dkdInfo.DanKhongDenID = Utils.ConvertToInt32(dr["DanKhongDenID"], 0);
                        dkdInfo.NguoiTaoID = Utils.ConvertToInt32(dr["NguoiTaoID"], 0);
                        dkdInfo.CanBoID = Utils.ConvertToInt32(dr["CanBoID"], 0);

                        dkdInfo.TenCanBo = Utils.ConvertToString(dr["TenCanBo"], String.Empty);
                        dkdInfo.ChucVu = Utils.ConvertToString(dr["ChucVu"], String.Empty);
                        dkdInfo.NgayTruc = Utils.ConvertToDateTime(dr["NgayTruc"], DateTime.MinValue);
                        if (dkdInfo.NgayTruc != DateTime.MinValue)
                        {
                            dkdInfo.NgayTrucStr = dkdInfo.NgayTruc.Value.ToString("dd/MM/yyyy");
                        }
                        list.Add(dkdInfo);
                    }
                    dr.Close();
                }

            }
            catch
            {
                throw;
            }
            result.TotalRow = Utils.ConvertToInt32(parameters[6].Value, 0);
            result.Data = list;
            result.Message = "Thành Công";
            result.Status = 1;


            return result;
        }

        private int CountListPaging(string TenCanBo, DateTime? TuNgay, DateTime? DenNgay)
        {
            int Count = 0;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("TenCanBo",SqlDbType.NVarChar),
                new SqlParameter("TuNgay",SqlDbType.DateTime),
                new SqlParameter("DenNgay",SqlDbType.DateTime),
            };
            parameters[0].Value = TenCanBo ?? Convert.DBNull;
            parameters[1].Value = TuNgay ?? Convert.DBNull;
            parameters[2].Value = DenNgay ?? Convert.DBNull;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "TiepDan_DanKhongDen_CountListPaging", parameters))
                {

                    if (dr.Read())
                    {
                        Count = Utils.ConvertToInt32(dr["Count"], 0);
                    }
                    dr.Close();
                }
            }
            catch
            {
                throw;
            }
            return Count;
        }

        public BaseResultModel DanhSachGapLanhDao(SoTiepDanClaims claims)
        {
            BaseResultModel result = new();
            IList<SoTiepDanMOD> data = new List<SoTiepDanMOD>();

            SqlParameter[] parameters =
            {
                new SqlParameter(pTuNgay, SqlDbType.DateTime),
                new SqlParameter(pDenNgay, SqlDbType.DateTime),
                new SqlParameter(pCoQuanID, SqlDbType.Int),
            };

            parameters[0].Value = new DateTime(2022, 1, 1);
            parameters[1].Value = Convert.DBNull;
            parameters[2].Value = claims.CoQuanID;

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, DS_GAP_LANH_DAO, parameters);
                while (dr.Read())
                {
                    data.Add(new SoTiepDanMOD
                    {
                        HoTen = Utils.ConvertToString(dr[pHoTen], string.Empty),
                        DiaChi = Utils.ConvertToString(dr[pDiaChiCT], string.Empty),
                        NoiDungTiep = Utils.ConvertToString(dr[pNoiDungTiep], string.Empty),
                        NgayTiep = Utils.ConvertToNullableDateTime(dr[pNgayTiep], null),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], string.Empty),
                        TenLanhDaoTiep = Utils.ConvertToString(dr[pTenLanhDaoTiep], string.Empty),
                    });
                }

                dr.Close();

            }
            catch
            {
                throw;
            }
            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            result.TotalRow = data.Count();

            return result;
        }



        public BaseResultModel Xoa_SoTiepDan(SoTiepDanXoa param)
        {
            BaseResultModel result = new BaseResultModel();

            SqlParameter[] parameters =
            {
                new SqlParameter(pTiepDanKhongDonID, SqlDbType.Int),

            };

            parameters[0].Value = param.TiepDanKhongDonID;
            using var con = new SqlConnection(SQLHelper.appConnectionStrings);
            con.Open();
            using var trans = con.BeginTransaction();

            int col;
            try
            {
                col = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, "NV_TiepDanKhongDon_Delete", parameters);
                trans.Commit();
            }
            catch
            {
                trans.Rollback();
                throw;
            }
            result.Message = col == 0 ? "Đơn thư không tồn tại" : "Xóa Thành Công!";
            result.Status = 1;
            return result;
        }
    }
}
