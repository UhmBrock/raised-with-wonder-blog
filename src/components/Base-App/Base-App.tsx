import React from 'react';
import Navbar from '../NavBar/Navbar';

interface BaseAppProps {

}

interface BaseAppState {

}

export default class BaseApp extends React.Component<BaseAppProps, BaseAppState> {


    render() {
        return (
            <Navbar />
        )
    }
}