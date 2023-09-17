import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Root from './route/route';
import Navbar from './template/navbar';
import Sidebar from './template/sidebar';
import Footer from './template/footer';
import Login from './security/login';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { removeAll } from './redux/localStorage';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

function App() {
  const user= useSelector((state)=>state?.userReducer?.user);
  const limit= useSelector((state)=>state?.userReducer?.limit);
  const dispatch= useDispatch();
  const location= useLocation()

  const logout= ()=>{
    dispatch({type: "logout"});
    removeAll();
  }

  useEffect(()=>{
    const now= moment();
    if(limit && now.diff(moment(limit), "hours")>=6){
      logout();
    }
  }, [limit, location])

  return (
    <div className="App">
      {
        Object.keys(user).length!==0 ? 
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" className="main-panel">
              <Navbar />
              <Root />
            </div>
            <Footer />
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
          </a>
          <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Voulez vous vraiment quitter?</h5>
                          <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                          </button>
                      </div>
                      <div className="modal-body">Choisir quitter pour quitter</div>
                      <div className="modal-footer">
                          <button className="btn btn-secondary" type="button" data-dismiss="modal">Annuler</button>
                          <button className="btn btn-danger" type="button" data-dismiss="modal" onClick={logout}>Quitter</button>
                      </div>
                  </div>
              </div>
          </div>

        </div> : 
        <Login />
      }
      <ToastContainer />
    </div>
  );
}

export default App;
