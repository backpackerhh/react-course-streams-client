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

          this.onAuthChange();

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    }

    return (
      <button className="ui green google button" onClick={this.onSignInClick}>
        <i className="google icon"></i>
        Sign In with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
