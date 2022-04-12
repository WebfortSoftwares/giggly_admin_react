import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

const AddCreditWidget = (props) => {

  console.log("props is ",props.location.state);

  const [state, setState] = useState({
    action_id:"", widget_type: '1',title:'', description: '',icon_url:null
  })

  console.log("state is ",state);

  const [isImageSelected, setIsImageSelected] = useState(false);
  
  
 useEffect(() => {
   if(props && props.location.state !== undefined){
  let data = {
    action_id: props.location.state.action_id
}

const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/credit_action_list_api`;
axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
   
  if (res.data.status === "200") {
      let credit_widget_list =  res.data.credit_action_detail;
     console.log("credit value is ",credit_widget_list[0]);
     setState(credit_widget_list[0])
    }
  })
   }
  }, [])
  

function handleChangeData(e) {
    console.log(e);
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }

  // const stateHandler = (key, value) => {
  //   state[key] = value;
  //   setState({ ...state });
  // }

const fileSelectedHandler = (event) => {
    setIsImageSelected(true);
    setState({
      ...state,
      icon_url: event.target.files,
    });
};

  console.log("first");



//   const getpackage = () => {
//     console.log("second");
//     let localStorageemail = localStorage.getItem('email')

//     let remember = localStorage.getItem('remember')
//     if (localStorageemail === undefined || localStorageemail === null) {
//       props.history.push('/');
//     }
//     let package_name = state.package_name

//     let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/fetch_point_package/${package_name}`
//     axios.get(full_api, { headers: exportValue.headers }).then((res) => {
//       if (res.data.status === "200") {
//         let data = res.data.profile
//         let points_id = data[0].points_id
//         let package_name = data[0].package_name
//         let package_points = data[0].package_points
//         let package_amount = data[0].package_total_amount
//         setState({
//           points_id:points_id,
//           package_name:package_name,
//           points: package_points,
//           amount: package_amount,
//           mob_number: state.mob_number
//         })
//       }
//     })
//   }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.title  == "") {
      toast.configure();
      toast("Please Enter Title");
    } else if (state.description  == "") {
      toast.configure();
      toast("Please Enter Description");
    }

    if (isImageSelected  == true) {

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/add_widget'

    const fd = new FormData();
    fd.append("action_id",state.action_id);
    fd.append("widget_type",state.widget_type);
    fd.append("description",state.description);
    fd.append("title",state.title);
    fd.append("icon",state.icon_url[0],state.icon_url.name)
    

    
 
    console.log("handle submit full api ",full_api);
    console.log("handle body detail ",fd);

    axios.post(full_api, fd , { headers: exportValue.headers }).then((res) => {
      toast.configure()
      if(state.action_id === ""){
        toast("Widget Added Succesfully")  
      } else {
        toast("Widget Update Succesfully")  
      }
       
      props.history.push("/widget_list"); 
     
    })

  } else {
      event.preventDefault();
    }
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
                    <h3 className="mb-0">Add Credit Widget </h3>
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
                         <label className="form-control-label" htmlFor="input-username">Please select your Packages</label> <br />
                       
                           <input type="radio" id="widget_type" name="widget_type" value="1" checked={state.widget_type == '1' } onChange={(event) => handleChangeData(event)} />
                           <label for="age1" className="right"> Credit Package </label>

                           <input type="radio" id="widget_type" name="widget_type" value="2" checked={state.widget_type === "2"} onChange={(event) => handleChangeData(event)} />
                           <label for="age2" className="right"> Premium Package </label> 

                           <input type="radio" id="widget_type" name="widget_type" value="3" checked={state.widget_type === "3"} onChange={(event) => handleChangeData(event)} />
                           <label for="age2" className="right"> Boost Package </label> 

                           <input type="radio" id="widget_type" name="widget_type" value="4" checked={state.widget_type === "4"} onChange={(event) => handleChangeData(event)} />
                           <label for="age2" className="right"> Super Likes Package </label> 
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                    
                        <label className="form-control-label" htmlFor="input-username"> Title</label>
                        <input type="text"  id="title" name ="title"  className="form-control" placeholder="title" value={state.title} autoComplete="false"
                                                    onChange={(event) => handleChangeData(event)}

                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Description</label>
                        <input  type="text"  id="description" name ="description"  className="form-control" placeholder=" description " value={state.description} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                        
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                          <label className="form-control-label" htmlFor="attribute_label">Choose Icon : Size(50px X 50px)</label>
                          <input type="file" multiple className="form-control" name = "icon_url" id = "icon_url" placeholder="Select Image" onChange={(event) => fileSelectedHandler(event)}
                                required />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Add Widget</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />  </div>
  </>)
}

export default AddCreditWidget