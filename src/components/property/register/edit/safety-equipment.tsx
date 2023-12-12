import React, {useContext, useEffect} from 'react';
import {Button, ConfigProvider, Form, Input, InputNumber, message} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../../context";
import Url from "../../../api-configue";


/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} مورد نیاز است !',
};


const EditSafetyEquipment  = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const context = useContext(Context)


    const subObjAdd = async () => {
           await axios.put(`${Url}/api/property/${context.currentProperty}/`, form.getFieldValue(['property']) , {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
                return response
            }).then(async data => {
                if (data.status === 200) {
                    message.success('اموال بروز شد');
                    await fetchData()
                    navigate('/warhouse/property/report')

                }
            })
    }




    const handleResetSubmit = async () => {
        form.resetFields()
        await fetchData()
    }


        const fetchData = async () => {
        await axios.get(`${Url}/api/property/${context.currentProperty}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
            return response
        }).then(async data => {
              form.setFieldsValue({
                property: {
                    code: data.data.code,
                    factorCode: data.data.factorCode,
                    inventory: data.data.inventory,
                    name: data.data.name,
                    property_number: data.data.property_number,
                    document_code: data.data.document_code,
                    use_for: data.data.use_for,
                    user: data.data.user,
                    install_location: data.data.install_location,
                },
            });
        })
    }



    useEffect(() => {
            void fetchData()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [context.propertyTab])



    return (
        <>
        <Form form={form}
              autoComplete="off"
              name="property"
              layout="vertical"
              onFinish={subObjAdd}
              validateMessages={validateMessages}
        >
            <Form.Item>
                 <Form.Item name={['property', 'code']} className='w-[233px] m-2 inline-block' label="شماره ثبت">
                    <InputNumber className='w-[233px]' disabled/>
                 </Form.Item>
                 <Form.Item name={['property', 'factorCode']} className='w-[233px] m-2 inline-block' label="شماره ثبت سیستم فاکتور">
                        <InputNumber className='w-[233px]' disabled/>
                 </Form.Item>
            </Form.Item>
            <Form.Item>
                  <Form.Item name={['property', 'name']} className='w-[233px] inline-block m-2' label="نام تجهیزات"
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={['property', 'property_number']} className='w-[233px] inline-block m-2' label="شماره اموال"
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                 <Form.Item name={['property', 'document_code']} className='w-[233px] inline-block m-2' label="شناسه فاکتور"
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={['property', 'use_for']} className='w-[233px] inline-block m-2' label="مورد استفاده"
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
               <Form.Item name={['property', 'user']} className='w-[233px] inline-block m-2' label="یوزر"
                           rules={[{required: true}]}>
                    <Input/>
               </Form.Item>
               <Form.Item name={['property', 'install_location']} className='w-[233px] inline-block m-2' label="محل نصب"
                           rules={[{required: true}]}>
                    <Input/>
               </Form.Item>
            </Form.Item>
            <Form.Item>
                <Form.Item>
                    <Form.Item style={{margin: 8}}>
                        <ConfigProvider theme={{
                            components: {
                                Button: {
                                    groupBorderColor: '#092b00',
                                }
                            }, token: {
                                colorPrimary: '#52c41a'
                            }
                        }}>
                            <Button  danger={context.loadingAjax} type={"primary"} loading={context.loadingAjax} block htmlType="submit">
                                ثبت
                            </Button>
                        </ConfigProvider>
                    </Form.Item>
                    <Form.Item style={{margin: 8}}>
                        <Button onClick={handleResetSubmit} block loading={context.loadingAjax} htmlType="button">
                            ریست
                        </Button>
                    </Form.Item>
                </Form.Item>
            </Form.Item>
        </Form>
        </>
    );
}

export default EditSafetyEquipment ;