import React, {useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Alert, Avatar, Layout, Menu, MenuProps} from 'antd';
import {items} from "./menu_items";
import Marquee from 'react-fast-marquee';

const { Header, Content, Footer, Sider } = Layout;
const rootSubmenuKeys = ['sub1', 'sub4', 'sub5'];

const LayoutForm: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout	style={{minHeight: '100vh'}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
              <Avatar size={100}  style={{
                    right: '20%', margin: 10
                }}  icon={<UserOutlined />} />
        <Menu
          mode="inline"
          theme={"dark"}
          items={items}
          style={{backgroundColor:'#00022b'}}
          defaultSelectedKeys={['1']}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
           <Alert
                banner
                type="info"
                style={{height:'100%'}}
                showIcon={false}
                message={
                  <Marquee pauseOnHover gradient={false}>
                    خوش آمدید آقای ..... !
                  </Marquee>
                }
              />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='bg-blue-50 rounded' style={{ padding: 24 }}>content</div>
        </Content>
        <Footer style={{textAlign: 'center'}}>تمامی حقوق برای شرکت digitkey می باشد.</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutForm;