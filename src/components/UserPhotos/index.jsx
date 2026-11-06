import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import ludgate1 from "../../images/ludgate1.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ouster from "../../images/ouster.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";

// Map each photo file name to its imported (bundled) URL.
// Static imports work in both webpack and Vite.
const images = {
  "kenobi1.jpg": kenobi1,
  "kenobi2.jpg": kenobi2,
  "kenobi3.jpg": kenobi3,
  "kenobi4.jpg": kenobi4,
  "ludgate1.jpg": ludgate1,
  "malcolm1.jpg": malcolm1,
  "malcolm2.jpg": malcolm2,
  "ouster.jpg": ouster,
  "ripley1.jpg": ripley1,
  "ripley2.jpg": ripley2,
  "took1.jpg": took1,
  "took2.jpg": took2,
};

/**
 * Format a date/time value into a user-friendly string.
 */
function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) {
    return String(dateTime);
  }
  return date.toLocaleString();
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  return (
    <div className="user-photos">
      <Typography variant="h5" gutterBottom>
        Photos of {user ? `${user.first_name} ${user.last_name}` : userId}
      </Typography>

      {(!photos || photos.length === 0) && (
        <Typography variant="body1">This user has no photos.</Typography>
      )}

      {photos &&
        photos.map((photo) => (
          <Card key={photo._id} className="photo-card" variant="outlined">
            {images[photo.file_name] && (
              <CardMedia
                component="img"
                image={images[photo.file_name]}
                alt={photo.file_name}
                className="photo-image"
              />
            )}
            <CardContent>
              <Typography variant="caption" color="textSecondary">
                Posted on {formatDateTime(photo.date_time)}
              </Typography>

              {photo.comments && photo.comments.length > 0 ? (
                <div className="photo-comments">
                  <Typography variant="subtitle1">Comments</Typography>
                  <List disablePadding>
                    {photo.comments.map((comment) => (
                      <ListItem
                        key={comment._id}
                        alignItems="flex-start"
                        disableGutters
                        divider
                      >
                        <ListItemText
                          primary={(
                            <span>
                              <Link to={`/users/${comment.user._id}`}>
                                {comment.user.first_name} {comment.user.last_name}
                              </Link>
                              {"  •  "}
                              {formatDateTime(comment.date_time)}
                            </span>
                          )}
                          secondary={comment.comment}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No comments.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default UserPhotos;
