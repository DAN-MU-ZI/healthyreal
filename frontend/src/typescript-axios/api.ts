/* tslint:disable */
/* eslint-disable */
/**
 * API Documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface BodyInfo
 */
export interface BodyInfo {
    /**
     * 
     * @type {number}
     * @memberof BodyInfo
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof BodyInfo
     */
    'birthDate'?: string;
    /**
     * 
     * @type {number}
     * @memberof BodyInfo
     */
    'height'?: number;
    /**
     * 
     * @type {number}
     * @memberof BodyInfo
     */
    'weight'?: number;
    /**
     * 
     * @type {UserInfo}
     * @memberof BodyInfo
     */
    'userInfo'?: UserInfo;
}
/**
 * 
 * @export
 * @interface BodyInfoDto
 */
export interface BodyInfoDto {
    /**
     * 
     * @type {string}
     * @memberof BodyInfoDto
     */
    'birthDate'?: string;
    /**
     * 
     * @type {number}
     * @memberof BodyInfoDto
     */
    'height'?: number;
    /**
     * 
     * @type {number}
     * @memberof BodyInfoDto
     */
    'weight'?: number;
}
/**
 * 
 * @export
 * @interface Goal
 */
export interface Goal {
    /**
     * 
     * @type {number}
     * @memberof Goal
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Goal
     */
    'goalType'?: GoalGoalTypeEnum;
    /**
     * 
     * @type {UserInfo}
     * @memberof Goal
     */
    'userInfo'?: UserInfo;
    /**
     * 
     * @type {TrainingProgram}
     * @memberof Goal
     */
    'trainingProgram'?: TrainingProgram;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof Goal
     */
    'trainerInfo'?: TrainerInfo;
}

export const GoalGoalTypeEnum = {
    WeightLoss: 'WEIGHT_LOSS',
    MuscleGain: 'MUSCLE_GAIN',
    StaminaImprovement: 'STAMINA_IMPROVEMENT',
    FlexibilityImprovement: 'FLEXIBILITY_IMPROVEMENT',
    BodyShapeImprovement: 'BODY_SHAPE_IMPROVEMENT',
    BalanceImprovement: 'BALANCE_IMPROVEMENT',
    LifestyleImprovement: 'LIFESTYLE_IMPROVEMENT',
    HealthImprovement: 'HEALTH_IMPROVEMENT',
    BodyProfile: 'BODY_PROFILE',
    Other: 'OTHER'
} as const;

export type GoalGoalTypeEnum = typeof GoalGoalTypeEnum[keyof typeof GoalGoalTypeEnum];

/**
 * 
 * @export
 * @interface Gym
 */
export interface Gym {
    /**
     * 
     * @type {number}
     * @memberof Gym
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Gym
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof Gym
     */
    'address'?: string;
    /**
     * 
     * @type {UserInfo}
     * @memberof Gym
     */
    'userInfo'?: UserInfo;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof Gym
     */
    'trainerInfo'?: TrainerInfo;
}
/**
 * 
 * @export
 * @interface GymDto
 */
export interface GymDto {
    /**
     * 
     * @type {string}
     * @memberof GymDto
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof GymDto
     */
    'address'?: string;
}
/**
 * 
 * @export
 * @interface LocalTime
 */
export interface LocalTime {
    /**
     * 
     * @type {number}
     * @memberof LocalTime
     */
    'hour'?: number;
    /**
     * 
     * @type {number}
     * @memberof LocalTime
     */
    'minute'?: number;
    /**
     * 
     * @type {number}
     * @memberof LocalTime
     */
    'second'?: number;
    /**
     * 
     * @type {number}
     * @memberof LocalTime
     */
    'nano'?: number;
}
/**
 * 
 * @export
 * @interface Member
 */
export interface Member {
    /**
     * 
     * @type {number}
     * @memberof Member
     */
    'userSeq'?: number;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'emailVerifiedYn': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'profileImageUrl': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'providerType': MemberProviderTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'roleType': MemberRoleTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    'modifiedAt': string;
    /**
     * 
     * @type {UserInfo}
     * @memberof Member
     */
    'userInfo'?: UserInfo;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof Member
     */
    'trainerInfo'?: TrainerInfo;
}

export const MemberProviderTypeEnum = {
    Google: 'GOOGLE',
    Kakao: 'KAKAO',
    Github: 'GITHUB'
} as const;

export type MemberProviderTypeEnum = typeof MemberProviderTypeEnum[keyof typeof MemberProviderTypeEnum];
export const MemberRoleTypeEnum = {
    User: 'USER',
    Admin: 'ADMIN',
    Guest: 'GUEST'
} as const;

export type MemberRoleTypeEnum = typeof MemberRoleTypeEnum[keyof typeof MemberRoleTypeEnum];

/**
 * 
 * @export
 * @interface MemberRegisterRequest
 */
export interface MemberRegisterRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof MemberRegisterRequest
     */
    'goalTypes'?: Array<MemberRegisterRequestGoalTypesEnum>;
    /**
     * 
     * @type {string}
     * @memberof MemberRegisterRequest
     */
    'gender'?: MemberRegisterRequestGenderEnum;
    /**
     * 
     * @type {BodyInfoDto}
     * @memberof MemberRegisterRequest
     */
    'bodyInfoDto'?: BodyInfoDto;
    /**
     * 
     * @type {GymDto}
     * @memberof MemberRegisterRequest
     */
    'gymDto'?: GymDto;
    /**
     * 
     * @type {string}
     * @memberof MemberRegisterRequest
     */
    'exerciseLevel'?: MemberRegisterRequestExerciseLevelEnum;
    /**
     * 
     * @type {boolean}
     * @memberof MemberRegisterRequest
     */
    'agreeToReceive'?: boolean;
}

export const MemberRegisterRequestGoalTypesEnum = {
    WeightLoss: 'WEIGHT_LOSS',
    MuscleGain: 'MUSCLE_GAIN',
    StaminaImprovement: 'STAMINA_IMPROVEMENT',
    FlexibilityImprovement: 'FLEXIBILITY_IMPROVEMENT',
    BodyShapeImprovement: 'BODY_SHAPE_IMPROVEMENT',
    BalanceImprovement: 'BALANCE_IMPROVEMENT',
    LifestyleImprovement: 'LIFESTYLE_IMPROVEMENT',
    HealthImprovement: 'HEALTH_IMPROVEMENT',
    BodyProfile: 'BODY_PROFILE',
    Other: 'OTHER'
} as const;

export type MemberRegisterRequestGoalTypesEnum = typeof MemberRegisterRequestGoalTypesEnum[keyof typeof MemberRegisterRequestGoalTypesEnum];
export const MemberRegisterRequestGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE'
} as const;

export type MemberRegisterRequestGenderEnum = typeof MemberRegisterRequestGenderEnum[keyof typeof MemberRegisterRequestGenderEnum];
export const MemberRegisterRequestExerciseLevelEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED'
} as const;

export type MemberRegisterRequestExerciseLevelEnum = typeof MemberRegisterRequestExerciseLevelEnum[keyof typeof MemberRegisterRequestExerciseLevelEnum];

/**
 * 
 * @export
 * @interface Qualification
 */
export interface Qualification {
    /**
     * 
     * @type {number}
     * @memberof Qualification
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Qualification
     */
    'content'?: string;
    /**
     * 
     * @type {string}
     * @memberof Qualification
     */
    'category'?: QualificationCategoryEnum;
    /**
     * 
     * @type {string}
     * @memberof Qualification
     */
    'startDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof Qualification
     */
    'endDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof Qualification
     */
    'description'?: string;
    /**
     * 
     * @type {S3Image}
     * @memberof Qualification
     */
    'image'?: S3Image;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof Qualification
     */
    'trainerInfo'?: TrainerInfo;
}

export const QualificationCategoryEnum = {
    Certification: 'CERTIFICATION',
    Education: 'EDUCATION',
    Award: 'AWARD'
} as const;

export type QualificationCategoryEnum = typeof QualificationCategoryEnum[keyof typeof QualificationCategoryEnum];

/**
 * 
 * @export
 * @interface QualificationDto
 */
export interface QualificationDto {
    /**
     * 
     * @type {string}
     * @memberof QualificationDto
     */
    'content'?: string;
    /**
     * 
     * @type {string}
     * @memberof QualificationDto
     */
    'category'?: QualificationDtoCategoryEnum;
    /**
     * 
     * @type {string}
     * @memberof QualificationDto
     */
    'startDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof QualificationDto
     */
    'endDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof QualificationDto
     */
    'description'?: string;
}

export const QualificationDtoCategoryEnum = {
    Certification: 'CERTIFICATION',
    Education: 'EDUCATION',
    Award: 'AWARD'
} as const;

export type QualificationDtoCategoryEnum = typeof QualificationDtoCategoryEnum[keyof typeof QualificationDtoCategoryEnum];

/**
 * 
 * @export
 * @interface RegisterTrainerRequest
 */
export interface RegisterTrainerRequest {
    /**
     * 
     * @type {TrainerRequest}
     * @memberof RegisterTrainerRequest
     */
    'data': TrainerRequest;
    /**
     * 
     * @type {Array<File>}
     * @memberof RegisterTrainerRequest
     */
    'qualificationImages': Array<File>;
    /**
     * 
     * @type {Array<File>}
     * @memberof RegisterTrainerRequest
     */
    'trainingProgramImages': Array<File>;
}
/**
 * 
 * @export
 * @interface S3Image
 */
export interface S3Image {
    /**
     * 
     * @type {number}
     * @memberof S3Image
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof S3Image
     */
    'fileName'?: string;
    /**
     * 
     * @type {string}
     * @memberof S3Image
     */
    'url'?: string;
    /**
     * 
     * @type {string}
     * @memberof S3Image
     */
    'uploadDate'?: string;
    /**
     * 
     * @type {number}
     * @memberof S3Image
     */
    'fileSize'?: number;
    /**
     * 
     * @type {string}
     * @memberof S3Image
     */
    'contentType'?: string;
    /**
     * 
     * @type {Qualification}
     * @memberof S3Image
     */
    'qualification'?: Qualification;
    /**
     * 
     * @type {TrainingProgram}
     * @memberof S3Image
     */
    'trainingProgram'?: TrainingProgram;
}
/**
 * 
 * @export
 * @interface Schedule
 */
export interface Schedule {
    /**
     * 
     * @type {number}
     * @memberof Schedule
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    'dayOfWeek'?: ScheduleDayOfWeekEnum;
    /**
     * 
     * @type {LocalTime}
     * @memberof Schedule
     */
    'startTime'?: LocalTime;
    /**
     * 
     * @type {LocalTime}
     * @memberof Schedule
     */
    'endTime'?: LocalTime;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof Schedule
     */
    'trainerInfo'?: TrainerInfo;
}

export const ScheduleDayOfWeekEnum = {
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY',
    Sunday: 'SUNDAY'
} as const;

export type ScheduleDayOfWeekEnum = typeof ScheduleDayOfWeekEnum[keyof typeof ScheduleDayOfWeekEnum];

/**
 * 
 * @export
 * @interface ScheduleDto
 */
export interface ScheduleDto {
    /**
     * 
     * @type {string}
     * @memberof ScheduleDto
     */
    'dayOfWeek'?: ScheduleDtoDayOfWeekEnum;
    /**
     * 
     * @type {LocalTime}
     * @memberof ScheduleDto
     */
    'startTime'?: LocalTime;
    /**
     * 
     * @type {LocalTime}
     * @memberof ScheduleDto
     */
    'endTime'?: LocalTime;
}

export const ScheduleDtoDayOfWeekEnum = {
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY',
    Sunday: 'SUNDAY'
} as const;

export type ScheduleDtoDayOfWeekEnum = typeof ScheduleDtoDayOfWeekEnum[keyof typeof ScheduleDtoDayOfWeekEnum];

/**
 * 
 * @export
 * @interface TrainerInfo
 */
export interface TrainerInfo {
    /**
     * 
     * @type {number}
     * @memberof TrainerInfo
     */
    'id'?: number;
    /**
     * 
     * @type {Member}
     * @memberof TrainerInfo
     */
    'user'?: Member;
    /**
     * 
     * @type {Gym}
     * @memberof TrainerInfo
     */
    'gym'?: Gym;
    /**
     * 
     * @type {Array<Goal>}
     * @memberof TrainerInfo
     */
    'goalList'?: Array<Goal>;
    /**
     * 
     * @type {Array<Qualification>}
     * @memberof TrainerInfo
     */
    'qualificationList'?: Array<Qualification>;
    /**
     * 
     * @type {Array<TrainingProgram>}
     * @memberof TrainerInfo
     */
    'trainingProgramList'?: Array<TrainingProgram>;
    /**
     * 
     * @type {Array<Schedule>}
     * @memberof TrainerInfo
     */
    'scheduleList'?: Array<Schedule>;
    /**
     * 
     * @type {string}
     * @memberof TrainerInfo
     */
    'profileDescription'?: string;
}
/**
 * 
 * @export
 * @interface TrainerRequest
 */
export interface TrainerRequest {
    /**
     * 
     * @type {GymDto}
     * @memberof TrainerRequest
     */
    'gymDto'?: GymDto;
    /**
     * 
     * @type {Array<string>}
     * @memberof TrainerRequest
     */
    'goalTypes'?: Array<TrainerRequestGoalTypesEnum>;
    /**
     * 
     * @type {Array<QualificationDto>}
     * @memberof TrainerRequest
     */
    'qualificationDtoList'?: Array<QualificationDto>;
    /**
     * 
     * @type {TrainingProgramDto}
     * @memberof TrainerRequest
     */
    'trainingProgramDto'?: TrainingProgramDto;
    /**
     * 
     * @type {Array<ScheduleDto>}
     * @memberof TrainerRequest
     */
    'scheduleDtoList'?: Array<ScheduleDto>;
    /**
     * 
     * @type {string}
     * @memberof TrainerRequest
     */
    'profileDescription'?: string;
}

export const TrainerRequestGoalTypesEnum = {
    WeightLoss: 'WEIGHT_LOSS',
    MuscleGain: 'MUSCLE_GAIN',
    StaminaImprovement: 'STAMINA_IMPROVEMENT',
    FlexibilityImprovement: 'FLEXIBILITY_IMPROVEMENT',
    BodyShapeImprovement: 'BODY_SHAPE_IMPROVEMENT',
    BalanceImprovement: 'BALANCE_IMPROVEMENT',
    LifestyleImprovement: 'LIFESTYLE_IMPROVEMENT',
    HealthImprovement: 'HEALTH_IMPROVEMENT',
    BodyProfile: 'BODY_PROFILE',
    Other: 'OTHER'
} as const;

export type TrainerRequestGoalTypesEnum = typeof TrainerRequestGoalTypesEnum[keyof typeof TrainerRequestGoalTypesEnum];

/**
 * 
 * @export
 * @interface TrainingProgram
 */
export interface TrainingProgram {
    /**
     * 
     * @type {number}
     * @memberof TrainingProgram
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof TrainingProgram
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof TrainingProgram
     */
    'description'?: string;
    /**
     * 
     * @type {Array<Goal>}
     * @memberof TrainingProgram
     */
    'goalList'?: Array<Goal>;
    /**
     * 
     * @type {TrainerInfo}
     * @memberof TrainingProgram
     */
    'trainerInfo'?: TrainerInfo;
    /**
     * 
     * @type {Array<S3Image>}
     * @memberof TrainingProgram
     */
    'imageList'?: Array<S3Image>;
}
/**
 * 
 * @export
 * @interface TrainingProgramDto
 */
export interface TrainingProgramDto {
    /**
     * 
     * @type {string}
     * @memberof TrainingProgramDto
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof TrainingProgramDto
     */
    'description'?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof TrainingProgramDto
     */
    'goalTypes'?: Array<TrainingProgramDtoGoalTypesEnum>;
}

export const TrainingProgramDtoGoalTypesEnum = {
    WeightLoss: 'WEIGHT_LOSS',
    MuscleGain: 'MUSCLE_GAIN',
    StaminaImprovement: 'STAMINA_IMPROVEMENT',
    FlexibilityImprovement: 'FLEXIBILITY_IMPROVEMENT',
    BodyShapeImprovement: 'BODY_SHAPE_IMPROVEMENT',
    BalanceImprovement: 'BALANCE_IMPROVEMENT',
    LifestyleImprovement: 'LIFESTYLE_IMPROVEMENT',
    HealthImprovement: 'HEALTH_IMPROVEMENT',
    BodyProfile: 'BODY_PROFILE',
    Other: 'OTHER'
} as const;

export type TrainingProgramDtoGoalTypesEnum = typeof TrainingProgramDtoGoalTypesEnum[keyof typeof TrainingProgramDtoGoalTypesEnum];

/**
 * 
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
    /**
     * 
     * @type {number}
     * @memberof UserInfo
     */
    'id'?: number;
    /**
     * 
     * @type {Member}
     * @memberof UserInfo
     */
    'user'?: Member;
    /**
     * 
     * @type {Array<Goal>}
     * @memberof UserInfo
     */
    'goalList'?: Array<Goal>;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    'gender'?: UserInfoGenderEnum;
    /**
     * 
     * @type {BodyInfo}
     * @memberof UserInfo
     */
    'bodyInfo'?: BodyInfo;
    /**
     * 
     * @type {Gym}
     * @memberof UserInfo
     */
    'gym'?: Gym;
    /**
     * 
     * @type {string}
     * @memberof UserInfo
     */
    'exerciseLevel'?: UserInfoExerciseLevelEnum;
    /**
     * 
     * @type {boolean}
     * @memberof UserInfo
     */
    'agreeToReceive'?: boolean;
}

export const UserInfoGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE'
} as const;

export type UserInfoGenderEnum = typeof UserInfoGenderEnum[keyof typeof UserInfoGenderEnum];
export const UserInfoExerciseLevelEnum = {
    Beginner: 'BEGINNER',
    Intermediate: 'INTERMEDIATE',
    Advanced: 'ADVANCED'
} as const;

export type UserInfoExerciseLevelEnum = typeof UserInfoExerciseLevelEnum[keyof typeof UserInfoExerciseLevelEnum];

/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {Member}
     * @memberof UserResponse
     */
    'user'?: Member;
}

/**
 * TrainerControllerApi - axios parameter creator
 * @export
 */
export const TrainerControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {Member} user 
         * @param {RegisterTrainerRequest} [registerTrainerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerTrainer: async (user: Member, registerTrainerRequest?: RegisterTrainerRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            assertParamExists('registerTrainer', 'user', user)
            const localVarPath = `/api/v1/trainer/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (user !== undefined) {
                for (const [key, value] of Object.entries(user)) {
                    localVarQueryParameter[key] = value;
                }
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(registerTrainerRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TrainerControllerApi - functional programming interface
 * @export
 */
export const TrainerControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TrainerControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {Member} user 
         * @param {RegisterTrainerRequest} [registerTrainerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerTrainer(user: Member, registerTrainerRequest?: RegisterTrainerRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.registerTrainer(user, registerTrainerRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['TrainerControllerApi.registerTrainer']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * TrainerControllerApi - factory interface
 * @export
 */
export const TrainerControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TrainerControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {Member} user 
         * @param {RegisterTrainerRequest} [registerTrainerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerTrainer(user: Member, registerTrainerRequest?: RegisterTrainerRequest, options?: any): AxiosPromise<string> {
            return localVarFp.registerTrainer(user, registerTrainerRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TrainerControllerApi - object-oriented interface
 * @export
 * @class TrainerControllerApi
 * @extends {BaseAPI}
 */
export class TrainerControllerApi extends BaseAPI {
    /**
     * 
     * @param {Member} user 
     * @param {RegisterTrainerRequest} [registerTrainerRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrainerControllerApi
     */
    public registerTrainer(user: Member, registerTrainerRequest?: RegisterTrainerRequest, options?: RawAxiosRequestConfig) {
        return TrainerControllerApiFp(this.configuration).registerTrainer(user, registerTrainerRequest, options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {Member} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (user: Member, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            assertParamExists('getUser', 'user', user)
            const localVarPath = `/api/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (user !== undefined) {
                for (const [key, value] of Object.entries(user)) {
                    localVarQueryParameter[key] = value;
                }
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {MemberRegisterRequest} memberRegisterRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerMember: async (memberRegisterRequest: MemberRegisterRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'memberRegisterRequest' is not null or undefined
            assertParamExists('registerMember', 'memberRegisterRequest', memberRegisterRequest)
            const localVarPath = `/api/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(memberRegisterRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserControllerApi - functional programming interface
 * @export
 */
export const UserControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {Member} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(user: Member, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(user, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserControllerApi.getUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {MemberRegisterRequest} memberRegisterRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async registerMember(memberRegisterRequest: MemberRegisterRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.registerMember(memberRegisterRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserControllerApi.registerMember']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserControllerApi - factory interface
 * @export
 */
export const UserControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {Member} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(user: Member, options?: any): AxiosPromise<UserResponse> {
            return localVarFp.getUser(user, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {MemberRegisterRequest} memberRegisterRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerMember(memberRegisterRequest: MemberRegisterRequest, options?: any): AxiosPromise<string> {
            return localVarFp.registerMember(memberRegisterRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserControllerApi - object-oriented interface
 * @export
 * @class UserControllerApi
 * @extends {BaseAPI}
 */
export class UserControllerApi extends BaseAPI {
    /**
     * 
     * @param {Member} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public getUser(user: Member, options?: RawAxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).getUser(user, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {MemberRegisterRequest} memberRegisterRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserControllerApi
     */
    public registerMember(memberRegisterRequest: MemberRegisterRequest, options?: RawAxiosRequestConfig) {
        return UserControllerApiFp(this.configuration).registerMember(memberRegisterRequest, options).then((request) => request(this.axios, this.basePath));
    }
}



