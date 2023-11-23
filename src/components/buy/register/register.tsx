import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Space
} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import Url from "../../api-configue";

const RegisterBuy: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([{}]);
    const navigate = useNavigate();
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    const onFocus = async () => {
        setLoading(true)
           await axios.get(`${Url}/api/raw_material`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    }).then(response => {
        return response
    }).then(async data => {
        setListProduct(data.data.map((obj:
                                          {
                                              code: number,
                                              name: string,
                                              scale: string,
                                              category: string,
                                          }, i: number) => {
            obj.code = data.data[i].code
            obj.name = data.data[i].name
            obj.scale = data.data[i].scale
            obj.category = 'مواد اولیه'
            return obj
        }))
    }).then(async () => {
        await axios.get(`${Url}/api/consuming_material`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            return response
        }).then(data => {
            setListProduct((oldArray => [...oldArray, ...data.data.map((obj:
                    {
                        code: number,
                        name: string,
                        scale: string,
                        category: string,
                    }, i: number) => {
                obj.code = data.data[i].code
                obj.name = data.data[i].name
                obj.scale = data.data[i].scale
                obj.category = 'مواد مصرفی'
                return obj
            })]))
        })
    }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        }).finally(() => setLoading(false)
        )
    }

    useEffect(() => {
            void onFocus()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])


    const handleResetSubmit = async () => {
        form.resetFields()
    }


    const onFinish = async () => {
        new Promise(resolve => resolve(
            form.getFieldValue(['products'])
        )).then(() => setLoading(true)).then(
                 async () => {
                            return await axios.post(
                    `${Url}/api/apply_buy/`, form.getFieldValue(['products']), {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    })
                        }
                ).then(
                        response => {
                            return response
                        }
                ).then(
                        async data => {
                            if (data.status === 201) {
                                message.success('درخواست ثبت شد.');
                                setLoading(false)
                            }
                        }
                ).then(async () => {
                        await handleResetSubmit()
                    }
                )
    };


    return (
        <>
        <Form
            form={form}
            onFinish={onFinish}
            name="Production"
            layout={"vertical"}
            autoComplete="off"
        >
            <>
                <Form.Item>
                     <Form.Item name={'applicant'} className='w-[233px] inline-block m-2' label="درخواست کننده"
                               rules={[{required: true}]}>
                        <Input placeholder='درخواست کننده'/>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Form.List name={['products']}>
                        {(subFields, subOpt) => (
                            <>
                                <Flex vertical gap={20}>
                                    {subFields.map((subField) => (
                                        <Space key={subField.key} size={20}>
                                            <Form.Item name={[subField.name, 'product']} style={{width: 300}}
                                                       label='نام کالا' rules={[{required: true}]}>
                                                <Select placeholder="انتخاب کنید"
                                                        optionFilterProp="children"
                                                        showSearch
                                                        filterOption={filterOption}
                                                        onChange={() => {
                                                            form.getFieldValue(['products']).map(async (product: {
                                                                product: number;
                                                            }, i: number) => {
                                                                await axios.get(`${Url}/api/${listProduct.filter(material => material.code === product.product)[0].category === 'مواد اولیه'  ? 'raw_material' : 'consuming_material' }/?code=${product.product}`, {
                                                                    headers: {
                                                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                                                    }
                                                                }).then(response => {
                                                                    return response
                                                                }).then(async data => {
                                                                    form.setFieldsValue({
                                                                        products: {
                                                                            [i]: {
                                                                                scale: data.data[0].scale,
                                                                                name: data.data[0].name,
                                                                                left: data.data[0].left,
                                                                                applicant: form.getFieldValue(['applicant']),
                                                                            }
                                                                        }
                                                                    });
                                                                })
                                                            })
                                                        }}
                                                        options={listProduct.map((item) => ({
                                                            label: item.name,
                                                            value: item.code
                                                        }))}
                                                />
                                            </Form.Item>
                                             <Form.Item name={[subField.name, 'left']} label='موجودی'>
                                                <InputNumber min={1} placeholder="موجودی" disabled/>
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'amount']} rules={[{required: true}]}
                                                       label='تعداد'>
                                                <InputNumber min={1} placeholder="تعداد"/>
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'scale']} style={{width: 150}}
                                                       label='مقیاس'>
                                                <Input placeholder="مقیاس" disabled/>
                                            </Form.Item>
                                             <Form.Item name={[subField.name, 'description']} rules={[{required: true}]} style={{width: 150}}
                                                       label='توضیحات'>
                                                <TextArea placeholder="توضیحات"/>
                                            </Form.Item>
                                            <Form.Item label=' '>
                                                <CloseOutlined
                                                    onClick={() => {
                                                        subOpt.remove(subField.name);
                                                    }}
                                                />
                                            </Form.Item>

                                        </Space>
                                    ))}
                                    <Button type="dashed" style={{marginBottom: 10}} loading={loading}
                                            onClick={() => subOpt.add()} block>
                                        اضافه کردن سطر +
                                    </Button>
                                    <Button type={"primary"} block htmlType="submit" danger={loading} loading={loading}>
                                        ثبت
                                    </Button>
                                </Flex>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </>
        </Form>
        </>
    );
};

export default RegisterBuy;