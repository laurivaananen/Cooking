import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router'

{/* <Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/> */}

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        // componentWillMount () {
        //     this.checkAuth(this.props.isAuthenticated);
        // }

        // componentWillReceiveProps (nextProps) {
        //     this.checkAuth(nextProps.isAuthenticated);
        // }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                console.log(redirectAfterLogin);
                console.log("NOT AUTHENTICATED");
                return(
                  <Redirect to={`/login?next=${redirectAfterLogin}`} />
                )
                // this.props
                    // .dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        render () {
            let redirectAfterLogin = this.props.location.pathname;
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : <Redirect to={`/login?next=${redirectAfterLogin}`} />
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}