import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {Layout, ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import {Debounce} from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import {ThemeProvider} from 'styled-components';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import ThemeSwitcher from '../../containers/ThemeSwitcher';
import AppRouter from './AppRouter';
import {siteConfig} from '../../settings';
// import {AppLocale} from '../../dashApp';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';
import GlobalStyle from './globalStyle';
import queryString from 'query-string'
// import './antd4.css';

const {Content, Footer} = Layout;
const {logout} = authAction;
const {toggleAll} = appActions;

export class App extends Component {
  render() {
    const {url} = this.props.match;
    const {locale, selectedTheme, height, width} = this.props;
    const isIframe = JSON.parse(localStorage.getItem('data_config'))?.isIframe ? JSON.parse(localStorage.getItem('data_config')).isIframe : false
    // const searchUrl = queryString.parse(this.props.location?)
    // console.log(this.props.location,'this.props.location')
    const appHeight = window.innerHeight;
    return (
      <ConfigProvider 
      // locale={currentAppLocale.antd}
      >
        <IntlProvider
          // locale={currentAppLocale.locale}
          // messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[selectedTheme]}>
            <AppHolder>
              <GlobalStyle/>
              <Layout style={{height: appHeight}} className={'outerLayout'}>
                <Debounce time="1000" handler="onResize">
                  <WindowResizeListener
                    onResize={windowSize =>
                      this.props.toggleAll(
                        windowSize.windowWidth,
                        windowSize.windowHeight
                      )
                    }
                  />
                </Debounce>
                {!isIframe ? <Topbar url={url}/> :  null}
                <Layout style={{flexDirection: "row", overflowX: "hidden"}} className={'middleLayout'}>
                {/* <Sidebar url={url}/> */}
                  {/* {window.innerWidth <= 500 ?   */}
                  {!isIframe ? <Sidebar url={url}/> :  null}
                  {/* <Sidebar url={url}/> */}
                   {/* : null }  */}
                  {/* <Sidebar url={url}/> */}
                  
                  <Layout
                    className="isoContentMainLayout"
                    style={{
                      height: height
                    }}
                  >
                    <Content
                      className="isomorphicContent"
                      style={{
                        padding: '55px 0 0',
                        flexShrink: '0',
                        background: '#F9F9F9',
                        position: 'relative'
                      }}
                    >
                      <AppRouter style = {{height : '100%'}} url={url}/>
                    </Content>
                    {!isIframe ? <Footer
                      style={{
                        background: '#ffffff',
                        textAlign: 'center',
                        borderTop: '1px solid #ededed',
                        padding: '10px 50px'
                      }}
                    >
                      {siteConfig.footerText}
                    </Footer> : null}
                  </Layout>
                </Layout>
                {/*<ThemeSwitcher />*/}
              </Layout>
            </AppHolder>
          </ThemeProvider>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height,
    width: state.App.width,
    isViewIframe : state.App.isViewIframe
  }),
  {logout, toggleAll}
)(App);
