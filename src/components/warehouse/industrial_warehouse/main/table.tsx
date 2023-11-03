import React from "react";

const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    product: any[],
    productSub: any[];
}) => {
    return (
        <div style={{display: 'none'}}>
            <table
                className="w-[100%] border-solid border-collapse border"
                ref={props.componentPDF} style={{direction: 'rtl', fontSize: '.56vw'}}>
                <thead>
                <tr>
                    <th className='border-solid	border' scope="col">کد</th>
                    <th className='border-solid	border' scope="col">نام</th>
                    <th className='border-solid	border' scope="col">ورود</th>
                    <th className='border-solid	border' scope="col">خروج</th>
                    <th className='border-solid	border' scope="col">مانده</th>
                </tr>
                </thead>

                <tbody>
                {props.product.map((data) => (
                    <tr className='table-row' key={data.code}>
                        <th className='border-solid	border' scope="row">{data.code}</th>
                        <td className='border-solid	border text-center'>{data.name}</td>
                        <td className='border-solid	border text-center'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.input, 0))}</td>
                        <td className='border-solid	border text-center'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.output, 0))}</td>
                        <td className='border-solid	border text-center'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.input, 0))
                            - (props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.output, 0))}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default TablePrint;