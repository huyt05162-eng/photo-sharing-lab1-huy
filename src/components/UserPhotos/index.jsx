import React from 'react';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';

import './styles.css';
import models from '../../modelData/models';

// Bundle every image in ../../images so we can look one up by its file name.
const imageContext = require.context(
  '../../images',
  false,
  /\.(png|jpe?g|svg|gif)$/
);
const images = {};
imageContext.keys().forEach((key) => {
  images[key.replace('./', '')] = imageContext(key);
});

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
                          primary={
                            <span>
                              <Link to={`/users/${comment.user._id}`}>
                                {comment.user.first_name}{' '}
                                {comment.user.last_name}
                              </Link>
                              {'  •  '}
                              {formatDateTime(comment.date_time)}
                            </span>
                          }
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
