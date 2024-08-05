import {
    Configuration,
    UserControllerApi,
    TrainerControllerApi
} from "../typescript-axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

if (!BASE_URL) {
    throw new Error("REACT_APP_BASE_URL 환경 변수가 설정되지 않았습니다.");
}

const createUserApi = () => {
    const token = localStorage.getItem('token');
    const config = new Configuration({
        basePath: BASE_URL,
        accessToken: token ? token : undefined,
    });
    return new UserControllerApi(config);
};

const createTrainerApi = () => {
    const token = localStorage.getItem('token');
    const config = new Configuration({
        basePath: BASE_URL,
        accessToken: token ? token : undefined,
    });
    return new TrainerControllerApi(config);
};

export { createUserApi, createTrainerApi };
