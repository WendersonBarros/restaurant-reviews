import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import Swal from 'sweetalert2';
import restaurantReviewList from '../../../../apis/restaurantReviewList';
import PropTypes from 'prop-types';

export default function Form({ reviews, setReviews }) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);

    const StyledRatingStars = styled(Rating)({
        '& .MuiRating-iconEmpty': {
            color: '#586e75',
        },

        '& .MuiRating-icon': {
            fontSize: '1.10em',
        },
    });

    const onChangeInput = (newValue, setState) => {
        setState(newValue);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim().length || !review.trim().length || !rating) {
            Swal.fire({
                title: 'Attention',
                text: 'You need to fill in all the fields :)',
                icon: 'warning',
            });

            return;
        }

        const reviewAlreadyExists = reviews.find((restaurant) => {
            return (
                restaurant.name.toUpperCase() === name.trim().toUpperCase() &&
                restaurant.review.toUpperCase() === review.trim().toUpperCase()
            );
        });

        if (reviewAlreadyExists) {
            Swal.fire({
                title: 'Attention',
                text: 'This review already exists',
                icon: 'warning',
            });

            return;
        }

        try {
            const response = await restaurantReviewList.post(`/${id}/review`, {
                name,
                review,
                rating,
            });

            setReviews((previousReviews) => {
                return [
                    ...previousReviews,
                    {
                        ...response.data.data.review,
                    },
                ];
            });

            setName('');
            setReview('');
            setRating(null);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Review added successfully =D',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.reviewForm}>
            <StyledRatingStars
                name="price"
                className={styles.__inputRating}
                value={rating}
                onChange={(event, newValue) => {
                    onChangeInput(newValue, setRating);
                }}
            />

            <input
                type="text"
                placeholder="Name"
                name="name"
                maxLength={35}
                className={styles.__inputText}
                value={name}
                onChange={(event) => {
                    onChangeInput(event.target.value, setName);
                }}
            />

            <textarea
                type="text"
                placeholder="Review"
                name="location"
                maxLength={180}
                className={styles.__textarea}
                value={review}
                rows={5}
                onChange={(event) => {
                    onChangeInput(event.target.value, setReview);
                }}
            />

            <button
                type="submit"
                className={styles.__button}
                title="Submit Review"
            >
                Submit
            </button>
        </form>
    );
}

Form.propTypes = {
    reviews: PropTypes.array,
    setReviews: PropTypes.func,
};
