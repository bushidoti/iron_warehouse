import {SearchOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from 'react';
import Highlighter from "react-highlight-words";
import type {InputRef, TableProps} from 'antd';
import { Button, Input, Space, Table, TableColumnsType} from 'antd';
import axios from "axios";
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import 'dayjs/locale/fa';
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {DatePicker as DatePickerJalali, JalaliLocaleListener} from "antd-jalali";
import dayjs from "dayjs";
import Url from "../../api-configue";
import TablePrint from "./table";
import {useReactToPrint} from "react-to-print";

interface DataType {
    key: React.Key;
    code: number;
    index: number;
    tax: number;
    discount: number;
    total: number;
    output: number;
    date: string;
    jsonData: any[];
}

interface ExpandedDataType {
  key: React.Key;
  code: number;
  increase: number;
  name: string;
  type_increase: string;
  total: number;
  output: string;
}

type DataIndex = keyof DataType;

interface TypeProduct {
    count:number
    results:DataType[]
}


const ReportSale: React.FC = () => {
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
    const [productSub, setProductSub] = useState<TypeProduct>()
    const componentPDF = useRef(null);
    const [factorTable, setFactorTable] = useState<number>(0)


    const fetchData = async () => {
            setLoading(true)
            await axios.get(`${Url}/api/sale_factor/?size=${pagination.pageSize}&page=${pagination.current}&${qs.stringify(filteredInfo, {
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
        if (dataIndex === "code") {
            return 'شماره فاکتور فروش'
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
            title: 'شناسه فاکتور فروش',
            dataIndex: 'code',
            fixed: "left",
            key: 'code',
            ...getColumnSearchProps('code'),
            filteredValue: filteredInfo.code || null,
            render: (_value, record) => <Button type={"link"} onClick={async () => {
                const promise1 = Promise.resolve(record.code);
                promise1.then((value) => {
                    setFactorTable(value)

                }).then(
                    generatePDF
                )

            }}>{record.code}</Button>,
        }, {
            align: "center",
            title: 'تاریخ',
            dataIndex: 'date',
            fixed: "left",
            key: 'date',
            ...getColumnSearchProps('date'),
            filteredValue: filteredInfo.date || null,
        }, {
            align: "center",
            title: 'ارزش محصولات',
            dataIndex: 'tax',
            key: 'tax',
            render: (value, record) => `${record.jsonData[0].totalFactor}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }, {
            align: "center",
            title: 'مالیات',
            dataIndex: 'tax',
            key: 'tax',
            render: (value, record) => `${record.tax}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        }, {
            align: "center",
            title: 'تخفیف',
            dataIndex: 'discount',
            key: 'discount',
            render: (value, record) => `${record.discount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }, {
            align: "center",
            title: 'جمع کل',
            dataIndex: 'total',
            key: 'total',
            render: (value, record) => `${record.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
          { title: 'کد کالا', dataIndex: 'product', key: 'product' },
          { title: 'نام کالا', dataIndex: 'name', key: 'name' },
          { title: 'تعداد', dataIndex: 'output', key: 'output' },
          { title: 'افزایش', dataIndex: 'increase', key: 'increase',
            render: (value, record) => `${record.type_increase === 'percent' ? ` ${record.increase} درصد ` : `${`${record.increase}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ریال `}`},
          { title: 'جمع', dataIndex: 'total', key: 'total',
          render: (value, record) => `${record.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
},
        ];
        return <Table rowKey="code" columns={columns} dataSource={productSub?.results[i].jsonData} pagination={false} />;
      };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });

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
                scroll={{ y: '60vh'}}
                rowKey="code"
                onChange={handleChange}
                loading={loading}
                pagination={{position: ["bottomCenter"],total:productSub?.count,showSizeChanger:true}}
            />
             <TablePrint componentPDF={componentPDF}  productSub={productSub !== undefined ? productSub?.results : []}  filterable={factorTable}/>
        </>
    )
};

export default ReportSale;