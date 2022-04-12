import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
const SuperLikePackage = (props) => {

  const [state, setState] = useState({
    username: '',
    password: '',
    super_likes_first: 0,
    credits_first: 0,
    super_likes_second: 0,
    credits_second: 0,
    super_likes_third: 0,
    credits_third: 0,
    superData: []
  })

  const fetchPackage = () => {
    let localStorageemail = localStorage.getItem('email')

   // let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/package_list_api'

    let data = {type:2}
    axios.post(full_api,data, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {

        let superLike = res.data.package_list
        setState({
          super_likes_first: superLike[0].super_likes,
          credits_first: superLike[0].credits,
          super_likes_second: superLike[1].super_likes,
          credits_second: superLike[1].credits,
          super_likes_third: superLike[2].super_likes,
          credits_third: superLike[2].credits,
          superData: superLike
        })
      }
    })
  }

  useEffect(() => {
    fetchPackage()
  }, [])

  function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    let data = []

    data.push({super_likes:parseInt(state.super_likes_first),credits:parseInt(state.credits_first),package_name:"First",type:parseInt(2)},{super_likes:parseInt(state.super_likes_second),credits:parseInt(state.credits_second),package_name:"Second",type:parseInt(2)},{super_likes:parseInt(state.super_likes_third),credits:parseInt(state.credits_third),package_name:"Third",type:parseInt(2)})
    
    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_package_list'
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      alert('update successfull')
    })
  }

  const {super_likes_first, credits_first, super_likes_second, credits_second, super_likes_third, credits_third} = state;

  return (
    <div>
      <Leftbar title={6} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">

          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Super Like Package Settings</h6>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
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
                            <label className="form-control-label" htmlFor="input-username">Number of Super Likes</label>
                            <input name="super_likes_first" type="number" id="input-username" className="form-control" placeholder="Number of Super Likes" value = {super_likes_first}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input name="credits_first" type="number" id="input-email" className="form-control" placeholder="Points Value" value={credits_first}
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
                            <label className="form-control-label" htmlFor="input-username">Number of Super Likes</label>
                            <input name="super_likes_second" type="number" id="input-username" className="form-control" placeholder="Number of Super Likes" value={super_likes_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input name="credits_second" type="number" id="input-email" className="form-control" placeholder="Value in Points" value={credits_second}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h6 className="heading-small text-muted mb-4">Package Three</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Number of Super Likes</label>
                            <input name="super_likes_third" type="number" id="input-username" className="form-control" placeholder="Number of Super Likes" value={super_likes_third}
                              onChange={handleChangeData}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-email">Credits</label>
                            <input name="credits_third" type="number" id="input-email" className="form-control" placeholder="Value in points" value={credits_third}
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
          <Footer />
        </div>

      </div>
    </div>

  );
}

export default SuperLikePackage;