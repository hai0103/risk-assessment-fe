import React from "react";
import PropTypes from "prop-types";
import {useHomes} from "./context/homeContext";
import Info from "./components/info";
import InformationTechnology from "./components/informationTechnology";
import {useForm, FormProvider} from "react-hook-form";
import OperationalTechnology from "./components/operationalTechnology";

function Home() {
  const methods = useForm()
  const {register, errors, handleSubmit, setValue, setError, getValues, clearErrors, control, watch} = methods;
  const {
    step, setStep,
  } = useHomes()

  return (
    // <FormProvider {...methods}>
    //   <form>
    <>
      {step === 0 && <Info />}
      {step === 1 && <InformationTechnology />}
      {step === 2 && <OperationalTechnology />}
    </>
    //     </form>
    // </FormProvider>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
