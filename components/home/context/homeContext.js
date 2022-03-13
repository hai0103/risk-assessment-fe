import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const HomeContext = createContext({});

const HomeProvider = ({children, ...props}) => {
  const [step, setStep] = useState(0)
  const [userInfo, setUserInfo] = useState({});
  const [devices, setDevices] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log('>> userInfo', userInfo)
    console.log('>> devices', devices)
    console.log('>> questions', questions)
  }, [userInfo, devices, questions, JSON.stringify(userInfo), JSON.stringify(devices), JSON.stringify(questions)])

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
