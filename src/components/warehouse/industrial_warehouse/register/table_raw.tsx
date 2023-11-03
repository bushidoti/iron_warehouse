import React from "react";
import dayjs from "dayjs";
import {Flex, Space, Typography} from 'antd';
const { Text } = Typography;
const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    productSub: any[],
}) => {
    return (
        <div style={{display: 'none'}}>
            <table
                className="w-[793.7007874px] max-h-[559.37007874px] border-collapse border"
                ref={props.componentPDF} style={{direction: 'rtl', fontSize: '.56vw'}}>
                <thead>
                    <tr>
                        <td colSpan={1} className='p-1 border-solid border text-center'>
                                گروه تولیدی صنعتی
                        </td>
                        <td colSpan={5} className='p-1 border-solid border text-center'>
                           <Text className='text-[10px]' strong>
                                حواله ورود کالا به انبار
                           </Text>
                        </td>
                        <td colSpan={1} className='p-1 border-solid border'>
                            <Space size={2} direction="vertical">
                                 <Text className='text-[8px]'> شماره: {props.productSub[0]?.systemID} </Text>
                                 <Text className='text-[8px]'>تاریخ: {dayjs().locale('fa').format('DD-MM-YYYY')}</Text>
                            </Space>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5}>
                                نام طرف حساب :
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5} className='border-solid border text-center'>
                              <Text className='text-[7px]' strong>
                                  توسط انباردار تکمیل گردد
                              </Text>
                        </td>
                        <td colSpan={2} className='border-solid border text-center'>
                             <Text className='text-[7px]' strong>
                                  توسط حسابداری تکمیل گردد
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <th className='border-solid	border' scope="col">ردیف</th>
                        <th className='border-solid	border' scope="col">کد کالا</th>
                        <th className='border-solid	border' scope="col">نام کالا</th>
                        <th className='border-solid	border' scope="col">تعداد کارتن</th>
                        <th className='border-solid	border' scope="col">تعداد واحد</th>
                        <th className='border-solid	border' scope="col">نرخ</th>
                        <th className='border-solid	border' scope="col">مبلغ</th>
                    </tr>
                </thead>

                <tbody>
                {props.productSub.map((data, i) => (
                    <tr key={data.id}>
                        <th className='border-solid	border' scope="row">{i+1}</th>
                        <td className='border-solid	border text-center'>{data.product}</td>
                        <td className='border-solid	border text-center'>{data.name}</td>
                        <td className='border-solid	border text-center'>{data.carton}</td>
                        <td className='border-solid	border text-center'>{data.input}</td>
                        <td className='border-solid	border text-center'>{data.rate}</td>
                        <td className='border-solid	border text-center'>{data.rate * data.input}</td>
                    </tr>
                ))
                }
                    <tr>
                        <td colSpan={5}>
                            <Text className='text-[10px]' strong>
                              کالای فوق مطابق لیست تجویل گرفته شد.
                            </Text>
                        </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                          <Flex>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[8px]'>نام تحویل گیرنده(انبار):</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-4 me-2"><Text className='text-[8px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[8px]'>نام تحویل دهنده:</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-4 me-2"><Text className='text-[8px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[8px]'>نام تأیید کننده(مدیریت):</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-4 me-2"><Text className='text-[8px]'>امضاء</Text></div>
                             </div>
                          </Flex>
                      </td>
                    </tr>
                    <tr>
                        <td className='h-[1px]' colSpan={7}>
                            <Space size={10} direction="horizontal">
                                 <Text className='text-[10px]'>توزیع نسخه:</Text>
                                 <Text className='text-[10px]'>سفید: انبار</Text>
                                 <Text className='text-[10px]'>سبز: حسابداری</Text>
                                 <Text className='text-[10px]'>زرد: تحویل دهنده</Text>
                            </Space>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablePrint;