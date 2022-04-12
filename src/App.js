import React,{Component} from 'react';
import Login from './Giggly/auth/Login';
import Home from './Giggly/Dashboard/Dashboard';
import UserList from './Giggly/Users/UserList';
import VerificationList from './Giggly/Users/VerificationList';
import VerifiedDetail from './Giggly/Users/VerifiedDetail';
import PackageTransaction from './Giggly/PackageTransaction/PackageTransaction';
import CreditPackage from './Giggly/Packages/CreditPackage'
import PremiumPackage from './Giggly/Packages/PremiumPackage';
import widgetList from './Giggly/WidgetManagement/widgetList';
import HashTagDetail from './Giggly/HashTagManagement/HashTagDetail';
import SystemSetting from './Giggly/SystemManagement/SystemSetting';
import AddCreditWidget from './Giggly/WidgetManagement/AddCreditWidget';
import Cms from './Giggly/CmsManagement/Cms.js';
import EditCms from './Giggly/CmsManagement/Edit_cms.js';

import Settings from './Giggly/CmsManagement/Setting';
import Social from './Giggly/CmsManagement/Social';
import PaymentGateway from './Giggly/CmsManagement/paymentGateway';
import Admin from './Giggly/Dashboard/AdminProfile.js'
import Forgot from './Giggly/auth/Forgot'
import Boosts from './Giggly/Packages/Boosts.js'
import AddPoint from './Giggly/PointTransaction/AddPoint'
import SuperLikePackage from './Giggly/Packages/SuperLikePackage';
import CreditTransition from './Giggly/PointTransaction/CreditTransition'
import PackageTransactionDetail from './Giggly/PackageTransaction/PackageTransactionDetail';
import UserProfile from './Giggly/Users/profile';
import UserProfileSample from './Giggly/Users/profileSample';
import User_about_option from './Giggly/Users/User_about_option';
import User_about_option_value from './Giggly/Users/User_about_option_value';
import Logout from './Giggly/auth/Logout'
import PointTransactionDetail from './Giggly/PointTransaction/PointTransitionDetails';
import WebSystemSettings from './Giggly/WebManagement/WebSystemSettings';
import WebHeader from './Giggly/WebManagement/WebHeader';
import WebSubHeader from './Giggly/WebManagement/WebSubHeader';
import WebHomeContent from './Giggly/WebManagement/WebHomeContent';
import webVideoPanel from './Giggly/WebManagement/webVideoPanel';
import WebTestimonial from './Giggly/WebManagement/WebTestimonial';
import WebDownload from './Giggly/WebManagement/WebDownload';
import webTopHeader from './Giggly/WebManagement/webTopHeader';
import webAbout from './Giggly/WebManagement/webAbout';


import 'react-toastify/dist/ReactToastify.css';

// import './App.css';  
import {
  BrowserRouter as Router,
  Route,
  // Link,
  // browserHistory,
  // IndexRoute,
  // Switch
} from 'react-router-dom';
import './App.css';

class App extends Component {
  render(){
  return (
    <Router>
        <Route  path='/home' component={Home} />
        <Route exact path='/' component={Login} />
        <Route exact path='/user_list' component={UserList} />
        <Route exact path='/verification_list' component={VerificationList} />
        <Route exact path='/verified_detail' component={VerifiedDetail} />
        <Route exact path='/package_transaction' component={PackageTransaction} />
        <Route exact path='/credit_package' component={CreditPackage} />
        <Route exact path='/premium_package' component={PremiumPackage} />
        <Route exact path='/boosts' component={Boosts} />
        <Route exact path='/widget_list' component={widgetList} />
        <Route exact path='/add_credit_widget' component={AddCreditWidget} />
        <Route exact path='/add_credit_widget/:id' component={AddCreditWidget} />
        <Route exact path='/hashTagDetail' component={HashTagDetail} />
        <Route exact path='/system_setting' component={SystemSetting} />
        <Route exact path='/cms_page' component={Cms} />
        <Route exact path='/edit_cms/:id' component={EditCms} />
        
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/social' component={Social} />
        <Route exact path='/payment_setting' component={PaymentGateway} />
        <Route exact path='/admin_profile' component={Admin} />
        <Route exact path='/forgot_password' component={Forgot} />
        <Route exact path='/super_like_package' component={SuperLikePackage} />
        <Route exact path='/credit_transaction' component={CreditTransition} />
        <Route exact path='/add_point' component={AddPoint} />
        <Route  path='/package_transaction_detail/:id' component={PackageTransactionDetail} />
        <Route  path='/point_transaction_detail/:id' component={PointTransactionDetail} />
        <Route  path='/profile/:t_uid' component={UserProfile} />
        <Route  path='/profileSample/:t_uid' component={UserProfileSample} />
        <Route path='/logout' component={Logout} />
        <Route path='/user_about_option' component={User_about_option} />
        <Route path='/user_about_option_value' component={User_about_option_value} />
        <Route path='/web_system_settings' component={WebSystemSettings} />
        <Route path='/web_header' component={WebHeader} />
        <Route path='/web_sub_header' component={WebSubHeader} />
        <Route path='/web_home_content' component={WebHomeContent} />
        <Route path='/web_video_panel' component={webVideoPanel} />
        <Route path='/web_testimonial' component={WebTestimonial} />
        <Route path='/web_download' component={WebDownload} />
        <Route path='/web_top_header' component={webTopHeader} />
        <Route path='/web_about' component={webAbout} />
        
        
        
        
    </Router>
    
  );
  }
}

export default App;
