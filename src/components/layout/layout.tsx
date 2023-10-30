import React, {useContext, useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps } from 'antd';
import {items} from "./menu_items";
import {Route, Routes} from "react-router-dom";
import {Logout} from "../login/logout";
import {Context} from "../../context";

const { Content, Footer, Sider } = Layout;
const rootSubmenuKeys = ['sub1', 'sub5'];

const LayoutForm: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['']);
  const context = useContext(Context)

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
                    <Avatar className='bg-cyan-700' size={100} icon={<UserOutlined />} />
                    <p className='text-gray-50'>{context.department}</p>
                    <p className='text-gray-50'>{context.fullName}</p>
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
                 <Routes>
                            <Route path={'/logout'} element={<Logout/>}/>
                        </Routes>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>تمامی حقوق برای شرکت digitkey می باشد.</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutForm;