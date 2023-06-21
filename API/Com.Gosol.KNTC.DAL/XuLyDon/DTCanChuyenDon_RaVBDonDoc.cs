using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Com.Gosol.KNTC.DAL.KNTC;
using MySql.Data.MySqlClient;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models.TiepDan;
using System.Security.Cryptography.X509Certificates;
using Com.Gosol.KNTC.Security;

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class DTCanChuyenDon_RaVBDonDoc
    {
        private const string ChuyenDon_GetDTChuyenDon_RaVBDonDoc = "ChuyenDon_GetDTChuyenDon_RaVBDonDoc";
        private const string ChuyenDon_GetDTChuyenDon_RaVBDonDoc_v1 = "ChuyenDon_GetDTChuyenDon_RaVBDonDoc_v1";
        public const string CHUYENDON_RAVBDONDOC = "Chuyển đơn hoặc gửi văn bản đôn đốc";
        private RaVanBanDonDocMOD GetData(SqlDataReader rdr)
        {
            RaVanBanDonDocMOD donThuGiaiQuyetInfo = new RaVanBanDonDocMOD();
            donThuGiaiQuyetInfo.XuLyDonID = Utils.GetInt32(rdr["XuLyDonID"], 0);
            donThuGiaiQuyetInfo.DonThuID = Utils.GetInt32(rdr["DonThuID"], 0);
            donThuGiaiQuyetInfo.HoTen = Utils.GetString(rdr["HoTen"], string.Empty);
            donThuGiaiQuyetInfo.SoDonThu = Utils.GetString(rdr["SoDonThu"], string.Empty);
            donThuGiaiQuyetInfo.NoiDungDon = Utils.GetString(rdr["NoiDungDon"], string.Empty);
            if (donThuGiaiQuyetInfo.NoiDungDon.Length > Constant.LengthNoiDungDon)
            {
                donThuGiaiQuyetInfo.NoiDungDon = donThuGiaiQuyetInfo.NoiDungDon.Substring(0, Constant.LengthNoiDungDon) + Constant.ChuoiCuoiNDDon;
            }

            donThuGiaiQuyetInfo.TenLoaiKhieuTo = Utils.GetString(rdr["TenLoaiKhieuTo"], string.Empty);
            return donThuGiaiQuyetInfo;
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

        // COUNT
        public BaseResultModel ChuyenDon_RaVBDonDoc(QueryInfo info, DTDuyetKQXuLyClaims Info)
        {
            var Result = new BaseResultModel();
            List<RaVanBanDonDocMOD> Data = new List<RaVanBanDonDocMOD>();
            string trangthai ;
            string tenCQNhan;
            SqlParameter[] parms = new SqlParameter[]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@KeyWord", SqlDbType.NVarChar, 50),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgayGoc", SqlDbType.DateTime),
                new SqlParameter("@DenNgayGoc", SqlDbType.DateTime),
                new SqlParameter("@Start", SqlDbType.Int),
                new SqlParameter("@End", SqlDbType.Int),
                new SqlParameter("@StateName", SqlDbType.NVarChar, 100),
                new SqlParameter("@CanBoID", SqlDbType.Int),
                new SqlParameter("@PhongBanID", SqlDbType.Int),
                new SqlParameter("@TuNgayMoi", SqlDbType.DateTime),
                new SqlParameter("@DenNgayMoi", SqlDbType.DateTime)

            };

            parms[0].Value = info.CoQuanID;
            parms[1].Value = info.KeyWord != null ? info.KeyWord : "";
            parms[2].Value = info.LoaiKhieuToID;
            parms[3].Value = info.TuNgayGoc ?? Convert.DBNull;
            parms[4].Value = info.DenNgayGoc ?? Convert.DBNull;
            parms[5].Value = info.Start;
            parms[6].Value = info.End;
            parms[7].Value = info.StateName != null ? info.StateName : "";
            parms[8].Value = info.CanBoID;
            parms[9].Value = info.PhongBanID;
            parms[10].Value = info.TuNgayMoi ?? Convert.DBNull;
            parms[11].Value = info.DenNgayMoi ?? Convert.DBNull;
            if (info.TuNgayGoc == DateTime.MinValue)
            {
                parms[3].Value = DBNull.Value;
            }

            if (info.DenNgayGoc == DateTime.MinValue)
            {
                parms[4].Value = DBNull.Value;
            }

            if (info.TuNgayMoi == DateTime.MinValue)
            {
                parms[10].Value = DBNull.Value;
            }

            if (info.DenNgayMoi == DateTime.MinValue)
            {
                parms[11].Value = DBNull.Value;
            }
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, ChuyenDon_GetDTChuyenDon_RaVBDonDoc, parms))
                {
                    while (dr.Read())
                    {
                        RaVanBanDonDocMOD item = GetData(dr);
                        item.TenNguonDonDen = Utils.GetString(dr["TenNguonDonDen"], string.Empty);
                        item.StateID = Utils.ConvertToInt32(dr["StateID"], 0);
                        item.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        string value = Format.FormatDate(DateTime.Now);
                        DateTime dateTime = Utils.ConvertToDateTime(value, DateTime.MinValue);
                        item.CQNhanDonChuyen = Utils.ConvertToString(dr["CQNhanDonChuyen"], string.Empty);
                        item.CQNhanVanBanDonDoc = Utils.ConvertToString(dr["CQNhanVanBanDonDoc"], string.Empty);
                        item.HuongXuLyID = Utils.ConvertToInt32(dr["HuongGiaiQuyetID"], 0);
                        item.TenHuongGiaiQuyet = Utils.ConvertToString(dr["TenHuongGiaiQuyet"], string.Empty);
                        item.NguonDonDen = Utils.ConvertToInt32(dr["TenNguonDonDen"], 0);
                        item.StateName1 = RenderSateName(Info.RoleID, Utils.ConvertToInt32(dr["StateName"], 0));
                        if (item.StateID == 25)
                        {
                            trangthai = "Chuyển Đơn";
                        }
                        else
                        {
                            trangthai = "Ðã chuyển";
                        }
                        if (item.HuongXuLyID == 32)
                        {
                            tenCQNhan = item.CQNhanDonChuyen;
                        }
                        else if (item.HuongXuLyID == 34 || item.HuongXuLyID == 69)
                        {
                            tenCQNhan = item.CQNhanVanBanDonDoc;
                        }
                        Data.Add(item);
                    }

                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
                Result.Message = "Danh sách văn bản đơn thư cần đôn đốc ";
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

        public BaseResultModel CountDTCanChuyenDon_RaVBDonDoc(QueryInfo info)
        {
            var Result = new BaseResultModel();
            DonThuGiaiQuyetInfo CountData = new DonThuGiaiQuyetInfo();
            SqlParameter[] parms = new SqlParameter[]
            {
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@KeyWord", SqlDbType.NVarChar, 50),
                new SqlParameter("LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TuNgayGoc", SqlDbType.DateTime),
                new SqlParameter("@DenNgayGoc", SqlDbType.DateTime),
                new SqlParameter("@TuNgayMoi", SqlDbType.DateTime),
                new SqlParameter("@DenNgayMoi", SqlDbType.DateTime),
                new SqlParameter("StateName", SqlDbType.NVarChar, 100),
                new SqlParameter("CanBoID", SqlDbType.Int)

            };

            parms[0].Value = info.CoQuanID ;
            parms[1].Value = info.KeyWord != null ? info.KeyWord : "";
            parms[2].Value = info.LoaiKhieuToID ;
            parms[3].Value = info.TuNgayGoc ?? Convert.DBNull;
            parms[4].Value = info.DenNgayGoc ?? Convert.DBNull;
            parms[5].Value = info.TuNgayMoi ?? Convert.DBNull;
            parms[6].Value = info.DenNgayMoi ?? Convert.DBNull;
            parms[7].Value = info.StateName != null ? info.StateName : ""; 
            parms[8].Value = info.CanBoID  ;
            if (info.TuNgayGoc == DateTime.MinValue)
            {
                parms[3].Value = DBNull.Value;
            }

            if (info.DenNgayGoc == DateTime.MinValue)
            {
                parms[4].Value = DBNull.Value;
            }

            if (info.TuNgayMoi == DateTime.MinValue)
            {
                parms[5].Value = DBNull.Value;
            }

            if (info.DenNgayMoi == DateTime.MinValue)
            {
                parms[6].Value = DBNull.Value;
            }
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "PhanGiaiQuyet_CountDonThuCanPhanGiaiQuyetTrongCoQuan", parms))
                {
                    while (dr.Read())
                    {
                        CountData = new DonThuGiaiQuyetInfo();
                        CountData.Count = Utils.ConvertToInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "PhanGiaiQuyet_CountDonThuCanPhanGiaiQuyetTrongCoQuan";
                Result.Data = CountData.Count;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        //----------------
        
        public BaseResultModel GetAllCoQuanTiepNhan(int? CoQuanID)
        {
            var Result = new BaseResultModel();
            List<CoQuanInfo> list = new List<CoQuanInfo>();
            SqlParameter[] parms = new SqlParameter[]
            {
                new SqlParameter("CoQuanID", SqlDbType.Int)

            };

            parms[0].Value = CoQuanID;
            
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DM_GetAllCoQuanChuyenDon", parms))
                {
                    while (dr.Read())
                    {
                        CoQuanInfo coQuanInfo = new CoQuanInfo();
                        coQuanInfo.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        coQuanInfo.TenCoQuan = Utils.GetString(dr["TenCoQuan"], string.Empty);
                        coQuanInfo.CoQuanChaID = Utils.GetInt32(dr["CoQuanChaID"], 0);
                        coQuanInfo.CapID = Utils.ConvertToInt32(dr["CapID"], 0);
                        coQuanInfo.SuDungPM = Utils.ConvertToBoolean(dr["SuDungPM"], defaultValue: false);
                        list.Add(coQuanInfo);
                    }
                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
                Result.Message = "Danh sách cơ quan tiếp nhận ";
                Result.Data = list;
                //Result.TotalRow = TotalRow;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }


        public BaseResultModel Insert_RaVanBanDonDoc(KetQuaInfo cInfo, ref int DonDocID)
        {
            var Result = new BaseResultModel();
            try
            {
                int i = 0;
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@NgayDonDoc", SqlDbType.DateTime),
                    new SqlParameter("@NoiDungDonDoc", SqlDbType.NVarChar),
                    new SqlParameter("@XuLyDonID", SqlDbType.Int),
                    new SqlParameter("@DonDocID", SqlDbType.Int)
                };
                parameters[0].Value = cInfo.NgayDonDoc;
                parameters[1].Value = cInfo.NoiDungDonDoc;
                parameters[2].Value = cInfo.XuLyDonID;
                parameters[3].Direction = ParameterDirection.Output;
                parameters[3].Size = 8;
                i++;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, @"DonDoc_Insert", parameters).ToString(), 0);
                            trans.Commit();
                            DonDocID = Utils.ConvertToInt32(parameters[3].Value, 0);
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

        public BaseResultModel InsertFileDonDoc(InforHoSo info, ref int FileHoSoID)
        {
            var Result = new BaseResultModel();
            try
            {

                SqlParameter[] parameters = new SqlParameter[]
                {
                   new SqlParameter("@TenFile", SqlDbType.NVarChar),
                   new SqlParameter("@NgayUp", SqlDbType.DateTime),
                   new SqlParameter("@NguoiUp", SqlDbType.Int),
                   new SqlParameter("@FileURL", SqlDbType.NVarChar),
                   new SqlParameter("@DonDocID", SqlDbType.Int),
                   new SqlParameter("@FileHoSoID", SqlDbType.Int),
                   new SqlParameter("@FileID", SqlDbType.Int)
                };
                parameters[0].Value = info.TenFile;
                parameters[1].Value = info.NgayUp;
                parameters[2].Value = info.NguoiUp;
                parameters[3].Value = info.FileURL;
                parameters[4].Value = info.DonDocID;
                parameters[5].Direction = ParameterDirection.Output;
                parameters[6].Value = info.FileID;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, @"Insert_FileDonDoc_New", parameters).ToString(), 0);
                            trans.Commit();
                            FileHoSoID = Utils.ConvertToInt32(parameters[5].Value, 0);
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

        private XuLyDonInfo GetHuongGiaiQuyetRaVBDonDoc(SqlDataReader rdr)
        {
            XuLyDonInfo xuLyDonInfo = new XuLyDonInfo();
            xuLyDonInfo.XuLyDonID = Utils.ConvertToInt32(rdr["XuLyDonID"], 0);
            xuLyDonInfo.DonThuID = Utils.ConvertToInt32(rdr["DonThuID"], 0);
            xuLyDonInfo.TenChuDon = Utils.ConvertToString(rdr["HoTenChuDon"], string.Empty);
            xuLyDonInfo.TenCoQuanRaVanBan = Utils.GetString(rdr["TenCoQuan"], string.Empty);
            xuLyDonInfo.NgayXuLy = Utils.ConvertToDateTime(rdr["NgayRaVanBanDonDoc"], DateTime.MinValue);
            xuLyDonInfo.NoiDung = Utils.GetString(rdr["NoiDungDon"], string.Empty);
            xuLyDonInfo.SoDonThu = Utils.GetString(rdr["SoDonThu"], string.Empty);
            return xuLyDonInfo;
        }
        public BaseResultModel GetHuongGiaiQuyetRaVBDonDoc(string Keyword, DateTime? tuNgay, DateTime? denNgay, int start, int end, int? LoaiKhieuToID, ref int total, int? CoQuanDangNhapID)
        {
            var Result = new BaseResultModel();
            List<XuLyDonInfo> list = new List<XuLyDonInfo>();
            SqlParameter[] array = new SqlParameter[]
            {
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime),
                new SqlParameter("@Start", SqlDbType.Int),
                new SqlParameter("@End", SqlDbType.Int),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@Total", SqlDbType.Int),
                new SqlParameter("@CoQuanNhanVanBanDonDoc", SqlDbType.Int)
            };

            array[0].Value = ((Keyword == "") ? "" : Keyword);
            SqlParameter obj = array[1];
            DateTime? dateTime = tuNgay;
            obj.Value = (dateTime.HasValue ? ((object)dateTime.GetValueOrDefault()) : Convert.DBNull);
            SqlParameter obj2 = array[2];
            dateTime = denNgay;
            obj2.Value = (dateTime.HasValue ? ((object)dateTime.GetValueOrDefault()) : Convert.DBNull);
            array[3].Value = start;
            array[4].Value = end;
            SqlParameter obj3 = array[5];
            int? num = LoaiKhieuToID;
            obj3.Value = (num.HasValue ? ((object)num.GetValueOrDefault()) : Convert.DBNull);
            array[6].Direction = ParameterDirection.Output;
            array[6].Size = 8;
            array[7].Value = CoQuanDangNhapID;
            if (tuNgay == DateTime.MinValue)
            {
                array[1].Value = DBNull.Value;
            }

            if (denNgay == DateTime.MinValue)
            {
                array[2].Value = DBNull.Value;
            }

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_Get_HuongXuLyRaVBDonDoc_New", array))
                {
                    while (dr.Read())
                    {
                        XuLyDonInfo huongGiaiQuyetRaVBDonDoc = GetHuongGiaiQuyetRaVBDonDoc(dr);
                        huongGiaiQuyetRaVBDonDoc.HuongGiaiQuyetID = Utils.ConvertToInt32(dr["HuongGiaiQuyetID"], 0);
                        huongGiaiQuyetRaVBDonDoc.CanhBao = Utils.ConvertToInt32(dr["CanhBao"], 0);
                        huongGiaiQuyetRaVBDonDoc.TenChuDon = Utils.ConvertToString(dr["HoTenChuDon"], string.Empty);
                        huongGiaiQuyetRaVBDonDoc.NgayDonDoc = Utils.ConvertToDateTime(dr["NgayRaVanBanDonDoc"], DateTime.MinValue);
                        huongGiaiQuyetRaVBDonDoc.HanXuLy = Utils.ConvertToDateTime(dr["HanXuLy"], DateTime.MinValue);
                        huongGiaiQuyetRaVBDonDoc.HanXuLyStr = Format.FormatDate(huongGiaiQuyetRaVBDonDoc.HanXuLy);
                        huongGiaiQuyetRaVBDonDoc.NgayDonDocStr = Format.FormatDate(huongGiaiQuyetRaVBDonDoc.NgayDonDoc);
                        huongGiaiQuyetRaVBDonDoc.PhanLoai = Utils.ConvertToString(dr["TenLoaiKhieuTo"], string.Empty);
                        huongGiaiQuyetRaVBDonDoc.TenNguonDonDen = Utils.ConvertToString(dr["TenNguonDonDen"], string.Empty);
                        huongGiaiQuyetRaVBDonDoc.SoDonThu = Utils.ConvertToString(dr["SoDonThu"], string.Empty);
                        huongGiaiQuyetRaVBDonDoc.NoiDung = Utils.ConvertToString(dr["NoiDungDon"], string.Empty);
                        huongGiaiQuyetRaVBDonDoc.TrangThaiDonID = Utils.ConvertToInt32(dr["TrangThai"], 0);
                        huongGiaiQuyetRaVBDonDoc.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        huongGiaiQuyetRaVBDonDoc.DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0);
                        if (huongGiaiQuyetRaVBDonDoc.TrangThaiDonID == 1)
                        {
                            huongGiaiQuyetRaVBDonDoc.TenTrangThai = "Chưa nhận đôn đốc";
                        }
                        else if (huongGiaiQuyetRaVBDonDoc.TrangThaiDonID == 2)
                        {
                            huongGiaiQuyetRaVBDonDoc.TenTrangThai = "Chưa báo cáo";
                        }
                        else
                        {
                            huongGiaiQuyetRaVBDonDoc.TenTrangThai = "Đã báo cáo";
                        }

                        list.Add(huongGiaiQuyetRaVBDonDoc);
                    }
                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
                Result.Message = "GetHuongGiaiQuyetRaVBDonDoc";
                Result.Data = list;
                //Result.TotalRow = TotalRow;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        //---
        public BaseResultModel Count_ListVanBanDonDoc(int HuongGiaiQuyetID, string Keyword, DateTime tuNgay, DateTime denNgay, int cQNhanVBDonDoc)
        {
            var Result = new BaseResultModel();
            
            int Tong = 0;
            SqlParameter[] array = new SqlParameter[]
            {
                new SqlParameter("@HuongGiaiQuyetID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar, 50),
                new SqlParameter("@TuNgay", SqlDbType.DateTime),
                new SqlParameter("@DenNgay", SqlDbType.DateTime),
                new SqlParameter("@CoQuanNhanVanBanDonDoc", SqlDbType.Int)
            };
            array[0].Value = HuongGiaiQuyetID;
            array[1].Value = Keyword;
            array[2].Value = tuNgay;
            array[3].Value = denNgay;
            array[4].Value = cQNhanVBDonDoc;
            if (tuNgay == DateTime.MinValue)
            {
                array[2].Value = DBNull.Value;
            }

            if (denNgay == DateTime.MinValue)
            {
                array[3].Value = DBNull.Value;
            }

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_Count_HuongXuLyRaVBDonDoc", array))
                {
                    while (dr.Read())
                    {
                        Tong = Utils.ConvertToInt32(dr["CountNum"], 0);
                    }
                    dr.Close();
                }             
                Result.Status = 1;
                Result.Message = "Count_ListVanBanDonDoc";
                Result.Data = Tong;
             
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        public bool CheckIsHuongGiaiQuyetChuyenVBDD(int xulydonid, string tenhuonggiaiquyet)
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
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_CheckIsHuongGiaiQuyet", parameters))
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
        public TiepDanInfo DonDoc_GetDonDocByXLDID1(int xulydonID)
        {

            TiepDanInfo DTInfo = null;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("XuLyDonID",SqlDbType.Int)
            };
            parameters[0].Value = xulydonID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DonDoc_GetDonDocByXLDID", parameters))
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
        public bool CheckIsHuongGiaiQuyetDD(int xulydonid, string tenhuonggiaiquyet)
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
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "XuLyDon_CheckIsHuongGiaiQuyet", parameters))
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
                new SqlParameter("XuLyDonID",SqlDbType.Int)
            };
            parameters[0].Value = xulydonID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NVTiepDan_GetAllXuLyDonByID", parameters))
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
                        val = SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "XuLyDon_UpdateNgayThuLy", parms);
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
        public BaseResultModel DS_HuongGiaiQuyet(ThamSoLocDanhMuc p)
        {
            var Result = new BaseResultModel();
            List<DS_HuongGiaiQuyet> Data = new List<DS_HuongGiaiQuyet>();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@Keyword",SqlDbType.NVarChar,50),
                new SqlParameter("@TrangThai",SqlDbType.Bit),
                new SqlParameter("@Limit",SqlDbType.Int),
                new SqlParameter("@Offset",SqlDbType.Int),
                new SqlParameter("@TotalRow",SqlDbType.Int),

            };
            parameters[0].Value = p.Keyword != null ? p.Keyword : "";
            parameters[1].Value = p.Status ?? Convert.DBNull;
            parameters[2].Value = (p.PageSize == 0 ? 10 : p.PageSize);
            parameters[3].Value = (p.PageSize == 0 ? 10 : p.PageSize) * ((p.PageNumber == 0 ? 1 : p.PageNumber) - 1);
            parameters[4].Direction = ParameterDirection.Output;
            parameters[4].Size = 8;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DS__HuongGiaiQuyet", parameters))
                {
                    while (dr.Read())
                    {
                        DS_HuongGiaiQuyet item = new DS_HuongGiaiQuyet();
                        item.HuongGiaiQuyetID = Utils.ConvertToInt32(dr["HuongGiaiQuyetID"], 0);
                        item.TenHuongGiaiQuyet = Utils.ConvertToString(dr["TenHuongGiaiQuyet"], string.Empty);
                        item.MaHuongGiaiQuyet = Utils.ConvertToString(dr["MaHuongGiaiQuyet"], string.Empty);
                        item.GhiChu = Utils.ConvertToString(dr["GhiChu"], string.Empty);
                        item.TrangThai = Utils.ConvertToBoolean(dr["TrangThai"], false);
                        Data.Add(item);
                    }
                    dr.Close();
                }
                var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
                Result.Data = Data;
                Result.TotalRow = TotalRow;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        //DonDoc_GetDonDocByXLDID
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
    }


}
