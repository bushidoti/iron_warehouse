import React from "react";
import {Flex, Space, Typography} from 'antd';
const { Text } = Typography;


const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    productSub: any
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
                                    src={require('../../../../assets/printLogo.png')}
                                />
                              </div>
                        </th>
                        <th colSpan={3} className="ps-1 border-solid border text-center">
                            <Text className='text-[12px]' strong>
                                درخواست کالا از انبار
                           </Text>
                        </th>
                        <th colSpan={1} className="ps-4 border-solid border text-right">
                               <Space size={10} direction="vertical">
                                     <Text className='text-[12px] font-extrabold'>صفحه 1</Text>
                                     <Text className='text-[12px] font-extrabold'> شماره: {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.request} </Text>
                                     <Text className='text-[12px] font-extrabold'>تاریخ : {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.date.split('-').reverse().join('-')}</Text>
                               </Space>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={7} className='text-[12px] border border-solid p-2 text-right font-extrabold'>خواهشمند است اقلام مشروحه زیل را جهت {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.purpose} تحویل فرمایید</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th  className='text-[12px] w-[20px] p-2 border-solid border font-extrabold' scope="col">ردیف</th>
                        <th  className='text-[12px] w-[100px] border-solid	border font-extrabold' scope="col">کد کالا</th>
                        <th  className='text-[12px] w-[150px] border-solid	border font-extrabold' scope="col">نام کالا</th>
                        <th  className='text-[12px] w-[50px] border-solid	border font-extrabold' scope="col">تعداد</th>
                        <th  className='text-[12px] w-[50px] border-solid	border font-extrabold' scope="col">واحد</th>
                        <th  className='text-[12px] w-[50px] border-solid	border font-extrabold' scope="col">ارزش</th>
                        <th  className='text-[12px] border-solid border font-extrabold' scope="col">توضیحات</th>
                    </tr>
                </thead>
                <tbody>
                {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.raw_material_jsonData?.map((data : any, i : number) => (
                    <tr key={data.id}>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="row">{i+1}</th>
                        <td className='text-[12px] border-solid	border text-center font-extrabold'>{data.id}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.name}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.output}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.scale}</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data.average_rate}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.description}</td>
                    </tr>
                ))
                }
                {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.consuming_material_jsonData?.map((data : any, i : number) => (
                    <tr key={data.id}>
                        <th className='text-[12px] border-solid	border font-extrabold' scope="row">{i+1}</th>
                        <td className='text-[12px] border-solid	border text-center font-extrabold'>{data.id}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.name}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.output}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.scale}</td>
                        <td className='text-[12px] border-solid	border text-center'>{`${data.average_rate}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td className='text-[12px] border-solid	border text-center'>{data.description}</td>
                    </tr>
                ))
                }
                </tbody>
               <tfoot>
                    <tr>
                      <td colSpan={7}>
                          <Flex>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>درخواست کننده(تولید) : {props.productSub.filter((product: { request: number; }) => product.request === props.filterable)[0]?.applicant}</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>سرپرست واحد :</Text></div>
                                  <div className="col-start-1 col-span-4"></div>
                                  <div className="col-end-3 ms-10"><Text className='text-[10px]'>امضاء</Text></div>
                             </div>
                             <div className="w-1/3 ps-1 border-solid border grid grid-cols-2">
                                  <div className="col-start-1 col-span-4"><Text className='text-[10px]'>مدیریت کارخانه :</Text></div>
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