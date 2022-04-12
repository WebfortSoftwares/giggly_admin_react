import React,{Component} from 'react';
import axios from 'axios';
import exportValue from '../../apiconfig';

// import {reactLocalStorage} from 'reactjs-localstorage';
// import localStroage from 'local-storage'
class Login extends Component {
    constructor(props) {        
    super(props);
    this.state = {  password: '',email:'',remember:false ,alert:''};
    this.handleChangeEvents= this.handleChangeEvents.bind(this);
    this.handleSubmitevents = this.handleSubmitevents.bind(this);
    this.handlePasswordChange=  this.handlePasswordChange.bind(this)
    // handle initialization activities
    }
    handleChangeEvents(event) {
        
        const target = event.target;
        const value=  target.type === 'checkbox' ? target.checked : target.value; 
        console.log("event is ",value);
        const {name} = target;  
        this.setState({
            [name]:value
        }) 
    }
    handleSubmitevents(event) {
           event.preventDefault();
           let data ={
               email:this.state.email,
               password:this.state.password
           }
         let full_api =exportValue.host + '/' + exportValue.version + '/'+exportValue.api+`/app_login`
     //   let full_api =exportValue.host
           axios.post(full_api,data,{headers:exportValue.headers}).then((res)=>{
               if(res.data.status === "200" && res.data.message ==="login successfully"){
                let {email}= this.state
           let login_id = res.data.login_detail.login_id
                localStorage.setItem('email', email);
                localStorage.setItem('login_id', login_id);
                this.props.history.push('/home');
               }else if(res.data.message==="login is not successfull"){
this.setState({
    alert:'Username and Password is incorrect'
})
                this.props.history.push('/');  
               }
           })
        //    
    }
    handlePasswordChange(event){
    //handle password change events
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
            <h6 className="alert text-align-center">{this.state.alert}</h6>
                <form onSubmit={this.handleSubmitevents}>
                    <div className="form-group mb-3">
                   
                    <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                        </div>
                        <input className="form-control" name="email" placeholder="Username" type="text" value={this.state.email} 
                             onChange={this.handleChangeEvents}
                        />
                    </div>
                    </div>
                    <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input className="form-control" name="password" placeholder="Password" type="password" value={this.state.password} 
                             onChange={this.handleChangeEvents}
                        />
                    </div>
                    </div>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                    <input checked={this.state.remember}  className="custom-control-input" name="remember" id=" customCheckLogin" type="checkbox" 
                         onChange={this.handleChangeEvents}
                    />
                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                        <span className="text-muted">Remember me</span>
                    </label>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary my-4">Sign in</button>
                    </div>
                </form>
            </div>
          </div>
    <div className="row mt-3">
    <div className="col-6">
        {/* <a href="/forgot_password" className="text-muted"><small>Forgot password?</small></a> */}
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
    export default Login;