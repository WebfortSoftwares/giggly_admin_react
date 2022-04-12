import React,{Component} from 'react';
import {Link} from 'react-router-dom'

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
        this.handleSubmitevents= this.handleSubmitevents.bind(this)
    }
    handleChangeEvents(event) {
     
        //handle change events
        }
        handleSubmitevents(event) {
        // handle submit events
        event.preventDefault();
        }
        handlePasswordChange(event){
        //handle password change events
        }

      render() {
          return(
              <>
                 <div className="main-content">
                 <div className="header bg-gradient-primary py-7 py-lg-6 pt-lg-5">
      <div className="container">
        <div className="header-body text-center mb-7">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 className="text-white">Forgot Password?</h1>
              <p className="text-white" >You will get the email with link to reset your password</p>
            </div>
          </div>
        </div>
      </div>
      <div className="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    {/* <!-- Page content --> */}
    <div className="container mt--8 pb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card bg-secondary border-0 mb-0">
            <div className="card-body px-lg-5 py-lg-5">
              <form onSubmit={this.handleSubmitevents}>
                <div className="form-group mb-3">
                  <div className="input-group input-group-merge input-group-alternative">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                    </div>
                    <input className="form-control" placeholder="Enter your Email address" type="email"/>
                  </div>
                </div>
                <div className="text-center">
                  <button type="sunmit" className="btn btn-primary my-4">Send Email</button>
                </div>  
              </form>
            </div>
          </div>
        </div>

      </div>
      <div className="row justify-content-center mt-3">
            <div className="col-6">
              <Link to="/login" className="text-muted"><small>Go back to Home Page</small></Link>
            </div>
          </div>
    </div>
    
     </div>
              </>
          )
      }  
}
export default Forgot