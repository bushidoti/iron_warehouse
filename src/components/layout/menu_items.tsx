import {Link} from "react-router-dom";
import {MenuProps} from "antd";
import {
    PieChartOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import SellIcon from '@mui/icons-material/Sell';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[] ,
    disabled?: boolean,
    danger?: boolean ,


): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        disabled,
        danger,


    } as MenuItem;
}

export const items: MenuItem[] = [
    getItem(<Link to='/'>خانه</Link>, '1', <HomeSharpIcon/>),
    getItem(<Link target={"_blank"} to='http://127.0.0.1:8000/admin/'>پنل مدیریت</Link>, '2', <PieChartOutlined/> ,  undefined ),
    getItem('انبارداری', 'sub1', <WarehouseIcon/>, [
        getItem(<Link to='../industrial_inventory'>انبار صنعتی</Link>, 'sub2', undefined , [
            getItem(<Link to='../industrial_inventory/register'>ثبت</Link>, '4'),
            getItem(<Link to='../industrial_inventory/report'>گزارش</Link>, '5'),
            getItem(<Link to='../industrial_inventory/upload'>باگذاری</Link>, '6'),
        ]),

        getItem(<Link to='../consumable_inventory'>انبار مصرفی</Link>, 'sub3', undefined, [
            getItem(<Link to='../consumable_inventory/register'>ثبت</Link>, '7'),
            getItem(<Link to='../consumable_inventory/report'>گزارش</Link>, '8'),
            getItem(<Link to='../consumable_inventory/upload'>باگذاری</Link>, '9'),
        ]),
        getItem(<Link to='../product_inventory'>انبار محصول</Link>, '10', undefined),
        getItem(<Link to='../waste_inventory'>انبار ضایعات</Link>, '11', undefined),
        getItem(<Link to='../property'>اموال</Link>, 'sub4', undefined, [
            getItem(<Link to='../property/register'>ثبت</Link>, '12'),
            getItem(<Link to='../property/report'>گزارش</Link>, '13'),
            getItem(<Link to='../property/upload'>باگذاری</Link>, '14'),
        ]),
    ]),
    getItem("تولید", 'sub5', <ConstructionIcon/>, [
        getItem(<Link to='../production/product'>مدیریت تولید</Link>, 'sub6', null, [
            getItem(<Link to='../production/register'>ثبت</Link>, '15'),
            getItem(<Link to='../production/report'>گزارش</Link>, '16'),
        ]),

        getItem(<Link to='../production_inventory'>انبار تولید</Link>, 'sub7', null, [
            getItem(<Link to='../production_inventory/register'>ثبت</Link>, '17'),
            getItem(<Link to='../production_inventory/report'>گزارش</Link>, '18'),
            getItem(<Link to='../production_inventory/sent'>ارسالی</Link>, '19'),
            getItem(<Link to='../production_inventory/recycle'>بایگانی</Link>, '20'),
        ]),
    ] ),
    getItem(<Link to='../sale'>فروش</Link>, '21', <SellIcon/>),
    getItem(<Link to='../buy'>درخواست خرید</Link>, '22', <SellIcon/>),
    getItem(<Link to='../logout'>خروج</Link>, '23', <PoweroffOutlined/>,undefined,undefined,true),
];