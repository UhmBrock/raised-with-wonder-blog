export interface blogPost {
    id?: number,
    title: string,
    excerpt: string,
    featured_image: string,
    html: string,
    date_created: string,
    date_modified: string
    [index: string]: string | number
}

export interface tag {
    id?: number;
    tag_name: string;
    [index: string]: string | number
}

export interface publishing_location {
    id?: number;
    location_name: string;
}

export interface blog_m2m_publishing {
    blogID: number;
    locationID: number;
}