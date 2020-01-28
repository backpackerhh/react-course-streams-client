import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  const onSubmit = formValues => {
    console.log(formValues);
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Update Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
