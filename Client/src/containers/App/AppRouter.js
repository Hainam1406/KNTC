import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';
import customRoutes from '../../customApp/router';
import {noRole} from '../../customApp/sidebar';

import {store} from '../../redux/store';
import {getRoleByKey} from "../../helpers/utility";

const routes = [
  ...customRoutes,
];

class AppRouter extends Component {
  render() {
    const {url, style} = this.props;
    //get list routes ---------########
    let role = store.getState().Auth.role;
    if (!role) {
      let roleStore = localStorage.getItem('role');
      role = JSON.parse(roleStore);
    }
    let listRoutes = [];
    routes.forEach(value => {
      // if (!value.path || (role && role[value.path] && role[value.path].view) || value.isDetail || noRole.includes(value.path)) {
        listRoutes.push(value);
      // }
    });
    //Kiểm tra tổng hợp toàn huyện 24/11/2021
    const roleToanHuyen = getRoleByKey(role, 'tong-hop');
    const roleToanSo = getRoleByKey(role, 'tong-hop-toan-so');
    // if (roleToanHuyen.view || roleToanSo.view) {
    //   const haveTiepNhan = listRoutes.some(item => item.path === 'quan-ly-ban-ke-khai');
    //   if (!haveTiepNhan) {
    //     //Nếu chưa có thì thêm vào
    //     const routeTiepNhan = routes.find(item => item.path === 'quan-ly-ban-ke-khai');
    //     listRoutes.push(routeTiepNhan);
    //   }
    // }
    //

    return (
      <div style={{...style,height : '100%'}} className = "wrapper-app_router">
        {listRoutes.map(singleRoute => {
          
          const {path, exact, ...otherProps} = singleRoute;
          
          return (
            <Route
              exact={!(exact === false)}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
