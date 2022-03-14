import {isNil} from "lodash";

export default class Response {
    static isSuccess(response) {
        return response.success;
    }

    static isSuccessAPI(response) {
        return this.isSuccess(response) && response.data && (
            (response.data.hasOwnProperty('Success') && response.data.Success === true) ||
            (response.data.hasOwnProperty('success') && response.data.success === true));
    }

    static getErrorMessage(error) {
        if (!error.response) {
            return error.message;
        }

        return error.response.data?.message || error.message;
    }

    static getData(response) {
        if (this.isSuccess(response)) {
            return response?.data;
        }

        throw new Error('Can not get data from response');
    }

    static getAPIData(response) {
        if (this.isSuccessAPI(response) && ((response.data.hasOwnProperty('Data') && !isNil(response.data.Data)) ||
            (response.data.hasOwnProperty('data') && response.data.data))) {
            return response.data.hasOwnProperty('Data') ? response.data.Data : response.data.data;
        }
        throw new Error('Can not get data from response');
    }

    static getAPIError(response) {
        if (!this.isSuccessAPI(response) && response.data.message && response.data.message[0]) {
            return response.data.message[0];
        }

        throw new Error('Can not get error message from response');
    }
}