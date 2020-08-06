

const dev_mode = true;

export default class Config {


    public static getBackendURL() {
        if(dev_mode){
            return 'http://localhost:5000';
        } else {
            return 'https://raisedwithwonder.com';
        }
    }

    public static getFrontendURL() {
        if(dev_mode){
            return 'http://localhost:3000';
        } else {
            return 'https://raisedwithwonder.com';
        }
    }
}