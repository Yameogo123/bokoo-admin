import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";

export default function TrajetList() {
    
    const [trajets, setTrajets]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token)
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const [upd, setUpd]= useState(false);
    const head=["begin", "end", "escale",  "date", "prix", "depart", "arrive", "badge", "chauffeur"]

    useEffect(()=>{
        Get("/trajet/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    const r=[];
                    for (let traj of rs?.trajets) {
                        let tra= {begin:"", end:"", escale: "", depart:"", badge:"", chauffeur:"", arrive: "", status: "", date: "", prix: 0}
                        tra.begin= JSON.parse(traj.begin)?.description;
                        tra.end= JSON.parse(traj.end)?.description;
                        tra.escale= traj?.escale?.length ===0 ? "" : JSON.parse(traj.escale[0])?.description;
                        tra.depart= traj?.heure
                        tra.arrive= traj?.arrive
                        tra.status= traj?.status
                        tra.prix= traj?.prix
                        tra.date= traj?.date?.map((d)=> d.substring(0, 10)).join(", ");
                        tra.badge= traj?.badges.join(", ");
                        tra.chauffeur= traj?.chauffeur?.nom + " "+traj?.chauffeur?.prenom
                        r.push(tra)
                    }
                    setTrajets(r)
                }
            }
        ).catch((err)=>{})
    }, [token, loading])


    return (
        <Table datas={trajets} header={head} title="liste des trajets" delete_action={"trajet"} update={upd} setUpdate={setUpd} />
    );
}