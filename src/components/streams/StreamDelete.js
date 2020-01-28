import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const onClickDelete = () => {
    props.deleteStream(props.stream.id);
  };

  const renderContent = () => {
    if (!props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream "${props.stream.title}"?`;
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button className="ui negative button" onClick={onClickDelete}>
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  return (
    <div>
      <Modal
        header="Delete Stream"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
