export enum newsType {
    TOPSTORIES="topstories",
    STORY="story",
    USERS="users"
}

export enum newsFilter {
    TITLE="title",
    TIME="time",
    AUTHOR="by"
}

export interface story {
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>
    score: number,
    text?: string,
    time: number,
    title: string,
    type: string,
    karma?: number,
    url?: string
}