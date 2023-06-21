using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.RefAndLookup;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.XuLyDon;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
//using Com.Gosol.KNTC.Models.KNTC;
using KetQuaInfo = Com.Gosol.KNTC.Models.XuLyDon.KetQuaInfo;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Models.TiepDan;

namespace Com.Gosol.KNTC.DAL.XuLyDon
{
    public class DonDocDAL
    {       
        private const string DS_donthudondoc = @"DonDoc_DS_CanDonDoc";
        private const string Ds_donthudondoc_1 = @"DonDoc_DS_CanDonDoc1";
        private const string DonDoc_DS_CanDonDoc_NotPaging = @"DonDoc_DS_CanDonDoc_NotPaging";
        private const string DonDoc_GetDonDocByXLDID = @"DonDoc_GetDonDocByXLDID";
        private const string DonDoc_DS_CountCanDonDoc = @"DonDoc_DS_CountCanDonDoc";

        public BaseResultModel DanhSachDonDoc(dk_dondoc p)
        {
            var Result = new BaseResultModel();
            List<DonThuDonDocInfo> Data = new List<DonThuDonDocInfo>();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@StartDate", SqlDbType.DateTime),
                new SqlParameter("@EndDate", SqlDbType.DateTime),
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@HuongGiaiQuyetID", SqlDbType.Int),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TrangThaiID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar),
                new SqlParameter("@CoQuanDangNhapID", SqlDbType.Int),
                new SqlParameter("@Start", SqlDbType.Int),
                new SqlParameter("@End", SqlDbType.Int)

            };

            parameters[0].Value = p.startDate ?? Convert.DBNull;
            parameters[1].Value = p.endDate ?? Convert.DBNull;
            parameters[2].Value = p.CoQuanID ?? Convert.DBNull;
            parameters[3].Value = p.HuongGiaiQuyetID ?? Convert.DBNull;
            parameters[4].Value = p.LoaiKhieuToID ?? Convert.DBNull;
            parameters[5].Value = p.TrangThaiID ?? Convert.DBNull ;
            parameters[6].Value = p.Keyword != null ? p.Keyword : "";
            parameters[7].Value = p.CoQuanDangNhapID;
            parameters[8].Value = p.start ?? Convert.DBNull;
            parameters[9].Value = p.end ?? Convert.DBNull;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DonDoc_DS_CanDonDoc1", parameters))
                {
                    while (dr.Read())
                    {
                        DonThuDonDocInfo item = new DonThuDonDocInfo();
                        item.DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0);
                        item.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        item.SoDonThu = Utils.ConvertToString(dr["SoDonThu"], string.Empty);
                        item.TenChuDon = Utils.ConvertToString(dr["TenChuDon"], string.Empty);
                        item.NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], string.Empty);
                        item.NguonDonDen = Utils.ConvertToString(dr["TenNguonDonDen"], string.Empty);
                        item.PhanLoai = Utils.ConvertToString(dr["PhanLoai"], string.Empty);
                        item.TenHuongXuLy = Utils.ConvertToString(dr["TenHuongXuLy"], string.Empty);
                        item.HuongXuLyID = Utils.ConvertToInt32(dr["HuongXuLyID"], 0);
                        item.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        item.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);
                        item.HanXuLy = Utils.ConvertToDateTime(dr["HanXuLy"], DateTime.MinValue);
                        item.NgayDonDocStr = Format.FormatDate(item.HanXuLy.Value);
                        item.TrangThaiID = Utils.ConvertToInt32(dr["TrangThai"], 0);
                        item.CanhBao = Utils.ConvertToInt32(dr["CanhBao"], 0);
                        if (item.TrangThaiID == 1)
                        {
                            item.TenTrangThai = "Chưa xử lý";
                        }
                        else if (item.TrangThaiID == 4)
                        {
                            item.TenTrangThai = "Đã xử lý";
                        }
                        else if (item.TrangThaiID == 2)
                        {
                            item.TenTrangThai = "Chưa giải quyết";
                        }
                        else if (item.TrangThaiID == 3)
                        {
                            item.TenTrangThai = "Đang giải quyết";
                        }
                        else
                        {
                            item.TenTrangThai = "Đã giải quyết";
                        }

                        item.IsDonDoc = Utils.ConvertToInt32(dr["DonDocID"], 0);
                        if (item.IsDonDoc > 0)
                        {
                            item.TenTrangThaiDonDoc = "Đã đôn đốc";
                        }
                        else
                        {
                            item.TenTrangThaiDonDoc = "Chưa đôn đốc";
                        }
                        Data.Add(item);
                    }
                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
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
        // donthu_notpaing
        public BaseResultModel DanhSachDonDoc_NotPaging(dk_dondocNotPaing p)
        {
            var Result = new BaseResultModel();
            List<DonThuDonDocInfo> Data = new List<DonThuDonDocInfo>();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@StartDate", SqlDbType.DateTime),
                new SqlParameter("@EndDate", SqlDbType.DateTime),
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@HuongGiaiQuyetID", SqlDbType.Int),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TrangThaiID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar),
                new SqlParameter("@CoQuanDangNhapID", SqlDbType.Int),

            };

            parameters[0].Value = p.startDate ?? Convert.DBNull;
            parameters[1].Value = p.endDate ?? Convert.DBNull;
            parameters[2].Value = p.CoQuanID ?? Convert.DBNull;
            parameters[3].Value = p.HuongGiaiQuyetID ?? Convert.DBNull;
            parameters[4].Value = p.LoaiKhieuToID ?? Convert.DBNull;
            parameters[5].Value = p.TrangThaiID ?? Convert.DBNull;
            parameters[6].Value = p.Keyword != null ? p.Keyword : "";
            parameters[7].Value = p.CoQuanDangNhapID ;
            
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "DonDoc_DS_CanDonDoc_NotPaging", parameters))
                {
                    while (dr.Read())
                    {
                        DonThuDonDocInfo item = new DonThuDonDocInfo();
                        item.DonThuID = Utils.ConvertToInt32(dr["DonThuID"], 0);
                        item.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        item.SoDonThu = Utils.ConvertToString(dr["SoDonThu"], string.Empty);
                        item.TenChuDon = Utils.ConvertToString(dr["TenChuDon"], string.Empty);
                        item.NoiDungDon = Utils.ConvertToString(dr["NoiDungDon"], string.Empty);
                        item.NguonDonDen = Utils.ConvertToString(dr["TenNguonDonDen"], string.Empty);
                        item.PhanLoai = Utils.ConvertToString(dr["PhanLoai"], string.Empty);
                        item.TenHuongXuLy = Utils.ConvertToString(dr["TenHuongXuLy"], string.Empty);
                        item.HuongXuLyID = Utils.ConvertToInt32(dr["HuongXuLyID"], 0);
                        item.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        item.TenCoQuan = Utils.ConvertToString(dr["TenCoQuan"], string.Empty);
                        item.HanXuLy = Utils.ConvertToDateTime(dr["HanXuLy"], DateTime.MinValue);
                        item.NgayDonDocStr = Format.FormatDate(item.HanXuLy.Value);
                        item.TrangThaiID = Utils.ConvertToInt32(dr["TrangThai"], 0);
                        item.CanhBao = Utils.ConvertToInt32(dr["CanhBao"], 0);
                        if (item.TrangThaiID == 1)
                        {
                            item.TenTrangThai = "Chưa xử lý";
                        }
                        else if (item.TrangThaiID == 4)
                        {
                            item.TenTrangThai = "Đã xử lý";
                        }
                        else if (item.TrangThaiID == 2)
                        {
                            item.TenTrangThai = "Chưa giải quyết";
                        }
                        else if (item.TrangThaiID == 3)
                        {
                            item.TenTrangThai = "Đang giải quyết";
                        }
                        else
                        {
                            item.TenTrangThai = "Đã giải quyết";
                        }

                        item.IsDonDoc = Utils.ConvertToInt32(dr["DonDocID"], 0);
                        if (item.IsDonDoc > 0)
                        {
                            item.TenTrangThaiDonDoc = "Đã đôn đốc";
                        }
                        else
                        {
                            item.TenTrangThaiDonDoc = "Chưa đôn đốc";
                        }
                        Data.Add(item);
                    }
                    dr.Close();
                }
                //var TotalRow = Utils.ConvertToInt32(parameters[4].Value, 0);
                Result.Status = 1;
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

        // Update van ban don doc
        public BaseResultModel GetDonDocByXLDID(int? XulyDonID)
        {
            var Result = new BaseResultModel();
            DonThuDonDocInfo list = new DonThuDonDocInfo();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@XulyDonID", SqlDbType.Int)
            };
            parameters[0].Value = XulyDonID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, DonDoc_GetDonDocByXLDID, parameters))
                {
                    while (dr.Read())
                    {
                        list.XuLyDonID = Utils.ConvertToInt32(dr["XuLyDonID"], 0);
                        list.NgayDonDoc = Utils.ConvertToDateTime(dr["NgayDonDoc"], DateTime.MinValue);
                        list.NgayDonDocStr = Format.FormatDate(list.NgayDonDoc.Value);
                        list.NoiDungDon = Utils.ConvertToString(dr["NoiDungDonDoc"], string.Empty);
                        break;
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = list;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // CountDanhSachDonThuCanDonDoc
        public BaseResultModel CountDanhSachDonThuCanDonDoc(dk_dondocNotPaing p)
        {
            var Result = new BaseResultModel();
            DonThuDonDocInfo CountData = new DonThuDonDocInfo();
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@StartDate", SqlDbType.DateTime),
                new SqlParameter("@EndDate", SqlDbType.DateTime),
                new SqlParameter("@CoQuanID", SqlDbType.Int),
                new SqlParameter("@HuongGiaiQuyetID", SqlDbType.Int),
                new SqlParameter("@LoaiKhieuToID", SqlDbType.Int),
                new SqlParameter("@TrangThaiID", SqlDbType.Int),
                new SqlParameter("@Keyword", SqlDbType.NVarChar),
                new SqlParameter("@CoQuanDangNhapID", SqlDbType.Int),

            };

            parameters[0].Value = p.startDate ?? Convert.DBNull;
            parameters[1].Value = p.endDate ?? Convert.DBNull;
            parameters[2].Value = p.CoQuanID ?? Convert.DBNull;
            parameters[3].Value = p.HuongGiaiQuyetID ?? Convert.DBNull;
            parameters[4].Value = p.LoaiKhieuToID ?? Convert.DBNull;
            parameters[5].Value = p.TrangThaiID ?? Convert.DBNull;
            parameters[6].Value = p.Keyword != null ? p.Keyword : "";
            parameters[7].Value = p.CoQuanDangNhapID ;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure,DonDoc_DS_CountCanDonDoc, parameters))
                {
                    while (dr.Read())
                    {
                        CountData = new DonThuDonDocInfo();
                        CountData.Tong = Utils.ConvertToInt32(dr["Tong"], 0);
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Message = "CountDanhSachDonThuCanDonDoc";
                Result.Data = CountData.Tong;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }

        // ínert 
        public BaseResultModel Insert_RaVanBanDonDoc(KetQuaInfo cInfo, ref int DonDocID)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@NgayDonDoc", SqlDbType.DateTime),
                    new SqlParameter("@NoiDungDonDoc", SqlDbType.NVarChar),
                    new SqlParameter("@XuLyDonID", SqlDbType.Int),
                    new SqlParameter("@DonDocID", SqlDbType.Int),
                };
                parameters[0].Value = cInfo.NgayDonDoc;
                parameters[1].Value = cInfo.NoiDungDonDoc;
                parameters[2].Value = cInfo.XuLyDonID;
                parameters[3].Direction = ParameterDirection.Output;
                parameters[3].Size = 8;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "DonDoc_Insert", parameters).ToString(), 0);
                            trans.Commit();
                            DonDocID = Utils.ConvertToInt32(parameters[3].Value, 0);
                            Result.Message = "Thêm mới VBDD thành công!";
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
        //UpdateNhanVanBanDonDoc 
        public BaseResultModel UpdateNhanVanBanDonDoc(int? XulyDonID)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parameters = new SqlParameter[]
                {
                   new SqlParameter("@XulyDonID", SqlDbType.Int)
                };
                parameters[0].Value = XulyDonID ?? Convert.DBNull;
                
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "XuLyDon_UpDateVBDonDoc_New", parameters).ToString(), 0);
                            trans.Commit();                          
                            Result.Message = "thành công!";
                            Result.Data = Result.Status;
                        }
                        catch (Exception )
                        {
                            Result.Status = -1;
                            Result.Message = "Lỗi hệ thống";
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
        // insertfile DonDoc
        public BaseResultModel InsertFileDonDoc(FileHoSoInfo info, ref int FileHoSoID)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parms = new SqlParameter[]
                {
                    new SqlParameter("@TenFile", SqlDbType.NVarChar),
                    new SqlParameter("@NgayUp", SqlDbType.DateTime),
                    new SqlParameter("@NguoiUp", SqlDbType.Int),
                    new SqlParameter("@FileURL", SqlDbType.NVarChar),
                    new SqlParameter("@DonDocID", SqlDbType.Int),
                    new SqlParameter("@FileHoSoID", SqlDbType.Int),
                    new SqlParameter("@FileID", SqlDbType.Int)
                };
                parms[0].Value = info.TenFile;
                parms[1].Value = info.NgayUp;
                parms[2].Value = info.NguoiUp;
                parms[3].Value = info.FileURL;
                parms[4].Value = info.DonDocID;
                parms[5].Direction = ParameterDirection.Output;
                parms[6].Value = info.FileID;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "FileKetQua_Insert_New", parms).ToString(), 0);
                            trans.Commit();
                            FileHoSoID = Utils.ConvertToInt32(parms[5].Value, 0);
                            Result.Message = "Thêm mới file thành công!";
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
        public BaseResultModel UpdateCQNhanVBDonDoc(int XuLyDonID, int CQNhanVanBanDonDoc)
        {
            var Result = new BaseResultModel();
            try
            {
                SqlParameter[] parms = new SqlParameter[]
                {
                   new SqlParameter("@XuLyDonID", SqlDbType.Int),
                new SqlParameter("@CoQuanID", SqlDbType.Int)
                };
                parms[0].Value = XuLyDonID;
                parms[1].Value = CQNhanVanBanDonDoc;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "XuLyDon_UpDateVBDonDoc", parms).ToString(), 0);
                            trans.Commit();
                            
                            Result.Message = "Update thành công!";
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
        public BaseResultModel InsertFileDonDoc_v1(FileHoSoInfo info, ref int FileHoSoID)
        {
            var Result = new BaseResultModel();
           
            try
            {
                SqlParameter[] parms = new SqlParameter[]
                {
                    new SqlParameter("@TenFile", SqlDbType.NVarChar),
                    new SqlParameter("@NgayUp", SqlDbType.DateTime),
                    new SqlParameter("@NguoiUp", SqlDbType.Int),
                    new SqlParameter("@FileURL", SqlDbType.NVarChar),
                    new SqlParameter("@DonDocID", SqlDbType.Int),
                    new SqlParameter("@FileHoSoID", SqlDbType.Int),
                    new SqlParameter("@FileID", SqlDbType.Int)
                };
                parms[0].Value = info.TenFile;
                parms[1].Value = info.NgayUp;
                parms[2].Value = info.NguoiUp;
                parms[3].Value = info.FileURL;
                parms[4].Value = info.DonDocID;
                parms[5].Direction = ParameterDirection.Output;
                parms[6].Value = info.FileID;
                using (SqlConnection conn = new SqlConnection(SQLHelper.appConnectionStrings))
                {
                    conn.Open();
                    using (SqlTransaction trans = conn.BeginTransaction())
                    {
                        try
                        {
                            Result.Status = Utils.ConvertToInt32(SQLHelper.ExecuteScalar(trans, CommandType.StoredProcedure, "Insert_FileDonDoc_New", parms).ToString(), 0);
                            trans.Commit();
                            FileHoSoID = Utils.ConvertToInt32(parms[5].Value, 0);
                            Result.Message = "Thêm mới file thành công!";
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
    }
    
}
