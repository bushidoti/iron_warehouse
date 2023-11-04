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
                        <td colSpan={3} className="p-3 border-solid border">
                              <div className="w-full h-[40px] ">
                                <img
                                    alt=''
                                    className='object-cover float-right	 h-[50px] w-full'
                                    src={require('../../../../assets/printLogo.png')}
                                />
                           </div>
                        </td>
                        <td colSpan={3} className="ps-1 border-solid border text-center">
                            <Text className='text-[12px]' strong>
                                حواله ورود کالا به انبار
                           </Text>
                        </td>
                        <td colSpan={1} className="ps-4 border-solid border  text-right">
                               <Space size={30} direction="vertical">
                                     <Text className='text-[8px]'> شماره: {props.productSub[0]?.systemID} </Text>
                                     <Text className='text-[8px]'>تاریخ: {dayjs().locale('fa').format('DD-MM-YYYY')}</Text>
                               </Space>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5} className='text-[10px] font-extrabold'>
                                نام طرف حساب :
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5} className='border-solid border text-center font-extrabold'>
                              <Text className='text-[10px]' strong>
                                  توسط انباردار تکمیل گردد
                              </Text>
                        </td>
                        <td colSpan={2} className='border-solid border text-center font-extrabold'>
                             <Text className='text-[10px]' strong>
                                  توسط حسابداری تکمیل گردد
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">ردیف</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">کد کالا</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">نام کالا</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">تعداد کارتن</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">تعداد واحد</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">نرخ</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">مبلغ</th>
                    </tr>
                </thead>

                <tbody>
                {props.productSub.map((data, i) => (
                    <tr key={data.product}>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="row">{i+1}</th>
                        <td className='text-[12px] border-solid	border text-center font-extrabold'>{data.product}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.name}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.carton}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.input}</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data.rate}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data.rate * data.input}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    </tr>
                ))
                }
                    <tr>
                        <td colSpan={5}>
                            <Text className='text-[10px]' strong>
                              کالای فوق مطابق لیست تحویل گرفته شد.
                            </Text>
                        </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                          <Flex>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>نام تحویل گیرنده(انبار):</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>نام تحویل دهنده:</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>نام تأیید کننده(مدیریت):</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
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