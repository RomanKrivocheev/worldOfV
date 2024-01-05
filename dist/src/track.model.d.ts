export declare class Track {
    id: number;
    name: string;
    price: number;
    duration: number;
    genre: string;
}
export declare class GetTracksInput {
    artistName: string;
    genreName: string;
    minPrice: number;
    maxPrice: number;
    page: number;
    pageSize: number;
}
