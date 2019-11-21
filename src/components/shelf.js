import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';



import MyAppBar from '../components/MyAppBar.js'

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
        <MyAppBar title="책장" />

        <Grid container spacing={0}>
          {
            shelf.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={3}>
                <Grid container>
                  <Grid item xs={3} align='center'>
                    <img src={item.book.image}/>
                    <br/>
                    <Typography variant="overline" gutterBottom >
                      {item.page} / 238
                    </Typography>

                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2" gutterBottom >
                      {item.book.title}
                    </Typography>
                    <Typography variant="subtitle2">
                      <Moment format="YYYY/MM/DD">{item.created_at}</Moment>
                    </Typography>

                    <Typography variant="overline" gutterBottom >
                      {item.status}
                    </Typography>

                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>

      </div>
    );
  }
}

export default Shelf;
