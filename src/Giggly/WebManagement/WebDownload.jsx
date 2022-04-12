import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebDownload = (props) => {

  const [state, setState] = useState({
    download_id_one : "",title_one:"",url_one:"",
    download_id_two : "",title_two:"",url_two:"",
    download_id_three : "",title_three:"",url_three:"",
  })

  //console.log("state is ",state);

  useEffect(() => {
    fetchSocial();
  }, [])

  const stateHandler = (e) => {
     // console.log("e is ",e.target.value);
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
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_download_api';
    let d1 = {};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
        //console.log("hey hey one ",res);
        setState({...state,download_id_one:res.data[0].download_id,title_one:res.data[0].title,url_one:res.data[0].url,download_id_two:res.data[1].download_id,title_two:res.data[1].title,url_two:res.data[1].url,download_id_three:res.data[2].download_id,title_three:res.data[2].title,url_three:res.data[2].url})
      // if (res.data.status === "200") {
      // setState({...state,getways:res.data.list});        
      // }
    })
  }
const handleSubmit = (event) => {
    event.preventDefault();
    
    const fd = new FormData();
    fd.append("download_id", state.download_id_one);
    fd.append("title", state.title_one);
    fd.append("url", state.url_one);
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_download_update_api';
   // console.log("full api is ",full_api);
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
       toast.configure()
       toast("Web video added Succesfully") 
    })
  
}

const handleSubmitOne = (event) => {
    event.preventDefault();
    
    const fd = new FormData();
    fd.append("download_id", state.download_id_two);
    fd.append("title", state.title_two);
    fd.append("url", state.url_two);
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_download_update_api'
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
       toast.configure()
       toast("Web video added Succesfully") 
    })
  
}

const handleSubmitTwo = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("download_id", state.download_id_three);
    fd.append("title", state.title_three);
    fd.append("url", state.url_three);
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_download_update_api'
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
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
                      <h3 className="mb-0">Web DownLoad Management </h3>
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
                            <input type="text" id="input-username" name = "title_one" className="form-control"   value={state.title_one} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Url Link</label>
                            <input type="text" id="input-username" name="url_one" className="form-control"   value={state.url_one}
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
                  <br /><br /><br />
                  <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title_two" className="form-control"   value={state.title_two} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                        

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Url Link</label>
                            <input type="text" id="input-username" name="url_two" className="form-control"   value={state.url_two}
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmitOne(event)}>Submit</button>
                          </div>
                        </div>

                      </div>
                    </div>                    
                   
                  </form>
                  <br /> <br /><br /><br />
                  <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title_three" className="form-control"   value={state.title_three} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Url Link</label>
                            <input type="text" id="input-username" name="url_three" className="form-control"   value={state.url_three}
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmitTwo(event)}>Submit</button>
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

export default WebDownload;