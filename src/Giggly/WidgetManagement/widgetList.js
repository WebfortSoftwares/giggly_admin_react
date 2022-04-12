import React, { useEffect, Fragment, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { Link } from 'react-router-dom'
//import { CPagination } from '@coreui/react';

const CreditList = (props) => {

const [state, setState] = useState({credit_widget_list:""});
console.log("state is ",state);

const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
}

useEffect(() => {
    CreditWidgetList(5)
}, [])

const deleteitem = (action_id) => {


  let data = {
    action_id: action_id
    }

  const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/delete_widget_api`;
  axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
     
    if (res.data.status === "200") {
      CreditWidgetList(5)
    }
  })

}

const edititem = (action_id) => {
  props.history.push(`/add_credit_widget/${action_id}`,{action_id});
}

const CreditWidgetList = (widget_type) => {

  console.log("widget_type is ",widget_type)
    let data = {
    limit: state.limit,
    indexValue: state.indexValue,
    widget_type: widget_type
    }

    const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/credit_action_list_api`;
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
       
      if (res.data.status === "200") {
          let credit_widget_list =  res.data.credit_action_detail;
          stateHandler('credit_widget_list', credit_widget_list)
      }
    })
}
let credit_widget_list = state.credit_widget_list;
return (
    <>
      <Leftbar title={11} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-2 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Credit Widget List</h6>
                </div>
                <div className="col-lg-8 col-3 text-right">
                     <button className="btn btn-sm btn-light" onClick={() => CreditWidgetList(5)}> All </button>
                     <button className="btn btn-sm btn-secondary" onClick={() => CreditWidgetList(1)}> Credit Package </button>
                     <button className="btn btn-sm btn-success" onClick={() => CreditWidgetList(2)}> Premium Package </button>
                     <button className="btn btn-sm btn-info" onClick={() => CreditWidgetList(3)}> Boost Package </button>
                     <button className="btn btn-sm btn-danger" onClick={() => CreditWidgetList(4)}> Super Likes Package </button>
                </div>
                <div className="col-lg-2 col-2 text-right">
                  <a href="add_credit_widget" className="btn btn btn-default"> Add Credit Widget </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                {/* <!-- Card header -->
            
            <!-- Light table --> */}
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="sort" data-sort="name">#</th>
                        <th scope="col" className="sort" data-sort="budget">Icon</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {(credit_widget_list) ? credit_widget_list.map((value, index) => {
                        return (
                          <Fragment key={index + 1}>
                            <tr key={index + 1}>
                              <td width="">{index + 1}</td>
                              <td>
                                <div className="media align-items-center">
                                  <a href="#a" className="avatar rounded-circle mr-3">
                                    <img alt= "placeholde" style={{height: "48px !important"}}  src = {`https://gigglyimg.fniix.com/widget_icon/${value.icon}`}  />
                                  </a>
                                </div>
                              </td>
                              <td>
                                  {value.title}
                              </td>
                              <td>
                                 {value.description}
                             </td>
                              

                              <td className="text-right">
                                <div className="dropdown">
                                  <a className="btn btn-sm btn-icon-only text-light" href="#a" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                    <button className="dropdown-item"  onClick={() => edititem(value.action_id)}  >Edit</button>

                                    <button className="dropdown-item" onClick={() => deleteitem(value.action_id)}>Delete</button>
                                  </div>
                                  
                                </div>
                              </td>
                            </tr>
                          </Fragment>
                        )
                      }):" Data Not Found "}

                    </tbody>
                  </table>
                </div>
                {/* <!-- Card footer --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )

}

export default CreditList