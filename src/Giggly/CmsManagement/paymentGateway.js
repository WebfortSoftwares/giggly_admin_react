import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';

const PaymentGateway = (props) => {

  const [state, setState] = useState({
    getways: [],
    production_key:"",
    gateway_name:"",
    client_id:""
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
      gateway_name:state.gateway_name,
      client_id:state.client_id,
      production_key:state.production_key
    }

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/newGateway_setting_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("----",res);
      setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      
     // alert("social media update")
    })
  }
  const switchStatus = (event,data,index)=>{
    console.log(index);
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(data);
    let employees = state.getways;    
    data.dstatus = (event.target.value == 1) ?  0 : 1;
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/changeGateway_setting_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("social media update")
      employees[index] = data;
      setState({getways:employees});
    })
    console.log(" - - - ",data);
   
  }

  const handleDelete = (data) => {  
    

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/social_media_delete_api'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      console.log("----",res);
      setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      
     // alert("social media update")
    })
  }
  return (
    <>
      <Leftbar title={14} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">PaymentGateway Settings </h3>
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
                            <label className="form-control-label" htmlFor="input-username">Gateway Name</label>
                            <input type="text" id="input-username" className="form-control"  value={state.gateway_name}
                              onChange={event => { setState({...state, gateway_name: event.target.value }) }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Production key</label>
                            <input type="text" id="input-username" className="form-control"  value={state.production_key}
                              onChange={event => { setState({...state, production_key: event.target.value }) }}
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
                            <label className="form-control-label" htmlFor="input-username">Client Id</label>
                            <input type="text" id="input-username" className="form-control"  value={state.client_id}
                              onChange={event => { setState({...state, client_id: event.target.value }) }}
                            />
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
             
              <div className="card-body">
                 
                <div className="row">
            <div className="col">
              <div className="card">

                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="sort" data-sort="name">#</th>
                        <th scope="col" className="sort" data-sort="budget">Gateway Name</th>                       
                        <th scope="col">Production Id</th>
                        <th scope="col">Client Id</th>
                        <th scope="col">status</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                      
                    </thead>
                    <tbody >
                    { state.getways.map((subscriber,index ) => ( 
                    <tr key={index}>
                    <td >{index+1}</td>
                    <td>    <label className="form-control-label" htmlFor="input-city">{subscriber.gateway_name}</label>    </td>
                  
                    <td>    <label className="form-control-label" htmlFor="input-city">{subscriber.production_key}</label>       </td>
                    <td>     <label className="form-control-label" htmlFor="input-city">{subscriber.client_id}</label>     </td>
                    <td> <div className="custom-control custom-switch">
  <input type="checkbox" value={subscriber.dstatus}  checked={subscriber.dstatus} name={subscriber.gateway_name} className="custom-control-input" id={"customSwitch" + index+1} onChange={(event)=>switchStatus(event,subscriber,index)}/>
  <label className="custom-control-label" htmlFor={"customSwitch" + index+1}></label>
</div>         </td>
                    <td>    <button type="button" className="btn" onClick={()=>handleDelete(subscriber)}> <i className="fa fa-trash" aria-hidden="true"></i></button>    </td>
            
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

export default PaymentGateway;