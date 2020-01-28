import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const streamId = this.props.match.params.id;

    this.props.fetchStream(streamId);
    this.buildPlayerIfPossible();
  }

  componentDidUpdate() {
    this.buildPlayerIfPossible();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayerIfPossible() {
    if (this.player || !this.props.stream) {
      return;
    }

    const streamId = this.props.match.params.id;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${streamId}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls></video>

        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
