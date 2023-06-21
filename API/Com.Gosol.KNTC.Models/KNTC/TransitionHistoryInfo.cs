using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.KNTC
{
    public class TransitionHistoryInfo
    {

        public string BuocThucHien { get; set; }
        public DateTime ThoiGianThucHien { get; set; }
        public string ThoiGianThucHienStr { get; set; }
        public string CanBoThucHien { get; set; }
        public string YKienCanBo { get; set; }
        public string ThaoTac { get; set; }
        public DateTime DueDate { get; set; }
        public string DueDateStr { get; set; }
        public string TenCoQuan { get; set; }
    }
}
