import request from '@/utils/request';
//请求推荐阅读数据
export const getRecommend = () => request.get("/api/article/recommend") 