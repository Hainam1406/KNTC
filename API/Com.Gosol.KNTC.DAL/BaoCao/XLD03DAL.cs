﻿using Com.Gosol.KNTC.DAL.HeThong;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.Models.BaoCao;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using DataTable = System.Data.DataTable;
using FileHoSoInfo = Com.Gosol.KNTC.Models.KNTC.FileHoSoInfo;
using TKDonThuInfo = Com.Gosol.KNTC.Models.BaoCao.TKDonThuInfo;

namespace Com.Gosol.KNTC.DAL.BaoCao
{
    public class XLD03DAL
    {
        public List<TableData> XLD03(List<int> listCapChonBaoCao, string ContentRootPath, int RoleID, int CapID, int CoQuanDangNhapID, int CanBoDangNhapID, int TinhDangNhapID, int HuyenDangNhapID, DateTime startDate, DateTime endDate)
        {
            List<TableData> data = new List<TableData>();
            DataTable dt = BaoCao2b_DataTable();

            if (startDate == DateTime.Now.Date && endDate == DateTime.Now.Date)
            {
                endDate = endDate.AddDays(1);
            }
            List<BaoCao2bInfo> resultList = new List<BaoCao2bInfo>();
            int capID = CapID;
            int tinhID = TinhDangNhapID;
            //List<CapInfo> capList = cblCap.Items;
            bool flag = true;
            bool flagCapXa = true;
            bool flagToanHuyen = true;
            if (capID == (int)CapQuanLy.CapUBNDTinh)
            {
                List<CapInfo> capList = new List<CapInfo>();
                foreach (int item in listCapChonBaoCao)
                {
                    CapInfo capInfo = new CapInfo();
                    capInfo.CapID = item;
                    capInfo.TenCap = Utils.GetTenCap(item);
                    if (capInfo.CapID == (int)CapQuanLy.CapUBNDHuyen || capInfo.CapID == (int)CapQuanLy.CapUBNDXa)
                    {
                        if (capList.Count == 0)
                        {
                            flag = false;
                        }
                        if (flagToanHuyen == true)
                        {
                            CapInfo capInfoToanHuyen = new CapInfo();
                            capInfoToanHuyen.CapID = (int)CapQuanLy.ToanHuyen;
                            capInfoToanHuyen.TenCap = "Toàn huyện";
                            capList.Add(capInfoToanHuyen);
                            flagToanHuyen = false;
                        }

                    }
                    if (flagCapXa == true && capInfo.CapID == (int)CapQuanLy.CapUBNDXa)
                    {
                        CapInfo capInfoXa = new CapInfo();
                        capInfoXa.CapID = (int)CapQuanLy.CapUBNDXa;
                        capInfoXa.TenCap = "UBND Cấp Xã";
                        capList.Add(capInfoXa);
                    }
                    else
                    {
                        capList.Add(capInfo);
                    }
                }
                string capToanTinh = string.Empty;
                foreach (CapInfo capInfo in capList)
                {
                    capToanTinh = capToanTinh + capInfo.CapID + "*";
                }

                CalculateBaoCaoCapTinh(ContentRootPath, RoleID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, ref resultList, startDate, endDate, capList, flag, tinhID, ref dt);
            }
            else if (capID == (int)CapQuanLy.CapTrungUong)
            {
                //neu la cap trung uong, xem bao cao theo tinh
                CalculateBaoCaoCapTrungUong(ref resultList, startDate, endDate);
            }
            else if (capID == (int)CapQuanLy.CapUBNDHuyen)
            {
                CalculateBaoCaoCapHuyen(ContentRootPath, RoleID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, HuyenDangNhapID, ref resultList, startDate, endDate, tinhID, ref dt);
            }
            else if (capID == (int)CapQuanLy.CapSoNganh)
            {
                var listThanhTraTinh = new SystemConfigDAL().GetByKey("Thanh_Tra_Tinh_ID").ConfigValue.Split(',').ToList().Select(x => Utils.ConvertToInt32(x.ToString(), 0)).ToList();
                if (listThanhTraTinh.Contains(CoQuanDangNhapID) && RoleID == (int)EnumChucVu.LanhDao)
                {
                    List<CapInfo> capList = new List<CapInfo>();
                    foreach (int item in listCapChonBaoCao)
                    {
                        CapInfo capInfo = new CapInfo();
                        capInfo.CapID = item;
                        capInfo.TenCap = Utils.GetTenCap(item);
                        if (capInfo.CapID == (int)CapQuanLy.CapUBNDHuyen)
                        {
                            if (capList.Count == 0)
                            {
                                flag = false;
                            }
                            CapInfo capInfoToanHuyen = new CapInfo();
                            capInfoToanHuyen.CapID = (int)CapQuanLy.ToanHuyen;
                            capInfoToanHuyen.TenCap = "Toàn huyện";
                            capList.Add(capInfoToanHuyen);
                            flagCapXa = false;
                        }
                        if (flagCapXa == false && capInfo.CapID == (int)CapQuanLy.CapUBNDXa)
                        {

                        }
                        else
                        {
                            capList.Add(capInfo);
                        }
                        if (flagCapXa == false)
                        {
                            if (capInfo.CapID != (int)CapQuanLy.CapUBNDXa)
                            {
                                CapInfo capInfoXa = new CapInfo();
                                capInfoXa.CapID = (int)CapQuanLy.CapUBNDXa;
                                capInfoXa.TenCap = "UBND Cấp Xã";
                                capList.Add(capInfoXa);
                            }
                        }
                    }
                    string capToanTinh = string.Empty;
                    foreach (CapInfo capInfo in capList)
                    {
                        capToanTinh = capToanTinh + capInfo.CapID + "*";
                    }

                    CalculateBaoCaoCapTinh(ContentRootPath, RoleID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, ref resultList, startDate, endDate, capList, flag, tinhID, ref dt);
                }
                else
                {
                    CalculateBaoCaoCapSo(ContentRootPath, RoleID, CoQuanDangNhapID, CanBoDangNhapID, TinhDangNhapID, ref resultList, startDate, endDate, ref dt);
                }

            }
            else if (capID == (int)CapQuanLy.CapUBNDXa || capID == (int)CapQuanLy.CapPhong)
            {
                CalculateBaoCaoCapXa(ContentRootPath, CoQuanDangNhapID, CanBoDangNhapID, ref resultList, startDate, endDate, ref dt);
            }

            int stt = 1;
            foreach (DataRow dro in dt.Rows)
            {
                TableData tableData = new TableData();
                tableData.ID = stt++;
                var DataArr = new List<RowItem>();

                int col2 = Utils.ConvertToInt32(dro["Col2Data"], 0);
                int col3 = Utils.ConvertToInt32(dro["Col3Data"], 0);
                int col4 = Utils.ConvertToInt32(dro["Col4Data"], 0);
                int col5 = Utils.ConvertToInt32(dro["Col5Data"], 0);
                int col7 = Utils.ConvertToInt32(dro["Col7Data"], 0);
                int col8 = Utils.ConvertToInt32(dro["Col8Data"], 0);
                int col13 = Utils.ConvertToInt32(dro["Col11Data"], 0);
                int col18 = Utils.ConvertToInt32(dro["Col15Data"], 0);
                int col19 = Utils.ConvertToInt32(dro["Col16Data"], 0);
                int col20 = Utils.ConvertToInt32(dro["Col17Data"], 0);
                int col21 = Utils.ConvertToInt32(dro["Col24Data"], 0);

                int col27 = Utils.ConvertToInt32(dro["Col27Data"], 0);
                int col28 = Utils.ConvertToInt32(dro["Col28Data"], 0);
                int col30 = Utils.ConvertToInt32(dro["Col30Data"], 0);
                int col31 = Utils.ConvertToInt32(dro["Col31Data"], 0);
                int col32 = Utils.ConvertToInt32(dro["Col32Data"], 0);


                int col1 = col2 + col3 + col4 + col5;
                int col12 = col13 + col18 + col19 + col20 + col21;
                int col26 = col27 + col28;
                int col29 = col30 + col31 + col32;

                int RowItem_CapID = Utils.ConvertToInt32(dro["CapID"], 0);
                string Css = "";
                if (RowItem_CapID == CapCoQuanViewChiTiet.ToanTinh.GetHashCode() || RowItem_CapID == CapCoQuanViewChiTiet.CapUBNDTinh.GetHashCode()
                    || RowItem_CapID == CapCoQuanViewChiTiet.ToanHuyen.GetHashCode() || RowItem_CapID == CapCoQuanViewChiTiet.CapSoNganh.GetHashCode()
                    || RowItem_CapID == CapCoQuanViewChiTiet.CapUBNDHuyen.GetHashCode() || RowItem_CapID == CapCoQuanViewChiTiet.CapUBNDXa.GetHashCode())
                {
                    Css = "font-weight: bold;";
                }

                RowItem RowItem1 = new RowItem(1, dro["TenCoQuan"].ToString(), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, dro["CssClass"].ToString(), ref DataArr);
                RowItem RowItem2 = new RowItem(2, Utils.AddCommas(col1), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem3 = new RowItem(3, Utils.AddCommas(dro["Col2Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem4 = new RowItem(4, Utils.AddCommas(dro["Col3Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem5 = new RowItem(5, Utils.AddCommas(dro["Col4Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem6 = new RowItem(6, Utils.AddCommas(dro["Col5Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem7 = new RowItem(7, Utils.AddCommas(dro["Col6Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem8 = new RowItem(8, Utils.AddCommas(dro["Col7Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem9 = new RowItem(9, Utils.AddCommas(dro["Col8Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem10 = new RowItem(10, Utils.AddCommas(dro["Col9Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem11 = new RowItem(11, Utils.AddCommas(dro["Col10Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem12 = new RowItem(12, Utils.AddCommas(dro["Col11Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem13 = new RowItem(13, Utils.AddCommas(col12), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem14 = new RowItem(14, Utils.AddCommas(dro["Col13Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem15 = new RowItem(15, Utils.AddCommas(dro["Col14Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem16 = new RowItem(16, Utils.AddCommas(dro["Col15Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem17 = new RowItem(17, Utils.AddCommas(dro["Col16Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem18 = new RowItem(18, Utils.AddCommas(dro["Col17Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem19 = new RowItem(19, Utils.AddCommas(dro["Col18Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem20 = new RowItem(20, Utils.AddCommas(dro["Col19Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem21 = new RowItem(21, Utils.AddCommas(dro["Col20Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem22 = new RowItem(22, Utils.AddCommas(dro["Col21Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem23 = new RowItem(23, Utils.AddCommas(dro["Col22Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem24 = new RowItem(24, Utils.AddCommas(dro["Col23Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem25 = new RowItem(25, Utils.AddCommas(dro["Col24Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem26 = new RowItem(26, Utils.AddCommas(dro["Col25Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem27 = new RowItem(27, Utils.AddCommas(col26), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem28 = new RowItem(28, Utils.AddCommas(dro["Col27Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem29 = new RowItem(29, Utils.AddCommas(col29), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem30 = new RowItem(30, Utils.AddCommas(dro["Col29Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem31 = new RowItem(31, Utils.AddCommas(dro["Col30Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem32 = new RowItem(32, Utils.AddCommas(dro["Col31Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem33 = new RowItem(33, Utils.AddCommas(dro["Col32Data"].ToString()), dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);
                RowItem RowItem34 = new RowItem(34, "", dro["CoQuanID"].ToString(), dro["CapID"].ToString(), null, "text-align: center;" + Css, ref DataArr);


                tableData.DataArr = DataArr;
                data.Add(tableData);
            }

            return data;
        }

        public void CalculateBaoCaoCapTinh(string ContentRootPath, int RoleID, int CoQuanDangNhapID, int CanBoDangNhapID, int TinhDangNhapID, ref List<BaoCao2bInfo> resultList, DateTime startDate, DateTime endDate, List<CapInfo> capList, bool flag, int tinhID, ref DataTable dt)
        {
            //BaoCao2b1();
            //BaoCao2bInfo bcInfo = new BaoCao2bInfo();
            List<int> ListCapID = new List<int>();
            capList.ForEach(x => ListCapID.Add(x.CapID));
            int CoQuanChaID = 0;
            //foreach (CapInfo capInfo in capList)
            //{
            //BaoCao2bInfo bc2bInfo = new BaoCao2bInfo();
            //BaoCao2bInfo bc2bInfoToanHuyen = new BaoCao2bInfo();
            if (capList.Count > 0)
            {
                List<CoQuanInfo> cqList = new List<CoQuanInfo>();

                if (RoleID == (int)EnumChucVu.LanhDao)
                {
                    var CoQuanChaPhuHop = new CoQuan().GetCoQuanByTinhID_New(TinhDangNhapID);
                    if (ListCapID.Contains(CapQuanLy.CapUBNDHuyen.GetHashCode()))
                    {

                        var cqList1 = new CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).ToList().Where(x => (ListCapID.Contains(x.CapID) || x.CapID == (int)CapQuanLy.CapPhong))
                     .ToList();
                        var cqList2 = cqList1.Where(x => x.CapID == CapQuanLy.CapUBNDHuyen.GetHashCode()).ToList();
                        cqList.AddRange(cqList2.Where(x => new CoQuan().GetAllCapCon(x.CoQuanID).ToList().Where(y => y.SuDungPM == true).ToList().Count > 0).Select(x => x));
                        cqList.AddRange(cqList1.Where(x => (x.CapID != (int)CapQuanLy.CapUBNDHuyen) && x.SuDungPM == true).Select(x => x));
                    }
                    else
                    {
                        cqList = new CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).ToList().Where(x => ListCapID.Contains(x.CapID) && x.SuDungPM == true)
                      .ToList();
                    }
                    CoQuanChaID = CoQuanChaPhuHop.CoQuanID;
                }
                else
                {
                    //if (IdentityHelper.GetCapID() == (int)CapQuanLy.CapUBNDHuyen)
                    //{
                    //    var CoQuanChaPhuHop = new DAL.CoQuan().GetCoQuanByTinhID_New(tinhID);
                    //    cqList = new DAL.CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).Where(x => x.CapID == (int)CapQuanLy.CapUBNDHuyen ||
                    //        x.CapID == (int)CapQuanLy.CapPhong).ToList();
                    //}
                    //else
                    //{
                    cqList = new List<CoQuanInfo> { new CoQuan().GetCoQuanByID(CoQuanDangNhapID) };
                    cqList = cqList.Where(x => x.SuDungPM == true).ToList();
                    //}
                    //cqList = new List<CoQuanInfo> { new DAL.CoQuan().GetCoQuanByID(CoQuanDangNhapID) };
                    //cqList = cqList.Where(x => ListCapID.Contains(x.CapID)).ToList();
                }
                if (cqList.Count > 0)
                {

                    //var ListSystemLog = GetAllSystemLogFromTo(TuNgay, DenNgay);
                    //dt.AsEnumerable();

                    string filename = ContentRootPath + "/Upload/" + CanBoDangNhapID + "_CoQuan.xml";
                    if (File.Exists(filename))
                    {
                        File.Delete(filename);
                    }
                    using (FileStream file = System.IO.File.Create(filename))
                    {

                    }
                    XDocument doc = new XDocument();
                    doc =
                                       new XDocument(
                                       new XElement("LogConfig", cqList.Select(x =>
                      new XElement("SystemLog", new XElement("CoQuan", new XAttribute("CoQuanID", x.CoQuanID),
                                     new XAttribute("CapID", x.CapID), new XAttribute("CoQuanChaID", x.CoQuanChaID),
                                     new XAttribute("SuDungPM", x.SuDungPM))))));

                    doc.Save(filename);
                    var pList = new SqlParameter("@ListCoQuanID", SqlDbType.Structured);
                    pList.TypeName = "dbo.IntList";
                    var tbCoQuanID = new DataTable();
                    tbCoQuanID.Columns.Add("CoQuanID", typeof(string));
                    cqList.ForEach(x => tbCoQuanID.Rows.Add(x.CoQuanID));
                    //
                    var pListCon = new SqlParameter("@ListCoQuanConID", SqlDbType.Structured);
                    pListCon.TypeName = "dbo.OneID";
                    var tbCoQuanConID = new DataTable();
                    tbCoQuanConID.Columns.Add("CoQuanID", typeof(string));
                    //cqList.ForEach(x => tbCoQuanID.Rows.Add(x.CoQuanID));

                    //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
                    SqlParameter[] parm = new SqlParameter[] {
                        new SqlParameter("@StartDate", SqlDbType.DateTime),
                        new SqlParameter("@EndDate", SqlDbType.DateTime),
                        pList,
                        new SqlParameter("@Flag", SqlDbType.Int),
                           new SqlParameter("@CoQuanChaID", SqlDbType.Int)
            };
                    parm[0].Value = startDate;
                    parm[1].Value = endDate;
                    parm[2].Value = tbCoQuanID;
                    parm[3].Value = 1;
                    parm[4].Value = CoQuanChaID;
                    try
                    {
                        using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_GetDonThu_1606", parm))
                        {
                            dt.Load(dr);
                            //string filename = HttpContext.Current.Server.MapPath("~/Upload/" + "Test6.xml");
                            ////Directory.CreateDirectory(filename);
                            //using (FileStream file = System.IO.File.Create(filename))
                            //{

                            //}
                            //           DataSet ds = new DataSet();
                            //           ds.Tables.Add(dt);
                            //               //ds.WriteXml(filename, XmlWriteMode.WriteSchema);
                            //           XDocument doc = new XDocument();
                            //           //var ListSystemLog = GetAllSystemLogFromTo(TuNgay, DenNgay);
                            //           //dt.AsEnumerable();
                            //           doc =
                            //                 new XDocument(
                            //                 new XElement("LogConfig", dt.AsEnumerable().Select(x =>
                            //new XElement("SystemLog", new XElement("ha" +  x.Field<string>("RowCount_New").ToString(), new XElement("CoQuanID", x.Field<string>("CoQuanID")),
                            //               new XElement("TenCoQuan", x.Field<string>("CapID")))))));

                            //           doc.Save(filename);
                            //           XmlDocument xd = new XmlDocument();
                            //           xd.Load(filename);
                            //           XmlNode root = xd.DocumentElement;
                            //           XmlNodeList nodeList = root.SelectNodes("/LogConfig/SystemLog");

                            //foreach (XmlNode node in nodeList) // for each <testcase> node
                            //{
                            //    //CommonLib.TestCase tc = new CommonLib.TestCase();
                            //    BaoCao2bInfo bc = new BaoCao2bInfo();
                            //    bc.CoQuanID = int.Parse(node["CoQuanID"].InnerText);
                            //    bc.DonVi = node["TenCoQuan"].InnerText;
                            //    resultList.Add(bc);
                            //}
                        }
                    }
                    catch (Exception e)
                    {
                        throw;
                    }

                }
            }


            #region Cong so lieu tong

            #endregion   /// Caa   /// Cần sửa
            //}

            if (flag == true)
            {

                DataRow dr = dt.NewRow();
                //dr["TenCoQuan"] = "<b style='text-transform: uppercase'>Toàn tỉnh</b>";
                //dr["CssClass"] = "highlight";
                dr["TenCoQuan"] = "Toàn tỉnh";
                dr["CssClass"] = "font-weight:bold;text-transform: uppercase";
                dr["CapID"] = CapCoQuanViewChiTiet.ToanTinh.GetHashCode();
                dr["ThuTu"] = 5;
                dr["CoQuanID"] = 0;
                foreach (DataRow dro in dt.Rows)
                {
                    for (var i = 1; i <= 32; i++)
                    {
                        if (dro["Col" + i + "Data"] == null)
                        {
                            dro["Col" + i + "Data"] = 0;

                        }
                        dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                            Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                    }
                }
                dt.Rows.Add(dr);
            }
            foreach (CapInfo capInfo in capList)
            {
                if (capInfo.CapID == (int)CapQuanLy.CapUBNDTinh)
                {
                    DataRow dr = dt.NewRow();
                    dr["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "UBND Cấp Tỉnh" + "</b>";
                    dr["CssClass"] = "highlight";
                    dr["CapID"] = CapCoQuanViewChiTiet.CapUBNDTinh.GetHashCode();
                    dr["ThuTu"] = 4.5;
                    dr["CoQuanID"] = 0;
                    //DataTable dtnew = BaoCao2b_DataTable_New();
                    foreach (DataRow dro in dt.Rows)
                    {
                        if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDTinh)
                        {
                            for (var i = 1; i <= 32; i++)
                            {
                                if (dro["Col" + i + "Data"] == null)
                                {
                                    dro["Col" + i + "Data"] = 0;

                                }
                                dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                                    Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                            }

                        }
                    }
                    dt.Rows.Add(dr);
                }
                if (capInfo.CapID == (int)CapQuanLy.ToanHuyen)
                {
                    DataRow dr = dt.NewRow();
                    dr["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "Toàn huyện" + "</b>";
                    dr["CssClass"] = "highlight";
                    dr["CapID"] = CapCoQuanViewChiTiet.ToanHuyen.GetHashCode();
                    dr["ThuTu"] = 2.75;
                    dr["CoQuanID"] = 0;
                    //DataTable dtnew = BaoCao2b_DataTable_New();
                    foreach (DataRow dro in dt.Rows)
                    {
                        if (/*/*Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDTinh ||*/ /*Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapSoNganh*/
                           /*|*/ Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDHuyen || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDXa
                            || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.ToanHuyen)
                        {
                            for (var i = 1; i <= 32; i++)
                            {

                                if (dro["Col" + i + "Data"] == null)
                                {
                                    dro["Col" + i + "Data"] = 0;

                                }
                                dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                                    Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                            }

                        }
                    }
                    dt.Rows.Add(dr);
                }
                else if (capInfo.CapID == (int)CapQuanLy.CapSoNganh)
                {
                    DataRow dr = dt.NewRow();
                    dr["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "Cấp Sở,Ngành" + "</b>";
                    dr["CssClass"] = "highlight";
                    dr["CapID"] = CapCoQuanViewChiTiet.CapSoNganh.GetHashCode();
                    dr["ThuTu"] = 3.5;
                    dr["CoQuanID"] = 0;
                    //DataTable dtnew = BaoCao2b_DataTable_New();
                    foreach (DataRow dro in dt.Rows)
                    {
                        if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapSoNganh)
                        {
                            for (var i = 1; i <= 32; i++)
                            {
                                if (dro["Col" + i + "Data"] == null)
                                {
                                    dro["Col" + i + "Data"] = 0;

                                }
                                dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                                    Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                            }

                        }
                    }
                    dt.Rows.Add(dr);
                }
                else if (capInfo.CapID == (int)CapQuanLy.CapUBNDHuyen)
                {
                    DataRow dr = dt.NewRow();
                    dr["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "UBND Cấp Huyện" + "</b>";
                    dr["CssClass"] = "highlight";
                    dr["CapID"] = CapCoQuanViewChiTiet.CapUBNDHuyen.GetHashCode();
                    dr["ThuTu"] = 2.5;
                    dr["CoQuanID"] = 0;
                    //DataTable dtnew = BaoCao2b_DataTable_New();
                    foreach (DataRow dro in dt.Rows)
                    {
                        if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDHuyen)
                        {
                            for (var i = 1; i <= 32; i++)
                            {
                                if (dro["Col" + i + "Data"] == null)
                                {
                                    dro["Col" + i + "Data"] = 0;

                                }
                                dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                                    Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                            }

                        }
                    }
                    dt.Rows.Add(dr);
                }
                else if (capInfo.CapID == (int)CapQuanLy.CapUBNDXa)
                {
                    DataRow dr = dt.NewRow();
                    dr["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "UBND Cấp Xã" + "</b>";
                    dr["CssClass"] = "highlight";
                    dr["CapID"] = CapCoQuanViewChiTiet.CapUBNDXa.GetHashCode();
                    dr["ThuTu"] = 1.5;
                    dr["CoQuanID"] = 0;
                    //DataTable dtnew = BaoCao2b_DataTable_New();
                    foreach (DataRow dro in dt.Rows)
                    {
                        if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDXa)
                        {
                            for (var i = 1; i <= 32; i++)
                            {
                                if (dro["Col" + i + "Data"] == null)
                                {
                                    dro["Col" + i + "Data"] = 0;
                                }
                                dr["Col" + i + "Data"] = Utils.ConvertToInt32(dr["Col" + i + "Data"], 0) +
                                    Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                            }

                        }
                    }
                    dt.Rows.Add(dr);
                }
            }
            dt.DefaultView.Sort = "ThuTu desc";
            dt = dt.DefaultView.ToTable();
        }

        public void CalculateBaoCaoCapSo(string ContentRootPath, int RoleID, int CoQuanDangNhapID, int CanBoDangNhapID, int TinhDangNhapID, ref List<BaoCao2bInfo> resultList, DateTime startDate, DateTime endDate, ref DataTable dt)
        {
            int? CoQuanChaID = 0;
            //CoQuanInfo cqInfo = new DAL.CoQuan().GetCoQuanByID(CoQuanDangNhapID);
            //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
            //bc2bInfo2.DonVi = cqInfo.TenCoQuan;
            //bc2bInfo2.CapID = (int)CapQuanLy.CapSoNganh;
            //Lay tat ca don thu trong nam, bao gom ca don ki truoc + ki nay
            DateTime firstDay = Season.GetFirstDayOfYear(startDate.Year);
            List<CoQuanInfo> cqList = new List<CoQuanInfo>();
            //26/08/2018 Sửa firstDay --> startDate
            var pList = new SqlParameter("@ListCoQuanID", SqlDbType.Structured);
            pList.TypeName = "dbo.IntList";
            var tbCoQuanID = new DataTable();
            tbCoQuanID.Columns.Add("CoQuanID", typeof(string));
            //List<BaoCao2bDonThuInfo> dtList = new DAL.BaoCao2b().GetDonThu(startDate, endDate, cqInfo.CoQuanID).ToList();
            var listThanhTraTinh = new SystemConfigDAL().GetByKey("Thanh_Tra_Tinh_ID").ConfigValue.Split(',').ToList().Select(x => Utils.ConvertToInt32(x.ToString(), 0)).ToList();
            if (listThanhTraTinh.Contains(CoQuanDangNhapID) && RoleID == (int)EnumChucVu.LanhDao)
            {
                var CoQuanChaPhuHop = new CoQuan().GetCoQuanByTinhID_New(TinhDangNhapID);
                var ListCoQuan = new CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).Where(x => x.SuDungPM == true).ToList();
                ListCoQuan.Where(x => x.SuDungPM == true).ToList();
                ListCoQuan.ForEach(x => tbCoQuanID.Rows.Add(x.CoQuanID));
                cqList = ListCoQuan;
            }
            else
            {
                tbCoQuanID.Rows.Add(CoQuanDangNhapID);
                cqList = new List<CoQuanInfo> { new CoQuan().GetCoQuanByID(CoQuanDangNhapID) };
            }
            string filename = ContentRootPath + "/Upload/" + CanBoDangNhapID + "_CoQuan.xml";
            if (File.Exists(filename))
            {
                File.Delete(filename);
            }
            using (FileStream file = System.IO.File.Create(filename))
            {

            }
            XDocument doc = new XDocument();
            doc =
                               new XDocument(
                               new XElement("LogConfig", cqList.Select(x =>
              new XElement("SystemLog", new XElement("CoQuan", new XAttribute("CoQuanID", x.CoQuanID),
                             new XAttribute("CapID", x.CapID), new XAttribute("CoQuanChaID", x.CoQuanChaID),
                             new XAttribute("SuDungPM", x.SuDungPM))))));

            doc.Save(filename);
            //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
            SqlParameter[] parm = new SqlParameter[] {
                        new SqlParameter("@StartDate", SqlDbType.DateTime),
                        new SqlParameter("@EndDate", SqlDbType.DateTime),
                        pList,
                        new SqlParameter("@Flag", SqlDbType.Int),
                         new SqlParameter("@CoQuanChaID", SqlDbType.Int)
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = tbCoQuanID;
            parm[3].Value = 1;
            parm[4].Value = CoQuanChaID ?? Convert.DBNull;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_GetDonThu_1606", parm))
                {
                    dt.Load(dr);
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void CalculateBaoCaoCapHuyen(string ContentRootPath, int RoleID, int CoQuanDangNhapID, int CanBoDangNhapID, int TinhDangNhapID, int HuyenDangNhapID, ref List<BaoCao2bInfo> resultList, DateTime startDate, DateTime endDate, int tinhID, ref DataTable dt)
        {
            int CoQuanChaID = 0;
            List<CoQuanInfo> cqHuyenList = new List<CoQuanInfo>();
            if (RoleID == (int)EnumChucVu.LanhDao)
            {
                var CoQuanTinh = new CoQuan().GetCoQuanByTinhID_New(TinhDangNhapID);
                var CoQuanChaPhuHop = new CoQuan().GetCoQuanByHuyenID_New(HuyenDangNhapID, TinhDangNhapID, CoQuanTinh.CoQuanID);
                cqHuyenList = new CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).ToList();
                cqHuyenList = cqHuyenList.Where(x => x.SuDungPM == true).ToList();
                CoQuanChaID = CoQuanChaPhuHop.CoQuanID;
            }
            else
            {
                var CoQuanTinh = new CoQuan().GetCoQuanByTinhID_New(TinhDangNhapID);
                var CoQuanChaPhuHop = new CoQuan().GetCoQuanByHuyenID_New(HuyenDangNhapID, TinhDangNhapID, CoQuanTinh.CoQuanID);
                cqHuyenList = new CoQuan().GetAllCapCon(CoQuanChaPhuHop.CoQuanID).Where(x => (x.CapID == CapQuanLy.CapUBNDHuyen.GetHashCode()
                 || x.CapID == CapQuanLy.CapPhong.GetHashCode())).ToList();
                cqHuyenList = cqHuyenList.Where(x => x.SuDungPM == true).ToList();
            }
            string filename = ContentRootPath + "/Upload/" + CanBoDangNhapID + "_CoQuan.xml";
            if (File.Exists(filename))
            {
                File.Delete(filename);
            }
            using (FileStream file = System.IO.File.Create(filename))
            {

            }
            XDocument doc = new XDocument();
            doc =
                               new XDocument(
                               new XElement("LogConfig", cqHuyenList.Select(x =>
              new XElement("SystemLog", new XElement("CoQuan", new XAttribute("CoQuanID", x.CoQuanID),
                             new XAttribute("CapID", x.CapID), new XAttribute("CoQuanChaID", x.CoQuanChaID),
                             new XAttribute("SuDungPM", x.SuDungPM))))));

            doc.Save(filename);
            var pList = new SqlParameter("@ListCoQuanID", SqlDbType.Structured);
            pList.TypeName = "dbo.IntList";
            var tbCoQuanID = new DataTable();
            tbCoQuanID.Columns.Add("CoQuanID", typeof(string));
            cqHuyenList.ForEach(x => tbCoQuanID.Rows.Add(x.CoQuanID));
            //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
            SqlParameter[] parm = new SqlParameter[] {
                        new SqlParameter("@StartDate", SqlDbType.DateTime),
                        new SqlParameter("@EndDate", SqlDbType.DateTime),
                        pList,
                        new SqlParameter("@Flag", SqlDbType.Int),
                           new SqlParameter("@CoQuanChaID", SqlDbType.Int)
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = tbCoQuanID;
            parm[3].Value = 0;
            parm[4].Value = CoQuanChaID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_GetDonThu_1606", parm))
                {
                    dt.Load(dr);
                }

            }
            catch (Exception e)
            {
                throw e;
            }

            // Toàn huyện
            DataRow dr1 = dt.NewRow();
            dr1["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "Toàn huyện" + "</b>";
            dr1["CssClass"] = "highlight";
            dr1["CapID"] = (int)CapCoQuanViewChiTiet.ToanHuyen;
            dr1["ThuTu"] = 2.75;
            dr1["CoQuanID"] = HuyenDangNhapID;
            //DataTable dtnew = BaoCao2b_DataTable_New();
            foreach (DataRow dro in dt.Rows)
            {
                if (/*/*Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDTinh ||*/ /*Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapSoNganh*/
                   /*|*/ Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDHuyen || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDXa
                    || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.ToanHuyen || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapPhong)
                {
                    for (var i = 1; i <= 32; i++)
                    {

                        if (dro["Col" + i + "Data"] == null)
                        {
                            dro["Col" + i + "Data"] = 0;

                        }
                        dr1["Col" + i + "Data"] = Utils.ConvertToInt32(dr1["Col" + i + "Data"], 0) +
                            Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                    }

                }
            }
            dt.Rows.Add(dr1);
            // UBND Huyện
            dr1 = dt.NewRow();
            dr1["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "UBND Cấp Huyện" + "</b>";
            dr1["CssClass"] = "highlight";
            dr1["CapID"] = (int)CapCoQuanViewChiTiet.CapUBNDHuyen;
            dr1["ThuTu"] = 2.5;
            dr1["CoQuanID"] = 0;
            //DataTable dtnew = BaoCao2b_DataTable_New();
            foreach (DataRow dro in dt.Rows)
            {
                if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDHuyen || Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapPhong)
                {
                    for (var i = 1; i <= 32; i++)
                    {
                        if (dro["Col" + i + "Data"] == null)
                        {
                            dro["Col" + i + "Data"] = 0;

                        }
                        dr1["Col" + i + "Data"] = Utils.ConvertToInt32(dr1["Col" + i + "Data"], 0) +
                                Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                    }

                }
            }
            dt.Rows.Add(dr1);
            dr1 = dt.NewRow();
            dr1["TenCoQuan"] = "<b style='text-transform: uppercase'>" + "UBND Cấp Xã" + "</b>";
            dr1["CssClass"] = "highlight";
            dr1["CapID"] = (int)CapCoQuanViewChiTiet.CapUBNDXa;
            dr1["ThuTu"] = 1.5;
            dr1["CoQuanID"] = 0;
            //DataTable dtnew = BaoCao2b_DataTable_New();
            foreach (DataRow dro in dt.Rows)
            {
                if (Utils.ConvertToInt32(dro["CapID"], 0) == (int)CapQuanLy.CapUBNDXa)
                {
                    for (var i = 1; i <= 32; i++)
                    {
                        if (dro["Col" + i + "Data"] == null)
                        {
                            dro["Col" + i + "Data"] = 0;

                        }
                        dr1["Col" + i + "Data"] = Utils.ConvertToInt32(dr1["Col" + i + "Data"], 0) +
                                Utils.ConvertToInt32(dro["Col" + i + "Data"], 0);
                    }

                }
            }
            dt.Rows.Add(dr1);

            dt.DefaultView.Sort = "ThuTu desc";
            dt = dt.DefaultView.ToTable();
        }

        public void CalculateBaoCaoCapXa(string ContentRootPath, int CoQuanDangNhapID, int CanBoDangNhapID, ref List<BaoCao2bInfo> resultList, DateTime startDate, DateTime endDate, ref DataTable dt)
        {
            //CoQuanInfo cqInfo = new DAL.CoQuan().GetCoQuanByID(CoQuanDangNhapID);
            List<CoQuanInfo> cqList = new List<CoQuanInfo>();
            //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
            //bc2bInfo2.DonVi = cqInfo.TenCoQuan;
            //bc2bInfo2.CoQuanID = CoQuanDangNhapID;
            //bc2bInfo2.IsCoQuan = true;
            //Lay tat ca don thu trong nam, bao gom ca don ki truoc + ki nay
            DateTime firstDay = Season.GetFirstDayOfYear(startDate.Year);
            //26/08/2018 Sửa firstDay --> startDate
            //List<BaoCao2bDonThuInfo> dtList = new DAL.BaoCao2b().GetDonThu(startDate, endDate, cqInfo.CoQuanID).ToList();
            var pList = new SqlParameter("@ListCoQuanID", SqlDbType.Structured);
            pList.TypeName = "dbo.IntList";
            var tbCoQuanID = new DataTable();
            tbCoQuanID.Columns.Add("CoQuanID", typeof(string));
            tbCoQuanID.Rows.Add(CoQuanDangNhapID);
            cqList = new List<CoQuanInfo> { new CoQuan().GetCoQuanByID(CoQuanDangNhapID) };
            cqList = cqList.Where(x => x.SuDungPM == true).ToList();
            string filename = ContentRootPath + "/Upload/" + CanBoDangNhapID + "_CoQuan.xml";
            if (File.Exists(filename))
            {
                File.Delete(filename);
            }
            using (FileStream file = System.IO.File.Create(filename))
            {

            }
            XDocument doc = new XDocument();
            doc =
                               new XDocument(
                               new XElement("LogConfig", cqList.Select(x =>
              new XElement("SystemLog", new XElement("CoQuan", new XAttribute("CoQuanID", x.CoQuanID),
                             new XAttribute("CapID", x.CapID), new XAttribute("CoQuanChaID", x.CoQuanChaID),
                              new XAttribute("SuDungPM", x.SuDungPM))))));

            doc.Save(filename);
            //BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
            SqlParameter[] parm = new SqlParameter[] {
                        new SqlParameter("@StartDate", SqlDbType.DateTime),
                        new SqlParameter("@EndDate", SqlDbType.DateTime),
                        pList,
                         new SqlParameter("@Flag", SqlDbType.Int),
                          new SqlParameter("@CoQuanChaID", SqlDbType.Int)
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = tbCoQuanID;
            parm[3].Value = 0;
            parm[4].Value = 1;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_GetDonThu_1606", parm))
                {
                    dt.Load(dr);
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void CalculateBaoCaoCapTrungUong(ref List<BaoCao2bInfo> resultList, DateTime startDate, DateTime endDate)
        {
            //BaoCao2bInfo bcInfo = new BaoCao2bInfo();
            List<CapInfo> capList = new CapDAL().GetAll().ToList();
            foreach (CapInfo capInfo in capList)
            {
                if (capInfo.CapID == (int)CapQuanLy.CapUBNDTinh)
                {
                    BaoCao2bInfo bc2bInfo = new BaoCao2bInfo();
                    bc2bInfo.DonVi = "<b style='text-transform: uppercase'>" + capInfo.TenCap + "</b>";
                    bc2bInfo.CssClass = "highlight";
                    resultList.Add(bc2bInfo);
                    List<CoQuanInfo> cqList = new CoQuan().GetCoQuanByCap(capInfo.CapID).ToList();
                    if (cqList.Count > 0)
                    {
                        foreach (CoQuanInfo cqInfo in cqList)
                        {

                            BaoCao2bInfo bc2bInfo2 = new BaoCao2bInfo();
                            bc2bInfo2.DonVi = cqInfo.TenCoQuan;

                            //Lay tat ca don thu trong nam, bao gom ca don ki truoc + ki nay
                            DateTime firstDay = Season.GetFirstDayOfYear(startDate.Year);
                            //26/08/2018 Sửa firstDay --> startDate
                            List<BaoCao2bDonThuInfo> dtList = GetDonThuByTinh(startDate, endDate, cqInfo.TinhID).ToList();

                            Calculate(ref bc2bInfo2, dtList, startDate);
                            //KeKhaiDuLieuDauKy_2bInfo keKhaiInfo = new DAL.BaoCao.KeKhaiDuLieuDauKy_2b().GetByCoQuan(cqInfo.CoQuanID);
                            //if (keKhaiInfo.NgaySuDung >= startDate && keKhaiInfo.NgaySuDung <= endDate)
                            //{
                            //    #region Cong so lieu tong
                            //    //bc2bInfo2.Col1Data += keKhaiInfo.Col1;
                            //    bc2bInfo2.Col2Data += keKhaiInfo.Col2;
                            //    bc2bInfo2.Col3Data += keKhaiInfo.Col3;
                            //    bc2bInfo.Col1Data = bc2bInfo2.Col2Data + bc2bInfo2.Col3Data;
                            //    bc2bInfo2.Col4Data += keKhaiInfo.Col4;
                            //    bc2bInfo2.Col5Data += keKhaiInfo.Col5;
                            //    bc2bInfo2.Col6Data += keKhaiInfo.Col6;
                            //    bc2bInfo2.Col7Data += keKhaiInfo.Col7;
                            //    bc2bInfo2.Col8Data += keKhaiInfo.Col8;
                            //    bc2bInfo2.Col9Data += keKhaiInfo.Col9;
                            //    bc2bInfo2.Col10Data += keKhaiInfo.Col10;
                            //    bc2bInfo2.Col11Data += keKhaiInfo.Col11;
                            //    bc2bInfo2.Col12Data += keKhaiInfo.Col12;
                            //    bc2bInfo2.Col13Data += keKhaiInfo.Col13;
                            //    bc2bInfo2.Col14Data += keKhaiInfo.Col14;
                            //    bc2bInfo2.Col15Data += keKhaiInfo.Col15;
                            //    bc2bInfo2.Col16Data += keKhaiInfo.Col16;
                            //    bc2bInfo2.Col17Data += keKhaiInfo.Col17;
                            //    bc2bInfo2.Col18Data += keKhaiInfo.Col18;
                            //    bc2bInfo2.Col19Data += keKhaiInfo.Col19;
                            //    bc2bInfo2.Col20Data += keKhaiInfo.Col20;
                            //    bc2bInfo2.Col21Data += keKhaiInfo.Col21;
                            //    bc2bInfo2.Col22Data += keKhaiInfo.Col22;
                            //    bc2bInfo2.Col23Data += keKhaiInfo.Col23;
                            //    bc2bInfo2.Col24Data += keKhaiInfo.Col24;
                            //    bc2bInfo2.Col25Data += keKhaiInfo.Col25;
                            //    bc2bInfo2.Col26Data += keKhaiInfo.Col26;
                            //    bc2bInfo2.Col27Data += keKhaiInfo.Col27;
                            //    bc2bInfo2.Col28Data += keKhaiInfo.Col28;
                            //    bc2bInfo2.Col29Data += keKhaiInfo.Col29;
                            //    bc2bInfo2.Col30Data += keKhaiInfo.Col30;
                            //    bc2bInfo2.Col31Data += keKhaiInfo.Col31;
                            //    #endregion
                            //}
                            resultList.Add(bc2bInfo2);

                            #region Cong so lieu tong
                            //bc2bInfo.Col1Data += bc2bInfo2.Col1Data;
                            bc2bInfo.Col2Data += bc2bInfo2.Col2Data;
                            bc2bInfo.Col3Data += bc2bInfo2.Col3Data;
                            bc2bInfo.Col1Data = bc2bInfo2.Col2Data + bc2bInfo2.Col3Data;
                            bc2bInfo.Col4Data += bc2bInfo2.Col4Data;
                            bc2bInfo.Col5Data += bc2bInfo2.Col5Data;
                            bc2bInfo.Col6Data += bc2bInfo2.Col6Data;
                            bc2bInfo.Col7Data += bc2bInfo2.Col7Data;
                            bc2bInfo.Col8Data += bc2bInfo2.Col8Data;
                            bc2bInfo.Col9Data += bc2bInfo2.Col9Data;
                            bc2bInfo.Col10Data += bc2bInfo2.Col10Data;
                            bc2bInfo.Col11Data += bc2bInfo2.Col11Data;
                            bc2bInfo.Col12Data += bc2bInfo2.Col12Data;
                            bc2bInfo.Col13Data += bc2bInfo2.Col13Data;
                            bc2bInfo.Col14Data += bc2bInfo2.Col14Data;
                            bc2bInfo.Col15Data += bc2bInfo2.Col15Data;
                            bc2bInfo.Col16Data += bc2bInfo2.Col16Data;
                            bc2bInfo.Col17Data += bc2bInfo2.Col17Data;
                            bc2bInfo.Col18Data += bc2bInfo2.Col18Data;
                            bc2bInfo.Col19Data += bc2bInfo2.Col19Data;
                            bc2bInfo.Col20Data += bc2bInfo2.Col20Data;
                            bc2bInfo.Col21Data += bc2bInfo2.Col21Data;
                            bc2bInfo.Col22Data += bc2bInfo2.Col22Data;
                            bc2bInfo.Col23Data += bc2bInfo2.Col23Data;
                            bc2bInfo.Col24Data += bc2bInfo2.Col24Data;
                            bc2bInfo.Col25Data += bc2bInfo2.Col25Data;
                            bc2bInfo.Col26Data += bc2bInfo2.Col26Data;
                            bc2bInfo.Col27Data += bc2bInfo2.Col27Data;
                            bc2bInfo.Col28Data += bc2bInfo2.Col28Data;
                            bc2bInfo.Col29Data += bc2bInfo2.Col29Data;
                            bc2bInfo.Col30Data += bc2bInfo2.Col30Data;
                            bc2bInfo.Col31Data += bc2bInfo2.Col31Data;

                            #endregion

                        }
                    }
                }
            }
        }

        private static void Calculate(ref BaoCao2bInfo bc2bInfo, List<BaoCao2bDonThuInfo> dtList, DateTime startDate)
        {
            foreach (BaoCao2bDonThuInfo dtInfo in dtList)
            {
                //Don tiep nhan trong ky
                if (dtInfo.NgayNhapDon >= startDate)
                {
                    bc2bInfo.Col1Data++;
                    if (dtInfo.SoLuong > 1)
                    {
                        bc2bInfo.Col2Data++;
                    }
                    else bc2bInfo.Col3Data++;
                }
                //Don ki truoc chuyen sang: ngay tiep nhan < startdate va ngay ra kq > startdate hoac chua co ket qua(ngay ra kq = min value)
                else if (dtInfo.NgayNhapDon < startDate && dtInfo.HuongGiaiQuyetID == 0)
                {
                    bc2bInfo.Col1Data++;
                    if (dtInfo.SoLuong > 1)
                    {
                        bc2bInfo.Col4Data++;
                    }
                    else bc2bInfo.Col5Data++;
                }
                //duyet cac don tiep nhan trong ky va ky truoc chuyen sang
                if (dtInfo.NgayNhapDon >= startDate || (dtInfo.NgayNhapDon < startDate && dtInfo.HuongGiaiQuyetID == 0))
                {
                    //Cac don du dk: duoc de xuat thu ly va ko bi tu choi thu ly
                    if (dtInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.DeXuatThuLy && dtInfo.TrangThaiDonID != (int)TrangThaiDonEnum.TuChoiThuLy)
                    {
                        bc2bInfo.Col6Data++;
                    }

                    //Phan loai don khieu nai, to cao
                    //Theo noi dung
                    //khieu nai
                    if (dtInfo.LoaiKhieuTo3ID == Constant.VeTranhChapDatDai)
                    {
                        bc2bInfo.Col8Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo3ID == Constant.VeNhaTaiSan)
                    {
                        bc2bInfo.Col9Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo3ID == Constant.VeChinhSach || dtInfo.LoaiKhieuTo3ID == Constant.VeCheDo)
                    {
                        bc2bInfo.Col10Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.KN_LinhVucKhac)
                    {
                        bc2bInfo.Col11Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.KN_LinhVucTuPhap)
                    {
                        bc2bInfo.Col12Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.KN_VeDang)
                    {
                        bc2bInfo.Col13Data++;
                    }
                    bc2bInfo.Col7Data = bc2bInfo.Col8Data + bc2bInfo.Col9Data + bc2bInfo.Col10Data + bc2bInfo.Col11Data;

                    //to cao
                    if (dtInfo.LoaiKhieuTo2ID == Constant.TC_LinhVucHanhChinh)
                    {
                        bc2bInfo.Col15Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.TC_LinhVucTuPhap)
                    {
                        bc2bInfo.Col16Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.ThamNhung)
                    {
                        bc2bInfo.Col17Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.TC_VeDang)
                    {
                        bc2bInfo.Col18Data++;
                    }
                    else if (dtInfo.LoaiKhieuTo2ID == Constant.TC_LinhVucKhac)
                    {
                        bc2bInfo.Col19Data++;
                    }
                    bc2bInfo.Col14Data = bc2bInfo.Col15Data + bc2bInfo.Col16Data + bc2bInfo.Col17Data + bc2bInfo.Col18Data + bc2bInfo.Col19Data;

                    //Theo tham quyen giai quyet
                    if (dtInfo.ThamQuyenCQXuLy == Constant.CQHanhChinhCacCap || dtInfo.ThamQuyenCQChuyenDon == Constant.CQHanhChinhCacCap)
                    {
                        bc2bInfo.Col20Data++;
                    }
                    else if (dtInfo.ThamQuyenCQXuLy == Constant.CQTuPhapCacCap || dtInfo.ThamQuyenCQChuyenDon == Constant.CQTuPhapCacCap)
                    {
                        bc2bInfo.Col21Data++;
                    }
                    else if (dtInfo.ThamQuyenCQXuLy == Constant.CQDang || dtInfo.ThamQuyenCQChuyenDon == Constant.CQDang)
                    {
                        bc2bInfo.Col22Data++;
                    }

                    //Theo trinh tu giai quyet
                    //chua duoc giai quyet: don chua co ket qua
                    if (dtInfo.KetQuaID == 0)
                    {
                        bc2bInfo.Col23Data++;
                    }
                    //da co ket qua
                    else
                    {
                        //giai quyet lan dau
                        if (dtInfo.SoLan == 1)
                        {
                            bc2bInfo.Col24Data++;
                        }
                        //giai quyet lan hai
                        else if (dtInfo.SoLan > 1)
                        {
                            bc2bInfo.Col25Data++;
                        }
                    }

                    //Don khac
                    if (dtInfo.LoaiKhieuTo1ID == Constant.PhanAnhKienNghi)
                    {
                        bc2bInfo.Col26Data++;
                    }

                    //Ket qua xu ly
                    if (dtInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.HuongDan)
                    {
                        bc2bInfo.Col27Data++;
                    }
                    else if (dtInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.ChuyenDon)
                    {
                        bc2bInfo.Col28Data++;
                    }
                    else if (dtInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.RaVanBanDonDoc)
                    {
                        bc2bInfo.Col29Data++;
                    }
                    else
                    if (dtInfo.HuongGiaiQuyetID == (int)HuongGiaiQuyetEnum.DeXuatThuLy)
                    {
                        if (dtInfo.LoaiKhieuTo1ID == Constant.KhieuNai)
                        {
                            bc2bInfo.Col30Data++;
                        }
                        else if (dtInfo.LoaiKhieuTo1ID == Constant.ToCao)
                        {
                            bc2bInfo.Col31Data++;
                        }
                    }
                }
            }
        }

        public DataTable BaoCao2b_DataTable()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("DonVi", typeof(string));
            dt.Columns.Add("TenCoQuan", typeof(string));
            dt.Columns.Add("CoQuanID", typeof(string));
            dt.Columns.Add("Col1Data", typeof(string));
            dt.Columns.Add("Col2Data", typeof(string));
            dt.Columns.Add("Col3Data", typeof(string));
            dt.Columns.Add("Col4Data", typeof(string));
            dt.Columns.Add("Col5Data", typeof(string));
            dt.Columns.Add("Col6Data", typeof(string));
            dt.Columns.Add("Col7Data", typeof(string));
            dt.Columns.Add("Col8Data", typeof(string));
            dt.Columns.Add("Col9Data", typeof(string));
            dt.Columns.Add("Col10Data", typeof(string));
            dt.Columns.Add("Col11Data", typeof(string));
            dt.Columns.Add("Col12Data", typeof(string));
            dt.Columns.Add("Col13Data", typeof(string));
            dt.Columns.Add("Col14Data", typeof(string));
            dt.Columns.Add("Col15Data", typeof(string));
            dt.Columns.Add("Col16Data", typeof(string));
            dt.Columns.Add("Col17Data", typeof(string));
            dt.Columns.Add("Col18Data", typeof(string));
            dt.Columns.Add("Col19Data", typeof(string));
            dt.Columns.Add("Col20Data", typeof(string));
            dt.Columns.Add("Col21Data", typeof(string));
            dt.Columns.Add("Col22Data", typeof(string));
            dt.Columns.Add("Col23Data", typeof(string));
            dt.Columns.Add("Col24Data", typeof(string));
            dt.Columns.Add("Col25Data", typeof(string));
            dt.Columns.Add("Col26Data", typeof(string));
            dt.Columns.Add("Col27Data", typeof(string));
            dt.Columns.Add("Col28Data", typeof(string));
            dt.Columns.Add("Col29Data", typeof(string));
            dt.Columns.Add("Col30Data", typeof(string));
            dt.Columns.Add("Col31Data", typeof(string));
            dt.Columns.Add("Col32Data", typeof(string));
            dt.Columns.Add("CapID", typeof(string));
            dt.Columns.Add("IsCoQuan", typeof(string));
            dt.Columns.Add("CssClass", typeof(string));
            dt.Columns.Add("ThuTu", typeof(string));
            dt.Columns.Add("RowCount_New", typeof(string));
            return dt;
        }

        public class BaoCao2bInfo
        {
            public String DonVi { get; set; }
            public bool IsCoQuan { get; set; }
            public int Col1Data { get; set; }
            public int Col2Data { get; set; }
            public int Col3Data { get; set; }
            public int Col4Data { get; set; }
            public int Col5Data { get; set; }
            public int Col6Data { get; set; }
            public int Col7Data { get; set; }
            public int Col8Data { get; set; }
            public int Col9Data { get; set; }
            public int Col10Data { get; set; }
            public int Col11Data { get; set; }
            public int Col12Data { get; set; }
            public int Col13Data { get; set; }
            public int Col14Data { get; set; }
            public int Col15Data { get; set; }
            public int Col16Data { get; set; }
            public int Col17Data { get; set; }
            public int Col18Data { get; set; }
            public int Col19Data { get; set; }
            public int Col20Data { get; set; }
            public int Col21Data { get; set; }
            public int Col22Data { get; set; }
            public int Col23Data { get; set; }
            public int Col24Data { get; set; }
            public int Col25Data { get; set; }
            public int Col26Data { get; set; }
            public int Col27Data { get; set; }
            public int Col28Data { get; set; }
            public int Col29Data { get; set; }
            public int Col30Data { get; set; }
            public int Col31Data { get; set; }
            public int Col32Data { get; set; }

            public String GhiChu { get; set; }
            public String CssClass { get; set; }
            public int CapID { get; set; }
            public int CoQuanID { get; set; }
            public int XaID { get; set; }
            public string TenXa { get; set; }
            public string TenDayDu { get; set; }
            public int BaoCao2bID { get; set; }
            public DateTime TuNgay { get; set; }
            public DateTime DenNgay { get; set; }
            public int CanBoID { get; set; }
            public DateTime NgayNhap { get; set; }
            public DateTime NgayChot { get; set; }
        }

        public class BaoCao2bDonThuInfo
        {
            public int DonThuID { get; set; }
            public int KetQuaID { get; set; }
            public int LoaiKetQuaID { get; set; }
            public int HuongGiaiQuyetID { get; set; }
            public int TrangThaiDonID { get; set; }
            public int NhomKNID { get; set; }
            public DateTime NgayNhapDon { get; set; }
            public int LoaiKhieuTo1ID { get; set; }
            public int LoaiKhieuTo2ID { get; set; }
            public int LoaiKhieuTo3ID { get; set; }
            public int LoaiKhieuToID { get; set; }
            public int CoQuanID { get; set; }
            public int ThamQuyenID { get; set; }
            public int SoLuong { get; set; }
            public int SoLan { get; set; }
            public DateTime NgayRaKQ { get; set; }
            public DateTime NgayThuLy { get; set; }
            public int CQTiepNhanID { get; set; }

            public int ThamQuyenCQXuLy { get; set; }
            public int ThamQuyenCQChuyenDon { get; set; }
        }

        #region 2b
        private const string GET_DONTHU_BY_TINH = "BaoCao2b_GetDonThuByTinh";
        private const string PARM_STARTDATE = "@StartDate";
        private const string PARM_ENDDATE = "@EndDate";
        private const string PARM_COQUANID = "@CoQuanID";
        private const string PARM_TINHID = @"TinhID";
        private const string PARAM_START = "@Start";
        private const string PARAM_END = "@End";

        private BaoCao2bDonThuInfo GetData(SqlDataReader rdr)
        {
            BaoCao2bDonThuInfo info = new BaoCao2bDonThuInfo();
            info.CoQuanID = Utils.ConvertToInt32(rdr["CoQuanID"], 0);
            info.DonThuID = Utils.ConvertToInt32(rdr["DonThuID"], 0);
            info.HuongGiaiQuyetID = Utils.ConvertToInt32(rdr["HuongGiaiQuyetID"], 0);
            info.LoaiKetQuaID = Utils.ConvertToInt32(rdr["LoaiKetQuaID"], 0);
            info.LoaiKhieuTo1ID = Utils.ConvertToInt32(rdr["LoaiKhieuTo1ID"], 0);
            info.LoaiKhieuTo2ID = Utils.ConvertToInt32(rdr["LoaiKhieuTo2ID"], 0);
            info.LoaiKhieuTo3ID = Utils.ConvertToInt32(rdr["LoaiKhieuTo3ID"], 0);
            info.LoaiKhieuToID = Utils.ConvertToInt32(rdr["LoaiKhieuToID"], 0);
            info.NgayNhapDon = Utils.ConvertToDateTime(rdr["NgayNhapDon"], DateTime.MinValue);
            info.KetQuaID = Utils.ConvertToInt32(rdr["KetQuaID"], 0);
            info.TrangThaiDonID = Utils.ConvertToInt32(rdr["TrangThaiDonID"], 0);
            info.NhomKNID = Utils.ConvertToInt32(rdr["NhomKNID"], 0);
            info.SoLuong = Utils.ConvertToInt32(rdr["SoLuong"], 0);
            info.SoLan = Utils.ConvertToInt32(rdr["SoLan"], 0);
            info.ThamQuyenCQXuLy = Utils.ConvertToInt32(rdr["ThamQuyenCQXuLy"], 0);
            info.ThamQuyenCQChuyenDon = Utils.ConvertToInt32(rdr["ThamQuyenCQChuyenDon"], 0);

            info.NgayRaKQ = Utils.ConvertToDateTime(rdr["NgayRaKQ"], DateTime.MinValue);
            info.NgayThuLy = Utils.ConvertToDateTime(rdr["NgayRaKQ"], DateTime.MinValue);
            //info.CQTiepNhanID = Utils.ConvertToInt32(rdr["CQTiepNhanID"], 0);

            return info;
        }

        public IList<BaoCao2bDonThuInfo> GetDonThuByTinh(DateTime startDate, DateTime endDate, int tinhID)
        {
            IList<BaoCao2bDonThuInfo> infoList = new List<BaoCao2bDonThuInfo>();
            SqlParameter[] parm = new SqlParameter[] {
                new SqlParameter(PARM_STARTDATE, SqlDbType.DateTime),
                new SqlParameter(PARM_ENDDATE, SqlDbType.DateTime),
                new SqlParameter(PARM_TINHID, SqlDbType.Int)
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = tinhID;
            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, GET_DONTHU_BY_TINH, parm))
                {
                    while (dr.Read())
                    {
                        BaoCao2bDonThuInfo info = GetData(dr);
                        infoList.Add(info);
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return infoList;
        }

        public List<TKDonThuInfo> GetDSChiTietDonThu(DateTime startDate, DateTime endDate, List<CoQuanInfo> ListCoQuan, int start, int pagesize, int? Index, int? xemTaiLieuMat, int? canBoID, int? capID)
        {
            List<TKDonThuInfo> infoList = new List<TKDonThuInfo>();
            var pList = new SqlParameter("@ListCoQuanID", SqlDbType.Structured);
            pList.TypeName = "dbo.IntList";
            var tbCoQuanID = new DataTable();
            tbCoQuanID.Columns.Add("CoQuanID", typeof(string));
            ListCoQuan.ForEach(x => tbCoQuanID.Rows.Add(x.CoQuanID));
            SqlParameter[] parm = new SqlParameter[] {
                new SqlParameter(PARM_STARTDATE, SqlDbType.DateTime),
                new SqlParameter(PARM_ENDDATE, SqlDbType.DateTime),
               pList,
                new SqlParameter("@Index", SqlDbType.Int),
                new SqlParameter(PARAM_END, SqlDbType.Int),
                new SqlParameter(PARAM_START, SqlDbType.Int),
                 new SqlParameter("@CapID", SqlDbType.Int)
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = tbCoQuanID;
            parm[3].Value = Index ?? Convert.DBNull;
            parm[4].Value = pagesize;
            parm[5].Value = start;
            parm[6].Value = capID ?? Convert.DBNull;
            var query = new DataTable();

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_GetDSChiTietDonThu_1606", parm))
                {
                    query.Load(dr);
                }
            }
            catch (Exception e)
            {
                throw;
            }

            var dataRows = query.AsEnumerable();
            List<FileHoSoInfo> fileYKienXLAll = new List<FileHoSoInfo>();
            List<FileHoSoInfo> fileBanHanhQDAll = new List<FileHoSoInfo>();
            var listXuLyDonID = dataRows.Select(x => x.Field<int>("XuLyDonID")).ToList();
            if (xemTaiLieuMat == 1)
            {
                fileYKienXLAll = new FileHoSoDAL().GetFileYKienXuLyByListXuLyDon1(listXuLyDonID).ToList();
                fileBanHanhQDAll = new FileHoSoDAL().GetFileBanHanhQDByListXuLyDon1(listXuLyDonID).ToList();
            }
            else
            {
                fileYKienXLAll = new FileHoSoDAL().GetFileYKienXuLyByListXuLyDon1(listXuLyDonID).Where(x => x.IsBaoMat != true || x.NguoiUp == canBoID).ToList();
                fileBanHanhQDAll = new FileHoSoDAL().GetFileBanHanhQDByListXuLyDon1(listXuLyDonID).Where(x => x.IsBaoMat != true || x.NguoiUp == canBoID).ToList();
            }
            foreach (var item in dataRows)
            {
                // don tu info
                var info = new TKDonThuInfo();
                info.CoQuanID = Utils.ConvertToInt32(item.Field<int?>("CoQuanID"), 0);
                info.XuLyDonID = Utils.ConvertToInt32(item.Field<int?>("XuLyDonID"), 0);
                info.DonThuID = Utils.ConvertToInt32(item.Field<int?>("DonThuID"), 0);
                info.HuongXuLyID = Utils.ConvertToInt32(item.Field<int?>("HuongGiaiQuyetID"), 0);
                info.NgayNhapDon = Utils.ConvertToDateTime(item.Field<DateTime?>("NgayNhapDon"), DateTime.MinValue);
                info.KetQuaID = Utils.ConvertToInt32(item.Field<int?>("KetQuaID"), 0);
                info.SoDon = Utils.ConvertToString(item.Field<string>("SoDonThu"), string.Empty);
                info.DiaChi = Utils.ConvertToString(item.Field<string>("DiaChiCT"), string.Empty);
                string noiDungDon = Utils.ConvertToString(item.Field<string>("NoiDungTiep"), string.Empty);
                if (noiDungDon == string.Empty)
                {
                    noiDungDon = Utils.ConvertToString(item.Field<string>("NoiDungDon"), string.Empty);
                }
                info.NoiDungDon = noiDungDon;
                info.TenChuDon = Utils.ConvertToString(item.Field<string>("HoTen"), string.Empty);
                info.NgayNhapDonStr = Format.FormatDate(info.NgayNhapDon);
                info.TenLoaiKhieuTo = Utils.ConvertToString(item.Field<string>("TenLoaiKhieuTo"), string.Empty);
                info.StateID = Utils.ConvertToInt32(item.Field<int?>("StateID"), 0);
                info.TenHuongGiaiQuyet = Utils.ConvertToString(item.Field<string>("TenHuongGiaiQuyet"), string.Empty);
                if (info.HuongXuLyID == 0)
                {
                    info.KetQuaID_Str = "Chưa giải quyết";
                }
                else if (info.HuongXuLyID == (int)HuongGiaiQuyetEnum.DeXuatThuLy && info.StateID != 10)
                {
                    info.KetQuaID_Str = "Đang giải quyết";
                }
                else
                {
                    info.KetQuaID_Str = "Đã giải quyết";
                }

                // huong giai quyet
                List<FileHoSoInfo> fileYKienXL = new List<FileHoSoInfo>();
                fileYKienXL = fileYKienXLAll.Where(x => x.XuLyDonID == item.Field<int>("XuLyDonID")).ToList();
                int step = 0;
                for (int i = 0; i < fileYKienXL.Count; i++)
                {
                    if (!string.IsNullOrEmpty(fileYKienXL[i].FileURL))
                    {
                        if (string.IsNullOrEmpty(fileYKienXL[i].TenFile))
                        {
                            string[] arrtenFile = fileYKienXL[i].FileURL.Split('/');
                            if (arrtenFile.Length > 0)
                            {
                                string[] duoiFile = arrtenFile[arrtenFile.Length - 1].Split('_');
                                if (duoiFile.Length > 0)
                                {
                                    fileYKienXL[i].TenFile = duoiFile[duoiFile.Length - 1];
                                }
                                else
                                {
                                    fileYKienXL[i].TenFile = arrtenFile[arrtenFile.Length - 1];
                                }
                            }
                        }
                        fileYKienXL[i].FileURL = fileYKienXL[i].FileURL.Replace(" ", "%20");
                    }
                    step++;
                    if (fileYKienXL[i].IsBaoMat == false)
                    {
                        string sec_false = "<li style='margin-bottom: 5px;'>" + step + ". " + "<a href='" + fileYKienXL[i].FileURL + "' download>" + fileYKienXL[i].TenFile + "</a></li>";
                        info.TenHuongGiaiQuyet = "<div style='margin-bottom: 5px;'><span>" + info.TenHuongGiaiQuyet + "</span></div>" + "<ul>" + sec_false + "</ul>";
                    }
                    else
                    {
                        string sec_true = "<li style='margin-bottom: 5px;'>" + step + ". " + "<a style='color: #EE7600;' href=" + "/DownloadFileDonThuCT.aspx?url=" + fileYKienXL[i].FileURL + ">" + fileYKienXL[i].TenFile + "</a></li>";
                        info.TenHuongGiaiQuyet = "<div style='margin-bottom: 5px;'><span>" + info.TenHuongGiaiQuyet + "</span></div>" + "<ul>" + sec_true + "</ul>";
                    }
                }
                // kết quả
                List<FileHoSoInfo> fileBanHanhQD = new List<FileHoSoInfo>();
                fileBanHanhQD = fileBanHanhQDAll.Where(x => x.XuLyDonID == info.XuLyDonID).ToList();
                int steps = 0;
                for (int j = 0; j < fileBanHanhQD.Count; j++)
                {
                    if (!string.IsNullOrEmpty(fileBanHanhQD[j].FileURL))
                    {
                        if (string.IsNullOrEmpty(fileBanHanhQD[j].TenFile))
                        {
                            string[] arrtenFile = fileBanHanhQD[j].FileURL.Split('/');
                            if (arrtenFile.Length > 0)
                            {
                                string[] duoiFile = arrtenFile[arrtenFile.Length - 1].Split('_');
                                if (duoiFile.Length > 0)
                                {
                                    fileBanHanhQD[j].TenFile = duoiFile[duoiFile.Length - 1];
                                }
                                else
                                {
                                    fileBanHanhQD[j].TenFile = arrtenFile[arrtenFile.Length - 1];
                                }
                            }
                        }
                        fileBanHanhQD[j].FileURL = fileBanHanhQD[j].FileURL.Replace(" ", "%20");
                    }
                    steps++;
                    if (fileBanHanhQD[j].IsBaoMat == false)
                    {
                        string sec_false = "<li style='margin-bottom: 5px;'>" + steps + ". " + "<a href='" + fileBanHanhQD[j].FileURL + "' download>" + fileBanHanhQD[j].TenFile + "</a></li>";
                        info.KetQuaID_Str = "<div style='margin-bottom: 5px;'><span>" + info.KetQuaID_Str + "</span></div>" + "<ul>" + sec_false + "</ul>";
                    }
                    else
                    {
                        string sec_true = "<li style='margin-bottom: 5px;'>" + steps + ". " + "<a style='color: #EE7600;' href=" + "/DownloadFileDonThuCT.aspx?url=" + fileBanHanhQD[j].FileURL + ">" + fileBanHanhQD[j].TenFile + "</a></li>";
                        info.KetQuaID_Str = "<div style='margin-bottom: 5px;'><span>" + info.KetQuaID_Str + "</span></div>" + "<ul>" + sec_true + "</ul>";
                    }
                }
                infoList.Add(info);
            }
            return infoList;
        }

        public int CountDSChiTietDonThu(DateTime startDate, DateTime endDate, int coQuanID)
        {
            List<BaoCao2bDonThuInfo> result = new List<BaoCao2bDonThuInfo>();
            SqlParameter[] parm = new SqlParameter[] {
                new SqlParameter(PARM_STARTDATE, SqlDbType.DateTime),
                new SqlParameter(PARM_ENDDATE, SqlDbType.DateTime),
                new SqlParameter(PARM_COQUANID, SqlDbType.Int),
            };
            parm[0].Value = startDate;
            parm[1].Value = endDate;
            parm[2].Value = coQuanID;

            try
            {
                using (SqlDataReader dr = SQLHelper.ExecuteReader(SQLHelper.appConnectionStrings, CommandType.StoredProcedure, "BaoCao2b_CountDSChiTietDonThu", parm))
                {
                    while (dr.Read())
                    {
                        BaoCao2bDonThuInfo info = new BaoCao2bDonThuInfo();
                        info.CoQuanID = Utils.ConvertToInt32(dr["CoQuanID"], 0);
                        info.NgayNhapDon = Utils.ConvertToDateTime(dr["NgayNhapDon"], DateTime.Now);
                        result.Add(info);
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            var a = result.Where(x => x.NgayNhapDon >= startDate && x.NgayNhapDon <= endDate && x.CoQuanID == coQuanID).ToList();
            return a.Count();
        }

        public DataTable DanhSachChiTietTable()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("CoQuanID", typeof(string));
            dt.Columns.Add("XuLyDonID", typeof(string));
            dt.Columns.Add("HuongGiaiQuyetID", typeof(string));
            dt.Columns.Add("DonThuID", typeof(string));
            dt.Columns.Add("NgayNhapDon", typeof(string));
            dt.Columns.Add("KetQuaID", typeof(string));
            dt.Columns.Add("SoDonThu", typeof(string));
            dt.Columns.Add("DiaChiCT", typeof(string));
            dt.Columns.Add("NoiDungTiep", typeof(string));
            dt.Columns.Add("NoiDungDon", typeof(string));
            dt.Columns.Add("HoTen", typeof(string));
            dt.Columns.Add("StateID", typeof(string));
            dt.Columns.Add("TenLoaiKhieuTo", typeof(string));
            dt.Columns.Add("TenHuongGiaiQuyet", typeof(string));
            dt.Columns.Add("KetQuaID_Str", typeof(string));

            return dt;
        }
        #endregion
    }
}
