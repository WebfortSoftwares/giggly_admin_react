import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebSystemSetting = (props) => {

  const [state, setState] = useState({
    premium_filter: true, filter_super_like: 'true', boost_filter: 'false', filter_gender: 'false',filter_age:'false', filter_right_swipe: 'false', filter_with_profile_interest: 'false', show_profile_according_time:0, daily_like_limit:0, daily_super_like_limit:0,daily_dislikes_limit:0, daily_rewind_limit:0, daily_profile_swap_limit:0
  })
 
  useEffect(() => {
    getpackage()
  }, [])

 function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }

  const getpackage = () => {
    //console.log("second");
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
   
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/fetch_system_setting`
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {  setState(res.data) })
  }
  
const handleSubmit = (event) => {
    event.preventDefault();
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/edit_system_setting'
    let body = {
      premium_filter: state.premium_filter,
      filter_super_like: state.filter_super_like,
      boost_filter: state.boost_filter,
      filter_gender: state.filter_gender,
      filter_age: state.filter_age,
      filter_right_swipe: state.filter_right_swipe,
      filter_with_profile_interest: state.filter_with_profile_interest,
      show_profile_according_time: parseInt(state.show_profile_according_time),
      daily_like_limit: parseInt(state.daily_like_limit),
      daily_super_like_limit: parseInt(state.daily_super_like_limit),
      daily_dislikes_limit: parseInt(state.daily_dislikes_limit),
      daily_rewind_limit: parseInt(state.daily_rewind_limit),
      daily_profile_swap_limit: parseInt(state.daily_profile_swap_limit)
    }
 
    axios.post(full_api, body, { headers: exportValue.headers }).then((res) => {
     // console.log("hey res is ",res.data)
      setState(res.data) 
      toast.configure()
      toast("System Settings Update  Succesfully") 
     
         
    })
  }

  return (<>
    <Leftbar title={13} />
    <div className="main-content" id="panel">
      <DashHeader />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-xl-12 order-xl-1">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">System Settings </h3>
                  </div>
                  <div className="col-4 text-right">
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Premium Filter :</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value={state.premium_filter === true ? false : true } checked={state.premium_filter === true || state.premium_filter === "true"  } name="premium_filter" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value={state.premium_filter === false ? true: false} checked={state.premium_filter === false || state.premium_filter === "false"  } name="premium_filter" onChange={(event) => handleChangeData(event)} /> False
                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then premium user will see on the top </span>
                      </div>
                      
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Super Likes Filter :</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='true' checked={state.filter_super_like === true || state.filter_super_like === 'true' } name="filter_super_like" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='false' checked={state.filter_super_like === false || state.filter_super_like === 'false'} name="filter_super_like" onChange={(event) => handleChangeData(event)} /> False
                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then superlikes user will see on the top </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Boost Filter :</label> &nbsp;&nbsp;&nbsp;&nbsp; 

                        <input type="radio" value='true' checked={state.boost_filter === true || state.boost_filter === 'true' } name="boost_filter" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 

                        <input type="radio" value='false' checked={state.boost_filter === false || state.boost_filter === 'false' } name="boost_filter" onChange={(event) => handleChangeData(event)} /> False

                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then boosts user will see on the top </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Gender :</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='true' checked={state.filter_gender === true || state.filter_gender === 'true'} name="filter_gender" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 

                        <input type="radio" value='false' checked={state.filter_gender === false || state.filter_gender === 'false'} name="filter_gender" onChange={(event) => handleChangeData(event)}  /> False

                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true data get according Gender </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Age :</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='true' checked={state.filter_age === true || state.filter_age === 'true'} name="filter_age" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='false' checked={state.filter_age === false || state.filter_age === 'false'} name="filter_age" onChange={(event) => handleChangeData(event)} /> False

                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then filter data according age </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Right Swipe Filter :</label> &nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="radio" value='true' checked={state.filter_right_swipe === true || state.filter_right_swipe === 'true' } name="filter_right_swipe" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 

                        <input type="radio" value='false' checked={state.filter_right_swipe === false || state.filter_right_swipe === 'false'} name="filter_right_swipe" onChange={(event) => handleChangeData(event)} /> False

                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then filter right swap limit </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Profile Interest Filter :</label> &nbsp;&nbsp;&nbsp;&nbsp; 


                        <input type="radio" value='true' checked={state.filter_with_profile_interest === true || state.filter_with_profile_interest === 'true'} name="filter_with_profile_interest" onChange={(event) => handleChangeData(event)} /> True  &nbsp;&nbsp;&nbsp;&nbsp; 


                        <input type="radio" value='false' checked={state.filter_with_profile_interest === false || state.filter_with_profile_interest === 'false'} name="filter_with_profile_interest" onChange={(event) => handleChangeData(event)} /> False
                    
                        <br />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then profile filter according interest </span>

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Repeat profile time </label>
                        <input  type="number"  id="amount" name ="show_profile_according_time"  className="form-control" placeholder="Amount Value" value={state.show_profile_according_time} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                        <span style={{color:"blue",fontSize:"13px"}}> Note - if it is true then user profile repeat  limit accroding days </span>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Daily Like Limit </label>
                        <input  type="number"  id="amount" name ="daily_like_limit"  className="form-control" placeholder="Amount Value" value={state.daily_like_limit} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                         <span style={{color:"blue",fontSize:"13px"}}> Note - Like swipe One day limit </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Daily Super Like Limit </label>
                        <input  type="number"  id="amount" name ="daily_super_like_limit"  className="form-control" placeholder="Amount Value" value={state.daily_super_like_limit} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                         <span style={{color:"blue",fontSize:"13px"}}> Note - Super Like swipe One day limit </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Daily Dislikes Limit </label>
                        <input  type="number"  id="amount" name ="daily_dislikes_limit"  className="form-control" placeholder="Amount Value" value={state.daily_dislikes_limit} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                         <span style={{color:"blue",fontSize:"13px"}}> Note - DisLike swipe One day limit </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Daily Rewind Limit </label>
                        <input  type="number"  id="amount" name ="daily_rewind_limit"  className="form-control" placeholder="Amount Value" value={state.daily_rewind_limit} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                         <span style={{color:"blue",fontSize:"13px"}}> Note - Rewind swipe One day limit </span>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Daily Profile Swap Limit </label>
                        <input  type="number"  id="amount" name ="daily_profile_swap_limit"  className="form-control" placeholder="Amount Value" value={state.daily_profile_swap_limit} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                         <span style={{color:"blue",fontSize:"13px"}}> Note - Profile swipe One day limit </span>
                      </div>
                    </div>
                    
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Update Package</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />  </div>
  </>)
}

export default WebSystemSetting