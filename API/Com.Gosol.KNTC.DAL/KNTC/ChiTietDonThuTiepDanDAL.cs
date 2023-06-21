using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.TiepDan;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.Models.DanhMuc;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Model.HeThong;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Security;

namespace Com.Gosol.KNTC.DAL.KNTC
{
    public class ChiTietDonThuTiepDanDAL
    {

        public List<XuLyDonMOD> GetXuLyDonID(int DonThuID)
        {
            List<XuLyDonMOD> XuLyDon = new List<XuLyDonMOD>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "id_GetXuLyDon", parameters))
                {
                    while (dr.Read())
                    {
                        XuLyDonMOD item = new XuLyDonMOD();
                        item.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);
                        item.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);                       
                        item.SoLan = Utils.GetInt32(dr["SoLan"], 0);
                        item.NgayNhapDon = Utils.ConvertToDateTime(dr["NgayNhapDon"], DateTime.MinValue);
                        item.NgayChuyenDon = Utils.ConvertToDateTime(dr["NgayChuyenDon"], DateTime.MinValue);
                        item.NguonDonDen = Utils.GetInt32(dr["NguonDonDen"], 0);
                        item.CQChuyenDonDenID = Utils.GetInt32(dr["CQChuyenDonDenID"], 0);
                        item.HuongGiaiQuyetID = Utils.GetInt32(dr["HuongGiaiQuyetID"], 0);
                        item.SoCongVan = Utils.GetString(dr["SoCongVan"], string.Empty);
                        item.CQDaGiaiQuyetID = Utils.GetString(dr["CQDaGiaiQuyetID"], string.Empty);
                        item.SoDonThu = Utils.GetString(dr["SoDonThu"], string.Empty);
                        item.CanBoXuLyID = Utils.GetInt32(dr["NguonDonDen"], 0);
                        item.CoQuanID = Utils.GetInt32(dr["CQChuyenDonDenID"], 0);
                        item.CanBoTiepNhapID = Utils.GetInt32(dr["HuongGiaiQuyetID"], 0);

                        XuLyDon.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception )
            {
            }
            return XuLyDon;
        }

        public List<TiepDanKhongDonMOD> GetTiepDanKhongDonID(int DonThuID)
        {
            List<TiepDanKhongDonMOD> TiepDanKhongDon = new List<TiepDanKhongDonMOD>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "GetTiepDanKhongDon_IDdt", parameters))
                {
                    while (dr.Read())
                    {
                        TiepDanKhongDonMOD item = new TiepDanKhongDonMOD();
                        item.TiepDanKhongDonID = Utils.GetInt32(dr["TiepDanKhongDonID"], 0);
                        item.NgayTiep = Utils.ConvertToDateTime(dr["NgayTiep"], DateTime.MinValue);
                        item.GapLanhDao = Utils.ConvertToBoolean(dr["GapLanhDao"], false);
                        item.NgayGapLanhDao = Utils.ConvertToDateTime(dr["NgayTiep"], DateTime.MinValue);
                        item.NoiDungTiep = Utils.GetString(dr["NoiDungTiep"], string.Empty);

                        item.VuViecCu = Utils.ConvertToBoolean(dr["VuViecCu"], false);
                        item.CanBoTiepID = Utils.GetInt32(dr["CanBoTiepID"], 0);
                        item.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
                        item.CoQuanID = Utils.GetInt32(dr["CoQuanID"], 0);
                        item.XuLyDonID = Utils.GetInt32(dr["XuLyDonID"], 0);

                        item.LanTiep = Utils.GetInt32(dr["LanTiep"], 0);
                        item.KetQuaTiep = Utils.GetString(dr["KetQuaTiep"], string.Empty);
                        item.SoDon = Utils.GetString(dr["SoDon"], string.Empty);
                        item.NhomKNID = Utils.GetInt32(dr["NhomKNID"], 0);
                        item.LoaiKhieuTo1ID = Utils.GetInt32(dr["LoaiKhieuTo1ID"], 0);
                        item.LoaiKhieuTo2ID = Utils.GetInt32(dr["LoaiKhieuTo2ID"], 0);
                        item.LoaiKhieuTo3ID = Utils.GetInt32(dr["LoaiKhieuTo3ID"], 0);

                        item.TenLanhDaoTiep = Utils.GetString(dr["TenLanhDaoTiep"], string.Empty);
                        item.LanhDaoDangKy = Utils.GetString(dr["LanhDaoDangKy"], string.Empty);
                        item.KQTiepDan = Utils.GetInt32(dr["KQQuaTiepDan"], 0);
                        item.YeuCauNguoiDuocTiep = Utils.GetString(dr["YeuCauNguoiDuocTiep"], string.Empty);
                        item.ThongTinTaiTieu = Utils.GetString(dr["ThongTinTaiLieu"], string.Empty);
                        item.KetQuaNguoiChuTri = Utils.GetString(dr["KetLuanNguoiChuTri"], string.Empty);
                        item.NguoiDuocTiepPhatBieu = Utils.GetString(dr["NguoiDuocTiepPhatBieu"], string.Empty);

                        TiepDanKhongDon.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return TiepDanKhongDon;
        }

        public List<DonThuMod> GetDonThu(int DonThuID)
        {
            List<DonThuMod> DonThu = new List<DonThuMod>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "id_GetDonThu", parameters))
                {
                    while (dr.Read())
                    {
                        DonThuMod item = new DonThuMod();
                        item.DonThuID = Utils.GetInt32(dr["DonThuID"], 0);
                        item.DiaChiPhatSinh = Utils.GetString(dr["DiaChiPhatSinh"], string.Empty);
                        item.NhomKNID = Utils.GetInt32(dr["NhomKNID"], 0);
                        item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.LoaiKhieuTo1ID = Utils.GetInt32(dr["LoaiKhieuTo1ID"], 0);
                        item.LoaiKhieuTo2ID = Utils.GetInt32(dr["LoaiKhieuTo2ID"], 0);
                        item.LoaiKhieuTo3ID = Utils.GetInt32(dr["LoaiKhieuTo3ID"], 0);
                        item.LoaiKhieuToID = Utils.GetInt32(dr["LoaiKhieuToID"], 0);
                        item.NoiDungDon = Utils.GetString(dr["NoiDungDon"], string.Empty);
                        item.TrungDon = Utils.ConvertToBoolean(dr["TrungDon"], false);
                        item.DiaChiPhatSinh = Utils.GetString(dr["DiaChiPhatSinh"], string.Empty);

                        item.TinhID = Utils.GetInt32(dr["TinhID"], 0);
                        item.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
                        item.XaID = Utils.GetInt32(dr["XaID"], 0);
                        item.LeTanChuyen = Utils.ConvertToBoolean(dr["LeTanChuyen"], false);
                        item.NgayVietDon = Utils.ConvertToDateTime(dr["NgayVietDon"], DateTime.MinValue);
                        DonThu.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return DonThu;
        } 

        public List<NhomKNMOD> GetNhomKN(int DonThuID)
        {
            List<NhomKNMOD> NhomKN = new List<NhomKNMOD>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "id_GetNhomKN_DT", parameters))
                {
                    while (dr.Read())
                    {
                        NhomKNMOD item = new NhomKNMOD();
                        item.NhomKNID = Utils.GetInt32(dr["NhomKNID"], 0);
                        item.DiaChiCQ = Utils.GetString(dr["DiaChiCQ"], string.Empty);
                        
                        item.SoLuong = Utils.GetInt32(dr["SoLuong"], 0);
                        item.LoaiDoiTuongKNID = Utils.GetInt32(dr["LoaiDoiTuongKNID"], 0);
                        
                        item.TenCQ = Utils.GetString(dr["TenCQ"], string.Empty);
                        item.DaiDienPhapLy = Utils.ConvertToBoolean(dr["DaiDienPhapLy"], false);
                        item.DuocUyQuyen = Utils.ConvertToBoolean(dr["DuocUyQuyen"], false);

                        NhomKN.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return NhomKN;
        }

        

        public List<NhomDoiTuongBiKN> GetDoiTuongBiKN(int DonThuID)
        {
            List<NhomDoiTuongBiKN> DoiTuongBiKN = new List<NhomDoiTuongBiKN>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
              
            };
            parameters[0].Value = DonThuID;
            
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "id_DTKN_CNBKN", parameters))
                {
                    while (dr.Read())
                    {
                        NhomDoiTuongBiKN item = new NhomDoiTuongBiKN();
                        item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.TenDoiTuongBiKN = Utils.GetString(dr["TenDoiTuongBiKN"], string.Empty);
                        item.TinhID = Utils.GetInt32(dr["TinhID"], 0);
                        item.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
                        item.XaID = Utils.GetInt32(dr["XaID"], 0);
                        item.LoaiDoiTuongBiKNID = Utils.GetInt32(dr["LoaiDoiTuongBiKNID"], 0);
                        item.CaNhanBiKNID = Utils.GetInt32(dr["CaNhanBiKNID"], 0);
                        item.ChucVuID = Utils.GetInt32(dr["ChucVuID"], 0);
                        item.DanTocID = Utils.GetInt32(dr["DanTocID"], 0);
                        item.QuocTichID = Utils.GetInt32(dr["QuocTichID"], 0);
                        item.NoiCongTac = Utils.GetString(dr["NoiCongTac"], string.Empty);
                        //item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.NgheNghiep = Utils.GetString(dr["NgheNghiep"], string.Empty);

                        DoiTuongBiKN.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return DoiTuongBiKN;
        } 
        public List<DoiTuongKNMOD> GetDoiTuongKN(int DonThuID)
        {
            List<DoiTuongKNMOD> DoiTuongKN = new List<DoiTuongKNMOD>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "id_GetDoiTuongKN_dt", parameters))
                {
                    while (dr.Read())
                    {
                        DoiTuongKNMOD item = new DoiTuongKNMOD();
                        item.DoiTuongKNID = Utils.GetInt32(dr["DoiTuongKNID"], 0);
                        item.HoTen = Utils.GetString(dr["HoTen"], string.Empty);
                        item.CMND = Utils.GetString(dr["CMND"], string.Empty);
                        item.NgayCap = Utils.ConvertToDateTime(dr["NgayCap"], DateTime.MinValue);
                        item.NoiCap = Utils.GetString(dr["NoiCap"], string.Empty);
                        item.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
                        item.TinhID = Utils.GetInt32(dr["TinhID"], 0);
                        item.DanTocID = Utils.GetInt32(dr["DanTocID"], 0);
                        item.QuocTichID = Utils.GetInt32(dr["QuocTichID"], 0);
                        item.SoDienThoai = Utils.GetString(dr["SoDienThoai"], string.Empty);
                        item.GioiTinh = Utils.GetInt32(dr["GioiTinh"], 0);
                        item.NgheNghiep = Utils.GetString(dr["NgheNghiep"], string.Empty);
                        item.XaID = Utils.GetInt32(dr["XaID"], 0);
                        item.DiaChiCT = Utils.GetString(dr["DiaChiCT"], string.Empty);
                        item.NhomKNID = Utils.GetInt32(dr["NhomKNID"], 0);
                        DoiTuongKN.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return DoiTuongKN;
        }
        /*public List<CaNhanBiKNMOD> GetCaNhanBiKN(int DonThuID)
        {
            List<CaNhanBiKNMOD> DoiTuongBiKN = new List<CaNhanBiKNMOD>();
            SqlParameter[] parameters = new SqlParameter[] {
                new SqlParameter("DonThuID", SqlDbType.Int)
            };
            parameters[0].Value = DonThuID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "ID_GetCaNhanBiKN ", parameters))
                {
                    while (dr.Read())
                    {
                        CaNhanBiKNMOD item = new CaNhanBiKNMOD();
                        item.CaNhanBiKNID = Utils.GetInt32(dr["DoiTuongKNID"], 0);
                        item.ChucVuID = Utils.GetInt32(dr["ChucVuID"], 0);
                        item.DanTocID = Utils.GetInt32(dr["DanTocID"], 0);
                        item.QuocTichID = Utils.GetInt32(dr["QuocTichID"], 0);
                        item.NoiCongTac = Utils.GetString(dr["NoiCongTac"], string.Empty);
                        item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.NgheNghiep = Utils.GetString(dr["NgheNghiep"], string.Empty);


                        DoiTuongBiKN.Add(item);
                    }
                    dr.Close();
                }
            }
            catch (Exception)
            {
            }
            return DoiTuongBiKN;
        }*/

        public BaseResultModel GetDoiTuongBiKN1(int CaNhanBiKNID)
        {
            NhomDoiTuongBiKN item = new NhomDoiTuongBiKN();
            var Result = new BaseResultModel();
            Detail_AllIdTiepDan id = new Detail_AllIdTiepDan();
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("CaNhanBiKNID", SqlDbType.Int),
                
            };
            parameters[0].Value = CaNhanBiKNID;
            
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "NhomDoiTuongKN", parameters))
                {
                    while (dr.Read())
                    {
                        //NhomDoiTuongBiKN item = new NhomDoiTuongBiKN();
                        item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.TenDoiTuongBiKN = Utils.GetString(dr["DiaChiCT"], string.Empty);
                        item.TinhID = Utils.GetInt32(dr["TinhID"], 0);
                        item.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
                        item.XaID = Utils.GetInt32(dr["XaID"], 0);
                        item.LoaiDoiTuongBiKNID = Utils.GetInt32(dr["LoaiDoiTuongBiKNID"], 0);
                        item.CaNhanBiKNID = Utils.GetInt32(dr["CaNhanBiKNID"], 0);
                        item.ChucVuID = Utils.GetInt32(dr["ChucVuID"], 0);
                        item.DanTocID = Utils.GetInt32(dr["DanTocID"], 0);
                        item.QuocTichID = Utils.GetInt32(dr["QuocTichID"], 0);
                        item.NoiCongTac = Utils.GetString(dr["NoiCongTac"], string.Empty);
                        //item.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
                        item.NgheNghiep = Utils.GetString(dr["NgheNghiep"], string.Empty);
                        break;
                    }
                    dr.Close();
                }
                Result.Status = 1;
                Result.Data = id;
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = Constant.API_Error_System;
                Result.Message = ex.ToString();
            }
            return Result;
        }
    }
}
