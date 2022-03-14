import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DataTable from "../../utils/components/dataTable";
import Utility from "../../utils/utility";
import {ROUTES} from "../../constants/common";
import {HomeApi} from "../../services/home";
import {useToasts} from "react-toast-notifications";
import {Response} from "../../utils/common";
import {isEmpty} from "lodash";

function ProcessingList(props) {
  const {addToast} = useToasts();
  const [lstProcessing, setLstProcessing] = useState([])
  const [isAllDone, setIsAllDone] = useState(false)

  useEffect(() => {
    getData().catch(e => console.log(e))
  }, [])

  let intervalId = setInterval(() => {
    getData().catch(e => console.log(e))
  }, 5000)

  const getData = async () => {
    const payload = {
      userId: props.userId
    }
    try {
      const response = (await HomeApi.getListProcessing(payload)).data;
      if (Response.isSuccess(response)) {
        console.log(response);
        const data = Response.getData(response);
        console.log(data);
        setLstProcessing(data || [])
        if(!isEmpty(data)){
          let isDone = !data.some(process => process?.status?.toLowerCase() !== 'done') || false
          if(isDone){
            clearInterval(intervalId)
            setIsAllDone(isDone)
          }
        }
      } else {
        addToast(Response.getAPIError(response), {appearance: 'error'})
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changeStatus = async (entity, status) => {
    const payload = {
      deviceId: entity.deviceId,
      status
    }

    try {
      const response = (await HomeApi.setStatusProcessing(payload)).data;
      if (Response.isSuccess(response)) {
        addToast('Cập nhật trạng thái thành công', {appearance: 'success'})
        getData().catch(e => console.log(e))
      } else {
        addToast(Response.getAPIError(response), {appearance: 'error'});
      }
    } catch (error) {
      addToast(Response.getErrorMessage(error), {appearance: 'error'});
    }
  }

  const actionButton = (item) => {
    return (
      <div className='d-flex'>
        <a className={`p-50`}
           title='Start'
           onClick={() => {
             changeStatus(item, 0).catch(e => console.log(e))
           }}>
          <i className="fal fa-play"/>
        </a>
        <a className={`p-50`}
           title='Stop'
           onClick={() => {
             changeStatus(item, 1).catch(e => console.log(e))
           }}>
          <i className="fal fa-stop"/>
        </a>
        <a className={`p-50`}
           title='Resume'
           onClick={() => {
             changeStatus(item, 2).catch(e => console.log(e))
           }}>
          <i className="fal fa-redo"/>
        </a>
      </div>
    )
  };

  const dataTable = () => {
    const columns = [
      {
        Header: 'IP address',
        accessor: 'publicIP',
        className: 'td-6 text-truncate r',
        headerClassName: 'td-6 text-truncate r',
      },
      {
        Header: 'Black/White Box',
        accessor: 'blackOrWhiteBox',
        className: 'td-9 text-truncate',
        headerClassName: 'td-9 text-truncate',
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'td-6 text-truncate',
        headerClassName: 'td-6 text-truncate',
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        className: 'td-4 text-truncate',
        headerClassName: 'td-4 text-truncate',
      },
      {
        Header: "",
        accessor: 'action',
        className: 'td-4 a text-center',
        headerClassName: 'td-4 text-truncate text-center',
        Cell: ({row}) => actionButton(row.original)
      },
    ];

    return {columns, data: lstProcessing};
  };

  return (
    <div className="auth-inner">
      <h3 className='text-center font-weight-bold'>Processing</h3>
      <DataTable {...dataTable()} />


      <div className='text-right pt-1'>
        <button
          className="btn btn-primary"
          disabled={!isAllDone}
          onClick={(e) => {
            Utility.redirect(`${ROUTES.DASHBOARD}`)
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

ProcessingList.propTypes = {
  userId: PropTypes.string
};

ProcessingList.defaultProps = {};

export default ProcessingList;
