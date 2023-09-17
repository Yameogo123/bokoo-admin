import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";
import moment from "moment";

export default function ReservationList() {
    
    const [reservations, setReservations]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const [upd, setUpd]= useState(false);
    const head=["depart", "arrive", "places", "prix", "date", "client", "chauffeur"]

    useEffect(()=>{
        Get("/reservation/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (const res of rs?.reservations) {
                        res.depart= JSON.parse(res.depart)?.description.split(",")[0];
                        res.arrive= JSON.parse(res.arrive)?.description.split(",")[0];
                        res.client= res.client.nom + " "+res.client.prenom
                        res.chauffeur= res.chauffeur.nom + " "+res.chauffeur.prenom
                        res.date= moment(res.date).format("YYYY-MM-DD")
                        r.push(res)
                    }
                    setReservations(r)
                }
            }
        ).catch((err)=>{})
    }, [token, loading])


    return (
        <Table datas={reservations} header={head} title="liste des réservations" delete_action={"reservation"} update={upd} setUpdate={setUpd} />
    );
}