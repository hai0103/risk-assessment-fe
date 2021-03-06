import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DataTable from "../../utils/components/dataTable";
import Utility from "../../utils/utility";
import {ROUTES} from "../../constants/common";
import {HomeApi} from "../../services/home";
import fakeData from "../../fixtures/processing.json";
import {useToasts} from "react-toast-notifications";
import {Response} from "../../utils/common";

function ProcessingList(props) {
  const {addToast} = useToasts();
  const [lstProcessing, setLstProcessing] = useState([])

  useEffect(() => {
    getData().catch(e => console.log(e))
  }, [])

  const getData = async () => {
    const payload = {
      userId: props.userId
    }
    try {
      const response = await HomeApi.getListProcessing(payload);
      if (Response.isSuccess(response)) {
        const data = Response.getData(response).Data;
        setLstProcessing(data || [])
      } else {
        addToast(Response.getAPIError(response), {appearance: 'error'})
      }
    } catch (error) {
      console.log(error);
    }

    //fake data
    let fakeData = require('../../fixtures/processing.json')
    setLstProcessing(fakeData || [])
  }

  const changeStatus = async (entity, status) => {
    const payload = {
      deviceId: entity.id,
      status
    }

    try {
      const response = await HomeApi.setStatusProcessing(payload);
      if (Response.isSuccessAPI(response)) {
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
        accessor: 'IP',
        className: 'td-6 text-truncate r',
        headerClassName: 'td-6 text-truncate r',
      },
      {
        Header: 'Black/White Box',
        accessor: 'credential',
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
        Header: ' ',
        accessor: 'stop',
        className: 'td-4 text-truncate',
        headerClassName: 'td-4 text-truncate',
        Cell: ({value}) => value ? 'Stop' : ''
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
