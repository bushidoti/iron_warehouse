import {SearchOutlined} from '@ant-design/icons';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Highlighter from "react-highlight-words";
import type {InputRef, TableProps} from 'antd';
import {Badge, Button, Input, Select, Space, Table, Tooltip} from 'antd';
import axios from "axios";
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import 'dayjs/locale/fa';
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import qs from "qs";
import TablePrint from "../ptrint_table/table_print_digital";
import FactorSearchBar from "../factor_searchbar";
import {Context} from "../../../../context";
import Url from "../../../api-configue";

interface DataType {
    key: React.Key;
    code: number;
    factorCode: number;
    category: number;
    name: number;
    property_number: number;
    document_code: number;
    case: string;
    movement_status: string;
    hdd: string;
    model: string;
    power: string;
    phone_feature: string;
    ram: string;
    motherboard: string;
    cpu: string;
    movement_message: string;
    sub_item_type: string;
    install_location: string;
}


type DataIndex = keyof DataType;

interface TypeProduct {
    count:number
    results:[]
}


const DigitalFurnitureTable: React.FC = () => {
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
    const [property, setProperty] = useState<TypeProduct>()
    const context = useContext(Context)
    const [filteredColumns, setFilteredColumns] = useState<string[]>(['case','hdd','power','phone_feature','ram','motherboard','cpu','sub_item_type'])

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });

    const fetchData = async () => {
       setLoading(true)
        await axios.get(`${Url}/api/property/?size=${pagination.pageSize}&page=${pagination.current}&fields=code,movement_status,category,factorCode,name,property_number,document_code,case,hdd,model,power,phone_feature,ram,install_location,motherboard,cpu,sub_item_type,movement_message&${qs.stringify(filteredInfo, {
                encode: false,
                arrayFormat: 'comma'
            })}&category=${context.currentPropertyTable}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            }).then(response => {
            return response
        }).then(async data => {
            setProperty(data.data)
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
        [JSON.stringify(filteredInfo),pagination,context.currentPropertyTable])

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

        if (dataIndex === "document_code") {
            return 'شناسه فاکتور'
        } else if (dataIndex === "name") {
            return 'نام اموال'
        } else if (dataIndex === "model") {
            return 'مدل'
        } else if (dataIndex === "property_number") {
            return 'شماره اموال'
        } else if (dataIndex === "factorCode") {
            return 'شماره ثبت سیستم'
        } else if (dataIndex === "code") {
            return 'کد اموال'
        } else if (dataIndex === "install_location") {
            return 'محل نصب'
        }
    }


    const onChange = (value: string[]) => {
        setFilteredColumns(value as string[])
    };


    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>

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
            width: '3%',
            key: 'index',
             render: (_value, record, index) =>
                <>
                    {(() => {
                        if (record.movement_status === 'ارسال شده') {
                            return (
                                <Tooltip title={record.movement_message}>
                                    <Space>
                                        <Badge color="red" status="processing"/> {index + 1}
                                    </Space>
                                </Tooltip>
                            )
                        }else if (record.movement_status === 'دریافت شد') {
                            return (
                                <Tooltip title={record.movement_message}>
                                    <Space>
                                        <Badge color="green" status="processing"/> {index + 1}
                                    </Space>
                                </Tooltip>
                            )
                        }  else {
                            return index + 1
                        }
                    })()}
                </>
        }, {
            align: "center",
            title: 'کد اموال',
            dataIndex: 'code',
            fixed: "left",
            width: '3%',
            key: 'code',
            ...getColumnSearchProps('code'),
            filteredValue: filteredInfo.code || null,
            render: (_value, record) => <Button disabled={record.movement_status === 'ارسال شده'} type={"link"} onClick={() => {
                context.setCurrentProperty(record.code)
                navigate(`/property/digital-furniture/edit/${record.code}`)
             }}>{record.code}</Button>,
        }, {
            align: "center",
            title: 'نام اموال',
            dataIndex: 'name',
            fixed: "left",
            width: '3%',
            key: 'name',
            ...getColumnSearchProps('name'),
            filteredValue: filteredInfo.name || null,
        }, {
            align: "center",
            title: 'دسته',
            dataIndex: 'category',
            width: '3%',
            key: 'category',
        }, {
            align: "center",
            title: 'نوع دستگاه',
            dataIndex: 'sub_item_type',
            width: '3%',
            key: 'sub_item_type',
        }, {
            align: "center",
            title: 'شماره اموال',
            dataIndex: 'property_number',
            width: '3%',
            key: 'property_number',
            ...getColumnSearchProps('property_number'),
            filteredValue: filteredInfo.property_number || null,
        }, {
            align: "center",
            title: 'شماره ثبت سیستم',
            dataIndex: 'factorCode',
            width: '3%',
            key: 'factorCode',
            ...getColumnSearchProps('factorCode'),
            filteredValue: filteredInfo.factorCode || null,
        }, {
            align: "center",
            title: 'شناسه فاکتور',
            dataIndex: 'document_code',
            width: '3%',
            key: 'document_code',
            ...getColumnSearchProps('document_code'),
            filteredValue: filteredInfo.document_code || null,
        }, {
            align: "center",
            title: 'مدل',
            dataIndex: 'model',
            width: '3%',
            key: 'model',
            ...getColumnSearchProps('model'),
            filteredValue: filteredInfo.model || null,
        }, {
            align: "center",
            title: 'کیس',
            dataIndex: 'case',
            width: '3%',
            key: 'case',
        }, {
            align: "center",
            title: 'هارد',
            dataIndex: 'hdd',
            width: '3%',
            key: 'hdd',

        }, {
            align: "center",
            title: 'پاور',
            dataIndex: 'power',
            width: '3%',
            key: 'power',

        }, {
            align: "center",
            title: 'رم',
            dataIndex: 'ram',
            width: '3%',
            key: 'ram',

        }, {
            align: "center",
            title: 'پردازنده',
            dataIndex: 'cpu',
            width: '3%',
            key: 'cpu',

        }, {
            align: "center",
            title: 'مادربرد',
            dataIndex: 'motherboard',
            width: '3%',
            key: 'motherboard',

        }, {
            align: "center",
            title: 'ویژگی تلفن',
            dataIndex: 'phone_feature',
            width: '3%',
            key: 'phone_feature',

        }, {
            align: "center",
            title: 'محل نصب',
            dataIndex: 'install_location',
            width: '3%',
            key: 'install_location',
            ...getColumnSearchProps('install_location'),
            filteredValue: filteredInfo.install_location || null,
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
        {label: 'دسته', value: 'category'},
        {label: 'شماره اموال', value: 'property_number'},
        {label: 'شماره ثبت سیستم', value: 'factorCode'},
        {label: 'شناسه فاکتور', value: 'document_code'},
        {label: 'کیس', value: 'case'},
        {label: 'هارد', value: 'hdd'},
        {label: 'پاور', value: 'power'},
        {label: 'رم', value: 'ram'},
        {label: 'پردازنده', value: 'cpu'},
        {label: 'نوع دستگاه', value: 'sub_item_type'},
        {label: 'مادربرد', value: 'motherboard'},
        {label: 'ویژگی تلفن', value: 'phone_feature'},
        {label: 'محل نصب', value: 'install_location'},
    ];




    return (
        <>
            <Space className='mt-2' style={{marginBottom: 16}}>
                <Badge color="red" status="processing" text="به معنی ارسال شده"/>
                <Button onClick={clearFilters}>پاک کردن فیتلر ها</Button>
                <Button onClick={clearAll}>پاک کردن فیلتر و مرتب کننده ها</Button>
                <Button onClick={generatePDF}>چاپ</Button>
                <Space.Compact>
                     <FactorSearchBar/>
                    <Button type={"primary"} loading={loading} disabled={context.currentPropertyFactor === 0} onClick={() => {
                            navigate(`/property/factor/${context.currentPropertyFactor}`)
                    }}>مشاهده</Button>
                </Space.Compact>
            </Space>
            <Space style={{marginBottom: 16, marginRight: 16}}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: 400}}
                    maxTagCount={2}
                    defaultValue={['case','hdd','power','phone_feature','ram','motherboard','cpu','sub_item_type']}
                    placeholder="ستون هایی که میخواهید نمایش داده نشود انتخاب کنید."
                    onChange={onChange}
                    options={options}
                />
            </Space>
            <Table
                bordered
                columns={columns.filter(col => !filteredColumns.includes(col.key as string))}
                dataSource={property?.results}
                tableLayout={"fixed"}
                scroll={{x: 2500, y: '60vh'}}
                rowKey="code"
                onChange={handleChange}
                loading={loading}
                pagination={{position: ["bottomCenter"],total:property?.count,showSizeChanger:true}}
            />
            <TablePrint componentPDF={componentPDF} property={property !== undefined ? property?.results : []}/>
        </>
    )
};

export default DigitalFurnitureTable;