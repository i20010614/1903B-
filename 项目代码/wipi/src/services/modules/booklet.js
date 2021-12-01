import request from '../../utils/request';
export const getKnowledge = () => request.get("/api/Knowledge")
export const getdetail = (id) => request.get(`/api/Knowledge/${id}`)