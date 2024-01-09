import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./components/form";
import ReviewBox from "./components/reviewBox";
import restaurantReviewList from "../../apis/restaurantReviewList";
import styles from "./styles.module.scss"
import { IoRestaurant } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import styled from "@emotion/styled";
import { Rating } from "@mui/material";

export default function Review() {
  const [reviews, setReviews] = useState({});
  const { id } = useParams();

  const StyledRatingPrice = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#859900',
    },

    '& .MuiRating-iconEmpty': {
      color: '#586e75',
    },
  });


  useEffect(() => {
    const fetchData = async () => {
      const reviews = await restaurantReviewList.get(`/${id}`);

      setReviews(reviews.data.data);
    }

    fetchData();
  }, [id])

  return (
    <main>
      <ul className={styles.infoList}>
        <li>
          <IoRestaurant />
          {reviews.restaurant?.name}
        </li>
        <li>
          <FaMapLocationDot />
          {reviews.restaurant?.location}
        </li>
        <li>
          <IoIosPricetags />
          <StyledRatingPrice
            name="price"
            className={styles.__inputRating}
            value={reviews.restaurant?.price_range}
            icon={<FaDollarSign fontSize="inherit" />}
            emptyIcon={<FaDollarSign fontSize="inherit" />}
            disabled
            style={{ opacity: 1 }}
          />
          
        </li>
      </ul>
      <Form />
      <ReviewBox />
    </main>
  );
}
