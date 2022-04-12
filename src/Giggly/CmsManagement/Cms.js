import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import {Link} from 'react-router-dom'

import axios from 'axios';
import exportValue from '../../apiconfig';
//import { toast } from 'react-toastify';



const Cms  = (props) =>  {
  
       useEffect(() => {
        cmsManagement();
       },[])
        const [state,setState]  = useState({
          data_array:[]
        })

        console.log("state is ",state);
        

        const cmsManagement = () => {
          let localStorageemail = localStorage.getItem('email')
      
          let remember = localStorage.getItem('remember')
          if (localStorageemail === undefined || localStorageemail === null) {
            props.history.push('/');
          }

          let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/cms_manage_api';
          let d1 = {};
          axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
            console.log("web value a ",res);
          //  console.log("web value ",res.data.web_data[0].web_id);
            //if (res.data.status === "200") {
              setState({...state,data_array:res.data})
              // setState({...state,web_data:res.data.web_data[0].values,web_id:res.data.web_data[0].web_id})
           // }
          })
        }


        const edititem = (cms_id) => {
          props.history.push(`/edit_cms/${cms_id}`,{cms_id});
        }

        return(
            <> <Leftbar title={8} />
            <div className="main-content" id="panel">
            <DashHeader/>
             <div className="header bg-primary pb-6">
             {/* header */}
             <div className="container-fluid">
             <div className="header-body">
             <div className="row align-items-center py-4">
     
             <div className="col-lg-9 col-9">
             <h6 className="h2 text-white d-inline-block mb-0">CMS List</h6>
             </div>
             <div className="col-lg-3 col-3">
             {/* <Link to="#ac" className="btn btn-sm btn-success"> Active</Link>
              <Link to="#inc" className="btn btn-sm btn-danger"> Inactive</Link> */}
            </div>
     </div>
             </div>
             </div>
             </div>
             {/* new */}
             <div className="container-fluid mt--6">
             <div className="row">
             <div className="col">
             <div className="card">
             {/* table */}
             <div className="table-responsive">
             <table className="table align-items-center table-flush">
             <thead className="thead-light">
                  <tr>
                    <th scope="col" className="sort" data-sort="budget">Page Name</th>
                    <th scope="col" className="sort" data-sort="completion">Actions</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="list">
                {(state.data_array) ? state.data_array.map((value, index) => {
                        return (
                <tr>
                     
                    <td >
                      <div className="media align-items-center">
                        <Link to="profile" className="avatar rounded-circle mr-3">
                          <img alt=" placeholder" src="assets/img/theme/cms.png"/>
                        </Link>
                        <div className="media-body">
                          <span className="name mb-0 text-sm"><Link to="profile">{value.cms_name}</Link></span>
                        </div>
                      </div>
                    </td>
                   
                    <td>


                    <div className="media align-items-center">
                        <div className="media-body">
                        <button className="dropdown-item"  onClick={() => edititem(value.cms_id)}  >Edit</button>
                        </div>
                      </div>
                   </td>
                  </tr>
                        )
                   }):""}
                  
                </tbody>
             </table>
             </div> 
             {/* card footer */}
                       {/* <div className="card-footer py-4">
                       <nav aria-label="...">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#Link" tabIndex="-1">
                      <i className="fas fa-angle-left"></i>
                      <span className="sr-only">Previous</span>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="#Link">1</Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#Link">2 <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="page-item"><Link className="page-link" to="#Link">3</Link></li>
                  <li className="page-item">
                    <Link className="page-link" to="#Link">
                      <i className="fas fa-angle-right"></i>
                      <span className="sr-only">Next</span>
                    </Link>
                  </li>
                </ul>
              </nav>
                       </div> */}
                       {/* footer end */}
             </div>
             </div>
             </div>
             </div>
            {/* two */}
            <Footer/>
             </div>
            </>
        )
   
}

export default Cms