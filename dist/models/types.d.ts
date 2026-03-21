export type Nullable<T> = T | null;
export type IncludeExclude = string | string[];
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}
export interface PaginatedResponse<T> {
    data: T;
    meta?: PaginationMeta;
}
/** Ошибка валидации  параметров */
export interface CommonsV1HttpResponsesN422Content {
    errors?: {
        [key: string]: Array<string>;
    };
}
export interface CommonsV1ModelsComponentsImage {
    preview?: string;
    thumbnail?: string;
}
export type CommonsV1ModelsComponentsImageWithOptimized = CommonsV1ModelsComponentsImage & {
    optimized?: CommonsV1ModelsComponentsImage;
};
export interface CommonsV1UtilsPaginationSchemesMeta {
    pagination?: {
        total?: number;
        count?: number;
        per_page?: number;
        current_page?: number;
        total_pages?: number;
        links?: {
            previous?: string;
            next?: string;
        };
    };
}
export interface ResponsesApiV1AccountsOtpLogin {
    token?: string;
}
export interface ResponsesApiV1AccountsOtpGet {
    otp?: ModelsAccountsOtpV1Otp;
    remaining_time?: number;
}
/** Данные по OTP коду */
export interface ModelsAccountsOtpV1Otp {
    code?: string;
    user_id?: number;
    device_id?: string;
    expired_at?: string;
}
export type EnumsAccountsUsersUserSocialType = "vk" | "google" | "patreon" | "discord";
/** Тип коллекции */
export type EnumsAccountsUsersUserCollectionType = "PLANNED" | "WATCHED" | "WATCHING" | "POSTPONED" | "ABANDONED";
export type EnumsAccountsUsersUserFavoriteFilterSorting = "CREATED_AT_DESC" | "CREATED_AT_ASC" | "FRESH_AT_DESC" | "FRESH_AT_ASC" | "RATING_DESC" | "RATING_ASC" | "YEAR_DESC" | "YEAR_ASC";
export type ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings = Array<{
    value?: EnumsAnimeReleasesReleaseAgeRating;
    label?: string;
    description?: string;
}>;
export type ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres = Array<{
    id?: number;
    name?: string;
}>;
export type ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes = Array<{
    value?: EnumsAnimeReleasesReleaseType;
    description?: string;
}>;
export type ResponsesApiV1AccountsUsersMeCollectionsReferencesYears = Array<number>;
export interface ResponsesV1AccountsUsersCollectionsReleases {
    data?: Array<ModelsAnimeReleasesV1Release & {
        genres?: Array<ModelsAnimeGenresV1Genre>;
    } & {
        episodes?: Array<ModelsAnimeReleasesV1ReleaseEpisode>;
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export type ResponsesApiV1AccountsUsersMeFavoritesReferencesAgeRatings = Array<{
    value?: EnumsAnimeReleasesReleaseAgeRating;
    label?: string;
    description?: string;
}>;
export type ResponsesApiV1AccountsUsersMeFavoritesReferencesGenres = Array<{
    id?: number;
    name?: string;
}>;
export type ResponsesApiV1AccountsUsersMeFavoritesReferencesSorting = Array<{
    value?: EnumsAccountsUsersUserFavoriteFilterSorting;
    label?: string;
    description?: string;
}>;
export type ResponsesApiV1AccountsUsersMeFavoritesReferencesTypes = Array<{
    value?: EnumsAnimeReleasesReleaseType;
    description?: string;
}>;
export type ResponsesApiV1AccountsUsersMeFavoritesReferencesYears = Array<number>;
export interface ResponsesV1AccountsUsersMeFavoritesReleases {
    data?: Array<ModelsAnimeReleasesV1Release & {
        genres?: Array<ModelsAnimeGenresV1Genre>;
    } & {
        episodes?: Array<ModelsAnimeReleasesV1ReleaseEpisode>;
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export interface ResponsesV1AccountsUsersMeViewsHistory {
    data?: Array<ModelsAccountsUsersV1UserView & {
        release_episode?: ModelsAnimeReleasesV1ReleaseEpisode & {
            release?: ModelsAnimeReleasesV1Release;
        };
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export interface ResponsesV1AccountsUsersAuthLogin {
    token?: string;
}
export interface ResponsesV1AccountsUsersAuthSocialAuthenticate {
    token?: string;
}
export interface ResponsesV1AccountsUsersAuthSocialLogin {
    url?: string;
    state?: string;
}
export interface ResponsesV1AccountsUsersAuthLogout {
    token?: null;
}
/** Результат удаления релизов из коллекций */
export type ResponsesV1AccountsUsersMeCollectionsDelete = Array<ResponsesApiV1AccountsUsersMeCollectionsIdsItem>;
export type ResponsesApiV1AccountsUsersMeCollectionsIds = Array<ResponsesApiV1AccountsUsersMeCollectionsIdsItem>;
export type ResponsesApiV1AccountsUsersMeCollectionsIdsItem = number | EnumsAccountsUsersUserCollectionType;
/** Результат добавления релизов в коллекции */
export type ResponsesV1AccountsUsersMeCollectionsUpdate = Array<ResponsesApiV1AccountsUsersMeCollectionsIdsItem>;
/** Список ID релизов, оставшихся в избранном после удаления */
export type ResponsesV1AccountsUsersMeFavoritesDelete = Array<ResponsesV1AccountsUsersMeFavoritesIdsItem>;
export type ResponsesV1AccountsUsersMeFavoritesIdsItem = number;
/** Список ID релизов в избранном */
export type ResponsesV1AccountsUsersMeFavoritesIds = Array<ResponsesV1AccountsUsersMeFavoritesIdsItem>;
/** Список ID релизов в избранном */
export type ResponsesV1AccountsUsersMeFavoritesUpdate = Array<ResponsesV1AccountsUsersMeFavoritesIdsItem>;
export type ResponsesV1AccountsUsersMeViewsTimecodesItem = string | number | boolean;
export type ResponsesV1AccountsUsersMeViewsTimecodes = Array<ResponsesV1AccountsUsersMeViewsTimecodesItem>;
/** Данные по сессии пользователя */
export interface ModelsUsersV1UserSession {
    id?: string;
    user_id?: number;
    device?: {
        name?: string;
        version?: string;
        platform?: string;
    };
    browser?: {
        name?: string;
        version?: string;
    };
    location?: {
        country?: string;
        iso_code?: string;
    };
    is_mobile?: boolean;
    is_desktop?: boolean;
    ip_address?: string;
    user_agent?: string;
    is_current?: boolean;
    last_active?: string;
}
/** Данные по пользователю */
export interface ModelsUsersV1User {
    id?: number;
    login?: string;
    email?: string;
    nickname?: string;
    avatar?: CommonsV1ModelsComponentsImageWithOptimized;
    torrents?: {
        passkey?: string;
        uploaded?: number;
        downloaded?: number;
    };
    is_banned?: boolean;
    created_at?: string;
    is_with_ads?: boolean;
}
export interface ModelsAccountsUsersV1UserView {
    id?: number;
    time?: number;
    user_id?: number;
    is_watched?: boolean;
    updated_at?: string;
    release_episode_id?: string;
}
/** Позиции размещения рекламных баннеров */
export type EnumsAdsBannerPlacement = "HOME_SUPPORT" | "RELEASE_SIDEBAR";
/** Данные рекламного баннера */
export interface ModelsAdsBannersV1Banner {
    id?: number;
    title?: string;
    image?: CommonsV1ModelsComponentsImageWithOptimized;
    ad_erid?: string;
    image_url?: string;
    button_url?: string;
    placement?: EnumsAdsBannerPlacement;
    has_overlay?: boolean;
    button_title?: string;
    description?: string;
    ad_company_itn?: string;
    ad_company_name?: string;
}
/** Типы событий рекламной статистики */
export type EnumsAdsStatisticsEventType = "AD_VAST_SHOW" | "AD_VAST_REQUEST" | "AD_BANNER_VIEW" | "AD_BANNER_CLICK" | "MEDIA_PROMOTION_VIEW" | "MEDIA_PROMOTION_CLICK";
export type ResponsesApiV1AdsVasts = Array<ModelsAdsVastsV1Vast>;
/** Данные по рекламе VAST */
export interface ModelsAdsVastsV1Vast {
    id?: string;
    url?: string;
    ad_erid?: string;
    ad_company_itn?: string;
    ad_company_name?: string;
}
export type EnumsAnimeCatalogFilterProductionStatus = "IS_IN_PRODUCTION" | "IS_NOT_IN_PRODUCTION";
export type EnumsAnimeCatalogFilterPublishStatus = "IS_ONGOING" | "IS_NOT_ONGOING";
export type EnumsAnimeCatalogFilterSorting = "FRESH_AT_DESC" | "FRESH_AT_ASC" | "RATING_DESC" | "RATING_ASC" | "YEAR_DESC" | "YEAR_ASC";
export interface ResponsesApiV1AnimeCatalogReleases {
    data?: Array<ModelsAnimeReleasesV1Release & {
        genres?: Array<ModelsAnimeGenresV1Genre>;
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export type ResponsesApiV1AnimeCatalogReferencesAgeRatings = Array<{
    value?: EnumsAnimeReleasesReleaseAgeRating;
    label?: string;
    description?: string;
}>;
export type ResponsesApiV1AnimeCatalogReferencesGenres = Array<{
    id?: number;
    name?: string;
}>;
export type ResponsesApiV1AnimeCatalogReferencesProductionStatuses = Array<{
    value?: EnumsAnimeCatalogFilterProductionStatus;
    description?: string;
}>;
export type ResponsesApiV1AnimeCatalogReferencesPublishStatuses = Array<{
    value?: EnumsAnimeCatalogFilterPublishStatus;
    description?: string;
}>;
export type ResponsesV1AnimeCatalogReferencesSeasons = Array<{
    value?: EnumsAnimeReleasesReleaseSeason;
    description?: string;
}>;
export type ResponsesV1AnimeCatalogReferencesSorting = Array<{
    value?: EnumsAnimeCatalogFilterSorting;
    label?: string;
    description?: string;
}>;
export type ResponsesV1AnimeCatalogReferencesTypes = Array<{
    value?: EnumsAnimeReleasesReleaseType;
    description?: string;
}>;
/** Массив годов */
export type ResponsesV1AnimeCatalogReferencesYears = Array<number>;
export type ResponsesV1AnimeFranchises = Array<ModelsAnimeFranchisesV1Franchise>;
export type ResponsesV1AnimeFranchise = ModelsAnimeFranchisesV1Franchise & {
    franchise_releases?: Array<ModelsAnimeFranchisesV1FranchiseRelease & {
        release?: ModelsAnimeReleasesV1Release;
    }>;
};
export type ResponsesV1AnimeFranchisesRandom = Array<ModelsAnimeFranchisesV1Franchise>;
export type ResponsesV1AnimeFranchisesByRelease = Array<ModelsAnimeFranchisesV1Franchise & {
    franchise_releases?: Array<ModelsAnimeFranchisesV1FranchiseRelease & {
        release?: ModelsAnimeReleasesV1Release;
    }>;
}>;
/** Данные по релизам в франшизе */
export interface ModelsAnimeFranchisesV1FranchiseRelease {
    id?: string;
    sort_order?: number;
    release_id?: number;
    franchise_id?: string;
}
/** Данные по франшизе */
export interface ModelsAnimeFranchisesV1Franchise {
    id?: string;
    name?: string;
    name_english?: string;
    image?: CommonsV1ModelsComponentsImageWithOptimized;
    rating?: number;
    last_year?: number;
    first_year?: number;
    total_releases?: number;
    total_episodes?: number;
    total_duration?: string;
    total_duration_in_seconds?: number;
}
export type ResponsesApiV1AnimeGenres = Array<ModelsAnimeGenresV1Genre>;
export type ResponsesApiV1AnimeGenresItem = ModelsAnimeGenresV1Genre;
export type ResponsesApiV1AnimeGenresList = Array<ModelsAnimeGenresV1Genre>;
export interface ResponsesApiV1AnimeGenresReleases {
    data?: Array<ModelsAnimeReleasesV1Release>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
/** Данные по жанрам */
export interface ModelsAnimeGenresV1Genre {
    id?: number;
    name?: string;
    image?: CommonsV1ModelsComponentsImageWithOptimized;
    total_releases?: number;
}
export type EnumsAnimeReleasesReleaseAgeRating = "R0_PLUS" | "R6_PLUS" | "R12_PLUS" | "R16_PLUS" | "R18_PLUS";
export type EnumsAnimeReleasesReleasePublishDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type EnumsAnimeReleasesReleaseSeason = "winter" | "spring" | "summer" | "autumn";
export type EnumsAnimeReleasesReleaseType = "TV" | "ONA" | "WEB" | "OVA" | "OAD" | "MOVIE" | "DORAMA" | "SPECIAL";
/** Роль участника релиза */
export type EnumsAnimeReleasesReleaseMemberRole = "poster" | "timing" | "voicing" | "editing" | "decorating" | "translating";
export type ResponsesApiV1AnimeReleasesLatest = Array<ModelsAnimeReleasesV1Release & {
    genres?: Array<ModelsAnimeGenresV1Genre>;
    latest_episode?: ModelsAnimeReleasesV1ReleaseEpisode;
}>;
export type ResponsesApiV1AnimeReleasesRandom = Array<ModelsAnimeReleasesV1Release>;
export type ResponsesApiV1AnimeReleasesRecommended = Array<ModelsAnimeReleasesV1Release>;
export interface ResponsesApiV1AnimeReleasesList {
    data?: Array<ModelsAnimeReleasesV1Release & {
        genres?: Array<ModelsAnimeGenresV1Genre>;
    } & {
        members?: Array<ModelsAnimeReleasesV1ReleaseMember>;
    } & {
        episodes?: Array<ModelsAnimeReleasesV1ReleaseEpisode>;
    } & {
        torrents?: Array<ModelsAnimeTorrentsV1Torrent>;
    } & {
        sponsors?: Array<ModelsAnimeSponsorsV1Sponsor>;
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export type ResponsesApiV1AnimeReleasesRelease = ModelsAnimeReleasesV1Release & {
    genres?: Array<ModelsAnimeGenresV1Genre>;
    members?: Array<ModelsAnimeReleasesV1ReleaseMember>;
    episodes?: Array<ModelsAnimeReleasesV1ReleaseEpisode>;
    torrents?: Array<ModelsAnimeTorrentsV1Torrent>;
    sponsors?: Array<ModelsAnimeSponsorsV1Sponsor>;
};
export type ResponsesApiV1AnimeReleasesReleaseMembers = Array<ModelsAnimeReleasesV1ReleaseMember>;
export type ResponsesApiV1AnimeReleasesReleaseEpisodesTimecodes = Array<ModelsAccountsUsersV1UserView>;
export type ResponsesApiV1AnimeReleasesEpisode = ModelsAnimeReleasesV1ReleaseEpisode & {
    release?: ModelsAnimeReleasesV1Release & {
        episodes?: Array<ModelsAnimeReleasesV1ReleaseEpisode>;
    };
};
export type ResponsesApiV1AnimeReleasesEpisodeTimecode = ModelsAccountsUsersV1UserView;
/** Роль участника релиза */
export interface ModelsAnimeReleasesV1ReleaseMemberRole {
    value?: EnumsAnimeReleasesReleaseMemberRole;
    description?: string;
}
/** Участник релиза */
export interface ModelsAnimeReleasesV1ReleaseMember {
    id?: string;
    role?: ModelsAnimeReleasesV1ReleaseMemberRole;
    user?: ModelsAnimeReleasesV1ReleaseMemberUser;
    nickname?: string;
}
/** Краткая информация о пользователе */
export interface ModelsAnimeReleasesV1ReleaseMemberUser {
    id?: number;
    avatar?: CommonsV1ModelsComponentsImageWithOptimized;
}
/** Тип релиза */
export interface ModelsAnimeReleasesV1ReleaseType {
    value?: EnumsAnimeReleasesReleaseType;
    description?: string;
}
/** Название релиза */
export interface ModelsAnimeReleasesV1ReleaseName {
    main?: string;
    english?: string;
    alternative?: string;
}
/** Сезон релиза */
export interface ModelsAnimeReleasesV1ReleaseSeason {
    value?: EnumsAnimeReleasesReleaseSeason;
    description?: string;
}
/** Возрастное ограничение */
export interface ModelsAnimeReleasesV1ReleaseAgeRating {
    value?: EnumsAnimeReleasesReleaseAgeRating;
    label?: string;
    is_adult?: boolean;
    description?: string;
}
/** День выхода релиза */
export interface ModelsAnimeReleasesV1ReleasePublishDay {
    value?: EnumsAnimeReleasesReleasePublishDay;
    description?: string;
}
/** Данные по релизу */
export interface ModelsAnimeReleasesV1Release {
    id?: number;
    type?: ModelsAnimeReleasesV1ReleaseType;
    year?: number;
    name?: ModelsAnimeReleasesV1ReleaseName;
    alias?: string;
    season?: ModelsAnimeReleasesV1ReleaseSeason;
    poster?: CommonsV1ModelsComponentsImageWithOptimized;
    fresh_at?: string;
    created_at?: string;
    updated_at?: string;
    is_ongoing?: boolean;
    age_rating?: ModelsAnimeReleasesV1ReleaseAgeRating;
    publish_day?: ModelsAnimeReleasesV1ReleasePublishDay;
    description?: string;
    notification?: string;
    episodes_total?: number;
    external_player?: string;
    is_in_production?: boolean;
    is_blocked_by_geo?: boolean;
    is_blocked_by_copyrights?: boolean;
    added_in_users_favorites?: number;
    average_duration_of_episode?: number;
    added_in_planned_collection?: number;
    added_in_watched_collection?: number;
    added_in_watching_collection?: number;
    added_in_postponed_collection?: number;
    added_in_abandoned_collection?: number;
}
/** Тайминги пропуска опенинга или эндинга */
export interface ModelsAnimeReleasesV1ReleaseEpisodeSkip {
    start?: number;
    stop?: number;
}
/** Эпизод релиза */
export interface ModelsAnimeReleasesV1ReleaseEpisode {
    id?: string;
    name?: string;
    ordinal?: number;
    ending?: ModelsAnimeReleasesV1ReleaseEpisodeSkip;
    opening?: ModelsAnimeReleasesV1ReleaseEpisodeSkip;
    preview?: CommonsV1ModelsComponentsImageWithOptimized;
    hls_480?: string;
    hls_720?: string;
    hls_1080?: string;
    duration?: number;
    rutube_id?: string;
    youtube_id?: string;
    updated_at?: string;
    sort_order?: number;
    release_id?: number;
    name_english?: string;
}
export interface ResponsesV1AnimeScheduleNow {
    today?: Array<ModelsAnimeScheduleV1ReleaseInSchedule>;
    tomorrow?: Array<ModelsAnimeScheduleV1ReleaseInSchedule>;
    yesterday?: Array<ModelsAnimeScheduleV1ReleaseInSchedule>;
}
export interface ResponsesV1AnimeScheduleWeek {
    data?: Array<ModelsAnimeScheduleV1ReleaseInSchedule>;
}
/** Данные по релизу в расписании */
export interface ModelsAnimeScheduleV1ReleaseInSchedule {
    release?: ModelsAnimeReleasesV1Release;
    full_season_is_released?: boolean;
    published_release_episode?: ModelsAnimeReleasesV1ReleaseEpisode;
    next_release_episode_number?: number;
}
/** Данные по спонсорам */
export interface ModelsAnimeSponsorsV1Sponsor {
    id?: string;
    title?: string;
    description?: string;
    url_title?: string;
    url?: string;
}
/** Список возможных значений кодека видеодорожки в торренте */
export type EnumsAnimeTorrentsTorrentCodec = "AV1" | "x264/AVC" | "x265/HEVC" | "x265hq/HEVC-HQ";
/** Список возможных значений глубины цвета видеодорожки */
export type EnumsAnimeTorrentsTorrentColor = "8bit" | "10Bit";
/** Список возможных значений качества видео в торренте */
export type EnumsAnimeTorrentsTorrentQuality = "360p" | "480p" | "576p" | "720p" | "1080p" | "2k" | "4k" | "8k";
/** Список возможных значений источника видео (тип релиза) */
export type EnumsAnimeTorrentsTorrentType = "BDRip" | "HDRip" | "TVRip" | "WEBRip" | "DTVRip" | "DVDRip" | "HDTVRip" | "WEB-DL" | "WEB-DLRip";
/** Список ролей участников торрента */
export type EnumsAnimeTorrentsTorrentMemberRole = "HEVC";
export interface ResponsesApiV1AnimeTorrents {
    data?: Array<ModelsAnimeTorrentsV1Torrent & {
        torrent_members?: Array<ModelsAnimeTorrentsV1TorrentMember & {
            user?: ModelsAnimeTorrentsV1TorrentMemberUser;
        }>;
    } & {
        release?: ModelsAnimeReleasesV1Release;
    }>;
    meta?: CommonsV1UtilsPaginationSchemesMeta;
}
export type ResponsesApiV1AnimeTorrent = ModelsAnimeTorrentsV1Torrent & {
    torrent_members?: Array<ModelsAnimeTorrentsV1TorrentMember & {
        user?: ModelsAnimeTorrentsV1TorrentMemberUser;
    }>;
} & {
    release?: ModelsAnimeReleasesV1Release;
};
export type ResponsesApiV1AnimeTorrentsReleaseTorrents = Array<ModelsAnimeTorrentsV1Torrent & {
    torrent_members?: Array<ModelsAnimeTorrentsV1TorrentMember & {
        user?: ModelsAnimeTorrentsV1TorrentMemberUser;
    }>;
} & {
    release?: ModelsAnimeReleasesV1Release;
}>;
/** Роль, которую выполняет участник торрента */
export interface ModelsAnimeTorrentsV1TorrentMemberRole {
    value?: EnumsAnimeTorrentsTorrentMemberRole;
    description?: string;
}
/** Данные по участнику торрента */
export interface ModelsAnimeTorrentsV1TorrentMember {
    id?: string;
    role?: ModelsAnimeTorrentsV1TorrentMemberRole;
    nickname?: string;
    external_url?: string;
}
/** Данные по связанному с участником торрента пользователю */
export interface ModelsAnimeTorrentsV1TorrentMemberUser {
    id?: number;
    avatar?: CommonsV1ModelsComponentsImageWithOptimized;
}
/** Тип источника видео в торренте */
export interface ModelsAnimeTorrentsV1TorrentType {
    value?: EnumsAnimeTorrentsTorrentType;
    description?: string;
}
/** Качество видеодорожки в торренте */
export interface ModelsAnimeTorrentsV1TorrentQuality {
    value?: EnumsAnimeTorrentsTorrentQuality;
    description?: string;
}
/** Информация о кодеке видео в торренте */
export interface ModelsAnimeTorrentsV1TorrentCodec {
    value?: EnumsAnimeTorrentsTorrentCodec;
    label?: string;
    description?: string;
    label_color?: string;
    label_is_visible?: boolean;
}
/** Цветовая глубина видеодорожки в торренте */
export interface ModelsAnimeTorrentsV1TorrentColor {
    value?: EnumsAnimeTorrentsTorrentColor;
    description?: string;
}
/** Данные по торренту */
export interface ModelsAnimeTorrentsV1Torrent {
    id?: number;
    hash?: string;
    size?: number;
    type?: ModelsAnimeTorrentsV1TorrentType;
    color?: ModelsAnimeTorrentsV1TorrentColor;
    codec?: ModelsAnimeTorrentsV1TorrentCodec;
    label?: string;
    quality?: ModelsAnimeTorrentsV1TorrentQuality;
    magnet?: string;
    filename?: string;
    seeders?: number;
    bitrate?: number;
    leechers?: number;
    sort_order?: number;
    updated_at?: string;
    is_hardsub?: boolean;
    description?: string;
    created_at?: string;
    completed_times?: number;
}
export type ResponsesApiV1AppSearchReleases = Array<ModelsAnimeReleasesV1Release>;
export interface ResponsesV1AppStatus {
    request?: {
        ip?: string;
        country?: string;
        iso_code?: string;
        timezone?: string;
    };
    is_alive?: boolean;
    available_api_endpoints?: Array<string>;
}
export interface ResponsesV1MediaPromotions {
    data?: Array<ModelsMediaPromotionsV1Promotion>;
}
/** Данные по промо-материалам */
export interface ModelsMediaPromotionsV1Promotion {
    id?: string;
    url?: string;
    url_label?: string;
    image?: CommonsV1ModelsComponentsImageWithOptimized;
    title?: string;
    description?: string;
    is_ad?: boolean;
    ad_erid?: string;
    ad_origin?: string;
    release?: ModelsAnimeReleasesV1Release;
    has_overlay?: boolean;
}
/** Перечисление типов источников видео */
export type EnumsMediaVideosVideoOriginType = "YOUTUBE_PLAYLIST";
export interface ResponsesV1MediaVideos {
    data?: Array<ModelsMediaVideosV1VideoContent & {
        origin?: ModelsMediaVideosV1VideoOrigin;
    }>;
}
/** Данные по видео роликам */
export interface ModelsMediaVideosV1VideoContent {
    id?: number;
    url?: string;
    title?: string;
    views?: number;
    image?: CommonsV1ModelsComponentsImageWithOptimized;
    comments?: number;
    video_id?: string;
    created_at?: string;
    updated_at?: string;
    is_announce?: boolean;
}
/** Тип источника видео */
export interface ModelsMediaVideosV1VideoOriginType {
    value?: EnumsMediaVideosVideoOriginType;
    description?: string;
}
/** Данные по видео-источнику */
export interface ModelsMediaVideosV1VideoOrigin {
    id?: string;
    url?: string;
    type?: ModelsMediaVideosV1VideoOriginType;
    title?: string;
    description?: string;
    is_announce?: boolean;
}
export type ResponsesApiV1Teams = Array<ModelsTeamsV1Team>;
export type ResponsesApiV1TeamsRoles = Array<ModelsTeamsV1TeamRole>;
export type ResponsesApiV1TeamsUsers = Array<ModelsTeamsV1TeamUser & {
    team?: ModelsTeamsV1Team;
} & {
    user?: ModelsTeamsV1TeamUserAccount;
} & {
    roles?: Array<ModelsTeamsV1TeamRole>;
}>;
/** Данные по роли в команде */
export interface ModelsTeamsV1TeamRole {
    id?: string;
    title?: string;
    color?: string;
    sort_order?: number;
}
/** Данные по анилибрийцу */
export interface ModelsTeamsV1TeamUser {
    id?: string;
    nickname?: string;
    is_intern?: boolean;
    sort_order?: number;
    is_vacation?: boolean;
}
/** Данные по аккаунту пользователю */
export interface ModelsTeamsV1TeamUserAccount {
    id?: number;
    nickname?: string;
    avatar?: CommonsV1ModelsComponentsImageWithOptimized;
}
/** Данные по команде */
export interface ModelsTeamsV1Team {
    id?: string;
    title?: string;
    sort_order?: number;
    description?: string;
}
export interface RequestOptions {
    signal?: AbortSignal;
    retries?: number;
    headers?: Record<string, string>;
}
export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface IncludeExcludeParams {
    include?: IncludeExclude;
    exclude?: IncludeExclude;
}
export interface OtpGetRequest {
    device_id: string;
}
export interface OtpAcceptRequest {
    code: number;
}
export interface OtpLoginRequest {
    code: number;
    device_id: string;
}
export interface UserLoginRequest {
    login: string;
    password: string;
}
export interface SocialAuthenticateQuery {
    state: string;
}
export interface PasswordForgetRequest {
    email: string;
}
export interface PasswordResetRequest {
    token: string;
    password: string;
    password_confirmation: string;
}
export interface UserProfileQuery extends IncludeExcludeParams {
}
export interface ViewHistoryQuery extends PaginationParams, IncludeExcludeParams {
}
export interface ViewTimecodeUpsertItem {
    time: number;
    is_watched: boolean;
    release_episode_id: string;
}
export interface ViewTimecodeDeleteItem {
    release_episode_id: string;
}
export interface CollectionsReleasesFilter {
    genres?: string;
    types?: Array<EnumsAnimeReleasesReleaseType>;
    years?: string;
    search?: string;
    age_ratings?: Array<EnumsAnimeReleasesReleaseAgeRating>;
}
export interface CollectionsReleasesQuery extends PaginationParams, IncludeExcludeParams {
    type_of_collection: EnumsAccountsUsersUserCollectionType;
    'f[genres]'?: string;
    'f[types]'?: Array<EnumsAnimeReleasesReleaseType>;
    'f[years]'?: string;
    'f[search]'?: string;
    'f[age_ratings]'?: Array<EnumsAnimeReleasesReleaseAgeRating>;
}
export interface CollectionsReleasesRequest extends PaginationParams, IncludeExcludeParams {
    type_of_collection?: EnumsAccountsUsersUserCollectionType;
    f?: CollectionsReleasesFilter;
}
export interface CollectionMutationItem {
    release_id: number;
    type_of_collection: EnumsAccountsUsersUserCollectionType;
}
export interface CollectionDeleteItem {
    release_id: number;
}
