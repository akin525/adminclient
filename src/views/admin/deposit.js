import React, {useEffect, useState} from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import TableDropdown from "../../components/Dropdowns/TableDropdown";
import gh from "lg.png";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Deposit({color}) {
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [userid, setuserid] = useState("");
    const [totaldeposit, settotaldeposit] = useState("0");
    const [todaydeposit, settotodaydeposit] = useState("0");
    const [yesterdaydepo, setyesterdaydepo] = useState("0");
    const [twodaysdepo, settwodaysdepo] = useState("0");
    const [threedaysdepo, setthreedaysdepo] = useState("0");
    const [fourdaysdepo, setfourdaysdepo] = useState("0");
    const [aweekdepo, setaweekdepo] = useState("0");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://admin.savebills.com.ng/api/auth/alldeposit";
    const baseURL1 = "https://admin.savebills.com.ng/api/auth/dashboard";
    const [modalShow, setModalShow] = React.useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10; // Number of items to display per page


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
                setError("");
                setMessage(response);
                console.log(setMessage);
                setuserid(response.data.id);
                setdatass(response.data.deposit);
                settotaldeposit(response.data.sumdepo);
                settotodaydeposit(response.data.todaydeposit);
                setyesterdaydepo(response.data.yesterdayDepo);
                settwodaysdepo(response.data.twodayDepo);
                setthreedaysdepo(response.data.threedayDepo);
                setfourdaysdepo(response.data.fourdayDepo);
                setaweekdepo(response.data.aweekDepo);

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
                    .payment_ref
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
    );



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
                                        All Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{parseInt(totaldeposit).toLocaleString()}
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

                                <span className="whitespace-nowrap">Total Deposit</span>
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
                                       Today
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

                                <span className="whitespace-nowrap">Today Transaction</span>
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
                                       Yesterday Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{yesterdaydepo.toLocaleString()}
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

                                <span className="whitespace-nowrap">Yesterday Transaction</span>
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
                                        2days Ago Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{twodaysdepo.toLocaleString()}
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

                                <span className="whitespace-nowrap">Two days ago transaction</span>
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
                                        3days Ago Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{threedaysdepo.toLocaleString()}
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

                                <span className="whitespace-nowrap">Three days ago transaction</span>
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
                                        4days Ago Deposit
                                    </h5>
                                    <span className="font-semibold text-xl text-blueGray-700">
                                               ₦{fourdaysdepo.toLocaleString()}
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

                                <span className="whitespace-nowrap">Four days ago transaction</span>
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
                                               ₦{aweekdepo.toLocaleString()}
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

                                <span className="whitespace-nowrap">A week transaction</span>
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

            {/*<Button variant="primary" onClick={() => setModalShow(true)}>*/}
            {/*    Launch vertically centered modal*/}
            {/*</Button>*/}

            {/*<MyVerticallyCenteredModal*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => setModalShow(false)}*/}
            {/*/>*/}

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
                                       All Deposit
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
                                       Amount Before
                                    </th>
                                    <th
                                        className={
                                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                            (color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                        }
                                    >
                                       Amount After
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
                                    ></th>
                                </tr>
                                </thead>
                                    <tbody>
                                    {currentPageData.map(datab => (
                                        <tr key={datab.id}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                <span
                                                    className={
                                                        "ml-3 font-bold " +
                                                        +(color === "light" ? "text-blueGray-600" : "text-white")
                                                    }
                                                >
                   {datab.username}
                  </span>
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.payment_ref}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.amount}
                                            </td>
                                            {datab.status == "0" ?
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-warning mr-2"></i> pending
                                                </td> : true}
                                            {datab.status == "1" ?
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-success mr-2"></i> Funded
                                                </td> : true}
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.iwallet}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.fwallet}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {datab.createdAt}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              <i className="fa fa-eye"></i>
                                            </td>
                                        </tr>
                                    ))}
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
