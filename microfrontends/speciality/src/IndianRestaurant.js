import React from 'react';
// import RestaurantDetails from './RestaurantDetails';

class IndianRestaurant extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   loading: true,
    //   error: false,
    //   restaurant: null,
    // };
  }

  componentDidMount() {
    const host = process.env.REACT_APP_CONTENT_HOST;
    console.log("mounting indian restaurant");

    // fetch(`${host}/restaurants/5.json`)
    //   .then(result => result.json())
    //   .then(restaurant => {
    //     this.setState({
    //       restaurant: {
    //         ...restaurant,
    //         imageSrc: `${host}${restaurant.imageSrc}`,
    //       },
    //       loading: false,
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({ loading: false, error: true });
    //   });
  }

  render() {
    return <div>test</div>
    // if (this.state.loading) {
    //   return 'Loading';
    // }
    // if (this.state.error) {
    //   return 'Sorry, but that restaurant is currently unavailable.';
    // }

    // return <RestaurantDetails restaurant={this.state.restaurant} />;
  }
}

export default IndianRestaurant;
