export const BASE_PATH = "http://localhost:8080"

const SERVICEMAN_BASE_PATH = `${BASE_PATH}/serviceman`
const COMMON_BASE_PATH = `${BASE_PATH}/common`
const CUSTOMER_BASE_PATH = `${BASE_PATH}/customer`
const ADMIN_BASE_PATH = `${BASE_PATH}/admin`

export const SIGNUP_PATH = `${SERVICEMAN_BASE_PATH}/signup`
export const LOGIN_PATH = `${SERVICEMAN_BASE_PATH}/login`
export const CONFIRM_BOOKING_PATH = `${SERVICEMAN_BASE_PATH}/confirm/booking/`

export const CONTACT_FORM_PATH = `${COMMON_BASE_PATH}/contact`
export const ALL_SERVICE_PATH = `${COMMON_BASE_PATH}/service`
export const PRO_PAGE_PATH = `${COMMON_BASE_PATH}/profile`
export const ALL_SERVICE_PAGE_PATH = `${COMMON_BASE_PATH}/allservice`
export const BOOKING_PAGE_PATH = `${COMMON_BASE_PATH}/booking`
export const BOOKING_BASE_PATH = `${COMMON_BASE_PATH}/history`

export const CREATE_ADMIN_PATH = `${ADMIN_BASE_PATH}/create/admin`
export const CREATE_SERVICE_PATH = `${ADMIN_BASE_PATH}/create/service`
export const GET_ALL_USER_PATH = `${ADMIN_BASE_PATH}/users`
export const GET_ADMIN_PATH = `${ADMIN_BASE_PATH}/get/admin`

