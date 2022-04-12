import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class Footer extends Component {
    constructor(props) {        
    super(props);
    this.state = { username: '', password: '' };
    // handle initialization activities
    }
    render() {
    return (
        <footer className="footer pt-0">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6">
            <div className="copyright text-center  text-lg-left  text-muted">
              &copy; 2020 <Link to="https://www.Giggly.com" className="font-weight-bold ml-1" target="_blank" rel="noopener noreferrer">Giggly</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link to="https://www.eagletechnosys.com" className="nav-link" target="_blank" rel="noopener noreferrer">Powered By Eagle Technosys</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </footer>
    );
    }
    }
    export default Footer;