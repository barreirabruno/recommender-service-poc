import axios from 'axios'
import { HttpClientRequest } from '@/data/contracts/http-client-service'

export const MockHttpRequest = (): HttpClientRequest => ({
  url: 'http://any_url',
  method: 'post',
  body: {
    propertyA: 'any_element',
    propertyB: 'any_element'
  },
  headers: {
    propertyA: 'any_element',
    propertyB: 'any_element'
  }
})

export const MockHttpResponse = (): any => ({
  data: {
    propertyA: 'any_data_from_axios_request',
    propertyB: 'any_data_from_axios_request'
  },
  status: 200
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(MockHttpResponse())
  return mockedAxios
}
