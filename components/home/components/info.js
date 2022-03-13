import React from "react";
import PropTypes from "prop-types";
import {useHomes} from "../context/homeContext";
import {Controller, useForm} from "react-hook-form";

function Info() {
  const {register, errors, control, setValue, watch, handleSubmit, getValues} = useForm();
  const {
    step, setStep,
    userInfo, setUserInfo,
  } = useHomes()

  const save = (data) => {
    console.log('data info', data)
    setUserInfo(data)
    setStep(1)
  }

  return (
    <form className="auth-inner" onSubmit={handleSubmit(save)} key="info">
      <h3 className='text-center font-weight-bold'>Risk Assessment webservice</h3>

      <fieldset className="form-group form-group-sm">
        <label>
          Full Name <span className="danger">*</span>
        </label>
        <article>
          <Controller
            name={`FullName`}
            control={control}
            defaultValue={''}
            rules={{
              required: true
            }}
            render={(ctrl) => (
              <input className="form-control form-control-sm"
                     placeholder="Do Hai Son"
                     type="text"
                     name="FullName"
                     value={ctrl.value}
                     onChange={ctrl.onChange}
              />
            )}
          />
        </article>
      </fieldset>
      <fieldset className="form-group form-group-sm">
        <label>
          Business Name <span className="danger">*</span>
        </label>
        <article>
          <Controller
            name={`BusinessName`}
            control={control}
            defaultValue={''}
            rules={{
              required: true
            }}
            render={(ctrl) => (
              <input className="form-control form-control-sm"
                     placeholder="AVITECH UET"
                     type="text"
                     name="BusinessName"
                     value={ctrl.value}
                     onChange={ctrl.onChange}
              />
            )}
          />
        </article>
      </fieldset>
      <fieldset className="form-group form-group-sm">
        <label>
          Email <span className="danger">*</span>
        </label>
        <article>
          <Controller
            name={`Email`}
            control={control}
            defaultValue={''}
            rules={{
              required: true
            }}
            render={(ctrl) => (
              <input className="form-control form-control-sm"
                     placeholder="Enter Email"
                     type="text"
                     name="Email"
                     value={ctrl.value}
                     onChange={ctrl.onChange}
              />
            )}
          />
        </article>
      </fieldset>

      <div className='text-right pt-1'>
        <button
          className="btn btn-primary"
          disabled={!watch('FullName') || !watch('BusinessName') || !watch('Email')}
          type="submit"
          onClick={(e) => {
            handleSubmit(save)
          }}
        >
          Next
        </button>
      </div>
    </form>
  );
}

Info.propTypes = {};

Info.defaultProps = {};

export default Info;
