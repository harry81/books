import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: []
    };

  }

  componentDidMount() {
    this.getShelf();
  }

  getShelf = () => {
    const url = BASE_API + '/api/shelf/';
    axios.get(url)
      .then(response =>
            {
              this.setState({shelf: response.data});
              console.log(response.data);
            })
  }

  render() {
    const shelf = this.state.shelf;

    return (
      <div>
        <Grid container spacing={3}>
          {
            shelf.map(item => (
              <Grid container xs key={item.id} >
                <Grid spacing={3}>
                  <img src={item.book.image}/>
                </Grid>

              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

export default Shelf;
