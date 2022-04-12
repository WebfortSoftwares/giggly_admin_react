import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
const PackageTransactionDetail = (props) =>  {
 // let { id } =  props.match.params;
 let { id } =  props.match.params;
    const [state, setState] = useState({ userDetails: '', password: '', package_id: '' });
  useEffect(() => {
    getpackageDetails()
    getDetails()
    getpackageDetails()
  }, [])

 
 const getpackageDetails = ()  => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
       props.history.push('/');
    }
    
     setState({
      id: id
    })
  }

const  getDetails = () =>  {
    id =  (state.id && state.id !== undefined) ? state.id : id;
    console.log("ful api id is ",id);
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_package_transaction_api/${id}`
    console.log("ful api is ",full_api);
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {
        console.log("res is ",res);
        let userDetails = res.data.profile
        console.log("userDetails is ",userDetails);
         setState({
          userDetails: userDetails
        })
      }
    })
  }
    let user =  state.userDetails
    console.log(" user is ",user);
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
                    <h6 className="h2 text-white d-inline-block mb-0">Package Transaction { state.id}</h6>

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
                      {(user)?
                      <div className="col-9 order_box">
                        <p>
                          Date:
                           {user.date} 
                           </p>
                        <p className="text-muted ">
                        Time : 
                        {user.time} 
                        </p>

                        <p>
                        package :
                        {user.package_name} 
                        </p>

                      </div> : ""}

                    </div>

                  </div>
                  <div className="card-body">

                    <table className="table table-striped">
                      <tbody>
                      {(user)?
                        <tr>
                          {/* <td className="" width="20%"><img src="/https://via.placeholder.com/60/85A5EC/ffffff" alt=" placeholder"className="img-fluid rounded-circle"/></td> */}
                          <td width="60%"><span className="text-muted ">Package Name :
                           {(user.type == 1) ? "Boost Package" : (user.type == 2) ? " Super Like Package " : (user.type == 3) ? "Premium Package" :""}
                          </span></td>
                          <td width="20%"><span className="text-muted">{user.user_package_duration} Days</span></td>
                          <td width="20%"><span className="text-muted"> Total : 
                         {user.total_credit} credits </span></td>
                        </tr> : ""}
                      </tbody>
                    </table>

                  </div>
                  <div className="card-footer">
                    <div className="row ">
                      <div className="col text-left">Credits Paid </div>
                      {(user)?
                      <div className="col text-right">
                     {user.credits} credits
                      </div>:""}
                    </div>
                    <hr />

                  </div>
                </div>
              </div>
              <div className="col-5"><div className="card ">
                <div className="card-header bg-info text-white">Payment Info</div>
                <div className="card-body">Payment mode: Paypal
      Coupon Code: NEW20 </div>
              </div>
                <div className="card">
                  <div className="card-header bg-success text-white">User Info</div>
                  {(user)?
                  <div className="card-body">
                    <p><Link to="#aa">
                      Name :
                       { user.user_name } 
                      </Link></p>
                    <p> Mobile :
                     { user.mob_number } 
                    </p>
                    <p>Boots :
                     { user.total_boosts } 
                    </p>
                    <p>Super Likes : 
                     { user.total_super_likes } 
                    </p>
                  </div>
                :''}
                </div>
              </div></div>
            <Footer />
          </div>
        </div>
      </div>

    );
  
}
export default PackageTransactionDetail;