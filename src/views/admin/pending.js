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
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [datass, setdatass]=useState([])
    const baseURL2 = "https://app.savebills.com.ng/api/auth/pending";
    const baseURL1 = "https://app.savebills.com.ng/api/auth/approve";
    const baseURL = "https://app.savebills.com.ng/api/auth/reverse";
    const baseURL3 = "https://app.savebills.com.ng/api/auth/reprocess";
    const baseURL4 = "https://app.savebills.com.ng/api/auth/mark";
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 100; // Number of items to display per page

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(datass.map(row => row.id));
        }
        setSelectAll(!selectAll);
    };


    const handleReprocess = async ()=>  {

        // alert([selectedRows]);
        setLoading(true);
        try {

            await axios
                .post(baseURL3, {

                    userId: userid,
                    productid: selectedRows,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                    setError("");
                    setLoading(false);
                    const messages = response.data.message;
                    if (Array.isArray(messages)) {
                        const formattedMessages = messages.map((messageObject) => {
                            return `${messageObject.status === '1' ? 'Success' : 'Error'}: ${messageObject.message}`;
                        });
                        swal({
                            title: "Response",
                            text: formattedMessages.join('\n'),
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function () {
                            window.location.reload();
                        });

                    }
                });
        }catch (e) {

        }
    }
    const handleMark = async ()=>  {
        setLoading(true);
        try {

            await axios
                .post(baseURL4, {

                    userId: userid,
                    productid: selectedRows,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                    setError("");
                    setLoading(false);
                    const messages = response.data.message;
                    if (Array.isArray(messages)) {
                        const formattedMessages = messages.map((messageObject) => {
                            return `${messageObject.status === '1' ? 'Success' : 'Error'}: ${messageObject.message}`;
                        });
                        swal({
                            title: "Response",
                            text: formattedMessages.join('\n'),
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(function () {

                        });

                    }
                });
        }catch (e) {

        }
    }

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
                const sortedData = response.data.all.sort((a, b) => b.id - a.id);
                setdatass(sortedData);
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
    const offset = currentPage * perPage;
    const currentPageData = filteredData.slice(offset, offset + perPage);

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
            <div className="card-group card-body">
                <button type="button" onClick={handleReprocess} className="btn btn-info m-2">
                    <i className="fa fa-marker"></i> Re-process Data Selected
                </button>
                <button type="button" onClick={handleMark} className="btn btn-danger m-2">
                    <i className="fa fa-map-marker"></i>Mark Successful
                </button>

                <button type="button" onClick={handleMark} className="btn btn-danger m-2">
                    <i className="fa fa-map-marker"></i>Reversed Selected
                </button>
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
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
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
                                            View
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
                                    {currentPageData.map(datab => (
                                        <TableRow
                                            key={datab.id}
                                            data={datab}
                                            isSelected={selectedRows.includes(datab.id)}
                                            onCheckboxChange={handleCheckboxChange}
                                        />
                                    ))
                                    }
                                    </tbody>
                                </table>
                            }


                            {/* Add the pagination component */}
                            <div className="button-pagination">
                                {/* ... existing code ... */}

                                {/* Add the pagination buttons */}
                                <button
                                    className={currentPage === 0 ? 'disabled' : ''}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.ceil(filteredData.length / perPage) }).map(
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={currentPage === index ? 'active' : ''}
                                            onClick={() => setCurrentPage(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                                <button
                                    className={currentPage === Math.ceil(filteredData.length / perPage) - 1 ? 'disabled' : ''}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={currentPage === Math.ceil(filteredData.length / perPage) - 1}
                                >
                                    Next
                                </button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
const TableRow = ({ data, color, isSelected, onCheckboxChange }) => {
    return (
        <tr key={data.id}>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onCheckboxChange(data.id)}
                />
            </td>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                {data.username}

            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <Link to={"/viewpurchase?id=" +data.id}>  <i className="fa fa-eye"></i></Link>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.plan}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.amount}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.refid}
            </td>
            {data.result == "0" ?
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-warning mr-2"></i> pending
                </td> : true}
            {data.result == "1" ?
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-success mr-2"></i> Delivered
                </td> : true}
            {data.result == "2" ?
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-primary mr-2"></i> Reversed
                </td> : true}

            {/*<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">*/}
            {/*    <button type="button" onClick={()=>handleSubmit1(datab.amount, datab.username, datab.id)} className="btn btn-danger m-4">Reverse</button>*/}
            {/*    <button onClick={()=>handleSubmit(datab.id)}  className="btn btn-success">Approve</button>*/}
            {/*</td>*/}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.phone}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.createdAt}
            </td>
        </tr>

    );
};

