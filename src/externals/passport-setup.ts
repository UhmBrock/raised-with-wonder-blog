import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import passportInstagram from 'passport-instagram';
import passport from 'passport';

import { config } from 'dotenv';
import { userInfo } from 'os';

const result = config();

if(result.error) {
    throw result.error;
}

const BASE_URL = "https://raisedwithwonder.com";

const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const Instagramtrategy = passportInstagram.Strategy;


/**
 * Sign in using Facebook
 */
passport.use(new FacebookStrategy(
    {
        clientID: process.env.FB_CLIENT_ID!,
        clientSecret: process.env.FB_CLIENT_SECRET!,
        callbackURL: "/auth/facebook/cb",
        profileFields: ["name", "email", "link", "locale", "timezone"],
        passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {

        // See https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts 
        // for more info implementing this method.

        // Handle singing in / creating account here.
        console.log(req)
    }
));

/**
 * Sign in using Google
 */
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `/auth/google/cb`,
        passReqToCallback: true 
    },
    (req, accessToken, refreshToken, profile, done) => {

        // Handle signing in / creating account here

    }
));