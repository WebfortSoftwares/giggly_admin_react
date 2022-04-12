import React, { useEffect, Fragment, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { Link } from 'react-router-dom'
import { CPagination } from '@coreui/react';

const PointTransition = (props) => {

  const [state, setState] = useState({
    username: '', password: '', Data: [],
    pager: {},
    pageOfItems: [],
    indexValue: 0,
    limit: 10,
    totalCount: 0,
  })

  const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
  }
  const pagination = (index) => {
    stateHandler('indexValue', index);
    loadPage()
  }
  const PointTransitions = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/point_transaction_list`
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
     // console.log(" res is ",res.data);
      let pointData = res.data.profile;
      stateHandler('Data', pointData)
    })
  }

  useEffect(() => {
    loadPage();
    PointTransitions()
  }, [])

  const loadPage = () => {
    let data = {
      limit: state.limit,
      indexValue: state.indexValue,

    }
    const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/point_transaction_list`;
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {
        let pager = res.data.pager
        let data = res.data.pageOfItems.profile
        stateHandler('pager', pager)
        stateHandler('pageOfItems', data)
        stateHandler('totalCount', res.data.pager.totalItems)

      }
    })

  }

  const { pager, pageOfItems } = state;
  const deleteitem = (page, id) => {
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/delete_point_api/${page}/${id}`
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {
        let pager = res.data.pager
        let data = res.data.pageOfItems.profile
        stateHandler('pager', pager)
        stateHandler('pageOfItems', data)
      }
    })
  }

  console.log(" vv value is ",pageOfItems);
  return (
    <>
      <Leftbar title={3} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">Credits Transaction</h6>
                </div>
                <div className="col-lg-4 col-3 text-right">
                  {/* <Link className="btn btn-sm btn-success"> Success</Link>
                  <Link className="btn btn-sm btn-info"> Pending</Link>
                  <Link className="btn btn-sm btn-danger"> Canceled</Link> */}
                </div>
                <div className="col-lg-2 col-2 text-right">
                  {/* <a href="add_point" className="btn btn btn-default"> Add Credit</a> */}
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
                        <th scope="col" className="sort" data-sort="budget">ID</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Credits</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Gateway</th>
                        <th scope="col" className="sort" data-sort="status">Status</th>
                        <th scope="col" className="sort" data-sort="completion">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="list">
                      {pageOfItems.map((value, index) => {
                        return (
                          <Fragment key={index + 1}>
                            <tr key={index + 1}>
                              <td width="">{index + 1}</td>
                              <td>
                                <div className="media align-items-center">

                                  <a href="#a" className="avatar rounded-circle mr-3">
                                    <img alt=" placeholder" src="assets/img/theme/box.png" />
                                  </a>
                                  <div className="media-body">
                                    <span className="name mb-0 text-sm"><a href={"point_transaction_detail/" + value.user_point_id}>{value.user_point_id}</a></span>
                                    <br /><span>package Name : {value.package_name} <br /></span><small>
                                      Date: {value.date} / Time: {value.created.getTime}</small>
                                    <br /><p>User Mobile No :{(value.mob_number) ? value.mob_number : "Not Found"}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {value.user_name}
                              </td>
                              <td>
                                {value.package_points}
                              </td>
                              <td>
                                {(value.package_total_amount) ? value.package_total_amount : 0}
                              </td>
                              <td>
                                Paypal
                    </td>
                              <td>
                                <span className="badge badge-dot mr-4">
                                  <i className="bg-success"></i>
                                  <span className="status text-success">Success</span>
                                </span>
                              </td>

                              <td className="text-right">
                                <div className="dropdown">
                                  <a className="btn btn-sm btn-icon-only text-light" href="#a" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                    <button className="dropdown-item" onClick={() => deleteitem(pager.currentPage, value.user_point_id)}>Delete</button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </Fragment>
                        )
                      })}

                    </tbody>
                  </table>
                </div>
                {/* <!-- Card footer --> */}
                <div className="card-footer py-4">
                  <CPagination
                    activePage={state.indexValue + 1}
                    pages={Math.round(state.totalCount / 10)}
                    onActivePageChange={(value) => {
                      pagination((value == 0) ? value : value - 1)
                    }}
                    arrows={false}
                    align={'end'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )

}

export default PointTransition