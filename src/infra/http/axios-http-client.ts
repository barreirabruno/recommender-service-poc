import { HttpClientInterface, HttpClientRequest, HttpClientResponse } from '@/data/contracts/http-client-service'
import axios, { AxiosResponse } from 'axios'

export default class HttpClientAxios implements HttpClientInterface {
  async request (data: HttpClientRequest): Promise<HttpClientResponse> {
    let axiosReponse: AxiosResponse = {
      data: '',
      status: 0,
      statusText: '',
      headers: {},
      config: {}
    }
    try {
      axiosReponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosReponse = error as AxiosResponse
    }
    return {
      statusCode: axiosReponse.status,
      body: axiosReponse.data
    }
  }
}
