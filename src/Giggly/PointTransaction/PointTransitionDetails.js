import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
const PointTransactionDetail = (props) => {
  let { id } = props.match.params;
  const [state, setState] = useState({ user: '', password: '', user_point_id: '' });
  console.log("user is ",state.user);
  useEffect(() => {
    pointDetails()
    getDetails()
  }, [])

  const getDetails = () => {
    
    let localStorageemail = localStorage.getItem('email')
    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let user_point_id = (state.user_point_id !== undefined &&  state.user_point_id !== '') ? state.user_point_id : id;
    console.log("user point id is ",user_point_id);
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_point_transaction_api/${user_point_id}`
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      console.log("res is ff ",res);
      if (res.data.status === "200") {
        let userPoint = res.data.profile
        setState({
          user: userPoint
        })
      }
    })
  }

  const pointDetails = () => {
    let { id } = props.match.params;
    setState({
      user_point_id: id
    })
  }

  let user = state.user

  console.log("user is ",user);
  return (
    <div>
      <Leftbar title={11} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Credits Transaction
              </h6>

                </div>
                <div className="col-lg-6 col-5 text-right">
                  <Link to="#Link" className="btn btn-sm btn-success">Success</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col-7">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-3">
                      <img src="/assets/img/theme/box.png" alt=" placeholder" className="img-fluid" />
                    </div>
                    <div className="col-9 order_box">
                      <p>
                        <small className="text-muted ">
                        </small>

                      </p>

                    </div>

                  </div>

                </div>
                <div className="card-body">

                  <table className="table table-striped">
                    <tbody>
                    {(user)?
                      <tr>
                        <td className="" width="20%"><img src="https://via.placeholder.com/60/85A5EC/ffffff" alt=" placeholder" className="img-fluid rounded-circle" /></td>
                        <td width="20%"><span className="text-muted ">Package Name</span></td>
                        <td width="20%"><span className="text-muted">{(user.package_name)?user.package_name:"Not Found"}
                        </span></td>
                        <td width="60%"><span className="text-muted ">Package Amount</span></td>
                        <td width="20%"><span className="text-muted">{(user.package_points)?user.package_points:0}
                        </span></td> 
                      </tr>
                     : "" }
                    </tbody>
                  </table>

                </div>
                {(user)?
                <div className="card-footer">
                  <div className="row ">
                    <div className="col text-left">Add Credits</div>
                    <div className="col text-right">{user.package_points}
                    </div>
                  </div>
                  <br />
                  <div className="row ">
                    <div className="col text-left">Total Credits </div>
                    <div className="col text-right">{(user.total_credit) ? user.total_credit : 0}
                    </div>
                  </div>
                  <hr />

                </div> : ""}
              </div>
            </div>
            <div className="col-5"><div className="card ">
              <div className="card-header bg-info text-white">Payment Info</div>
              <div className="card-body">Payment mode: Paypal
      Coupon Code: NEW20 </div>
            </div>
              <div className="card">
                <div className="card-header bg-success text-white">User Info</div>
                <div className="card-body">  <p><Link to="#aa">
                </Link></p>
                
                {(user)?
                
                <div>
                  <p> User Name : {user.user_name}</p>
                  
                   <p>Mobile : {(user.mob_number) ? user.mob_number : "Not Found"} </p>
                  
                  
                  <p> DOB : {user.dob_day +'/'+ user.dob_month +'/' +user.dob_year} </p>
                  
                  </div>
                   : ""
              }
               
                </div>
              </div>
            </div></div>
          <Footer />
        </div>
      </div>
    </div>

  );

}
export default PointTransactionDetail;