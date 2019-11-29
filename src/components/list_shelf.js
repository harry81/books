import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

import {Link } from "react-router-dom";

import MyAppBar from '../components/MyAppBar.js'

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class ListShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list_shelf: [],
    };

  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({id});
    this.getShelf(id);
  }


  getShelf = (id) => {
    const params_id = (typeof id !== 'undefined') ? id + "/" : "";
    const url = BASE_API + '/api/shelf/' + params_id ;

    axios.get(url)
      .then(response =>
            {
              this.setState({list_shelf: response.data});
            })
  }

  render() {
    const {list_shelf} = this.state;

    const display = (
      <Grid container spacing={0}>
        {
          list_shelf.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={3}>
              <Grid container>
                <Grid item xs={3} align='center'>
                  <img src={item.book.image} alt=""/>
                  <br/>
                  <Typography variant="overline" gutterBottom >
                    {item.page} / 238
                  </Typography>

                </Grid>
                <Grid item xs>
                  <Typography variant="body2"  >
                    <Link to={`/shelf/${item.id}`}>{item.book.title}</Link>
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
      </Grid>)

    return (
      <div>
        <MyAppBar title="책장" />
        {display}

      </div>
    );
  }
}

export default ListShelf;
