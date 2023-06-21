using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.DAL.KNTC
{
    public class FileLogDAL
    {
        #region Database query string
        private const string INSERT = @"FileLog_Insert";
        #endregion

        #region paramaters constant
        private const string PARAM_FILEID = "@FileID";
        private const string PARAM_LOAILOG = "@LoaiLog";
        private const string PARAM_LOAIFILE = "@LoaiFile";
        private const string PARAM_ISMAHOA = "@IsMaHoa";
        private const string PARAM_ISBAOMAT = "@IsBaoMat";


        #endregion
        private SqlParameter[] GetInsertParms()
        {
            SqlParameter[] parms = new SqlParameter[]{
                new SqlParameter(PARAM_FILEID, SqlDbType.Int),
                new SqlParameter(PARAM_LOAILOG, SqlDbType.Int),
                new SqlParameter(PARAM_LOAIFILE, SqlDbType.Int),
                new SqlParameter(PARAM_ISMAHOA, SqlDbType.Int),
                new SqlParameter(PARAM_ISBAOMAT, SqlDbType.Int)
                };
            return parms;
        }

        private void SetInsertParms(SqlParameter[] parms, FileLogInfo DTInfo)
        {

            parms[0].Value = DTInfo.FileID;
            parms[1].Value = DTInfo.LoaiLog;
            parms[2].Value = DTInfo.LoaiFile;
            if (DTInfo.IsBaoMat == true)
            {
                parms[3].Value = 1;
                parms[4].Value = 1;
            }
            else
            {

                parms[3].Value = 0;
                parms[4].Value = 0;
            }


        }

        public int Insert(FileLogInfo DTInfo)
        {
            object val;

            SqlParameter[] parameters = GetInsertParms();
            SetInsertParms(parameters, DTInfo);

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
            return Utils.ConvertToInt32(val, 0);
        }
    }
}
