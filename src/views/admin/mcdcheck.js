import React, {useEffect, useState} from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import ig from 'images.png';
import Swal from 'sweetalert2';

import gh from 'lg.png'
import pa from 'pattern.png'

import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
export default function Mcdcheck({color}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [id, setid] = useState("");
    const [lock, setlock] = useState("0");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setamount] = useState("");
    const baseURL2 = "https://reseller.mcd.5starcompany.com.ng/api/v1/my-transaction";
    const baseURL = "https://app.savebills.com.ng/api/auth/reverseid";
    const baseURL1 = "https://app.savebills.com.ng/api/auth/reverse";
    const baseURL3 = "https://app.savebills.com.ng/api/auth/approve";
    const [username, setusername] = useState("");
    const [name, setname] = useState("");
    const [network, setnetwork]=useState()
    const [server, setserver]=useState()
    const [status, setstatus]=useState()
    const [number,setnumber] = useState("");
    const [refid,setrefid] = useState("");
    const [date,setdate] = useState("");
    const [update,setupdate] = useState("");
    const [show,setshow] = useState(0);

    const a= {
        borderRadius: "15px",
    border: "1px solid #ccc",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",

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

        // reload()

    }, [token]);
    const reload = () => {
        setLoading(true);

        const searchParams = new URLSearchParams(window.location.search);
        const referValue = searchParams.get('id');
        axios.get(`${baseURL2}/${refid}`,{
            headers:{
                'Authorization': 'Bearer ChBfBAKZXxBhVDM6Vta54LAjNHcpNSzAhUcgmxr274wUetwtgGbbOJ1Uv0HoQckSLK8o9VIs1YlUUzP6ONe7rpXY2W7hg2YlYxcO7fJOP8uUPe3SG8hVKUwbrkkgmX4piw2yipJbY6R1tK5MyIFZYn',
                    'Content-Type': 'application/json'
            },

        }).then(response => {
                setLoading(false);
                console.log(response);
                if (response.data.message==="Server Error"){
                    setLoading(false);

                }
                if (response.data.data == null){
                    setshow(2);

                } else {
                    setError("");
                    setname(response.data.data.user_name);
                    setnumber("no response");
                    setserver(response.data.data.server_response);
                    setnetwork("Data");
                    setstatus(response.data.data.status);
                    setrefid(response.data.data.ref);
                    setamount(response.data.data.amount);
                    setdate(response.data.data.date);
                    setupdate(response.data.data.updated_at);
                    setid(response.data.data.id);
                    setshow(1);

                }
            });
    }

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "refid"){
            setrefid(value);
        }

    }


    const Reverse = async ()=>  {
        setLoading(true);
        try {

            await axios
                .post(baseURL, {

                    username: name,
                    refid: refid,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                    setError("");
                    setLoading(false);
                    const messages = response.data.message;
                    if (response.data.status ==1) {
                        Swal.fire({
                            title: "Response",
                            text: messages,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();

                        });

                    } else {
                        Swal.fire({
                            title: "Response",
                            text: messages,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();

                        });
                    }
                });
        }catch (e) {

        }
    }
    const Marksuccess = async ()=>  {
        setLoading(true);
        try {

            await axios
                .post(baseURL3, {

                    username: name,
                    id: id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                    setError("");
                    setLoading(false);
                    const messages = response.data.message;
                    if (response.data.status ==1) {
                        Swal.fire({
                            title: "Response",
                            text: messages,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();

                        });

                    } else {
                        Swal.fire({
                            title: "Response",
                            text: messages,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();

                        });
                    }
                });
        }catch (e) {

        }
    }
    const Reversemark = async ()=>  {
        setLoading(true);
        try {

            await axios
                .post(baseURL1, {

                    username: name,
                    refid: refid,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                    setError("");
                    setLoading(false);
                    const messages = response.data.message;
                    if (response.data.status ==1) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: messages
                        }).then(() => {
                           window.location.reload();

                        });

                    } else {
                        Swal.fire({
                            title: "Response",
                            text: messages,
                            icon: "error",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();

                        });
                    }
                });
        }catch (e) {

        }
    }

    return (

        <>
            <div className="row">
                {loading ?<div className="overlay">
                        <div className="loader"></div>
                    </div>: true}
            <div className="row page-titles mx-0">
                <div className={'card'} style={{
                    borderRadius: "15px",
                    border: "1px solid #ccc",
                    padding: "20px",
                    backgroundColor: "#fff",
                    boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                    <div className="welcome-text">
                        <h3 className="text-black font-w600 mb-0">Transactions Details</h3>
                    </div>
                    <div className="col-sm-6 p-0 justify-content-sm-start mt-2 mt-sm-0 d-flex">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a
                                href="#">#{refid}</a></li>
                        </ol>
                    </div>
                </div>
            </div>
            </div>

            <br/>
            <br/>
            <div className="row">

                <div className="row page-titles mx-0">
                    <div className={'card'} style={{
                        borderRadius: "15px",
                        border: "1px solid #ccc",
                        padding: "20px",
                        backgroundColor: "#fff",
                        boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}>
                        <div className="welcome-text">
                            <h3 className="text-black font-w600 mb-0">Search Transaction(Data, Airtime, Bills Pay)</h3>
                        </div>
                        <div className="cm-content-body form excerpt" >
                            <form>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-5">
                                            <input type="text" className="form-control mb-xl-0 mb-3" name="refid"
                                                   value={refid} onChange = {(e) => handleInputChange(e)} id="refid"     placeholder="Reference ID"/>
                                        </div>

                                        <div className="col-xl-3 col-sm-6">
                                            <button className="btn btn-primary" title="Click here to Search" onClick={reload}
                                                    type="button"><i className="fa fa-search me-1"></i>Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/*@if($pass==0)*/}
                            {/*<div className="alert alert-warning alert-dismissible alert-alt fade show">*/}
                            {/*    <strong>Ooops!</strong>Transaction not found*/}
                            {/*</div>*/}
                            {/*@endif*/}
                        </div>
                    </div>
                </div>
            </div>


            {show === 1 ?

            <div className="row">
                <div className="">
                    {status === "0" ?
                        <div className="alert alert-danger alert-dismissible alert-alt fade show">
                            <strong>Ooops!</strong> This transaction was not successful kindly reverse or reprocess this transaction
                        </div>:true}
                    {status === "1" ?
                        <div className="alert alert-success alert-dismissible alert-alt fade show">
                            <strong>Successful!</strong> This transaction was successfully delivered to the customer
                        </div>: true}
                    {status === "2" ?
                        <div className="alert alert-primary alert-dismissible alert-alt fade show">
                            <strong>Reversed!</strong> This transaction was reversed back  to the customer
                        </div>: true}
                </div>
                <div className=" flex">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card" style={{
                                borderRadius: "15px",
                                border: "1px solid #ccc",
                                padding: "20px",
                                backgroundColor: "#fff",
                                boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}>
                                <div className="card-header d-sm-flex d-block border-0 pb-0">
                                    <div className="me-auto mb-sm-0 mb-3">
                                        <p className="fs-14 mb-1">ID Payment</p>
                                        <h5
                                            className="fs-34 text-black font-w600">#{refid}</h5>
                                        <h5
                                            className="fs-34 text-black font-w600">{name}</h5>
                                    </div>
                                    <div>
                                        <button type="button" onClick={Marksuccess} className="btn btn-success btn-rounded mb-sm-0 mb-2" style={{
                                            margin: "4px",
                                        }}><i
                                            className="fa fa-arrows  me-3"></i>Mark Success
                                        </button>
                                        <button id="mark" onClick={Reversemark} className="btn btn-primary btn-rounded mb-sm-0 mb-2"><i
                                            className="fa fa-money-bill  me-3"></i>Mark Reverse
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex flex-wrap mb-sm-2 justify-content-between">
                                        <div className="pr-3 mb-3">
                                            <p className="fs-14 mb-1">Payment Method</p>
                                            <span className="text-black fs-18 font-w500">Wallet</span>
                                        </div>
                                        <div className="pr-3 mb-3">
                                            <p className="fs-14 mb-1">Invoice Date</p>
                                            <span
                                                className="text-black fs-18 font-w500">{date}</span>
                                        </div>
                                        <div className="pr-3 mb-3">
                                            <p className="fs-14 mb-1">Due Date</p>
                                            <span
                                                className="text-black fs-18 font-w500">{update}</span>
                                        </div>
                                        <div className="mb-3">
                                            <p className="fs-14 mb-1">Date Paid</p>
                                            <span className="text-black fs-18 font-w500">{update}</span>
                                        </div>
                                    </div>
                                    <div className="card-body p-3 bgl-dark rounded fs-14 d-flex"style={{
                                        borderRadius: "15px",
                                        border: "1px solid #ccc",
                                        padding: "20px",
                                        backgroundColor: "#fff",
                                        boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}>
                                        <p className="">
                                            Being Purchase of {network} on {number} initiate
                                            on {date}, | |
                                            with server response of "{server}" .
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">

                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                        <div className="card-body stacked">
                                            <img src="" alt="" className="mw-100"/>
                                            <div className="card-info ">
                                                <p className="mb-1">Amount</p>
                                                <h2 className="fs-36  mb-sm-4 mb-3">₦{amount.toString()}</h2>
                                                <button id="rever" onClick={Reverse} className="btn btn-danger btn-rounded mb-sm-0 mb-2">
                                                    <i className="fa fa-money-bill  me-3"></i>Reverse Money
                                                </button>
                                                <button type="button"  className="btn btn-info m-2 text-white">
                                                    <i className="fa fa-marker"></i> Re-process Data Selected
                                                </button>

                                                <hr/>
                                                <p className="mb-1">PRODUCT NAME</p>
                                                <h2 className="fs-36  mb-sm-4 mb-3">{network}</h2>
                                            </div>
                                        </div>

                                    </div>

                                    {/*<div className="d-sm-flex d-block">*/}
                                    {/*    <div className="d-flex me-auto mb-sm-0 mb-3 align-items-center">*/}
                                    {/*        <img src={gh} alt="savebills"*/}
                                    {/*             className="me-3 rounded-circle" width="85"/>*/}
                                    {/*        <div>*/}
                                    {/*            <h3 className="fs-24 text-black font-w600">{name}</h3>*/}
                                    {/*            <span>Info@savebills.com.ng</span>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="card-body">*/}
                                    {/*        <h4 className="fs-20 text-black font-w600 mb-4">Recipients</h4>*/}

                                    {/*        <div className="d-flex align-items-center p-3 rounded border border-primary">*/}
                                    {/*            <svg className="me-3" width="49" height="49" viewBox="0 0 49 49" fill="none"*/}
                                    {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*                <path*/}
                                    {/*                    d="M39.9991 32.4608V36.977C40.0008 37.3962 39.9147 37.8112 39.7464 38.1954C39.5781 38.5795 39.3313 38.9243 39.0217 39.2078C38.7122 39.4912 38.3467 39.707 37.9488 39.8413C37.5508 39.9756 37.1292 40.0255 36.7108 39.9878C32.0692 39.4844 27.6106 37.9015 23.6934 35.3662C20.0488 33.0549 16.9589 29.9711 14.643 26.3338C12.0938 22.4065 10.5074 17.9351 10.0122 13.2819C9.97455 12.8656 10.0241 12.4461 10.1578 12.0499C10.2915 11.6538 10.5063 11.2898 10.7887 10.9811C11.0711 10.6724 11.4148 10.4257 11.7979 10.2569C12.181 10.088 12.5951 10.0005 13.0139 10.0001H17.5391C18.2712 9.99296 18.9808 10.2517 19.5359 10.7281C20.0909 11.2044 20.4534 11.866 20.5559 12.5894C20.7469 14.0347 21.1011 15.4538 21.6118 16.8196C21.8147 17.3584 21.8586 17.944 21.7383 18.507C21.618 19.07 21.3386 19.5867 20.933 19.996L19.0173 21.9079C21.1646 25.6767 24.2914 28.7973 28.0677 30.9403L29.9833 29.0284C30.3935 28.6237 30.9112 28.3448 31.4753 28.2247C32.0394 28.1046 32.6262 28.1485 33.1661 28.351C34.5346 28.8607 35.9565 29.2142 37.4046 29.4048C38.1374 29.508 38.8065 29.8763 39.2849 30.4398C39.7633 31.0032 40.0174 31.7225 39.9991 32.4608Z"*/}
                                    {/*                    fill="#1EAAE7"/>*/}
                                    {/*            </svg>*/}
                                    {/*            <div>*/}
                                    {/*                <p className="text-primary fs-14 mb-1">Telephone</p>*/}
                                    {/*                <span className="text-primary font-w600">{number}</span>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}

                                </div>


                                <div className="">
                                    <div className="card">

                                        {status === "0" ?
                                            <div className="alert alert-danger alert-dismissible alert-alt fade show">
                                                <strong>Ooops!</strong> This transaction was not successful kindly reverse or reprocess this transaction
                                            </div>:true}
                                        {status === "1" ?
                                            <div className="alert alert-success alert-dismissible alert-alt fade show">
                                                <strong>Successful!</strong> This transaction was successfully delivered to the customer
                                            </div>: true}
                                        {status === "2" ?
                                            <div className="alert alert-primary alert-dismissible alert-alt fade show">
                                                <strong>Reversed!</strong> This transaction was reversed back  to the customer
                                            </div>: true}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


            </div>:
                true}

            <br/>
            <br/>
            <div className="row">
                {show === 2 ?

                    <div className="row page-titles mx-0">
                        <div className=" flex">
                            <div className="row">
                                <div className="">
                                    <div className="">
                                        <div className="card">

                                            <div className="alert alert-danger alert-dismissible alert-alt fade show">
                                                <strong>Ooops!</strong> This transaction was not found
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div> :
                    true}
            </div>

        </>



    );
}
