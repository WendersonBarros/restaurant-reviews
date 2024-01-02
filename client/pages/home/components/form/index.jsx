import styles from "./styles.module.scss";
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { FaDollarSign, FaSearch } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdCleaningServices } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function Form({ setFilters }) {
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
      priceRange,
      stars
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

  const onChangeInput = (newValue, setState) => {
    setState(newValue);
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
      priceRange,
      stars
    })

  }

  const onClear = () => {
    setName("");
    setLocation("");
    setPriceRange(null);
    setStars(null);
    setSearchParams({});
  }

  return (
    <form>
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
        className={styles.__inputRating}
        value={stars}
        onChange={(event, newValue) => {
          onChangeInput(newValue, setStars);
        }}
      />

      <div className={styles.__buttonsRow}>
        <button
          type="button"
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
  setFilters: PropTypes.func
}
