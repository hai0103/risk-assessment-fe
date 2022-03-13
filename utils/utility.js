import cookies from "next-cookies";
export default class Utility {
  static redirect(location) {
    if (Utility.isBrowser()) {
      window.location.href = location;
    }
  }

  static isBrowser() {
    return typeof window !== 'undefined';
  }

  static isInFrame() {
    return window.location !== window.parent.location
  }

  static handleExceptionPage(e) {
    if (e.response?.data?.StatusCode === "422") {
      var errorCode = e.response?.data?.errorCode || 'UNKNOWN'
      return {
        redirect: {
          permanent: false,
          destination: "/sforbidden?msg=" + errorCode
        }
      }
    }
    if (e.response?.data?.StatusCode === "403") {
      return {
        redirect: {
          permanent: false,
          destination: "/sforbidden"
        }
      }
    }
  }

  static setCommonHeader(header, router) {
    return {
      ...header,
      "X-DepartmentId": cookies(router).department_id || '',
      "X-CompanyId": cookies(router).company_id || '',
      "X-FunctionId": cookies(router).function_id || '',
      Authorization: `Bearer ${cookies(router).access_token || ''}`,
    }
  }

  static trimObjValues(obj) {
    return Object.keys(obj).reduce((acc, curr) => {
      acc[curr] = typeof obj[curr] == 'string' ? obj[curr].trim() : obj[curr];
      return acc;
    }, {});
  }

}
