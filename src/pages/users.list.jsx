import React, { useEffect, useState } from "react";
import { Get } from "../api/service";
import { useSelector } from "react-redux";
import Table from "../template/table";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    
    const [users, setUsers]= useState([]);
    const token= useSelector((state)=>state?.userReducer?.token);
    const loading= useSelector((state)=>state?.userReducer?.loading);
    const [upd, setUpd]= useState(false);
    const head=["nom", "prenom", "mail", "phone", "adresse", "genre", "bio"];
    const navigate= useNavigate();

    useEffect(()=>{
        Get("/user/all", token).then(
            (rs)=>{
                if(!rs?.error){
                    setUsers(rs?.users)
                }
            }
        ).catch((err)=>{})
    }, [token, loading])

    function edit(dt) {
        navigate("/user.update", {state: dt});
    }


    return (
        <Table datas={users} header={head} title="liste des utilisateurs" edit_action={edit} delete_action={"user"} update={upd} setUpdate={setUpd} />
    );
}