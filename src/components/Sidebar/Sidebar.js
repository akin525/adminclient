/*eslint-disable*/

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import   'load.css';

import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const baseURL = "https://admin.server.savebills.com.ng/api/auth/dashboard";
  const baseURL1 = "https://admin.server.savebills.com.ng/api/auth/signout";


  const [totaldeposit, setTotaldeposit] = useState("0");
  const [totalbill, setTotalbill] = useState("0");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("0");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const [all, setall] = React.useState([]);
  let token=localStorage.getItem('dataKey');
  React.useEffect(() => {
    axios
        .get(baseURL, {
          // username:useCookies('username'),
          headers:{
            Authorization: `Bearer ${token}`
          },

        })
        .then(response => {
          setError("");
          setMessage(response);

          if (response.data.status ==="0"){
            window.location='login';
          }
          console.log(response.data);
          setName(response.data.username);
          setEmail(response.data.email);
          setBalance(response.data.wallet);
          setName(response.data.name);
          setTotalbill(response.data.totalbill);
          setTotaldeposit(response.data.totaldeposit);
          setall(response.data.bills);

          setMessage(response.data.message);


          setPost(response.data);
        });

  }, []);

  const handleSubmit  = async () =>  {

    try {
      axios
          .post(baseURL1)
          .then(response => {
            // setError("");
            // setMessage(response);

            if (response.data.status === "0") {
              // setError(response.data.message);


            }else{
              // setMessage(response.data.message);
              localStorage.removeItem('dataKey');
              // const [cookies, setCookie] = useCookies(response.data.username);
              swal({
                title: "Success",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
              }).then(function () {
                // Redirect the user
                window.location.href = "/";
              });
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      // setError("An error occured. Check your input and try again");
    }
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            SuperAdmin
          </Link>
          {/* User */}
          <button type="button" onClick={handleSubmit}  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
            Logout
          </button>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    {name}
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/*<h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">*/}
            {/*  Users Pages*/}
            {/*</h6>*/}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/deposit") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/deposit"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/deposit") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  All Deposit
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/purchase"
                >
                  <i
                    className={
                      "fas fa-money-bill mr-2 text-sm " +
                      (window.location.href.indexOf("/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                 All Purchase
                </Link>
              </li>
                <li className="items-center">
                    <Link
                        onClick={() => setCollapseShow("hidden")}

                        className={
                            "text-xs uppercase py-3 font-bold block " +
                            (window.location.href.indexOf("/pending") !== -1
                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/pending"
                    >
                        <i
                            className={
                                "fas fa-money-bill mr-2 text-sm " +
                                (window.location.href.indexOf("/pending") !== -1
                                    ? "opacity-75"
                                    : "text-blueGray-300")
                            }
                        ></i>{" "}
                        Pending Transaction
                    </Link>
                </li>
              <li className="items-center">
                    <Link
                        onClick={() => setCollapseShow("hidden")}

                        className={
                            "text-xs uppercase py-3 font-bold block " +
                            (window.location.href.indexOf("/searchpurchase") !== -1
                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/searchpurchase"
                    >
                        <i
                            className={
                                "fas fa-search mr-2 text-sm " +
                                (window.location.href.indexOf("/searchpurchase") !== -1
                                    ? "opacity-75"
                                    : "text-blueGray-300")
                            }
                        ></i>{" "}
                      Search Transaction
                    </Link>
                </li>
              <li className="items-center">
                    <Link
                        onClick={() => setCollapseShow("hidden")}

                        className={
                            "text-xs uppercase py-3 font-bold block " +
                            (window.location.href.indexOf("/searchmcd") !== -1
                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/searchmcd"
                    >
                        <i
                            className={
                                "fas fa-search mr-2 text-sm " +
                                (window.location.href.indexOf("/searchmcd") !== -1
                                    ? "opacity-75"
                                    : "text-blueGray-300")
                            }
                        ></i>{" "}
                      MCD Verify
                    </Link>
                </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/createlock") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/alluser"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/alluser") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                 All User
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/finduser") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/finduser"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/finduser") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                Find User
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/allock") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/allock"
                >
                  <i
                    className={
                      "fas fa-money-bill mr-2 text-sm " +
                      (window.location.href.indexOf("/aallock") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  All-Lock
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/product") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/product"
                >
                  <i
                    className={
                      "fas fa-shopping-cart mr-2 text-sm " +
                      (window.location.href.indexOf("/product") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Products
                </Link>
              </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/product") !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/notification"
                >
              <i
                  className={
                    "fas fa-book mr-2 text-sm " +
                    (window.location.href.indexOf("/notification") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                  }
              ></i>{" "}
             Set Notification
            </Link>
          </li>
              <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/mreport") !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/mreport"
                >
              <i
                  className={
                    "fas fa-bookmark mr-2 text-sm " +
                    (window.location.href.indexOf("/mreport") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                  }
              ></i>{" "}
            Get Report
            </Link>
              </li>
                  <li className="items-center">
                <Link
                    onClick={() => setCollapseShow("hidden")}

                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/withdraw") !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/withdraw"
                >
              <i
                  className={
                    "fas fa-bookmark mr-2 text-sm " +
                    (window.location.href.indexOf("/withdraw") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                  }
              ></i>{" "}
            MCD Withdraw
            </Link>
          </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
