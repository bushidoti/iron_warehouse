import Url from "../../../api-configue";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../context";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Space
} from "antd";




export const EditDocConsumable = () => {
    const context = useContext(Context)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState<any>([])
    const [consumeDetailed, setConsumeDetailed] = useState<any>([])
    const [form] = Form.useForm();
    const [listProduct, setListProduct] = useState<any[]>([]);

    const fetchData = async () => {
        await axios.get(
            `${Url}/api/${context.currentProductDoc === 'factor' ?  'consuming_material_factor' :  'consuming_material_check' }/${context.currentProductDoc === 'factor' ?  context.currentProductFactor :  context.currentProductCheck }/`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
            return response
        }).then(async data => {
            if (context.currentProductDoc === 'factor'){
                   form.setFieldsValue({
                        FactorID: data.data.code,
                        receiver: data.data.jsonData[0].receiver,
                        seller: data.data.jsonData[0].seller,
                        buyer: data.data.jsonData[0].buyer,
                        seller_national_id: data.data.jsonData[0].seller_national_id,
                        address_seller: data.data.jsonData[0].address_seller,
                        document_code: data.data.jsonData[0].document_code,
                        document_type: 'فاکتور',
                        products: data.data.jsonData});
            }else {
                   form.setFieldsValue({
                        CheckID: data.data.code,
                        receiver: data.data.jsonData[0].receiver,
                        document_type: 'حواله',
                        products: data.data.jsonData});
            }
        }).finally(() => {
            setLoading(false)
        }).then(async () => {
            return await axios.get(`${Url}/api/consuming_material_detailed/?systemID=${context.currentProductDoc === 'factor' ?  context.currentProductFactor :  context.currentProductCheck }`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
            setAllProducts(data.data)
        }).then(async () => {
            return await axios.get(`${Url}/api/consuming_material_detailed`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
            setConsumeDetailed(data.data)
        }).then(async () => {
            return await axios.get(`${Url}/api/consuming_material`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
            setListProduct(data.data)
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        })
    }

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    useEffect(() => {
            void fetchData()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const onFinish = async () => {
        if (context.currentProductDoc === 'check'){
                 new Promise(resolve => resolve(
            form.getFieldValue(['products']).map((obj:
                                  {
                                      receiver: string;
                                      amendment: string;
                                  }) => {
                obj.receiver = form.getFieldValue(['receiver'])
                obj.amendment = 'اصلاح شده'
                return obj;
            })
        )).then(
              form.getFieldValue(['products']).map(async (product: { product: number, systemID: number; }, i: number) => {
                form.setFieldsValue({
                    products: {
                        [i]: {
                            afterOperator: (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0))
                                - (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    output: any;
                                }) => a + v.output, 0)) - (consumeDetailed.filter((products: {
                                    systemID: number;
                                    product: number;
                                }) => products.systemID === product.systemID && products.product === product.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0))  - form.getFieldValue(['products'])[i].output,

                             average_rate: context.department !== 'مدیریت مالی' ? undefined : consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).length === 0 ? form.getFieldValue(['products'])[i].rate : ((consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).slice(-2)[0].average_rate)
                                + form.getFieldValue(['products'])[i].rate) / 2 ,
                        }
                    }
                });
            })
        ).then(() => setLoading(true)).then(
            async () => {
                await axios.put(
                    `${Url}/api/consuming_material_check/${form.getFieldValue(['CheckID'])}/`, {
                                code: form.getFieldValue(['CheckID']),
                                jsonData: form.getFieldValue(['products']),
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
                    }
                }).catch(async (error) => {
                    if (error.request.status === 403) {
                        navigate('/no_access')
                    } else if (error.request.status === 400) {
                        message.error('عدم ثبت');
                        setLoading(false)
                    }
                })
            }
        ).then(
                    async () => {
                        allProducts.map(async (data: { id: any; } , i: number) => (
                            await axios.put(`${Url}/api/consuming_material_detailed/${data.id}/`,form.getFieldValue(['products'])[i], {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                }
                            }).then(
                                response => {
                                    return response
                                }
                            ).then(
                                async data => {
                                    if (data.status === 200) {
                                        message.success('ویرایش شد');
                                    }
                                }
                            )
                        ))

                    }
                )
        }else if (context.currentProductDoc === 'factor'){
                   new Promise(resolve => resolve(
            form.getFieldValue(['products']).map((obj:
                                  {
                                      receiver: string;
                                      buyer: string;
                                      seller: string;
                                      address_seller: string;
                                      seller_national_id: string;
                                      document_code: string;
                                      amendment: string;
                                  }) => {
                obj.receiver = form.getFieldValue(['receiver'])
                obj.buyer = form.getFieldValue(['buyer'])
                obj.seller = form.getFieldValue(['seller'])
                obj.address_seller = form.getFieldValue(['address_seller'])
                obj.seller_national_id = form.getFieldValue(['seller_national_id'])
                obj.document_code = form.getFieldValue(['document_code'])
                obj.amendment = 'اصلاح شده'
                return obj;
            })

        )).then(
              form.getFieldValue(['products']).map(async (product: { product: number , systemID: number; }, i: number) => {
                form.setFieldsValue({
                     products: {
                        [i]: {
                            afterOperator: (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0))
                                - (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    output: any;
                                }) => a + v.output, 0)) - (consumeDetailed.filter((products: {
                                    systemID: number;
                                    product: number;
                                }) => products.systemID === product.systemID && products.product === product.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0)) + form.getFieldValue(['products'])[i].input,

                            average_rate: context.department !== 'مدیریت مالی' ? undefined :  consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).slice(-2)[0].length === 0 ? form.getFieldValue(['products'])[i].rate : ((consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === product.product).slice(-2)[0].average_rate)
                                + form.getFieldValue(['products'])[i].rate) / 2 ,
                        }
                    }
                });
            })
        ).then(() => setLoading(true)).then(
            async () => {
                await axios.put(
                    `${Url}/api/consuming_material_factor/${form.getFieldValue(['FactorID'])}/`, {
                                code: form.getFieldValue(['FactorID']),
                                jsonData: form.getFieldValue(['products']),
                            }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    }).then(response => {
                    return response
                }).then(async data => {
                    if (data.status === 200) {
                        message.success('فاکتور ویرایش شد');
                        setLoading(false)
                    }
                }).catch(async (error) => {
                    if (error.request.status === 403) {
                        navigate('/no_access')
                    } else if (error.request.status === 400) {
                        message.error('عدم ثبت');
                        setLoading(false)
                    }
                })
            }
        ).then(
                    async () => {
                        allProducts.map(async (data: { id: any; } , i: number) => (
                            await axios.put(`${Url}/api/consuming_material_detailed/${data.id}/`,form.getFieldValue(['products'])[i], {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                }
                            }).then(
                                response => {
                                    return response
                                }
                            ).then(
                                async data => {
                                    if (data.status === 200) {
                                        message.success(`گزارش ویرایش شد`);
                                        await fetchData()
                                    }
                                }
                            )
                        ))

                    }
                ).then(
                    async () => {
                        form.getFieldValue(['products']).map(async (data: { product: any, systemID: number; } , i: number) => (
                            await axios.put(`${Url}/api/consuming_material/${data.product}/`, {
                             left: (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === data.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0))
                                - (consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === data.product).reduce((a: any, v: {
                                    output: any;
                                }) => a + v.output, 0)) - (consumeDetailed.filter((products: {
                                    systemID: number;
                                    product: number;
                                }) => products.systemID === data.systemID && products.product === data.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0)) + form.getFieldValue(['products'])[i].input,
                            average_rate: context.department !== 'مدیریت مالی' ? undefined :  consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === data.product).slice(-2)[0].length === 0 ? form.getFieldValue(['products'])[i].rate : ((consumeDetailed.filter((products: {
                                    product: number;
                                }) => products.product === data.product).slice(-2)[0].average_rate)
                                + form.getFieldValue(['products'])[i].rate) / 2 ,
                            }, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                }
                            }).then(
                                response => {
                                    return response
                                }
                            ).then(
                                async data => {
                                    if (data.status === 200) {
                                        message.success('موجودی و ارزش بروز شد.');
                                    }
                                }
                            )
                        ))

                    }
                )
        }
    };

    return (
        <Form
            form={form}
            name={context.currentProductDoc === 'factor' ? "InputForm" : "OutputForm"}
            layout={"vertical"}
            onFinish={onFinish}
            autoComplete="off"
        >
            {context.currentProductDoc === 'check' ?
                        <>

                <Form.Item>
                        <Form.Item name={'CheckID'} style={{margin: 8, display: 'inline-block'}}
                                   label="شماره ثبت حواله">
                            <InputNumber disabled/>
                        </Form.Item>
                    <Form.Item name={['document_type']} className='w-[233px] inline-block m-2' label="نوع مدرک"
                               rules={[{required: true}]}>
                        <Input
                            disabled
                        />
                    </Form.Item>
                        <Form.Item name={'receiver'} className='w-[233px] inline-block m-2' label="نام گیرنده"
                                   rules={[{required: true}]}>
                            <Input placeholder='نام گیرنده'/>
                        </Form.Item>


                </Form.Item>
                <Form.Item>
                    <Form.List name={['products']}>
                        {(subFields) => (
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
                                                                await axios.get(`${Url}/api/product/?code=${product.product}`, {
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
                                                                                category: data.data[0].category,
                                                                                name: data.data[0].name,
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
                                            <Form.Item name={[subField.name, 'category']} style={{width: 250}}
                                                       label='گروه'>
                                                <Input placeholder="گروه"
                                                       disabled
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'output']} rules={[{required: true}]}
                                                       label='تعداد'>
                                                <InputNumber min={1} placeholder="تعداد"/>
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'scale']} style={{width: 150}}
                                                       label='مقیاس'>
                                                <Input placeholder="مقیاس" disabled/>
                                            </Form.Item>
                                        </Space>
                                    ))}


                                    <Button type={"primary"} block htmlType="submit" danger={loading} loading={loading}>
                                        ثبت
                                    </Button>

                                </Flex>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </>
                    :
            <>
                <Form.Item>
                        <Form.Item name={'FactorID'} style={{margin: 8, display: 'inline-block'}}
                                   label="شماره ثبت فاکتور">
                            <InputNumber className='w-[100px]' disabled/>
                        </Form.Item>
                    <Form.Item name={['document_type']} className='w-[100px] inline-block m-2' label="نوع مدرک">
                        <Input
                            disabled
                        />
                    </Form.Item>
                     <Form.Item name={'document_code'} className='w-[233px] inline-block m-2' label="شناسه مدرک"
                               rules={[{required: true}]}>
                        <Input placeholder='شناسه مدرک'/>
                    </Form.Item>
                        <Form.Item name={'receiver'} className='w-[233px] inline-block m-2' label="نام گیرنده"
                                   rules={[{required: true}]}>
                            <Input placeholder='نام گیرنده'/>
                        </Form.Item>
                           <Form.Item name={'buyer'} className='w-[233px] inline-block m-2' label="خریدار"
                                       rules={[{required: true}]}>
                                <Input placeholder='نام خریدار'/>
                            </Form.Item>
                            <Form.Item name={'seller'} className='w-[233px] inline-block m-2' label="فروشنده"
                                       rules={[{required: true}]}>
                                <Input placeholder='فروشنده'/>
                            </Form.Item>
                            <Form.Item name={'seller_national_id'} className='w-[233px] inline-block m-2' label="کد ملی فروشنده">
                                <Input placeholder='کد ملی فروشنده'/>
                            </Form.Item>
                            <Form.Item name={'address_seller'} className='w-[233px] inline-block m-2' label="آدرس فروشنده">
                               <Input placeholder='آدرس فروشنده'/>
                            </Form.Item>

                </Form.Item>
                <Form.Item>
                    <Form.List name={['products']}>
                        {(subFields) => (
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
                                                                await axios.get(`${Url}/api/raw_material/?code=${product.product}`, {
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
                                                                                category: data.data[0].category,
                                                                                name: data.data[0].name,
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
                                            <Form.Item name={[subField.name, 'carton']} rules={[{required: true}]}
                                                       label='تعداد کارتن'>
                                                <InputNumber min={1} placeholder="تعداد کارتن"/>
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'input']} rules={[{required: true}]}
                                                       label='تعداد'>
                                                <InputNumber min={1} placeholder="تعداد"/>
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'rate']} rules={[{required: true}]}
                                                       label='نرخ'>
                                                <InputNumber
                                                    disabled={context.department !== 'مدیریت مالی'}
                                                    addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'scale']} style={{width: 150}}
                                                       label='مقیاس'>
                                                <Input placeholder="مقیاس" disabled/>
                                            </Form.Item>
                                        </Space>
                                    ))}

                                    <Button type={"primary"} block htmlType="submit" danger={loading} loading={loading}>
                                        ثبت
                                    </Button>

                                </Flex>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </>
            }

        </Form>
    )
}