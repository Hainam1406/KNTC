using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.XuLyDon
{
    public class QL_EmailInfo
    {
        public int EmailID { get; set; }
        public DateTime NgayTao { get; set; }
        public string NoiDungEmail { get; set; }
        public Boolean Active { get; set; }
        public int LoaiEmailID { get; set; }
        public int CountTotal { get; set; }
        public string TenEmail { get; set; }
    }
}
