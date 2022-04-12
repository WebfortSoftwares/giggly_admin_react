import React, { useEffect, useState } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import CKEditor from 'ckeditor4-react';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Edit_cms = (props) => {

  console.log("props is ",props.location.state);

  const [state, setState] = useState({cms_id:"",cms_name:"", description:""})

  const [editorState,setEditorState] = useState({description:""});

  console.log("state is ",state);

  console.log("editorState is ",editorState);
  
  
 useEffect(() => {
    cmsEditManagement();
  }, [])
  
  const cmsEditManagement = () => {
      
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }

    let d1 = {};
    console.log("props is ",props.location);
    if(props && props.location.state !== undefined){
        d1.cms_id = props.location.state.cms_id
    }


    
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/cms_manage_api';

    console.log("full api is ",d1);
    
    axios.post(full_api,d1, { headers: exportValue.headers }).then((res) => {
      console.log("web value a aa ",res);
    //  console.log("web value ",res.data.web_data[0].web_id);
      //if (res.data.status === "200") {
        setState({...state,cms_id:res.data[0].cms_id,cms_name:res.data[0].cms_name,description:res.data[0].description})
        setEditorState({...state,description:res.data[0].description})
        // setState({...state,web_data:res.data.web_data[0].values,web_id:res.data.web_data[0].web_id})
     // }
    })
  }
function handleChangeData(e) {
    console.log(e);
    const newdata = { ...state }
    newdata[e.target.name] = e.target.value
    setState(newdata)
  }


const handleSubmit = (event) => {
    event.preventDefault();

    if (state.cms_name  == "") {
      toast.configure();
      toast("Please Enter cms_name");
    } else if (state.description  == "") {
      toast.configure();
      toast("Please Enter Description");
    }

//     if (isImageSelected  == true) {

     let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/cms_manage_edit_api'

    // const fd = new FormData();
    // fd.append("cms_id",state.cms_id);
    // fd.append("cms_name",state.cms_name);
    // fd.append("description",state.description);

    let data = {}
    data.cms_id = state.cms_id;
    data.cms_name = state.cms_name;
    data.description = state.description;
    
    console.log("handle submit full api ",full_api);
    console.log("handle body detail ",data);

    axios.post(full_api, data , { headers: exportValue.headers }).then((res) => {
      toast.configure()
     
        toast("Widget Update Succesfully")  
      
       
      props.history.push("/cms_page"); 
     
    })

  // } else {
  //     event.preventDefault();
  //   }
  }

  // const onEditorStateChange = (description) => {
  //   console.log("description is ",description);
  //   const newdata = { ...state }
  //   newdata[description] = description
  //   console.log("new data is ",newdata);
  //   setState(newdata)
  //   //setState({...state,description:editorState });
  // };

  function handle_one(editor) {
    //console.log("editor e is ",e);
    console.log("editor is ",editor);
    // const newdata = { ...state };
    // newdata.description = editor.getData();
     setState(editor);
    //setType(0);
  }

  const onEditorChange = ( evt ) => {
   
    setState( {...state,
      description: evt.editor.getData()
    } );
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
                    <div className="col">
                      <div className="form-group">
                    
                        <label className="form-control-label" htmlFor="input-username"> Cms Name</label>
                        <input type="text"  id="cms_name" name ="cms_name"  className="form-control" placeholder="title" value={state.cms_name} autoComplete="false"
                                                    onChange={(event) => handleChangeData(event)}

                        />
                      </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Description</label>
                        <input  type="text"  id="description" name ="description"  className="form-control" placeholder=" description " value={state.description} autoComplete="false"
                          onChange={(event) => handleChangeData(event)}
                        />
                        
                      </div>
                    </div> */}

                    <div className="col-lg-12">
                    <div className="col">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-username"> Description</label>
                        {/* <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange}
                        />; */}
                        {/* <CKEditor 
                            editor={ClassicEditor}
                            data={editorState.description}
                            onChange={handle_one}
                          /> */}

                   <CKEditor
                    data={editorState.description}
                    onChange={onEditorChange} />
                    {/* <label>
                        Change value:
                        <textarea defaultValue={editorState.description} onChange={handle_one} />
                    </label> */}
                      </div>
                    </div>
                    </div>
                   
                  </div>
                  <button type="submit" className="btn btn-primary">Edit CMS</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />  </div>
  </>)
}

export default Edit_cms