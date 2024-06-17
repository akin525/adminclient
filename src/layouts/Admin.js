import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Airtime from "views/admin/airtime.js";
import Data from "views/admin/data.js";
import fund from "views/admin/fund.js";
import Tv from "views/admin/tv.js";
import Elect from "views/admin/elect.js";
import Deposit from "views/admin/deposit.js";
import Purchase from "views/admin/purchase.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Createlock from "views/admin/createlock.js";
import Addlock from "views/admin/addlock.js";
import Alluser from "../views/admin/alluser";
import Profile from "../views/admin/profile";
import Find from "../views/admin/finduser";
import Product from "../views/admin/product";
import Notification from "../views/admin/notification";
import Mreport from "../views/admin/mreport";
import wreport from "../views/admin/wreport";
import dreport from "../views/admin/dreport";
import Pending from "../views/admin/pending";
import checktransaction from "../views/admin/checktransaction.js";
import Withdraw from "../views/admin/withdraw";
import Viewpurchase from "../views/admin/viewpurchase";
import Searchpurchase from "../views/admin/searchpurchase";
export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/alluser" exact component={Alluser} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/viewpurchase" exact component={Viewpurchase} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/airtime" exact component={Airtime} />
            <Route path="/fund" exact component={fund} />
            <Route path="/data" exact component={Data} />
            <Route path="/tv" exact component={Tv} />
            <Route path="/elect" exact component={Elect} />
            <Route path="/deposit" exact component={Deposit} />
            <Route path="/purchase" exact component={Purchase} />
            <Route path="/profile" exact component={Settings} />
            <Route path="/createlock" exact component={Createlock} />
            <Route path="/finduser" exact component={Find} />
            <Route path="/allock" exact component={Addlock} />
            <Route path="/notification" exact component={Notification} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/mreport" exact component={Mreport} />
            <Route path="/wreport" exact component={wreport} />
            <Route path="/dreport" exact component={dreport} />
            <Route path="/product" exact component={Product} />
            <Route path="/pending" exact component={Pending} />
            <Route path="/findpurchase" exact component={checktransaction} />
            <Route path="/searchpurchase" exact component={Searchpurchase} />
            <Route path="/withdraw" exact component={Withdraw} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
