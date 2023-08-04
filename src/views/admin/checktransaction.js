import React, {useEffect, useState} from "react";



export default function checktransaction({color}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [userid, setuserid] = useState("");
    const [idm,setidm] = useState("");
    const [datass, setdatass]=useState([])
    const baseURL2 = "https://admin.savebills.com.ng/api/auth/pending";
    const baseURL1 = "https://admin.savebills.com.ng/api/auth/approve";
    const baseURL = "https://admin.savebills.com.ng/api/auth/reverse";
    const [modalShow, setModalShow] = React.useState(false);
    const [loading, setLoading]=useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 10; // Number of items to display per page
    return (

        <>


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

                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="card card-body">
                            <input
                                type="text"
                                placeholder="Find Transaction..."
                                className="form-control"
                            />
                            <button type="button" className="btn btn-info"><i className="fa fa-search"></i>Find </button>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}

                            {loading ? <div className="overlay">
                                    <div className="loader"></div>
                                </div>:
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-4/12 xl:w-6/12 px-4 mb-3">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                            All Users
                                                        </h5>
                                                        <span className="font-semibold text-xl text-blueGray-700">
                                                   2000
                                </span>
                                                    </div>
                                                    <div className="relative w-auto pl-4 flex-initial">
                                                        <div
                                                            className=
                                                                "text-success p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
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
                                    <div className="w-full lg:w-4/12 xl:w-6/12 px-4 mb-3">
                                        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                            <div className="flex-auto p-4">
                                                <div className="flex flex-wrap">
                                                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                            All Reseller
                                                        </h5>
                                                        <span className="font-semibold text-xl text-blueGray-700">
                                                5000
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

                                                    <span className="whitespace-nowrap">Total Reseller</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            }


                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
