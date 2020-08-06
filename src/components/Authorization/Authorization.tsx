import React, { FunctionComponent, useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Axios, {AxiosResponse, AxiosError} from 'axios';


interface Auth_Props {

}

const Authorization: FunctionComponent<Auth_Props> = () => {

    // The 'path' lets us build <Route> paths that are relative to the parent route, 
    // while the 'url' lets us build relative links
    let { path, url } = useRouteMatch();
    let [state, setState] = useState({ authorizer: "" })
    return (
        <div>
            <h2>Authorization Page</h2>
            <p>{state.authorizer}</p>
            <Switch>
                    
                <Route path={`${path}/google`}>
                    <Link to="/auth/login">Return to auth</Link>
                </Route>
                <Route path={`${path}/facebook`}>
                    One the facebook page<br/>
                    <Link to="/auth/login">Return to auth</Link>
                </Route>
                <Route path={`${path}/instagram`}>
                    On the instagram page<br/>
                    <Link to="/auth/login">Return to auth</Link>
                </Route>

                <Route path={`${path}/login`}>
                    {renderLoginPage(path)}
                </Route>

                <Route path={`${path}/logout`}>
                    On the log out page<br/>
                    <Link to="/auth/login">Return to auth</Link>
                </Route>

            </Switch>

        </div>
    );
}

function renderLoginPage(path: string): JSX.Element { 

    return (
        <ul>
                <li>
                    <Link to={`${path}/google`}>
                        Log in with Google
                    </Link>
                </li>
                <li>
                    <Link to={`${path}/facebook`}>
                        Log in with Facebook
                    </Link>
                </li>
                <li>
                    <Link to={`${path}/instagram`}>
                        Log in with Instagram
                    </Link>
                </li>
            </ul>
    );
}

export default Authorization;