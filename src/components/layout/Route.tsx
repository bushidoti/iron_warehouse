import {Logout} from "../login/logout";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {Home} from "../home/home";
import RegisterIndustrialWareHouse from "../warehouse/industrial_warehouse/register/page";
import {UploadIndustrialWareHouse} from "../warehouse/industrial_warehouse/upload/upload";
import {ReportIndustrialWareHouse} from "../warehouse/industrial_warehouse/report/report";
import {RegisterConsumableWareHouse} from "../warehouse/consumable_warehouse/register/register";
import {ReportConsumableWareHouse} from "../warehouse/consumable_warehouse/report/report";
import {UploadConsumableWareHouse} from "../warehouse/consumable_warehouse/upload/upload";
import {RegisterBuy} from "../buy/register/register";
import {ReportBuy} from "../buy/report/report";
import {ReportSale} from "../sale/report/report";
import {RegisterSale} from "../sale/register/register";
import {ReportProductionWareHouse} from "../warehouse/production_warehouse/report";
import {ReportWasteWareHouse} from "../warehouse/waste_warehouse/report";
import {RegisterRequestProduction} from "../production/request/register/register";
import {ReportRequestProduction} from "../production/request/report/report";
import {ReportPendingProduction} from "../production/pending/report/report";
import {RegisterPendingProduction} from "../production/pending/register/register";
import {FinanceMain} from "../finance/main";

export const RouteLayout = () => {
    return (
         <Routes>
             <Route path={'/logout'} element={<Logout/>}/>
             <Route path={'/'} element={<Home/>}/>
             <Route path={'/warehouse/industrial_warehouse/register'} element={<RegisterIndustrialWareHouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/upload'} element={<UploadIndustrialWareHouse/>}/>
             <Route path={'/warehouse/industrial_warehouse/report'} element={<ReportIndustrialWareHouse/>}/>
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
             <Route path={'/production/pending_production/register'} element={<RegisterPendingProduction/>}/>
             <Route path={'/production/pending_production/report'} element={<ReportPendingProduction/>}/>
             <Route path={'/finance/main'} element={<FinanceMain/>}/>
         </Routes>
    )
}