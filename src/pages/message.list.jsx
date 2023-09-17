import React, { useEffect, useState } from "react";
import { Get, Update } from "../api/service";
import { useDispatch, useSelector } from "react-redux";
import Table from "../template/table";
import moment from "moment";
import { toast } from "react-toastify";

export default function MessageList() {
    
    const [elements, setElements]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const head=["from", "to", "content"];
    const [upd, setUpd]= useState(false);
    const dispatch= useDispatch();

    useEffect(()=>{
        Get("/chat/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    let r=[];
                    for (let res of rs?.chats) {
                        res.date= moment(res?.date).format("YYYY-MM-DD");
                        res.from= res?.from?.nom+ " "+ res?.from?.prenom;
                        res.to= res?.to?.nom+ " "+ res?.to?.prenom;
                        r.push(res)
                    }
                    setElements(r);
                }
            }
        ).catch((err)=>{})
    }, [token, loading, upd])


    async function edit(dt) {
        const rep = prompt("Veuillez modifier le contenu:", dt?.content);
        if(rep==="" || rep===null){
            toast.warning("Veuillez saisir une valeur correcte")
        }else{
            const mess= {_id: dt?._id, content: rep};
            const res=await Update("/chat/update", mess, token);
            if(res?.error){
                toast.error("echec de la mise à jour");
            }else{
                toast.success("mise à jour avec succès");
            }
            dispatch({type: "loading", value: Math.random()});
        }
    }


    return (
        <Table datas={elements} header={head} title="liste des messages" edit_action={edit} delete_action={"chat"} update={upd} setUpdate={setUpd} />
    );
}