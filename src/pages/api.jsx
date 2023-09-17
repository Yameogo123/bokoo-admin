import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Get} from "../api/service";
import "../css/api.css";

export default function Api(){

    const token= useSelector((state)=> state.userReducer.token);
    const [info, setInfo]= useState();

    useMemo(async ()=>{
        const res= await Get("/info/all", token)
        setInfo(res?.infos[0]);
    }, [token]);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-around">

                <article className="col-md-5 card-1 m-3">
                    <img className="card__background img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png"
                        alt="im" width="1920" height="2193"
                    />
                    <div className="card__content | flow">
                        <div className="card__content--container | flow">
                            <h2 className="card__title h-2">Back end API</h2>
                            <p className="card__description p">
                                {info?.api_back}
                            </p>
                        </div>
                        <button className="card__button" onClick={()=>openInNewTab("https://admin.evennode.com/")}>Read more</button>
                    </div>
                </article>

                <article className="col-md-5 card-1 m-31">
                    <img className="card__background img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png"
                        alt="im" width="1920" height="2193"
                    />
                    <div className="card__content | flow">
                        <div className="card__content--container | flow">
                            <h2 className="card__title h-2">Google Maps API</h2>
                            <p className="card__description p">
                                {info?.api_google}
                            </p>
                        </div>
                        <button className="card__button" onClick={()=>openInNewTab("https://console.cloud.google.com/apis/credentials?project=bokoo-1bb91")}>Read more</button>
                    </div>
                </article>

                <article className="col-md-5 card-1 m-3">
                    <img className="card__background img" src="https://intechsms.sn/assets/login/img/banniereintechsmsmobile.png"
                        alt="im" width="1920" height="2193"
                    />
                    <div className="card__content | flow">
                        <div className="card__content--container | flow">
                            <h2 className="card__title h-2">SMS handler API</h2>
                            <p className="card__description p">
                                solution intech sms du Sénégal
                            </p>
                        </div>
                        <button className="card__button" onClick={()=>openInNewTab("https://intechsms.sn/login")}>Read more</button>
                    </div>
                </article>

            </div>
        </div>
    )


}