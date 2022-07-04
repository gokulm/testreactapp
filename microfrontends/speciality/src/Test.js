import React, { useEffect, useState } from 'react';
import RestaurantDetails from './RestaurantDetails';

const Test = () => {

  const [restaurant, setRestaurant] = useState();
  const host = process.env.REACT_APP_CONTENT_HOST;
  console.log("Test component loaded. Host: ", host);

  useEffect(() => {
    console.log("useEffect test");

    fetch(`${host}/restaurants/5.json`)
      .then(result => result.json())
      .then(restaurant => {
        console.log("restaurant: ", restaurant);
        setRestaurant({
          restaurant: {
            ...restaurant,
            imageSrc: `${host}${restaurant.imageSrc}`,
          },
          loading: false,
        });
      })
      .catch(() => {
        console.log("error occurred while loading 5.json");
      });
  }, [host])

  // return <div>testing simple 2 3</div>
   return restaurant && <RestaurantDetails restaurant={restaurant} />
}

export default Test;
