import React, {useState} from "react";

import axios from "axios";
import gh from 'lg.png'
import swal from "sweetalert";

export default function Product({color}) {
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [id1,setid1] = useState("");
    const [datass, setdatass]=useState([])
    const [amount,setamount] = useState("");
    const baseURL2 = "https://admin.savebills.com.ng/api/auth/product";
    const baseURL = "https://admin.savebills.com.ng/api/auth/switch";
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(false);

    let token=localStorage.getItem('dataKey');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "id1"){
            setid1(value);
        }

    }
    const swi  = async () =>  {

        try {
            axios
                .post(baseURL, {
                id:id1,
                })
                .then(response => {
                    setError("");
                    setMessage(response);
                    if (response.data.status == "0") {
                        setError(response.data.message);
                        swal({
                            title: "Ooops",
                            text: response.data.message,
                            icon: "error",
                            confirmButtonText: "OK",
                        })


                    }else{
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
                setdatass(response.data.product);
                setLoading(false);

                console.log(response.data);

            });

    }, [token]);

    const filteredData = datass.filter(
        person => {
            if (datass.length ===0) return [];
            return (
                person
                    .network
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .plan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||person
                    .plan_id
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||person
                    .amount
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }
    );




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
                                        Mobile Data Product
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}

                            {loading ? <div className="loader-container">
                                    <div className="spinner"/>
                                </div> :
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
                                            Switch
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Network
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Plan
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                       >
                                            Code
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                       >
                                            Actual Amount
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                            Selling Amount
                                        </th>
                                        <th
                                            className={
                                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                (color === "light"
                                                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                            }
                                        >
                                           Reseller Amount
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
                                        ></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map(datab => (
                                                <tr key={datab.id}>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <label className="switch">
                                                            <input type="checkbox"  checked={datab.status == "1"}
                                                                   value={datab.status} onChange = {(e) => handleInputChange(e)} id="id1"
                                                                  onClick={swi}
                                                            />
                                                            <span className="slider"></span>
                                                        </label>
                                                    </td>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                    <span
                                                        className={
                                                            "ml-3 font-bold " +
                                                            +(color === "light" ? "text-blueGray-600" : "text-white")
                                                        }
                                                    >
                   {datab.network}
                  </span>
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.plan}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.plan_id}
                                                </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.amount}
                                                </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.tamount}
                                                </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {datab.ramount}
                                                </td>
                                                {datab.status == "0" ?
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-circle text-warning mr-2"></i> Not-Active
                                                    </td> : true}
                                                {datab.status == "1" ?
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <i className="fas fa-circle text-success mr-2"></i> Active
                                                    </td> : true}
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-pen"></i>
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
