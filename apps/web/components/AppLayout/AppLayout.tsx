import React, { useState } from 'react';

import { ConfigProvider } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;




interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b37ff',
          borderRadius: 6,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Header style={{ height: 55, width: '100%', padding: 0, background: colorBgContainer, zIndex: 1, position: 'fixed' }}/>
          <Content style={{ margin: 20, marginTop: 75, borderRadius: 8 }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;