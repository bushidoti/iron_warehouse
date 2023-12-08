import React, {useEffect, useRef, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {
    Button, Checkbox,
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
import Url from "../../api-configue";
import TablePrint from "./table";
import {useReactToPrint} from "react-to-print";

const RegisterSale: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([{}]);
    const navigate = useNavigate();
    const [discountType, setDiscountType] = useState<string>('');
    const componentPDF = useRef(null);

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
        }).then(async () => {
            return await axios.get(`${Url}/auto_increment/sale_salefactor`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
             form.setFieldsValue({
                FactorID: data.data.content,

            });
        }).then(async () => {
            return await axios.get(`${Url}/auto_increment/industrial_warehouse_productioncheck`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
             form.setFieldsValue({
                CheckID: data.data.content,

            });
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
        new Promise(resolve => resolve(
                form.getFieldValue(['products']).map((obj:
                                                      {
                                                          buyer_national_id: string,
                                                          buyer: string,
                                                          address_buyer: string;
                                                          phone_buyer: string;
                                                          discount: string;
                                                          factorCode: number;
                                                          checkCode: number;
                                                          saleFactorCode: number;
                                                          totalFactor: number;
                                                          pretotal: number;
                                                          total: number;
                                                      }, index : number) => {
                obj.buyer_national_id = form.getFieldValue(['buyer_national_id'])
                obj.buyer = form.getFieldValue(['buyer'])
                obj.address_buyer = form.getFieldValue(['address_buyer'])
                obj.phone_buyer = form.getFieldValue(['phone_buyer'])
                obj.factorCode = form.getFieldValue(['FactorID'])
                obj.saleFactorCode = form.getFieldValue(['FactorID'])
                obj.checkCode = form.getFieldValue(['CheckID'])
                obj.pretotal = form.getFieldValue(['products'])[index].total   + (form.getFieldValue(['products'])[index].type_increase === 'percent' ?
                        (form.getFieldValue(['products'])[index].increase * form.getFieldValue(['products'])[index].total) / 100 :
                        form.getFieldValue(['products'])[index].increase)
                obj.total = form.getFieldValue(['products'])[index].output * (
                    form.getFieldValue(['products'])[index].total
                    + (form.getFieldValue(['products'])[index].type_increase === 'percent' ?
                        (form.getFieldValue(['products'])[index].increase * form.getFieldValue(['products'])[index].total) / 100 :
                        form.getFieldValue(['products'])[index].increase)
                )
                return obj;
            })
        )).then(
                  form.getFieldValue(['products']).map((obj:
                                                      {
                                                          totalFactor: number;
                                                      }) => {

                obj.totalFactor = form.getFieldValue(['products']).reduce((a: number, v: { total: number; }) =>
                                         a + v?.total, 0)
                return obj;
            })
        ).then(
             form.getFieldValue(['products']).map((obj:
                                                      {
                                                          tax: number;
                                                          discount: number;
                                                      }) => {
                obj.tax = Math.round(form.getFieldValue(['tax']) ? (9 * form.getFieldValue(['products'])[0].totalFactor) / 100 : 0)
                obj.discount = Math.round(
                                    form.getFieldValue(['discount']) !== undefined ?
                                         discountType === 'percent' ?
                                            (form.getFieldValue(['discount']) * form.getFieldValue(['products'])[0].totalFactor ) / 100
                                                :
                                            form.getFieldValue(['discount'])
                                        : 0
                                  )
                return obj;
            })
        ).then(() => setLoading(true)).then(
            async () => {
                await axios.post(
                    `${Url}/api/sale_factor/`, {
                                tax:  Math.round(form.getFieldValue(['products'])[0].tax),
                                discount:  Math.round(form.getFieldValue(['products'])[0].discount),
                                total:
                                Math.round(form.getFieldValue(['products'])[0].totalFactor + form.getFieldValue(['products'])[0].tax - form.getFieldValue(['products'])[0].discount)
                                ,
                                jsonData: form.getFieldValue(['products']),
                            }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    }).then(
                        response => {
                    return response
                }).then(async data => {
                    if (data.status === 201) {
                        message.success('فاکتور فروش ثبت شد');
                        generatePDF()
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
            }
        ).then(
            async () => {
                await axios.post(
                    `${Url}/api/production_check/`, {
                                jsonData: form.getFieldValue(['products']),
                            }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    }).then(
                        response => {
                    return response
                }).then(async data => {
                    if (data.status === 201) {
                        message.success('حواله خروج ثبت شد');
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
            }
        ).then(
            form.getFieldValue(['products']).map(async (product: { code: number; fee: number; output: number; amount: number;  request: string;}) => {
                await axios.put(`${Url}/api/production/${product.code}/`, {
                      code: product.code,
                      amount: product.amount - product.output,
                }, {
                      headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                      }
                }).then(
                    response => {
                          return response
                    }).then(async data => {
                      if (data.status === 200) {
                            message.success(`${product.output} عدد از محصول ${product.code} کم شد `);
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
        ).then(async () => {
                await axios.post(`${Url}/api/production_detail/`, form.getFieldValue(['products']), {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                }).then(
                    response => {
                        return response
                    }).then(async data => {
                    if (data.status === 201) {
                        message.success(`در گزارش ثبت شد`);
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
            }
        ).then(async () => {
                        await handleResetSubmit()
                    }
                )
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });



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
                    <Form.Item name={'FactorID'} className='inline-block m-2'
                               label="شماره ثبت فاکتور فروش">
                        <InputNumber className='w-[150px]' disabled/>
                    </Form.Item>
                     <Form.Item name={'CheckID'} className='inline-block m-2'
                               label="شماره حواله خروج">
                        <InputNumber className='w-[150px]' disabled/>
                    </Form.Item>
                    <Form.Item name={'buyer'} className='w-[233px] inline-block m-2' label="نام خریدار"
                               rules={[{required: true}]}>
                        <Input placeholder='نام خریدار'/>
                    </Form.Item>
                            <Form.Item
                                hasFeedback
                                name={'buyer_national_id'}
                                className='w-[233px] inline-block m-2'
                                label="کد ملی خریدار"
                                rules={[{len: 10}]}>
                                <Input showCount maxLength={10}/>
                            </Form.Item>
                             <Form.Item name={'address_buyer'} className='w-[233px] inline-block m-2' label="آدرس خریدار">
                              <Input placeholder='آدرس خریدار'/>
                            </Form.Item>
                            <Form.Item name={'phone_buyer'} className='w-[233px] inline-block m-2' label="تلفن خریدار">
                              <Input placeholder='تلفن خریدار'/>
                            </Form.Item>
                          <Space.Compact className='m-2'>
                           <Form.Item name={'type_discount'}
                                   label='نوع محاسبه'>
                            <Select
                                style={{width: 100}}
                                loading={loading}
                                onChange={value => setDiscountType(value)}
                                options={[
                                    {
                                        value: 'percent',
                                        label: 'درصد',
                                    },
                                    {
                                        value: 'manually',
                                        label: 'مبلغ',
                                    }
                              ]}
                            />
                            </Form.Item>
                            <Form.Item name={'discount'}
                                       label='تخفیف'>
                                {discountType === 'percent' ?
                                  <InputNumber className='w-[150px]' placeholder="تخفیف" addonAfter='%'/>
                                    :
                                  <InputNumber className='w-[150px]' placeholder="تخفیف"
                                    addonAfter={'ریال'}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                />
                                }

                            </Form.Item>
                       </Space.Compact>
                        <Form.Item name={'tax'} label={' '} valuePropName="checked" className='w-[233px] inline-block m-2'>
                              <Checkbox>مالیات لحاظ شود ؟</Checkbox>
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
                                                                                product: data.data[0].code,
                                                                                name: data.data[0].name,
                                                                                total: data.data[0].total,
                                                                                request: data.data[0].request,
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
                                            <Form.Item name={[subField.name, 'total']} rules={[{required: true}]}
                                                       label='ارزش'>
                                                <InputNumber className='w-[150px]' disabled placeholder="ارزش"
                                                    addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'amount']} rules={[{required: true}]}
                                                       label='موجودی'>
                                                <InputNumber disabled min={1} placeholder="موجودی"/>
                                            </Form.Item>
                                                  <Space.Compact>
                                                    <Form.Item name={[subField.name, 'type_increase']} rules={[{required: true}]}
                                                       label='نوع افزایش'>
                                                    <Select
                                                        style={{width: 100}}
                                                        loading={loading}
                                                        options={[
                                                            {
                                                                value: 'percent',
                                                                label: 'درصد',
                                                            },
                                                            {
                                                                value: 'manually',
                                                                label: 'مبلغ',
                                                            }
                                                        ]}
                                                    />
                                                    </Form.Item>
                                                    <Form.Item name={[subField.name, 'increase']} rules={[{required: true}]}
                                                               label='افزایش'>
                                                        {
                                                         form.getFieldValue(['products'])[subField.key]?.type_increase === 'manually' ?
                                                            <InputNumber
                                                                addonAfter="ریال"
                                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                                placeholder={'مقدار افزایش'}
                                                            />
                                                                :
                                                            <InputNumber
                                                                    addonAfter="%"
                                                                    placeholder={'مقدار افزایش'}
                                                            />
                                                        }

                                                    </Form.Item>
                                                </Space.Compact>
                                            <Form.Item name={[subField.name, 'output']} rules={[{required: true,validator: (_: any, value) => {
                                                if (value <= form.getFieldValue(['products'])[subField.key].amount) {
                                                  return Promise.resolve();
                                                }else {
                                                    return Promise.reject(new Error('عدم موجودی کافی'));
                                                }
                                              }}]}
                                                       label='تعداد'>
                                                <InputNumber min={1} placeholder="تعداد"/>
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
        <TablePrint componentPDF={componentPDF} productSub={form.getFieldValue(['products']) !== undefined ? form.getFieldValue(['products']) : []}/>
        </>
    );
};

export default RegisterSale;