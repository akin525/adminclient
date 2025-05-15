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
    const baseURL2 = "https://admin.server.savebills.com.ng/api/auth/product";
    const baseURL = "https://admin.server.savebills.com.ng/api/auth/switch";
    const baseURL3 = "https://admin.server.savebills.com.ng/api/auth/updatepro";
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 30; // Number of items to display per page

    let token=localStorage.getItem('dataKey');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };
    const [productid, setproductid] = useState('');
    const [tamount, settamount] = useState('');
    const [ramount, setramount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ id: null, name: '' });

    const openModal = (datab,) => {
        setSelectedUser(datab);
        setIsModalOpen(true);
        // console.log(datab);
        setproductid(datab.id);
    };



    const closeModal = () => {
        setIsModalOpen(false);
    };

    const ro= () => {
        swal({
                 title: 'Processing',
                 text: 'Please wait...',
                 icon: 'info',
                 allowOutsideClick: false,
                 showConfirmButton: false
             });
    }
    const saveChanges = () => {
       ro(true);
        try {
            axios
                .post(baseURL3, {

                    productid:productid,
                    tamount:tamount,
                    ramount:ramount,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                ro(false);
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
                    }).then(() => {
                        window.location.reload(); // Reload the page
                    });
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
        // Add code here to save changes and update user data
        closeModal();
    };



    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "id1"){
            setid1(value);
        }

        if(id === "tamount"){
            settamount(value);
        }
        if(id === "ramount"){
            setramount(value);
        }

    }
    const swi  = async (value) =>  {
        setLoading(true);

        try {
            axios
                .post(baseURL, {
                id:value,
                })
                .then(response => {
                    setLoading(false)
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
                        }).then(function () {
                            window.location.href = "/product";

                        });

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


    const offset = currentPage * perPage;
    const currentPageData = filteredData.slice(offset, offset + perPage);



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
                                            Status
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
                                                    {datab.status == "1" ?
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <label className="switch">
                                                            <input type="checkbox"  checked
                                                                   onClick={()=>swi(datab.id)}
                                                            />
                                                            <span className="slider"></span>
                                                        </label>
                                                    </td>:
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <label className="switch">
                                                        <input type="checkbox"
                                                        onClick={()=>swi(datab.id)}
                                                        />
                                                        <span className="slider"></span>
                                                        </label>
                                                        </td>}
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

                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button type="button" className="btn btn-info" onClick={() => openModal(datab)}>Edit</button>
                                                </td>
                                                    {datab.status == "0" ?
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <i className="fas fa-circle text-warning mr-2"></i> Not-Active
                                                        </td> : true}
                                                    {datab.status == "1" ?
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <i className="fas fa-circle text-success mr-2"></i> Active
                                                        </td> : true}
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }

                            {isModalOpen && (
                                <div className="modal">
                                    <div className="modal-content">

                                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                            <form>
                                                <center>

                                                    <div className="flex flex-wrap">
                                                        <h3 className="text-success">Product Name: {selectedUser.plan}</h3>
                                                        <br/>
                                                        <br/>
                                                        <div className="w-full  px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                   Selling Amount
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    id="tamount" value={tamount} onChange={(e) =>handleInputChange(e)}
                                                                    required/>
                                                                <input type="hidden" id="productid" value={selectedUser.id} onChange={e => setSelectedUser({ ...selectedUser, id: e.target.value })} />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                   Reseller Amount
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                    id="ramount" value={ramount}  onChange={(e) => handleInputChange(e)}
                                                                    required/>
                                                            </div>
                                                            <button  type="button" className="btn btn-success" onClick={saveChanges}>
                                                                Update Now
                                                            </button>
                                                            <br/>
                                                            <br/>
                                                            <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
                                                        </div>
                                                        <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                                    </div>
                                                </center>
                                            </form>
                                        </div>

                                        {/*<h2>Edit User</h2>*/}
                                        {/*<p>ID: {selectedUser.id}</p>*/}
                                        {/*<label htmlFor="newName">New Name:</label>*/}
                                        {/*<br/>*/}
                                        {/*<button className="btn btn-success" onClick={saveChanges}>Save</button>*/}
                                        {/*<button className="btn btn-danger" onClick={closeModal}>Cancel</button>*/}
                                    </div>
                                </div>
                            )}


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
