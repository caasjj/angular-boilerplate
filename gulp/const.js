import gutil from 'gulp-util'
import pkg from '../package.json'
import moment from 'moment'

// This is where gulp will serve the angular application
export const TEST_RESULT_PROTOCOL='http'
export const TEST_RESULT_HOST='localhost'
export const TEST_RESULT_PORT='9001'
export const TEST_RESULT_URL=`${TEST_RESULT_PROTOCOL}://${TEST_RESULT_HOST}:${TEST_RESULT_PORT}`

// This is where gulp will serve the angular application
export const DEV_PROTOCOL='http'
export const DEV_HOST='localhost'
export const DEV_PORT='8000'
export const DEV_URL=`${DEV_PROTOCOL}://${DEV_HOST}:${DEV_PORT}`

// This is where the sails.js app is providing the backend api
export const API_PROTOCOL='http'
export const API_HOST='localhost'
export const API_PORT='1337'
export const API_URL=`${API_PROTOCOL}://${API_HOST}:${API_PORT}`