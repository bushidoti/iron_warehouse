import React, {useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {
    Button,
    Flex,
    Form,
    InputNumber,
    message,
    Select,
    Space
} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Url from "../api-configue";

const FinanceMain: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([{}]);
    const navigate = useNavigate();

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());




    const fetchData = async () => {
        setLoading(true)
        await axios.get(`${Url}/api/production`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            return response
        }).then(async data => {
            setListProduct(data.data)
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        }).finally(() => setLoading(false)
        )
    }





    useEffect(() => {
            void fetchData()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])


    const handleResetSubmit = async () => {
        form.resetFields()
        await fetchData()
    }


    const onFinish = async () => {
          form.getFieldValue(['products']).map(async (product: { code: number; fee: number; overload: number; cost: number;  request: string;}) => {
                await axios.put(`${Url}/api/production/${product.code}/`, {
                      code: product.code,
                      fee: product.fee,
                      overload: product.overload,
                      total: product.overload + product.fee + product.cost,
                }, {
                      headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                      }
                }).then(
                    response => {
                          return response
                    }).then(async data => {
                      if (data.status === 200) {
                            message.success(`جمع هزینه سفارش ${product.request} بروز شد`);

                      }
                }).catch(async (error) => {
                      if (error.request.status === 403) {
                            navigate('/no_access')
                      } else if (error.request.status === 400) {
                            message.error('عدم ثبت');
                            setLoading(false)
                            await handleResetSubmit()
                      }
                })
          })

    };

    return (
        <>
        <Form
            form={form}
            onFinish={onFinish}
            name="ConsumeProductForm"
            layout={"vertical"}
            autoComplete="off"
        >
            <>
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
                                                                await axios.get(`${Url}/api/production/?code=${product.product}`, {
                                                                    headers: {
                                                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                                                    }
                                                                }).then(response => {
                                                                    return response
                                                                }).then(async data => {
                                                                    form.setFieldsValue({
                                                                        products: {
                                                                            [i]: {
                                                                                amount: data.data[0].amount,
                                                                                code: data.data[0].code,
                                                                                name: data.data[0].name,
                                                                                cost: data.data[0].cost,
                                                                                request: data.data[0].request,
                                                                                fee: data.data[0].fee,
                                                                                overload: data.data[0].overload,
                                                                            }
                                                                        }
                                                                    });
                                                                })
                                                            })
                                                        }}
                                                        options={listProduct.map((item) => ({
                                                            label: item.name + ', کد ' + item.code + ', سفارش ' + item.request ,
                                                            value: item.code
                                                        }))}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'cost']} rules={[{required: true}]}
                                                       label='ارزش'>
                                                <InputNumber disabled  placeholder="ارزش مواد"
                                                     addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            </Form.Item>
                                           <Form.Item name={[subField.name, 'fee']} rules={[{required: true}]}
                                                       label='مزد'>
                                                <InputNumber placeholder="مزد"
                                                    addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'overload']} rules={[{required: true}]}
                                                       label='سربار'>
                                                <InputNumber placeholder="سربار"
                                                    addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
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

export default FinanceMain;