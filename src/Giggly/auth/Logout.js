import React,{Component} from 'react';
import axios from 'axios';
import exportValue from '../../apiconfig';

class Logout extends Component {
    constructor(props) {        
    super(props);
    this.state = { username: '' };
   
    // handle initialization activities
    }
    getStarted(){
      localStorage.removeItem('email')
      localStorage.clear()
      let api = exportValue.host + '/' + exportValue.version + '/'+exportValue.api+'/app_logout'
      axios.post(api).then((res)=>{
     
        console.log(res)
      })
    }
    componentDidMount() {
        this.getStarted()
         }
         render() {
            return (
            <div className="TestLoginForm ">
            <div className="main-content">
        
                    <div className="header bg-gradient-primary py-7 py-lg-6 pt-lg-5">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                            <h1 className="text-white">Welcome!</h1>
                            
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
                      <h2>You are successfully Logout</h2>
                      
                    </div>
                  </div>
            <div className="row mt-3">
            <div className="col-6">
              <a href="/" className="btn btn-group-lg btn-dark text-light"><small>Login Again?</small></a>
            </div>
            </div>
                </div>
              </div>
            </div>
            </div>
       
            </div>
            );
            }
}
export default Logout