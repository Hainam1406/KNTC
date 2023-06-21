using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Models.BaoCao
{
    public class BaoCaoModel
    {
        public string BieuSo { get; set; }
        public string ThongTinSoLieu { get; set; }
        public string TuNgay { get; set; }  
        public string DenNgay { get; set; }
        public string Title { get; set; }
        public DataTable DataTable { get; set; }
        public string DonViTinh { get; set; }
    }
    public class DataTable
    {
        public List<TableHeader> TableHeader { get; set; }
        public List<TableData> TableData { get; set; }
    }
    public class TableHeader
    {
        public int ID { get; set; }
        public int? ParentID { get; set; }
        public string Name { get; set; }
        public string Style { get; set; }
        public List<TableHeader> DataChild { get; set; }
        public TableHeader()
        {
          
        }
        public TableHeader(int ID, int? ParentID, string Name, string Style, ref List<TableHeader> TableHeader)
        {
            this.ID = ID;
            this.ParentID = ParentID;
            this.Name = Name;  
            this.Style = Style;
            TableHeader.Add(this);
        }
    }

    public class TableData
    {
        public int ID  { get; set; }
        public int? ParentID { get; set; }
        public List<RowItem> DataArr { get; set; }
        public List<TableData> DataChild { get; set; }
        public int? DonThuID { get; set; }
        public int? XuLyDonID { get; set; }
    }

    public class RowItem
    {
        public int ID { get; set; }
        public string Content  { get; set; }
        public string CoQuanID { get; set; }
        public string CapID { get; set; }
        public bool? isEdit { get; set; }
        public string Style { get; set; }
        public RowItem()
        {   

        }
        public RowItem(int ID, string Content, string CoQuanID, string CapID, bool? isEdit, string Style, ref List<RowItem> DataArr)
        {
            this.ID = ID;
            this.Content = Content; 
            this.CoQuanID = CoQuanID;
            this.CapID = CapID;
            this.isEdit = isEdit;
            this.Style = Style;
            DataArr.Add(this);
        }
    }
}
