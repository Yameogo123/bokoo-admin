import React, { useEffect, useState } from "react";
import { API, Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";

export default function VehiculeList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const head=["owner", "marque", "couleur", "modele", "plaque", "image"]
    const [upd, setUpd]= useState(false);

    useEffect(()=>{
        Get("/vehicule/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (const res of rs?.vehicules) {
                        res.image= API+"/file/show/"+res?.image;
                        res.owner= res?.owner?.nom+ " "+ res?.owner?.prenom;
                        r.push(res);
                    }
                    setElements(r);
                }
            }
        ).catch((err)=>{})
    }, [token, loading])

    return (
        <Table datas={elements} header={head} title="liste des véhicules" delete_action={"vehicule"} update={upd} setUpdate={setUpd} />
    );
}