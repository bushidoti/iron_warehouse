import React, {useContext} from 'react';
import type { MenuProps } from 'antd';
import {Alert, ConfigProvider, Divider, Flex, Menu, Space, Tabs} from 'antd';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import DevicesIcon from '@mui/icons-material/Devices';
import ConstructionIcon from '@mui/icons-material/Construction';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CellWifiIcon from '@mui/icons-material/CellWifi';
import SafetyEquipment from "./form/safety-equipment";
import Vehicle from "./form/vehicle";
import ElectronicFurniture from "./form/electronic-furniture";
import OfficeFurniture from "./form/office-furniture";
import FacilityFurniture from "./form/facility-furniture";
import DigitalFurniture from "./form/digital-furniture";
import NoneIndustrial from "./form/none_industrial";
import SupportItem from "./form/support-items";
import Benefit from "./form/benefit";
import Industrial from "./form/industrial";
import {Context} from "../../../context";

const items: MenuProps['items'] = [
  {
    label: 'تجهیزات',
    key: 'equipment',
    icon: <HomeRepairServiceIcon />,
    children: [
          {
            label:  'تجهیزات ایمنی',
            key: 'تجهیزات ایمنی',
            icon: <HealthAndSafetyIcon />,
          }
    ],
  },
  {
    label: 'وسایل نقلیه',
    key: 'vehicle',
    icon: <DirectionsCarIcon />,
    children: [
         {
            label: 'خودرو اداری',
            key: 'خودرو اداری',
            icon: <DirectionsCarFilledIcon />,
          }
    ],
  },
  {
    label: 'اثاث',
    key: 'furniture',
    icon: <EventSeatIcon />,
    children: [
         {
            label: 'اثاثه الکترونیکی',
            key: 'اثاثه الکترونیکی',
            icon: <ElectricBoltIcon />,
         },
         {
            label: 'اثاثه اداری',
            key: 'اثاثه اداری',
            icon: <LocalPrintshopIcon />,
         },
         {
            label: 'اثاثه تاسیساتی',
            key: 'اثاثه تاسیساتی',
            icon: <HeatPumpIcon />,
         },
         {
            label: 'اثاثه دیجیتالی',
            key: 'اثاثه دیجیتالی',
            icon: <DevicesIcon />,
         }
    ],
  },
  {
    label: 'اموال منقول',
    key: 'movable',
    icon: <DevicesOtherIcon />,
    children: [
         {
            label: 'ابزار آلات غیر صنعتی',
            key: 'ابزار آلات غیر صنعتی',
            icon: <ConstructionIcon />,
          },
          {
            label: 'ابزار آلات صنعتی',
            key: 'ابزار آلات صنعتی',
            icon: <EngineeringIcon />,
          },
          {
            label: 'امتیازات',
            key: 'امتیازات',
            icon: <CellWifiIcon />,
          },
          {
            label: 'اقلام پشتیبانی',
            key: 'اقلام پشتیبانی',
            icon: <EmojiFoodBeverageIcon />,
          }
    ],
  },
];

const RepairRegister: React.FC = () => {
  const context = useContext(Context)

  const onClick: MenuProps['onClick'] = (e) => {
    context.setCurrentPropertyForm(e.key);
  };

  return (
        <ConfigProvider theme={{
            components: {
                Menu: {
                    colorBgContainer: 'rgba(105,177,255,0.07)',
                    darkItemBg: '#00022b',
                    darkItemColor: '#69b1ff',
                    subMenuItemBg:'#69b1ff',
                    iconSize:20,
                    itemMarginBlock:8,
                    darkItemSelectedBg: '#0855b1',
                    darkSubMenuItemBg: '#010e54',
                    darkItemHoverBg	: '#daeaf7',
                    darkItemHoverColor	: '#00022b',
                }
            }
        }}>
            <Menu onClick={onClick} selectedKeys={[context.currentPropertyForm]} mode="horizontal" items={items} />
                <>
                    {(() => {
                        if (context.currentPropertyForm === 'تجهیزات ایمنی'){
                            return <SafetyEquipment/>
                        } else  if (context.currentPropertyForm === 'خودرو اداری'){
                            return <Vehicle/>
                        } else if (context.currentPropertyForm === 'اثاثه الکترونیکی'){
                            return <ElectronicFurniture/>
                        } else if (context.currentPropertyForm === 'اثاثه اداری'){
                            return <OfficeFurniture/>
                        } else if (context.currentPropertyForm === 'اثاثه تاسیساتی'){
                            return <FacilityFurniture/>
                        } else if (context.currentPropertyForm === 'اثاثه دیجیتالی'){
                            return <DigitalFurniture/>
                        } else if (context.currentPropertyForm === 'ابزار آلات غیر صنعتی'){
                            return <NoneIndustrial/>
                        } else if (context.currentPropertyForm === 'ابزار آلات صنعتی'){
                            return <Industrial/>
                        } else if (context.currentPropertyForm === 'اقلام پشتیبانی'){
                            return <SupportItem/>
                        } else if (context.currentPropertyForm === 'امتیازات'){
                            return <Benefit/>
                        }
                    })()}
                </>
            <>
                {context.propertyCapsule.length !==0 ?
                     <Alert
                      message="آیتم های در حال انتظار ثبت نهایی"
                      description={
                      <Flex gap="middle" vertical>
                        {context.propertyCapsule.map((data:any, index) => (
                            <div key={index}>
                                <Space>
                                <p> آیتم : {index + 1}</p>
                                <p> کد اموال : {context.propertyTab === 'تعمیرات' ? data.property : data.code }</p>
                                {context.propertyTab === 'تعمیرات' ? <p>شرح تعمیر : {data.description}</p> : null }
                                {context.propertyTab === 'تعمیرات' ? <p>شناسه فاکتور : {data.document_code}</p> : null }
                                {context.propertyTab === 'تعمیرات' ? null :  <p> نام اموال : {data.name}</p> }
                                </Space>
                                <Divider />
                            </div>
                        ))}
                      </Flex>
                 } type="success"/>
                : null}



            </>
        </ConfigProvider>
  );
};




export default function RegisterProperty() {
    const context = useContext(Context)

    const onChange = (key: string) => {
          context.setPropertyTab(key);
        };

    const items = [
        {
            label: `ثبت اولیه / خرید`,
            key: 'ثبت اولیه / خرید',
            children: <RepairRegister/>,
        }, {
            label: `تعمیرات`,
            key: 'تعمیرات',
            children: <RepairRegister/>,
        }
    ];
    return (
        <Tabs
            defaultActiveKey="1"
            centered
            type="card"
            items={items}
            onChange={onChange}
        />
    )
}

