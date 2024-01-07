import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import restaurantReviewList from "../../apis/restaurantReviewList";
import styles from './styles.module.scss';
import { Rating } from "@mui/material";
import styled from "@emotion/styled";
import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";


export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await restaurantReviewList.get(`/${id}`);
      const { name, location, price_range } = result.data.data.restaurant;

      setName(name);
      setLocation(location);
      setPriceRange(price_range);
    }

    fetchData();
  }, [id]);

  const StyledRatingPrice = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#859900',
    },

    '& .MuiRating-iconHover': {
      color: '#859900',
    },

    '& .MuiRating-iconEmpty': {
      color: '#586e75',
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Attention",
      text: "Are you sure you want to update the restaurant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
    })

    if (!result.isConfirmed) return;

    try {
      await restaurantReviewList.put(`/${id}`, {
        name,
        location,
        price_range: priceRange
      });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Restaurant updated successfully",
        showConfirmButton: true,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInput = (newValue, setState) => {
    setState(newValue);
  }

  return (
    <main>
      <form className={styles.updateForm} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className={styles.__inputText}
          value={name}
          onChange={(event) => {
            onChangeInput(event.target.value, setName);
          }}
        />

        <input
          type="text"
          placeholder="Location"
          name="location"
          className={styles.__inputText}
          value={location}
          onChange={(event) => {
            onChangeInput(event.target.value, setLocation);
          }}
        />

        <StyledRatingPrice
          name="price"
          className={styles.__inputRating}
          value={priceRange}
          onChange={(event, newValue) => {
            onChangeInput(newValue, setPriceRange);
          }}
          icon={<FaDollarSign fontSize="inherit" />}
          emptyIcon={<FaDollarSign fontSize="inherit" />}
        />

        <button
          type="submit"
          className={styles.__button}
          title="Submit"
        >
          Submit
        </button>

      </form>

    </main>
  )
}
