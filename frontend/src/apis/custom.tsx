import {
    Configuration,
    UserControllerApi,
    TrainerControllerApi
} from "../typescript-axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const storedToken: string | null = localStorage.getItem('token');
const config = new Configuration({
    basePath: BASE_URL,
    accessToken: storedToken !== null ? storedToken : undefined,
});


const userApi = new UserControllerApi(config);
const trainerApi = new TrainerControllerApi(config);

export { userApi, trainerApi };