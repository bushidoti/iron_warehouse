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
        collapsedWidth="0">
                <div className='flex flex-col items-center m-5'>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <p className='text-gray-50'>حسین شاه محمدلو</p>
                </div>
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
                className='h-full'
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