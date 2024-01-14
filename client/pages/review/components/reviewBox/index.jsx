import PropTypes from 'prop-types';
import styles from './styles.module.scss'
import styled from '@emotion/styled';
import { Rating } from '@mui/material';

export default function ReviewBox({ restaurant }) {
  const StyledRatingStars = styled(Rating)({
    '& .MuiRating-iconEmpty': {
      color: '#b58900',
    },

    '& .MuiRating-icon': {
      fontSize: '1.10em',
    },
  });

  return (
    <div className={styles.reviewsContainer}>
      {restaurant.reviews?.map(review => {
        return (
          <div
            key={review.id}
            className={`${styles.__reviewBox} ${review.rating >= 3
              ? styles.__aboveAverage
              : styles.__belowAverage
              }`}>
            <div className={styles.__topRow}>
              <h4>{review.name}</h4>

              <StyledRatingStars
                name="price"
                className={styles.__ratingStars}
                value={review.rating}
                disabled
                style={{ opacity: 1 }}
              />
            </div>

            <div className={styles.__bottomRow}>
              {review.review}
            </div>
          </div>
        )
      })}
    </div>
  );
}

ReviewBox.propTypes = {
  restaurant: PropTypes.object,
}
