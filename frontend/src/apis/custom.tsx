import {
    Configuration,
    UserControllerApi,
    TrainerControllerApi
} from "../typescript-axios";

const BASE_URL = process.env.REACT_APP_BACE_URL || "http://localhost:8080";
// "http://localhost:8080"

const storedToken: string | null = localStorage.getItem('token');
const config = new Configuration({
    basePath: BASE_URL,
    accessToken: storedToken !== null ? storedToken : undefined,
});


const userApi = new UserControllerApi(config);
const trainerApi = new TrainerControllerApi(config);

export { userApi, trainerApi };