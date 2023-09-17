import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";

export default function StatutList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token)
    const head=["user1", "user2", "archive"];
    const [upd, setUpd]= useState(false);
    const loading= useSelector((state)=>state?.userReducer?.loading);

    useEffect(()=>{
        Get("/discussion/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (const res of rs?.discussions) {
                        res.user1= res.user1.nom+ " "+ res.user1.prenom
                        res.user2= res.user2.nom+ " "+ res.user2.prenom
                        res.archive= res.archive ? "archivé": "non archivé" 
                        r.push(res)
                    }
                    setElements(r)
                }
            }
        ).catch((err)=>{})
    }, [token, upd, loading])

    return (
        <Table datas={elements} header={head} title="liste des discussions" delete_action={"discussion"} update={upd} setUpdate={setUpd} />
    );
}