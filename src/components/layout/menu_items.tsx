import {Link} from "react-router-dom";
import {Menu, MenuProps} from "antd";
import {
    PieChartOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import SellIcon from '@mui/icons-material/Sell';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, {useContext, useState} from "react";
import {Context} from "../../context";
import CalculateIcon from '@mui/icons-material/Calculate';

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



const rootSubmenuKeys = ['sub1', 'sub5','sub8','sub9'];


export const MenuLayout = () => {
  const [openKeys, setOpenKeys] = useState(['']);
  const context = useContext(Context)
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };


  const items: MenuItem[] = [
    getItem(<Link to='/'>خانه</Link>, '1', <HomeSharpIcon/>),
    getItem(<Link target={"_blank"} to='http://127.0.0.1:8000/admin/'>پنل مدیریت</Link>, '2', <PieChartOutlined/> ,  undefined , context.department !== 'مدیر کارخانه'),
    getItem('انبارداری', 'sub1', <WarehouseIcon/>, [
        getItem('انبار صنعتی', 'sub2', undefined , [
            getItem(<Link to='../warehouse/industrial_warehouse/register'>ثبت</Link>, '4',undefined , undefined ,!['Can add consuming material', 'Can add raw material'].some((element: any) => context.permission.includes(element)) ),
            getItem(<Link to='../warehouse/industrial_warehouse/report'>گزارش</Link>, '5' , undefined , undefined,!['Can view consuming material', 'Can view raw material'].some((element: any) => context.permission.includes(element))),
            getItem(<Link to='../warehouse/industrial_warehouse/upload'>باگذاری</Link>, '6',undefined , undefined ,!['Can add consuming material', 'Can add raw material'].some((element: any) => context.permission.includes(element))),
        ], !['Can view consuming material', 'Can view raw material'].some((element: any) => context.permission.includes(element))),

        getItem('انبار مصرفی', 'sub3', undefined, [
            getItem(<Link to='../warehouse/consumable_warehouse/register'>ثبت</Link>, '7'),
            getItem(<Link to='../warehouse/consumable_warehouse/report'>گزارش</Link>, '8'),
            getItem(<Link to='../warehouse/consumable_warehouse/upload'>باگذاری</Link>, '9'),
        ], !context.permission.includes('Can view product')),
        getItem(<Link to='../production_warehouse'>انبار محصول</Link>, '10', undefined, undefined,!context.permission.includes('Can view production')),
        getItem(<Link to='../waste_warehouse'>انبار ضایعات</Link>, '11', undefined, undefined,!context.permission.includes('Can view waste')),
        getItem('اموال', 'sub4', undefined, [
            getItem(<Link to='../property/register'>ثبت</Link>, '12'),
            getItem(<Link to='../property/report'>گزارش</Link>, '13'),
            getItem(<Link to='../property/upload'>باگذاری</Link>, '14'),
        ],true),
    ]),
    getItem("تولید", 'sub5', <ConstructionIcon/>, [
        getItem('مدیریت تولید', 'sub6', null, [
            getItem(<Link to='../production/request/register'>ثبت</Link>, '15'),
            getItem(<Link to='../production/request/report'>گزارش</Link>, '16'),
        ]),

        getItem('انبار تولید', 'sub7', null, [
            getItem(<Link to='../production/pending_production/register'>ثبت</Link>, '17'),
            getItem(<Link to='../production/pending_production/report'>گزارش</Link>, '18'),
        ]),
    ], !context.permission.includes('Can view pending produce')),
    getItem('فروش', 'sub8', <SellIcon/>, [
            getItem(<Link to='../sale/register'>صدور فاکتور</Link>, '19'),
            getItem(<Link to='../sale/report'>گزارش</Link>, '20'),
        ]  , !context.permission.includes('Can view sale')),
    getItem('درخواست خرید', 'sub9', <ShoppingCartIcon/>, [
            getItem(<Link to='../buy/register'>ثبت</Link>, '21'),
            getItem(<Link to='../buy/report'>گزارش</Link>, '22'),
        ] , !context.permission.includes('Can view apply buy')),
    getItem(<Link style={!(context.department === 'مدیریت مالی' || context.department === 'مدیر کارخانه') ? {pointerEvents:'none'} : {}} to='/finance/main'>مالی</Link>, '23', <CalculateIcon/> , undefined , !(context.department === 'مدیریت مالی' || context.department === 'مدیر کارخانه')),
    getItem(<Link to='../logout'>خروج</Link>, '24', <PoweroffOutlined/>,undefined,undefined,true),
];

    return (
         <Menu
              mode="inline"
              theme={"dark"}
              items={items}
              defaultSelectedKeys={['1']}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            />
    )
}