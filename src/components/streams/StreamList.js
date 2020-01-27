import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStreams } from "../../actions";

const StreamList = props => {
  useEffect(() => {
    props.fetchStreams();
  }, []);

  const renderList = () => {
    return props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}

          <i className="large middle aligned icon camera"></i>

          <div className="content">
            {stream.title}

            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderAdmin = stream => {
    if (stream.userId === props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
