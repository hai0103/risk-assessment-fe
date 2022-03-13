import React from "react";
import {ROUTES} from "../../constants/common";

function Dashboard(props) {
  return (
    <div className="auth-inner">
      <h3 className='text-center font-weight-bold'>Dashboard</h3>
      <div className="mt-1 text-center">
        <img src="app-assets/images/backgrounds/bg-1.jpg" className="w-75"/>
      </div>
      <div className="mt-1 text-center font-weight-bold font-medium-4">
        <a href={ROUTES.HOME}>
          <i className="fal fa-home-lg font-weight-bold"/>
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
