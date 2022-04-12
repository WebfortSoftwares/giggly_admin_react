import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
const VerifiedDetail = (props) => {
  console.log("v_id is ",props);
console.log("props is ",props.location.state.v_id);
  const [state, setState] = useState({
    username: '',
    password: '',
    user_image: "",
    verified_user_img: "",
    v_id: "",
    t_uid: "",
    user_name: "",
    date: "",
    time: "",
    isVerified:0
  })

  console.log("st img ",state);

  const verifiedDetails = () => {
    let localStorageemail = localStorage.getItem('email')

   // let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/verified_detail_api'

    let data = {v_id:props.location.state.v_id}
    axios.post(full_api,data, { headers: exportValue.headers }).then((res) => {
        console.log("resss a is ",res);
    //  if (res.data.status == 200) {

        let verified_match = res.data.verified_list
        console.log("verified match is ",verified_match);
        setState({
          user_image: verified_match[0].user_img,
          verified_user_img: verified_match[0].verified_user_img,
          v_id: verified_match[0].v_id,
          t_uid: verified_match[0].t_uid,
          user_name: verified_match[0].user_name,
          date : verified_match[0].date,
          time : verified_match[0].time,
          isVerified : verified_match[0].isVerified
        })
    //  }
    })
  }

  useEffect(() => {
    verifiedDetails()
  }, [])

//   function handleChangeData(e) {
//     const newdata = { ...state }
//     newdata[e.target.name] = e.target.value
//     setState(newdata)
//   }
  
  const handleSubmit = (event,t_uid) => {
    

    const sendData = {
        t_uid: t_uid,
        isVerified: event
      }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/user_delete_suspend_api'
    axios.post(full_api, sendData, { headers: exportValue.headers }).then((res) => {
      setState({...state, isVerified : event});
        toast.configure()
        if(event === 1){
         
            toast(" Verified Accepted ")
        }
        if(event === 3){
            toast(" Verified Rejected ")
        }
        
    })
  }

//   const {super_likes_first, credits_first, super_likes_second, credits_second, super_likes_third, credits_third} = state;

  return (
    <div>
      <Leftbar title={6} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">

          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Verified Detail Page</h6>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-4 text-right">
                      <nav aria-label="breadcrumb">
                          <ol class="breadcrumb">
                          
                            <li class="breadcrumb-item"><Link  to={{pathname:"/verification_list"}}>  Verified List   </Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Verification Detail</li>
                          </ol>
                        </nav>
                   </div>
                   <div className="col-8 text-right">
                      <nav aria-label="breadcrumb">
                     <h3><i> Request: </i> {(state.isVerified == 1) ? "Verified" : (state.isVerified == 2) ? "Pending" :(state.isVerified == 3) ? "Rejected":"" } </h3>
                        </nav>
                   </div>
                  </div>
                </div>
                <div className="card-body">
                  
                    <h6 className="heading-small text-muted mb-4">User Image</h6>
                  
                    <div className="pl-lg-4">
                      <div className="row">
                      <div className="col-lg-2">
                          </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                         
                            <img src={`https://gigglyimg.fniix.com/profile/${state.verified_user_img}`} alt="p" height='200' width='200' style={{ borderRadius: "50%" }} />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <img src={`https://gigglyimg.fniix.com/profile/${state.user_image}`} alt="p" height='200' width='200' style={{ borderRadius: "50%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                          <div className="col-lg-2">

                          </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username" style={{  marginLeft: "53px"}}>Current Picture</label>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" style={{  marginLeft: "53px"}} htmlFor="input-email">Submitted Picture</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                       <div className="row">
                           
                              {(state.isVerified == 2 || state.isVerified == 3) ? 
                              
                            <div className="col-lg-1">
                              <button class="btn  btn-success" onClick={()=> handleSubmit(1,state.t_uid)}>Verify</button>
                            </div>
                            :""}
                            {(state.isVerified == 1 || state.isVerified == 2) ?
                            <div className="col-lg-1">
                            <button class="btn  btn-success" onClick={()=> handleSubmit(3,state.t_uid)}>Reject</button>
                            </div>
                            :"" }
                       </div>
                    </div>

                    
                  
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>

      </div>
    </div>

  );
}

export default VerifiedDetail;