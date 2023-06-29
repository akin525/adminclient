import React, {useEffect, useState} from "react";

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import swal from "sweetalert";


export default function Pending({color}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [userid, setuserid] = useState("");
    const [idm,setidm] = useState("");
    const [datass, setdatass]=useState([])
    const baseURL2 = "https://admin.savebills.com.ng/api/auth/pending";
    const baseURL1 = "https://admin.savebills.com.ng/api/auth/approve";
    const baseURL = "https://admin.savebills.com.ng/api/auth/reverse";
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading]=useState(false);




    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {

        setLoading(true);
        axios
            .get(baseURL2, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setdatass(response.data.all);

                setLoading(false);

            });

    }, [token]);


    const filteredData = datass.filter(
        person => {
            if (datass.length ===0) return [];
            return (
                person
                    .username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .amount
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .createdAt
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||person
                    .refid
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
    );

    const handleSubmit  = async (value) =>  {
        // console.log(name,username,email,number,password,confirmPassword);
        console.log('hello');

        setLoading(true);

        try {
            axios
                .post(baseURL1, {
                    id:value,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setLoading(false);
                if (response.data.status === "0") {
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });


                }else{
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        window.location.href = "/pending";

                    });
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
        }
    }
    const handleSubmit1  = async (value1, value2, value3) =>  {
        // console.log(name,username,email,number,password,confirmPassword);


        setLoading(true);

        try {
            axios
                .post(baseURL, {
                    amount:value1,
                    username:value2,
                    id:value3,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setLoading(false);
                if (response.data.status === "0") {
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    });


                }else{
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        window.location.href = "/pending";

                    });
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
        }
    }


    return (

        <>

            <div className="card card-body">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    value={searchTerm}
                />
            </div>

            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div
                        className={
                            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                        }
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className={
                                            "font-semibold text-lg " +
                                            (color === "light" ? "text-blueGray-700" : "text-white")
                                        }
                                    >
                                        Purchase History
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}

                            {loading ? <div className="overlay">
                                    <div className="loader"></div>
                                </div>:
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                    <tr>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Username
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Product
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Amount
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Refid
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Status
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Action
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Number
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Date
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        ></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredData.map(datab => (
                                        <tr key={datab.id}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                   {datab.username}

                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.plan}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.amount}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.refid}
                                            </td>
                                            {datab.result == "0" ?
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-warning mr-2"></i> pending
                                                </td> : true}
                                            {datab.result == "1" ?
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-success mr-2"></i> Delivered
                                                </td> : true}

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                             <button type="button" onClick={()=>handleSubmit1(datab.amount, datab.username, datab.id)} className="btn btn-danger m-4">Reverse</button>
                                                <button onClick={()=>handleSubmit(datab.id)}  className="btn btn-success">Approve</button>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.phone}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.createdAt}
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
