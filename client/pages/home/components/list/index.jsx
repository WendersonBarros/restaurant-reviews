import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import restaurantReviewList from '../../../../apis/restaurantReviewList';
import styled from '@emotion/styled';
import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import {
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaEdit,
} from 'react-icons/fa';
import { FaMapLocationDot, FaUserGroup } from 'react-icons/fa6';
import { IoRestaurant } from 'react-icons/io5';
import { IoIosPricetags } from 'react-icons/io';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

export default function List({ restaurants, setRestaurants, filters }) {
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();
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
      color: '#586e75',
    },

    '& .MuiRating-icon': {
      fontSize: '1.10em',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantReviewList.get('/');
        setRestaurants(response.data.data.restaurant);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setRestaurants]);

  const onRestaurantClick = (restaurantId) => {
    setClicked((previousId) => {
      if (previousId === restaurantId) return null;

      return restaurantId;
    });
  };

  const onDelete = async (restaurantId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      await restaurantReviewList.delete(`/${restaurantId}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== restaurantId;
        })
      );

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Restaurant deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onReview = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  const onUpdate = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}/update`);
  };

  return (
    <div className={styles.__listWrapper}>
      {restaurants
        .filter((restaurant) => {
          return Object.keys(filters).every((key) => {
            const filterValue = filters[key];
            const itemValue = restaurant[key];

            if (key === 'average_rating') {
              return Number(itemValue) >= Number(filterValue);
            }

            // If filter has a value, check against it; otherwise, skip the filter for this key
            return (
              !filterValue ||
              String(itemValue)
                .toUpperCase()
                .includes(
                  String(filterValue).trim().toUpperCase()
                )
            );
          });
        })
        .sort((a, b) => b.average_rating - a.average_rating)
        .map((restaurant) => {
          return (
            <div
              key={restaurant.id}
              className={styles.__listElementWrapper}
            >
              <div
                className={`${styles.__listElement} ${clicked === restaurant.id
                  ? styles.__selectedElement
                  : ''
                  }`}
                onClick={() => onRestaurantClick(restaurant.id)}
              >
                <div className={styles.__details}>
                  <div
                    className={styles.__textContainer}
                    title={restaurant.name}
                  >
                    <IoRestaurant
                      className={styles.__icon}
                    />{' '}
                    {restaurant.name}
                  </div>
                  <div className={styles.__textContainer}>
                    <FaMapLocationDot
                      className={styles.__icon}
                    />{' '}
                    {restaurant.location}
                  </div>
                  <div>
                    <IoIosPricetags
                      className={styles.__icon}
                    />
                    <StyledRatingPrice
                      name="price"
                      className={styles.__inputRating}
                      value={restaurant.price_range}
                      icon={
                        <FaDollarSign fontSize="inherit" />
                      }
                      emptyIcon={
                        <FaDollarSign fontSize="inherit" />
                      }
                      disabled
                      style={{ opacity: 1 }}
                    />
                  </div>
                  <div>
                    <FaUserGroup
                      className={styles.__icon}
                    />
                    <StyledRatingStars
                      name="stars"
                      precision={0.5}
                      className={styles.__inputRating}
                      value={Number(
                        restaurant.average_rating
                      )}
                      disabled
                      style={{ opacity: 1 }}
                    />{' '}
                    ({Number(restaurant.count)})
                  </div>
                </div>

                {clicked === restaurant.id ? (
                  <FaChevronLeft
                    className={styles.__navigationIcon}
                  />
                ) : (
                  <FaChevronRight
                    className={styles.__navigationIcon}
                  />
                )}
              </div>

              <button
                className={
                  clicked === restaurant.id
                    ? styles.__detailsButton
                    : styles.__hiddenButton
                }
                onClick={() => onReview(restaurant.id)}
              >
                <BiSolidCommentDetail />
              </button>

              <button
                className={
                  clicked === restaurant.id
                    ? styles.__editButton
                    : styles.__hiddenButton
                }
                onClick={() => onUpdate(restaurant.id)}
              >
                <FaEdit />
              </button>
              <button
                className={
                  clicked === restaurant.id
                    ? styles.__delButton
                    : styles.__hiddenButton
                }
                onClick={() => onDelete(restaurant.id)}
              >
                <MdDelete />
              </button>
            </div>
          );
        })}
    </div>
  );
}

List.propTypes = {
  restaurants: PropTypes.array,
  setRestaurants: PropTypes.func,
  filters: PropTypes.object,
};
