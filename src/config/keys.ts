import RefreshToken from "../models/organization/refreshToken"

export const MONGO_URI: string = process.env.MONGO_URI ||
'mongodb+srv://dor:jWaCcrXZ9KUGeoaZ@local.otjgm.mongodb.net/dor-flix?retryWrites=true&w=majority'

export const PORT: string = process.env.PORT || '3100'
export const IS_PROD: boolean = process.env.NODE_ENV === 'production'
export const TWOFA: boolean = process.env.TWOFA ? process.env.TWOFA === 'true' : false // system has 2fa on user login

export const SECRET_KEY: string = process.env.SECRET_KEY || '70BD3BC91244210A68A01743314124241D0ABAEA49232142413214F82BC994F6B733E66404D972421418011421E02E24ED9'

export const LOGIN_RETRY_LIMIT: number = process.env.LOGIN_RETRY_LIMIT ? parseInt(process.env.LOGIN_RETRY_LIMIT) : 5

export const MONGO_COLLECTIONS = {
    Organizations: 'Organizations'.toLowerCase(),
    UserPermissions: 'UserPermissions'.toLowerCase(),
    Users: 'Users'.toLowerCase(),
    RefreshTokens: 'RefreshTokens'.toLowerCase(),
    TwofaCodes: 'TwofaCodes'.toLowerCase(),
    UserAuthorizedIPs: 'UserAuthorizedIPs'.toLowerCase(),
    UserLogs: 'UserLogs'.toLowerCase(),
    Logs: 'Logs'.toLowerCase(),
    LoginBlocks: 'LoginBlocks'.toLowerCase(),
    LoginTokens: 'LoginTokens'.toLowerCase(),

    Courses: 'Courses'.toLowerCase(),
    Seasons: 'Seasons'.toLowerCase(),
    Episodes: 'Episodes'.toLowerCase(),
    SubEpisodes: 'SubEpisodes'.toLowerCase(),
    PersonalNotes: 'PersonalNotes'.toLowerCase(),
    Comments: 'Comments'.toLowerCase(),
    Lecturers: 'Lecturers'.toLowerCase(),
    UserPositions: 'UserPositions'.toLowerCase(),
    ViewedSubEpisodes: 'ViewedSubEpisodes'.toLowerCase(),
    ViewedEpisodes: 'ViewedEpisodes'.toLowerCase(),
    CurrentEpisodes: 'CurrentEpisodes'.toLowerCase(),
    Bookmarks: 'Bookmarks'.toLowerCase(),
    LastSeen: 'LastSeen'.toLowerCase(),
    Trailer: 'Trailer'.toLowerCase(),
    RefreshToken: 'RefreshTokens'.toLowerCase(),
}//