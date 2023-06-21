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

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class QLHoSoDonThuDAL
    {
        #region --- Params
        private const string PARAM_CO_QUAN_ID = "@CoQuanID";
        private const string PARAM_TUNGAY = "@TuNgay";
        private const string PARAM_DENNGAY = "@DenNgay";
        private const string PARAM_LOAI_KHIEU_TO_ID = "@LoaiKhieuToID";
        private const string PARAM_KEYWORD = "@keyword";
        private const string PARAM_START = "@Start";
        private const string PARAM_END = "@End";
        private const string PARAM_TINHID = "@TinhID";
        private const string PARAM_HUYENID = "@HuyenID";
        #endregion

        #region --- Store
        private const string GET_DATA_HOSODONTHU = @"NV_DonThu_GetDataForHoSoDonThu";
        private const string GET_COUNT_HOSODONTHU = @"NV_DonThu_CountSearchForHoSoDonThu";
        #endregion

        #region Function
        public BaseResultModel DanhSach(QLHoSoDonThuParams thamSo, QLHoSoDonThuClaims Info)
        {
            var result = new BaseResultModel();

            List<QLHoSoDonThuMOD> data = new ();

            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_CO_QUAN_ID,SqlDbType.Int),
                new SqlParameter(PARAM_TUNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_DENNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_LOAI_KHIEU_TO_ID, SqlDbType.Int),
                new SqlParameter(PARAM_KEYWORD, SqlDbType.NVarChar,50),
                new SqlParameter(PARAM_START, SqlDbType.Int),
                new SqlParameter(PARAM_END, SqlDbType.Int),
                new SqlParameter(PARAM_HUYENID, SqlDbType.Int)
            };
            int coQuanID = thamSo.CoQuanID == 0 ? Info.CoQuanID : thamSo.CoQuanID;

            parameters[0].Value = coQuanID; 
            parameters[1].Value = thamSo.TuNgay ?? Convert.DBNull; 
            parameters[2].Value = thamSo.DenNgay ?? Convert.DBNull; 
            parameters[3].Value = thamSo.LoaiKhieuToID ?? 0; 
            parameters[4].Value = thamSo.Keyword ?? ""; 
            parameters[5].Value = thamSo.PageNumber <= 1 ? 0 : (thamSo.PageNumber - 1) * thamSo.PageSize;
            parameters[6].Value = thamSo.PageNumber * thamSo.PageSize;
            parameters[7].Value = Info.HuyenID;

            try
            {
                using var dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_DATA_HOSODONTHU, parameters);
                
                while (dr.Read())
                {
                    data.Add(new QLHoSoDonThuMOD
                    {
                        DonThuID = Utils.ConvertToInt32(dr["DonThuID"],0),
                        XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0),
                        SoDonThu = Utils.ConvertToString(dr["SoDonThu"],""),
                        CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0),
                        HanGiaiQuyet = Utils.ConvertToNullableDateTime(dr["HanGiaiQuyet"], null),
                        HoTen = Utils.ConvertToString(dr["HoTen"], ""),
                        TenNguonDonDen = RenderTenNguonDonDen(Utils.ConvertToInt32(dr["NguonDonDen"], 0)),
                        TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], ""),
                        NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], ""),
                        NoiDungHuongDan = Utils.ConvertToString(dr["NoiDungHuongDan"], ""),
                        TenTinh = Utils.ConvertToString(dr["TenTinh"], ""),
                        TenHuyen = Utils.ConvertToString(dr["TenHuyen"], ""),
                        NgayNhapDon = Utils.ConvertToNullableDateTime(dr["NgayNhapDon"], null),
                        HuongXuLy = Utils.ConvertToString(dr["HuongXuLy"], ""),
                        TenLoaiDoiTuong = Utils.ConvertToString(dr["TenLoaiDoiTuong"], ""),
                        TenLoaiKhieuTo = Utils.ConvertToString(dr["TenLoaiKhieuTo"], ""),
                        
                        //DiaChiCT = Utils.ConvertToString(dr["DiaChiCT"], ""),
                    }); 
                }

                dr.Close();

                result.TotalRow= CountHSDT(thamSo.Keyword, thamSo.LoaiKhieuToID, thamSo.TuNgay, thamSo.DenNgay, coQuanID, Info.HuyenID);
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

        public List<DanhMucFileInfo> File_Get_DanhSachDangSuDung()
        {
            List<DanhMucFileInfo> result = new List<DanhMucFileInfo>();
            List<DanhMucFileInfo> DanhSachFile = new List<DanhMucFileInfo>();
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DM_File_GetAll"))
                {
                    while (dr.Read())
                    {
                        DanhMucFileInfo Info = new DanhMucFileInfo();
                        Info.TrangThaiSuDung = Utils.ConvertToBoolean(dr["TrangThaiSuDung"], false);
                        if (Info.TrangThaiSuDung == true)
                        {
                            Info.FileID = Utils.GetInt32(dr["FileID"], 0);
                            Info.TenFile = Utils.GetString(dr["TenFile"], String.Empty);
                            Info.ThuTuHienThi = Utils.ConvertToInt32(dr["ThuTuHienThi"], 0);
                            Info.NhomFileID = Utils.GetInt32(dr["NhomFileID"], 0);
                            Info.ChucNangID = Utils.GetInt32(dr["ChucNangID"], 0);
                            DanhSachFile.Add(Info);
                        }
                    }
                    dr.Close();
                }
                if (DanhSachFile != null && DanhSachFile.Count > 0)
                {
                    result = (from m in DanhSachFile
                              group m by new { m.FileID, m.TenFile, m.ThuTuHienThi, m.TrangThaiSuDung, m.NhomFileID } into file
                              select new DanhMucFileInfo
                              {
                                  FileID = file.Key.FileID,
                                  TenFile = file.Key.TenFile,
                                  ThuTuHienThi = file.Key.ThuTuHienThi,
                                  TrangThaiSuDung = file.Key.TrangThaiSuDung,
                                  NhomFileID = file.Key.NhomFileID,
                                  DanhSachChucNangID = DanhSachFile.Where(x => x.FileID == file.Key.FileID).Select(x => x.ChucNangID).ToList()
                              }
                            ).ToList();
                }
            }
            catch { throw; }
            return result;
        }
        public int CountHSDT(string keyword, int? lktID, DateTime? tuNgay, DateTime? denNgay, int? coquanID, int? huyenID = 0)
        {

            object result = 0;


            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_CO_QUAN_ID,SqlDbType.Int),
                new SqlParameter(PARAM_TUNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_DENNGAY, SqlDbType.DateTime),
                new SqlParameter(PARAM_LOAI_KHIEU_TO_ID, SqlDbType.Int),
                new SqlParameter(PARAM_KEYWORD, SqlDbType.NVarChar,50),
                new SqlParameter(PARAM_HUYENID, SqlDbType.Int),
                //new SqlParameter(PARAM_CMND,SqlDbType.VarChar)
            };

            parameters[0].Value = coquanID ?? -1;
            parameters[1].Value = tuNgay ?? Convert.DBNull;
            parameters[2].Value = denNgay ?? Convert.DBNull;
            parameters[3].Value = lktID ?? 0;
            parameters[4].Value = keyword ?? "";
            parameters[5].Value = huyenID ?? 0;

            if (tuNgay == DateTime.MinValue) parameters[1].Value = DBNull.Value;
            if (denNgay == DateTime.MinValue) parameters[2].Value = DBNull.Value;

            try
            {
                result = SQLHelper.ExecuteScalar(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_COUNT_HOSODONTHU, parameters);

            }
            catch
            {
            }

            return Utils.ConvertToInt32(result, 0);


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
        #endregion
    }
}
