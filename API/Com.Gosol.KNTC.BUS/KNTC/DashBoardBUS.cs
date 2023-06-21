using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.XuLyDon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.BUS.KNTC
{
    public class DashBoardBUS
    {
        public DashBoardModel GetDuLieuDashBoard(DashBoardParams p)
        {
            return new DashBoardDAL().GetDuLieuDashBoard(p);
        }
        public List<CoQuanInfo> GetCoQuanByPhamViID(string PhamViID, int CapID, int TinhID, int HuyenID)
        {
            return new DashBoardDAL().GetCoQuanByPhamViID(PhamViID, CapID, TinhID, HuyenID);
        }
    }
}
