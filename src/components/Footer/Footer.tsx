import React, { FC } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="page-footer teal lighten-2" style={{ marginTop: '5rem' }}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Sharing Of Information</h5>
            <p className="grey-text text-lighten-4">
              We have no control over the privacy practices of websites or applications that we do
              not own..
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Contact Us</h5>
            <ul style={{ display: 'flex' }}>
              <li style={{ marginRight: '10px', cursor: 'pointer' }}>
                <FacebookIcon fontSize="large" />
              </li>
              <li style={{ marginRight: '10px', cursor: 'pointer' }}>
                <TwitterIcon fontSize="large" />
              </li>
              <li style={{ marginRight: '10px', cursor: 'pointer' }}>
                <LinkedInIcon fontSize="large" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2021 Copyright, All Rights Reserved
          <Link className="grey-text text-lighten-4 right" to="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
