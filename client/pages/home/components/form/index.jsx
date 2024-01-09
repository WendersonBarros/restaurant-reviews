import styles from "./styles.module.scss";
import restaurantReviewList from "../../../../apis/restaurantReviewList";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { FaDollarSign, FaSearch } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdCleaningServices } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

export default function Form({ restaurants, setRestaurants, setFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(null);
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const name = searchParams.get("name") ?? "";
    const location = searchParams.get("location") ?? "";
    const priceRange = searchParams.get("priceRange") !== "null"
      ? searchParams.get("priceRange")
      : null;
    const stars = searchParams.get("stars") !== "null"
      ? searchParams.get("stars")
      : null;

    if (name.length) setName(name);
    if (location.length) setLocation(location);
    if (priceRange) setPriceRange(Number(priceRange));
    if (stars) setStars(Number(stars));

    setFilters({
      name,
      location,
      price_range: priceRange,
      average_rating: stars
    })
  }, [searchParams, setName, setLocation, setPriceRange, setStars, setFilters])

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

  const StyledRatingStars = styled(Rating)({
    '& .MuiRating-iconEmpty': {
      color: '#586e75',
    },

    '& .MuiRating-icon': {
      fontSize: "1.10em",
    },
  });

  const clearInputs = () => {
    setName("");
    setLocation("");
    setPriceRange(null);
    setStars(null);
  }

  const onChangeInput = (newValue, setState) => {
    setState(newValue);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim().length
      || !location.trim().length
      || !priceRange
    ) {
      Swal.fire({
        title: "Attention",
        text: "You need to fill in all the fields :)",
        icon: "warning"
      });

      return;
    }

    const restaurantAlreadyExists = restaurants.find(restaurant => {
      return restaurant.name.toUpperCase() === name.trim().toUpperCase()
        && restaurant.location.toUpperCase() === location.trim().toUpperCase()
    });

    if (restaurantAlreadyExists) {
      Swal.fire({
        title: "Attention",
        text: "This restaurant already exists",
        icon: "warning"
      });

      return;
    }

    try {
      const response = await restaurantReviewList.post("/", {
        name,
        location,
        price_range: priceRange
      })

      setRestaurants(previousRestaurants => {
        return [...previousRestaurants, {
          ...response.data.data.restaurant,
          average_rating: null,
          count: null,
        }]
      })

      clearInputs();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Restaurant added successfully =D",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error(error)
    }
  }

  const onSearch = () => {
    setSearchParams({
      name,
      location,
      priceRange,
      stars
    });

    setFilters({
      name,
      location,
      price_range: priceRange,
      average_rating: stars
    })

  }

  const onClear = () => {
    clearInputs();
    setSearchParams({});
  }

  return (
    <form onSubmit={onSubmit}>
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

      <StyledRatingStars
        name="stars"
        precision={0.5}
        className={styles.__inputRating}
        value={stars}
        onChange={(event, newValue) => {
          onChangeInput(newValue, setStars);
        }}
      />

      <div className={styles.__buttonsRow}>
        <button
          type="submit"
          className={styles.__button}
          title="Add"
        >
          <MdFormatListBulletedAdd className={styles.__add} />
        </button>
        <button
          type="button"
          className={styles.__button}
          onClick={onSearch}
          title="Search"
        >
          <FaSearch className={styles.__search} />
        </button>
        <button
          type="button"
          className={styles.__button}
          onClick={onClear}
          title="Clean"
        >
          <MdCleaningServices className={styles.__clean} />
        </button>
      </div>
    </form>
  )
}

Form.propTypes = {
  restaurants: PropTypes.array,
  setRestaurants: PropTypes.func,
  setFilters: PropTypes.func
}
