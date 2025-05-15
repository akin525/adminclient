

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
// import 'react-quill/dist/quill.snow.css';

import ig from 'images.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default function Notification() {
    const baseURL = "https://admin.server.savebills.com.ng/api/auth/dashboard";
    const baseURL1 = "https://admin.server.savebills.com.ng/api/auth/noti";
    const [account_number, setaccount_number] = useState("0");
    const [userid, setuserid] = useState("");
    const [account_number1, setaccount_number1] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [account_name1, setaccount_name1] = useState("0");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    let token=localStorage.getItem('dataKey');

    React.useEffect(() => {
        setLoading(true);
        axios
            .get(baseURL, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");

                if (response.data.status ==="0"){
                    window.location='auth/login';
                }
                console.log(response.data);
                setName(response.data.username);
                setaccount_number(response.data.account_number);
                setaccount_number1(response.data.account_number1);
                setaccount_name(response.data.account_name);
                setaccount_name1(response.data.account_name1);
                setMessage(response.data.noti);
                setuserid(response.data.id);


                setLoading(false);
            });

    }, []);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "message"){
            setMessage(value);
        }
    }
    const handleSubmit  = async () =>  {
        setLoading(true);

        try {
            axios
                .post(baseURL1, {

                    message:message,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setError("");
                setMessage(response);
                setLoading(false);
                if (response.data.status === "0") {
                    setError(response.data.message);
                    swal({
                        title: "Fail",
                        text: response.data.message,
                        icon: "error",
                        confirmButtonText: "OK",
                    })

                }else {
                    swal({
                        title: "Done",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/notification";
                    });
                }
            });
        }catch (e) {
                console.log(e);
                console.log("e.data");
                console.log(e.data);
                setError("An error occured. Check your input and try again");
            }

    }




    return (
        <>
            <CKEditor
                editor={ ClassicEditor }
                config={ {
                    toolbar: {
                        items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                    },
                    plugins: [
                        Bold, Essentials, Italic, Mention, Paragraph, SlashCommand, Undo
                    ],
                    licenseKey: '<YOUR_LICENSE_KEY>',
                    mention: {
                        // Mention configuration
                    },
                    initialData: '<p>Hello from CKEditor 5 in React!</p>',
                } }
            />
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-white text-xl font-semibold">Notification</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            {loading ? <div className="overlay">
                                    <div className="loader"></div>
                                </div> :
                                <form>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Enter Your Text
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full ">
                                            <div className="relative w-full mb-3">

                                                <input type={'text'}
                                                       className="form-control"
                                                       value={message} onChange={(e) => handleInputChange(e)}
                                                       id="message"/>

                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleSubmit}
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                        Update Notification<span className="load loading"></span>
                                    </button>
                                    <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                </form>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
