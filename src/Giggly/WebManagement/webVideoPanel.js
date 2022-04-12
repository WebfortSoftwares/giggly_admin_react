import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebVideoPanel = (props) => {

  const [state, setState] = useState({
    title:"",
    description:"",
    url:"",
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
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
    let d1 = {type:5};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
      setState({...state,title:res.data.web_data[0].values[0].title,description:res.data.web_data[0].values[0].description,url:res.data.web_data[0].values[0].url})
      // if (res.data.status === "200") {
      // setState({...state,getways:res.data.list});        
      // }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = {
    //   title:state.title,
    //   description:state.description,
    //   image:state.image,
    //   status:state.status,
    //   type:2,

    // }
    

    //console.log("stttt is aaa ",state.image_url[0].name);
    const fd = new FormData();
    fd.append("title", state.title);
    fd.append("description", state.description);
    fd.append("type", 5);
    fd.append("url", state.url);
     
   // fd.append("image_url",state.image_url[0],state.image_url.name)

    console.log("stttt is ",state);

    console.log("fd is a ",fd);

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_add_api'
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
      // setState({...state,title:res.data.web_data[0].values[0].title,description:res.data.web_data[0].values[0].description,image_url:res.data.web_data[0].values[0].url,status:res.data.web_data[0].download_status})
      ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      
     // alert("social media update")
     toast.configure()
     toast("Web video added Succesfully") 
    })
  
}


  
  return (
    <>
      <Leftbar title={35} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Video Web Management </h3>
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
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Description</label>
                            <textarea id="input-username" name="description" className="form-control" value={state.description}  onChange={(event) => stateHandler(event) } >{state.description}</textarea>
                            {/* <input type="text" id="input-username" name="description" className="form-control"   value={state.description}
                              onChange={(event) => stateHandler(event) }
                            /> */}
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Url Link</label>
                            <input type="text" id="input-username" name="url" className="form-control"   value={state.url}
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                    
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

export default WebVideoPanel;