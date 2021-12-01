import request from '@/utils/request';
//请求推文章标签数据
export const getTagList = () => request.get("/api/tag") 