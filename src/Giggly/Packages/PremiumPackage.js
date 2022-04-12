import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';

const PremiumPackage = (props) => {

  const [state, setState] = useState({
    username: '', password: '', datasets: [],
    boosts_first: 0, super_likes_first: 0, credits_first: 0, duration_first: 0, boosts_second: 0, super_likes_second: 0,
    credits_second: 0, duration_second: 0, boosts_third: 0, super_likes_third: 0, credits_third: 0, duration_third: 0,
    superData: []
  })

  console.log(" stt is ",state);

  
  const fetchPackage = () => {
    
    let localStorageemail = localStorage.getItem('email')
    
    // let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/package_list_api'
    let data = {type:3}
    axios.post(full_api,data, { headers: exportValue.headers }).then((res) => {
      
    if (res.data.status === "200") {

        let premiumData = res.data.package_list
        
        setState({
          boosts_first: premiumData[0].boosts, super_likes_first: premiumData[0].super_likes,
          credits_first: premiumData[0].credits, duration_first: premiumData[0].duration,
          boosts_second: premiumData[1].boosts, super_likes_second: premiumData[1].super_likes,
          credits_second: premiumData[1].credits, duration_second: premiumData[1].duration,
          boosts_third: premiumData[2].boosts, super_likes_third: premiumData[2].super_likes,
          credits_third: premiumData[2].credits, duration_third: premiumData[2].duration,
          superData: premiumData
        })
      }
    })
  }

  console.log("state is ",state);

  useEffect(() => { fetchPackage() }, [])

  function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    let data = []

    data.push({boosts:parseInt(state.boosts_first), super_likes:parseInt(state.super_likes_first),credits:parseInt(state.credits_first),duration:parseInt(state.duration_first),package_name:"First",type:parseInt(3)},{boosts:parseInt(state.boosts_second),super_likes:parseInt(state.super_likes_second),credits:parseInt(state.credits_second),duration:parseInt(state.duration_second),package_name:"Second",type:parseInt(3)},{boosts:parseInt(state.boosts_third),super_likes:parseInt(state.super_likes_third),credits:parseInt(state.credits_third),duration:parseInt(state.duration_third),package_name:"Third",type:parseInt(3)})
    

    console.log("ddd is ",data);
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_package_list'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      alert('update successfull')
    })
  }

  const { boosts_first,super_likes_first, credits_first, duration_first, boosts_second, super_likes_second, credits_second, duration_second, boosts_third, super_likes_third, credits_third, duration_third } = state;

  return (
    <>
      <Leftbar title={5} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Gold Package Settings </h3>
                      <div className="col-4 text-right"></div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">Package One</h6>
                    <div className="pl-lg-3">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username"> Boost</label>
                            <input type="number" id="input-username" className="form-control" placeholder="Days" name='boosts_first' value={boosts_first}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Super Likes</label>
                            <input type="number" id="input-username" className="form-control"
                              placeholder="Days" name='super_likes_first' value={super_likes_first}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Points Value" name='credits_first' value={credits_first}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Package Duration</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Value in Amount" name='duration_first' value={duration_first}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h6 className="heading-small text-muted mb-4">Package Two</h6>
                    <div className="pl-lg-3">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Boosts</label>
                            <input type="number" id="input-username" className="form-control"
                              placeholder="Point value" name='boosts_second' value={boosts_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Super Likes</label>
                            <input type="number" id="input-username" className="form-control"
                              placeholder="Point value" name='super_likes_second' value={super_likes_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Value in Amount" name='credits_second' value={credits_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Package Duration</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Value in Amount" name='duration_second' value={duration_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6 className="heading-small text-muted mb-3">Package Three</h6>
                    <div className="pl-lg-3">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Boosts</label>
                            <input type="number" id="input-username" className="form-control"
                              placeholder="Point value" name='boosts_third' value={boosts_third}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Super Likes</label>
                            <input type="number" id="input-username" className="form-control"
                              placeholder="Point value" name='super_likes_third' value={super_likes_third}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Value in Amount" name='credits_third' value={credits_third}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Package Duration</label>
                            <input type="number" id="input-email" className="form-control"
                              placeholder="Value in Amount" name='duration_third' value={duration_third}
                              onChange={handleChangeData}
                            />
                          </div>
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
        <Footer />
      </div>
    </>
  )

}

export default PremiumPackage