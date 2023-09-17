import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";
import moment from "moment";

export default function EvaluationList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const head=["client", "chauffeur", "note", "remarque", "date"];
    const [upd, setUpd]= useState(false);

    useEffect(()=>{
        Get("/evaluation/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (let res of rs?.evaluations) {
                        res.date= moment(res?.date).format("YYYY-MM-DD");
                        res.chauffeur= res?.chauffeur?.nom+ " "+ res?.chauffeur?.prenom;
                        res.client= res?.client?.nom+ " "+ res?.client?.prenom;
                        r.push(res)
                    }
                    setElements(r);
                }
            }
        ).catch((err)=>{})
    }, [token, loading, upd])


    return (
        <Table datas={elements} header={head} title="liste des évaluations" delete_action={"evaluation"} update={upd} setUpdate={setUpd} />
    );
}