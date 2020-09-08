import { AxiosPromise } from 'axios';
import Config from './config';
import Axios from 'axios';
import { blogPost, tag, publishing_location } from '../../rww-backend/dbTypes';

export class dbRequest {

    /**
     * All DB methods for handling Blogs
     */
    public static Blogs = {
        /**
         * Gets the specific blog, found by filtering for title
         * @param title The title of the blog in pretty format
         */
        get(title: string): AxiosPromise<blogPost> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/blog/${title}`,
                }
            );
    
        },
    
        /**
         * Gets all blogs, no conditions
         */
        getAll(): AxiosPromise<blogPost[]> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/blog/all`,
                }
            );
    
        },

        /**
         * Gets the IDs of the locations the blog is published in
         */
        getPublishedLocations(title: string): AxiosPromise<publishing_location[]> {

            return Axios(
                {
                    method: "GET",
                    baseURL: Config.getBackendURL(),
                    responseType: "json",
                    url: `/blog/${title}/publishedIn`
                }
            );

        }



    };   

    /**
     * All DB methods for handling tags
     */
    public static Tags = {

        /**
         * Gets the specific tag, found by filtering for id
         * @param id The id of the tag
         */
        get(id: number): AxiosPromise<tag> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/tag/${id}`,
                }
            );
    
        },
    
        /**
         * Gets all tags, no conditions
         */
        getAll(): AxiosPromise<tag[]> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/tag/all`,
                }
            );
    
        }

    };

    public static PublishLocations = {

        /**
         * Gets the specific tag, found by filtering for id
         * @param id The id of the tag
         */
        get(id: number): AxiosPromise<publishing_location> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/publish/${id}`,
                }
            );
    
        },
    
        /**
         * Gets all tags, no conditions
         */
        getAll(): AxiosPromise<publishing_location[]> {
    
            return Axios(
                { 
                    method: "GET", 
                    baseURL: Config.getBackendURL(), 
                    responseType: "json",
                    url: `/publish/all`,
                }
            );
    
        }

    }

}

export class dbUtilities {

    // TODO Flesh this out for all characters
    /**
     * Converts a title to a URL compatible format
     */
    public static serializeTitle(title: string): string {

        let serializedTitle = title.split(" ").join("-");

        return serializedTitle;
    }

    // TODO Flesh this out for all characters
    /**
     * Converts a title from a URL compatible format to a readable format 
     */ 
    public static deserializeTitle(title: string): string {

        let deserializedTitle = title.split("-").join(" ");

        return deserializedTitle;
    }

    /**
     * Converts a JS Date/Time to Database format
     */
    public static serializeDate(date: Date): string {        
    
        // toISOString converts to UTC, this offsets that. 
        // const timezoneOffset_hours = date.getTimezoneOffset() / 60;
        // date.setHours(date.getHours() - timezoneOffset_hours);
        
        return date.toISOString();

    }

    /**
     * Converts a database Date/Time to JS format
     */
    public static deserializeDate(dateString: string): Date {        
    
        // dateString is in format YYYY-MM-DDTHH:MM:SS.mmmZ
        const [ date, time ] = dateString.split("T");

        const [ year, month, day] = date.split("-");
        const [ hour, minute, second ] = time.split(".")[0].split(":");

        // month -1 due to 0-based index
        return new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));

    }

    /**
     * Converts a database Date/Time to pretty date format
     */
    public static getPrettyDate(dateString: string, separator: string = "/"): string { 

        const date = this.deserializeDate(dateString);

        let prettyDate = "";

        prettyDate += date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        prettyDate += separator;
        prettyDate += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        prettyDate += separator;
        prettyDate += date.getFullYear();
        
        return prettyDate;
    }

    /**
     * Converts a database Date/Time to pretty time format
     */
    public static getPrettyTime(dateString: string, showPeriodIndicator: boolean = true): string {

        const date = this.deserializeDate(dateString);

        let prettyTime = "";
        
        prettyTime += date.getHours() % 12 + ":";
        prettyTime += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if(showPeriodIndicator){
            prettyTime += " " + (date.getHours() >= 12 ? "PM" : "AM");
        }

        return prettyTime;
    }

}

export class dbDefaults {
    /**
     * The default values for a new blogPost. Defined here for consistency across the web app.
     */
    public static blogPost_default(): blogPost {
        return {
            // No ID by default
            title: "BlogPost " + new Date().toISOString(),
            featured_image: "",
            excerpt: "",
            html: "",
            date_created: dbUtilities.serializeDate(new Date()),
            date_modified: dbUtilities.serializeDate(new Date())
        }
    }

    public static tag_default(): tag {
        return {
            tag_name: ""
        }
    }

    public static publishing_location_default(): publishing_location {
        return {
            location_name: ""
        }
    }
}