import React, {useEffect, useState} from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import ig from 'images.png';
import {toast} from "react-toastify";

import swal from "sweetalert";
import gh from 'lg.png'
import pa from 'pattern.png'

import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
export default function Profile({color}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [userid, setuserid] = useState("");
    const [totaluserb, settotaluseb] = useState("0");
    const [totaluserd, settotalused] = useState("0");
    const [totaluserc, settotalusec] = useState("0");
    const [lock, setlock] = useState("0");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setamount] = useState("");
    const [amount1, setamount1] = useState("");
    const [userde,setuserde] = useState("");
    const [datass, setdatass]=useState([])
    const [billiss, setbilliss]=useState([])
    const baseURL2 = "https://app.savebills.com.ng/api/auth/users";
    const baseURL = "https://app.savebills.com.ng/api/auth/credit";
    const baseURL1 = "https://app.savebills.com.ng/api/auth/debit";
    const baseURL3 = "https://app.savebills.com.ng/api/auth/update";
    const [username, setusername] = useState("");
    const [name, setname] = useState("");
    const [email, setemail]=useState([])
    const [number,setnumber] = useState("");
    const [address,setaddress] = useState("");
    const [dob,setdob] = useState("");
    const [role,setrole] = useState("");
    const [refid,setrefid] = useState("");
    const [refid1,setrefid1] = useState("");
    const regene="https://app.savebills.com.ng/api/auth/newaccount1";

    const a= {
        margin: 5,

    };
    const ul={
        listStyleType:'square',
    };



    const [user, setuser] = useState("");


    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [up, setup] = useState(false);

    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setrefid("adminfund"+Math.floor((Math.random() * 1000000000) + 1));
        setrefid1("admincharge"+Math.floor((Math.random() * 1000000000) + 1));

        reload()

    }, [token]);
    const reload = () => {
        setLoading(true);

        const searchParams = new URLSearchParams(window.location.search);
        const referValue = searchParams.get('user');
        axios
            .post(baseURL2, {
                username:referValue
            })
            .then(response => {
                setError("");
                setuserde(response.data.userdetail);
                settotalused(response.data.userdeposit);
                settotaluseb(response.data.userbill);
                settotalusec(response.data.usercharge);
                setlock(response.data.safelock);
                setdatass(response.data.alldeposit);
                setbilliss(response.data.allbill);
                setname(response.data.userdetail.name);
                setusername(response.data.userdetail.username);
                setemail(response.data.userdetail.email);
                setnumber(response.data.userdetail.phone);
                setdob(response.data.userdetail.dob);
                setrole(response.data.userdetail.role);
                setaddress(response.data.userdetail.address);

                setLoading(false);

            });
    }

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "name"){
            setname(value);
        }

        if(id === "number"){
            setnumber(value);
        }
        if(id === "amount"){
            setamount(value);
        }
        if(id === "amount1"){
            setamount1(value);
        }
        if(id === "email"){
            setemail(value);
        }
        if(id === "address"){
            setaddress(value);
        }
        if(id === "dob"){
            setdob(value);
        }
        if(id === "role"){
            setrole(value);
        }

    }


    const handleCredit  = async () =>  {

        setLoading(true);

        try {
            axios
                .post(baseURL, {

                    username:userde.username,
                    amount:amount,
                    refid:refid,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setError("");
                setMessage(response);
                setLoading(false);
                reload()
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    })


                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    })
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }
    const handleDebit  = async () =>  {

        setLoad(true);

        try {
            axios
                .post(baseURL1, {

                    username:userde.username,
                    amount:amount1,
                    refid:refid1,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setLoad(false);
                reload()
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    })


                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    })
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }

    const handleSubmitacct  = async () =>  {
        setLoading(true);
        try {
            axios
                .post(regene, {
                    username:username,
                })
                .then(response => {
                    setError("");
                    setMessage(response);
                    setLoading(false);

                    if (response.data.status == "0") {
                        setError(response.data.message);
                        // swal({
                        //   title: "Ooops",
                        //   text: response.data.message,
                        //   icon: "error",
                        //   confirmButtonText: "OK",
                        // });
                        toast.error(response.data.message, {
                            position: "top-center",
                            autoClose: 3000, // Time in milliseconds, or false to disable autoclose
                        });

                    }else{
                        toast.success(response.data.message, {
                            position: "center",
                            autoClose: 3000, // Time in milliseconds, or false to disable autoclose
                        });
                        window.location.href='/dashboard';


                    }
                    // setPost(response.data);
                });
        }catch (e) {
            setError("An error occured. Check your input and try again");
        }
    }

    const handleUpdate  = async () =>  {


        setup(true);

        try {
            axios
                .post(baseURL3, {

                    username:userde.username,
                    name:name,
                    address:address,
                    dob:dob,
                    number:number,
                    role:role,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setup(false);
                reload()
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    })


                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    })
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }

    return (

        <>

            <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {userde.username} Balance
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{parseInt(userde.wallet).toLocaleString()}
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

                                <span className="whitespace-nowrap">Wallet Balance</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {userde.username} Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{totaluserd.toLocaleString()}
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

                                <span className="whitespace-nowrap">Total Deposit</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {userde.username} Total Bill
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{totaluserb.toLocaleString()}
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

                                <span className="whitespace-nowrap">Total Bills</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {userde.username} Total Charge
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{totaluserc.toLocaleString()}
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

                                <span className="whitespace-nowrap">Total Charges</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        {userde.username} Total Safe-lock
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{parseInt(lock).toLocaleString()}
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

                                <span className="whitespace-nowrap">Total Safe-lock</span>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-5 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
                    <div className="p-4 flex-auto">
                        <div className="relative">
                                    <div className="mb-2">
                                        <ul style={ul} className=" text-white">
                                            <li><h3><i className="fa fa-user text-info"></i>
                                                 <b>Full-Name</b> :{userde.name} </h3></li>
                                            {/*<br></br>*/}
                                                <li><i className="fa fa-phone text-info "></i>
                                                    <b>Phone </b> : {userde.phone}</li>
                                            {/*<br></br>*/}
                                                    <li className="mt-2"><i className="fa fa-envelope text-info"></i>
                                                        <b>Email </b> : {userde.email}
                                                    </li>
                                            {/*<br></br>*/}
                                                        <li className="mt-2"><i className="fa fa-calendar text-info"></i> <b>Reg.
                                                            Date</b> : {userde.createdAt}</li>
                                            {/*<br></br>*/}
                                                            <li className="mt-2"><i className="fa fa-key text-info "></i>
                                                                <b>Api</b> : {userde.apikey}</li>
                                            {/*<br></br>*/}
                                                                <li className="mt-2"><i className="fa fa-search-location text-info "></i>
                                                                    <b>Address</b> : {userde.address}</li>
                                            {/*<br></br>*/}
                                                                    <li className="mt-2"><i
                                                                        className="fa fa-user text-info "></i>
                                                                        <b>Gender</b> : {userde.gender}</li>
                                            <li className="mt-2"><i
                                                                        className="fa fa-calendar text-info "></i>
                                                                        <b>DOB</b> : {userde.dob}</li>
                                            <br></br>
                                            <li className="text-info" style={a}><h1 ><b>Personal
                                                Virtual Account Detail 1</b></h1></li>



                                            {userde.account_number === "1" ? (
                                                <button type="button" onClick={handleSubmitacct} className="btn btn-primary">Generate Account</button>
                                            ) : (
                                                <>
                                                    <li className="mt-2">
                                                        <i className="fa fa-user text-info"></i>
                                                        <b>Account-no</b> : {userde.account_number}
                                                    </li>
                                                    <li className="mt-2">
                                                        <i className="fa fa-user text-info"></i>
                                                        <b>Account-Name</b> : {userde.account_name}
                                                    </li>
                                                </>
                                            )}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            <div className="w-full xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="p-4 flex-auto">
                        <div className="relative h-200-px">
                            <center>
                                <Link to="/">
                                    <img  src={ig} alt=""/>
                                </Link>
                            </center>
                            <ul style={ul} className="text-info">
                                <li style={a}><h3 className=" mb-2"><b>Personal
                                    Virtual Account Detail 2</b></h3></li>
                                {userde.account_number1 === "1" ? (
                                    <button type="button" className="btn btn-primary">Generate Account</button>
                                ) : (
                                    <>
                                        <li style={a}>
                                            <h5>
                                                <b>{userde.account_name1}</b>
                                            </h5>
                                        </li>
                                        <li style={a}>
                                            <h5>
                                                <b>Account No: {userde.account_number1}</b>
                                            </h5>
                                        </li>
                                        {userde.bank === null ? (
                                            <li style={a}>
                                                <h5>
                                                    <b>Bank: VFD Microfinance Bank Limited</b>
                                                </h5>
                                            </li>
                                        ) : (
                                            <li style={a}>
                                                <h5>
                                                    <b>Bank: {userde.bank}</b>
                                                </h5>
                                            </li>
                                        )}
                                    </>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Settings
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    User Information
                                </h6>
                                {up ? <div className="loader-container">
                                        <div className="spinner"/>
                                    </div> :
                                    <div>

                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Username Role
                                                </label>
                                                <select name="role"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                         onChange={(e) => handleInputChange(e)} id="role"
                                                        required>

                                                    <option value={role}>Select Role For User</option>
                                                    <option value="superadmin">Superadmin</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email address
                                                </label>
                                                <input
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                                    value={email} onChange={(e) => handleInputChange(e)}
                                                    id="email"


                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={name} onChange={(e) => handleInputChange(e)} id="name"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                                    value={number} onChange={(e) => handleInputChange(e)}
                                                    id="number"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                                    value={address} onChange={(e) => handleInputChange(e)}
                                                    id="address"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-6/12 px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={dob} onChange={(e) => handleInputChange(e)} id="dob"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleUpdate}  type="button"  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Update Profile
                                    </button>

                                    <button type="button"  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                    Reset Password<span className="load loading"></span>
                                    </button>
                                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                }
                            </form>
                        </div>
                    </div>

                </div>

                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Fund User</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Settings
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                {loading ? <div className="loader-container">
                                        <div className="spinner"/>
                                    </div> :
                                    <div className="flex flex-wrap">
                                        <div className="w-full  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={amount} onChange={(e) => handleInputChange(e)} id="amount"
                                                    required/>
                                            </div>
                                            <button onClick={handleCredit} type="button" className="btn btn-outline-success">
                                                Credit Now
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                    </div>
                                }
                            </form>
                        </div>

                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Charge User</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Settings
                                </button>
                            </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                {load ? <div className="loader-container">
                                        <div className="spinner"/>
                                    </div> :
                                    <div className="flex flex-wrap">
                                        <div className="w-full  px-4">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={amount1} onChange={(e) => handleInputChange(e)}
                                                    id="amount1"/>
                                            </div>
                                            <button onClick={handleDebit} type="button"
                                                    className="btn btn-outline-success">
                                                Charge Now
                                            </button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                    </div>
                                }
                            </form>
                        </div>
                </div>
                </div>

                <div className="flex flex-wrap mt-4">
                  <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                          <div className="rounded-t mb-0 px-4 py-3 border-0">
                              <div className="flex flex-wrap items-center">
                                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                      <button
                                          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                      >
                                          {userde.username} Deposit History
                                      </button>
                                  </div>
                              </div>
                          </div>
                          <div className="block w-full overflow-x-auto">
                              {/* Projects table */}
                              <table className="items-center w-full bg-transparent border-collapse">
                                  <thead>
                                  <tr>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                         Date
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                          Amount
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                          Payment_ref
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Amount-Before
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Amount-After
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {datass.map(datab => (
                                  <tr>
                                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                          {datab.date}
                                      </th>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          &#8358;{datab.amount}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {datab.payment_ref}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          &#8358;{datab.iwallet}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          &#8358;{datab.fwallet}
                                      </td>
                                  </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
                  <div className="w-full xl:w-6/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                          <div className="rounded-t mb-0 px-4 py-3 border-0">
                              <div className="flex flex-wrap items-center">
                                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                      <button
                                          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                          type="button"
                                      >
                                          {userde.username} Purchase History
                                      </button>
                                  </div>
                              </div>
                          </div>
                          <div className="block w-full overflow-x-auto">
                              {/* Projects table */}
                              <table className="items-center w-full bg-transparent border-collapse">
                                  <thead>
                                  <tr>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                          Date
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                          Amount
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                         Plan
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                          Refid
                                      </th>
                                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                         Number
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {billiss.map(datab1 => (
                                      <tr>
                                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                              {datab1.date}
                                          </th>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              &#8358;{datab1.amount}
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {datab1.plan}
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                             {datab1.refid}
                                          </td>
                                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {datab1.phone}
                                          </td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>

                  </div>
                </div>
            </div>

                </>



    );
}
