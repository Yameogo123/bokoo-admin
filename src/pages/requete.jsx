import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Get, Remove } from "../api/service";
import Select from "react-select";
import { toast } from "react-toastify";


export default function Requete(){

    const token= useSelector((state)=>state?.userReducer?.token);
    const dispatch= useDispatch()

    const [entity, setEntity]= useState("");
    const [id, setId]= useState("");
    const [keys, setKeys]= useState([]);
    const [key, setKey]= useState("_id");
    const [filtre, setFiltre]= useState("");
    const [all, setAll]= useState([]);

    const [updated, setUpdated]= useState(false);

    const entities = [
        { value: 'user', label: 'user' },
        { value: 'badge', label: 'badge' },
        { value: 'discussion', label: 'discussion' },
        { value: 'evaluation', label: 'evaluation' },
        { value: 'info', label: 'info' },
        { value: 'message', label: 'message' },
        { value: 'chat', label: 'chat' },
        { value: 'reservation', label: 'reservation' },
        { value: 'status', label: 'status' },
        { value: 'trajet', label: 'trajet' },
        { value: 'vehicule', label: 'vehicule' },
        { value: 'ticket', label: 'ticket' },
        { value: 'file', label: 'file' },
    ];

    async function handleAction(){
        if(id){
            setUpdated(true);
            const dl= await Remove(`/${entity}/`+id, token)
            if(dl?.error){
                toast.error("Mauvais id");
            }else{
                dispatch({type: "loading", value: Math.random()});
                toast.success("supprimé avec succès.");
                handleSelect({value: entity, label: entity});
            }
            setUpdated(false);
        }else{
            toast.warning("veuillez saisir un id valide.")
        }
    }

    async function handleSelect(val){
        setEntity(val?.value);
        setKey("_id");
        const tout= await Get("/"+val?.value+"/all2", token);
        if(!tout?.error){
            setAll(tout[`${val?.value}s`]);
            setKeys((Object.keys(tout[`${val?.value}s`][0]))?.map((v)=> {return {"value": v, "label":v}}));
        }
    }

    async function handleChoix(val){
        setKey(val?.value)
    }


    useEffect(()=>{
        
    }, []);

    return (
        <div className="container">
            <div className="main-body">

                <div className="row gutters-sm">
                    <div className="col-md-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Choix de l'entité</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <Select options={entities} onChange={handleSelect} />
                                    </div>
                                </div>
                                <hr />
                                {keys.length>0 && 
                                    <div>
                                        <div className="row align-items-center">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Filtrer par</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary" >
                                                <Select defaultValue={{value:"_id", label: "_id"}} options={keys} onChange={handleChoix} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row align-items-center">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">saisir valeur de filtre</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary" >
                                                <input type="text" className="form-control" onChange={(e)=>setFiltre(e.target.value)} placeholder="saisir la valeur" defaultValue={filtre} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row align-items-center m-2">
                                            <div className="col-sm-6">
                                                <input type="text" className="form-control" onChange={(e)=>setId(e.target.value)} placeholder="coller le _id de l'élément à supprimer ici" defaultValue={id} />
                                            </div>
                                            <div className="col-sm-6 text-secondary" >
                                                <button className="btn btn-danger" disabled={updated} onClick={handleAction}>supprimer</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    all.length >0 && <div>
                                        <div className="">
                                            {all.map((v, k)=> {
                                                if(key && v[`${key}`]?.includes(filtre)){
                                                    return <div key={k} className="border rounded m-2">{JSON.stringify(v)}</div>
                                                }
                                                return <div key={k}></div>
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}