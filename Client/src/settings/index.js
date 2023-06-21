const date = new Date();
const currentYear = date.getFullYear();
export default {
  apiTemp: "https://kntcv2internapi.gosol.com.vn/api/v2/",
  apiUrl: "https://apikktstest.gosol.com.vn/api/v1/", //Sever public
  // apiUrl: 'http://192.168.100.45:5001/api/v1/',//Sever dev
  // apiUrl: 'http://192.168.100.45:5003/api/v1/',//Sever test
  // apiUrl: 'https://apikkts.baria-vungtau.gov.vn/api/v1/',//Sever vt
  // apiUrl: 'https://localhost:44320/api/v1/', //Local
  // apiCAS: 'https://caskkts.baria-vungtau.gov.vn/'
  apiCAS: "https://caskkts.gosol.com.vn/",
  v2Url: "https://kntcv2internapi.gosol.com.vn/api/v2/", //Sever public
};

const siteConfig = {
  siteName:
    "phần mềm công tác quản lý tiếp dân, xử lý đơn và giải quyết khiếu nại tố cáo",
  siteIcon: "", //ion-flash
  footerText: `Copyright © ${currentYear} GO SOLUTIONS. All rights`,
};

const themeConfig = {
  topbar: "theme6",
  sidebar: "theme8",
  layout: "theme2",
  theme: "themedefault",
};
const language = "english";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};

export { siteConfig, themeConfig, language, firebaseConfig };
