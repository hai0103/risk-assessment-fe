import React, {useEffect} from "react";
import {ToastProvider} from 'react-toast-notifications';
import "../public/assets/scss/common/core/bootstrap.scss";
import "../public/assets/scss/common/core/bootstrap-extended.scss";
import "../public/assets/scss/common/core/colors.scss";
import "../public/assets/scss/common/font-awesome/css/all.min.css";
import "../public/assets/scss/common/core/plugins/animate/animate.scss";
import "../public/assets/scss/common/style.scss";
import "../public/assets/scss/common/style.scss";
import "../public/assets/css/style.css";
import 'icheck/skins/all.css';

function Default({Component, pageProps}) {
    return (
      <div className="App content-body">
        <ToastProvider autoDismiss autoDismissTimeout={1000} placement="bottom-right">
          <Component {...pageProps} />
        </ToastProvider>
      </div>
    );
}

export default Default
