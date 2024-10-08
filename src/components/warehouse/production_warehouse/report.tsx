import {SearchOutlined} from '@ant-design/icons';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Highlighter from "react-highlight-words";
import type {InputRef, TableProps} from 'antd';
import {Button, Input, Space, Table, TableColumnsType} from 'antd';
import axios from "axios";
import type {ColumnsType, ColumnType} from 'antd/es/table';
import type {FilterConfirmProps, FilterValue} from 'antd/es/table/interface';
import 'dayjs/locale/fa';
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import qs from "qs";
import {Context} from "../../../context";
import Url from "../../api-configue";

interface DataType {
    key: React.Key;
    code: number;
    index: number;
    saleFactorCode: number;
    name: string;
    amount: string;
    operator: string;
    cost: number;
    checkCode: number;
    request: number;
}



type DataIndex = keyof DataType;

interface TypeProduct {
    count:number
    results:[]
}


const ReportProductionWareHouse: React.FC = () => {
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
    const [productionDetail, setProductionDetail] = useState<any>([])
    const context = useContext(Context)

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "کالا ها",
    });

    const fetchData = async () => {
              setLoading(true)
              await axios.get(`${Url}/api/production/?size=${pagination.pageSize}&page=${pagination.current}&${qs.stringify(filteredInfo, {
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
              }).then(async () => {
                  await axios.get(`${Url}/api/production_detail`, {
                      headers: {
                          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                      }
                  }).then(response => {
                      return response
                  }).then(async data => {
                      setProductionDetail(data.data)
                  })
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
            return 'کد محصول'
        } else if (dataIndex === "name") {
            return 'نام کالا'
        } else if (dataIndex === "checkCode") {
            return 'کد حواله'
        } else if (dataIndex === "request") {
            return 'شماره سفارش'
        }
    }


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
            key: 'index',
            render: (_value, _record, index) => index + 1,
        }, {
            align: "center",
            title: 'کد محصول',
            dataIndex: 'code',
            fixed: "left",
            key: 'code',
            ...getColumnSearchProps('code'),
            filteredValue: filteredInfo.code || null,
        }, {
            align: "center",
            title: 'نام کالا',
            dataIndex: 'name',
            fixed: "left",
            key: 'name',
            ...getColumnSearchProps('name'),
            filteredValue: filteredInfo.name || null,
        }, {
            align: "center",
            title: 'موجودی',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            align: "center",
            title: 'ارزش',
            dataIndex: 'cost',
            key: 'cost',
        }, {
            align: "center",
            title: 'شماره حواله',
            dataIndex: 'checkCode',
            key: 'checkCode',
            ...getColumnSearchProps('checkCode'),
            filteredValue: filteredInfo.checkCode || null,
        }, {
            align: "center",
            title: 'شماره درخواست',
            dataIndex: 'request',
            key: 'request',
            ...getColumnSearchProps('request'),
            filteredValue: filteredInfo.request || null,
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




     const expandedRowRender = (record: any) => {
        const columns: TableColumnsType<DataType> = [
          { title: 'ردیف', dataIndex: 'index', key: 'index', render: (_value, _record, index) => index + 1 },
          { title: 'شماره حواله', dataIndex: 'checkCode', key: 'checkCode' },
          { title: 'شماره فاکتور فروش', dataIndex: 'saleFactorCode', key: 'saleFactorCode' },
          { title: 'تعداد', dataIndex: 'amount', key: 'amount' },
        ];
        return <Table rowKey="id" columns={columns} dataSource={productionDetail.filter((product: {
            operator: string;
            product: number;
        }) => product.product === record.code)} pagination={false} />;
      };

    return (
        <>
            <Space style={{marginBottom: 16}}>
                <Button onClick={clearFilters}>پاک کردن فیتلر ها</Button>
                <Button onClick={clearAll}>پاک کردن فیلتر و مرتب کننده ها</Button>
                <Button onClick={generatePDF}>چاپ</Button>
                <Space.Compact>
                    <Input placeholder={'شناسه مدرک'} onChange={(e) => {
                            context.setCurrentProductCheck(Number(e.target.value))
                    }}/>
                    <Button type={"primary"} loading={loading} onClick={() => {
                            navigate(`/warehouse/industrial_warehouse/check/${context.currentProductCheck}`)
                    }}>مشاهده</Button>
                </Space.Compact>
            </Space>
            <Table
                bordered
                columns={columns}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={productSub?.results}
                tableLayout={"fixed"}
                scroll={{y: '60vh'}}
                rowKey="code"
                onChange={handleChange}
                loading={loading}
                pagination={{position: ["bottomCenter"],total:productSub?.count,showSizeChanger:true}}
            />
        </>
    )
};

export default ReportProductionWareHouse;