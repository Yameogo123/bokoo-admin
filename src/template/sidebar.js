import React, {  } from "react";
import { Link, useLocation } from "react-router-dom";
//import { useSelector } from 'react-redux';

export default function Sidebar(){
    //const user= useSelector((state)=>state?.userReducer?.user)

    const location = useLocation();

    function toggle(){
        const sidebar= document.getElementsByClassName("sidebar")[0]
        if(sidebar.classList.contains("toggled")){
            sidebar.classList.remove("toggled")
        }else{
            sidebar.classList.add("toggled")
        }
    }


    return ( 
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
              <div className="sidebar-brand-icon rotate-n-15">
                  <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Bokoo<sup>v1</sup></div>
            </a>

            <hr className="sidebar-divider my-0" />
 
            <li className={"nav-item "+(location.pathname==="/" ? "active" : "")}>
              <a className="nav-link" href="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Bokoo covoiturage
            </div>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#!" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Données</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Informations:</h6>
                        <Link className={"collapse-item "+(location.pathname==="/info" ? "active" : "")} to="info">A propos</Link>
                        <Link className={"collapse-item "+(location.pathname==="/user.liste" ? "active" : "")} to="user.liste">Utilisateurs</Link>
                        <Link className={"collapse-item "+(location.pathname==="/statut.liste" ? "active" : "")} to="statut.liste">statuts</Link>
                        <Link className={"collapse-item "+(location.pathname==="/trajet.liste" ? "active" : "")} to="trajet.liste">Trajets</Link>
                        <Link className={"collapse-item "+(location.pathname==="/reservation.liste" ? "active" : "")} to="reservation.liste">Réservations</Link>
                        <Link className={"collapse-item "+(location.pathname==="/badge.liste" ? "active" : "")} to="badge.liste">Badges</Link>
                        <Link className={"collapse-item "+(location.pathname==="/discussion.liste" ? "active" : "")} to="discussion.liste">Discussion</Link>
                        <Link className={"collapse-item "+ (location.pathname==="/evaluation.liste" ? "active" : "")} to="evaluation.liste">Evaluation</Link>
                        <Link className={"collapse-item "+(location.pathname==="/message.liste" ? "active" : "")} to="message.liste">Message</Link>
                        <Link className={"collapse-item "+(location.pathname==="/vehicule.liste" ? "active" : "")} to="vehicule.liste">Vehicule</Link>
                    </div>
                </div>
            </li>

            {/* <li className="nav-item">
                <a className="nav-link collapsed" href="#!" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Comptabilité</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <a className={"collapse-item "} href="/">Argent recus</a>
                        <a className={"collapse-item "} href="/">En attente</a>
                        <a className={"collapse-item "} href="/">Remboursement</a>
                    </div>
                </div>
            </li> */}

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Outils
            </div>

            <li className={"nav-item "+(location.pathname==="/api" ? "active" : "")}>
                <Link className="nav-link collapse-item" to="api">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    API
                </Link>
            </li>

            <li className={"nav-item "+(location.pathname==="/requete" ? "active" : "")}>
                <Link className="nav-link collapse-item" to="requete">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    Requêtes
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button onClick={toggle} className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    )
}