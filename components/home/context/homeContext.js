import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const HomeContext = createContext({});

const HomeProvider = ({children, ...props}) => {
  const [step, setStep] = useState(0)
  const [userInfo, setUserInfo] = useState({});
  const [devices, setDevices] = useState([]);
  const [questions, setQuestions] = useState([]);

  return (
    <HomeContext.Provider
      value={{
        step, setStep,
        userInfo, setUserInfo,
        devices, setDevices,
        questions, setQuestions
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

HomeProvider.propTypes = {
  children: PropTypes.any,
};

export default HomeProvider;

export function useHomes() {
  return React.useContext(HomeContext);
}
