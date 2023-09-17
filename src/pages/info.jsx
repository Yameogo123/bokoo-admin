import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Get, Update } from "../api/service";
import { toast } from 'react-toastify';


export default function Info(){

    //const user= useSelector((state)=> state.userReducer.user);
    const token= useSelector((state)=> state.userReducer.token);
    const [info, setInfo]= useState();

    const [telephone, setTelephone]= useState("");
    const [adresse, setAdresse]= useState("");
    const [version, setVersion]= useState("");
    const [facebook, setFacebook]= useState("");
    const [insta, setInsta]= useState("");
    const [linkedIn, setLinkedIn]= useState("");
    const [youtube, setYoutube]= useState("");
    const [price, setPrice]= useState("");

    const [updated, setUpdated]= useState(false);

    useMemo(async ()=>{
        const res= await Get("/info/all", token)
        setInfo(res?.infos[0]);
        fillVal(res?.infos[0]);
    }, [updated, token])

    function handleUpdate(){
        toast.loading("mise à jour en cours", {autoClose: 3000});
        if(telephone && adresse && version && facebook && insta && linkedIn && youtube && price){
            const inform= {...info, telephone: telephone, adresse: adresse, version: version, facebook: facebook, insta: insta, linkedIn: linkedIn, youtube: youtube, price_per_km: price}
            Update("/info/update", inform, token).then(
                (rs)=>{
                    toast.dismiss();
                    if(rs?.error){
                        toast("erreur de mise à jour!", {type: "error"});
                    }else{
                        setUpdated(!updated);
                        toast.success("informations mise à jour");
                    }
                }
            ).catch(err=> {toast.dismiss();})
        }else{
            toast.dismiss();
            toast.warning("veuillez remplir les champs svp")
        }
    }

    function fillVal(el){
        setTelephone(el?.telephone);
        setAdresse(el?.adresse);
        setVersion(el?.version);
        setFacebook(el?.facebook);
        setInsta(el?.insta);
        setLinkedIn(el?.linkedIn);
        setYoutube(el?.youtube);
        setPrice(el?.price_per_km);
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


    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://api.uznews.uz/images/default-image.jpg" alt="profil" />
                        <span className="font-weight-bold">{info?.nom}</span>
                        <span className="text-black-50">{info?.mail}</span>
                        <span></span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Détail du profil</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setTelephone)} placeholder="enter phone number" defaultValue={info?.telephone} /></div>
                            <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setAdresse)} placeholder="enter address" defaultValue={info?.adresse} /></div>
                            <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email" defaultValue={info?.mail} readOnly /></div>
                            <div className="col-md-12"><label className="labels">Version</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setVersion)} placeholder="education" defaultValue={info?.version} /></div>
                            <div className="col-md-12"><label className="labels">Prix au km</label><input type="text" className="form-control" onChange={(e)=> updateVal(e, setPrice, true)} placeholder="price" defaultValue={info?.price_per_km} /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" defaultValue="Sénégal" readOnly /></div>
                            <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue="Dakar" placeholder="state" readOnly /></div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" onClick={handleUpdate} type="button">Mise à jour</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience">
                            <span>Liens réseaux</span>
                        </div><br />
                        <div className="col-md-12">
                            <label className="labels">Facebook</label>
                            <input type="text" className="form-control" onChange={(e)=> updateVal(e, setFacebook)} placeholder="fb" defaultValue={info?.facebook} />
                        </div> <br />
                        <div className="col-md-12">
                            <label className="labels">Instagram</label>
                            <input type="text" className="form-control" onChange={(e)=> updateVal(e, setInsta)} placeholder="insta" defaultValue={info?.insta} />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">LinkedIn</label>
                            <input type="text" className="form-control" onChange={(e)=> updateVal(e, setLinkedIn)} placeholder="link" defaultValue={info?.linkedIn} />
                        </div>
                        <div className="col-md-12">
                            <label className="labels">Youtube</label>
                            <input type="text" className="form-control" onChange={(e)=> updateVal(e, setYoutube)} placeholder="youtube" defaultValue={info?.youtube} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}