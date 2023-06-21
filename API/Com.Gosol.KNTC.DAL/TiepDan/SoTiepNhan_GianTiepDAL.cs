using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.TiepDan;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.DAL.TiepDan
{
    public class SoTiepNhan_GianTiepDAL
    {
        #region -- Params
        private const string pXuLyDonID = "XuLyDonID";
        private const string pSoBienNhanMotCua = "SoBienNhanMotCua";
        private const string pMaHoSoMotCua = "MaHoSoMotCua";
        private const string pNgayHenTraMotCua = "NgayHenTraMotCua";
        private const string pDonThuID = "DonThuID";
        private const string pSoDonThu = "SoDonThu";
        private const string pDoiTuongBiKNID = "DoiTuongBiKNID";
        private const string pNhomKNID = "NhomKNID";
        private const string pNoiDungDon = "NoiDungDon";
        private const string pTenLoaiKhieuTo = "TenLoaiKhieuTo";
        private const string pHoTen = "HoTen";
        private const string pNguonDonDen = "NguonDonDen";
        private const string pNgayNhapDon = "NgayNhapDon";
        private const string pSoCongVan = "SoCongVan";
        private const string pTenCQChuyenDonDen = "TenCQChuyenDonDen";
        private const string pDiaChiCT = "DiaChiCT";
        private const string pStateName = "StateName";
        private const string pHuongGiaiQuyetID = "HuongGiaiQuyetID";
        private const string pCBDuocChonXL = "CBDuocChonXL";
        private const string pQTTiepNhanDon = "QTTiepNhanDon";
        private const string pLoaiKhieuToID = "LoaiKhieuToID";
        private const string pCoQuanID = "CoQuanID";
        private const string pCQChuyenDonDenID = "CQChuyenDonDenID";

        private const string pTuNgay = "TuNgay";
        private const string pDenNgay = "DenNgay";
        private const string pKeyWord = "KeyWord";
        private const string pStart = "Start";
        private const string pEnd = "End";
        private const string pLoaiRutDon = "LoaiRutDon";
        private const string pTotalRow = "TotalRow";
        #endregion

        #region -- Procedure

        public const string getALLSoTiepNhan_GianTiep = "XuLyDon_GetSoTiepNhan_GianTiep_v2";
        public const string DonThu_Delete_DTDaTiepNhan = "DonThu_Delete_DTDaTiepNhan";
        private const string SELECT_ALL_COQUAN = "DM_CoQuan_GetAll";

        #endregion

        #region -- Function 
        public BaseResultModel DanhSach(SoTiepNhanParams thamSo, SoTiepNhanClaims info)
        {
            BaseResultModel result = new BaseResultModel();
            List<SoTiepNhan_GianTiepMOD> data = new List<SoTiepNhan_GianTiepMOD>();

            SqlParameter[] parameters =
            {
                new SqlParameter(pCoQuanID, SqlDbType.Int),
                new SqlParameter(pKeyWord, SqlDbType.NVarChar),
                new SqlParameter(pLoaiKhieuToID, SqlDbType.Int),
                new SqlParameter(pTuNgay, SqlDbType.DateTime),
                new SqlParameter(pDenNgay, SqlDbType.DateTime),
                new SqlParameter(pStart, SqlDbType.Int),
                new SqlParameter(pEnd, SqlDbType.Int),
                new SqlParameter(pCQChuyenDonDenID, SqlDbType.Int),
                new SqlParameter(pLoaiRutDon, SqlDbType.Int),
                new SqlParameter(pTotalRow, SqlDbType.Int),
            };
            
            parameters[0].Value = info.CoQuanID;
            parameters[1].Value = thamSo.Keyword ?? Convert.DBNull;
            parameters[2].Value = thamSo.LoaiKhieuToID ?? Convert.DBNull;
            parameters[3].Value = thamSo.TuNgay ?? Convert.DBNull;
            parameters[4].Value = thamSo.DenNgay ?? Convert.DBNull;
            parameters[5].Value = thamSo.PageNumber <= 1 ? 1 : (thamSo.PageNumber - 1) * thamSo.PageSize + 1;
            parameters[6].Value = thamSo.PageNumber * thamSo.PageSize;
            parameters[7].Value = thamSo.CQChuyenDonDenID ?? Convert.DBNull;
            parameters[8].Value = thamSo.LoaiRutDon ?? Convert.DBNull;
            parameters[9].Direction = ParameterDirection.Output;

            using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, getALLSoTiepNhan_GianTiep, parameters);

            while (dr.Read())
            {
                string nguondonden = "";

                switch (Utils.ConvertToInt32(dr[pNguonDonDen], 0))
                {
                    case (int)EnumNguonDonDen.TrucTiep:
                        nguondonden = "Trực tiếp";
                        break;
                    case (int)EnumNguonDonDen.BuuChinh:
                        nguondonden = "Bưu chính";
                        break;
                    case (int)EnumNguonDonDen.CoQuanKhac:
                        nguondonden = "Cơ quan khác chuyển tới";
                        if (Utils.ConvertToString(dr[pMaHoSoMotCua], string.Empty) != string.Empty)
                            nguondonden = "Liên thông một cửa";
                        break;
                    case (int)EnumNguonDonDen.TraoTay:
                        nguondonden = "Trao tay";
                        break;
                }

                var stateName = Utils.ConvertToString(dr[pStateName], string.Empty);
                string trangthai;
                if (stateName == Constant.CV_TiepNhan)
                {
                    trangthai = info.SuDungQuyTrinh ? "Chưa trình" : "Chưa xử lý";
                }
                else
                { 
                    if (info.SuDungQuyTrinh)
                    {
                        trangthai = "Đã trình";
                    }
                    else
                    {
                        if (stateName == Constant.LD_Phan_GiaiQuyet)
                        {
                            trangthai = "Đã xử lý";
                        }
                        else
                        {
                            if (stateName == Constant.Ket_Thuc)
                            {
                                trangthai = "Đã xử lý";
                            }
                            else
                            {
                                trangthai = "Đã giao";
                            }
                        }
                    }

                }


                data.Add(new SoTiepNhan_GianTiepMOD
                {
                    XuLyDonID = Utils.ConvertToInt32(dr[pXuLyDonID], 0),
                    CBDuocChonXL = Utils.ConvertToInt32(dr[pCBDuocChonXL], 0),
                    DiaChiCT = Utils.ConvertToString(dr[pDiaChiCT], string.Empty),
                    DoiTuongBiKNID = Utils.ConvertToInt32(dr[pDoiTuongBiKNID], 0),
                    DonThuID = Utils.ConvertToInt32(dr[pDonThuID], 0),
                    HoTen = Utils.ConvertToString(dr[pHoTen], string.Empty),
                    HuongGiaiQuyetID = Utils.ConvertToInt32(dr[pHuongGiaiQuyetID], 0),
                    MaHoSoMotCua = Utils.ConvertToString(dr[pMaHoSoMotCua], string.Empty),
                    NgayHenTraMotCua = Utils.ConvertToNullableDateTime(dr[pNgayHenTraMotCua], null),
                    NguonDonDen = nguondonden,
                    NgayNhapDon = Utils.ConvertToNullableDateTime(dr[pNgayNhapDon], null),
                    NhomKNID = Utils.ConvertToInt32(dr[pNhomKNID], 0),
                    NoiDungDon = Utils.ConvertToString(dr[pNoiDungDon], string.Empty),
                    QTTiepNhanDon = Utils.ConvertToInt32(dr[pQTTiepNhanDon], 0),
                    SoBienNhanMotCua = Utils.ConvertToString(dr[pSoBienNhanMotCua], string.Empty),
                    SoCongVan = Utils.ConvertToString(dr[pSoCongVan], string.Empty),
                    SoDonThu = Utils.ConvertToString(dr[pSoDonThu], string.Empty),
                    StateName = Utils.ConvertToString(dr[pStateName], string.Empty),
                    TenCQChuyenDonDen = Utils.ConvertToString(dr[pTenCQChuyenDonDen], string.Empty),
                    TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], string.Empty),
                    TrangThai = trangthai
                });
            }
            dr.Close();

            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            result.TotalRow = Utils.ConvertToInt32(parameters[9].Value, 0);
            return result;
        }

        public BaseResultModel DS_CoQuan()
        {
            var result = new BaseResultModel();
            List<DS_CoQuanModel> data = new List<DS_CoQuanModel>();
            using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, SELECT_ALL_COQUAN);
            while (dr.Read())
            {
                data.Add(new DS_CoQuanModel
                {
                    CoQuanID = Utils.ConvertToInt32(dr[pCoQuanID], 0),
                    TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], "")
                });
            }
            result.Data = data;
            result.Message = "Thành Công";
            result.Status = 1;
            result.TotalRow = data.Count();

            return result;
        }

        public BaseResultModel Delete_DonThuDaTiepNhan(SoTiepNhan_GianTiepMOD thamSo)
        {
            var result = new BaseResultModel();
            int val = 0;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(pDonThuID,SqlDbType.Int),
                new SqlParameter(pXuLyDonID,SqlDbType.Int)
            };
            parameters[0].Value = thamSo.DonThuID;
            parameters[1].Value = thamSo.XuLyDonID;
            using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
            {
                conn.Open();
                using (SqlTransaction trans = conn.BeginTransaction())
                {
                    try
                    {
                        val = SQLHelper.ExecuteNonQuery(trans, CommandType.StoredProcedure, DonThu_Delete_DTDaTiepNhan, parameters);
                        trans.Commit();

                        if (val > 0)
                        {
                            result.Message = "Xóa thành Công";
                            result.Status = 1;
                        }
                        else
                        {
                            result.Message = "Xóa không thành Công";
                            result.Status = -1;
                        }
                    }
                    catch
                    {
                        trans.Rollback();
                        throw;
                    }
                }
                conn.Close();
            }
            

            return result;
        }

        public SoTiepNhan_GianTiepMOD GetSoTiepNhan_GianTiep(SqlDataReader dr)
        {
            SoTiepNhan_GianTiepMOD data = new SoTiepNhan_GianTiepMOD
            {
                XuLyDonID = Utils.ConvertToInt32(dr[pXuLyDonID], 0),
                CBDuocChonXL = Utils.ConvertToInt32(dr[pCBDuocChonXL], 0),
                DiaChiCT = Utils.ConvertToString(dr[pDiaChiCT], string.Empty),
                DoiTuongBiKNID = Utils.ConvertToInt32(dr[pDoiTuongBiKNID], 0),
                DonThuID = Utils.ConvertToInt32(dr[pDonThuID], 0),
                HoTen = Utils.ConvertToString(dr[pHoTen], string.Empty),
                HuongGiaiQuyetID = Utils.ConvertToInt32(dr[pHuongGiaiQuyetID], 0),
                MaHoSoMotCua = Utils.ConvertToString(dr[pMaHoSoMotCua], string.Empty),
                NgayHenTraMotCua = Utils.ConvertToNullableDateTime(dr[pNgayHenTraMotCua], null),
                NgayNhapDon = Utils.ConvertToNullableDateTime(dr[pNgayNhapDon], null),
                NhomKNID = Utils.ConvertToInt32(dr[pNhomKNID], 0),
                NoiDungDon = Utils.ConvertToString(dr[pNoiDungDon], string.Empty),
                QTTiepNhanDon = Utils.ConvertToInt32(dr[pQTTiepNhanDon], 0),
                SoBienNhanMotCua = Utils.ConvertToString(dr[pSoBienNhanMotCua], string.Empty),
                SoCongVan = Utils.ConvertToString(dr[pSoCongVan], string.Empty),
                SoDonThu = Utils.ConvertToString(dr[pSoDonThu], string.Empty),
                StateName = Utils.ConvertToString(dr[pStateName], string.Empty),
                TenCQChuyenDonDen = Utils.ConvertToString(dr[pTenCQChuyenDonDen], string.Empty),
                TenLoaiKhieuTo = Utils.ConvertToString(dr[pTenLoaiKhieuTo], string.Empty),
            };

            return data;
        }
        #endregion
    }
}
