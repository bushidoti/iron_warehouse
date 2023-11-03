import React, {useState} from 'react';
import {Button, ConfigProvider, Form, Input, message} from 'antd';
import Url from "../../../api-configue";
import axios from "axios";
import {useNavigate} from "react-router-dom";
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} مورد نیاز است !',
};


const EditRaw = (props: { form: any; }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setLoading(true)
        await axios.put(
            `${Url}/api/raw_material/${props.form.getFieldValue(['product', 'code'])}/`, {
                name: values.product.name,
                scale: values.product.scale,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
            return response
        }).then(async data => {
            if (data.status === 200) {
                message.success('ویرایش شد');
                setLoading(false)
                navigate('/warehouse/industrial_warehouse')
            }
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            } else if (error.request.status === 405) {
                message.error('عدم ویرایش');
                setLoading(false)
            }
        })
    };



    return (
        <>
            <Form form={props.form}
                  autoComplete="off"
                  name="product"
                  layout="horizontal"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
            >
                <Form.Item>
                    <Form.Item name={['product', 'name']} className='w-[233px] inline-block m-2' style={{width: 300}}
                               label="نام کالا" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={['product', 'scale']} className='w-[233px] inline-block m-2' label="مقیاس"
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <ConfigProvider theme={{
                        components: {
                            Button: {
                                groupBorderColor: '#092b00'
                            }
                        }, token: {
                            colorPrimary: '#52c41a'
                        }
                    }}>
                        <Button style={{margin: 8}} danger={loading} type={"primary"} loading={loading}
                                htmlType="submit">
                            ویرایش
                        </Button>
                    </ConfigProvider>
                </Form.Item>
            </Form>

        </>
    );
}

export default EditRaw;