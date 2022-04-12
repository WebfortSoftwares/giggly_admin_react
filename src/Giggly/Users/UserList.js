import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
import { CPagination } from '@coreui/react';

const UserList = (props) => {
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
    loadPage()
  }, [])
  useEffect(() => {
   state.type == 0 ? loadPage() : profileStatus()
  }, [state.indexValue])
  function loadPage() {
    let localStorageemail = localStorage.getItem('email')

    //let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let data = {
      limit: state.limit,
      indexValue: state.indexValue,
    }
    const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/profile_detail_api`;
    axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {

        let pager = res.data.pager
        let data = res.data.pageOfItems.profile
        stateHandler('pager', pager)
        stateHandler('pageOfItems', data)
        stateHandler('totalCount', res.data.pager.totalItems)

      }
    })
      .catch(err => {
        console.log(err)
      })

  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    let data = {
      searchText: state.query
    }

    if (data.searchText.length !== 0) {
      let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/profile_detail_api`
      axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
       // let pager = res.data.pager
        let data
        let message
        if (res.data.pageOfItems !== undefined) {
          data = res.data.pageOfItems.profile
          message = "Result shown"
        } else {
          data = state.pageOfItems
          message = ""
        }
        stateHandler('pageOfItems', data)
        stateHandler('message', message)
        stateHandler('totalCount', res.data.pager.totalItems)
      })
    }
  }

  const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
  }
  const pagination = (index) => {
    stateHandler('indexValue', index);
    // loadPage()
  }
  const { pager, pageOfItems } = state;

  const deleteContact = (id) => {
    let sendData = {
      t_uid: id,
      dstatus: 3
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_delete_suspend_api`
    axios.post(full_api, sendData, { headers: exportValue.headers }) // <-- remove ;
      .then(res => {
        toast.configure()
        toast("User Deleted Succesfully")
      })
    loadPage()
  }

  const changeStats = (id,dstatus) => {
    let sendData = {
      t_uid: id,
      dstatus: dstatus
    }
    
    console.log("Send data is ",sendData)
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_delete_suspend_api`
    axios.post(full_api, sendData, { headers: exportValue.headers }) // <-- remove ;
      .then(res => {
        toast.configure()
        toast(" Update Succesfully")
      })
    loadPage()
  }

  const verifyStatus = (t_uid,status) => {
    console.log("Send data is ",t_uid)
    console.log("Send data is ",status)

    const sendData = {
      t_uid: t_uid,
      isVerified: status
    }
   let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_delete_suspend_api`
  
    axios.post(api, sendData,{ headers: exportValue.headers }).then((res) => {
      console.log(res.data);
      if(res.data.status == "success") {
        toast.configure()
        toast(" Update Succesfully")
      }
   loadPage()
    })
  }

  const profileStatus = (dstatus) => {
    const sendData = {
      dstatus : dstatus,
      limit: state.limit,
      indexValue: state.indexValue,
    }
   let api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/profile_detail_api`
  
    axios.post(api, sendData,{ headers: exportValue.headers }).then((res) => {
      let pager = res.data.pager
      let data = res.data.pageOfItems.profile
      console.log("Resposne is ",res)
      stateHandler('pager', pager)
      stateHandler('pageOfItems', data)
      stateHandler('totalCount', res.data.pager.totalItems)
      stateHandler('type', 1)

    })
  }

  let postData = pageOfItems.map(function (val, index) {
    if (val.dstatus == 1 || val.dstatus == 2 || val.dstatus == 0) {

      const img = "https://gigglyimg.fniix.com/profile/" + val.user_img[0];
      const i = pager.startIndex
      let Status = ''
      if (val.dstatus === 1) {
        Status = 'Active'
      } else if (val.dstatus === 0) {
        Status = 'Inactive'
      }
      else if (val.dstatus === 2) {
        Status = 'Suspended'
      }

      const mystyle = {
        display: "inline-block" ,
        borderRadius: "60px",
        boxShadow: "0px 0px 1px #888",
        padding: "0.4em 1.1em",
        color: "darkorange"
      };

      console.log("image is ",val.user_img[0]);

      return (
        <Fragment key={index + 1}>
          <tr>
            <td >{index + 1 + i}</td>
            <td>
              {val.membership_type === 1 ? <img src="crown.jpg" alt="img" height='32' width='50' style ={mystyle} />  : ""}
            
              <div className="media align-items-center">
              
                <Link to={"/profile/" + val.t_uid} className="avatar rounded-circle mr-3">
               
                {(val.user_img[0]) ? <img src={img} alt="img" height='50' width='50' /> : <img src="avatar.jpg" alt="Avtar" />}
                </Link>
                <div className="media-body">
                  <span className="name mb-0 text-sm"><Link to={"/profileSample/" + val.t_uid} style={{ marginRight : "1px" }}>{ val.user_name }</Link>
                  {(val.isVerified) ? <img src="verifiedStamp.jpg" alt="verified img" width="30px" height="29px" />:""}</span>
                  <div><small>{val.country}</small>
                  </div>
                </div>
              </div>
            </td>
           
            <td>
              {(val.points > 0) ? val.points : 0 }
            </td>
            <td>
              {val.super_likes}
            </td>
            <td>
              {(val.mob_number) ? val.mob_number : "Not available" }
            </td>
            <td>
              <span className="badge badge-dot mr-4">
                {/* <i className="bg-success"></i> */}
                {val.dstatus == 1 ? <button><span className="status text-success">{Status}</span></button>:
                <button><span className="status text-danger">{Status}</span></button>
                }
                
              </span>
            </td>
            <td className="text-right">
              <div className="dropdown">
                <Link className="btn btn-sm btn-icon-only text-light" to="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link className="dropdown-item" to={"/profile/" + val.t_uid}>Edit</Link>
                  <button className="dropdown-item" onClick={() => deleteContact(val.t_uid)}>Remove</button>
                  <button style={{display: val.dstatus == 0 ? "block" : "none"}} className="dropdown-item" onClick={() => changeStats(val.t_uid,1)}>Active</button>
                  <button style={{display: val.dstatus == 1 ? "block" : "none"}} className="dropdown-item" onClick={() => changeStats(val.t_uid,0)}>Inactive</button>
                  <button className="dropdown-item" onClick={() => changeStats(val.t_uid,2)}>Suspend</button>
                  <button style={{display: !val.isVerified ? "block" : "none"}} className="dropdown-item" onClick={() => verifyStatus(val.t_uid,1)}>verify</button>
                  <button style={{display: val.isVerified ? "block" : "none"}} className="dropdown-item" onClick={() => verifyStatus(val.t_uid,0)}>Unverified</button>

                </div>
              </div>
            </td>
          </tr>
        </Fragment>
      )
    }
  })
  let message = state.message
  return (
    <div>
      <Leftbar title={1} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-3 col-3">
                  <h6 className="h2 text-white d-inline-block mb-0">User List</h6>
                </div>
                <div className="col-lg-4 col-4">
                  <button onClick={() => profileStatus(1)} className="btn btn-sm btn-success"> Active</button>
                  <button onClick={() => profileStatus(0)} className="btn btn-sm btn-danger"> Inactive</button>
                  <button onClick={() => profileStatus(2)} className="btn btn-sm btn-warning"> Suspended</button>
                </div>
                <div className="col-lg-5 col-5 text-right">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="form-group">
                      <label className="form-control-label"></label>
                      <input type="text" className="form-control"
                        name='query'
                        id="filter" placeholder="Search By Name ..."
                        value={state.query}
                        onChange={(event) => stateHandler('query', event.target.value)} />
                      <button className='btn btn-facebook' type="submit">Search</button>
                    </div>    </form>

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
                        <th scope="col" className="sort" data-sort="name">#</th>
                        <th scope="col" className="sort" data-sort="budget">Name</th>                       
                        <th scope="col">Points</th>
                        <th scope="col">Super Likes</th>
                        <th scope="col">Mobile</th>
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
export default UserList;