import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import exportValue from '../../apiconfig';
const FormData = require('form-data')

const WebHeader = (props) => {

  const [state, setState] = useState({
    title:"",
    description:"",
    image_url:"",
    status:1,
    web_id:"",
    containId:""
  })

  

  useEffect(() => {
    fetchSocial();
  }, [])

  const [isImageSelected, setIsImageSelected] = useState(false);

  const stateHandler = (e) => {
     // console.log("e is ",e.target.value);
        const newData = { ...state };
        newData[e.target.name] = e.target.value
        setState(newData)
  }

  const fileSelectedHandler = (event) => {
    setIsImageSelected(true);

    // const newData = { ...state };
    //     newData[event.target.name] = event.target.files
    //     console.log("new data is ",newData);
    //     setState(newData)
   
        setState({
          ...state,
          image_url: event.target.files,
        });
  };


  const fetchSocial = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
    let d1 = {type:2};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
        //console.log(" res iss ",res);
    //  if (res.data.status === "200") {
       // setState({status:res.data.web_data[0].download_status})

        setState({...state,
          title:res.data.web_data[0].values[0].title,
          description:res.data.web_data[0].values[0].description,
          image_url:res.data.web_data[0].values[0].url,
          status:res.data.web_data[0].values[0].status,
          web_id:res.data.web_data[0].web_id,
          containId:res.data.web_data[0].values[0].containId})
      //  setState({...state,description:res.data.web_data[0].values[0].description})
      //  setState({...state,image_url:res.data.web_data[0].values[0].url})

     // setState({...state,getways:res.data.web_data});        
    //  }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    
   // if (isImageSelected  == true) {

    //console.log("stttt is aaa ",state.image_url[0].name);
    const fd = new FormData();
      fd.append("title", state.title);
      fd.append("description", state.description);
      fd.append("type", 2);
      fd.append("status", state.status);
      fd.append("containId", state.containId);
      fd.append("web_id", state.web_id);

      

      if (state.image_url != null && isImageSelected  == false) {
        fd.append('image_url', state.image_url)
      }
      else if (isImageSelected  == true) {
        fd.append("image_url",state.image_url[0],state.image_url.name)
      }

      let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_update_api'
      axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
      toast.configure()
         toast("Web Header Update Succesfully")  
         fetchSocial();
        ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
        // alert("social media update")
    })
//  }
}


const switchStatus = (event,data,index)=>{
  let fdstatus = (event.target.value == 1) ?  0 : 1;
 // console.log(" status is ",fdstatus);
  setState({...state,status:fdstatus})
  
}


//console.log(" state is ",state);
  return (
    <>
      <Leftbar title={32} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Header Web Management </h3>
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
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title" className="form-control"   value={state.title} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
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
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="form-group">
                           <img src={`https://gigglyimg.fniix.com/web/${state.image_url}`} alt="img" className="form-control" style={{width:"42%",height:"20%"}} ></img><br />
                            <label className="form-control-label" htmlFor="input-username">Choose Image: Size (450px X 450px)</label>
                            <input type="file" multiple id="input-username" name="image_url" className="form-control" 
                              onChange={(event) => fileSelectedHandler(event) }
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">DownLoad Status</label>
                            {/* <input type="text" id="input-username" name = "status" className="form-control"  value={state.status}
                              onChange={(event) => stateHandler(event) }
                            /> */}
                        </div>
                        <div className="col-lg-6" style={{paddingLeft : '32px'}} >
                          <div className="form-group">
                            <div class="custom-control custom-switch">
                               <input type="checkbox" value={state.status}  checked={state.status} name={state.status} class="custom-control-input" id={"customSwitch" + 0+1} onChange={(event)=>switchStatus(event,state,0)}/>
                          <label class="custom-control-label" for={"customSwitch" + 0+1}></label>
                         </div> 
                         </div>
                        </div>
                        </div>
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

export default WebHeader;