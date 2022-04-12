import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class DashHeader extends Component {
    constructor(props) {        
    super(props);
    this.state = { username: '', password: '' };
    // handle initialization activities
    }
    handleChangeEvents(event) {
    //handle change events
    }
    handleSubmitevents(event) {
    // handle submit events
    }
    handlePasswordChange(event){
    //handle password change events
    }
  
    render() {
      if(JSON.stringify(localStorage.getItem('isloggedIn'))) {
        //isLoggedIn = JSON.stringify(localStorage.getItem('isloggedIn')).status;     
          if (JSON.stringify(localStorage.getItem('isloggedIn')).status) {				
          console.log("header",localStorage.getItem('isloggedIn'))
          }
        }
    return (      
          
          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                
                <ul className="navbar-nav align-items-center  ml-md-auto ">
                  <li className="nav-item d-xl-none">
                    
                    <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item d-sm-none">
                    <Link className="nav-link" to="/#" data-action="search-show" data-target="#navbar-search-main">
                      <i className="ni ni-zoom-split-in"></i>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="ni ni-bell-55"></i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
                    
                      <div className="px-3 py-3">
                        <h6 className="text-sm text-muted m-0">You have <strong className="text-primary">13</strong> notifications.</h6>
                      </div>
                
                      <div className="list-group list-group-flush">
                        <Link to="/#" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              
                              <img src="/assets/img/theme/box.png" alt="placeholder" className="avatar rounded-circle"/>
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Order #340958304583045</h4>
                                </div>
                                <div className="text-right text-muted">
                                  <small>2 hrs ago</small>
                                </div>
                              </div>
                              <p className="text-xs mb-0">You got Link new order worth $45 with 5 qty.</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      
                      <Link to="order_operation" className="dropdown-item text-center text-primary font-weight-bold py-3">View all</Link>
                    </div>
                  </li>
                  
                </ul>
                <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                  <li className="nav-item dropdown">
                    <Link className="nav-link pr-0" to="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          <img alt="placeholder" src="/assets/img/theme/admin.png"/>
                        </span>
                        <div className="media-body  ml-2  d-none d-lg-block">
                          <span className="mb-0 text-sm  font-weight-bold">Admin</span>
                        </div>
                      </div>
                    </Link>
                    <div className="dropdown-menu  dropdown-menu-right ">
                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </div>
                      <Link to="/admin_profile" className="dropdown-item">
                        <i className="ni ni-single-02"></i>
                        <span>My profile</span>
                      </Link>
                      {/* <Link to="settings.php" className="dropdown-item">
                        <i className="ni ni-settings-gear-65"></i>
                        <span>Settings</span>
                      </Link> */}
                      <div className="dropdown-divider"></div>
                      <Link to="/logout" className="dropdown-item">
                        <i className="ni ni-user-run"></i>
                        <span>Logout</span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    );
    }
    }
    export default DashHeader;