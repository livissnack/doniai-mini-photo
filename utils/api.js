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
export const API_ROOT = 'https://www.doniai.com';




/*********************************************************************************************公共通用方法接口都POST请求*********************************************************************/

/**
 * 说明/请求：判断是否弹出视频 post 传uid用户主键
 * 地址/返回：Api/Index/isTan   0是弹出 1不弹 
 * @param {object} data 
 */
export const isTan = (data) => post(`${API_ROOT}/Api/Index/isTan`, data);

/**
 * 看完视频保存有效期 post 传uid
 * Api/Index/saveType 1成功 0失败
 * @param {object} data 
 */
export const saveType = (data) => post(`${API_ROOT}/Api/Index/saveType`, data);

/**
 * 首页展示 GET
 * Api/Index/index 返回$ggtop轮播图， num 使用次数
 */
export const getSwiperImage = () => get(`${API_ROOT}/Api/Index/index`);



/*********************************************************************************************登录体系*********************************************************************/

/**
 * 用code换openid 传code
 * Api/Login/getsessionkey
 * @param {object} data 
 */
export const getOpenid = (data) => post(`${API_ROOT}/Api/Login/getsessionkey`, data);

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



/*********************************************************************************************几种图片上传体系*********************************************************************/

/**
 * 切图的（包含9宫格和4宫格），图片上传 （上传参数请看我发的小程序那个）
 * Api/Uploade/upload  返回img 则是图片地址
 * @param {object} data 
 */
export const cropImageUpload = (data) => post(`${API_ROOT}/Api/Uploade/upload`, data);

/**
 * 普通识别的图片上传
 * Api/Uploade/uploadp
 * @param {object} data 
 */
export const simpleImageUpload = (data) => post(`${API_ROOT}/Api/Uploade/uploadp`, data);

/**
 * 精准识别的图上传
 * Api/Uploade/uploads
 * @param {object} data 
 */
export const preciseImageUpload = (data) => post(`${API_ROOT}/Api/Uploade/uploads`, data);

/**
 * 颜值图上传
 * Api/Uploade/uploadyz
 * @param {object} data 
 */
export const yzImageUpload = (data) => post(`${API_ROOT}/Api/Uploade/uploadyz`, data);



/*********************************************************************************************切图体系*********************************************************************/

/**
 * 九宫格切图和四宫格切图 传uid url(图片路径) type=9则是九宫格 =4则是四宫格
 * Api/Index/save 
 * 返回： 如果是九宫格则返回$arrs1 $arrs2 $arrs3  四宫格则是$arrs1 $arrs2 (3个变量是3行，4个变量是4行)
 * @param {object} data 
 */
export const cropGongge = (data) => post(`${API_ROOT}/Api/Index/save`, data);



/*********************************************************************************************文字识别和处理体系*********************************************************************/

/**
 * 百度识别图片  传img（刚刚上传图片返回地址直接给我即可）
 * Api/Uploade/ocr   返回1 成功 返回0请显示后台返回的err字段.
 * @param {object} data 
 */
export const baiduImageOcr = (data) => post(`${API_ROOT}/Api/Uploade/ocr`, data);


/**
 * 用户点击复制则调用此接口，保存内容   uid  str(是识别的内容)
 * Api/Uploade/save
 * @param {object} data 
 */
export const getOcrContent = (data) => post(`${API_ROOT}/Api/Uploade/save`, data);

/**
 * 翻译  传参 str
 * Api/Uploade/translate
 * @param {object} data 
 */
export const getTranslateText = (data) => post(`${API_ROOT}/Api/Uploade/translate`, data);

/**
 * 返回最新100条识别记录列表 POST 传uid
 * Api/Index/historyList 返回 data数据
 * @param {object} data 
 */
export const getOcrHistoryList = (data) => post(`${API_ROOT}/Api/Index/historyList`, data);

/**
 * 一条识别记录的详情 post 传记录id
 * Api/Index/getContent
 * @param {object} data 
 */
export const getOcrHistoryDetail = (data) => post(`${API_ROOT}/Api/Index/getContent`, data);

/**
 * 更新识别的文字  传记录id 以及文字str
 * Api/Index/update
 * @param {object} data 
 */
export const updateOcrText = (data) => post(`${API_ROOT}/Api/Index/update`, data);

/**
 * 批量删除记录 传ids(是多个记录id用英文逗号分隔)
 * Api/Index/del
 * @param {object} data 
 */
export const batchDeleteNote = (data) => post(`${API_ROOT}/Api/Index/del`, data);

/**
 * 多条记录合并  传ids(是多个记录id用英文逗号分隔)和uid
 * Api/Index/saves
 * @param {object} data 
 */
export const mergeNote = (data) => post(`${API_ROOT}/Api/Index/saves`, data);