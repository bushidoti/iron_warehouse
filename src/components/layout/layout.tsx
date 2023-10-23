import React, {useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import {items} from "./menu_items";

const { Content, Footer, Sider } = Layout;
const rootSubmenuKeys = ['sub1', 'sub5'];

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
                    <p className='text-gray-50'>مالی</p>
                    <p className='text-gray-50'>حسین شاه محمدلو</p>
                </div>
                <Menu
                  mode="inline"
                  theme={"dark"}
                  items={items}
                  defaultSelectedKeys={['1']}
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='bg-blue-50 rounded' style={{ padding: 24 }}>
                    بدنه برنامه در این قسمت قرار میگیرد
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>تمامی حقوق برای شرکت digitkey می باشد.</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutForm;