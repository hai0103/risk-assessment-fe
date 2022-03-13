import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useExpanded, usePagination, useRowSelect, useTable} from "react-table";
import {isEmpty} from "lodash"
import TableScrollbar from "../tableScrollbar";

function DataTable(props) {
    const defaultCriteria = {
        pageSize: props.itemPerPage || 10,
        pageNumber: props.currentPage
    };

    const columns = props.columns;
    const [data, setData] = useState(props.data || []);
    const [controlledPageCount, setControlledPageCount] = useState(0);
    const [totalItem, setTotalItem] = useState(0);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        canPreviousPage,
        canNextPage,
        state,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
        allColumns,
        selectedFlatRows,
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: props.itemPerPage},
            manualPagination: !props.isLocal,
            pageCount: controlledPageCount,
            autoResetExpanded: false
        },
        usePagination,
        useRowSelect,
    );


    const isRemotePaging = () => {
        return !props.isLocal;
    }

    const buildParams = () => {
        const params = {
            pageSize,
            pageNumber: pageIndex,
            ...props.params
        };

        return params;
    };

    const renderStyle = (column) => {
        const styles = {};

        if (column.cellWidth) {
            styles.width = column.cellWidth + 'px'
        }

        return styles;
    };

    const headerTRStyle = {
        position: 'relative'
    };

    useEffect(() => {
        async function getRemoteData() {
            const {data, totalItem} = await props.setRemoteData(buildParams());
            setData(data);
            setTotalItem(totalItem)
            setControlledPageCount(Math.ceil(totalItem / pageSize));
        }

        if (isRemotePaging() && props.setRemoteData) {

            getRemoteData().catch(e => console.log(e));
        } else {
            setData(props.data)
            setTotalItem(data.length)
        }
    }, [pageIndex, pageSize, props.params, props.data]);

    return (
        <div id="" className="">
            <div className="row">
                <div className="col-12">
                    <div className="card card-no-border shadow-none">
                        <div className="card-content collapse p-0 show">
                            <div className="card-body card-dashboard p-0">
                                <div className="table-responsive">
                                    <TableScrollbar height={500}>
                                        <table {...getTableProps()}
                                               className={`table has-sorting table-borderless table-hover table-border-dash ${props.classes}`}>
                                            <thead>
                                            {headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column, cIndex) => (
                                                        <th className={column.headerClassName} title={column.render('Header')}
                                                            key={cIndex}
                                                        >
                                                            {column.render('Header')}
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                            </thead>
                                            <tbody {...getTableBodyProps()}>
                                            {page.map((row, i) => {
                                                prepareRow(row)
                                                return (
                                                    <tr key={i} {...row.getRowProps()}>
                                                        {row.cells.map((cell, index) => {
                                                            return (
                                                                <td key={index} className={cell.column.className}
                                                                    {...cell.getCellProps()}
                                                                >
                                                                    {cell.render('Cell')}
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                            {
                                                page.length ? null : <tr>
                                                    <td colSpan="10"
                                                        className="pl-2 text-left mw-100">Không có dữ liệu
                                                    </td>
                                                </tr>
                                            }

                                            </tbody>
                                        </table>
                                        <table {...getTableProps()}
                                               className={`table has-sorting table-borderless table-hover ${props.classes}`}>
                                            <thead>
                                                {headerGroups.map(headerGroup => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column, cIndex) => (
                                                            <th className={column.headerClassName} title={column.render('Header')}
                                                                key={cIndex}
                                                                style={headerTRStyle} {...column.getHeaderProps()} >
                                                                {column.render('Header')}
                                                                <div className="d-inline-flex position-relative"
                                                                     style={renderStyle(column)}>
                                                                </div>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </thead>
                                        </table>
                                    </TableScrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

DataTable.propTypes = {
    title: PropTypes.string,
    titleSearch: PropTypes.string,
    itemPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    data: PropTypes.array,
    columns: PropTypes.array,
    isLocal: PropTypes.bool,
    params: PropTypes.object,
    setRemoteData: PropTypes.func,
    leftControl: PropTypes.func,
    rightControl: PropTypes.func,
    hasHeader: PropTypes.bool,
    defaultSort: PropTypes.object,
    classes: PropTypes.string,
};

DataTable.defaultProps = {
    title: 'Unnamed Table',
    itemPerPage: 10,
    currentPage: 0,
    data: [],
    columns: [],
    isLocal: false,
    params: {},
    classes: ""
};

export default React.memo(DataTable);
