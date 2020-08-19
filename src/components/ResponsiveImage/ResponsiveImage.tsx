import React from 'react';
import '../../css/ResponsiveImage.scss';

interface ResponsiveImageProps {
    elementID?: string;
    additionalClasses?: string;
    src: string;
}

interface ResponsiveImageState {

}

export default class ResponsiveImage extends React.Component<ResponsiveImageProps, ResponsiveImageState> { 
    render() {
        return ( 
            <img id={this.props.elementID} className={"responsive " + this.props.additionalClasses}  src={this.props.src} alt="raised with wonder banner"/>
        )
    }
}