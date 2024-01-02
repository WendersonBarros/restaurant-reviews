import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import styles from './styles.module.scss';
import { Rating } from '@mui/material';
import { FaChevronLeft, FaChevronRight, FaDollarSign, FaEdit } from 'react-icons/fa';
import { FaMapLocationDot, FaUserGroup } from 'react-icons/fa6'
import { IoRestaurant } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io"
import { MdDelete } from 'react-icons/md';

export default function List({ filters }) {
  const [clicked, setClicked] = useState(1);
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
      fontSize: "1.10em",
    },
  });

  const t = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ];

  return (
    <div className={styles.__listWrapper}>
      {t.map((restaurant, index) => {
        return (
          <div key={index} className={styles.__listElementWrapper}>
            <div
              className={`${styles.__listElement} ${clicked === index
                ? styles.__selectedElement
                : ""}`}
            >
              <div className={styles.__details}>
                <div className={styles.__textContainer} title='teste'><IoRestaurant className={styles.__icon} /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                <div className={styles.__textContainer}><FaMapLocationDot className={styles.__icon} /> Location test</div>
                <div>
                  <IoIosPricetags className={styles.__icon} />
                  <StyledRatingPrice
                    name="price"
                    className={styles.__inputRating}
                    value={3}
                    icon={<FaDollarSign fontSize="inherit" />}
                    emptyIcon={<FaDollarSign fontSize="inherit" />}
                    disabled
                    style={{ opacity: 1 }}
                  />
                </div>
                <div>
                  <FaUserGroup className={styles.__icon} />
                  <StyledRatingStars
                    name="stars"
                    className={styles.__inputRating}
                    value={4}
                    disabled
                    style={{ opacity: 1 }}
                  />
                </div>
              </div>

          {clicked === index
          ? <FaChevronLeft className={styles.__navigationIcon} />
          : <FaChevronRight className={styles.__navigationIcon} />
          }
            </div>

            <button className={clicked === index ? styles.__EditButton : styles.__hiddenButton}>
              <FaEdit />
            </button>
            <button className={clicked === index ? styles.__DelButton : styles.__hiddenButton}>
              <MdDelete />
            </button>
          </div>
        )
      })}
    </div >
  )
}

List.propTypes = {
  filters: PropTypes.object
}
