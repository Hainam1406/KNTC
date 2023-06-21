using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.KNTC
{
    public class DonThuChiTietModel
    {
        public DonThuInfo DonThu { get; set; }
        public DoiTuongKNInfo DoiTuongKN { get; set; }
        public DoiTuongBiKNJoinInfo DoiTuongBiKN { get; set; }
        public List<FileHoSoInfo> FileHoSo { get; set; }
        public List<TransitionHistoryInfo> TienTrinhXuLy { get; set; }

    }
}
