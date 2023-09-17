import {
    Routes,
    Route
  } from "react-router-dom";
import Login from "../security/login";
import Home from "../pages/home";
import UserList from "../pages/users.list";
import TrajetList from "../pages/trajet.list";
import ReservationList from "../pages/reservation.list";
import StatutList from "../pages/statut.list"
import BadgeList from "../pages/badge.list"
import DiscussionList from "../pages/discussion.list"
import MessageList from "../pages/message.list"
import Info from "../pages/info";
import Api from "../pages/api";
import EvaluationList from "../pages/evaluation.list";
import VehiculeList from "../pages/vehicule.list";
import UserUpdate from "../pages/user.update";
import Requete from "../pages/requete";
import Profil from "../pages/profil";


export default function Root(){

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/api" element={<Api />} />
            <Route path="/user.liste" element={<UserList />} />
            <Route path="/user.update" element={<UserUpdate />} />
            <Route path="/trajet.liste" element={<TrajetList />} />
            <Route path="/reservation.liste" element={<ReservationList />} />
            <Route path="/statut.liste" element={<StatutList />} />
            <Route path="/badge.liste" element={<BadgeList />} />
            <Route path="/discussion.liste" element={<DiscussionList />} />
            <Route path="/message.liste" element={<MessageList />} />
            <Route path="/evaluation.liste" element={<EvaluationList />} />
            <Route path="/vehicule.liste" element={<VehiculeList />} />
            <Route path="/requete" element={<Requete />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
        </Routes>
    )
}