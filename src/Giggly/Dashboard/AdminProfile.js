import React,{Component} from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios'
import exportValue from '../../apiconfig';
class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = { 
      currPassword:'', 
      newPassword:'', 
      repeatPaaword:'',
      alert:'',
      Adminemail:'',
      login_id:''
      }
    }
    componentDidMount(){
      this.getInfo()
    }
    getInfo(){
      let localStorageemail = localStorage.getItem('email')
      let login_id =localStorage.getItem('login_id')
      this.setState({
        Adminemail:localStorageemail,
        login_id:login_id
      })
      if(localStorageemail===undefined||localStorageemail===null){
        this.props.history.push('/');
      }
    }
    handleChangeEvents=(event)=>{

      let {name,value}=  event.target
      this.setState({
        [name]:value
      },()=>{
        this.checkPassword()
      })
    }
    checkPassword(){
      let newPassword = this.state.newPassword
      let confirmPassword = this.state.repeatPaaword
      if(newPassword===confirmPassword){
       this.setState({
         alert:'Password is matched'
       })
      }else{
        this.setState({
          alert:'Password is did not matched '
        })
      }
    }
handleSubmit=(event)=>{
  let {currPassword,newPassword,repeatPaaword,Adminemail,login_id} = this.state
if(newPassword===repeatPaaword){
let full_api = exportValue.host + '/' + exportValue.version + '/'+exportValue.api+`/change_password`
let data={
  currPassword:currPassword,
  newPassword:newPassword,
  Adminemail:Adminemail,
  login_id:login_id
}
axios.post(full_api,data,{headers:exportValue.headers}).then((res)=>{
})
}
  event.preventDefault();
}
    render() {
      
        return(
            <>
            <Leftbar/>
          <div className="main-content" id="panel">   
          <DashHeader/>
          <div className="header bg-primary pb-6">
          <div className="container-fluid">
          <div className="header-body">
          <div className="row align-items-center py-4">
          <div className="col-lg-6 col-7">
          <h6 className="h2 text-white d-inline-block mb-0">Welcome Admin</h6>
          <div className="col-lg-6 col-5 text-right">
            </div>
          </div>
          </div>
          </div>
          </div>
          <div className="container-fluid mt-4">
          <div className="row">
        <div className="col-xl-12 order-xl-1">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">Edit Password </h3>
                </div>
                <h3 className='alert '>{this.state.alert}</h3>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <h6 className="heading-small text-muted mb-4">Change Password</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Current Password</label>
                        <input type="Password" id="input-username"   onChange={this.handleChangeEvents}
                        name="currPassword" className="form-control" placeholder="Current Password" value={this.state.currPassword}/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">New Password</label>
                        <input type="Password" id="input-username" name="newPassword"
                          onChange={this.handleChangeEvents} className="form-control" placeholder="New Password" value={this.state.newPassword}/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Repeat New Password</label>
                        <input type="Password" id="input-username" className="form-control" name="repeatPaaword" placeholder="Repeat New Password" value={this.state.repeatPaaword}
                          onChange={this.handleChangeEvents}
                        />
                      </div>
                    </div>
                  </div>
                </div>        
<button type="submit" className="btn btn-primary">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
          </div>
          </div>
          <Footer/>
           </div>
            </>
        )
    }
}
export default Admin