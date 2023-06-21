import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import clone from "clone";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import options, { optionsCanBo } from "./options";
import Scrollbars from "../../components/utility/customScrollBar.js";
import Menu from "../../components/uielements/menu";
import SidebarWrapper from "./sidebar.style";
import appActions from "../../redux/app/actions";
import actionSidebar from "../../customApp/redux/HeThong/Sidebar/actions";
import { RightOutlined } from "@ant-design/icons";
import Logo from "../../components/utility/logo";
import { store } from "../../redux/store";
import { getRoleByKey } from "../../helpers/utility";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HomeIcon from "./image/icon/home-outline.png";
import HeThongIcon from "./image/icon/settings_outline.png";
import DanhMucIcon from "./image/icon/menu.png";
import TiepDanIcon from "./image/icon/reception.png";
import XuLyDonIcon from "./image/icon/process.png";
import GiaiQuyetIcon from "./image/icon/resolved.png";
import BaoCaoIcon from "./image/icon/report.png";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
const { Item } = Menu;
const listIcon = [
  HomeIcon,
  HeThongIcon,
  DanhMucIcon,
  TiepDanIcon,
  XuLyDonIcon,
  GiaiQuyetIcon,
  BaoCaoIcon,
];
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
  checkKeKhai,
} = appActions;
const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};

const Sidebar = (props) => {
  const [width, setWidth] = useState(0);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  useEffect(() => {
    props.checkKeKhai();
    setWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setWidth(e.target.innerWidth);
    });
  }, []);

  const handleClick = (e) => {
    props.changeCurrent([e.key]);
    if (props.app.view === "MobileView") {
      setTimeout(() => {
        props.toggleCollapsed();
        props.toggleOpenDrawer();
      }, 100);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // props.checkKeKhai();
    dispatch(actionSidebar.getList());
  }, []);

  const onOpenChange = (newOpenKeys) => {
    const { app, changeOpenKeys } = props;
    const latestOpenKey = newOpenKeys.find(
      (key) => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  };

  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const newArray = (list) => {
    let arr = [];
    list.forEach((item, index) =>
      arr.push({
        ...item,
        Icon: listIcon[index],
      })
    );
    return arr;
  };

  const setIcon = (maMenu) => {
    let icon;
    if (maMenu == "he-thong") {
      icon = HomeIcon;
    } else if (maMenu == "thong-tin-ca-nhan") {
      icon = HeThongIcon;
    } else if (maMenu == "tiep-cong-dan") {
      icon = TiepDanIcon;
    } else if (maMenu == "xu-ly-don") {
      icon = XuLyDonIcon;
    } else if (maMenu == "giai-quyet-don") {
      icon = GiaiQuyetIcon;
    } else if (maMenu == "du-lieu-don-thu") {
      icon = XuLyDonIcon;
    } else if (maMenu == "phan-giai-quyet") {
      icon = GiaiQuyetIcon;
    } else if (maMenu == "bao-cao") {
      icon = BaoCaoIcon;
    } else if (maMenu == "danh-muc") {
      icon = DanhMucIcon;
    } else {
      icon = BaoCaoIcon;
    }
    return icon;
  };
  const getMenuItem = ({ singleOption, submenuStyle, submenuColor, key }) => {
    const { TenMenu, Icon, Children, HienThi, MaMenu } = singleOption;

    const url = stripTrailingSlash(props.url);
    if (Children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder">
              <img
                src={setIcon(MaMenu)}
                alt=""
                style={{
                  width: "30px",
                  height: "100%",
                  objectFit: "cover",
                  margin: "0 10px",
                }}
              />
              <span className="nav-text">{TenMenu}</span>
            </span>
          }
          style={{ display: "flex" }}
          popupClassName={
            Children.length > 2
              ? "menu-topbar popupSubMenuInline"
              : Children.length === 2
              ? "menu-topbar_SubMenuInline popupSubMenuInline"
              : "popupSubMenuInline"
          }
        >
          {Children.map((child, index) => {
            // if (child.Children.length > 0)
            //     return getMenuItem({
            //         singleOption: child,
            //         submenuStyle,
            //         submenuColor,
            //         key: `${key}_${index}`,
            //     });
            // else {
            const linkTo = `${url}/${child.MaMenu}`;
            if (child.HienThi) {
              return (
                <Item key={`${key}_${index}`} className="parent nav-text">
                  <Link to={linkTo} className="parent nav-text">
                    {child.TenMenu}
                  </Link>
                </Item>
              );
            }
            // }
          })}
        </SubMenu>
      );
    } else
      return (
        <Item key={key}>
          <Link to={`${url}/${MaMenu}`}>
            <span className="isoMenuHolder" style={submenuColor}>
              <ion-icon name={Icon} />
              <span className="nav-text">{TenMenu}</span>
            </span>
          </Link>
        </Item>
      );
  };

  const getListOption = (optionsUsing) => {
    const { CheckKeKhai } = props;
    let role = store.getState().Auth.role;
    if (!role) {
      let roleStore = localStorage.getItem("role");
      role = JSON.parse(roleStore);
    }
    let user = store.getState().Auth.user;
    if (!user) {
      let userStore = localStorage.getItem("user");
      user = JSON.parse(userStore);
    }
    const isAdmin = user.NguoiDungID === 1;
    let listOptions = [];
    optionsUsing.forEach((menu, index) => {
      if (menu.Children && menu.Children.length) {
        let Children = [];
        menu.Children.forEach((menuChild) => {
          //if menuChild has permission
          // if ((role && role[menuChild.key] && role[menuChild.key].view) && menuChild.showMenu || menuChild.noRole) {
          if (isAdmin) {
            if (menuChild.showAdmin) {
              Children.push(menuChild);
            }
          } else {
            Children.push(menuChild);
          }
          // }
        });
        if (Children.length) listOptions.push({ ...menu, Children });
      } else {
        // if ((role && role[menu.key] && role[menu.key].view) && menu.showMenu || menu.noRole) {
        if (isAdmin) {
          if (menu.showAdmin) {
            listOptions.push({ ...menu });
          }
        } else {
          listOptions.push({ ...menu });
        }
        // } else {
        // if (menu.key === 'ke-khai-tai-san/ke-khai') {
        //   if (CheckKeKhai.KeKhai) {
        //     if (CheckKeKhai.ThemKeKhai) {
        //       listOptions.push({...menu});
        //     } else {
        //       if (CheckKeKhai.TrangThaiBanKeKhai !== 4) {//đã gửi
        //         listOptions.push({...menu});
        //       }
        //     }
        //   }
        // }
        // }
      }
    });
    return listOptions;
  };

  const { app, toggleOpenDrawer, customizedTheme, height } = props;
  const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
  const { openDrawer } = app;
  const mode = collapsed === true ? "vertical" : "inline";
  const onMouseEnter = () => {
    if (openDrawer === false) {
      toggleOpenDrawer();
    }
  };
  const onMouseLeave = () => {
    if (openDrawer === true) {
      toggleOpenDrawer();
    }
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: "rgba(0,0,0,0.3)",
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  //get list option ------- #################
  let role = store.getState().Auth.role;
  if (!role) {
    let roleStore = localStorage.getItem("role");
    role = JSON.parse(roleStore);
  }
  // const roleQuanLy = getRoleByKey(role, 'quan-ly');
  // const optionsUsing = roleQuanLy && roleQuanLy.view ? [...options] : [...optionsCanBo];
  const listOptions = getListOption(ListSideBar);
  //   console.log(listOptions, "listOptions");
  return (
    <>
      {/* {width <= 500 ?  */}
      <SidebarWrapper style={{ userSelect: "none" }}>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          {/* <Logo collapsed={collapsed}/> */}
          <Scrollbars
            style={{ height: height - 55 }}
            className="scrollbar-sidebar"
          >
            <Menu
              mode={"vertical"}
              onClick={handleClick}
              theme="dark"
              className="isoDashboardMenu"
              expandIcon={<RightOutlined />}
              // mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={onOpenChange}
            >
              {listOptions.map((singleOption, index) =>
                getMenuItem({
                  submenuStyle,
                  submenuColor,
                  singleOption: {
                    ...singleOption,
                    Icon: listIcon[index],
                  },
                  key: index,
                })
              )}
            </Menu>
            {/* 12313123123 */}
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
      {/* : null */}
      {/* } */}
    </>
  );
};

export default connect(
  (state) => ({
    ...state.App,
    app: state.App,
    customizedTheme: state.ThemeSwitcher.sidebarTheme,
    height: state.App.height,
  }),
  {
    toggleOpenDrawer,
    changeOpenKeys,
    changeCurrent,
    toggleCollapsed,
    checkKeKhai,
  }
)(Sidebar);
