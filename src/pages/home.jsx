import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Get } from "../api/service";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { groupBy } from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home(){

    //const user= useSelector((state)=> state.userReducer.user);
    const token= useSelector((state)=> state.userReducer.token);
    const [users, setUsers]= useState([]);
    const [status, setStatus]= useState([]);
    const [trajets, setTrajets]= useState([]);
    const [reservations, setReservations]= useState([]);
    const location= useLocation()

    useEffect(()=>{
        async function getUsers(){
            const u= await Get("/user/all", token);
            if(u?.users){
                setUsers(u?.users?.filter((f)=> f?.type!=="admin"));
            }
        }

        async function getStatus(){
            const s= await Get("/status/all", token);
            if(s?.status){
                setStatus(s?.status?.filter((f)=> f?.status==="active"))
            }
        }

        async function getTrajets(){
            const s= await Get("/trajet/all", token);
            if(s?.trajets){
                setTrajets(s?.trajets)
            }
        }

        async function getReservations(){
            const s= await Get("/reservation/all", token);
            if(s?.reservations){
                setReservations(s?.reservations)
            }
        }

        const tm= setInterval(() => {
            getUsers();
            getStatus();
            getTrajets();
            getReservations()
        }, 2000);

        return ()=> clearInterval(tm);
    }, [location, token]);

    function groupIt(key){
        return groupBy(users, key)
    }

    const data = {
        labels: ['utilisateurs actifs', 'les utilisateurs inactifs'],
        datasets: [
          {
            label: '# of users',
            data: [status.filter((f)=> f?.status==="active").length, status.filter((f)=> f?.status!=="active").length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            width: 5
          },
        ],
    };

    const data1 = {
        labels: ['users masculins', 'users feminins'],
        datasets: [
            {
                label: '# of genres',
                data: [users.filter((f)=> f?.genre==="masculin").length, users.filter((f)=> f?.genre!=="feminin").length],
                backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)' ],
                borderWidth: 1
            }
        ],
    };

    const data2 = {
        labels: [...Object.keys(groupIt("adresse"))],
        datasets: [
            {
                label: '# of adress',
                data: [...Object.values(groupIt("adresse"))?.map((e)=> e.length)],
                backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)' ],
                borderWidth: 1
            }
        ],
    };

    const data3 = {
        labels: ["trajets à venir", "trajets terminés"],
        datasets: [
            {
                label: '# of trajets',
                data: [trajets?.filter((f)=> f?.status==="à venir").length, trajets?.filter((f)=> f?.status==="terminé").length],
                backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)' ],
                borderWidth: 1
            }
        ],
    };

    const data4 = {
        labels: ["reservations à venir", "reservations terminés"],
        datasets: [
            {
                label: '# of trajets',
                data: [reservations?.filter((f)=> f?.status==="à venir").length, reservations?.filter((f)=> f?.status==="terminé").length],
                backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)' ],
                borderWidth: 1
            }
        ],
    };

    return (
      <div className="container-fluid">

          <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>

          <div className="row">

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Les recettes (Mensuelles)
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Les recettes (Annuelles)
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    nbre d'utilisateurs
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Utilisateurs connectées
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{status.length}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-users fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <Pie data={data2} width={10} height={10} />
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <Pie data={data1} width={5} height={5} />
                    </div>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <Pie data={data} width={5} height={5} />
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <Pie data={data3} width={5} height={5} />
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                    <div className="card-body">
                        <Pie data={data4} width={5} height={5} />
                    </div>
                </div>
            </div>
        </div> 

      </div>
    )
}