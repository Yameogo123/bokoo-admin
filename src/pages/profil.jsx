import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Update } from "../api/service";
import { toast } from 'react-toastify';
import Select from "react-select";
import moment from "moment";


export default function Profil(){

    const user= useSelector((state)=> state.userReducer.user);
    const token= useSelector((state)=> state.userReducer.token);
    const dispatch= useDispatch()

    const [telephone, setTelephone]= useState("");
    const [adresse, setAdresse]= useState("");
    const [bio, setBio]= useState("");
    const [date, setDate]= useState("");
    const [mail, setMail]= useState("");
    const [nom, setNom]= useState("");
    const [prenom, setPrenom]= useState("");
    const [notif, setNotif]= useState(false);
    const [genre, setGenre]= useState("");

    const [updated, setUpdated]= useState(false);

    const notifications = [
        { value: true, label: 'true' },
        { value: false, label: 'false' }
    ];

    const genres = [
        { value: "masculin", label: 'masculin' },
        { value: "feminin", label: 'feminin' }
    ];

    useMemo(async ()=>{
        fillVal(user);
    }, [user])

    function handleUpdate(){
        toast.loading("mise à jour en cours", {autoClose: 3000});
        if(genre && adresse && date && bio && mail && prenom && nom && notif && telephone){
            const inform= {...user, genre: genre, adresse: adresse, bio: bio, mail: mail, nom: nom, prenom: prenom, naissance: moment(date).format("YYYY-MM-DD"), notification: notif, phone: telephone}
            Update("/user/update", inform, token).then(
                (rs)=>{
                    toast.dismiss();
                    if(rs?.error){
                        toast("erreur de mise à jour!", {type: "error"});
                    }else{
                        setUpdated(!updated);
                        toast.success("informations mise à jour");
                        let action={
                            type: "login",
                            value: {user: inform, token: token}
                        }
                        dispatch(action);
                    }
                }
            ).catch(() => {toast.dismiss();})
        }else{
            toast.dismiss();
            toast.warning("veuillez remplir les champs svp");
        }
    }

    function fillVal(el){
        setTelephone(el?.phone); setAdresse(el?.adresse);
        setGenre(el?.genre); setAdresse(el?.adresse);
        setDate(el?.naissance); setBio(el?.bio);
        setMail(el?.mail); setPrenom(el?.prenom);
        setNom(el?.nom); setNotif(el?.notification);
    }

    const updateVal= (e, setVal, int=false)=>{
        e.preventDefault();
        toast.dismiss();
        const valeur= e.target.value
        if(int){
            const conv= parseFloat(valeur)
            if(!isNaN(conv)){
                if(conv>= 5){
                    setVal(conv);
                }else{
                    toast("veuillez saisir une valeur supérieur à 5");
                }
            }else{
                toast("veuillez saisir une valeur numérique");
            }
        }else{
            if(valeur!==""){
                setVal(valeur)
            }else{
                toast("veuillez saisir une valeur")
            }
        }
    }

    async function handleSelect(val, setVal){
        setVal(val?.value);
    }


    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://api.uznews.uz/images/default-image.jpg" alt="profil" />
                        <span className="font-weight-bold">{user?.nom+ " "+ user?.prenom}</span>
                        <span className="text-black-50">{user?.mail}</span>
                        <span></span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Détail du profil</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setTelephone)} placeholder="enter phone number" defaultValue={user?.phone} /></div>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setAdresse)} placeholder="enter address" defaultValue={user?.adresse} /></div>
                            <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="enter email" onChange={(e)=> updateVal(e, setMail)} defaultValue={user?.mail} /></div>
                            <div className="col-md-12"><label className="labels">Bio</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setBio)} placeholder="education" defaultValue={user?.bio} /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Nom</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setNom)} placeholder="nom" defaultValue={user?.nom} /></div>
                            <div className="col-md-6"><label className="labels">Prenom</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setPrenom)} defaultValue={user?.prenom} placeholder="prenom" /></div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" onClick={handleUpdate} type="button">Mise à jour</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="col-md-12">
                            <label className="labels">Notifications</label>
                            <Select options={notifications} onChange={(val)=>handleSelect(val, setNotif)} />
                        </div> <br />
                        <div className="col-md-12">
                            <label className="labels">Genre</label>
                            <Select options={genres} onChange={(val)=>handleSelect(val, setGenre)} />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">naissance</label>
                            <input type="date" className="form-control" onChange={(e)=>setDate(e.target.valueAsDate)} placeholder="date" defaultValue={new Date(user?.naissance).toISOString().substring(0,10)} /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}