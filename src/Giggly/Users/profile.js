
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
  })

  const getUserDetails = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let { t_uid } = props.match.params;
    let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/single_user_detail/' + t_uid;

    axios.get(api, { headers: exportValue.headers }).then((res) => {
      let profile = res.data.profile
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
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
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
                      <span className="h2 font-weight-bold mb-0">Gold</span>
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
                      <h5 className="card-title text-uppercase text-muted mb-0">Boosts</h5>
                      <span className="h2 font-weight-bold mb-0">2</span>
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
                      <h5 className="card-title text-uppercase text-muted mb-0">Super Likes</h5>
                      <span className="h2 font-weight-bold mb-0">2</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                        <i className="ni ni-like-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-profile">
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
              </div>
              <div className="card card-profile">
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center"><h4>Privacy</h4></div>
                    </div>
                  </div>
                  <div>Hide my Age: <small>{user.hide_age}</small></div>
                  <div>Make my distance invisible: <small>{user.hide_distance}</small></div>
                </div>
              </div>
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
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-city">sexual_interest</label>
                          <select name="sexual_interest" id="sexual_interest" value={state.sexual_interest} className="form-control" id="sel1"
                            onChange={(event) => handleChangeData(event)}
                          >
                            <option value="No answer">No answer</option>
                            <option value="Straight">Straight</option>
                            <option value="Gay">Gay</option>
                            <option value="Lesbian">Lesbian</option>
                            <option value="Bisexual">Bisexual</option>
                            <option value="Demisexual">Demisexual</option>
                            <option value="Pansexual">Pansexual</option>
                            <option value="Queer">Queer</option>
                            <option value="Bicurious">Bicurious</option>
                            <option value="Aromantic">Aromantic</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-control-label" htmlFor="input-country">Honestly Want to use</label>
                          <select name="want_to_use" id="want_to_use" value={state.want_to_use} className="form-control" id="sel1"
                            onChange={(event) => handleChangeData(event)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>

                    </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">relation_status</label>
                            <select name="relation_status" id="relation_status" value={state.relation_status} className="form-control" id="sel1"
                              onChange={(event) => handleChangeData(event)}>
                              <option value="No answer"> No answer</option>
                              <option value="In complicated relationship"> In complicated relationship </option>
                              <option value="Single"> Single </option>
                              <option value="Taken"> Taken </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-country">Height</label>
                            {/* <input type="text" id="height" name="height" className="form-control" placeholder="Height" value={state.height}
                              onChange={(event) => handleChangeData(event)}
                            /> */}
                            <select name="relation_status" id="relation_status" value={state.relation_status} className="form-control" id="sel1"
                              onChange={(event) => handleChangeData(event)}>
                              <option value="151cm"> 151cm </option>
                              <option value="152cm"> 152cm </option>
                              <option value="153cm"> 153cm </option>
                              <option value="154cm"> 154cm </option>
                              <option value="155cm"> 155cm </option>
                              <option value="156cm"> 156cm </option>
                              <option value="157cm"> 157cm </option>
                              <option value="158cm"> 158cm </option>
                              <option value="159cm"> 159cm </option>
                              <option value="160cm"> 160cm </option>
                              <option value="161cm"> 161cm </option>
                              <option value="162cm"> 162cm </option>
                              <option value="163cm"> 163cm </option>
                              <option value="164cm"> 164cm </option>
                              <option value="165cm"> 165cm </option>
                              <option value="166cm"> 166cm </option>
                              <option value="167cm"> 167cm </option>
                              <option value="168cm"> 168cm </option>
                              <option value="169cm"> 169cm </option>
                              <option value="170cm"> 170cm </option>
                              <option value="171cm"> 171cm </option>
                              <option value="172cm"> 172cm </option>
                              <option value="173cm"> 173cm </option>
                              <option value="174cm"> 174cm </option>
                              <option value="175cm"> 175cm </option>
                              <option value="176cm"> 176cm </option>
                              <option value="177cm"> 177cm </option>
                              <option value="178cm"> 178cm </option>
                              <option value="179cm"> 179cm </option>
                              <option value="180cm"> 180cm </option>
                              <option value="181cm"> 181cm </option>
                              <option value="182cm"> 182cm </option>
                              <option value="183cm"> 183cm </option>
                              <option value="184cm"> 184cm </option>
                              <option value="185cm"> 185cm </option>
                              <option value="186cm"> 186cm </option>
                              <option value="187cm"> 187cm </option>
                              <option value="188cm"> 188cm </option>
                              <option value="189cm"> 189cm </option>
                              <option value="190cm"> 190cm </option>
                              <option value="180cm"> 180cm </option>
                              <option value="181cm"> 181cm </option>
                              <option value="182cm"> 181cm </option>
                              <option value="183cm"> 183cm </option>
                              <option value="184cm"> 184cm </option>
                              <option value="185cm"> 185cm </option>
                              <option value="186cm"> 186cm </option>
                              <option value="187cm"> 187cm </option>
                              <option value="188cm"> 188cm </option>
                              <option value="189cm"> 189cm </option>
                              <option value="100cm"> 190cm </option>
                              <option value="191cm"> 191cm </option>
                              <option value="192cm"> 192cm </option>
                              <option value="193cm"> 193cm </option>
                              <option value="194cm"> 194cm </option>
                              <option value="195cm"> 195cm </option>
                              <option value="196cm"> 196cm </option>
                              <option value="197cm"> 197cm </option>
                              <option value="198cm"> 198cm </option>
                              <option value="199cm"> 199cm </option>
                              <option value="200cm"> 200cm </option>
                              <option value="201cm"> 201cm </option>
                              <option value="202cm"> 202cm </option>
                              <option value="203cm"> 203cm </option>
                              <option value="204cm"> 204cm </option>
                              <option value="205cm"> 205cm </option>
                              <option value="206cm"> 206cm </option>
                              <option value="207cm"> 207cm </option>
                              <option value="208cm"> 208cm </option>
                              <option value="209cm"> 209cm </option>
                              <option value="210cm"> 210cm </option>
                              <option value="211cm"> 211cm </option>
                              <option value="212cm"> 212cm </option>
                              <option value="213cm"> 213cm </option>
                              <option value="214cm"> 214cm </option>
                              <option value="215cm"> 215cm </option>
                              <option value="216cm"> 216cm </option>
                              <option value="217cm"> 217cm </option>
                              <option value="218cm"> 218cm </option>
                              <option value="219cm"> 219cm </option>
                              <option value="220cm"> 220cm </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Weight</label>
                            <input type="text" name="weight" placeholder="Weight" value={state.weight} className="form-control" id="weight"
                              onChange={(event) => handleChangeData(event)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-country">Body Type</label>
                            <select name="body_type" value={state.body_type} className="form-control" id="body_type"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="No answer"> No answer </option>
                              <option value="Athletic"> Athletic </option>
                              <option value="3"> Average </option>
                              <option value="4"> A few extra pounds</option>
                              <option value="4"> Muscular</option>
                              <option value="4"> Big and bold </option>
                              <option value="4"> A few extra pounds</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Living with</label>
                            <select name="living_with" value={state.living_with} className="form-control" id="living_with"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-country">Children</label>
                            <select value={state.children} className="form-control" name="children" id="children"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Smoking</label>
                            <select value={state.smoking} className="form-control" id="smoking" name="smoking"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-country">Drinking</label>
                            <select value={state.drinking} className="form-control" id="drinking" name="drinking"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-city">Languages Speak</label>
                            <select value={state.drinking} className="form-control" id="drinking" name="drinking"
                              onChange={(event) => handleChangeData(event)}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        </div>
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