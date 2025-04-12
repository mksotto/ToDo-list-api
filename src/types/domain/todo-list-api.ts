/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** @format uuid */
  id: string;
  /** @example "dylandoe" */
  username: string;
  /** @example "dylandoe@email.com" */
  email: string;
}

export interface AuthSignupPost {
  /** @example "dylandoe" */
  username: string;
  /** @example "dylandoe@email.com" */
  email: string;
  /** @example "Qwerty123" */
  password: string;
}

export interface AuthLoginPost {
  /** @example "dylandoe" */
  username: string;
  /** @example "Qwerty123" */
  password: string;
}

export interface AuthPatch {
  /** @example "dylandoe" */
  username?: string;
  /** @example "Qwerty123" */
  password: string;
  /** @example "Qwerty123" */
  new_password?: string;
}

export interface Task {
  /** @format uuid */
  id: string;
  /** @example "Go to the shop" */
  name: string;
  /** @example "Buy carrot, bread and pineapple" */
  description: string | null;
  /** @format date-time */
  deadline: string | null;
  completed: boolean;
}

export interface TaskPost {
  /** @example "Go to the shop" */
  name: string;
  /** @example "Buy carrot, bread and pineapple" */
  description?: string;
  /** @format date-time */
  deadline?: string;
}

export interface TaskPatch {
  /** @example "Go to the shop" */
  name?: string;
  /** @example "Buy carrot, bread and pineapple" */
  description?: string | null;
  /** @format date-time */
  deadline?: string | null;
}

export interface TaskCompleted {
  completed: boolean;
}

export interface UsersExistsPost {
  /** @example "dylandoe" */
  username: string;
}

export interface UsersExistsPostResponse {
  /** @example "dylandoe" */
  username: string;
  exists: boolean;
}

export type TBadRequestError =
  | "BadRequest"
  | "InvalidUsername"
  | "InvalidEmail"
  | "InvalidPassword"
  | "MissingCredentials"
  | "MissingProperty";

export type TUnauthorizedError = "Unauthorized";

export type TForbiddenError = "Forbidden";

export type TNotFoundError = "Not found";

export type TConflictError = "Conflict" | "UsernameExists" | "EmailExists";

export type TInternalServerError = "InternalServerError";
