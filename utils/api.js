/**
 * 此文件管理项目所有接口
 */
import {get, post, put, del} from './request';

/**
 * 服务器根域名
 * 试玩更多接口看这里
 * https://www.doniai.com/
 * @type {string}
 */
export const API_ROOT = 'https://wechat.doniai.com';

export const getOpenid = (data) => post(`${API_ROOT}/api/user/login`, data);
export const authLogin = (data, headers) => post(`${API_ROOT}/api/user/auth`, data, headers);

export const getPhotoHistorys = (data, headers) => post(`${API_ROOT}/api/photo_history`, data, headers);
export const getPhotoHistory = (data, headers) => post(`${API_ROOT}/api/photo_history/detail`, data, headers);

export const getAllSpec = (data, headers) => post(`${API_ROOT}/api/photo_spec`, data, headers);
export const getSpec = (data, headers) => post(`${API_ROOT}/api/photo_spec/detail`, data, headers);

export const getQuestions = () => get(`${API_ROOT}/api/question`);
export const getQuestion = (question_id) => get(`${API_ROOT}/api/question/detail?question_id=${question_id}`);

export const getOrders = (data, headers) => post(`${API_ROOT}/api/order`, data, headers);
export const deleteOrder = (data, headers) => post(`${API_ROOT}/api/order/delete`, data, headers);
export const getOrder = (order_id) => get(`${API_ROOT}/api/order/detail?order_id=${order_id}`);

export const getAddresses = (data, headers) => post(`${API_ROOT}/api/address`, data, headers);
export const getAddress = (address_id) => get(`${API_ROOT}/api/address/detail?address_id=${address_id}`);
export const createAddress = (data, headers) => post(`${API_ROOT}/api/address/create`, data, headers);
export const updateAddress = (data, headers) => post(`${API_ROOT}/api/address/edit`, data, headers);
export const deleteAddress = (data) => post(`${API_ROOT}/api/address/delete`, data);

export const getAllNews = (data, headers) => post(`${API_ROOT}/api/news`, data, headers);
export const getNews = (data, headers) => post(`${API_ROOT}/api/news/detail`, data, headers);


export const getTranslate = (data) => post(`${API_ROOT}/api/ai/translate`, data);

export const getBalance = (data, headers) => post(`${API_ROOT}/api/user/balance`, data, headers);

export const doPay = (data, headers) => post(`${API_ROOT}/api/pay/photo`, data, headers);


/*********************************************************************************************登录体系*********************************************************************/

/**
 * 用code换openid 传code
 * Api/Login/getsessionkey
 * @param {object} data 
 */
//export const getOpenid = (data) => post(`${API_ROOT}/Api/Login/getsessionkey`, data);

/**
 * 用openid 来登录系统，
 * Api/Login/authlogin   status=0错误=1未授权（需要弹出授权狂）=2授权了头像和昵称
 * @param {object} data 
 */
export const authlogin = (data) => post(`${API_ROOT}/Api/Login/authlogin`, data);

/**
 * 保存授权的头像和昵称  传photo(头像)uname（昵称）
 * Api/Login/login
 * @param {object} data 
 */
export const saveUserInfo = (data) => post(`${API_ROOT}/Api/Login/login`, data);