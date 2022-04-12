
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const UserAboutOptionValue = (props) => {
    const [state, setState] = useState({title:"",sid:"",type:"",label:"",sValueId:"",arrayValue:[]});
    const [listing, setListing] = useState({arrayValue:[]});
   // console.log("props  - - ",props.location.state);
   
    const handleChangeData = (event)=>{
      setState({
        ...state,
        [event.target.name]:event.target.value});
      
      console.log("00000");
    }
    const handleSubmit = ()=>{
      if(state.label != '') {
        let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/key_structure_value_save' ;
        let sendData = {label:state.label,sid:state.sid,type:state.type};
        if(state.sValueId != '') {
          sendData['sValueId'] = state.sValueId;
        }
        console.log("sendData ",sendData)
        axios.post(api,sendData, { headers: exportValue.headers }).then((res) => {
           // setState({arrayValue : res.data.data});
           getStructure(props.location.state)
           setState({...state,
            label:"", 
            sValueId:""           
        })
            console.log(res);
        })
      }
    }

    const getStructure = (data)=>{
        let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/key_structure_value_list' ;
        let getParam =  {sid: data.sid,type: data.type };
        axios.post(api,getParam, { headers: exportValue.headers }).then((res) => {
            setListing({arrayValue : res.data.data});
            console.log(res);
        })
    }
    const editLabel = (data) =>{
      console.log(data);
      setState({...state,
        label:data.label,
        sValueId:data.sValueId
      })
    }
    useEffect(() => {
        
        setState({...state,
            sid:props.location.state.sid,
            type:props.location.state.type,
            title:props.location.state.title
        })

        getStructure(props.location.state)
      }, [])

    let user = {};
    return (
        <div>
             <Leftbar title={14} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">{user.user_name}  {user.membership_type === 1 ?  <img src="https://cdn.icon-icons.com/icons2/1465/PNG/128/433crown_100209.png" class="lazy" data-original="https://cdn.icon-icons.com/icons2/1465/PNG/128/433crown_100209.png" title="Download  crown  Icon Free" alt="Crown Icon" style= {{display: "inline", width: "53px" }}></img> : ""}</h6>

                </div>
                <div className="col-lg-6 col-5 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
          <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Profile About Info   </h3>
                     
                    </div>
                    <div className="col-4 text-right">
                      
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form >
                  
               
                   

                    <div className="pl-lg-4">
                        <div className="row">
                        
                            <input type="hidden" name="sid" placeholder="sid" value={state.sid}  className="form-control" id="sid"
                            onChange={(event) => handleChangeData(event)}
                            />
                          
                        
                            <input type="hidden" name="type" placeholder="type" value={state.type}  className="form-control" id="type" onChange={(event) => handleChangeData(event)}
                            />
                          
                       
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Label</label>
                            <input type="text" name="label" placeholder="label" value={state.label} className="form-control" id="label"
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>                                                          
                      </div>              
                      
                      
                    </div>                  
                   
                   
                    <button type="button" className="btn  btn-success" onClick={()=>handleSubmit()}>Save</button>
                  </form>

                </div>
                <div className="card-body">
                 
                  
               
                    <h6 className="heading-small text-muted mb-4">{state.title}</h6>

                    <div className="pl-lg-4">
                    <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="sort" data-sort="name">#</th>
                        <th scope="col" className="sort" data-sort="budget">Text</th>                       
                        <th scope="col">Options</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                      
                    </thead>
                    <tbody >
                    {listing.arrayValue.map((subscriber, index) => (
                    <tr>
                    <td >{index+1}</td>
                    <td>     <label >{subscriber.label }&nbsp;&nbsp;&nbsp;&nbsp;</label>      </td>
                  
                    <td>    <label className="form-control-label"  htmlFor="input-city">({(subscriber.type == 1) ? "Textbox":(subscriber.type == 2) ? "options":(subscriber.type == 3) ? "Radio Button":(subscriber.type == 4) ? "Check box":""})</label>  
                        </td>
                    <td>     <button type="button" className="btn" onClick={()=>editLabel(subscriber)}><i class="fa fa-pencil" aria-hidden="true"></i></button>    </td>
            
                  </tr>
 ))}
                    </tbody>
                  </table>
                </div>

                   
                      
                    </div>                  
                   
                   
                   
                 
                  
                </div>
              </div>
            </div>

          </div>
          </div>
        <Footer />
        </div>
      </div>
            
    )
}
export default UserAboutOptionValue;