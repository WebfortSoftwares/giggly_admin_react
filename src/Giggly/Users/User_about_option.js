
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const UserAboutOption = (props) => {
    const [state, setState] = useState({title:"",type:"",user_name:"",sid:"",arrayValue:[]});
    const [operation ,setOperation ] = useState({save:false,update:false})
   
    const handleChangeData = (event)=>{
      setState({
        ...state,
        [event.target.name]:event.target.value});
      
      console.log();
    }
    const handleSubmit = ()=>{
      console.log(state);
      if(state.title != undefined && state.title != '' && state.type != undefined) {
        let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/key_structure_save' ;
        let sendData = {title:state.title,type:state.type};
        if(state.sid != undefined && state.sid != '') {
          sendData['sid'] =  state.sid;
        }
        console.log("sendData ",sendData)
        axios.post(api,sendData, { headers: exportValue.headers }).then((res) => {
          setState({...state,
            title:"", 
            type:""           
        })
          getStructure();
           // setState({arrayValue : res.data.data});
           // console.log(res);
        })
      }
    }
    const editLabel = (data) =>{
      console.log(data);
      setOperation({...operation,save:false,update:true})
      setState({...state,
        title:data.title,
        sid:data.sid,
        type:data.type
      })
    }
    const getStructure = ()=>{
        let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/structure_list' ;
        console.log(api);
        axios.get(api, { headers: exportValue.headers }).then((res) => {
            setState({arrayValue : res.data.data});
            console.log(res);
        })
    }
    useEffect(() => {
        getStructure()
      }, [])
    // const changeVisibility = ()=>{

    // }
    const newBio = () =>{
      setState({...state,
        title:"", 
        type:""           
    })
      setOperation({...operation,save:true,update:false})
    }
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
                      <h3 className="mb-0">User Bio   </h3>
                     
                    </div>
                    <div className="col-4 text-right">
                      <button className="btn" onClick={()=>newBio()}><i class="fa fa-plus" aria-hidden="true" ></i></button>
                    </div>
                  </div>
                </div>
                {(operation.save)?
                <>
                <div className="card-body">
                  <form>
                  
               
                    <h6 className="heading-small text-muted mb-4"></h6>

                    <div className="pl-lg-4">
                        <div className="row" >
                       
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Text</label>
                            <input type="text" name="title" placeholder="title" value={state.title} className="form-control" id="title"
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>


                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-city">type</label>
                          <select name="type" id="type" value={state.type} className="form-control" id="type"
                            onChange={(event) => handleChangeData(event)}
                          >
                             <option value=""> Not selected</option>
                            <option value="1">Text box</option>
                            <option value="2">Select drop down</option>
                            <option value="3">Radio button</option>
                            <option value="4">Checkbox</option>                       
                          </select>
                        </div>
                      </div>                                      
                      </div>  
                                
                      
                      
                    </div>                  
                   
                    
                    <button type="button" className="btn  btn-success" onClick={()=>handleSubmit()}>Save</button>
                  </form>

                </div>
                </>
                :""}

                {(operation.update)?
                <>
                <div className="card-body"  >
                  <form>
                  
               
                    <h6 className="heading-small text-muted mb-4"></h6>

                    <div className="pl-lg-4">
                        
                      <div className="row" >
                       
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Text</label>
                            <input type="text" name="title" placeholder="title" value={state.title} className="form-control" id="title"
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>


                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-city">Type</label>
                          <select name="type" id="type" value={state.type} className="form-control" id="type"
                            onChange={(event) => handleChangeData(event)}
                          >
                             <option value=""> Not selected</option>
                            <option value="1">Text box</option>
                            <option value="2">Select drop down</option>
                            <option value="3">Radio button</option>
                            <option value="4">Checkbox</option>                       
                          </select>
                        </div>
                      </div>                                      
                      </div>              
                      
                      
                    </div>                  
                   
                    
                    <button type="button" className="btn  btn-success" onClick={()=>handleSubmit()}>Update</button>
                  </form>

                </div>
                </>
                :""}
                <div className="card-body">
                 
                <div className="row">
            <div className="col">
              <div className="card">

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
                    {state.arrayValue.map((subscriber, index) => (
                    <tr>
                    <td >{index+1}</td>
                    <td>    <Link  to={{pathname:"/user_about_option_value", state:{sid: subscriber.sid,type:subscriber.type,title:subscriber.title }}}>{subscriber.title }&nbsp;&nbsp;&nbsp;&nbsp;    </Link>      </td>
                  
                    <td>     <label className="form-control-label" htmlFor="input-city">({(subscriber.type == 1) ? "Textbox":(subscriber.type == 2) ? "Select drop down":(subscriber.type == 3) ? "Radio Button":(subscriber.type == 4) ? "Check box":""})</label>       </td>
                    <td>    <button type="button" class="btn" onClick={()=>editLabel(subscriber)}> <i class="fa fa-pencil" aria-hidden="true"></i></button>    </td>
            
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

          </div>
          </div>
        <Footer />
        </div>
      </div>
            
    )
}
export default UserAboutOption;