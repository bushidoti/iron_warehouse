import React, {useEffect, useRef, useState} from 'react';
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
import Url from "../../../api-configue";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import TablePrint from "./table";
import {useReactToPrint} from "react-to-print";
import TextArea from "antd/es/input/TextArea";

const RegisterRequestProduction: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([{}]);
    const navigate = useNavigate();
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const componentPDF = useRef(null);

    const fetchData = async () => {
        setLoading(true)
        await axios.get(`${Url}/auto_increment/industrial_warehouse_requestsupply`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            return response
        }).then(async data => {
             form.setFieldsValue({
                code: data.data.content,
            });
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/no_access')
            }
        }).finally(() => setLoading(false)
        )
    }


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
            void fetchData()
            void onFocus()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])


    const handleResetSubmit = async () => {
        form.resetFields()
        await fetchData()
    }


    const onFinish = async () => {
        new Promise(resolve => resolve(
            form.getFieldValue(['products'])
        )).then(() => setLoading(true)).then(
            form.getFieldValue(['products']).map((obj:
                                                      {
                                                          output: number,
                                                          amount: number,
                                                      }, i : number) => {
                obj.output = form.getFieldValue(['products'])[i].output * form.getFieldValue(['amount'])
                return obj;
            })
        ).then(
                 async () => {
                            return await axios.post(
                    `${Url}/api/request_supply/`, {
                                applicant: form.getFieldValue(['applicant']),
                                purpose: form.getFieldValue(['purpose']),
                                amount: form.getFieldValue(['amount']),
                                raw_material_jsonData: form.getFieldValue(['products']).filter((product: { category: string; }) => product.category === 'مواد اولیه'),
                                consuming_material_jsonData: form.getFieldValue(['products']).filter((product: { category: string; }) => product.category === 'مواد مصرفی'),
                            }, {
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
                                generatePDF()
                                setLoading(false)
                            }
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
            name="Production"
            layout={"vertical"}
            autoComplete="off"
        >
            <>
                <Form.Item>
                    <Form.Item name={'code'} className='inline-block m-2' label="کد درخواست کالا">
                        <InputNumber className='w-[100px]' disabled/>
                    </Form.Item>
                     <Form.Item name={'applicant'} className='w-[233px] inline-block m-2' label="درخواست کننده"
                               rules={[{required: true}]}>
                        <Input placeholder='درخواست کننده'/>
                    </Form.Item>
                     <Form.Item name={'purpose'} className='w-[233px] inline-block m-2' label="دلیل"
                               rules={[{required: true}]}>
                        <Input placeholder='دلیل'/>
                     </Form.Item>
                    <Form.Item name={'amount'} className='w-[233px] inline-block m-2' label="تعداد"
                               rules={[{required: true}]}>
                        <InputNumber/>
                     </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Form.List name={['products']}>
                        {(subFields, subOpt) => (
                            <>
                                <Flex vertical gap={20}>
                                    {subFields.map((subField) => (
                                        <Space key={subField.key} size={20}>
                                            <Form.Item name={[subField.name, 'id']} style={{width: 300}}
                                                       label='نام کالا' rules={[{required: true}]}>
                                                <Select placeholder="انتخاب کنید"
                                                        optionFilterProp="children"
                                                        showSearch
                                                        filterOption={filterOption}
                                                        onChange={() => {
                                                            form.getFieldValue(['products']).map(async (product: {
                                                                id: number;
                                                            }, i: number) => {
                                                                await axios.get(`${Url}/api/${listProduct.filter(material => material.code === product.id)[0].category === 'مواد اولیه'  ? 'raw_material' : 'consuming_material' }/?code=${product.id}`, {
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
                                                                                purpose: form.getFieldValue(['purpose']),
                                                                                request_id: form.getFieldValue(['code']),
                                                                                applicant: form.getFieldValue(['applicant']),
                                                                                category: listProduct.filter(material => material.code === product.id)[0].category === 'مواد اولیه' ? 'مواد اولیه' : 'مواد مصرفی',
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
                                            <Form.Item name={[subField.name, 'output']} rules={[{required: true,validator: (_: any, value) => {
                                                if (value <= form.getFieldValue(['products'])[subField.key].left) {
                                                  return Promise.resolve();
                                                }else {
                                                    return Promise.reject(new Error('عدم موجودی کافی'));
                                                }
                                              }}]}
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
            <TablePrint componentPDF={componentPDF} productSub={form.getFieldValue(['products']) !== undefined ? form.getFieldValue(['products']) : []}/>
        </>
    );
};

export default RegisterRequestProduction;