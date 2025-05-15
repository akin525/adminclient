import React, {useEffect, useState} from "react";
import axios from "axios";

import swal from "sweetalert";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [show, setShow] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id,setid] = useState("");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://admin.server.savebills.com.ng/api/auth/allock";
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {

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
                setdatass(response.data.allock);
                // if (response.data.status ==="0"){
                //     window.location='/auth';
                // }
                console.log(response.data);

            });

    }, [token]);

    return(
        <>
            {loading ? <div className="loader-container">
                    <div className="spinner"/>
                </div> :
                <div className="flex flex-wrap">
                    {datass.map((datab) => (
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4 mb-3">
                            <div
                                className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                <div className="flex-auto p-4">
                                    <div className="flex flex-wrap">
                                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                                {datab.tittle}
                                            </h5>
                                            <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{datab.balance.toLocaleString()}
                                </span>
                                        </div>
                                        <div className="relative w-auto pl-4 flex-initial">
                                            <div
                                                className=
                                                    "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                            >
                                                <i className="fa fa-wallet"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-blueGray-400 mt-4">

                                        <span className="whitespace-nowrap">Withdraw Date: {datab.date}</span>
                                    </p>
                                    {datab.status == "1" ?
                                        <button
                                            className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2 mb-4"
                                            style={{margin: "20px"}}>
                                            Running
                                        </button> : true}
                                    {datab.status == "0" ?
                                        <button
                                            className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2 mb-3 "
                                            style={{margin: "10px"}}>
                                            Complete
                                        </button> : true}
                                    {/*{datab.status == "1" ?*/}
                                    {/*    <button onClick={handleShow}*/}
                                    {/*            className="bg-lightBlue-400 text-white active:bg-green-700  font-bold uppercase text-xs px-4 py-2">*/}
                                    {/*        Add Money*/}
                                    {/*    </button> : true}*/}

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            }


            </>
    );
}