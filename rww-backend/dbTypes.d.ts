export interface blogPost {
    id?: number,
    title: string,
    html: string,
    date_created: string,
    date_modified: string
    [index: string]: string | number
}

