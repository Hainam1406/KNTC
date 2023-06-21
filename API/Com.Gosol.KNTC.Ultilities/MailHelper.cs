using Com.Gosol.KNTC.Models.XuLyDon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Com.Gosol.KNTC.Ultilities
{
    public class MailHelper
    {


        public static int SendEmail(List<string> emailList, string emailTitle, string emailContent, string fromEmail, string password)
        {
            int successSent = 0;

            foreach (var email in emailList)
            {

                try
                {
                    StringBuilder sb = new StringBuilder();

                    MailMessage message = new System.Net.Mail.MailMessage(fromEmail, email, emailTitle, emailContent);

                    SmtpClient smtp = new SmtpClient();

                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;

                    /*
                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;
                    */

                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new System.Net.NetworkCredential(fromEmail, password);
                    smtp.EnableSsl = true;

                    message.IsBodyHtml = true;

                    smtp.Send(message);
                    successSent++;
                }
                catch
                {
                    continue;
                }
            }

            return successSent;
        }

        public static int SendEmail_obj(List<EmailInfo> email_contentList, string emailTitle, string fromEmail, string password, string emailServer, int emailPort)
        {
            int successSent = 0;

            foreach (var email in email_contentList)
            {

                try
                {

                    StringBuilder sb = new StringBuilder();

                    MailMessage message = new System.Net.Mail.MailMessage(fromEmail, email.Email, emailTitle, email.NoiDungEmail);

                    SmtpClient smtp = new SmtpClient();

                    smtp.Host = emailServer;
                    smtp.Port = emailPort;

                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new System.Net.NetworkCredential(fromEmail, password);
                    smtp.EnableSsl = true;

                    message.IsBodyHtml = true;

                    smtp.Send(message);
                    successSent++;

                }
                catch
                {
                    continue;
                }
            }

            return successSent;
        }

        public static int SendEmail_obj(List<EmailInfo> email_contentList, string emailTitle, string fromEmail, string password)
        {
            int successSent = 0;

            foreach (var email in email_contentList)
            {

                try
                {

                    StringBuilder sb = new StringBuilder();

                    MailMessage message = new System.Net.Mail.MailMessage(fromEmail, email.Email, emailTitle, email.NoiDungEmail);

                    SmtpClient smtp = new SmtpClient();

                    smtp.Host = "smtp.gmail.com";
                    smtp.Port = 587;


                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new System.Net.NetworkCredential(fromEmail, password);
                    smtp.EnableSsl = true;

                    message.IsBodyHtml = true;

                    smtp.Send(message);
                    successSent++;

                }
                catch
                {
                    continue;
                }

            }
            return successSent;
        }

        public static int SendEmail(List<string> emailList, string emailTitle, string emailContent, string fromEmail, string password, string emailServer, int emailPort)
        {
            int successSent = 0;

            foreach (var email in emailList)
            {

                try
                {
                    StringBuilder sb = new StringBuilder();

                    MailMessage message = new System.Net.Mail.MailMessage(fromEmail, email, emailTitle, emailContent);

                    SmtpClient smtp = new SmtpClient();

                    smtp.Host = emailServer;
                    smtp.Port = emailPort;

                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new System.Net.NetworkCredential(fromEmail, password);
                    smtp.EnableSsl = true;

                    message.IsBodyHtml = true;

                    smtp.Send(message);
                    successSent++;
                }
                catch
                {
                    continue;
                }
            }

            return successSent;
        }

        public static int SendEmail(List<string> emailList, string emailTitle, string emailContent, string fromEmail, string password, string emailServer)
        {
            int successSent = 0;

            foreach (var email in emailList)
            {

                try
                {
                    StringBuilder sb = new StringBuilder();

                    MailMessage message = new System.Net.Mail.MailMessage(fromEmail, email, emailTitle, emailContent);

                    SmtpClient smtp = new SmtpClient();

                    smtp.Host = emailServer;

                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Credentials = new System.Net.NetworkCredential(fromEmail, password);
                    smtp.EnableSsl = true;

                    message.IsBodyHtml = true;

                    smtp.Send(message);
                    successSent++;
                }
                catch
                {
                    continue;
                }
            }

            return successSent;
        }



        public static int SendEmailWithAttach(List<string> emailList, string emailTitle, string emailContent, string fromEmail, string password, List<string> fileList)
        {
            int successSent = 0;
            try
            {

                var fromAddress = new MailAddress(fromEmail, ""); // email dung de gui email,ten nguoi gui
                string fromPassword = password; // email dung de gui
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword),
                    Timeout = 300000,
                };
                using (var message = new MailMessage())
                {
                    foreach (string emailTo in emailList)
                    {
                        message.To.Add(new MailAddress(emailTo, "")); //Email nhan , ten nguoi nhan add hoac cc
                    }
                    message.From = fromAddress;
                    message.Subject = emailTitle;
                    message.Body = emailContent;
                    message.IsBodyHtml = true;
                    if (fileList != null)
                        foreach (string mpath in fileList)
                        {
                            message.Attachments.Add(new Attachment(mpath));
                        }
                    System.Net.ServicePointManager.ServerCertificateValidationCallback =
                    delegate (object s, System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                         System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
                    {
                        return true;
                    };
                    smtp.Send(message);
                }
                successSent = 1;
            }
            catch
            {
                return 0;
            }

            return successSent;
        }


    }
}
