import React, {useContext} from 'react';
import { Avatar, Layout } from 'antd';
import {MenuLayout} from "./menu_items";
import {Context} from "../../context";
import {RouteLayout} from "./Route";

const { Content, Footer, Sider } = Layout;

const LayoutForm: React.FC = () => {
  const context = useContext(Context)


  return (
    <Layout	style={{minHeight: '100vh'}}>
      <Sider
        breakpoint="xl"
        collapsedWidth="0">
                <div className='flex flex-col items-center m-5'>
                    <Avatar src={require('../../assets/avatar.ico')} className='bg-indigo-950 mb-1' size={100} />
                    <p className='text-gray-50'>{context.department}</p>
                    <p className='text-gray-50'>{context.fullName}</p>
                </div>
                <MenuLayout/>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='bg-blue-50 rounded' style={{ padding: 24 }}>
                 <RouteLayout/>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>تمامی حقوق برای شرکت digitkey می باشد.</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutForm;