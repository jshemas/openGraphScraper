declare const fields: any;
declare const mediaMapperTwitterImage: (item: any) => {
    url: any;
    width: any;
    height: any;
    alt: any;
};
declare const mediaMapperTwitterPlayer: (item: any) => {
    url: any;
    width: any;
    height: any;
    stream: any;
};
declare const mediaMapperMusicSong: (item: any) => {
    url: any;
    track: any;
    disc: any;
};
declare const mediaMapper: (item: any) => {
    url: any;
    width: any;
    height: any;
    type: any;
};
declare const mediaSorter: (a: any, b: any) => number;
declare const mediaSorterMusicSong: (a: any, b: any) => number;
declare const zip: (array: any, ...args: any[]) => any;
