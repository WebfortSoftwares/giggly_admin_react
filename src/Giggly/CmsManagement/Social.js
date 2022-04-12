import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';

const Social = (props) => {

  const [state, setState] = useState({
    social: [],
    name:"",
    mobile:"",
    url:""
  })

  useEffect(() => {
    fetchSocial();
  }, [])
  const fetchSocial = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/fetch_social_media'
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {

      if (res.data.status === "200") {
      setState({...state,social:res.data.profile});
        // setState({
        //   page_url: social.page_url, Whatsapp: social.whatsup_no,
        //   twitter_url: social.twitter_url, pinterest_url: social.pinterest_url, instagram_url: social.instagram_url
        // })
      }
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      media_name:state.name,
      media_number:state.mobile,
      media_url:state.url
    }

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/social_media_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("----",res);
      setState({social:res.data.profile,name:"",mobile:"",url:""});
      
     // alert("social media update")
    })
  }
  const switchStatus = (event,data,index)=>{
    console.log(index);
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(data);
    let employees = state.social;    
    data.dstatus = (event.target.value == 1) ?  0 : 1;
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/social_media_update_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("social media update")
      employees[index] = data;
      setState({social:employees});
    })
    console.log(" - - - ",data);
   
  }

  const handleDelete = (data) => {  
    

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/social_media_delete_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("----",res);
      setState({social:res.data.profile,name:"",mobile:"",url:""});
      
     // alert("social media update")
    })
  }
  return (
    <>
      <Leftbar title={10} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Social Settings </h3>
                    </div>
                    <div className="col-4 text-right">
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Media Name</label>
                            <input type="text" id="input-username" className="form-control"  value={state.name}
                              onChange={event => { setState({...state, name: event.target.value }) }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Media Url</label>
                            <input type="text" id="input-username" className="form-control"  value={state.url}
                              onChange={event => { setState({...state, url: event.target.value }) }}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Media Mobile</label>
                            <input type="text" id="input-username" className="form-control"  value={state.mobile}
                              onChange={event => { setState({...state, mobile: event.target.value }) }}
                            />
                          </div>
                        </div>
                        

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Url</h6> */}
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
             
              <div className="card-body">
                 
                <div className="row">
            <div className="col">
              <div className="card">

                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="sort" data-sort="name">#</th>
                        <th scope="col" className="sort" data-sort="budget">Name</th>                       
                        <th scope="col">Url</th>
                        <th scope="col">mobile</th>
                        <th scope="col">status</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                      
                    </thead>
                    <tbody >
                    { state.social.map((subscriber,index ) => ( 
                    <tr>
                    <td >{index+1}</td>
                    <td>    <label className="form-control-label" htmlFor="input-city">{subscriber.media_name}</label>    </td>
                  
                    <td>    <label className="form-control-label" htmlFor="input-city">{subscriber.media_url}</label>       </td>
                    <td>     <label className="form-control-label" htmlFor="input-city">{subscriber.media_number}</label>     </td>
                    <td> <div class="custom-control custom-switch">
  <input type="checkbox" value={subscriber.dstatus}  checked={subscriber.dstatus} name={subscriber.media_name} class="custom-control-input" id={"customSwitch" + index+1} onChange={(event)=>switchStatus(event,subscriber,index)}/>
  <label class="custom-control-label" for={"customSwitch" + index+1}></label>
</div>         </td>
                    <td>    <button type="button" class="btn" onClick={()=>handleDelete(subscriber)}> <i class="fa fa-trash" aria-hidden="true"></i></button>    </td>
            
                  </tr>
 ))
  }
                    </tbody>
                  </table>
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
      </div>
    </>
  )

}

export default Social;