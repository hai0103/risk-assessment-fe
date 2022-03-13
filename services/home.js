import {request} from "../utils/axios";
import {API_HOST} from "../constants/common";

export const HomeApi = {
  async getListQuestions(data, headers = {}) {
    return await request(
      'GET',
      `${API_HOST}/api/processing/get-processing-devices`,
      data,
      headers
    )
  },
  async getListProcessing(data, headers = {}) {
    return await request(
      'GET',
      `${API_HOST}/api/question/get-questions`,
      data,
      headers
    )
  },
  async save(data) {
    return await request(
      'POST',
      `${API_HOST}/api/workfile/save-workfile`,
      data
    )
  },
  async setStatusProcessing(data) {
    return await request(
      'GET',
      `${API_HOST}/api/processing/set-status-processing-devices`,
      data
    )
  },
}
