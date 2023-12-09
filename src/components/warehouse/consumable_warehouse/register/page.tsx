import {Tabs} from "antd";
import InputForm from "./input";
import OutputForm from "./output";

export default function RegisterProduct() {
    const items = [
        {
            label: `ثبت اولیه / ورود`,
            key: '1',
            children: <InputForm/>,
        }, {
            label: `خروج`,
            key: '2',
            children: <OutputForm/>,
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