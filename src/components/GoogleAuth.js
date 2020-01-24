import React from "react";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      const GOOGLE_AUTH_CLIENT_ID =
        "43407888647-lpscpjoaiu12ehtq1m808kksahegjrua.apps.googleusercontent.com";

      window.gapi.client
        .init({
          clientId: GOOGLE_AUTH_CLIENT_ID,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn) {
      return <div>I am signed in</div>;
    }

    return <div>I am not signed in</div>;
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
