import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="body1">User not found.</Typography>;
  }

  return (
    <div className="user-detail">
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Divider />
      <Typography variant="body1" className="user-detail-field">
        <strong>Occupation: </strong>
        {user.occupation}
      </Typography>
      <Typography variant="body1" className="user-detail-field">
        <strong>Location: </strong>
        {user.location}
      </Typography>
      <Typography variant="body1" className="user-detail-field">
        <strong>Description: </strong>
        {user.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/photos/${user._id}`}
        className="user-detail-photos-button"
      >
        View Photos of {user.first_name}
      </Button>
    </div>
  );
}

export default UserDetail;
