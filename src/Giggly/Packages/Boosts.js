import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';

const Boosts = (props) => {

  const [state, setState] = useState({
    username: '', password: '', 
    boosts_first: 0, credits_first: 0, boosts_second: 0, 
    credits_second: 0, boosts_third: 0, credits_third: 0,
    superData: []
  })

  

  const fetchPackage = () => {
    
    let localStorageemail = localStorage.getItem('email')
    
    // let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/package_list_api'
    let data = {type:1}
    axios.post(full_api,data, { headers: exportValue.headers }).then((res) => {
      
    if (res.data.status === "200") {

        let boostData = res.data.package_list
        console.log("boost data is ",boostData);
        setState({
          boosts_first: boostData[0].boosts, credits_first: boostData[0].credits, 
          boosts_second: boostData[1].boosts, credits_second: boostData[1].credits, 
          boosts_third: boostData[2].boosts, credits_third: boostData[2].credits, 
          superData: boostData
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

    data.push({boosts:parseInt(state.boosts_first), credits:parseInt(state.credits_first),package_name:"First",type:parseInt(1)},{boosts:parseInt(state.boosts_second),credits:parseInt(state.credits_second), package_name:"Second",type:parseInt(1)},{boosts:parseInt(state.boosts_third), credits:parseInt(state.credits_third), package_name:"Third",type:parseInt(1)})
    
   
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_package_list'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      alert('update successfull')
    })
  }


const { boosts_first, credits_first, boosts_second, credits_second,  boosts_third, credits_third } = state;

  return (
    <>
      <Leftbar title={7} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 order-xl-1">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Boosts Package Settings </h3>
                      </div>
                      <div className="col-4 text-right">

                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <h6 className="heading-small text-muted mb-4">Package One</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-username">Number of Boosts</label>
                              <input name="boosts_first" type="number" id="package_one_boosts_number" className="form-control" placeholder="Number of Boosts" value={boosts_first}
                                onChange={handleChangeData}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Credits</label>
                              <input name="credits_first" type="number" id="package_one_boosts_points" className="form-control" placeholder="Points Value" value={credits_first}
                                onChange={handleChangeData}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h6 className="heading-small text-muted mb-4">Package Two</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-username">Number of Boosts</label>
                              <input name="boosts_second" type="number" id="package_two_boosts_number" className="form-control" placeholder="Number of Boosts" value={boosts_second}
                                onChange={handleChangeData} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Credits</label>
                              <input name="credits_second" type="number" id="package_two_boosts_points" className="form-control" placeholder="Value in Points" value={credits_second}
                                onChange={handleChangeData} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <h6 className="heading-small text-muted mb-4">Package Three</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-username">Number of Boosts</label>
                              <input name="boosts_third" type="number" id="package_three_boosts_number" className="form-control" placeholder="Number of Boosts" value={boosts_third}
                                onChange={handleChangeData} />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Credits</label>
                              <input name="credits_third" type="number" id="package_three_boosts_points" className="form-control" placeholder="Value in points" value={credits_third}
                                onChange={handleChangeData} />
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
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Boosts