export interface Album {
    __typename?: "Album";
    id: string;
    name: string;
    pics: Array<Pic>;
}

export interface CreateAlbumInput {
    __typename?: "CreateAlbumInput";
    name: string;
}

export interface CreatePicInput {
    __typename?: "CreatePicInput";
    albumId: string;
    original: string;
    processed: string;
}

export interface Mutation {
    __typename?: "Mutation";
    createAlbum: Album;
    createPic: Pic;
    deleteAlbum: Album;
    deletePic: Pic;
    updateAlbum: Album;
    updatePic: Pic;
}

export interface Pic {
    __typename?: "Pic";
    album: Album;
    albumId: string;
    id: string;
    original: string;
    processed: string;
}

export interface Query {
    __typename?: "Query";
    album?: Album| null;
    albums: Album[];
    pic?: Pic| null;
    pics: Pic[];
    redwood?: Redwood| null;
}

export interface Redwood {
    __typename?: "Redwood";
    currentUser?: JSON| null;
    prismaVersion?: string| null;
    version?: string| null;
}

export interface UpdateAlbumInput {
    __typename?: "UpdateAlbumInput";
    name?: string| null;
}

export interface UpdatePicInput {
    __typename?: "UpdatePicInput";
    albumId?: string| null;
    original?: string| null;
    processed?: string| null;
}

type JSON = any;
