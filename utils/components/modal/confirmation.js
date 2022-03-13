import React from "react";
import Modal from "./index";
import PropTypes from "prop-types";

function ModalConfirmation(props) {
    return (
        <div>
            <Modal
                isOpen={props.show}
                modalName="modal-confirm"
                onClose={() => props.onClose()}
                title={props.title}
                zIndex={props.zIndex}
                centered
                size={props.size || "sm"}
                hasHeader={props.hasHeader}
            >
                {
                    props.content && <Modal.Body>
                        {props.content}
                    </Modal.Body>
                }
                <Modal.Footer>
                    {props.showButtonCancel && <button type="button" className="btn btn-outline-primary mr-25" data-dismiss="modal"
                             onClick={() => props.onClose()}>
                        <span
                            className="d-none d-sm-block">{props.cancelButtonLabel || 'Huỷ'}</span>
                    </button>}
                    {props.showButtonConfirm && <button type="button" className="btn btn-primary btn-min-width" data-dismiss="modal"
                             onClick={() => props.onConfirm()}>
                        <span
                            className="d-none d-sm-block">{props.confirmButtonLabel || 'Xác nhận'}</span>
                    </button>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}

ModalConfirmation.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    confirmButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    showButtonCancel: PropTypes.bool,
    showButtonConfirm: PropTypes.bool,
    zIndex: PropTypes.number,
    hasHeader: PropTypes.bool,
    size: PropTypes.string,
};

ModalConfirmation.defaultProps = {
    show: false,
    confirmButtonLabel: '',
    showButtonCancel: true,
    showButtonConfirm: true,
    zIndex: 2003,
    hasHeader: true
};

export default ModalConfirmation;
