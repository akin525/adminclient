import React, {useState} from "react";

import axios from "axios";
import gh from 'lg.png'
import swal from "sweetalert";

export default function Purchase({color}) {
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [totalbill, settotalbill] = useState("0");
    const [todaybill, settotodaybill] = useState("0");
    const [yesterdaybill, setyesterdaybill] = useState("0");
    const [twodaysbill, settwodaysbill] = useState("0");
    const [threedaysbill, setthreedaysbill] = useState("0");
    const [fourdaysbill, setfourdaysbill] = useState("0");
    const [aweekbill, setaweekbill] = useState("0");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://admin.savebills.com.ng/api/auth/purchase";
    const baseURL3 = "https://admin.savebills.com.ng/api/auth/reprocess";
    const baseURL4 = "https://admin.savebills.com.ng/api/auth/mark";
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 100; // Number of items to display per page

    const [isLoading, setIsLoading] = useState(false);

    let token=localStorage.getItem('dataKey');
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
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

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
                setError("");
                setMessage(response);
                console.log(setMessage);
                setuserid(response.data.id);
                setdatass(response.data.all);
                settotalbill(response.data.sumbill);
                settotodaybill(response.data.todaybill);
                setyesterdaybill(response.data.yesterdaybill);
                settwodaysbill(response.data.twodaybill);
                setthreedaysbill(response.data.threedaybill);
                setfourdaysbill(response.data.fourdaybill);
                setaweekbill(response.data.aweekbill);
                const sortedData = response.data.all.sort((a, b) => b.id - a.id);
                setdatass(sortedData);
                setLoading(false);

                console.log(response.data);

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
                            // Redirect the user
                            // window.location.href = "/airtime";
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

    const offset = currentPage * perPage;
    const currentPageData = filteredData.slice(offset, offset + perPage);


    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-3/12 xl:w-2/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        All Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{parseInt(totalbill).toLocaleString()}
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
                                        Today Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{todaybill.toLocaleString()}
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

                                <span className="whitespace-nowrap">Today Purchase</span>
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
                                        Yesterday Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{yesterdaybill.toLocaleString()}
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

                                <span className="whitespace-nowrap">Yesterday Purchase</span>
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
                                        2days Ago Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{twodaysbill.toLocaleString()}
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

                                <span className="whitespace-nowrap">Two days ago Purchase</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        3days Ago Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{threedaysbill.toLocaleString()}
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

                                <span className="whitespace-nowrap">Three days ago Purchase</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        4days Ago Purchase
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{fourdaysbill.toLocaleString()}
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

                                <span className="whitespace-nowrap">Four days ago Purchase</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 xl:w-4/12 px-4 mb-3">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                        <div className="flex-auto p-4">
                            <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                        A Week Ago Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{aweekbill.toLocaleString()}
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

                                <span className="whitespace-nowrap">A week Purchase</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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

                            {loading ?<div className="overlay">
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


};
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
                                                    <span
                                                        className={
                                                            "ml-3 font-bold " +
                                                            +(color === "light" ? "text-blueGray-600" : "text-white")
                                                        }
                                                    >
                   {data.username}
                  </span>
            </th>
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
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.phone}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {data.createdAt}
            </td>
        </tr>

    );
};


