import {Logout} from "../login/logout";
import {Route, Routes} from "react-router-dom";
import React, {useContext} from "react";
import {Home} from "../home/home";
import RegisterIndustrialWareHouse from "../warehouse/industrial_warehouse/register/page";
import {UploadIndustrialWareHouse} from "../warehouse/industrial_warehouse/upload/upload";
import ReportIndustrialWareHouse from "../warehouse/industrial_warehouse/report/report";
import {RegisterConsumableWareHouse} from "../warehouse/consumable_warehouse/register/register";
import {ReportConsumableWareHouse} from "../warehouse/consumable_warehouse/report/report";
import {UploadConsumableWareHouse} from "../warehouse/consumable_warehouse/upload/upload";
import RegisterBuy from "../buy/register/register";
import ReportBuy from "../buy/report/report";
import {ReportSale} from "../sale/report/report";
import RegisterSale from "../sale/register/register";
import ReportProductionWareHouse from "../warehouse/production_warehouse/report";
import {ReportWasteWareHouse} from "../warehouse/waste_warehouse/report";
import RegisterRequestProduction from "../production/request/register/register";
import ReportRequestProduction from "../production/request/report/report";
import ReportPendingProduction from "../production/pending/report/report";
import FinanceMain from "../finance/main";
import MainIndustrialWarehouse from "../warehouse/industrial_warehouse/main/page";
import CardConsumable from "../warehouse/industrial_warehouse/card/card_consumable";
import {Context} from "../../context";
import CardRaw from "../warehouse/industrial_warehouse/card/card_raw";
import ProductFactor from "../warehouse/industrial_warehouse/report/factor";
import {EditDocRaw} from "../warehouse/industrial_warehouse/register/edit_raw";
import {EditDocConsumable} from "../warehouse/industrial_warehouse/register/edit_consumable";

export const RouteLayout = () => {
    const context = useContext(Context)

    return (
         <Routes>
             <Route path={'/logout'} element={<Logout/>}/>
             <Route path={'/'} element={<Home/>}/>
             <Route path={'/warehouse/industrial_warehouse'} element={<MainIndustrialWarehouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/register'} element={<RegisterIndustrialWareHouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/upload'} element={<UploadIndustrialWareHouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/report'} element={<ReportIndustrialWareHouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/request'} element={<ReportRequestProduction/>}/>
             <Route path={`/warehouse/industrial_warehouse/raw/edit/${context.currentProduct}`} element={<CardRaw/>}/>
             <Route path={`/warehouse/industrial_warehouse/raw/edit_doc/${context.currentProductDoc}/${context.currentProductDoc === 'factor' ? context.currentProductFactor : context.currentProductCheck }`} element={<EditDocRaw/>}/>
             <Route path={`/warehouse/industrial_warehouse/consumable/edit/${context.currentProduct}`} element={<CardConsumable/>}/>
             <Route path={`/warehouse/industrial_warehouse/consumable/edit_doc/${context.currentProductDoc}/${context.currentProductDoc === 'factor' ? context.currentProductFactor : context.currentProductCheck }`} element={<EditDocConsumable/>}/>
             <Route path={`/warehouse/industrial_warehouse/factor/${context.currentProductFactor}`} element={<ProductFactor/>}/>
             <Route path={'/warehouse/consumable_warehouse/register'} element={<RegisterConsumableWareHouse/>}/>
             <Route path={'/warehouse/consumable_warehouse/upload'} element={<UploadConsumableWareHouse/>}/>
             <Route path={'/warehouse/consumable_warehouse/report'} element={<ReportConsumableWareHouse/>}/>
             <Route path={'/warehouse/consumable_warehouse/report'} element={<ReportConsumableWareHouse/>}/>
             <Route path={'/warehouse/consumable_warehouse/report'} element={<ReportConsumableWareHouse/>}/>
             <Route path={'/buy/register'} element={<RegisterBuy/>}/>
             <Route path={'/buy/report'} element={<ReportBuy/>}/>
             <Route path={'/sale/register'} element={<RegisterSale/>}/>

             <Route path={'/sale/report'} element={<ReportSale/>}/>
             <Route path={'/production_warehouse'} element={<ReportProductionWareHouse/>}/>
             <Route path={'/waste_warehouse'} element={<ReportWasteWareHouse/>}/>
             <Route path={'/production/request/register'} element={<RegisterRequestProduction/>}/>
             <Route path={'/production/request/report'} element={<ReportRequestProduction/>}/>
             <Route path={'/production/pending_production/report'} element={<ReportPendingProduction/>}/>
             <Route path={'/finance/main'} element={<FinanceMain/>}/>
         </Routes>
    )
}