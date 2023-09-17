import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { api_back } from "../api/info_appli";
import { Get } from "../api/service";
import { Link } from "react-router-dom";


export default function Navbar(){
    const user= useSelector((state)=>state?.userReducer?.user)
    const token= useSelector((state)=>state?.userReducer?.token)

    const [messages, setMessages]= useState([]);
    //const [alerts, setAlerts]= useState([]);

    useEffect(()=>{
        Get("/message/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    setMessages(rs?.messages)
                }
            }
        ).catch((err)=>{})
    }, [token])


    function toggle(){
        const sidebar= document.getElementsByClassName("sidebar")[0]
        //bd.toggleClass("sidebar-toggled")
        const rs= sidebar.style.display
        sidebar.style.display = rs==="block" ? "none": "block"
    }



    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" onClick={toggle} className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#!" id="messagesDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-danger badge-counter">{messages?.length}</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                            Message Center
                        </h6>
                        {
                            messages.map((value, index)=>{
                                return (
                                    <a key={index} className="dropdown-item d-flex align-items-center" href="#!">
                                        <div className="dropdown-list-image mr-3">
                                            <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                alt="..." />
                                            <div className="status-indicator bg-success"></div>
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                                problem I've been having.</div>
                                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#!" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.nom+" "+user?.prenom }</span>
                        <img className="img-profile rounded-circle"
                            src={user?.profile ? api_back+"/file/show/"+user?.profile: 'img/undraw_profile_3.svg'} alt="img1" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="profil">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profil
                        </Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#!" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>

            </ul>

        </nav>

    )
}