import React from "react";

const TablePrint = (props: {
    componentPDF: React.LegacyRef<HTMLTableElement> | undefined,
    contract: any[],
    productSub: any[];
}) => {
    return (
        <div className='m-4 table-responsive text-nowrap rounded-3' style={{display: 'none'}}>
            <table
                className="table table-hover table-fixed text-center align-middle table-bordered border-primary bg-light"
                ref={props.componentPDF} style={{direction: 'rtl', fontSize: '.56vw'}}>
                <thead>
                <tr>
                    <th className='th' scope="col">کد</th>
                    <th className='th' scope="col">نام</th>
                    <th className='th' scope="col">گروه</th>
                    <th className='th' scope="col">ورود</th>
                    <th className='th' scope="col">خروج</th>
                    <th className='th' scope="col">مانده</th>
                </tr>
                </thead>

                <tbody>
                {props.contract.map((data, i) => (
                    <tr key={data.code}>
                        <th className='th' scope="row">{data.code}</th>
                        <td className='td'>{data.name}</td>
                        <td className='td'>{data.category}</td>
                        <td className='td'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.input, 0))}</td>
                        <td className='td'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.output, 0))}</td>
                        <td className='td'>{(props.productSub.filter(products => products.product === data.code).reduce((a, v) => a + v.input, 0))
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