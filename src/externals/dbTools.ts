import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosPromise } from 'axios';
import Config from './config';
import Axios from 'axios';
import { response } from 'express';
import { blogPost } from '../../rww-backend/dbTypes';

export class dbRequest {

    public static getBlog(title: string): AxiosPromise<blogPost> {

        return Axios(
            { 
                method: "GET", 
                baseURL: Config.getBackendURL(), 
                responseType: "json",
                url: `/blog/${title}`,
            }
        );

    }
}

export class dbUtilities {

    // Converts a title to a URL compatible format
    // TODO Flesh this out for all characters
    public static serializeTitle(title: string): string {

        let serializedTitle = title.split(" ").join("-");

        return serializedTitle;
    }

    // Converts a title from a URL compatible format to a readable format
    // TODO Flesh this out for all characters
    public static deserializeTitle(title: string): string {

        let deserializedTitle = title.split("-").join(" ");

        return deserializedTitle;
    }

    //Converts a JS Date/Time to Database format
    public static serializeDate(date: Date): string {        
    
        // toISOString converts to UTC, this offsets that. 
        const timezoneOffset_hours = date.getTimezoneOffset() / 60;
        date.setHours(date.getHours() - timezoneOffset_hours);
        
        return date.toISOString();

    }

    //Converts a database Date/Time to JS format
    public static deserializeDate(dateString: string): Date {        
    
        // dateString is in format YYYY-MM-DDTHH:MM:SS.mmmZ
        const [ date, time ] = dateString.split("T");

        const [ year, month, day] = date.split("-");
        const [ hour, minute, second ] = time.split(".")[0].split(":");

        // month -1 due to 0-based index
        return new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));

    }

    //Converts a database Date/Time to pretty date format
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

    //Converts a database Date/Time to pretty time format
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