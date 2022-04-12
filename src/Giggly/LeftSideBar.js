import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class Login extends Component {
    constructor(props) {        
    super(props);
    this.state = { username: '', password: '',linkActive:0 };
    if(props.title) {
        this.state.linkActive = props.title;
    }
    // handle initialization activities
    }
    
    
    render() {
    return (
        
        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
        <div className="scrollbar-inner">
        
          <div className="sidenav-header  align-items-center">
            <Link className="navbar-brand" to="/home">
              <img src="/assets/img/brand/blue.png" className="navbar-brand-img" alt="..."/>
            </Link>
          </div>
          <div className="navbar-inner">
            
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
              
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 0 ? "nav-link active":"nav-link"} to="/home">
                    <i className="ni ni-tv-2 text-primary"></i>
                    <span className="nav-link-text">Dashboard</span>
                  </Link>
                </li>
                 <li className="nav-item">
                  <Link className={ this.state.linkActive === 1 ? "nav-link active":"nav-link"} to="/user_list">
                    <i className="ni ni-single-02 text-info"></i>
                    <span className="nav-link-text">Users</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 14 ? "nav-link active":"nav-link"} to="/user_about_option">
                    <i className="ni ni-single-02 text-info"></i>
                    <span className="nav-link-text">Users Bio</span>
                  </Link>
                </li>
                <li>
                <Link className={ this.state.linkActive === 15 ? "nav-link active":"nav-link"} to="/verification_list">
                    <i className="ni ni-single-02 text-info"></i>
                    <span className="nav-link-text">Verification List</span>
                  </Link>
                  </li>
                 <li className="nav-item">
                  <Link className={ this.state.linkActive === 2 ? "nav-link active":"nav-link"} to="/package_transaction">
                    <i className="ni ni-money-coins text-primary"></i>
                    <span className="nav-link-text">Package Transcations</span>
                  </Link>
                </li>
    
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 3 ? "nav-link active":"nav-link"} to="/credit_transaction">
                    <i className="ni ni-money-coins text-primary"></i>
                    <span className="nav-link-text">Credit Transcations</span>
                  </Link>
                </li>
    
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 4 ? "nav-link active":"nav-link"} to="/credit_package">
                    <i className="ni ni-favourite-28 text-orange"></i>
                    <span className="nav-link-text">Credit Package</span>
                  </Link>
                </li>
    
                 <li className="nav-item">
                  <Link className={ this.state.linkActive === 5 ? "nav-link active":"nav-link"} to="/premium_package">
                    <i className="ni ni-diamond text-red"></i>
                    <span className="nav-link-text">Premium Package</span>
                  </Link>
                </li>
                 
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 6 ? "nav-link active":"nav-link"} to="/super_like_package">
                    <i className="ni ni-like-2 text-danger"></i>
                    <span className="nav-link-text">Super Likes Package</span>
                  </Link>
                </li>

                 <li className="nav-item">
                  <Link className={ this.state.linkActive === 7 ? "nav-link active":"nav-link"} to="/boosts">
                    <i className="ni ni-notification-70 text-success"></i>
                    <span className="nav-link-text">Boosts Package</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={ this.state.linkActive === 11 ? "nav-link active":"nav-link"} to="/widget_list">
                    <i className="ni ni-notification-70 text-success"></i>
                    <span className="nav-link-text">Widget List</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={ this.state.linkActive === 12 ? "nav-link active":"nav-link"} to="/hashTagDetail">
                    <i className="ni ni-notification-70 text-success"></i>
                    <span className="nav-link-text">HashTag Detail</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={ this.state.linkActive === 13 ? "nav-link active":"nav-link"} to="/system_setting">
                    <i className="ni ni-notification-70 text-success"></i>
                    <span className="nav-link-text">System Setting</span>
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link className={ this.state.linkActive === 11 ? "nav-link active":"nav-link"} to="/transaction_detail">
                    <i className="ni ni-like-2 text-danger"></i>
                    <span className="nav-link-text">Transaction Detail</span>
                  </Link>
                </li>
                  */}
                
              </ul>
              
              

              <hr className="my-2"/>
              
              <h6 className="navbar-heading p-0 text-muted">
                <span className="docs-normal">Web Management</span>
              </h6>

              <ul className="navbar-nav mb-md-3">
              
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 32 ? "nav-link active":"nav-link"} to="/web_header">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">Header</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 33 ? "nav-link active":"nav-link"} to="/web_sub_header">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">Sub Header</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 34 ? "nav-link active":"nav-link"} to="/web_home_content">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">Home Content</span>
                  </Link>
                </li>
               
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 35 ? "nav-link active":"nav-link"} to="/web_video_panel">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">Video Panel</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={ this.state.linkActive === 36 ? "nav-link active":"nav-link"} to="/web_testimonial">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">Testimonial</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className={ this.state.linkActive === 36 ? "nav-link active":"nav-link"} to="/web_download">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">DownLoad</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className={ this.state.linkActive === 8 ? "nav-link active":"nav-link"} to="/cms_page">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">DownLoad Penal</span>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 8 ? "nav-link active":"nav-link"} to="/cms_page">
                    <i className="ni ni-notification-70 text-info"></i>
                    <span className="nav-link-text">CMS Management</span>
                  </Link>
                </li>
              </ul>
              <hr className="my-2"/>
              
              <h6 className="navbar-heading p-0 text-muted">
                <span className="docs-normal">Settings</span>
              </h6>
              
              <ul className="navbar-nav mb-md-3">
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 9 ? "nav-link active":"nav-link"} to="/settings">
                    <i className="ni ni-spaceship"></i>
                    <span className="nav-link-text">General Settings</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 10 ? "nav-link active":"nav-link"} to="/social">
                    <i className="ni ni-spaceship"></i>
                    <span className="nav-link-text">Social Media Settings</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={ this.state.linkActive === 14 ? "nav-link active":"nav-link"} to="/payment_setting">
                    <i className="ni ni-spaceship"></i>
                    <span className="nav-link-text">Payment Gateway Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
    );
    }
    }
    export default Login;