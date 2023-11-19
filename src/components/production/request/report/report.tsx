import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from "react-highlight-words";
import type {InputRef, TableProps} from 'antd';
import {Badge, Button, Input, Popconfirm, Select, Space, Table , message} from 'antd';
import axios from "axios";
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import Url from "../../../api-configue";
import 'dayjs/locale/fa';
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import TablePrint from "./table";
import qs from "qs";
import {DatePicker as DatePickerJalali, JalaliLocaleListener} from "antd-jalali";
import dayjs from "dayjs";
import { QuestionCircleOutlined } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    id: number;
    index: number;
    which_request: number;
    supplement: boolean;
    is_delivered: boolean;
    date: string;
    purpose: string;
    applicant: string;
    raw_material_jsonData: JSON;
    consuming_material_jsonData: JSON;
}



type DataIndex = keyof DataType;

interface TypeProduct {
    count:number
    results:[]
}


const ReportRequestProduction: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [pagination, setPagination] = useState<any>({
        current:1,
        pageSize:10
    })
    const [loading, setLoading] = useState<boolean>();
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const navigate = useNavigate();
    const componentPDF = useRef(null);
    const [productSub, setProductSub] = useState<TypeProduct>()
    const [requestProductTable, setRequestProductTable] = useState<number>(0)
    const [filteredColumns, setFilteredColumns] = useState<string[]>([])
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });


    const fetchData = async () => {
                    setLoading(true)
                    await axios.get(`${Url}/api/request_supply/?size=${pagination.pageSize}&page=${pagination.current}&${qs.stringify(filteredInfo, {
                        encode: false,
                        arrayFormat: 'comma'
                    })}`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }
                    }).then(response => {
                        return response
                    }).then(async data => {
                        setProductSub(data.data)
                    }).finally(() => {
                        setLoading(false)
                    }).catch((error) => {
                        if (error.request.status === 403) {
                            navigate('/no_access')
                        }
                    })
    }

    useEffect(() => {
            void fetchData()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(filteredInfo),pagination])

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const handleSearchPlaceHolder = (dataIndex: DataIndex) => {

       if (dataIndex === "applicant") {
            return 'درخواست کننده'
        } else if (dataIndex === "purpose") {
            return 'درخواست کننده'
        } else if (dataIndex === "id") {
            return 'شماره درخواست'
        } else if (dataIndex === "which_request") {
            return 'شماره متمم سفارش مربوطه'
        }
    }


    const onChange = (value: string[]) => {
        setFilteredColumns(value as string[])
    };


    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>


                {dataIndex === "date" ?
                    <>
                        <JalaliLocaleListener/>
                        <DatePickerJalali
                            onChange={function (dateString: string) {
                                setSelectedKeys(dayjs(dateString).locale('fa').format('YYYY-MM-DD') ? [dayjs(dateString).locale('fa').format('YYYY-MM-DD')] : [])
                            }}
                            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        />
                    </>

                    :
                    <Input
                        ref={searchInput}
                        placeholder={`جستجو ${handleSearchPlaceHolder(dataIndex)}`}
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                }


                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        جستجو
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        تنظیم مجدد
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        فیلتر
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        بستن
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            align: "center",
            title: 'ردیف',
            dataIndex: 'index',
            fixed: "left",
            width: '.5%',
            key: 'index',
            render: (_value, _record, index) => index + 1,
        }, {
            align: "center",
            title: 'شماره درخواست',
            dataIndex: 'id',
            width: '1%',
            fixed: "left",
            key: 'id',
            ...getColumnSearchProps('id'),
            filteredValue: filteredInfo.id || null,
            render: (_value, record) => <Button type={"link"} onClick={async () => {
                const promise1 = Promise.resolve(record.id);
                promise1.then((value) => {
                    setRequestProductTable(value)

                }).then(
                    generatePDF
                )

            }}>{record.id}</Button>,
        }, {
            align: "center",
            title: 'درخواست کننده',
            dataIndex: 'applicant',
            width: '1%',
            key: 'applicant',
            ...getColumnSearchProps('applicant'),
            filteredValue: filteredInfo.applicant || null,
        }, {
            align: "center",
            title: 'دلیل',
            dataIndex: 'purpose',
            width: '1%',
            key: 'purpose',
            ...getColumnSearchProps('purpose'),
            filteredValue: filteredInfo.purpose || null,
        }, {
            align: "center",
            title: 'تاریخ',
            dataIndex: 'date',
            width: '1%',
            key: 'date',
            ...getColumnSearchProps('date'),
            filteredValue: filteredInfo.date || null,
        }, {
            align: "center",
            title: 'متمم برای ادامه سفارش',
            dataIndex: 'supplement',
            width: '1%',
            key: 'supplement',
            render: (_value, record) => record.supplement ?
                <Badge color="red" status="processing"/> :  <Badge color="red" status="processing"/>
        }, {
            align: "center",
            title: 'متمم سفارش مربوطه',
            dataIndex: 'which_request',
            width: '1%',
            key: 'which_request',
            ...getColumnSearchProps('which_request'),
            filteredValue: filteredInfo.which_request || null,
        }, {
            align: "center",
            title: 'وضعیت تحویل',
            dataIndex: 'is_delivered',
            width: '1%',
            key: 'is_delivered',
            render: (_value, record) => record.is_delivered ?
                <Badge color="red" status="processing"/> :  <Badge color="red" status="processing"/>
        }, {
            align: "center",
            title: 'عملیات',
            dataIndex: 'operator',
            width: '1%',
            fixed: "right",
            key: 'operator',
            render: (_value, record) => {
                return (
                    <Space>
                        <Popconfirm
                            title="رد کردن کالا"
                            description="آیا از رد کردن کالا و حذف مطمئنید ؟"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={async () => {
                                await axios.delete(`${Url}/api/request_supply/${record.id}/`, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                    }
                                }).then(response => {
                                    return response
                                }).then(async data => {
                                    if (data.status === 204) {
                                        message.error('رد شد');
                                        await fetchData()
                                    }
                                })
                            }}
                            okText="بله"
                            cancelText="خیر"
                         >
                            <Button disabled={record.is_delivered} htmlType={"button"} danger type={"primary"}>رد</Button>
                        </Popconfirm>
                          <Popconfirm
                            title="دریافت کالا"
                            description="آیا از صحت اطلاعات و دریافت کالا مطمئنید ؟"
                            onConfirm={async () => {
                                await axios.put(`${Url}/api/request_supply/${record.id}/`, {
                                    is_delivered: true,
                                }, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                    }
                                }).then(response => {
                                    return response
                                }).then(async data => {
                                    if (data.status === 200) {
                                        message.success('دریافت شد');
                                        await fetchData()
                                    }
                                })
                            }}
                          >
                           <Button disabled={record.is_delivered}  htmlType={"button"} type={"primary"}>تایید</Button>
                      </Popconfirm>
                    </Space>
                )
            }
        }
    ];

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
    };

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
        setFilteredInfo(filters);
        setPagination(pagination);
    };


    const options = [
        {label: 'درخواست کننده', value: 'applicant'},
        {label: 'دلیل', value: 'purpose'},
        {label: 'تاریخ', value: 'date'},
        {label: 'وضعیت تحویل', value: 'is_delivered'},
        {label: 'متمم برای ادامه سفارش', value: 'supplement'},
        {label: 'متمم سفارش مربوطه', value: 'which_request'},
    ];

    return (
        <>
            <Space style={{marginBottom: 16}}>
                <Button onClick={clearFilters}>پاک کردن فیتلر ها</Button>
                <Button onClick={clearAll}>پاک کردن فیلتر و مرتب کننده ها</Button>
            </Space>
            <Space style={{marginBottom: 16, marginRight: 16}}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: 400}}
                    maxTagCount={2}
                    placeholder="ستون هایی که میخواهید نمایش داده نشود انتخاب کنید."
                    onChange={onChange}
                    options={options}
                />
            </Space>
            <Table
                bordered
                columns={columns.filter(col => !filteredColumns.includes(col.key as string))}
                dataSource={productSub?.results}
                tableLayout={"fixed"}
                scroll={{x: 1600, y: '60vh'}}
                rowKey="id"
                onChange={handleChange}
                loading={loading}
                pagination={{position: ["bottomCenter"],total:productSub?.count,showSizeChanger:true}}
            />
             <TablePrint componentPDF={componentPDF}  productSub={productSub !== undefined ? productSub?.results : []}  filterable={requestProductTable}/>
        </>
    )
};

export default ReportRequestProduction;