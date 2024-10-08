import type { Album as PAlbum, Pic as PPic, Tag as PTag } from "@prisma/client";

// You may very reasonably ask yourself, 'what is this file?' and why do I need it.

// Roughly, this file ensures that when a resolver wants to return a type - that
// type will match a prisma model. This is useful because you can trivially extend
// the type in the SDL and not have to worry about type mis-matches because the thing
// you returned does not include those functions.

// This gets particularly valuable when you want to return a union type, an interface, 
// or a model where the prisma model is nested pretty deeply (GraphQL connections, for example.)
export interface Albums {
    __typename?: "Albums";
    albumCount: number;
    albums: PAlbum[];
}

export interface CreateAlbumInput {
    __typename?: "CreateAlbumInput";
    name: string;
}

export interface CreatePicInput {
    __typename?: "CreatePicInput";
    albumId: ID;
    original: File;
}

export interface CreatePicsInput {
    __typename?: "CreatePicsInput";
    albumId: ID;
    originals: File[];
}

export interface CreateTagInput {
    __typename?: "CreateTagInput";
    name: string;
}

export interface History {
    __typename?: "History";
    albumId: string;
    attempts: number;
    createdAt: DateTime;
    description?: string| null;
    durationSeconds?: number| null;
    format?: string| null;
    height?: number| null;
    id: ID;
    jobPicId: string;
    lastError?: string| null;
    lockedAt?: DateTime| null;
    lockedBy?: string| null;
    name: string;
    original?: string| null;
    picId: string;
    priority: number;
    queue: string;
    runAt?: DateTime| null;
    status?: string| null;
    thumbnail?: string| null;
    updatedAt?: DateTime| null;
    width?: number| null;
    withoutBackground?: string| null;
}

export interface JobCount {
    __typename?: "JobCount";
    id: ID;
    jobCount: number;
    name: string;
}

export interface Mutation {
    __typename?: "Mutation";
    createAlbum: PAlbum;
    createPic: PPic;
    createPics: PPic[];
    createTag: PTag;
    deleteAlbum: PAlbum;
    deletePic: PPic;
    deleteTag: PTag;
    onBackgroundRemoved: PPic;
    onTagsCreated: PPic;
    onThumbnailCreated: PPic;
    updateAlbum: PAlbum;
    updatePic: PPic;
    updateTag: PTag;
}

export interface OnBackgroundRemovedInput {
    __typename?: "OnBackgroundRemovedInput";
    id: ID;
    secret: string;
}

export interface OnTagsCreatedInput {
    __typename?: "OnTagsCreatedInput";
    id: ID;
    secret: string;
}

export interface OnThumbnailCreatedInput {
    __typename?: "OnThumbnailCreatedInput";
    id: ID;
    secret: string;
}

export interface PaginatedItems {
    __typename?: "PaginatedItems";
    count: number;
    limit: number;
    page: number;
}

export interface PaginatedPics {
    __typename?: "PaginatedPics";
    count: number;
    items?: Array<PPic| null>| null;
    limit: number;
    page: number;
}

export interface Query {
    __typename?: "Query";
    album?: PAlbum| null;
    albums: Albums;
    getRedwoodUploadToken: RedwoodUploadToken;
    histories: History[];
    jobCount: JobCount[];
    pic?: PPic| null;
    pics: PPic[];
    redwood?: Redwood| null;
    search?: PaginatedPics| null;
    tag?: PTag| null;
    tags: PTag[];
}

export interface Redwood {
    __typename?: "Redwood";
    currentUser?: JSON| null;
    prismaVersion?: string| null;
    version?: string| null;
}

export interface RedwoodUploadToken {
    __typename?: "RedwoodUploadToken";
    token: string;
}

export interface UpdateAlbumInput {
    __typename?: "UpdateAlbumInput";
    name?: string| null;
}

export interface UpdatePicInput {
    __typename?: "UpdatePicInput";
    albumId?: ID| null;
    original?: File| null;
}

export interface UpdateTagInput {
    __typename?: "UpdateTagInput";
    name?: string| null;
}

export interface VerifyWebhookInput {
    __typename?: "VerifyWebhookInput";
    id: ID;
    secret: string;
}

type ID = any;
type File = any;
type DateTime = any;
type JSON = any;
export type Album = PAlbum;
export type Pic = PPic;
export type Tag = PTag;
