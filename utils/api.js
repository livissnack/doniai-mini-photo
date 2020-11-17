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
export const API_ROOT = 'https://doniai.ltd';

export const getOpenid = (data) => post(`${API_ROOT}/api/user/login`, data);
export const authLogin = (data, headers) => post(`${API_ROOT}/api/user/auth`, data, headers);

export const getPhotoHistorys = (data, headers) => post(`${API_ROOT}/api/photo_history`, data, headers);
export const getPhotoHistory = (data, headers) => post(`${API_ROOT}/api/photo_history/detail`, data, headers);

export const getQuestions = () => get(`${API_ROOT}/api/question`);
export const getQuestion = (question_id) => get(`${API_ROOT}/api/question/detail?question_id=${question_id}`);

export const getOrders = (status) => get(`${API_ROOT}/api/order?status=${status}`);
export const getOrder = (order_id) => get(`${API_ROOT}/api/order/detail?order_id=${order_id}`);

export const getAddresses = () => get(`${API_ROOT}/api/address`);
export const getAddress = (address_id) => get(`${API_ROOT}/api/address/detail?address_id=${address_id}`);
export const createAddress = (data) => post(`${API_ROOT}/api/address/create`, data);
export const updateAddress = (data) => post(`${API_ROOT}/api/address/edit`, data);


export const getTranslate = (data) => post(`${API_ROOT}/api/ai/translate`, data);


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