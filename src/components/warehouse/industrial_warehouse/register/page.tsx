import {Tabs} from "antd";
import ConsumeProductForm from "./consume_product";
import RawProductForm from "./raw_product";


export default function RegisterIndustrialWareHouse() {
    const items = [
        {
            label: `مواد اولیه`,
            key: '1',
            children: <RawProductForm/>,
        }, {
            label: `مواد مصرفی`,
            key: '2',
            children: <ConsumeProductForm/>,
        }
    ];
    return (
        <Tabs
            defaultActiveKey="1"
            centered
            type="card"
            items={items}
        />
    )
}