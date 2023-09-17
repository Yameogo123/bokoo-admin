import React, { useEffect, useState } from "react";
import { Get, Send, Update } from "../api/service";
import { useDispatch, useSelector } from "react-redux";
import Table from "../template/table";
import { toast } from "react-toastify";

export default function BadgeList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token)
    const head=["_id", "libelle"]
    const [upd, setUpd]= useState(false);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const dispatch= useDispatch()

    useEffect(()=>{
        Get("/badge/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    setElements(rs?.badges);
                }
            }
        ).catch((err)=>{})
    }, [token, upd, loading])

    async function edit(dt) {
        const rep = prompt("Veuillez modifier le libellé:", dt?.libelle);
        if(rep==="" || rep===null){
            toast.warning("Veuillez saisir une valeur correcte")
        }else{
            const stat= {_id: dt?._id, libelle: rep};
            const res=await Update("/badge/update", stat, token);
            if(res?.error){
                toast.error("echec de la mise à jour");
            }else{
                toast.success("mise à jour avec succès");
            }
            dispatch({type: "loading", value: Math.random()});
        }
    }

    async function nouveau() {
        let rep = prompt("Veuillez saisir un libellé");
        if(rep==="" || rep===null){
            toast.warning("Veuillez saisir une valeur correcte")
        }else{
            let stat= {libelle: rep}
            const res=await Send("/badge/new", stat, true, token)
            if(res?.error){
                toast.error("echec d'ajout");
            }else{
                toast.success("ajouter avec succès");
                dispatch({type: "loading", value: Math.random()});
            }
        }
    }


    return (
        <div className="m-2">
            <button className="btn btn-warning float-right mr-4" onClick={nouveau}>nouveau</button>
            <Table datas={elements} header={head} title="liste des badges" edit_action={edit} delete_action={"badge"} update={upd} setUpdate={setUpd} />
        </div>
    );
}