import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useForm, Controller} from "react-hook-form";
import {useHomes} from "../context/homeContext";
import _ from 'lodash'
import {confirmation} from "../../../utils/helpers";
import {ROUTES} from "../../../constants/common";
import Utility from "../../../utils/utility";
import {storeData} from "../../../utils/localStorage";
import {HomeApi} from "../../../services/home";
import {useToasts} from "react-toast-notifications";
import {Response} from "../../../utils/common";

function OperationalTechnology() {
  const {addToast} = useToasts();
  const {register, errors, control, setValue, watch, handleSubmit, getValues} = useForm();
  const {
    step, setStep,
    userInfo, setUserInfo,
    devices, setDevices,
    questions, setQuestions
  } = useHomes()
  const [questionData, setQuestionData] = useState([])

  const getListQuestion = async () => {
    try {
      const response = await HomeApi.getListQuestions();
      if (Response.isSuccess(response)) {
        const data = Response.getData(response).Data;
        setQuestionData(data || [])
      } else {
        addToast(Response.getAPIError(response), {appearance: 'error'})
      }
    } catch (error) {
      console.log(error);
    }
    //fake data
    let lstQuestion = require('../../../fixtures/questions.json')
    setQuestionData(lstQuestion || [])
  }

  useEffect(() => {
    getListQuestion().catch(e => console.log(e))
  }, [])

  const save = async (data) => {
    confirmation({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn với thông tin vừa nhập?',
      confirmLabel: 'Xác nhận',
      onConfirm: async ({onClose}) => {
        setQuestions(data.lstQuestions || [])
        setStep(2)

        const payload = {
          userInfo,
          devices,
          questions: data.lstQuestions
        }
        try {
          const response = await HomeApi.save(payload);
          if (Response.isSuccessAPI(response)) {
            storeData('dataSave', payload)

            const responseId = '123456712412'
            Utility.redirect(`${ROUTES.PROCESSING}/${responseId}`)
            onClose()
          } else {
            addToast(Response.getAPIError(response), {appearance: 'error'});
          }
        } catch (error) {
          addToast(Response.getAPIError(error.response), {appearance: 'error'});
        }
      }
    })
  }

  const renderQuestions = () => {
    if(!_.isEmpty(questionData)) {
      let group = 0
      let indexQuestion = 0

      return questionData.map((item, index) => {
        const prefixControl = `lstQuestions[${index}]`
        if(group !== item.group) {
          group = item.group
          indexQuestion = 1
        } else {
          indexQuestion++
        }
        return (
          <div className='row w-100' key={prefixControl}>
            <div className="col-12">
              <h6 className="font-weight-bold m-0 py-1">{group}.{indexQuestion} {item.title}</h6>
            </div>

            <Controller
              name={`${prefixControl}.QuestionId`}
              control={control}
              defaultValue={item.id}
            />
            <Controller
              name={`${prefixControl}.Answer`}
              control={control}
              defaultValue={''}
            />
            <div key={prefixControl + ".answerA"} className="col-12 form-check form-check-inline pl-2">
              <input
                type="radio"
                id={prefixControl + ".answerA"}
                name={prefixControl + ".answerA"}
                className="form-check-input cursor-pointer mr-0"
                checked={watch(`${prefixControl}.Answer`) === 0}
                onChange={() => {
                  setValue(`${prefixControl}.Answer`, 0)
                }}
              />
              <label htmlFor={prefixControl + ".answerA"}
                     className={`form-check-label cursor-pointer pl-50`}>
                A. Yes
              </label>
            </div>
            <div key={prefixControl + ".answerB"} className="col-12 form-check form-check-inline pl-2">
              <input
                type="radio"
                id={prefixControl + ".answerB"}
                name={prefixControl + ".answerB"}
                className="form-check-input cursor-pointer mr-0"
                checked={watch(`${prefixControl}.Answer`) === 1}
                onChange={() => {
                  setValue(`${prefixControl}.Answer`, 1)
                }}
              />
              <label htmlFor={prefixControl + ".answerB"}
                     className={`form-check-label cursor-pointer pl-50`}>
                B. No
              </label>
            </div>
            <div key={prefixControl + ".answerC"} className="col-12 form-check form-check-inline pl-2">
              <input
                type="radio"
                id={prefixControl + ".answerC"}
                name={prefixControl + ".answerC"}
                className="form-check-input cursor-pointer mr-0"
                checked={watch(`${prefixControl}.Answer`) === 2}
                onChange={() => {
                  setValue(`${prefixControl}.Answer`, 2)
                }}
              />
              <label htmlFor={prefixControl + ".answerC"}
                     className={`form-check-label cursor-pointer pl-50`}>
                C. Not Available
              </label>
            </div>
          </div>
        )
      })
    }

  }

  return (
    <form className="OT" onSubmit={handleSubmit(save)} key="ot">
      <h3 className='text-center font-weight-bold'>Operational technology</h3>
      <div className="list-question">
        {
          renderQuestions()
        }
      </div>

      <div className='text-right pt-1 d-flex justify-content-between'>
        <button
          className="btn btn-outline-primary mr-50"
          onClick={() => {
            setStep(1)
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={(watch('lstQuestions') || []).filter(item => !_.isNil(item.Answer) && item.Answer !== '').length < questionData.length}
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

OperationalTechnology.propTypes = {};

OperationalTechnology.defaultProps = {};

export default OperationalTechnology;
