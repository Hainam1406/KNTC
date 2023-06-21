using Com.Gosol.KNTC.DAL.BaoCao;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Ultilities;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System.Text.RegularExpressions;

namespace GO.API.Formats
{
    public class SoDonThuHelper
    {
        /*public static string GetSoDonThu(int coquanID)
        {
            string soDonThu = new TiepDanGianTiepDAL().GetSoDonThu(coquanID);
            string maCQ = string.Empty;

            if (coquanID == IdentityHelper.GetCoQuanID()) { maCQ = IdentityHelper.GetMaCoQuan(); }
            else
            {
                CoQuanInfo cqInfo = new CoQuan().GetCoQuanByID(coquanID);
                maCQ = cqInfo.MaCQ;
            }

            string numberPart = Regex.Replace(soDonThu.Replace(maCQ, ""), "[^0-9.]", "");
            int soDonMoi = Utils.ConvertToInt32(numberPart, 0) + 1;
            return maCQ + soDonMoi;
        }*/
    }
}
