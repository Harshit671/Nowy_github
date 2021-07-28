import React from "react";

export function requireAuthentication(Component) {
    return class AuthenticatedComponent extends React.Component {

        /**
         * Check if the user is authenticated, this.props.isAuthenticated
         * has to be set from your application logic (or use react-redux to retrieve it from global state).
         */
        isAuthenticated = () => {
            const userName = localStorage.getItem("userName");

            return !!userName;
        }

        /**
         * Render
         */
        render() {
            const loginErrorMessage = (
                <div>
                    Please <a href="/login">login</a> in order to view this part of the application.
                </div>
            );

            return (
                <div>
                    {this.isAuthenticated() === true ? <Component {...this.props} /> : loginErrorMessage}
                </div>
            );
        }
    };
}

export default requireAuthentication;