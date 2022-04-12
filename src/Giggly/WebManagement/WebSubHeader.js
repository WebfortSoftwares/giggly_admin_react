import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebSubHeader = (props) => {

  const [state, setState] = useState({
    webdata:[],
    title_zero:"",
    description_zero:"",
    image_url_zero:"",
    containId_zero:"",
    title_one:"",
    description_one:"",
    image_url_one:"",
    containId_one:"",
    title_two:"",
    description_two:"",
    image_url_two:"",
    containId_two:"",
    web_id:""
  })

  //console.log("state is ",state);

  useEffect(() => {
    WebSubHeaderManagement();
  }, [])

  const [isImageSelected, setIsImageSelected] = useState(false);

  const stateHandler = (e) => {
     // console.log("e is ",e.target.value);
        const newData = { ...state };
        newData[e.target.name] = e.target.value
        setState(newData)
  }

  const fileSelectedHandler = (event) => {
    setIsImageSelected(true);
   // console.log("files is ",event.target.name);
    if(event.target.name == "image_url_zero"){
      setState({
        ...state,
        image_url_zero: event.target.files,
      });
    } else if(event.target.name == "image_url_one"){
      setState({
        ...state,
        image_url_one: event.target.files,
      });
    } else if(event.target.name == "image_url_two"){
      setState({
        ...state,
        image_url_two: event.target.files,
      });
    }

    
  };


  const WebSubHeaderManagement = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
    let d1 = {type : 3};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {

      //if (res.data.status === "200") {
        setState({...state,title_zero:res.data.web_data[0].values[0].title,description_zero:res.data.web_data[0].values[0].description,image_url_zero:res.data.web_data[0].values[0].url,containId_zero:res.data.web_data[0].values[0].containId,web_id:res.data.web_data[0].web_id, title_one:res.data.web_data[0].values[1].title,description_one:res.data.web_data[0].values[1].description,image_url_one:res.data.web_data[0].values[1].url,containId_one:res.data.web_data[0].values[1].containId,title_two:res.data.web_data[0].values[2].title,description_two:res.data.web_data[0].values[2].description,image_url_two:res.data.web_data[0].values[2].url,containId_two:res.data.web_data[0].values[2].containId})

    //  }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = {
    //   title:state.title,
    //   description:state.description,
    //   image:state.image,
    //   status:state.status,
    //   type:2,

    // }
  //  if (isImageSelected  == true) {

      

    //console.log("stttt is aaa ",state.image_url[0].name);
    const fd = new FormData();
      fd.append("title", state.title_zero);
      fd.append("description", state.description_zero);
      fd.append("type", 3);
      fd.append("web_id", state.web_id);
      fd.append("containId",state.containId_zero)
     
    //  fd.append("image_url",state.image_url[0],state.image_url_zero)

      if (state.image_url_zero != null && isImageSelected  == false) {
        fd.append('image_url', state.image_url_zero)
      }
      else if (isImageSelected  == true) {
        fd.append("image_url",state.image_url_zero[0],state.image_url_zero)
      }
     

   // console.log("fd is a ",fd);

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_update_api'
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
     // console.log("----",res);
      ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      toast.configure()
      toast("Web Sub Header Update Succesfully") 
      setIsImageSelected(false);
      WebSubHeaderManagement()
     // alert("social media update")
    })
 // }
}

const handleSubmit_one = (event) => {
  event.preventDefault();
  // const data = {
  //   title:state.title,
  //   description:state.description,
  //   image:state.image,
  //   status:state.status,
  //   type:2,

  // }
 // if (isImageSelected  == true) {

    

  //console.log("stttt is aaa ",state.image_url[0].name);
  const fd = new FormData();
    fd.append("title", state.title_one);
    fd.append("description", state.description_one);
    fd.append("type", 3);
    fd.append("web_id", state.web_id);
    fd.append("containId",state.containId_one)
   // fd.append("image_url",state.image_url[0],state.image_url_one)
    

    if (state.image_url_one != null && isImageSelected  == false) {
      fd.append('image_url', state.image_url_one)
    }
    else if (isImageSelected  == true) {
      fd.append("image_url",state.image_url_one[0],state.image_url_one)
    }
    
  //console.log("stttt is ",state);

 // console.log("fd is a ",fd);

  let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_update_api'
  axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
   // console.log("----",res);
    ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
    toast.configure()
    toast("Web Sub Header Update Succesfully") 
    setIsImageSelected(false);
    WebSubHeaderManagement();
   // alert("social media update")
  })
//}
}

const handleSubmit_two = (event) => {
  event.preventDefault();
  // const data = {
  //   title:state.title,
  //   description:state.description,
  //   image:state.image,
  //   status:state.status,
  //   type:2,

  // }
 // if (isImageSelected  == true) {

    

  //console.log("stttt is aaa ",state.image_url[0].name);
  const fd = new FormData();
  fd.append("title", state.title_two);
    fd.append("description", state.description_two);
    fd.append("type", 3);
    fd.append("web_id", state.web_id);
    fd.append("containId",state.containId_two)
  //  fd.append("image_url",state.image_url[0],state.image_url_two)
    

    if (state.image_url_two != null && isImageSelected  == false) {
      fd.append('image_url', state.image_url_two)
    }
    else if (isImageSelected  == true) {
      fd.append("image_url",state.image_url_two[0],state.image_url_two)
    }

  //  console.log("stttt is ",state);

  //  console.log("fd is a ",fd);

  let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_update_api'
  axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
   // console.log("----",res);
    ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
    toast.configure()
    toast("Web Sub Header Update Succesfully") 
    setIsImageSelected(false);
    WebSubHeaderManagement();
   // alert("social media update")
  })
//}
}
  // const handleEdit = (data) => {
         
  // }


  
  return (
    <>
      <Leftbar title={33} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0"> Sub Header Web Management </h3>
                    </div>
                    <div className="col-4 text-right">
                    </div>
                  </div>
                </div>
                <div className="card-body">
                <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title_zero" className="form-control"   value={state.title_zero} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                       </div>
                      </div>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Description</label>
                            <textarea id="input-username" name="description_zero" className="form-control" value={state.description_zero}  onChange={(event) => stateHandler(event) } >{state.description_zero}</textarea>
                            {/* <input type="text" id="input-username" name="description" className="form-control"   value={state.description}
                              onChange={(event) => stateHandler(event) }
                            /> */}
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <img src={`https://gigglyimg.fniix.com/web/${state.image_url_zero}`} alt="img" className="form-control" style={{width:"42%",height:"20%"}} ></img><br />
                            <label className="form-control-label" htmlFor="input-username">Choose Image: Size (450px X 450px)</label>
                            <input type="file" multiple id="input-username" name="image_url_zero" className="form-control" 
                              onChange={(event) => fileSelectedHandler(event) }
                            />
                          </div>
                        </div>

                       
                        

                      </div>
                    </div>
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmit(event)}>Submit</button>
                          </div>
                        </div>

                      </div>
                    </div>                    
                   
                  </form>
                  <br/><br/><br/><br/>
                  <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title_one" className="form-control"   value={state.title_one} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                        </div>
                        </div>
                        <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Description</label>
                            <textarea id="input-username" name="description_one" className="form-control" value={state.description_one}  onChange={(event) => stateHandler(event) } >{state.description_one}</textarea>
                            {/* <input type="text" id="input-username" name="description" className="form-control"   value={state.description}
                              onChange={(event) => stateHandler(event) }
                            /> */}
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                          <img src={`https://gigglyimg.fniix.com/web/${state.image_url_one}`} alt="img" className="form-control" style={{width:"42%",height:"20%"}} ></img><br />
                            <label className="form-control-label" htmlFor="input-username">Choose Image: Size (450px X 450px)</label>
                            <input type="file" multiple id="input-username" name="image_url_one" className="form-control"  
                              onChange={(event) => fileSelectedHandler(event) }
                            />
                          </div>
                        </div>

                       
                        

                      </div>
                    </div>
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmit_one(event)}>Submit</button>
                          </div>
                        </div>

                      </div>
                    </div>                    
                   
                  </form>
                  <br/><br/><br/><br/>
                  <form >
                    {/* <h6 className="heading-small text-muted mb-4">Name</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Title</label>
                            <input type="text" id="input-username" name = "title_two" className="form-control"   value={state.title_two} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                        </div>
                        </div>

                        <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Description</label>
                            <textarea id="input-username" name="description_two" className="form-control" value={state.description_two}  onChange={(event) => stateHandler(event) } >{state.description_two}</textarea>
                            {/* <input type="text" id="input-username" name="description" className="form-control"   value={state.description}
                              onChange={(event) => stateHandler(event) }
                            /> */}
                          </div>
                        </div>

                      </div>
                    </div>
                    {/* <h6 className="heading-small text-muted mb-4">Contact no.</h6> */}
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                          <img src={`https://gigglyimg.fniix.com/web/${state.image_url_two}`} alt="img" className="form-control" style={{width:"42%",height:"20%"}} ></img><br />
                            <label className="form-control-label" htmlFor="input-username">Choose Image: Size (450px X 450px)</label>
                            <input type="file" multiple id="input-username" name="image_url_two" className="form-control"  
                              onChange={(event) => fileSelectedHandler(event) }
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                          <button type="submit" className='btn btn-success' onClick={(event) => handleSubmit_two(event)}>Submit</button>
                          </div>
                        </div>

                      </div>
                    </div>                    
                   
                  </form>
                </div>
             
    
                </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default WebSubHeader;