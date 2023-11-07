import React from "react";

const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    productSub: any[],
    form: any;
}) => {
    return (
        <div style={{display: 'none'}}>
            <table
                className="w-[100%] border-solid border-collapse border"
                ref={props.componentPDF} style={{direction: 'rtl', fontSize: '.56vw'}}>
                <thead>
                <tr>
                    <td colSpan={15} className='border-solid border text-center'>
                        {props.form.getFieldValue(['product', 'name']) + ' ------- کد کالا ' + props.form.getFieldValue(['product', 'code'])}
                    </td>
                </tr>
                <tr>
                    <th className='border-solid	border' scope="col">ردیف</th>
                    <th className='border-solid	border' scope="col">سند</th>
                    <th className='border-solid	border' scope="col">شناسه سند</th>
                    <th className='border-solid	border' scope="col">تاریخ</th>
                    <th className='border-solid	border' scope="col">عملیات</th>
                    <th className='border-solid	border' scope="col">مقیاس</th>
                    <th className='border-solid	border' scope="col">تعداد کارتن</th>
                    <th className='border-solid	border' scope="col">تعداد</th>
                    <th className='border-solid	border' scope="col">نرخ</th>
                    <th className='border-solid	border' scope="col">موجودی</th>
                    <th className='border-solid	border' scope="col">مورد مصرف</th>
                    <th className='border-solid	border' scope="col">خریدار</th>
                    <th className='border-solid	border' scope="col">فروشنده</th>
                    <th className='border-solid	border' scope="col">کدملی فروشنده</th>
                    <th className='border-solid	border' scope="col">آدرس فروشنده</th>
                    <th className='border-solid	border' scope="col">گیرنده</th>
                    <th className='border-solid	border' scope="col">اصلاحیه</th>
                </tr>
                </thead>

                <tbody>
                {props.productSub.map((data, i) => (
                    <tr key={data.id}>
                          <th className='border-solid	border' scope="row">{i}</th>
                        <td className='border-solid	border text-center'>{data.document_type}</td>
                        <td className='border-solid	border text-center'>{data.document_code}</td>
                        <td className='border-solid	border text-center'>{data.date}</td>
                        <td className='border-solid	border text-center'>{data.operator}</td>
                        <td className='border-solid	border text-center'>{data.scale}</td>
                        <td className='border-solid	border text-center'>{data.carton}</td>
                        <td className='border-solid	border text-center'>{data.operator === 'خروج' ? data.output : data.input}</td>
                        <td className='border-solid	border text-center'>{`${data.rate}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        <td className='border-solid	border text-center'>{data.afterOperator}</td>
                        <td className='border-solid	border text-center'>{data.consumable}</td>
                        <td className='border-solid	border text-center'>{data.buyer}</td>
                        <td className='border-solid	border text-center'>{data.seller}</td>
                        <td className='border-solid	border text-center'>{data.seller_national_id}</td>
                        <td className='border-solid	border text-center'>{data.address_seller}</td>
                        <td className='border-solid	border text-center'>{data.receiver}</td>
                        <td className='border-solid	border text-center'>{data.amendment}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default TablePrint;