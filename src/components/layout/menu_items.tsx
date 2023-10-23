import {Link} from "react-router-dom";
import {MenuProps} from "antd";
import {
    PieChartOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import SellIcon from '@mui/icons-material/Sell';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ConstructionIcon from '@mui/icons-material/Construction';
import BackupIcon from '@mui/icons-material/Backup';
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
    getItem(<Link target={"_blank"} to='https://api.oghab-asaluyeh.ir/admin/'>پنل مدیریت</Link>, '2', <PieChartOutlined/> ,  undefined ),

    getItem(<Link target={"_blank"} to='http://www.oghab-asaluyeh.ir:2082/cpsess6008508683/frontend/
  jupiter/backup/wizard-backup-type.html?login=1&post_login=3837540636687'>بکاپ</Link>
        , '3', <BackupIcon/> ,  undefined ),

    getItem('انبارداری', 'sub1', <WarehouseIcon/>, [

        getItem(<Link to='../contract'>انبار صنعتی</Link>, 'sub2', undefined , [
            getItem(<Link to='../contract/register'>ثبت</Link>, '4'),
            getItem(<Link to='../contract/report'>گزارش</Link>, '5'),
            getItem(<Link to='../contract/upload'>باگذاری</Link>, '6'),
        ]),

        getItem(<Link to='../personal'>انبار مصرفی</Link>, 'sub3', undefined, [
            getItem(<Link to='../personal/register'>ثبت</Link>, '7'),
            getItem(<Link to='../personal/report'>گزارش</Link>, '8'),
            getItem(<Link to='../personal/upload'>باگذاری</Link>, '9'),
        ]),
        getItem(<Link to='../personal'>انبار محصول</Link>, '10', undefined),
        getItem(<Link to='../personal'>انبار ضایعات</Link>, '11', undefined),

        getItem(<Link to='../personal'>اموال</Link>, 'sub4', undefined, [
            getItem(<Link to='../personal/register'>ثبت</Link>, '12'),
            getItem(<Link to='../personal/report'>گزارش</Link>, '13'),
            getItem(<Link to='../personal/upload'>باگذاری</Link>, '14'),
        ]),
    ]),
    getItem(<Link to='../warhouse'>تولید</Link>, 'sub5', <ConstructionIcon/>, [
        getItem(<Link to='../warhouse/product'>مدیریت تولید</Link>, 'sub6', null, [
            getItem(<Link to='../warhouse/product/register'>ثبت</Link>, '15'),
            getItem(<Link to='../warhouse/product/report'>گزارش</Link>, '16'),
        ]),

        getItem(<Link to='../warhouse/property'>انبار تولید</Link>, 'sub7', null, [
            getItem(<Link to='../warhouse/property/register'>ثبت</Link>, '17'),
            getItem(<Link to='../warhouse/property/report'>گزارش</Link>, '18'),
            getItem(<Link to='../warhouse/property/sent'>ارسالی</Link>, '19'),
            getItem(<Link to='../warhouse/property/recycle'>بایگانی</Link>, '20'),
        ]),
    ] ),
    getItem(<Link to='../logout'>فروش</Link>, '21', <SellIcon/>),
    getItem(<Link to='../logout'>خروج</Link>, '22', <PoweroffOutlined/>,undefined,undefined,true),
];