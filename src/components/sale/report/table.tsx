import React from "react";
import {Flex, Space, Typography} from 'antd';
import dayjs from "dayjs";
const { Text } = Typography;



const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    productSub: any[],
    filterable: number

}) => {
    return (
        <div style={{display: 'none'}}>
            <table
                className="w-[793.7007874px] max-h-[559.37007874px] border-collapse border"
                ref={props.componentPDF} style={{direction: 'rtl', fontSize: '.56vw'}}>
                <thead>
                <tr>
                        <th colSpan={3} className="p-3 border-solid border">
                              <div className="w-full h-[62px] ">
                                <img
                                    alt=''
                                    className='object-cover float-right	 h-[65px] w-full'
                                    src={require('../../../assets/printLogo.png')}
                                />
                              </div>
                        </th>
                        <th colSpan={3} className="ps-1 border-solid border text-center">
                            <Text className='text-[12px]' strong>
                                صورت حساب فروش کالا و خدمات
                           </Text>
                        </th>
                        <th colSpan={1} className="ps-4 border-solid border text-right">
                               <Space size={10} direction="vertical">
                                     <Text className='text-[12px] font-extrabold'> شناسه فاکتور: {props.productSub[0]?.saleFactorCode} </Text>
                                     <Text className='text-[12px] font-extrabold'>تاریخ : {dayjs().locale('fa').format('DD-MM-YYYY')}</Text>
                               </Space>
                        </th>
                    </tr>
                   <tr>
                        <th colSpan={7} className='border-solid border text-center font-extrabold'>
                              <Text className='text-[10px]' strong>
                                  مشخصات فروشنده
                              </Text>
                        </th>
                    </tr>
                   <tr>
                        <th colSpan={2} className='text-[10px] text-right  font-extrabold'>نام فروشنده : زینلی</th>
                        <th colSpan={2} className='text-[10px] text-right font-extrabold'>شماره اقتصادی : 45545155454</th>
                        <th colSpan={3} className='text-[10px] text-right font-extrabold'>شماره ثبت / ملی : 544554554</th>
                   </tr>
                  <tr>
                        <th colSpan={2} className='text-[10px] text-right font-extrabold'>شناسه ملی : 1520505140</th>
                        <th colSpan={2} className='text-[10px] text-right font-extrabold'>کد پستی : 1781783447</th>
                        <th colSpan={3} className='text-[10px] text-right font-extrabold'>فکس : 454512545</th>
                   </tr>
                  <tr>
                        <th colSpan={4} className='text-[10px] text-right font-extrabold'>نشانی : شاطره خیابان رجایی </th>
                        <th colSpan={3} className='text-[10px] text-right font-extrabold'>تلفن : 33229928</th>
                   </tr>
                   <tr>
                        <th colSpan={7} className='border-solid border text-center font-extrabold'>
                              <Text className='text-[10px]' strong>
                                  مشخصات خریدار
                              </Text>
                        </th>
                    </tr>
                      <tr>
                            <th colSpan={2} className='text-[10px] text-right  font-extrabold'>نام خریدار : {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData[0].buyer}</th>
                            <th colSpan={2} className='text-[10px] text-right font-extrabold'>شماره اقتصادی : </th>
                            <th colSpan={3} className='text-[10px] text-right font-extrabold'>شماره ثبت / ملی : </th>
                       </tr>
                      <tr>
                            <th colSpan={2} className='text-[10px] text-right font-extrabold'>شناسه ملی : {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData[0].buyer_national_id}</th>
                            <th colSpan={2} className='text-[10px] text-right font-extrabold'>کد پستی : </th>
                            <th colSpan={3} className='text-[10px] text-right font-extrabold'>فکس : </th>
                       </tr>
                      <tr>
                            <th colSpan={4} className='text-[10px] text-right font-extrabold'>نشانی : {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData[0].address_buyer} </th>
                            <th colSpan={3} className='text-[10px] text-right font-extrabold'>تلفن : {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData[0].phone_buyer}</th>
                       </tr>
                    <tr>
                        <th colSpan={7} className='border-solid border text-center font-extrabold'>
                              <Text className='text-[10px]' strong>
                                  مشخصات کالا یا خدمات مورد معامله
                              </Text>
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th className='text-[12px] w-[20px] p-2 border-solid border font-extrabold' scope="col">ردیف</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">کد کالا</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">شرح کالا / خدمت</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">تعداد / مقدار</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">واحد</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">مبلغ واحد</th>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="col">مبلغ کل</th>
                    </tr>
                </thead>
                <tbody>
                {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData?.map((data : any, i: number) => (
                    <tr key={data?.code}>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="row">{i+1}</th>
                        <td className='text-[12px] border-solid	border text-center font-extrabold'>{data?.code}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data?.name}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data?.output}</td>
                        <td className='text-[12px] border-solid	border text-center'>عدد</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data?.pretotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data?.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    </tr>
                ))}
                </tbody>
               <tfoot>
                    <tr>
                        <td colSpan={7}>
                            <Flex>
                               <div className="w-[450px]">
                               </div>
                               <div className="w-[150px] ps-1 border-solid border text-center">
                                    <Text className='text-[12px]' strong>
                                      اضافات
                                    </Text>
                               </div>
                                <div className="w-[203px] ps-1 border-solid border text-center">
                                   <Text className='text-[12px]' strong>
                                    {`${props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.extra ? props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0].extra : 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                   </Text>
                               </div>
                            </Flex>
                            <Flex>
                               <div className="w-[450px]">
                               </div>
                               <div className="w-[150px] ps-1 border-solid border text-center">
                                    <Text className='text-[12px]' strong>
                                      تخفیف
                                    </Text>
                               </div>
                                <div className="w-[203px] ps-1 border-solid border text-center">
                                   <Text className='text-[12px]' strong>
                                    {`${props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.discount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                   </Text>
                               </div>
                            </Flex>
                            <Flex>
                               <div className="w-[450px]">
                               </div>
                               <div className="w-[150px] ps-1 border-solid border text-center">
                                    <Text className='text-[12px]' strong>
                                      مالیات و عوراض
                                    </Text>
                               </div>
                                <div className="w-[203px] ps-1 border-solid border text-center">
                                   <Text className='text-[12px]' strong>
                                    {`${props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.tax}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                   </Text>
                               </div>
                            </Flex>
                            <Flex>
                               <div className="w-[450px]">
                               </div>
                               <div className="w-[150px] ps-1 border-solid border text-center">
                                    <Text className='text-[12px]' strong>
                                      جمع کل
                                    </Text>
                               </div>
                                <div className="w-[203px] ps-1 border-solid border text-center">
                                   <Text className='text-[12px]' strong>
                                    {`${props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                   </Text>
                                </div>
                            </Flex>
                            <Flex>
                               <div className="w-[450px]">
                               </div>
                               <div className="w-[150px] ps-1 border-solid border text-center">
                                    <Text className='text-[12px]' strong>
                                      مبلغ پرداختی
                                    </Text>
                               </div>
                                <div className="w-[203px] ps-1 border-solid border text-center">
                                   <Text className='text-[12px]' strong>
                                    {`${props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.paid}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                   </Text>
                               </div>
                            </Flex>
                       </td>
                    </tr>
                    <tr>
                      <td className='p-2 h-[1px]' colSpan={7}>
                        <Space size={10} direction="horizontal">
                                 <Text className='text-[10px]'>پرداخت شده بصورت:</Text>
                                 <Text className='text-[10px]'>نقدی: &#9634;</Text>
                                 <Text className='text-[10px]'>غیر نقدی: &#9634;</Text>
                        </Space>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>
                          <Flex>
                             <div className="w-1/2 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>فروشنده:</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/2 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>نام خریدار: {props.productSub.filter((product: { code: number; }) => product.code === props.filterable)[0]?.jsonData[0].buyer}</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                          </Flex>
                      </td>
                    </tr>
               </tfoot>
            </table>
        </div>
    )
}

export default TablePrint;