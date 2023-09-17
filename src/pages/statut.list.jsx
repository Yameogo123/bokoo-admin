import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";
import moment from "moment";

export default function StatutList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const head=["user", "status", "date"]
    const [upd, setUpd]= useState(false);

    useEffect(()=>{
        Get("/status/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (const res of rs?.status) {
                        res.date= moment(res.date).format("YYYY-MM-DD hh:mm");
                        res.user= res?.user?.nom+ " "+ res?.user?.prenom
                        r.push(res)
                    }
                    setElements(r)
                }
            }
        ).catch((err)=>{})
    }, [token, loading])

    function edit(id) {
        
    }


    return (
        <Table datas={elements} header={head} title="liste des statuts" edit_action={edit} delete_action={"status"} update={upd} setUpdate={setUpd} />
    );
}