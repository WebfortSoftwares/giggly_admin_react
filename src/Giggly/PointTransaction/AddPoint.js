import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const AddPoint = (props) => {

  const [state, setState] = useState({
    username: '', password: '', mob_number: '', points: '',points_id:'', package_name: 'first', amount: '',final_amount:'', datasets: []
  })
  console.log("first one is ",state);
  

  useEffect(() => {
    // (state.mob_number !== '' && state.mob_number !== undefined && state.package_name === undefined) ? getUserDetail() : getpackage()
    getpackage()
  }, [state.package_name])



  function handleChangeData(e) {
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }

  console.log("first");
//   const getUserDetail = () => {
//     console.log("mmm",state.mob_number)
//     if(state.mob_number !== '' && state.mob_number !== undefined){
//     let localStorageemail = localStorage.getItem('email')
//     if (localStorageemail === undefined || localStorageemail === null) {
//       props.history.push('/');
//     }

//     let mob_number = state.mob_number

//     let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/user_detail/${mob_number}`
//     axios.get(full_api, { headers: exportValue.headers }).then((res) => {
//       if (res.data.status === "200") {
//         let data = res.data.profile
//         console.log("data is ",data);
//         if(data.length > 0){
//         //  let mob_numbers = data[0];
//           // let package_points = data[0].package_points
//           // let package_amount = data[0].package_total_amount
//           //setState({
//               // mob_number:mob_number
  
//             // points: package_points,
//             // amount: package_amount
//          // })

//         }
        
//       }

//   })
// }
// }


  const getpackage = () => {
    console.log("second");
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let package_name = state.package_name

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/fetch_point_package/${package_name}`
    axios.get(full_api, { headers: exportValue.headers }).then((res) => {
      if (res.data.status === "200") {
        let data = res.data.profile
        let points_id = data[0].points_id
        let package_name = data[0].package_name
        let package_points = data[0].package_points
        let package_amount = data[0].package_total_amount
        let final_amount = data[0].package_final_amount
        setState({
          points_id:points_id,
          package_name:package_name,
          points: package_points,
          amount: package_amount,
          mob_number: state.mob_number,
          final_amount: final_amount
        })
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_point'
    let body = {
      password: state.password,
      points_id: state.points_id,
      mob_number: parseInt(state.mob_number),
      points: parseInt(state.points),
      amount: parseInt(state.amount),
      final_amount: parseInt(state.final_amount),
      package_name: state.package_name,
    }
 
    axios.post(full_api, body, { headers: exportValue.headers }).then((res) => {
      toast.configure()
      toast("Point Added Succesfully")     
    })
  }

  return (<>
    <Leftbar title={3} />
    <div className="main-content" id="panel">
      <DashHeader />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-xl-12 order-xl-1">
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">Add Points </h3>
                  </div>
                  <div className="col-4 text-right">
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Select User</label>
                        <input type="text" id="mob_number" name ="mob_number" className="form-control" placeholder="Search by Mobile no." value={state.mob_number}
                          onChange={(event) => handleChangeData(event)}
                        />
                        
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h1>Point Package</h1>

                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Select Package Type</label>
                        <select
                          name='package_name' type="number"  id="package_name"  className="form-control" placeholder="Point Value"
                          onChange={(event) => handleChangeData(event)}
 value={state.package_name}
                        >
                         
                          <option value="first" label="Package One">Package One</option>
                          <option value="second" label="Package Two">Package Two</option>
                          <option value="third" label="Package Three">Package Three</option>
                          <option value="fourth" label="Package Four">Package Four</option>
                          <option value="fifth" label="Package Five">Package Five</option>
                        </select>

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                    
                        <label className="form-control-label" htmlFor="input-username"> Point Value</label>
                        <input type="number"  id="points" name ="points"  className="form-control" placeholder="Point Value" value={state.points} autoComplete="false"
                                                    onChange={(event) => handleChangeData(event)}

                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Amount</label>
                        <input  type="number"  id="amount" name ="amount"  className="form-control" placeholder="Amount Value" value={state.amount} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                        
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Final Amount</label>
                        <input  type="number"  id="amount" name ="final_amount"  className="form-control" placeholder="Amount Value" value={state.final_amount} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                        
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username">Enter Password</label>
                        <input type="Password"  id="password" name ="password"  className="form-control" placeholder="Enter Password For confirmation" value={state.password} autoComplete="off"
                          onChange={(event) => handleChangeData(event)}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={(event) => handleSubmit(event)}>Update Package</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />  </div>
  </>)
}

export default AddPoint