import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
import { CPagination } from '@coreui/react';

const VerificationList = (props) => {
  const [state, setState] = useState({
    indexValue: 0,
    offset: 0,
    pager: {},
    pageOfItems: [],
    query: '',
    message: '',
    totalCount: '',
    limit: 15,
    type : 0
  })

  useEffect(() => {
    profileStatus()
    //loadPage()
  }, [])
//   useEffect(() => {
//    state.type == 0 ? loadPage() : profileStatus()
//   }, [state.indexValue])

  
  const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
  }
  const pagination = (index) => {
    stateHandler('indexValue', index);
    // loadPage()
  }
  const { pager, pageOfItems } = state;


  const profileStatus = () => {
   
   let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/verified_list_api`
  
    axios.get(api,{ headers: exportValue.headers }).then((res) => {
        console.log("res is ",res);
      let pager = res.data.verified_list_count
      let data = res.data.verified_list
    //   console.log("Resposne is ",res)
     
       stateHandler('pageOfItems', data)
       stateHandler('totalCount', pager)
    //   stateHandler('type', 1)

    })
  }

  let postData = pageOfItems.map(function (val, index) {
    
      //const img = "https://gigglyimg.fniix.com/profile/" 
      //+ val.user_img[0];
      return (
        <Fragment key={index + 1}>
          <tr>
            
            <td>{val.date}</td>
            <td>{val.v_id}</td>
            <td>
              <div className="media align-items-center">
              
                <div className="media-body">
                  <span className="name mb-0 text-sm"><Link to={"/profile/" + val.t_uid}>{val.user_name}</Link>
                 </span>
                  
                </div>
              </div>
            </td>
           <td>
           <span className="name mb-0 text-sm">{(val.isVerified == 2) ? "Request Pending":(val.isVerified == 1) ? "Verified": (val.isVerified == 3) ? "Rquest Rejected" :""}</span>
             </td>
            
            <td>
            <Link  to={{pathname:"/verified_detail", state:{ v_id: val.v_id }}}>  View   </Link>
              
            </td>
          </tr>
        </Fragment>
      )
    
  })
  let message = state.message
  return (
    <div>
      <Leftbar title={15} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-3 col-3">
                  <h6 className="h2 text-white d-inline-block mb-0">Verified List</h6>
                </div>
              
                <div className="col-lg-5 col-5 text-right">
                

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">

                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                       
                        <th scope="col" className="sort" data-sort="budget">Date</th>                       
                        <th scope="col" className="sort" data-sort="status">Verification ID</th>
                       
                        <th scope="col" className="sort" data-sort="status">User Name</th>
                        <th scope="col" className="sort" data-sort="status">Status</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                      {message}
                    </thead>
                    <tbody >

                      {postData}

                    </tbody>
                  </table>
                </div>
                <div className="card-footer py-4">
                  <CPagination
                    activePage={state.indexValue + 1}
                    pages={Math.ceil(state.totalCount / state.limit)}
                    onActivePageChange={(value) => {
                      pagination((value == 0) ? value : value - 1)
                    }}
                    arrows={false}
                    align={'end'} />
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
export default VerificationList;