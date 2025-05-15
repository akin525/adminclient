

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ig from 'images.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";
import gh from "../../lg.png";

export default function Mreport({color}) {
    const baseURLD = "https://admin.server.savebills.com.ng/api/auth/dreport";
    const baseURLW = "https://admin.server.savebills.com.ng/api/auth/wreport";
    const baseURLM = "https://admin.server.savebills.com.ng/api/auth/report";
    const [date, setdate] = useState("0");
    const [name, setName] = useState("");
    const [airtime, setairtime] = useState("0");
    const [airtimec, setairtimec] = useState("0");
    const [data, setdata] = useState("0");
    const [datac, setdatac] = useState("0");
    const [tv, settv] = useState("0");
    const [tvc, settvc] = useState("0");
    const [elect, setelect] = useState("0");
    const [electc, setelectc] = useState("0");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    let token=localStorage.getItem('dataKey');

    function getCurrentMonth() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // getMonth() returns a zero-based index

        // Ensure the month is in two-digit format
        const formattedMonth = month.toString().padStart(2, '0');

        return `${year}-${formattedMonth}`;
    }
    const currentMonth = getCurrentMonth();
    const handleInputChange = (e) => {
        const {id, value} = e.target;
        if (id === "name") {
            setName(value);
        }
    }
    //
    // const handleInputChange = (e) => {
    //     const {id , value} = e.target;
    //
    //     if(id === "date"){
    //         setdate(value);
    //     }
    // }
    const handleSubmitdaily  = async () =>  {
        setLoading(true);

        axios
            .post(baseURLD, {
                date:name,

            }).then(response => {
            setError("");
            setMessage(response);
            setairtime(response.data.airtimes);
            setairtimec(response.data.airtimec);
            setdata(response.data.datems);
            setdatac(response.data.datamc);
            setName(response.data.date);
            console.log(response.data);

            setMessage(response.data.message);

            setLoading(false);
        });
    }

    const handleSubmitweekly  = async () =>  {
        setLoading(true);

        axios
            .post(baseURLW, {
                date:name,

            }).then(response => {
            setError("");
            setMessage(response);
            setairtime(response.data.airtimes);
            setairtimec(response.data.airtimec);
            setdata(response.data.datems);
            setdatac(response.data.datamc);
            setName(response.data.date);
            console.log(response.data);

            setMessage(response.data.message);

            setLoading(false);
        });
    }



    const handleSubmitmonhly  = async () =>  {
        setLoading(true);

        axios
            .post(baseURLM, {
                date:name,

            }).then(response => {
            setError("");
            setMessage(response);
            setairtime(response.data.airtimes);
            setairtimec(response.data.airtimec);
            setdata(response.data.datems);
            setdatac(response.data.datamc);
            setName(response.data.date);
            console.log(response.data);

            setMessage(response.data.message);

            setLoading(false);
        });
    }




    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-10/12 px-5">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Report</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    { name}  Report
                                </button>
                            </div>
                        </div>
                        {loading ? <div className="overlay">
                                <div className="loader"></div>
                            </div> :
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
                                        Name
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
                                        Count
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap">
                                        Data
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        ₦{data.toLocaleString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        {datac}
                                    </td>

                                </tr>
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap">
                                       Airtime
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        ₦{airtime.toLocaleString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        {airtimec}
                                    </td>

                                </tr>
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap">
                                       Tv
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        ₦{tv.toLocaleString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        {tvc}
                                    </td>

                                </tr>
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap">
                                        Electricity
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        ₦{elect.toLocaleString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                                        {electc}
                                    </td>

                                </tr>

                                </tbody>
                            </table>

                        </div>
                        }
                    </div>

                </div>


                {/*MONTHLY REPORT*/}

                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        {/*<i className="fa fa-calendar-day " style={{fontSize: "100px"}}></i>*/}
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className="text-center mt-12">
                                <ul className="list-group">
                                    <form>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Select Month
                                        </h6>
                                        <div className="flex flex-wrap">

                                            <div className="w-full ">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Calender
                                                    </label>
                                                    <input
                                                        type="month"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={name} onChange={(e) => handleInputChange(e)}
                                                        id="name"
                                                        required/>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={handleSubmitmonhly}
                                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                            Search
                                        </button>
                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                    </form>
                                </ul>

                                <br></br>
                                <br></br>


                            </div>


                        </div>
                    </div>

                </div>
                {/*DAILY REPORT*/}
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="text-center mt-12">
                                <ul className="list-group">
                                    <form>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Select Date
                                        </h6>
                                        <div className="flex flex-wrap">
                                            <div className="w-full ">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Calender
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={name} onChange={(e) => handleInputChange(e)}
                                                        id="name"
                                                        required/>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={handleSubmitdaily}
                                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                            Search
                                        </button>
                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                    </form>
                                </ul>

                                <br></br>
                                <br></br>


                            </div>

                        </div>
                    </div>

                </div>

                {/*WEEKLY REPORT*/}
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="text-center mt-12">
                                <ul className="list-group">

                                    <form>
                                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            Select Week
                                        </h6>
                                        <div className="flex flex-wrap">

                                            <div className="w-full ">
                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Calender
                                                    </label>
                                                    <input
                                                        type="week"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={name} onChange={(e) => handleInputChange(e)}
                                                        id="name"
                                                        required/>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={handleSubmitweekly}
                                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                            Search
                                        </button>
                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                    </form>

                                </ul>

                                <br></br>
                                <br></br>


                            </div>

                        </div>
                    </div>

                </div>



            </div>

        </>
    );
}
