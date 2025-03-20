import { axiosInstance } from "./axiosInstance"
import { ApiRoutes } from "./constants";

export const checkVerify = async (code: string): Promise<any> => {
    return await axiosInstance.get(ApiRoutes.VERIFY_CODE, {
        params: {
            code
        }
    });
}