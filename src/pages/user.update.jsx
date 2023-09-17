import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { API, Send, Update } from "../api/service";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";


export default function UserUpdate(){

    const token= useSelector((state)=>state?.userReducer?.token);
    const location= useLocation();
    const nav= useNavigate();
    const dispatch= useDispatch()
    const donnee= location.state;

    const [genre, setGenre]= useState(donnee?.genre || "");
    const [adresse, setAdresse]= useState(donnee?.adresse ||"");
    const [date, setDate]= useState(donnee?.naissance ||"");
    const [bio, setBio]= useState(donnee?.bio ||"");
    const [mail, setMail]= useState(donnee?.mail ||"");
    const [prenom, setPrenom]= useState(donnee?.prenom ||"");
    const [nom, setNom]= useState(donnee?.nom ||"");
    const [updated, setUpdated]= useState(false);

    const genres = [
        { value: 'masculin', label: 'masculin' },
        { value: 'feminin', label: 'feminin' }
    ];

    async function handleAction(){
        setUpdated(true);
        if(genre && adresse && date && bio && mail && prenom && nom){
            toast.loading("mise à jour en cours", {autoClose: 3000});
            const us= {genre: genre, adresse: adresse, bio: bio, mail: mail, nom: nom, prenom: prenom, naissance: moment(date).format("YYYY-MM-DD")}
            let rs
            let message_succ, message_ech
            if(donnee?._id){
                rs= await Update("/user/update", {...us, _id: donnee?._id}, token)
                message_ech="problème de mise à jour de l'utilisateur";
                message_succ="mise à jour effectuée"
            }else{
                const form = new FormData()
                form.append("user", us)
                rs= await Send("/user/signin", form)
                message_ech="problème d'ajout de l'utilisateur";
                message_succ="ajouté avec succès"
            }
            toast.dismiss()
            if(rs?.error){
                toast.error(message_ech)
            }else{
                toast.success(message_succ)
            }
            dispatch({type: "loading", value: Math.random()});
        }else{
            toast("Veuillez saisir les champs vides svp")
        }
        setUpdated(false);
    }


    useEffect(()=>{
        
    }, []);

    return (
        <div className="container">
            <div className="main-body">
            
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <button className="btn" onClick={()=> nav("/user.liste")}>Utilisateurs</button>
                        </li>
                    </ol>
                </nav>
            
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={API+"/file/show/"+donnee?.profil} alt="Admin" className="rounded-circle" crossOrigin='anonymous' width="250" height={200} />
                                    <div className="mt-3">
                                        <h4>{donnee?.nom}</h4>
                                        <p className="text-secondary mb-1">{donnee?.prenom}</p>
                                        <p className="text-muted font-size-sm">compte créé le {moment(donnee?.createdAt).format("YYYY-MM-DD")}</p>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Nom</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" onChange={(e)=>setNom(e.target.value)} placeholder="nom" defaultValue={nom} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Prénom</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" onChange={(e)=>setPrenom(e.target.value)} placeholder="prenom" defaultValue={prenom} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" onChange={(e)=>setMail(e.target.value)} placeholder="mail" defaultValue={mail} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Téléphone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control"  placeholder="phone" defaultValue={donnee?.phone} readOnly />
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Adresse</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" onChange={(e)=>setAdresse(e.target.value)} placeholder="adresse" defaultValue={adresse} /> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Bio</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" onChange={(e)=>setBio(e.target.value)} placeholder="bio" defaultValue={bio} /> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">FCM token</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="text" className="form-control" placeholder="fcmtoken" defaultValue={donnee?.fcmtoken} readOnly /> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Naissance</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary" >
                                        <input type="date" className="form-control" onChange={(e)=>setDate(e.target.valueAsDate)} placeholder="date" defaultValue={new Date(donnee?.naissance).toISOString().substring(0,10)} /> 
                                    </div>
                                </div>
                                <hr />
                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Genre</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <Select defaultValue={{value: genre, label:genre}} options={genres} onChange={(val)=> setGenre(val?.value)} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button className="btn btn-info" disabled={updated} onClick={handleAction}>{donnee?._id ? "mettre à jour" : "créer"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}