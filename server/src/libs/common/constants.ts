export const REFRESH_TOKEN = 'refresh_token';
export const ACCESS_TOKEN = 'access_token';
export const SERVER_FILES_DIST = 'uploads';
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3001'
    : 'http://localhost:3333';
export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
