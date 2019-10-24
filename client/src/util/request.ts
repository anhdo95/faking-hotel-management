import axios from 'axios'

import { RESPONSE_STATUS } from '@/util/constants'

const request = (options: any = {}) => {
	const headers = {
		'Content-Type': 'application/json',
	}
	const config: any = {
    method: 'get',
		headers,
    credentials: 'include',
		data: {},
		...options,
	}

	config.method = config.method.toLowerCase()

	if (config.method === 'post' && config.headers['Content-Type'] === 'multipart/form-data') {
		// TODO: append to FormData
	} else if (config.method !== 'get' && config.method !== 'head') {
		config.data = JSON.stringify(config.data)
	} else {
		config.params = config.data
  }

	return axios(config).then(res => {
    const { data } = res

    if (res.status) {
      if (res.status === RESPONSE_STATUS.SUCCESS) {
        // tslint:disable-next-line: no-unused-expression
        options.success && options.success(data)

        return data
      }

      // tslint:disable-next-line: no-unused-expression
      options.error && options.error({
        code: data,
        message: data.error
      })

      return Promise.reject({
        code: data,
        message: data.error
      })
    }

    // tslint:disable-next-line: no-unused-expression
    options.success && options.success(data)

    return data
	}).catch((...args) => {
    const [ res ] = args

    // tslint:disable-next-line: no-unused-expression
    options.error && options.error(res)

    return Promise.reject(res)
  })
}

export default request
