
import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import axios from 'axios';
import exportValue from '../../apiconfig';
import Footer from '../Footer';
import Leftbar from '../LeftSideBar';
import CanvasJSReact from '../../canvasjs-2.3.2/Chart 2.3.2 GA - Stable/canvasjs.react';

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Dashboard = (props) => {
  const [state, setState] = useState({
    username: '', password: '', count_user: 0, count_active_users: 0,
    count_inactive_users: 0, count_suspended_users: 0, count_package_transaction: 0,
    count_point_transaction: 0,
  });

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/count_all_detail_api`
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      let data = res.data.count_details
      setState({
        count_active_users: data.count_active_users,
        count_user: data.count_user,
        count_point_transaction: data.count_point_transaction,
        count_inactive_users: data.count_inactive_users,
        count_suspended_users: data.count_suspended_users,
        count_package_transaction: data.count_package_transaction,
        count_week_package_transaction: data.count_week_package_transaction,
        count_month_package_transition: data.count_month_package_transition,
        count_week_point_transaction: data.count_week_point_transaction,
        count_month_point_transaction: data.count_month_point_transaction
      })
    }).catch(e => {
      console.log('error', e)
    })
  }

  let { count_active_users, count_user, count_point_transaction, count_inactive_users, count_suspended_users, count_package_transaction, count_week_package_transaction, count_month_package_transition, count_week_point_transaction, count_month_point_transaction } = state

  const monthly = {
    title: {
      text: "Monthly Analysis"
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Point Transfer", y: count_month_point_transaction },
          { label: "Package Transfer", y: count_month_package_transition },

        ]
      }
    ]
  }

  return (
    <div>
      <Leftbar />
      <div className="main-content" id="panel">

        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Users Summery <small>(Last 7 days)</small></h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                </div>
              </div>

              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Active</h5>
                          <span className="h2 font-weight-bold mb-0">{count_active_users}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-circle-08"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Inactive</h5>
                          <span className="h2 font-weight-bold mb-0">{count_inactive_users}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-circle-08"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="card card-stats">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Suspended</h5>
                          <span className="h2 font-weight-bold mb-0">{count_suspended_users}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-circle-08"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Total Stats</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">	Users</h5>
                          <span className="h2 font-weight-bold mb-0">{count_user}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-circle-08"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Payments</h5>
                          <span className="h2 font-weight-bold mb-0">0</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                            <i className="ni ni-credit-card"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Point<br /> Transcations</h5>
                          <span className="h2 font-weight-bold mb-0">{count_point_transaction}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-money-coins"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">

                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">Package Transcations</h5>
                          <span className="h2 font-weight-bold mb-0">{count_package_transaction}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                            <i className="ni ni-money-coins"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-6">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Transcations value</h2>
                    </div>
                    <div className="col">

                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">

                    <CanvasJSChart id="chart-sales-dark" className="chart-canvas" options={monthly}

                    />

                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>

        {/* <div className="container-fluid mt--6">
      <div className="row">
        <div className="col-xl-12">
          <div className="card bg-default">
            <div className="card-header bg-transparent">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 className="h3 text-white mb-0">Transition value</h5>
                </div>
                <div className="col">
                  <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item mr-2 mr-md-0" data-toggle="chart" data-target="#chart-sales-dark" data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}' data-prefix="$" data-suffix="k">
                      <Link to="/#" className="nav-link py-2 px-3 active" data-toggle="tab">
                        <span className="d-none d-md-block">Month</span>
                        <span className="d-md-none">M</span>
                      </Link>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              
              <div className="chart">
              <CanvasJSChart id="chart-sales-dark" className="chart-canvas" options = {monthly}
				//  onRef={ref => this.chart = ref} 
			/>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div> */}

        {/* <div className="container-fluid mt--6">
      <div className="row">
        <div className="col-xl-12">
          <div className="card bg-default">
            <div className="card-header bg-transparent">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 className="h3 text-white mb-0">Transition value</h5>
                </div>
                <div className="col">
                  <ul className="nav nav-pills justify-content-end">
                  <li className="nav-item mr-2 mr-md-0" data-toggle="chart" data-target="#chart-sales" data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#a" className="nav-link py-2 px-3 active" data-toggle="tab">
                        <span className="d-none d-md-block">Month</span>
                        <span className="d-md-none">M</span>
                      </a>
                    </li>
                    <li className="nav-item" data-toggle="chart" data-target="#chart-sales" data-update='{"data":{"datasets":[{"data":[0, 20, 5, 25, 10, 30, 15, 40, 40]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#a" className="nav-link py-2 px-3" data-toggle="tab">
                        <span className="d-none d-md-block">Week</span>
                        <span className="d-md-none">W</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              
              <div className="chart">
     
                <canvas id="chart-sales" className="chart-canvas"></canvas>
              </div>
            </div> */}
        {/* <div className="card-body">
              
              <div className="chart">
              <CanvasJSChart id="chart-sales-dark" className="chart-canvas" options = {weekly}
				//  onRef={ref => this.chart = ref} 
			/>
       
              </div>
            </div> */}
        {/* </div>
        </div>
        </div>
      </div> */}
        <Footer />
      </div>
    </div>

  );
}
export default Dashboard;