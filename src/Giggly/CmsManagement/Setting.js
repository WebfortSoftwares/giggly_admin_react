import React, { Component, useState, useEffect } from 'react';
import DashHeader from '../Header';
import Leftbar from '../LeftSideBar';
import Footer from '../Footer';
import axios from 'axios';
import exportValue from '../../apiconfig';
import { toast } from 'react-toastify';
const Settings = (props) => {

  const [state, setState] = useState({
    username: '', password: '', web_log: "", fevicon_icons: "", company_name: "eagle_technos",
    email: "eagle@gmail.com",
    mobile: 7876787678,
    title: "title",
    fax: "fax",
    address: "jaipur",
    country_name: "india",
    city: "jaipur",
    postal_code: 897654,
    pan_number: 86767879867,
    igst_code: "psd23",
    tax_label: "ty",
    tax: 10,
    google_api_key: "jndjknqsjadnnsj8937bdhs",
    country_code: 91,
    currency: "",
    set_time_zone: "America/Los_Angeles",

  });

  console.log("state is ",state);

  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLogImageSelected, setIsLogImageSelected] = useState(false);

  const fetchSetting = () => {
    let localStorageemail = localStorage.getItem('email')

    let remember = localStorage.getItem('remember')
    if (localStorageemail === undefined || localStorageemail === null) {
      props.history.push('/');
    }
    let full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + '/fetch_general_settings'

    axios.get(full_api, { headers: exportValue.headers }).then((res) => {

      if (res.data.status === "200") {
        let settings = res.data.profile
        setState({
          company_name: settings.company_name, mobile: settings.mobile, fax: settings.fax,
          web_log: settings.web_log, fevicon_icons: settings.fevicon_icons,
          email: settings.email,title: settings.title,
          address: settings.address, country_name: settings.country_name, country_code: settings.country_code, city: settings.city,
          google_api_key: settings.google_api_key, currency: settings.currency, igst_code: settings.igst_code,
          pan_number: settings.pan_number, postal_code: settings.postal_code, set_time_zone: settings.set_time_zone, tax: settings.tax,
          tax_label: settings.tax_label,
        })
      }
    })
  }

  useEffect(() => {
    fetchSetting()
  }, [])

  const handleChangeEvents = (event) => {
    const newdata = { ...state }
    newdata[event.target.name] = event.target.value
    setState(newdata)
  }

  const changeWebLogo = (event) => {
    // const newdata = { ...state }
    // const file = event.target.files[0];
    // setState({web_log: event.target.files[0],loaded: 0,
    // })
    setIsLogImageSelected(true);
    setState({ ...state,web_log: event.target.files });

  }

  const changeFavicon = (event) => {
    // const file1 = event.target.files[0];
    // setState({
    //   fevicon_icons: event.target.files[0],
    //   loaded: 0,
    // })
    setIsImageSelected(true);
    setState({ ...state,fevicon_icons: event.target.files });

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("company_name", state.company_name)
    formData.append("email", state.email)
    formData.append("title", state.title)
    formData.append("mobile", state.mobile)
    formData.append("fax", state.fax)
    formData.append("address", state.address)
    formData.append("country_name", state.country_name)
    formData.append("city", state.city)
    formData.append("postal_code", state.postal_code)
    formData.append("pan_number", state.pan_number)
    formData.append("igst_code", state.igst_code)
    formData.append("tax_label", state.tax_label)
    formData.append("tax", state.tax)
    formData.append("google_api_key", state.google_api_key)
    formData.append("country_code", state.country_code)
    formData.append("set_time_zone", state.set_time_zone)
    formData.append("currency", state.currency)

    
    if (state.web_log != null && isLogImageSelected  == false) {
      formData.append('web_log', state.web_log)
    } else if (isLogImageSelected  == true) {
      console.log("yes got it",state.web_log[0]);
      console.log("yes got it e",state.web_log);
      formData.append("web_log",state.web_log[0],state.web_log)
    }

    if (state.fevicon_icons != null && isImageSelected  == false) {
      formData.append('fevicon_icons', state.fevicon_icons)
    } else if (isImageSelected  == true) {
      formData.append("fevicon_icons",state.fevicon_icons[0],state.fevicon_icons)
    }


    

    // formData.append(
    //   "web_log",
    //   state.web_log,
    // )
    // formData.append(
    //   "fevicon_icons",
    //   state.fevicon_icons
    // )
    exportValue.headers['Content-Type'] = 'multipart/form-data'
    exportValue.headers["type"] = "formData"
    exportValue.headers["usertuid"] = "1589538286148EzSaKgt9UVR4PVGxK1IVI6"

    console.log("b state is ",state)
    const full_api = exportValue.host + '/' + exportValue.version + '/' + exportValue.api + `/general_settings`
    

    axios.post(full_api, formData, { headers: exportValue.headers }).then(res => {
      setIsImageSelected(false)
      setIsLogImageSelected(false)
      if (res.status === 200) {
      toast.configure()
      toast("General Setting Update Succesfully")  
      }
      // if (res.status === 200) {
      //   if (res.data.status === '200') {
      //     alert('update query run')

      //   }
      // }
      fetchSetting();

    }).catch((err) => {
    })
  }

  return (
    <>
      <Leftbar title={9} />
      <div className="main-content" id="panel">
        <DashHeader />

        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-xl-12 order-xl-1">
              <div className="card">
                {/* card header */}
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">Edit Settings</h3>
                    </div>
                    <div className="col-4 text-right">
                    </div>
                  </div>
                </div>
                {/* card body start */}
                <div className="card-body">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h6 className="heading-small text-muted mb-4">System information</h6>
                    <div className="pl-lg-4">

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Company Name</label>
                            <input name="company_name" type="text" id="input-username" className="form-control" placeholder="Company Name" value={state.company_name}
                              onChange={handleChangeEvents}

                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" >Email address</label>
                            <input name="email" type="email" id="input-email" className="form-control" placeholder="Enter Email" value={state.email}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Mobile #</label>
                            <input name="mobile" type="text" id="input-first-name" className="form-control" placeholder="Mobile no." value={state.mobile}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Fax #</label>
                            <input name="fax" type="text" id="input-last-name" className="form-control" placeholder="Fax no" value={state.fax}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">App Title</label>
                            <input name="title" type="text" id="input-first-name" className="form-control" placeholder="app title" value={state.title}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <hr className="my-4" />
                    {/* <!-- Address --> */}
                    <h6 className="heading-small text-muted mb-4">Contact information</h6>
                    <div className="pl-lg-4">

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-control-label">Address</label>
                            <input name="address" id="input-address" className="form-control" placeholder="Home Address" value={state.address} type="text"
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group ">
                            <label>Country</label>
                            <select name="country_code" id="" className="form-control" value={state.country_code}
                              onChange={handleChangeEvents}>
                              <optgroup label="All countries">
                                <option data-countrycode="DZ" value="213">Algeria (+213)</option>
                                <option data-countrycode="AD" value="376">Andorra (+376)</option>
                                <option data-countrycode="AO" value="244">Angola (+244)</option>
                                <option data-countrycode="AI" value="1264">Anguilla (+1264)</option>
                                <option data-countrycode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
                                <option data-countrycode="AR" value="54">Argentina (+54)</option>
                                <option data-countrycode="AM" value="374">Armenia (+374)</option>
                                <option data-countrycode="AW" value="297">Aruba (+297)</option>
                                <option data-countrycode="AU" value="61">Australia (+61)</option>
                                <option data-countrycode="AT" value="43">Austria (+43)</option>
                                <option data-countrycode="AZ" value="994">Azerbaijan (+994)</option>
                                <option data-countrycode="BS" value="1242">Bahamas (+1242)</option>
                                <option data-countrycode="BH" value="973">Bahrain (+973)</option>
                                <option data-countrycode="BD" value="880">Bangladesh (+880)</option>
                                <option data-countrycode="BB" value="1246">Barbados (+1246)</option>
                                <option data-countrycode="BY" value="375">Belarus (+375)</option>
                                <option data-countrycode="BE" value="32">Belgium (+32)</option>
                                <option data-countrycode="BZ" value="501">Belize (+501)</option>
                                <option data-countrycode="BJ" value="229">Benin (+229)</option>
                                <option data-countrycode="BM" value="1441">Bermuda (+1441)</option>
                                <option data-countrycode="BT" value="975">Bhutan (+975)</option>
                                <option data-countrycode="BO" value="591">Bolivia (+591)</option>
                                <option data-countrycode="BA" value="387">Bosnia Herzegovina (+387)</option>
                                <option data-countrycode="BW" value="267">Botswana (+267)</option>
                                <option data-countrycode="BR" value="55">Brazil (+55)</option>
                                <option data-countrycode="BN" value="673">Brunei (+673)</option>
                                <option data-countrycode="BG" value="359">Bulgaria (+359)</option>
                                <option data-countrycode="BF" value="226">Burkina Faso (+226)</option>
                                <option data-countrycode="BI" value="257">Burundi (+257)</option>
                                <option data-countrycode="KH" value="855">Cambodia (+855)</option>
                                <option data-countrycode="CM" value="237">Cameroon (+237)</option>
                                <option data-countrycode="CA" value="1">Canada (+1)</option>
                                <option data-countrycode="CV" value="238">Cape Verde Islands (+238)</option>
                                <option data-countrycode="KY" value="1345">Cayman Islands (+1345)</option>
                                <option data-countrycode="CF" value="236">Central African Republic (+236)</option>
                                <option data-countrycode="CL" value="56">Chile (+56)</option>
                                <option data-countrycode="CN" value="86">China (+86)</option>
                                <option data-countrycode="CO" value="57">Colombia (+57)</option>
                                <option data-countrycode="KM" value="269">Comoros (+269)</option>
                                <option data-countrycode="CG" value="242">Congo (+242)</option>
                                <option data-countrycode="CK" value="682">Cook Islands (+682)</option>
                                <option data-countrycode="CR" value="506">Costa Rica (+506)</option>
                                <option data-countrycode="HR" value="385">Croatia (+385)</option>
                                <option data-countrycode="CU" value="53">Cuba (+53)</option>
                                <option data-countrycode="CY" value="90392">Cyprus North (+90392)</option>
                                <option data-countrycode="CY" value="357">Cyprus South (+357)</option>
                                <option data-countrycode="CZ" value="42">Czech Republic (+42)</option>
                                <option data-countrycode="DK" value="45">Denmark (+45)</option>
                                <option data-countrycode="DJ" value="253">Djibouti (+253)</option>
                                <option data-countrycode="DM" value="1809">Dominica (+1809)</option>
                                <option data-countrycode="DO" value="1809">Dominican Republic (+1809)</option>
                                <option data-countrycode="EC" value="593">Ecuador (+593)</option>
                                <option data-countrycode="EG" value="20">Egypt (+20)</option>
                                <option data-countrycode="SV" value="503">El Salvador (+503)</option>
                                <option data-countrycode="GQ" value="240">Equatorial Guinea (+240)</option>
                                <option data-countrycode="ER" value="291">Eritrea (+291)</option>
                                <option data-countrycode="EE" value="372">Estonia (+372)</option>
                                <option data-countrycode="ET" value="251">Ethiopia (+251)</option>
                                <option data-countrycode="FK" value="500">Falkland Islands (+500)</option>
                                <option data-countrycode="FO" value="298">Faroe Islands (+298)</option>
                                <option data-countrycode="FJ" value="679">Fiji (+679)</option>
                                <option data-countrycode="FI" value="358">Finland (+358)</option>
                                <option data-countrycode="FR" value="33">France (+33)</option>
                                <option data-countrycode="GF" value="594">French Guiana (+594)</option>
                                <option data-countrycode="PF" value="689">French Polynesia (+689)</option>
                                <option data-countrycode="GA" value="241">Gabon (+241)</option>
                                <option data-countrycode="GM" value="220">Gambia (+220)</option>
                                <option data-countrycode="GE" value="7880">Georgia (+7880)</option>
                                <option data-countrycode="DE" value="49">Germany (+49)</option>
                                <option data-countrycode="GH" value="233">Ghana (+233)</option>
                                <option data-countrycode="GI" value="350">Gibraltar (+350)</option>
                                <option data-countrycode="GR" value="30">Greece (+30)</option>
                                <option data-countrycode="GL" value="299">Greenland (+299)</option>
                                <option data-countrycode="GD" value="1473">Grenada (+1473)</option>
                                <option data-countrycode="GP" value="590">Guadeloupe (+590)</option>
                                <option data-countrycode="GU" value="671">Guam (+671)</option>
                                <option data-countrycode="GT" value="502">Guatemala (+502)</option>
                                <option data-countrycode="GN" value="224">Guinea (+224)</option>
                                <option data-countrycode="GW" value="245">Guinea - Bissau (+245)</option>
                                <option data-countrycode="GY" value="592">Guyana (+592)</option>
                                <option data-countrycode="HT" value="509">Haiti (+509)</option>
                                <option data-countrycode="HN" value="504">Honduras (+504)</option>
                                <option data-countrycode="HK" value="852">Hong Kong (+852)</option>
                                <option data-countrycode="HU" value="36">Hungary (+36)</option>
                                <option data-countrycode="IS" value="354">Iceland (+354)</option>
                                <option data-countrycode="IN" value="91">India (+91)</option>
                                <option data-countrycode="ID" value="62">Indonesia (+62)</option>
                                <option data-countrycode="IR" value="98">Iran (+98)</option>
                                <option data-countrycode="IQ" value="964">Iraq (+964)</option>
                                <option data-countrycode="IE" value="353">Ireland (+353)</option>
                                <option data-countrycode="IL" value="972">Israel (+972)</option>
                                <option data-countrycode="IT" value="39">Italy (+39)</option>
                                <option data-countrycode="JM" value="1876">Jamaica (+1876)</option>
                                <option data-countrycode="JP" value="81">Japan (+81)</option>
                                <option data-countrycode="JO" value="962">Jordan (+962)</option>
                                <option data-countrycode="KZ" value="7">Kazakhstan (+7)</option>
                                <option data-countrycode="KE" value="254">Kenya (+254)</option>
                                <option data-countrycode="KI" value="686">Kiribati (+686)</option>
                                <option data-countrycode="KP" value="850">Korea North (+850)</option>
                                <option data-countrycode="KR" value="82">Korea South (+82)</option>
                                <option data-countrycode="KW" value="965">Kuwait (+965)</option>
                                <option data-countrycode="KG" value="996">Kyrgyzstan (+996)</option>
                                <option data-countrycode="LA" value="856">Laos (+856)</option>
                                <option data-countrycode="LV" value="371">Latvia (+371)</option>
                                <option data-countrycode="LB" value="961">Lebanon (+961)</option>
                                <option data-countrycode="LS" value="266">Lesotho (+266)</option>
                                <option data-countrycode="LR" value="231">Liberia (+231)</option>
                                <option data-countrycode="LY" value="218">Libya (+218)</option>
                                <option data-countrycode="LI" value="417">Liechtenstein (+417)</option>
                                <option data-countrycode="LT" value="370">Lithuania (+370)</option>
                                <option data-countrycode="LU" value="352">Luxembourg (+352)</option>
                                <option data-countrycode="MO" value="853">Macao (+853)</option>
                                <option data-countrycode="MK" value="389">Macedonia (+389)</option>
                                <option data-countrycode="MG" value="261">Madagascar (+261)</option>
                                <option data-countrycode="MW" value="265">Malawi (+265)</option>
                                <option data-countrycode="MY" value="60">Malaysia (+60)</option>
                                <option data-countrycode="MV" value="960">Maldives (+960)</option>
                                <option data-countrycode="ML" value="223">Mali (+223)</option>
                                <option data-countrycode="MT" value="356">Malta (+356)</option>
                                <option data-countrycode="MH" value="692">Marshall Islands (+692)</option>
                                <option data-countrycode="MQ" value="596">Martinique (+596)</option>
                                <option data-countrycode="MR" value="222">Mauritania (+222)</option>
                                <option data-countrycode="YT" value="269">Mayotte (+269)</option>
                                <option data-countrycode="MX" value="52">Mexico (+52)</option>
                                <option data-countrycode="FM" value="691">Micronesia (+691)</option>
                                <option data-countrycode="MD" value="373">Moldova (+373)</option>
                                <option data-countrycode="MC" value="377">Monaco (+377)</option>
                                <option data-countrycode="MN" value="976">Mongolia (+976)</option>
                                <option data-countrycode="MS" value="1664">Montserrat (+1664)</option>
                                <option data-countrycode="MA" value="212">Morocco (+212)</option>
                                <option data-countrycode="MZ" value="258">Mozambique (+258)</option>
                                <option data-countrycode="MN" value="95">Myanmar (+95)</option>
                                <option data-countrycode="NA" value="264">Namibia (+264)</option>
                                <option data-countrycode="NR" value="674">Nauru (+674)</option>
                                <option data-countrycode="NP" value="977">Nepal (+977)</option>
                                <option data-countrycode="NL" value="31">Netherlands (+31)</option>
                                <option data-countrycode="NC" value="687">New Caledonia (+687)</option>
                                <option data-countrycode="NZ" value="64">New Zealand (+64)</option>
                                <option data-countrycode="NI" value="505">Nicaragua (+505)</option>
                                <option data-countrycode="NE" value="227">Niger (+227)</option>
                                <option data-countrycode="NG" value="234">Nigeria (+234)</option>
                                <option data-countrycode="NU" value="683">Niue (+683)</option>
                                <option data-countrycode="NF" value="672">Norfolk Islands (+672)</option>
                                <option data-countrycode="NP" value="670">Northern Marianas (+670)</option>
                                <option data-countrycode="NO" value="47">Norway (+47)</option>
                                <option data-countrycode="OM" value="968">Oman (+968)</option>
                                <option data-countrycode="PW" value="680">Palau (+680)</option>
                                <option data-countrycode="PA" value="507">Panama (+507)</option>
                                <option data-countrycode="PG" value="675">Papua New Guinea (+675)</option>
                                <option data-countrycode="PY" value="595">Paraguay (+595)</option>
                                <option data-countrycode="PE" value="51">Peru (+51)</option>
                                <option data-countrycode="PH" value="63">Philippines (+63)</option>
                                <option data-countrycode="PL" value="48">Poland (+48)</option>
                                <option data-countrycode="PT" value="351">Portugal (+351)</option>
                                <option data-countrycode="PR" value="1787">Puerto Rico (+1787)</option>
                                <option data-countrycode="QA" value="974">Qatar (+974)</option>
                                <option data-countrycode="RE" value="262">Reunion (+262)</option>
                                <option data-countrycode="RO" value="40">Romania (+40)</option>
                                <option data-countrycode="RU" value="7">Russia (+7)</option>
                                <option data-countrycode="RW" value="250">Rwanda (+250)</option>
                                <option data-countrycode="SM" value="378">San Marino (+378)</option>
                                <option data-countrycode="ST" value="239">Sao Tome &amp; Principe (+239)</option>
                                <option data-countrycode="SA" value="966">Saudi Arabia (+966)</option>
                                <option data-countrycode="SN" value="221">Senegal (+221)</option>
                                <option data-countrycode="CS" value="381">Serbia (+381)</option>
                                <option data-countrycode="SC" value="248">Seychelles (+248)</option>
                                <option data-countrycode="SL" value="232">Sierra Leone (+232)</option>
                                <option data-countrycode="SG" value="65">Singapore (+65)</option>
                                <option data-countrycode="SK" value="421">Slovak Republic (+421)</option>
                                <option data-countrycode="SI" value="386">Slovenia (+386)</option>
                                <option data-countrycode="SB" value="677">Solomon Islands (+677)</option>
                                <option data-countrycode="SO" value="252">Somalia (+252)</option>
                                <option data-countrycode="ZA" value="27">South Africa (+27)</option>
                                <option data-countrycode="ES" value="34">Spain (+34)</option>
                                <option data-countrycode="LK" value="94">Sri Lanka (+94)</option>
                                <option data-countrycode="SH" value="290">St. Helena (+290)</option>
                                <option data-countrycode="KN" value="1869">St. Kitts (+1869)</option>
                                <option data-countrycode="SC" value="1758">St. Lucia (+1758)</option>
                                <option data-countrycode="SD" value="249">Sudan (+249)</option>
                                <option data-countrycode="SR" value="597">Suriname (+597)</option>
                                <option data-countrycode="SZ" value="268">Swaziland (+268)</option>
                                <option data-countrycode="SE" value="46">Sweden (+46)</option>
                                <option data-countrycode="CH" value="41">Switzerland (+41)</option>
                                <option data-countrycode="SI" value="963">Syria (+963)</option>
                                <option data-countrycode="TW" value="886">Taiwan (+886)</option>
                                <option data-countrycode="TJ" value="7">Tajikstan (+7)</option>
                                <option data-countrycode="TH" value="66">Thailand (+66)</option>
                                <option data-countrycode="TG" value="228">Togo (+228)</option>
                                <option data-countrycode="TO" value="676">Tonga (+676)</option>
                                <option data-countrycode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
                                <option data-countrycode="TN" value="216">Tunisia (+216)</option>
                                <option data-countrycode="TR" value="90">Turkey (+90)</option>
                                <option data-countrycode="TM" value="7">Turkmenistan (+7)</option>
                                <option data-countrycode="TM" value="993">Turkmenistan (+993)</option>
                                <option data-countrycode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
                                <option data-countrycode="TV" value="688">Tuvalu (+688)</option>
                                <option data-countrycode="UG" value="256">Uganda (+256)</option>
                                {/* <!-- <option data-countrycode="GB" value="44">UK (+44)</option> --> */}
                                <option data-countrycode="UA" value="380">Ukraine (+380)</option>
                                <option data-countrycode="AE" value="971">United Arab Emirates (+971)</option>
                                <option data-countrycode="UY" value="598">Uruguay (+598)</option>
                                {/* <!-- <option data-countrycode="US" value="1">USA (+1)</option> --> */}
                                <option data-countrycode="UZ" value="7">Uzbekistan (+7)</option>
                                <option data-countrycode="VU" value="678">Vanuatu (+678)</option>
                                <option data-countrycode="VA" value="379">Vatican City (+379)</option>
                                <option data-countrycode="VE" value="58">Venezuela (+58)</option>
                                <option data-countrycode="VN" value="84">Vietnam (+84)</option>
                                <option data-countrycode="VG" value="84">Virgin Islands - British (+1284)</option>
                                <option data-countrycode="VI" value="84">Virgin Islands - US (+1340)</option>
                                <option data-countrycode="WF" value="681">Wallis &amp; Futuna (+681)</option>
                                <option data-countrycode="YE" value="969">Yemen (North)(+969)</option>
                                <option data-countrycode="YE" value="967">Yemen (South)(+967)</option>
                                <option data-countrycode="ZM" value="260">Zambia (+260)</option>
                                <option data-countrycode="ZW" value="263">Zimbabwe (+263)</option>
                              </optgroup>
                            </select> <span id="alert_defaultcountry"></span> </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">City</label>
                            <input name="city" type="text" id="input-city" className="form-control" placeholder="City" value={state.city}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" >Postal code</label>
                            <input name="postal_code" type="number" id="input-postal-code" className="form-control" placeholder="Postal code"
                              onChange={handleChangeEvents} value={state.postal_code}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    {/* <!-- Description --> */}
                    <h6 className="heading-small text-muted mb-4">Tax Settings</h6>
                    <div className="pl-lg-4">

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">PAN number</label>
                            <input name="pan_number" type="text" id="input-country" className="form-control" placeholder="Country" value={state.pan_number}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">IGST code</label>
                            <input name="igst_code" type="number" id="input-postal-code" className="form-control" placeholder="IGST code"
                              onChange={handleChangeEvents} value={state.igst_code}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">Tax Lable</label>
                            <input name="tax_label" type="number" id="input-postal-code" className="form-control" placeholder="Postal code"
                              onChange={handleChangeEvents} value={state.tax_label}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" >Tax %</label>
                            <input name="tax" type="number" id="input-postal-code" className="form-control" placeholder="in %"
                              onChange={handleChangeEvents} value={state.tax}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <hr className="my-4" /> */}
                    {/* <!-- Description --> */}
                    {/* <h6 className="heading-small text-muted mb-4">Default Background Color</h6>
                    <div className="pl-lg-4">

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">Background Color</label>
                            <input name="pan_number" type="text" id="input-country" className="form-control" placeholder="Country" value={state.pan_number}
                              onChange={handleChangeEvents}
                            />
                          </div>
                        </div>
                      
                      </div>
                    </div> */}

                    <hr className="my-4" />
                    {/* <!-- Description --> */}
                    <h6 className="heading-small text-muted mb-4">System Settings</h6>

                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-control-label">Google API Key</label>
                            <input name="google_api_key" id="input-address" className="form-control" placeholder="Home Address" type="text"
                              onChange={handleChangeEvents} value={state.google_api_key}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">Default Currency Code</label>
                            <select name="currency" id="currencyList" className="form-control"
                              onChange={handleChangeEvents} value={state.currency}
                            >
                              <option value="USD" label="US dollar">USD</option>
                              <option value="EUR" label="Euro">EUR</option>
                              <option value="JPY" label="Japanese yen">JPY</option>
                              <option value="GBP" label="Pound sterling">GBP</option>
                              <option disabled>──────────</option>
                              <option value="AED" label="United Arab Emirates dirham">AED</option>
                              <option value="AFN" label="Afghan afghani">AFN</option>
                              <option value="ALL" label="Albanian lek">ALL</option>
                              <option value="AMD" label="Armenian dram">AMD</option>
                              <option value="ANG" label="Netherlands Antillean guilder">ANG</option>
                              <option value="AOA" label="Angolan kwanza">AOA</option>
                              <option value="ARS" label="Argentine peso">ARS</option>
                              <option value="AUD" label="Australian dollar">AUD</option>
                              <option value="AWG" label="Aruban florin">AWG</option>
                              <option value="AZN" label="Azerbaijani manat">AZN</option>
                              <option value="BAM" label="Bosnia and Herzegovina convertible mark">BAM</option>
                              <option value="BBD" label="Barbadian dollar">BBD</option>
                              <option value="BDT" label="Bangladeshi taka">BDT</option>
                              <option value="BGN" label="Bulgarian lev">BGN</option>
                              <option value="BHD" label="Bahraini dinar">BHD</option>
                              <option value="BIF" label="Burundian franc">BIF</option>
                              <option value="BMD" label="Bermudian dollar">BMD</option>
                              <option value="BND" label="Brunei dollar">BND</option>
                              <option value="BOB" label="Bolivian boliviano">BOB</option>
                              <option value="BRL" label="Brazilian real">BRL</option>
                              <option value="BSD" label="Bahamian dollar">BSD</option>
                              <option value="BTN" label="Bhutanese ngultrum">BTN</option>
                              <option value="BWP" label="Botswana pula">BWP</option>
                              <option value="BYN" label="Belarusian ruble">BYN</option>
                              <option value="BZD" label="Belize dollar">BZD</option>
                              <option value="CAD" label="Canadian dollar">CAD</option>
                              <option value="CDF" label="Congolese franc">CDF</option>
                              <option value="CHF" label="Swiss franc">CHF</option>
                              <option value="CLP" label="Chilean peso">CLP</option>
                              <option value="CNY" label="Chinese yuan">CNY</option>
                              <option value="COP" label="Colombian peso">COP</option>
                              <option value="CRC" label="Costa Rican colón">CRC</option>
                              <option value="CUC" label="Cuban convertible peso">CUC</option>
                              <option value="CUP" label="Cuban peso">CUP</option>
                              <option value="CVE" label="Cape Verdean escudo">CVE</option>
                              <option value="CZK" label="Czech koruna">CZK</option>
                              <option value="DJF" label="Djiboutian franc">DJF</option>
                              <option value="DKK" label="Danish krone">DKK</option>
                              <option value="DOP" label="Dominican peso">DOP</option>
                              <option value="DZD" label="Algerian dinar">DZD</option>
                              <option value="EGP" label="Egyptian pound">EGP</option>
                              <option value="ERN" label="Eritrean nakfa">ERN</option>
                              <option value="ETB" label="Ethiopian birr">ETB</option>
                              <option value="EUR" label="EURO">EUR</option>
                              <option value="FJD" label="Fijian dollar">FJD</option>
                              <option value="FKP" label="Falkland Islands pound">FKP</option>
                              <option value="GBP" label="British pound">GBP</option>
                              <option value="GEL" label="Georgian lari">GEL</option>
                              <option value="GGP" label="Guernsey pound">GGP</option>
                              <option value="GHS" label="Ghanaian cedi">GHS</option>
                              <option value="GIP" label="Gibraltar pound">GIP</option>
                              <option value="GMD" label="Gambian dalasi">GMD</option>
                              <option value="GNF" label="Guinean franc">GNF</option>
                              <option value="GTQ" label="Guatemalan quetzal">GTQ</option>
                              <option value="GYD" label="Guyanese dollar">GYD</option>
                              <option value="HKD" label="Hong Kong dollar">HKD</option>
                              <option value="HNL" label="Honduran lempira">HNL</option>
                              <option value="HKD" label="Hong Kong dollar">HKD</option>
                              <option value="HRK" label="Croatian kuna">HRK</option>
                              <option value="HTG" label="Haitian gourde">HTG</option>
                              <option value="HUF" label="Hungarian forint">HUF</option>
                              <option value="IDR" label="Indonesian rupiah">IDR</option>
                              <option value="ILS" label="Israeli new shekel">ILS</option>
                              <option value="IMP" label="Manx pound">IMP</option>
                              <option value="INR" label="Indian rupee">INR</option>
                              <option value="IQD" label="Iraqi dinar">IQD</option>
                              <option value="IRR" label="Iranian rial">IRR</option>
                              <option value="ISK" label="Icelandic króna">ISK</option>
                              <option value="JEP" label="Jersey pound">JEP</option>
                              <option value="JMD" label="Jamaican dollar">JMD</option>
                              <option value="JOD" label="Jordanian dinar">JOD</option>
                              <option value="JPY" label="Japanese yen">JPY</option>
                              <option value="KES" label="Kenyan shilling">KES</option>
                              <option value="KGS" label="Kyrgyzstani som">KGS</option>
                              <option value="KHR" label="Cambodian riel">KHR</option>
                              <option value="KID" label="Kiribati dollar">KID</option>
                              <option value="KMF" label="Comorian franc">KMF</option>
                              <option value="KPW" label="North Korean won">KPW</option>
                              <option value="KRW" label="South Korean won">KRW</option>
                              <option value="KWD" label="Kuwaiti dinar">KWD</option>
                              <option value="KYD" label="Cayman Islands dollar">KYD</option>
                              <option value="KZT" label="Kazakhstani tenge">KZT</option>
                              <option value="LAK" label="Lao kip">LAK</option>
                              <option value="LBP" label="Lebanese pound">LBP</option>
                              <option value="LKR" label="Sri Lankan rupee">LKR</option>
                              <option value="LRD" label="Liberian dollar">LRD</option>
                              <option value="LSL" label="Lesotho loti">LSL</option>
                              <option value="LYD" label="Libyan dinar">LYD</option>
                              <option value="MAD" label="Moroccan dirham">MAD</option>
                              <option value="MDL" label="Moldovan leu">MDL</option>
                              <option value="MGA" label="Malagasy ariary">MGA</option>
                              <option value="MKD" label="Macedonian denar">MKD</option>
                              <option value="MMK" label="Burmese kyat">MMK</option>
                              <option value="MNT" label="Mongolian tögrög">MNT</option>
                              <option value="MOP" label="Macanese pataca">MOP</option>
                              <option value="MRU" label="Mauritanian ouguiya">MRU</option>
                              <option value="MUR" label="Mauritian rupee">MUR</option>
                              <option value="MVR" label="Maldivian rufiyaa">MVR</option>
                              <option value="MWK" label="Malawian kwacha">MWK</option>
                              <option value="MXN" label="Mexican peso">MXN</option>
                              <option value="MYR" label="Malaysian ringgit">MYR</option>
                              <option value="MZN" label="Mozambican metical">MZN</option>
                              <option value="NAD" label="Namibian dollar">NAD</option>
                              <option value="NGN" label="Nigerian naira">NGN</option>
                              <option value="NIO" label="Nicaraguan córdoba">NIO</option>
                              <option value="NOK" label="Norwegian krone">NOK</option>
                              <option value="NPR" label="Nepalese rupee">NPR</option>
                              <option value="NZD" label="New Zealand dollar">NZD</option>
                              <option value="OMR" label="Omani rial">OMR</option>
                              <option value="PAB" label="Panamanian balboa">PAB</option>
                              <option value="PEN" label="Peruvian sol">PEN</option>
                              <option value="PGK" label="Papua New Guinean kina">PGK</option>
                              <option value="PHP" label="Philippine peso">PHP</option>
                              <option value="PKR" label="Pakistani rupee">PKR</option>
                              <option value="PLN" label="Polish złoty">PLN</option>
                              <option value="PRB" label="Transnistrian ruble">PRB</option>
                              <option value="PYG" label="Paraguayan guaraní">PYG</option>
                              <option value="QAR" label="Qatari riyal">QAR</option>
                              <option value="RON" label="Romanian leu">RON</option>
                              <option value="RON" label="Romanian leu">RON</option>
                              <option value="RSD" label="Serbian dinar">RSD</option>
                              <option value="RUB" label="Russian ruble">RUB</option>
                              <option value="RWF" label="Rwandan franc">RWF</option>
                              <option value="SAR" label="Saudi riyal">SAR</option>
                              <option value="SEK" label="Swedish krona">SEK</option>
                              <option value="SGD" label="Singapore dollar">SGD</option>
                              <option value="SHP" label="Saint Helena pound">SHP</option>
                              <option value="SLL" label="Sierra Leonean leone">SLL</option>
                              <option value="SLS" label="Somaliland shilling">SLS</option>
                              <option value="SOS" label="Somali shilling">SOS</option>
                              <option value="SRD" label="Surinamese dollar">SRD</option>
                              <option value="SSP" label="South Sudanese pound">SSP</option>
                              <option value="STN" label="São Tomé and Príncipe dobra">STN</option>
                              <option value="SYP" label="Syrian pound">SYP</option>
                              <option value="SZL" label="Swazi lilangeni">SZL</option>
                              <option value="THB" label="Thai baht">THB</option>
                              <option value="TJS" label="Tajikistani somoni">TJS</option>
                              <option value="TMT" label="Turkmenistan manat">TMT</option>
                              <option value="TND" label="Tunisian dinar">TND</option>
                              <option value="TOP" label="Tongan paʻanga">TOP</option>
                              <option value="TRY" label="Turkish lira">TRY</option>
                              <option value="TTD" label="Trinidad and Tobago dollar">TTD</option>
                              <option value="TVD" label="Tuvaluan dollar">TVD</option>
                              <option value="TWD" label="New Taiwan dollar">TWD</option>
                              <option value="TZS" label="Tanzanian shilling">TZS</option>
                              <option value="UAH" label="Ukrainian hryvnia">UAH</option>
                              <option value="UGX" label="Ugandan shilling">UGX</option>
                              <option value="USD" label="United States dollar">USD</option>
                              <option value="UYU" label="Uruguayan peso">UYU</option>
                              <option value="UZS" label="Uzbekistani soʻm">UZS</option>
                              <option value="VES" label="Venezuelan bolívar soberano">VES</option>
                              <option value="VND" label="Vietnamese đồng">VND</option>
                              <option value="VUV" label="Vanuatu vatu">VUV</option>
                              <option value="WST" label="Samoan tālā">WST</option>
                              <option value="XAF" label="Central African CFA franc">XAF</option>
                              <option value="XCD" label="Eastern Caribbean dollar">XCD</option>
                              <option value="XOF" label="West African CFA franc">XOF</option>
                              <option value="XPF" label="CFP franc">XPF</option>
                              <option value="ZAR" label="South African rand">ZAR</option>
                              <option value="ZMW" label="Zambian kwacha">ZMW</option>
                              <option value="ZWB" label="Zimbabwean bonds">ZWB</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group ">
                            <label>Set Default Time Zone</label>
                            <span id="set_time_zone" className="alert"></span>
                            <select name="set_time_zone" className="form-control"
                              onChange={handleChangeEvents} value={state.set_time_zone}>
                              <option value="Kwajalein">(GMT -12:00) Eniwetok, Kwajalein</option><option value="Pacific/Midway">(GMT -11:00) Midway Island, Samoa</option><option value="Pacific/Honolulu">(GMT -10:00) Hawaii</option><option value="America/Anchorage">(GMT -9:00) Alaska</option><option value="America/Los_Angeles">(GMT -8:00) Pacific Time (US &amp; Canada)</option><option value="America/Denver">(GMT -7:00) Mountain Time (US &amp; Canada)</option><option value="America/Tegucigalpa">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option><option value="America/New_York">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option><option value="America/Halifax">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option><option value="America/St_Johns">(GMT -3:30) Newfoundland</option><option value="America/Argentina/Buenos_Aires">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option><option value="Atlantic/South_Georgia">(GMT -2:00) Mid-Atlantic</option><option value="Atlantic/Azores">(GMT -1:00 hour) Azores, Cape Verde Islands</option><option value="Europe/Dublin">(GMT) Western Europe Time, London, Lisbon, Casablanca</option><option value="Europe/Belgrade">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option><option value="Europe/Minsk">(GMT +2:00) Kaliningrad, South Africa</option><option value="Asia/Kuwait">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option><option value="Asia/Tehran">(GMT +3:30) Tehran</option><option value="Asia/Muscat">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option><option value="Asia/Kabul">(GMT +4:30) Kabul</option><option value="Asia/Yekaterinburg">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option><option value="Asia/Kolkata" >(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option><option value="Asia/Dhaka">(GMT +6:00) Almaty, Dhaka, Colombo</option><option value="Asia/Krasnoyarsk">(GMT +7:00) Bangkok, Hanoi, Jakarta</option><option value="Asia/Brunei">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option><option value="Asia/Seoul">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option><option value="Australia/Darwin">(GMT +9:30) Adelaide, Darwin</option><option value="Australia/Canberra">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option><option value="Asia/Magadan">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option><option value="Pacific/Fiji">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option></select>
                            <br />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-control-label">Web Logo  <small>.png .jpg only</small></label>
                            <input name="web_logo" type="file" id="input-city"
                              onChange={changeWebLogo}
                              className="form-control" placeholder="City" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="form-control-label">Favicon   <small>.ico .png only</small></label>
                            <input name="fevicon_icons"
                              onChange={changeFavicon}
                              type="file" id="input-city" className="form-control" placeholder="City" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </form>
                </div>
                {/* card body end */}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
export default Settings