import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebTopHeader = (props) => {

  const [state, setState] = useState({
    title:"",
  })

  console.log("state is ",state);

  useEffect(() => {
    fetchSocial();
  }, [])

  const stateHandler = (e) => {
      console.log("e is ",e.target.value);
        const newData = { ...state };
        newData[e.target.name] = e.target.value
        setState(newData)
  }


  const fetchSocial = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/gateway_setting_api';
    let d1 = {};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {

      if (res.data.status === "200") {
      setState({...state,getways:res.data.list});        
      }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title:state.title,
      type:1,
   }

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_web_top_header_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("----",res);
      ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      toast.configure()
      toast("Web top header Added Succesfully")  
     // alert("social media update")
    })
  }


  
  return (
    <>
      <Leftbar title={31} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0"> Top Header Web Management </h3>
                    </div>
                    <div className="col-4 text-right">
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title" className="form-control"   value={state.title} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                    

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmit(event)}>Submit</button>
                          </div>
                        </div>

                      </div>
                    </div>                    
                   
                  </form>
                </div>
             
            
                </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default WebTopHeader;