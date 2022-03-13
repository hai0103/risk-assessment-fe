import {confirmAlert} from 'react-confirm-alert';
import ModalConfirmation from "./components/modal/confirmation";
import React from "react";
import {isNil} from "lodash"

export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function isNotNullAndUndefined(value) {
  return value !== null && value !== undefined
}

export function confirmation(options) {
  const defaultOptions = {
    customUI: ({ onClose }) => <ModalConfirmation
      show={true}
      title={options.title}
      onClose={() => {
        options.onClose && options.onClose()
        onClose()
      }}
      size={options.size}
      content={options.content || ''}
      showButtonConfirm={!isNil(options.showButtonConfirm) ? options.showButtonConfirm : true}
      hasHeader={isNil(options.hasHeader) ? true : options.hasHeader}
      onConfirm = {() => {
        if (options.onConfirm) {
          options.onConfirm({onClose});
        }
      }}
      showButtonCancel={options?.showButtonCancel}
      confirmButtonLabel={options.confirmLabel || 'Đồng ý'}
      cancelButtonLabel={options.cancelLabel || 'Huỷ'}
    />,
  };

  confirmAlert(defaultOptions);
}
