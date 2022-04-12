
import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import { Link } from 'react-router-dom'
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { CPagination } from '@coreui/react';
import { toast } from 'react-toastify';

const PackageTransaction = (props) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    package_data: [],
    pager: {},
    pageOfItems: [],
    totalCount: '',
    limit: 10,
    indexValue: 0,

  });

  console.log(" state is ",state.pageOfItems);

  useEffect(() => {
    loadPage()
  }, [state.indexValue])

  const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
  }
  const pagination = (index) => {
    stateHandler('indexValue', index);
  }

  const loadPage = () => {
    let localStorageemail = localStorage.getItem('email')
    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined) {
      props.history.push('/');
    }
    // get page of items from api
    // eslint-disable-next-line no-restricted-globals
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page')) || 1;

      let data = {
        limit: state.limit,
        indexValue: state.indexValue,
      }
      const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/package_transaction_api`;
      axios.post(full_api,data, { headers: exportValue.headers }).then((res) => {
        if (res.data.status === "200") {
          let pager = res.data.pager
          let data = res.data.pageOfItems.transaction_detail
         // console.log(" ddd is ",data);
          stateHandler('totalCount', res.data.pager.totalItems)
          stateHandler('pager',pager)
          stateHandler('pageOfItems',data)
          console.log("Data is ", res)
          // setState({
          //   pager: pager,
          //   pageOfItems: data
          // })
        }
      })
  }

  const { pager, pageOfItems } = state;

  const deleteitems = (id) => {
    const sendData = {
      id : id,
      dstatus : 0
    }

    console.log("send data is ",sendData);
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/package_transaction_delete_api`
    axios.post(full_api,sendData, { headers: exportValue.headers }).then((res) => {
    
       console.log("Response is delete ",res)
        toast.configure()
        toast(" Deleted Succesfully")
    
    })
    loadPage()
  }

  

  return (
    <>
      <div>
        <Leftbar title={2} />
        <div className="main-content" id="panel">
          <DashHeader />
          <div className="header bg-primary pb-6">

            <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                  <div className="col-lg-6 col-7">
                    <h6 className="h2 text-white d-inline-block mb-0">Package Transaction</h6>

                  </div>
                  <div className="col-lg-5 col-3 text-right">
                    {/* <Link  className="btn btn-sm btn-success"> Success</Link>
                    <Link  className="btn btn-sm btn-info"> Pending</Link>
                    <Link  className="btn btn-sm btn-danger"> Canceled</Link> */}
                  </div>

                  {/* <div className="col-lg-2 col-2 text-right">
                                <a href="add_point" className="btn btn btn-default"> Add Point</a>
                                </div> */}
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
                          <th scope="col" className="sort" data-sort="name">#</th>
                          <th scope="col" className="sort" data-sort="budget">ID</th>
                          <th scope="col">User Name</th>
                          <th scope="col">Credits</th>
                          <th scope="col">Package Name</th>
                          <th scope="col">Super Likes</th>
                          <th scope="col">Boosts</th>
                          <th scope="col">Durations</th>
                          {/* <th scope="col" className="sort" data-sort="status">Status</th> */}
                          <th scope="col" className="sort" data-sort="completion">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="list">
                        {pageOfItems.map((value, index) => {
                        //  if(value.dstatus == 1){
                          const i = pager.startIndex
                          return (
                            <React.Fragment key={index + 1}>
                              <tr>
                                <td width="">{index + 1 + i}</td>
                                <th scope="row">
                                  <div className="media align-items-center">
                                    <a href="/#" className="avatar rounded-circle mr-3">
                                      <img alt="placeholder" src="assets/img/theme/box.png" />
                                    </a>
                                    <div className="media-body">
                                      <span className="name mb-0 text-sm"><a href={"package_transaction_detail/" + value.id}>{value.id}</a></span>
                                      <br /><small>Date: {value.date} / Time: {value.time}</small>
                                    </div>
                                  </div>
                                </th>
                                {/* <td>
                      $<strong>02.89</strong>
                    </td> */}

                                <td style= {{textAlign:"center"}}>
                                  {(value.user_name) ? value.user_name : "" }
                                </td>
                                <td style= {{textAlign:"center"}}>
                                  {value.credits}
                                </td>
                                <td style= {{textAlign:"center"}}>
                                  {(value.type == 1) ? "boost package " +  value.package_name : (value.type == 2) ? "super like package " +  value.package_name : (value.type == 3) ? "premium package " +  value.package_name :   value.package_name}
                                </td>
                                <td style= {{textAlign:"center"}}>
                                  { value.super_likes ? value.super_likes : 0 }
                                </td>
                                <td style= {{textAlign:"center"}}>

                                  { value.boosts ? value.boosts : 0 }
                                </td >

                                <td style= {{textAlign:"center"}}> { value.duration ? value.duration : 0 } </td>

                                <td className="text-right">
                                  <div className="dropdown">
                                    <a className="btn btn-sm btn-icon-only text-light" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <i className="fas fa-ellipsis-v"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                      <button className="dropdown-item" onClick={() => deleteitems(value.id)}>Delete</button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          )
                        //}
                        })}

                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer py-4">
                    {/* {pager.pages && pager.pages.length &&
                      <ul className="pagination">
                        <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Prev</Link>
                        </li>
                        {pager.pages.map(page =>
                          <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                            <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                          </li>
                        )}
                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                        </li>
                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                          <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                        </li>
                      </ul>
                    } */}
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

          </div>

        </div>

        <Footer />
      </div>

    </>

  )
}
export default PackageTransaction;