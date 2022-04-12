
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const UserProfile = (props) => {

  const [state, setState] = useState({
    user_name: '',
    password: '',
    uid: '',
    email: '',
    mob_number: '',
    address: '',
    city: '',
    country: '',
    lat: '',
    long: '',
    about_info: '',
    sexual_interest: '',
    want_to_use: '',
    relation_status: '',
    height: '',
    weight: '',
    body_type: '',
    living_with: '',
    children: '',
    smoking: '',
    drinking: '',
    job_title: '',
    company: '',
    gender: '',
    profile_interest: '',
    language: [
      { id: 1, value: 'No answer', text: 'No answer', isChecked: false },
      { id: 2, value: 'English', text: 'English', isChecked: false },
      { id: 3, value: 'German', text: 'German', isChecked: false },
      { id: 4, value: 'French', text: 'French', isChecked: false },
      { id: 5, value: 'Hindi', text: 'Hindi', isChecked: false },
      { id: 6, value: 'Thai', text: 'Thai', isChecked: false },
      { id: 7, value: 'Chiense', text: 'Chiness', isChecked: false },
      { id: 8, value: 'Spanish', text: 'Spanish', isChecked: false },
      { id: 9, value: 'Italian', text: 'Italian', isChecked: false },
      { id: 10, value: 'Portuguese', text: 'Portuguese', isChecked: false },
    ],
    hide_age: 'true',
    hide_distance: 'true',
    userProfileData: [],
    premium_end_date:'',
    super_likes: 0,
    boosts: 0,
    points: 0,
    age: 0
  })

  const [structureList, setStructureList] = useState([]);
  const aboutInfoStructure = () =>{
    let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/structure_list';

    axios.get(api, { headers: exportValue.headers }).then((res) => {
     // setStructureList(res.data.data);
      console.log("aboutInfoStructure ",res.data.data);
    })

  }
  const getUserDetails = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let { t_uid } = props.match.params;
    console.log(t_uid);
    let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/single_user_detail/' + t_uid;

    axios.get(api, { headers: exportValue.headers }).then((res) => {
      let profile = res.data.profile;
      console.log("---------",profile);
       setStructureList(profile.bio2);
      
      const img = "https://gigglyimg.fniix.com/profile/" + profile.user_img[0];

      setState({
        userProfileData: profile,
        image: img,
        address: profile.address,
        user_name: profile.user_name,
        about_info: profile.about_info,
        job_title: profile.job_title,
        company: profile.company,
        school: profile.school,
        city: profile.city,
        gender: profile.gender,
        email: profile.email,
        sexual_interest: profile.sexual_interest,
        want_to_use: profile.want_to_use,
        relation_status: profile.relation_status,
        height: profile.height,
        weight: profile.weight,
        body_type: profile.body_type,
        living_with: profile.living_with,
        children: profile.children,
        smoking: profile.smoking,
        drinking: profile.drinking,
        language: profile.language,
        mob_number: profile.mob_number,
        profile_interest: profile.profile_interest,
        country: profile.country,
        premium_end_date: profile.premium_end_date,
        super_likes: profile.super_likes,
        boosts: profile.boosts,
        points: profile.points,
        age: profile.age
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    aboutInfoStructure()
    getUserDetails()
  }, [])

  function changeVisibility(value) {

    setState({
      ...state,
      hide_distance: value
    })

  }
  function changeRadioAge(value) {

    setState({
      ...state,
      hide_age: value
    })

  }
  function handleClick(event) {
    let language = state.language
    language.forEach(language => {
      if (language.value === event.target.value) {
        language.isChecked = event.target.checked
      }

    })
    setState({ ...state, language: language })
  }
  function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }
  const suspendContact = () => {
    let { t_uid } = props.match.params;
    let sendData = {
      t_uid: t_uid,
      dstatus: 2
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_delete_suspend_api`
    axios.post(full_api, sendData, { headers: exportValue.headers }) // <-- remove ;
      .then(res => {
        toast.configure()
        toast("User Suspended Succesfully")
      })
  }

  function handleSubmit(event) {
    const Data = {
      drinking: state.drinking,
      smoking: state.smoking,
      user_name: state.user_name,
      company: state.company,
      job_title: state.job_title,
      gender: state.gender,
      school: state.school,
      email: state.email,
      password: state.password,
      mob_number: state.mob_number,
      city: state.city,
      address: state.address,
      country: state.country,
      // lat:  state.lat,
      // long:  state.long,
      about_info: state.aboutme,
      sexual_interest: state.sexual_interest,
      want_to_use: state.want_to_use,
      relation_status: state.relation_status,
      height: state.height,
      weight: state.weight,
      body_type: state.body_type,
      living_with: state.living_with,
      children: state.children,
      //language: state.language,
      hide_age: (state.hide_age),
      hide_distance: (state.hide_distance),

    };
    let { t_uid } = props.match.params;
    exportValue.headers.usertuid = t_uid
    event.preventDefault();
    const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/profile_edit_api';
    axios.put(full_api, Data, { headers: exportValue.headers }).then(res => {
      if (res.status === 200) {
        if (res.data.status === '200') {
          toast.configure()
          toast("Updated Succesfully")
          props.history.push('/profile/' + t_uid);
        }
      }

    })
  }

  let user = state.userProfileData

  const img = "http://giggly.bbcloudhub.com/giggly/server/api/v-1.0.5/giggly/single_user_details/" + user.user_img


  let unix_timestamp = user.premium_end_date
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return (
    <div>
      <Leftbar title={1} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">{user.user_name}  {user.membership_type === 1 ?  <img src="../crown.jpg" alt="img" height='50' width='50' />: ""}</h6>

                </div>
                <div className="col-lg-6 col-5 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col-xl-4 order-xl-2">
              <div className="card card-profile">
                <img src="/assets/img/theme/img-1-1000x600.jpg" alt="placeholder" className="card-img-top" />
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href={img} >
                        <img src={state.image} alt='ad' width="160" height="150" className="rounded-circle" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div>&nbsp;</div>
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Matches</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="h3">
                      {user.user_name} <span className="font-weight-light">, {user.dob_day}/{user.dob_month}/{user.dob_year}</span>
                    </h5>
                   
                       <h5 className="h3"> Current City  
                       <span className="font-weight-light"> : {user.location_city}</span>
                       </h5>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2"></i>{user.location_address}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2"></i>Mob : {user.mob_number}<i className="ni business_briefcase-24 mr-2"></i>{user.email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2"></i>{user.job_title}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2"></i>{user.about_info}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Plan</h5>
                      <span className="h2 font-weight-bold mb-0">Premium till {formattedTime}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i className="ni ni-diamond"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                  <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Super Likes</h5>
                      <span className="h2 font-weight-bold mb-0">{user.super_likes}</span>
                    </div>
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Boosts</h5>
                      <span className="h2 font-weight-bold mb-0">{user.boosts}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-blue text-white rounded-circle shadow">
                        <i className="ni ni-notification-70"></i>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 mb-0 text-sm">
                    <span className="text-success mr-2"><i className="fa fa-arrow-up"></i> 3.48%</span>
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">Credits</h5>
                      <span className="h2 font-weight-bold mb-0">{user.points}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                        <i className="ni ni-like-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="card card-profile">
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center"><h4>About</h4> </div>
                    </div>
                  </div>
                  <div>Gender: <small>{user.gender}</small></div>
                  <div>Sexual: <small>{user.sexual_interest}</small></div>
                  <div>want_to_use: <small>{user.want_to_use}</small></div>
                  <div>relation_status: <small>{user.relation_status}</small></div>
                  <div>Height: <small>{user.height}</small></div>
                  <div>Weight: <small>{user.weight}</small></div>
                  <div>Body type: <small>{user.body_type}</small></div>
                  <div>Living with: <small>{user.living_with}</small></div>
                  <div>Children: <small>{user.children}</small></div>
                  <div>Smoking: <small>{user.smoking}</small></div>
                  <div>Drinking: <small>{user.drinking}</small></div>
                </div>
              </div> */}
              {/* <div className="card card-profile">
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center"><h4>Privacy</h4></div>
                    </div>
                  </div>
                  <div>Hide my Age: <small>{user.hide_age}</small></div>
                  <div>Make my distance invisible: <small>{user.hide_distance}</small></div>
                </div>
              </div> */}
            </div>

            {/* edit user */}
            <div className="col-xl-8 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Edit profile   </h3>
                     
                    </div>
                    <div className="col-4 text-right">
                      <Link to="suspended" className="btn btn-sm btn-danger" onClick={(e) => suspendContact(e)}>Suspend User</Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">User information</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-first-name">User name</label>
                            <input name="user_name" type="text" id="input-first-name" className="form-control" placeholder="enter user name" value={state.user_name}
                              onChange={(event) => handleChangeData(event)}

                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-company">Company Name</label>
                            <input name="company" type="text" id="input-company" className="form-control" placeholder="company name" value={state.company}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Mobile #</label>
                            <input type="number" id="mob_number" name="mob_number" className="form-control" placeholder="mobile no." value={state.mob_number}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Email address</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="enter email" value={state.email}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-last-name">School/College</label>
                            <input name="school" type="text" id="company" name="company" className="form-control" placeholder="School/College" value={state.school}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-last-name">Job Title</label>
                            <input name="job_title" type="text" id="job_title" name="job_title" className="form-control" placeholder="job title" value={state.job_title}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Gender</label>
                            <select name="gender" value={state.gender} className="form-control" id="gender"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">others</option>
                              <option></option>
                            </select>
                          </div>
                        </div>
                      </div>

                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Contact information</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-address">Current Address</label>
                            <input id="address" name="address" className="form-control" placeholder="Home Address" value={state.address} type="text"
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Current City</label>
                            <input type="text" id="city" name="city" className="form-control" placeholder="City" value={state.city}
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                       
                      </div>

                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <div className="form-group">
                        <label className="form-control-label">About </label>
                        <textarea rows="4" name="about_info" id="about_info" className="form-control" placeholder="A few words about you ..."
                          onChange={(event) => handleChangeData(event)}
                          value={state.about_info}></textarea>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">About Info</h6>
                    <div className="pl-lg-4"><div className="row">

                    {structureList.map((subscriber, index) => (
                     <>
                          
                          {
                          //profile.bio.map
                          
                          (subscriber.type == 2) ? 
                          // profile.bio.map((subscriber, index) => (
                             
   
                            <div className="col-lg-6">
                            <div className="form-group">
                          <label className="form-control-label" htmlFor="input-city">{subscriber.title}</label>
                          <select name={subscriber.title} id="sexual_interest"  className="form-control" id="sel1" 
                            onChange={(event) => handleChangeData(event)}
                          >
                            <option>Not selected </option>
                            {subscriber.value.map((key, index) => (
                            <option value={key.sValueId} selected = {(key.isSelected)}>{key.label}</option>
                             )) }
                          </select>
                        
                           
                            
                        </div>
                      </div>
                      
                      :(subscriber.type == 3)? <div className="col-lg-6">
                      <div className="form-group">
                    <label className="form-control-label" htmlFor="input-city">{subscriber.title}</label><br/>
                    {
                    subscriber.value.map((key, index) => (
                     

                        
                      
                      <>
                      <label className="form-control-label" htmlFor="input-city">{key.label}</label>
                      &nbsp;
                    <input type="radio" name={subscriber.title} value={key.label} checked= {(key.isSelected)} />
                    &nbsp;&nbsp;
                    </>
                    ))
                    
                  }
                    </div>
                    </div>
                    :(subscriber.type == 4)? <div className="col-lg-6">
                    <div className="form-group">
                  <label className="form-control-label" htmlFor="input-city">{subscriber.title}</label><br/>
                  {subscriber.value.map((key, index) => (
                    <>
                  <label className="form-control-label" htmlFor="input-city">{key.label}</label>
                  &nbsp;
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked= {(key.isSelected)}></input>
                  &nbsp;&nbsp;
                  </>
                  ))}
                  </div>
                  </div>:""
                    
                    
                    }
                      </>
                       ))}
                      </div>
                     
                      </div>                      
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Privacy</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Hide My Age</label>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" name="hide_age" onChange={() => changeRadioAge('true')} checked={state.hide_age === "true"} className="form-check-input input-sm" value= "true" /><small>Yes</small>
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" name="hide_age" onChange={() => changeRadioAge('false')} checked={state.hide_age === "false"} className="form-check-input input-sm" value="false" /><small>No</small>
                              </label>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Make my distance invisible</label>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" name="hide_distance" onChange={() => changeVisibility('true')} checked={state.hide_distance === "true"} className="form-check-input input-sm" value="true" /><small>Yes</small>
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="radio" name="hide_distance" onChange={() => changeVisibility('false')} checked={state.hide_distance === "false"} className="form-check-input input-sm" value="fasle" /><small>No</small>
                              </label>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn  btn-success">Update profile</button>
                  </form>
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
export default UserProfile;