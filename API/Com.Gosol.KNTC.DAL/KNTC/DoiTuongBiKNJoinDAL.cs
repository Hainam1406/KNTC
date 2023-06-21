using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Gosol.KNTC.Models.KNTC;

namespace Com.Gosol.KNTC.DAL.KNTC
{
    public class DoiTuongBiKNJoinDAL
    {
        private const string GET_BY_ID_JOIN = @"DoiTuongBiKN_GetByIDJoin";

        //Ten cac bien dau vao
        private const string PARAM_DOITUONGBIKN_ID = "@DoiTuongBiKNID";

        private DoiTuongBiKNJoinInfo GetData(SqlDataReader dr)
        {
            DoiTuongBiKNJoinInfo info = new DoiTuongBiKNJoinInfo();
            info.DoiTuongBiKNID = Utils.GetInt32(dr["DoiTuongBiKNID"], 0);
            info.TenDoiTuongBiKN = Utils.GetString(dr["TenDoiTuongBiKN"], string.Empty);
            info.TinhID = Utils.GetInt32(dr["TinhID"], 0);
            info.HuyenID = Utils.GetInt32(dr["HuyenID"], 0);
            info.XaID = Utils.GetInt32(dr["XaID"], 0);
            info.DiaChiCT = Utils.GetString(dr["DiaChiCT"], string.Empty);
            info.LoaiDoiTuongBiKNID = Utils.GetInt32(dr["LoaiDoiTuongBiKNID"], 0);

            info.TenChucVu = Utils.GetString(dr["TenChucVu"].ToString(), string.Empty);
            info.TenDanToc = Utils.GetString(dr["TenDanToc"].ToString(), string.Empty);
            info.TenNgheNghiep = Utils.GetString(dr["TenNgheNghiep"].ToString(), string.Empty);
            return info;
        }

        public DoiTuongBiKNJoinInfo GetByID(int DTID)
        {

            DoiTuongBiKNJoinInfo info = null;
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter(PARAM_DOITUONGBIKN_ID,SqlDbType.Int)
            };
            parameters[0].Value = DTID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_BY_ID_JOIN, parameters))
                {

                    if (dr.Read())
                    {
                        info = GetData(dr);
                    }
                    dr.Close();
                }
            }
            catch
            {
            }
            return info;
        }
    }
}
