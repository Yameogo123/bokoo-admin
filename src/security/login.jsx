import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Send } from "../api/service";
import { toast } from "react-toastify";

export default function Login(){

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [message, setMessage]= useState(false)
    const navigate = useNavigate();
    const dispatch= useDispatch();

    function handleLogin(e){
        e.preventDefault()
        if(username!=="" && password!==""){
            let data= {mail: username, password:password}
            Send("/user/admin/login", data).then(
                (rs)=>{
                    if(!rs?.error){
                        let user=rs?.user;
                        let token= rs?.token;
                        let action={
                            type: "login",
                            value: {user: user, token: token}
                        }
                        dispatch(action);
                        navigate("/home");
                    }else{
                        setMessage("vérifier vos données")
                    }
                }
            ).catch((err)=> setMessage(err))
        }else{
            setMessage("veuillez remplir les champs")
        }
    }




    return (

        <div className="container">

        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Bienvenu!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" onChange={(e)=>setUsername(e.target.value)}
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="votre adresse mail..." />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user" onChange={(e)=>setPassword(e.target.value)}
                                                id="exampleInputPassword" placeholder="le mot de passe" />
                                        </div>
                                        <button onClick={(e)=>handleLogin(e)}  className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <button className="btn" onClick={()=>toast("Veuillez contacter yameogoivan10@gmail.com")}>Mot de passe oublié?</button>
                                    </div>
                                    <div className="form-group">
                                        <div className="badge badge-danger bg-danger">
                                            {message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}