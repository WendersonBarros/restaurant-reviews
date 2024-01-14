import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from './components/form';
import ReviewBox from './components/reviewBox';
import restaurantReviewList from '../../apis/restaurantReviewList';
import styles from './styles.module.scss';
import { IoRestaurant } from 'react-icons/io5';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosPricetags } from 'react-icons/io';
import { FaDollarSign } from 'react-icons/fa';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';

export default function Review() {
  const [restaurant, setRestaurant] = useState({});
  const [triggerToggle, setTriggerToggle] = useState(false);
  const { id } = useParams();

  const StyledRatingPrice = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#859900',
    },

    '& .MuiRating-iconEmpty': {
      color: '#586e75',
    },
  });

  const StyledRatingStars = styled(Rating)({
    '& .MuiRating-iconEmpty': {
      color: '#b58900',
    },

    '& .MuiRating-icon': {
      fontSize: '1.10em',
    },
  });


  useEffect(() => {
    const fetchData = async () => {
      const restaurant = await restaurantReviewList.get(`/${id}`);

      setRestaurant(restaurant.data.data);
    };

    fetchData();
  }, [id, triggerToggle]);

  return (
    <main>
      <ul className={styles.infoList}>
        <li>
          <IoRestaurant />
          {restaurant.restaurant?.name}
        </li>
        <li>
          <FaMapLocationDot />
          {restaurant.restaurant?.location}
        </li>
        <li>
          <IoIosPricetags />
          <StyledRatingPrice
            name="price"
            className={styles.__inputRating}
            value={Number(restaurant.restaurant?.price_range)}
            icon={<FaDollarSign fontSize="inherit" />}
            emptyIcon={<FaDollarSign fontSize="inherit" />}
            disabled
            style={{ opacity: 1 }}
          />
        </li>
      </ul>

      <Form
        id={id}
        restaurant={restaurant}
        setTriggerToggle={setTriggerToggle}
      />

      <div className={styles.infoReviews}>
        <StyledRatingStars
          name="price"
          precision={0.5}
          className={styles.__ratingStars}
          value={Number(restaurant.restaurant?.average_rating)}
          disabled
          style={{ opacity: 1 }}
        />({restaurant.restaurant?.count ?? 0})
      </div>

      <ReviewBox
        restaurant={restaurant}
        setRestaurant={setRestaurant}
      />
    </main>
  );
}
