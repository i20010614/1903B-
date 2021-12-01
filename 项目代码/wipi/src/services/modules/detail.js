import request from '@/utils/request';

// 详情页发起数据请求
export const getDetailList = params => request.get(`/api/article/${params.id}`);
