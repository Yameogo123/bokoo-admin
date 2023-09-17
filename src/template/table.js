import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { Remove } from "../api/service";
import empty from "../css/empty.json"

export default function Table({title="tables", datas=[], header=[], delete_action, edit_action, update, setUpdate}){

    const token= useSelector((state)=>state?.userReducer?.token);
    const dispatch= useDispatch();
    const [debut, setDebut]= useState(0);
    const [fin, setFin]= useState(5);

    const next =()=>{
        const suiv= fin+5;
        if(suiv> datas.length){
            setFin(datas.length -1);
            setDebut(datas.length - 7);
        }else{
            setDebut(fin);
            setFin(suiv);
        }
    }

    const previous =()=>{
        const prec= debut-5;
        if(prec< 0){
            setDebut(0);
            setFin(5);
        }else{
            setFin(debut);
            setDebut(prec);
        }
    }

    async function remove(id) {
        toast.dismiss();
        setUpdate(true);
        const rs= prompt("Si vous voulez continuer, veuillez saisir le code secret: ");
        if(rs==="SECRET"){
            const rep= await Remove("/"+delete_action+"/"+id, token);
            if(!rep?.error){
                toast.success("statut supprimé avec succès");
            }else{
                toast.warning("problème de suppression du statut")
            }
        }else{
            toast.error("Mauvais mot de passe?");
        }
        dispatch({type: "loading", value: Math.random()});
        setUpdate(false);
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">{title}</h1>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary"> </h6>
                </div>
                <div className="card-body">
                    {datas.length !== 0 ? <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    {
                                        header.map((value, index)=>{
                                            return <th key={index}>{value}</th>
                                        })
                                    }
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    {
                                        header.map((value, index)=>{
                                            return <th key={index}>{value}</th>
                                        })
                                    }
                                    <th>actions</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {
                                    datas.filter((_, idx)=> idx>= debut && idx < fin).map((val, ind)=>{
                                        return (
                                            <tr key={ind}>
                                                {
                                                    header.map((value, index)=>{
                                                        if(value==="image"){
                                                            return <td key={index}>
                                                                <img src={val[`${value}`]} alt="a" crossOrigin='anonymous' width={50} />
                                                            </td>
                                                        }
                                                        return <td key={index}>{val[`${value}`]}</td>
                                                    })
                                                }
                                                <td>
                                                    <button className="btn btn-danger m-2" disabled={update} onClick={()=>remove(val?._id)}>remove</button>
                                                    {edit_action && <button className="btn btn-warning" disabled={update} onClick={()=>edit_action(val)}>edit</button>}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                       { datas.length >5 && <div>
                            <button className="btn btn-warning m-2" disabled={debut<=0} onClick={previous}>précédent</button>
                            <button className="btn btn-warning m-2" disabled={fin>=datas.length} onClick={next}>suivant</button>
                        </div>}
                    </div> :  <Lottie animationData={empty} style={{width: "60%"}} />  }
                </div>
            </div>

        </div>
    );
}