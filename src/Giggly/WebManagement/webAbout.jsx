import React, { useState, useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';


const WebAbout = (props) => {
    const [editorState, setEditorState] = useState()
    const onContentStateChange = (contentState) => {
        setEditorState(contentState);
    };
    const submitData = () =>{
        // contentRaw = convertToRaw(editorState.getCurrentContent());
       // const contentHTML = draftToHtml(contentRaw);
    
//console.log("clicked",editorState);
    } 
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
                                            <h3 className="mb-0">Website About Us </h3>
                                        </div>
                                        <div className="col-4 text-right">
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Editor
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onContentStateChange}
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true }
                                        }}
                                    />
                                    <div className="row"><div className="col-lg-12"><div className="form-group"><button type="button" className="btn btn-success" onClick={()=>submitData()}>Save</button></div></div></div>
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
export default WebAbout;