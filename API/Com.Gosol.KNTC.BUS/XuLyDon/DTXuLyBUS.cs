using Com.Gosol.KNTC.DAL.HeThong;
using Com.Gosol.KNTC.DAL.KNTC;
using Com.Gosol.KNTC.DAL.TiepDan;
using Com.Gosol.KNTC.DAL.XuLyDon;
using Com.Gosol.KNTC.Model.HeThong;
using Com.Gosol.KNTC.Models;
using Com.Gosol.KNTC.Models.HeThong;
using Com.Gosol.KNTC.Models.KNTC;
using Com.Gosol.KNTC.Models.XuLyDon;
using Com.Gosol.KNTC.Security;
using Com.Gosol.KNTC.Ultilities;
using Microsoft.Office.Interop.Word;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Workflow;

namespace Com.Gosol.KNTC.BUS.XuLyDon
{
    public class DTXuLyBUS
    {
        private DTXuLyDAL DTXuLyDAL;
        public DTXuLyBUS()
        {
            DTXuLyDAL = new DTXuLyDAL();
        }
        public BaseResultModel GetDTDaTiepNhan(DTXuLyParam p, bool SuDungQuyTrinh)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTXuLyDAL.GetDTDaTiepNhan(p, SuDungQuyTrinh);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel GetDTCanXuLy(DTXuLyParam info)//, List<int> docList)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTXuLyDAL.GetDTCanXuLy(info);//, docList);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel XoaDonThu(ParamXoa p)//, List<int> docList)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTXuLyDAL.XoaDonThu(p);//, docList);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }

        public BaseResultModel TrinhLD(DTXyLyID dT, DTXuLyClaims dTXuLyClaims)
        {
            var Result = new BaseResultModel();
            bool sDQTVanThuTiepNhan = dTXuLyClaims.QTVanThuTiepNhanDon;
            bool sDQuyTrinhPhucTap = dTXuLyClaims.SuDungQuyTrinh;
            bool sDQuyTrinhVanThuTiepDan = dTXuLyClaims.QTVanThuTiepDan;
            int sDungQTGianTiep = dTXuLyClaims.QuyTrinhGianTiep;

            int idxulydon = dT.XuLyDonID;
            int nguondonden = dT.NguonDonDen;
            int huonggiaiquyet = dT.HuongGiaiQuyetID;
            int canBoTiepNhanID = dTXuLyClaims.CanBoID;

            if (idxulydon != 0)
            {
                XuLyDonInfo xLDInfo = new XuLyDonDAL().GetByID(idxulydon, string.Empty);

                int TRINH_LD_DUYET_KQ_XULY = 1;
                int TRINH_TP_DUYET_KQ_XULY = 2;
                int TRINH_LD_PHAN_XULY = 0;


                bool kq = false;
                string commandCode = "";
                List<string> commandList = WorkflowInstance.Instance.GetAvailabelCommands(idxulydon);

                if (nguondonden == (int)EnumNguonDonDen.TrucTiep)
                {
                    commandCode = commandList.Where(x => x.ToString() == "TrinhKetQuaXL").FirstOrDefault();
                }
                else
                {
                    if (sDQuyTrinhPhucTap)
                    {
                        if (sDQTVanThuTiepNhan)
                        {
                            if (xLDInfo.QTTiepNhanDon == (int)EnumQTTiepNhanDon.QTVanThuTiepNhan)
                            {
                                commandCode = commandList.Where(x => x.ToString() == "TrinhKetQuaXL").FirstOrDefault();
                            }
                            if (xLDInfo.QTTiepNhanDon == (int)EnumQTTiepNhanDon.QTTiepNhanGianTiep)
                            {
                                commandCode = commandList.Where(x => x.ToString() == "TrinhLD").FirstOrDefault();
                            }
                            else if (xLDInfo.QTTiepNhanDon == 0)
                            {
                                commandCode = commandList.Where(x => x.ToString() == "TrinhLD").FirstOrDefault();
                            }
                        }
                        if (xLDInfo.QTTiepNhanDon == (int)EnumQTTiepNhanDon.QTGianTiepBTD)
                        {
                            commandCode = commandList.Where(x => x.ToString() == "TrinhKetQuaXL").FirstOrDefault();
                        }

                        //qt phuc tap don thuan
                        if (!sDQTVanThuTiepNhan && xLDInfo.QTTiepNhanDon != (int)EnumQTTiepNhanDon.QTGianTiepBTD)
                        {
                            commandCode = commandList.Where(x => x.ToString() == "TrinhLD").FirstOrDefault();
                        }

                    }
                    //else
                    //    commandCode = WorkflowInstance.Instance.GetAvailabelCommands(idxulydon)[TRINH_LD_PHAN_XULY];
                }

                int canboid = dTXuLyClaims.CanBoID;
                kq = WorkflowInstance.Instance.ExecuteCommand(idxulydon, canboid, commandCode, DateTime.Now.AddDays(10), String.Empty);

                if (kq == true)
                {
                    if (nguondonden == (int)EnumNguonDonDen.TrucTiep)
                    {
                        Result.Status = 1;
                        Result.Message = "Trình lãnh đạo xem xét, phê duyệt thành công";
                    }
                    else
                    {
                        if (sDQTVanThuTiepNhan && xLDInfo.QTTiepNhanDon == (int)EnumQTTiepNhanDon.QTVanThuTiepNhan || xLDInfo.QTTiepNhanDon == (int)EnumQTTiepNhanDon.QTGianTiepBTD)
                        {
                            Result.Status = 1;
                            Result.Message = "Trình lãnh đạo xem xét, phê duyệt thành công";
                        }
                        else
                        {
                            Result.Status = 1;
                            Result.Message = "Trình lãnh đạo xem xét, phân xử lý thành công";
                        }
                    }


                    //Result.Message = "";
                    //ScriptManager.RegisterStartupScript(this, typeof(Page), "showthongBaoSuccess", "showthongBaoSuccess()", true);
                    if (sDQuyTrinhPhucTap && (sDQTVanThuTiepNhan || sDQuyTrinhVanThuTiepDan))
                    {
                        #region -- send mail
                        XuLyDonInfo xuLyDonInfo = new XuLyDonInfo();
                        xuLyDonInfo = new XuLyDonDAL().GetByID(idxulydon);
                        List<string> emailList = new List<string>();
                        List<CanBoInfo> lsLanhDaoInfo = new List<CanBoInfo>();
                        int coQuanID = dTXuLyClaims.CoQuanID;
                        lsLanhDaoInfo = new CanBo().GetLanhDaoCoQuan(coQuanID).ToList();
                        #region
                        /*
                        if (lsLanhDaoInfo.Count > 0)
                        {
                            foreach (CanBoInfo item in lsLanhDaoInfo)
                            {
                                if (item.Email != "")
                                {
                                    emailList.Add(item.Email);
                                }
                            }
                        }
                        //tuan bổ sung email động lay tu database
                        
                        //string emailTitle = Constant.EMAIL_TITLE_DUYETXL;
                        //string emailContent = "Bạn có đơn thư số " + xuLyDonInfo.SoDonThu + " cần bạn duyệt xử lý.";
                        
                        QL_EmailInfo Eminfo = new QL_Email().GetByLoaiEmail(Constant.DM_EMAIL_DUYETXL);
                        //string emailTitle = info.TenEmail;
                        //string emailContent = info.NoiDungEmail.Replace("#so_don", xuLyDonInfo.SoDonThu);
                        string emailTitle = string.Empty;
                        string emailContent = string.Empty;
                        if (Eminfo.EmailID != 0)
                        {
                            emailTitle = Utils.ConvertToString(Eminfo.TenEmail, string.Empty);
                            emailContent = Utils.ConvertToString(Eminfo.NoiDungEmail, string.Empty).Replace("#so_don", xuLyDonInfo.SoDonThu);
                        }
                        else
                        {
                            emailTitle = Constant.EMAIL_TITLE_DUYETXL;
                            emailContent = "Bạn có đơn thư số " + xuLyDonInfo.SoDonThu + " cần bạn duyệt xử lý.";
                        }

                        string fromEmail = ConfigurationSettings.AppSettings["Email"];
                        string passWord = ConfigurationSettings.AppSettings["PassEmail"];
                        // emailList, emailTitle, emailContent, fromEmail, passWord
                        

                        if (emailList != null && emailList.Count > 0)
                        {
                            SystemConfigInfo smtpServer = new SystemConfig().GetByKey("SMTP_SERVER");
                            SystemConfigInfo smtpPort = new SystemConfig().GetByKey("SMTP_PORT");
                            if (smtpServer != null)
                            {
                                string emailServer = smtpServer.ConfigValue;
                                if (smtpPort != null)
                                {
                                    int port = Utils.ConvertToInt32(smtpPort.ConfigValue, 0);
                                    MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord, emailServer, port);
                                }
                                else
                                {
                                    MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord, emailServer);
                                }
                            }
                            else
                            {
                                MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord);
                            }
                        }
                        */
                        #endregion
                        // tuan thay doi lay email dong
                        QL_EmailInfo Eminfo = new QL_EmailDAL().GetByLoaiEmail(Constant.DM_EMAIL_DUYETXL);
                        List<EmailInfo> lst_Email_ND = new List<EmailInfo>();
                        string emailTitle = string.Empty;
                        if (lsLanhDaoInfo.Count > 0)
                        {
                            foreach (CanBoInfo item in lsLanhDaoInfo)
                            {
                                if (item.Email != "")
                                {
                                    EmailInfo info = new EmailInfo();
                                    info.Email = item.Email;

                                    if (item.GioiTinh == 0)
                                    {
                                        string[] arry_ten = item.TenCanBo.Split(' ');
                                        string ten = string.Empty;
                                        if (arry_ten.Length > 0)
                                        {
                                            ten = arry_ten[arry_ten.Length - 1];
                                        }
                                        else
                                        {
                                            ten = arry_ten[0];
                                        }
                                        if (Eminfo.EmailID != 0)
                                        {
                                            info.NoiDungEmail = Utils.ConvertToString(Eminfo.NoiDungEmail, string.Empty).Replace("#so_don", xuLyDonInfo.SoDonThu).Replace("#can_bo", ten).Replace("#gioi_tinh", "Ông/Bà");
                                        }
                                    }
                                    else if (item.GioiTinh == 1)
                                    {
                                        string[] arry_ten = item.TenCanBo.Split(' ');
                                        string ten = string.Empty;
                                        if (arry_ten.Length > 0)
                                        {
                                            ten = arry_ten[arry_ten.Length - 1];
                                        }
                                        else
                                        {
                                            ten = arry_ten[0];
                                        }
                                        if (Eminfo.EmailID != 0)
                                        {
                                            info.NoiDungEmail = Utils.ConvertToString(Eminfo.NoiDungEmail, string.Empty).Replace("#so_don", xuLyDonInfo.SoDonThu).Replace("#can_bo", ten).Replace("#gioi_tinh", "Ông");
                                        }
                                    }
                                    else
                                    {
                                        string[] arry_ten = item.TenCanBo.Split(' ');
                                        string ten = string.Empty;
                                        if (arry_ten.Length > 0)
                                        {
                                            ten = arry_ten[arry_ten.Length - 1];
                                        }
                                        else
                                        {
                                            ten = arry_ten[0];
                                        }
                                        if (Eminfo.EmailID != 0)
                                        {
                                            info.NoiDungEmail = Utils.ConvertToString(Eminfo.NoiDungEmail, string.Empty).Replace("#so_don", xuLyDonInfo.SoDonThu).Replace("#can_bo", ten).Replace("#gioi_tinh", "Bà");
                                        }
                                    }

                                    lst_Email_ND.Add(info);
                                }
                            }
                        }
                        if (Eminfo.EmailID != 0)
                        {
                            emailTitle = Utils.ConvertToString(Eminfo.TenEmail, string.Empty);
                        }
                        else
                        {
                        }
                        string fromEmail = ConfigurationSettings.AppSettings["Email"];
                        string passWord = ConfigurationSettings.AppSettings["PassEmail"];

                        if (lst_Email_ND != null && lst_Email_ND.Count > 0)
                        {
                            SystemConfigModel smtpServer = new SystemConfigDAL().GetByKey("SMTP_SERVER");
                            SystemConfigModel smtpPort = new SystemConfigDAL().GetByKey("SMTP_PORT");
                            if (smtpServer != null)
                            {
                                string emailServer = smtpServer.ConfigValue;
                                if (smtpPort != null)
                                {
                                    int port = Utils.ConvertToInt32(smtpPort.ConfigValue, 0);
                                    //MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord, emailServer, port);
                                    //MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord, emailServer, port);
                                    (new System.Threading.Tasks.Task(() => MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord, emailServer, port))).Start();
                                }
                                else
                                {
                                    //MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord, emailServer);
                                    //MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord);
                                    (new System.Threading.Tasks.Task(() => MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord))).Start();
                                }
                            }
                            else
                            {
                                //MailHelper.SendEmail(emailList, emailTitle, emailContent, fromEmail, passWord);
                                //MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord);
                                (new System.Threading.Tasks.Task(() => MailHelper.SendEmail_obj(lst_Email_ND, emailTitle, fromEmail, passWord))).Start();
                            }
                        }


                        #endregion
                    }
                    else
                    {
                        new XuLyDonDAL().UpdateCanBoTiepNhan(idxulydon, canBoTiepNhanID);

                    }
                }
                else
                {
                    //lblContentSuccess.Text = "";
                    Result.Status = 0;
                    Result.Message = Constant.CONTENT_TRINHKY_ERROR;
                    //ScriptManager.RegisterStartupScript(this, typeof(Page), "showthongBaoError", "showthongBaoError()", true);

                }

                //createPaging();
                //BindRepeater();
            }
            return Result;
        }

        public BaseResultModel Update_HuongXuLy(DTXuLyInfo item)
        {
            var Result = new BaseResultModel();
            try
            {
                Result = DTXuLyDAL.Update_HuongXuLy(item);
            }
            catch (Exception ex)
            {
                Result.Status = -1;
                Result.Message = ex.ToString();
                Result.Data = null;
            }
            return Result;
        }
    }
}
