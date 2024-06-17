
import React, {useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ig from 'images.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const baseURL = "https://app.savebills.com.ng/api/auth/dashboard";

    const [totaldeposit, setTotaldeposit] = useState("0");
    const [totalbill, setTotalbill] = useState("0");
    const [allock, setallock] = useState("0");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("0");
    const [users, setusers] = useState("0");
    const [newuser, setnewuser] = useState("0");
    const [allcharges, setallcharges] = useState("0");
    const [dataprofit, setdataprofit] = useState("0");
    const [mcd, setmcd] = useState("0");
    const [pendingt, setpendingt] = useState("0");
    const [todaydeposit, settodaydeposit] = useState("0");
    const [todaypurchase, settodaypurchase] = useState("0");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [post, setPost] =useState(null);
    const [all, setall] = useState([]);
    let token=localStorage.getItem('dataKey');
    React.useEffect(() => {
        setLoading(true);
        axios
            .get(baseURL, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);

                if (response.data.status ==="0"){
                    window.location='auth/login';
                }
                console.log(response.data);
                setName(response.data.username);
                setEmail(response.data.email);
                setBalance(response.data.wallet);
                setName(response.data.name);
                setTotalbill(response.data.totalbill);
                setTotaldeposit(response.data.totaldeposit);
                setall(response.data.bills);
                setallock(response.data.allock);
                setMessage(response.data.message);
                setmcd(response.data.mcd);
                setdataprofit(response.data.dataprofit);
                setpendingt(response.data.pendingtransaction);
                settodaydeposit(response.data.todaydeposit);
                settodaypurchase(response.data.todaypurchase);
                setusers(response.data.users);
                setnewuser(response.data.newusers);
                setallcharges(response.data.allcharges);


                setPost(response.data);
                setLoading(false);
            });

    }, []);
    const profile= ()=>{
        try {
            {
                if(token && token.login)
                {
                    this.setState({login:true, token:token})
                }else {
                    window.location='login.js';
                }
            }

        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }

    }
    const a= {
        margin: 5,

    };
    const ul={
        listStyleType:'square',
    };
    return (
    <>
        {loading ? <div className="overlay">
                <div className="loader"></div>
            </div> :
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart/>
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart/>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Wallet
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{balance.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Users Balance</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{todaydeposit.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Today Deposit</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{todaypurchase.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Purchase</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Pending Transaction
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                {pendingt.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-book"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">All Pending Transaction</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Users
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                {newuser.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">New Users</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Users
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                {users.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Users</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        MCD Balance
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{mcd.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Users</span>
                            </p>
                        </div>
                    </div>
                </div>


                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{totaldeposit.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">All Deposit</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Bills
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{totalbill.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">All Bills</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Safe-lock
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{allock.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Safe-lock</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Data-Profit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{dataprofit.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Data-Profit</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        Charges
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{allcharges.toLocaleString()}
                                </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                    <div
                                        className=
                                            "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                    >
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-blueGray-400 mt-4">

                                <span className="whitespace-nowrap">Total Charges</span>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        }
    </>
  );
}
