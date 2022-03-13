import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useHomes} from "../context/homeContext";
import {useFormContext, Controller, useForm} from "react-hook-form";

function InformationTechnology() {
  const {register, errors, control, setValue, watch, handleSubmit, getValues} = useForm();
  const {
    step, setStep,
    devices, setDevices,
  } = useHomes()
  const [countDevice, setCountDevice] = useState(devices?.length > 0 ? devices?.length : 1)
  const defaultDevice = {
    DeviceName: '',
    PublicIP: '',
    SSHUserName: '',
    SSHPassword: ''
  }
  const [lstDevice, setLstDevice] = useState(devices?.length > 0 ? devices : [defaultDevice])

  const changeCount = (newValue) => {
    if(newValue*1 === 1) {
      setLstDevice([defaultDevice])
      return
    }
    let result = []
    for (let i = 1; i <= newValue*1; ++i) {
      result.push(defaultDevice)
    }
    setLstDevice(result)
  }

  const save = (data) => {
    setDevices(data.lstDevice || [])
    setStep(2)
  }

  return (
    <form className="IT" onSubmit={handleSubmit(save)} key="it">
      <h3 className='text-center font-weight-bold'>Information technology</h3>

      <div className="form-group">
        <label>Num. of devices</label>
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="1"
          defaultValue={"1"}
          value={countDevice}
          onChange={(e) => {
            setCountDevice(e.target.value)
            changeCount(e.target.value)
          }}
        />
      </div>
      <div className='list-device'>
        {(
          lstDevice?.map((item, index) => {
            const prefixControl = `lstDevice[${index}]`
            return (
              <div className='row w-100' key={prefixControl}>
                <div className="col-2 py-2">
                  <h6 className="pl-1">Device {index + 1}:</h6>
                </div>
                <div className="col-2">
                  <fieldset className="form-group form-group-sm">
                    <label>
                      Device name
                    </label>
                    <article>
                      <Controller
                        name={`${prefixControl}.DeviceName`}
                        control={control}
                        defaultValue={item?.DeviceName || ''}
                        render={(ctrl) => (
                          <input className="form-control form-control-sm"
                                 placeholder="PC-1"
                                 name={`${prefixControl}.DeviceName`}
                                 value={ctrl.value}
                                 onChange={ctrl.onChange}
                          />
                        )}
                      />
                    </article>
                  </fieldset>
                </div>
                <div className="col-4">
                  <fieldset className="form-group form-group-sm">
                    <label>
                      Public IP
                    </label>
                    <article>
                      <Controller
                        name={`${prefixControl}.PublicIP`}
                        control={control}
                        defaultValue={item?.PublicIP || ''}
                        render={(ctrl) => (
                          <input className="form-control form-control-sm"
                                 placeholder="xxx.xxx.xxx.xxx"
                                 name={`${prefixControl}.PublicIP`}
                                 value={ctrl.value}
                                 onChange={ctrl.onChange}
                          />
                        )}
                      />
                    </article>
                  </fieldset>
                </div>
                <div className="col-2">
                  <fieldset className="form-group form-group-sm">
                    <label>
                      SSH user
                    </label>
                    <article>
                      <Controller
                        name={`${prefixControl}.SSHUserName`}
                        control={control}
                        defaultValue={item?.SSHUserName || ''}
                        render={(ctrl) => (
                          <input className="form-control form-control-sm"
                                 placeholder="admin"
                                 name={`${prefixControl}.SSHUserName`}
                                 value={ctrl.value}
                                 onChange={ctrl.onChange}
                          />
                        )}
                      />
                    </article>
                  </fieldset>
                </div>
                <div className="col-2">
                  <fieldset className="form-group form-group-sm">
                    <label>
                      SSH password
                    </label>
                    <article>
                      <Controller
                        name={`${prefixControl}.SSHPassword`}
                        control={control}
                        defaultValue={item?.SSHPassword || ''}
                        render={(ctrl) => (
                          <input className="form-control form-control-sm"
                                 placeholder="123456"
                                 name={`${prefixControl}.SSHPassword`}
                                 value={ctrl.value}
                                 onChange={ctrl.onChange}
                          />
                        )}
                      />
                    </article>
                  </fieldset>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className='text-right pt-1 d-flex justify-content-between'>
        <button
          className="btn btn-outline-primary mr-50"
          onClick={() => {
            setStep(0)
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
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

InformationTechnology.propTypes = {};

InformationTechnology.defaultProps = {};

export default InformationTechnology;
