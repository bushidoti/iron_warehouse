import React, {useContext, useEffect, useRef, useState} from 'react';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Button,
    ConfigProvider,
    Divider,
    Flex,
    Form,
    Image,
    Input,
    InputNumber,
    InputRef,
    message,
    Select,
    Space
} from 'antd';
import Url from "../../../api-configue";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Context} from "../../../../context";
import TablePrint from "./table";
import {useReactToPrint} from "react-to-print";





const RawProductForm: React.FC = () => {
    const [form] = Form.useForm();
    const inputRef = useRef<InputRef>(null);
    const [productName, setProductName] = useState('');
    const [productScale, setProductScale] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([{}]);
    const [allProduct, setAllProduct] = useState<any[]>([]);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const context = useContext(Context)
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const componentPDF = useRef(null);
    const onProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

    const onProductScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductScale(event.target.value);
    };


    const fetchData = async () => {
        setLoading(true)
        await axios.get(`${Url}/api/raw_material`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            return response
        }).then(async data => {
            setListProduct(data.data)
        }).then(async () => {
            return await axios.get(`${Url}/api/raw_material_detailed/?fields=product,average_rate,rate,input,output`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
            setAllProduct(data.data)
        }).then(async () => {
            return await axios.get(`${Url}/auto_increment/industrial_warehouse_rawmaterial`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
        }).then(response => {
            return response
        }).then(async data => {
            form.setFieldsValue({
                code: data.data.content,
            });
        }).then(async () => {
            return await axios.get(`${Url}/auto_increment/industrial_warehouse_rawmaterialfactor`, {
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
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        }).finally(() => setLoading(false)
        )
    }


    const addItemProduct = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        await axios.post(
            `${Url}/api/raw_material/`, {
                code: form.getFieldValue(['code']),
                name: productName,
                category: productCategory,
                scale: productScale,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
            return response
        }).then(async data => {
            if (data.status === 201) {
                message.success('اضافه شد');
                await fetchData()
                setProductCategory('')
                setProductName('')
                setProductScale('')
                e.preventDefault()
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 0)
            }
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        })
    };


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
            form.getFieldValue(['products']).map(async (product: { product: number; }, i: number) => {
                form.setFieldsValue({
                    products: {
                        [i]: {
                            afterOperator: (allProduct.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    input: any;
                                }) => a + v.input, 0))
                                - (allProduct.filter((products: {
                                    product: number;
                                }) => products.product === product.product).reduce((a: any, v: {
                                    output: any;
                                }) => a + v.output, 0)) + form.getFieldValue(['products'])[i].input,

                            average_rate: allProduct.filter((products: {
                                    product: number;
                                }) => products.product === product.product).length === 0 ? form.getFieldValue(['products'])[i].rate : ((allProduct.filter((products: {
                                    product: number;
                                }) => products.product === product.product).slice(-1)[0].average_rate)
                                + form.getFieldValue(['products'])[i].rate) / 2 ,
                        }
                    }
                });
            })
        )).then(
            form.getFieldValue(['products']).map((obj:
                                                      {
                                                          document_code: string,
                                                          ownership: string,
                                                          buyer: string,
                                                          seller: string;
                                                          seller_national_id: string;
                                                          address_seller: string;
                                                          receiver: string;
                                                          factorCode: number;
                                                          systemID: string;
                                                          operator: string;
                                                      }) => {
                obj.document_code = form.getFieldValue(['document_code'])
                obj.ownership = form.getFieldValue(['ownership'])
                obj.buyer = form.getFieldValue(['buyer'])
                obj.seller = form.getFieldValue(['seller'])
                obj.seller_national_id = form.getFieldValue(['seller_national_id'])
                obj.address_seller = form.getFieldValue(['address_seller'])
                obj.receiver = form.getFieldValue(['receiver'])
                obj.systemID =  form.getFieldValue(['FactorID'])
                obj.factorCode = form.getFieldValue(['FactorID'])
                obj.operator = 'ورود'
                return obj;
            })
        ).then(() => setLoading(true)).then(
            async () => {
                await axios.post(
                    `${Url}/api/raw_material_factor/`, {
                                factor: context.compressed,
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
                        message.success('فاکتور ثبت شد.');

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
                            return await axios.post(`${Url}/api/raw_material_detailed/`, form.getFieldValue(['products']), {
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
                                message.success('ثبت شد.');
                                generatePDF()
                                setLoading(false)

                            }
                        }
                ).then(async () => {
                        await handleResetSubmit()
                    }
                )


    };

     function scanImage() {
        if (document.readyState === "complete") {
            window.ws.send("1100");
        }
    }

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });

    return (
        <>
        <Form
            form={form}
            onFinish={onFinish}
            name="RawProductForm"
            layout={"vertical"}
            autoComplete="off"
        >
            <>
                <Form.Item>
                    <Form.Item name={'code'} className='inline-block m-2' label="کد کالای جدید">
                        <InputNumber className='w-[100px]' disabled/>
                    </Form.Item>
                    <Form.Item name={'FactorID'} className='inline-block m-2'
                               label="شماره ثبت فاکتور">
                        <InputNumber className='w-[100px]' disabled/>
                    </Form.Item>
                    <Form.Item name={['ownership']} className='w-[233px] inline-block m-2' label="نوع مالکیت"
                               rules={[{required: true}]}>
                        <Select
                            placeholder="انتخاب کنید"
                            options={[
                                {value: 'امانی', label: 'امانی'}
                                , {value: 'ثبت اولیه', label: 'ثبت اولیه'}
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name={'document_code'} className='w-[233px] inline-block m-2' label="شناسه فاکتور"
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
                            <Form.Item className='inline-block m-2' label="فایل">
                                <Space.Compact>
                                    <ConfigProvider theme={{
                                        components: {
                                            Button: {
                                                groupBorderColor: '#faad14',
                                            }
                                        }, token: {
                                            colorPrimary: '#faad14',
                                        }
                                    }}>
                                        <Button type={"primary"} onClick={scanImage} loading={loading}>اسکن</Button>
                                    </ConfigProvider>
                                    <Button type={"primary"} onClick={() => setVisible(true)}>پیش نمایش</Button>
                                </Space.Compact>
                            </Form.Item>
                            <Image
                                width={200}
                                style={{display: 'none'}}
                                src="error"
                                fallback="data:image/png;base64,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"
                                preview={{
                                    visible,
                                    src: context.compressed,
                                    onVisibleChange: (value) => {
                                        setVisible(value);
                                    },
                                }}
                            />
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
                                                                                name: data.data[0].name,
                                                                            }
                                                                        }
                                                                    });
                                                                })
                                                            })
                                                        }}
                                                        dropdownRender={(menu) => (
                                                            <>
                                                                {menu}
                                                                <Divider style={{margin: '8px 0'}}/>
                                                                <Space style={{margin: 10}}>
                                                                    <Input
                                                                        placeholder="نام کالا"
                                                                        ref={inputRef}
                                                                        value={productName}
                                                                        onChange={onProductNameChange}
                                                                    />
                                                                    <Input
                                                                        placeholder="مقایس"
                                                                        ref={inputRef}
                                                                        value={productScale}
                                                                        onChange={onProductScaleChange}
                                                                    />
                                                                </Space>
                                                                <Button type="primary" block icon={<PlusOutlined/>}
                                                                        onClick={addItemProduct}/>
                                                            </>
                                                        )}
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
                                                    addonAfter="ریال"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            </Form.Item>
                                            <Form.Item name={[subField.name, 'scale']} style={{width: 150}}
                                                       label='مقیاس'>
                                                <Input placeholder="مقیاس" disabled/>
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

export default RawProductForm;