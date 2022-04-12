import React, {useState,useEffect} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import exportValue from '../../apiconfig';
import axios from 'axios';

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const HashTagDetail = () => {
    
         const [state, setState] = useState({
            tags: [
               
             ],
            suggestions: [
                // { id: 'USA', text: 'USA' },
                // { id: 'Germany', text: 'Germany' },
                // { id: 'Austria', text: 'Austria' },
                // { id: 'Costa Rica', text: 'Costa Rica' },
                // { id: 'Sri Lanka', text: 'Sri Lanka' },
                // { id: 'Thailand', text: 'Thailand' }
             ]
        });

         console.log("state is ",state);
        // handleDelete = handleDelete();
        // handleAddition = handleAddition();
        // handleDrag = handleDrag();
        

       const getDetails = () => {

        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/hash_tag_list_api`
        axios.get(full_api, { headers: exportValue.headers }).then(async (res) => {
            console.log(" res is aaa ",res);
          //let hashTag_detail = {id:res.data[0].id,text:res.data[0].text}
        //   let postDatas = await res.data.map((val) => { let vik = {id:val.id,text:val.text} ; return vik  })
        //  console.log("post data is ",postDatas);
        //  handleChangeData(postDatas)
        setState({tags:res.data})
        })
       }

    useEffect(() => {
        getDetails()
      },[]);
    

//    function handleChangeData(e) {
//        console.log("this is e ",e);
//         const newdata = { ...state }
//         newdata[e.tags] = e.tags
//         console.log("newdata is ",newdata);
//         //setState({tags: newdata})
//         setState(newdata)
//    }

   const handleDelete = (i) => {
        const { tags } = state;
        console.log(" tag is aaa",tags[i]);
        let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/hash_tag_delete_api`
        let body = {id:tags[i].id}
        axios.post(full_api,body, { headers: exportValue.headers }).then((res) => {
            console.log(" res is ",res);
            // setState({
            //     tags: tags.filter((tag, index) => index !== i),
            // });
            getDetails();
        })
        
    }

   const handleAddition = (tag) => {
       let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/add_hash_tag`
       let body = tag;
       axios.post(full_api, body, { headers: exportValue.headers }).then((res) => {
         console.log(" res is ",res);
         //setState(state => ({ tags: [...state.tags, tag],suggestions: [...state.suggestions] }));
         getDetails();
       })
    }

   const handleDrag = (tag, currPos, newPos) => {
        const tags = [...state,state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setState({ tags: newTags });
    }

    const { tags, suggestions } = state;

    return( 
        <>
    <Leftbar title={12} />
      <div className="main-content" id="panel">
        <DashHeader />
        <div className="header bg-primary pb-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 order-xl-1">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">Hash Tag </h3>
                      </div>
                      {/* <div className="col-4 text-right">

                      </div> */}
                    </div>
                  </div>
                  <div className="card-body">
                        <ReactTags tags={tags}
                            suggestions={suggestions}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            delimiters={delimiters} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
          
                
          

           
        </>
    )
    
    
};

export default HashTagDetail;