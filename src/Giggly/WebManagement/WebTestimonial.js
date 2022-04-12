import React, { useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';

const WebTestimonial = (props) => {

  const [state, setState] = useState({
    web_data:[],
    title:"",
    description:"",
    image_url:"",
    web_id:"",
  })

  

  useEffect(() => {
    testimonialManagement();
  }, [])

  const stateHandler = (e) => {
      //console.log("e is ",e.target.value);
        const newData = { ...state };
        newData[e.target.name] = e.target.value
        setState(newData)
  }

  const [isImageSelected, setIsImageSelected] = useState(false);

  const fileSelectedHandler = (event) => {
    setIsImageSelected(true);

    setState({
          ...state,
          image_url: event.target.files,
        });
  };

  const testimonialManagement = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_detail_api';
    let d1 = {type:6};
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
      //  setState({...state,web_data:res.data.web_data[0].values})
        setState({...state,web_data:res.data.web_data[0].values,web_id:res.data.web_data[0].web_id})
      // if (res.data.status === "200") {
      // setState({...state,getways:res.data.list});        
      // }
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
    if (isImageSelected  == true) {

    //console.log("stttt is aaa ",state.image_url[0].name);
    const fd = new FormData();
    fd.append("title", state.title);
    fd.append("description", state.description);
    fd.append("type", 6);
     
    fd.append("image_url",state.image_url[0],state.image_url.name)

   // console.log("stttt is ",state);

   // console.log("fd is a ",fd);

    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/web_add_api'
    axios.post(full_api, fd, { headers: exportValue.headers }).then((res) => {
     // console.log("----",res);
      ////setState({getways:res.data.list,gateway_name:"",production_key:"",client_id:""});
      toast.configure()
      toast("Web Testimonial Added Succesfully")  
     // alert("social media update")
     testimonialManagement();
    })
  }
}

const deleteitem = (web_id,containId) => {
   let data = {
        web_id: web_id,
        containId: containId
    }

  const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/web_delete_api`;
  //console.log("data is ",data);
  axios.post(full_api, data, { headers: exportValue.headers }).then((res) => {
     
   // if (res.data.status === "200") {
    testimonialManagement();
   // }
  })

}

//console.log("state is ",state);

  
  return (
    <>
      <Leftbar title={36} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="container-fluid mt-6">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Testimonial Web Management </h3>
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
                            <input type="text" id="input-username" name = "title" className="form-control"   value={state.title} 
                              onChange={(event) => stateHandler(event) }
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" htmlFor="input-username">Description</label>
                            <textarea id="input-username" name="description" className="form-control" value={state.description}  onChange={(event) => stateHandler(event) } >{state.description}</textarea>
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
                            <label className="form-control-label" htmlFor="input-username">Image</label>
                            <input type="file" multiple id="input-username" name="image_url" className="form-control"  value={state.image}
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
                </div>
                <div className="card-body">
                 
                 <div className="row">
                   <div className="col">
                     <div className="card">
          
                      <div className="table-responsive">
                         <table className="table align-items-center table-flush">
                           <thead className="thead-light">
                             <tr>
                              <th scope="col" className="sort" data-sort="name">#</th>
                              <th scope="col" className="sort" data-sort="budget">Image Name</th>                       
                              {/* <th scope="col">Id</th> */}
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col" className="sort" data-sort="completion">Actions</th>
                             </tr>
                     </thead>
                  <tbody >
                     { state.web_data.map((webdata,index ) => ( 
                     <tr key={index}>
                         <td >{index+1}</td>
                         <td>    
                         <img alt= "placeholde" style={{width: "30px",height: "10px !important"}}  src = {`https://gigglyimg.fniix.com/web/${webdata.url}`}  />   
                         </td>
                            
                         <td>    
                             <label className="form-control-label" htmlFor="input-city">{webdata.title}</label>       
                         </td>
                         <td>     
                             <label className="form-control-label" htmlFor="input-city">{webdata.description}</label>     
                         </td>
                         
                         <td> <button className="dropdown-item" onClick={() => deleteitem(state.web_id,webdata.containId)}><i class="fa fa-trash" aria-hidden="true"></i></button>   </td>
                           {/* <button type="button" className="btn" onClick={()=>handleEdit(webdata)}> <i className="fa fa-trash" aria-hidden="true"></i></button>    </td> */}
                      
                     </tr>
                    ))
                  }
                 </tbody>
                            </table>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                         
                             
          
                                           
                             
                             
                             
                           
                            
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

export default WebTestimonial;