import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import exportValue from '../../apiconfig';
import axios from 'axios';

const PointPackage = (props) => {

  const [state, setState] = useState({
    username: '', password: '',
    package_one_points: 10,
    package_one_amount: 100,
    package_one_final_amount: 100,
    package_two_points: 20,
    package_two_amount: 200,
    package_two_final_amount: 200,
    package_three_points: 30,
    package_three_amount: 300,
    package_three_final_amount: 300,
    package_four_points: 40,
    package_four_amount: 400,
    package_four_final_amount: 400,
    package_five_points: 50,
    package_five_amount: 500,
    package_five_final_amount: 500,
    datasets: [],
  })

  const fetchPointPackage = () => {
    let localStorageemail = localStorage.getItem('email')

   // let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/fetch_point_package'
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {
        let data = res.data.profile
        setState({
          package_five_points: data[0].package_points,
          package_five_amount: data[0].package_total_amount,
          package_five_final_amount: data[0].package_final_amount,
          package_two_points: data[1].package_points,
          package_two_amount: data[1].package_total_amount,
          package_two_final_amount: data[1].package_final_amount,
          package_one_points: data[2].package_points,
          package_one_amount: data[2].package_total_amount,
          package_one_final_amount: data[2].package_final_amount,
          package_three_points: data[3].package_points,
          package_three_amount: data[3].package_total_amount,
          package_three_final_amount: data[3].package_final_amount,
          package_four_points: data[4].package_points,
          package_four_amount: data[4].package_total_amount,
          package_four_final_amount: data[4].package_final_amount,
          datasets: data
        })

      }
    })
  }
  useEffect(() => {
    fetchPointPackage()
  },[])

  function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    let data = state.datasets

    let body = {
      package_one_points: state.package_one_points,
      package_one_amount: state.package_one_amount,
      package_one_final_amount: state.package_one_final_amount,
      package_two_points: state.package_two_points,
      package_two_amount: state.package_two_amount,
      package_two_final_amount: state.package_two_final_amount,
      package_three_points: state.package_three_points,
      package_three_amount: state.package_three_amount,
      package_three_final_amount: state.package_three_final_amount,
      package_four_points: state.package_four_points,
      package_four_amount: state.package_four_amount,
      package_four_final_amount: state.package_four_final_amount,
      package_five_points: state.package_five_points,
      package_five_amount: state.package_five_amount,
      package_five_final_amount: state.package_five_final_amount
    }
    data[0].package_points = parseInt(body.package_five_points);
    data[0].package_total_amount = parseInt(body.package_five_amount);
    data[0].package_final_amount = parseInt(body.package_five_final_amount);
    data[1].package_points = parseInt(body.package_two_points);
    data[1].package_total_amount = parseInt(body.package_two_amount);
    data[1].package_final_amount = parseInt(body.package_two_final_amount);
    data[2].package_points = parseInt(body.package_one_points);
    data[2].package_total_amount = parseInt(body.package_one_amount);
    data[2].package_final_amount = parseInt(body.package_one_final_amount);
    data[3].package_points = parseInt(body.package_three_points);
    data[3].package_total_amount = parseInt(body.package_three_amount);
    data[3].package_final_amount = parseInt(body.package_three_final_amount);
    data[4].package_points = parseInt(body.package_four_points);
    data[4].package_total_amount = parseInt(body.package_four_amount);
    data[4].package_final_amount = parseInt(body.package_four_final_amount);
    let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_point_package'

    axios.post(api, data, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === '200') {
      
      }
    }).catch((err) => {
    })
  }

  return (
    <>
      <Leftbar title={4} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row">
                <div className="col-xl-12 order-xl-1">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h3 className="mb-0">Point Packages Settings </h3>
                        </div>
                        <div className="col-4 text-right"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <h6 className="heading-small text-muted mb-4">Package One</h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-username">Points</label>
                                <input name="package_one_points" type="number" id="input-username" className="form-control" placeholder="Point value" value={state.package_one_points}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name="package_one_amount" value={state.package_one_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Final Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name="package_one_final_amount" value={state.package_one_final_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <h6 className="heading-small text-muted mb-4">Package Two</h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-username">Points</label>
                                <input type="number" id="input-username" className="form-control" placeholder="Point value" name="package_two_points" value={state.package_two_points}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name="package_two_amount" value={state.package_two_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Final Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in final Amount" name="package_two_final_amount" value={state.package_two_final_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <h6 className="heading-small text-muted mb-4">Package Three</h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-username">Points</label>
                                <input type="number" id="input-username" className="form-control" placeholder="Point value" name="package_three_points" value={state.package_three_points}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name="package_three_amount" value={state.package_three_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in final Amount" name="package_three_final_amount" value={state.package_three_final_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <h6 className="heading-small text-muted mb-4">Package Four</h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-username">Points</label>
                                <input type="number" id="input-username" className="form-control" placeholder="Point value" name="package_four_points" value={state.package_four_points}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name='package_four_amount' value={state.package_four_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in final Amount" name='package_four_final_amount' value={state.package_four_final_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                          </div>

                        </div>

                        <h6 className="heading-small text-muted mb-4">Package Five</h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-username">Points</label>
                                <input type="number" id="input-username" className="form-control" placeholder="Point value" name="package_five_points" value={state.package_five_points}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in Amount" name="package_five_amount" value={state.package_five_amount}
                                  onChange={handleChangeData}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label className="form-control-label" htmlFor="input-email">Final Amount</label>
                                <input type="number" id="input-email" className="form-control" placeholder="Value in final Amount" name="package_five_final_amount" value={state.package_five_final_amount}
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
          </div>

        </div>
        <Footer />
      </div>
    </>
  )

}

export default PointPackage;