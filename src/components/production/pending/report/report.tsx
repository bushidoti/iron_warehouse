import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from "react-highlight-words";
import type {InputRef, TableProps} from 'antd';
import { Button, Input, Popconfirm, Space, Table, message, TableColumnsType, Progress} from 'antd';
import axios from "axios";
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import Url from "../../../api-configue";
import 'dayjs/locale/fa';
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import qs from "qs";
import {DatePicker as DatePickerJalali, JalaliLocaleListener} from "antd-jalali";
import dayjs from "dayjs";
import TablePrint from "./table";

interface DataType {
    key: React.Key;
    id: number;
    request: number;
    index: number;
    amount: number;
    which_request: number;
    output: number;
    supplement: boolean;
    status: string;
    date: string;
    purpose: string;
    applicant: string;
    raw_material_jsonData: any[];
    consuming_material_jsonData: any[];
}

interface ExpandedDataType {
  key: React.Key;
  id: number;
  scale: string;
  name: string;
  request_id: number;
  average_rate: number;
  category: string;
  applicant: string;
  description: string;
  purpose: string;
  output: string;
}

type DataIndex = keyof DataType;

interface TypeProduct {
    count:number
    results:DataType[]
}


const ReportPendingProduction: React.FC = () => {
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
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });

    const fetchData = async () => {
            setLoading(true)
            await axios.get(`${Url}/api/pending_produce/?size=${pagination.pageSize}&page=${pagination.current}&${qs.stringify(filteredInfo, {
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
            key: 'index',
            render: (_value, _record, index) => index + 1,
        }, {
            align: "center",
            title: 'شماره درخواست',
            dataIndex: 'request',
            fixed: "left",
            key: 'request',
            ...getColumnSearchProps('request'),
            filteredValue: filteredInfo.request || null,
            render: (_value, record) => <Button type={"link"} onClick={async () => {
                const promise1 = Promise.resolve(record.request);
                promise1.then((value) => {
                    setRequestProductTable(value)
                }).then(
                    generatePDF
                )

            }}>{record.request}</Button>,
        }, {
            align: "center",
            title: 'دلیل',
            dataIndex: 'purpose',
            key: 'purpose',
            ...getColumnSearchProps('purpose'),
            filteredValue: filteredInfo.purpose || null,
        }, {
            align: "center",
            title: 'تعداد',
            dataIndex: 'amount',
            key: 'amount',
            ...getColumnSearchProps('purpose'),
            filteredValue: filteredInfo.purpose || null,
        }, {
            align: "center",
            title: 'تاریخ',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
            filteredValue: filteredInfo.date || null,
        }, {
            align: "center",
            title: 'وضعیت تولید',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'تولید شده',
                    value: 'تولید شده',
                }, {
                    text: 'در حال تولید',
                    value: 'در حال تولید',
                }
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status === value,
            render: (_value, record) =>  <Progress percent={record.status === 'تولید شده' ? 100 : 50} size="small" status={record.status === 'تولید شده' ? 'success' : 'active'} />
        }, {
            align: "center",
            title: 'عملیات',
            dataIndex: 'operator',
            fixed: "right",
            key: 'operator',
            render: (_value, record) => {
                return (
                    <Space>
                          <Popconfirm
                            title="دریافت کالا"
                            description="آیا از صحت اطلاعات و دریافت کالا مطمئنید ؟"
                            onConfirm={async () => {
                                await axios.put(`${Url}/api/pending_produce/${record.id}/`, {
                                    status: 'تولید شده',
                                }, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                    }
                                }).then(response => {
                                    return response
                                }).then(async data => {
                                    if (data.status === 200) {
                                        message.success('تولید شد');
                                        await fetchData()
                                    }
                                }).catch((error) => {
                                    if (error.request.status === 403) {
                                        navigate('/no_access')
                                    }
                                }).then(async () => {
                                    await axios.post(`${Url}/api/production/`, {
                                        request: record.request,
                                        raw_material_jsonData: record.raw_material_jsonData,
                                        consuming_material_jsonData: record.consuming_material_jsonData,
                                        name: record.purpose,
                                        cost: record.consuming_material_jsonData.reduce((a: number, v: { average_rate: number; output: number;  amount: number;  }) => a + (v?.average_rate * (v?.output / v?.amount)), 0) + record.raw_material_jsonData.reduce((a: number, v: { average_rate: number; output: number;  amount: number;  }) => a + (v?.average_rate * (v?.output / v?.amount)), 0),
                                        amount: record.amount,
                                        operator: 'ورود',
                                    }, {
                                        headers: {
                                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                        }
                                    }).then(response => {
                                        return response
                                    }).then(async data => {
                                        if (data.status === 201) {
                                            message.success('محصول تولیده شده به انبار محصول انتقال یافت');
                                            await fetchData()
                                        }
                                    })
                                })
                            }}
                          >
                           <Button disabled={record.status === 'تولید شده'}  htmlType={"button"} type={"primary"}>تایید</Button>
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


      const expandedRowRender = (record: any, i: number) => {
        const columns: TableColumnsType<ExpandedDataType> = [
          { title: 'ردیف', dataIndex: 'index', key: 'index', render: (_value, _record, index) => index + 1 },
          { title: 'کد کالا', dataIndex: 'id', key: 'id' },
          { title: 'نام کالا', dataIndex: 'name', key: 'name' },
          { title: 'دسته', dataIndex: 'category', key: 'category' },
          { title: 'تعداد', dataIndex: 'output', key: 'output' },
          { title: 'مقیاس', dataIndex: 'scale', key: 'scale' },
          { title: 'ارزش', dataIndex: 'average_rate', key: 'average_rate',render:(_value, record) => `${record.average_rate}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') },
          { title: 'توضیحات', dataIndex: 'description', key: 'description' },
        ];
        return <Table rowKey="id" columns={columns} dataSource={productSub?.results[i].raw_material_jsonData.concat(productSub?.results[i].consuming_material_jsonData)} pagination={false} />;
      };

    return (
        <>
            <Space style={{marginBottom: 16}}>
                <Button onClick={clearFilters}>پاک کردن فیتلر ها</Button>
                <Button onClick={clearAll}>پاک کردن فیلتر و مرتب کننده ها</Button>
            </Space>
            <Table
                bordered
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                columns={columns}
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

export default ReportPendingProduction;