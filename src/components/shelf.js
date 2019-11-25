import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import {Link } from "react-router-dom";

import MyAppBar from '../components/MyAppBar.js'

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf_id: "",
      list_shelf: [],
      shelf: {},
    };

  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({id});
    this.getShelf(id);
  }

  componentWillReceiveProps(nextProps){

    console.log('state id ',  this.state, 20);

    const {id} = this.props.match.params
    const new_id = nextProps.match.params.id

    if (id !== new_id)
      this.getShelf(new_id);
  }


  getShelf = (id) => {
    const params_id = (typeof id !== 'undefined') ? id + "/" : "";
    const url = BASE_API + '/api/shelf/' + params_id ;

    axios.get(url)
      .then(response =>
            {
              if (response.data.constructor === Array)
                this.setState({list_shelf: response.data});
              else
                this.setState({shelf: response.data});
              console.log('list_shelf ', this.state.list_shelf);
              console.log("shelf ", response.data);
            })
  }

  render() {
    const {list_shelf, shelf} = this.state;

    const display_book =
      (typeof shelf.book !== 'undefined') ?
        <Grid container spacing={0}>
          <Grid item xs={3} align='center'>
            <img src={shelf.book.image}/>
            <br/>
            <Typography variant="overline" gutterBottom >
              {shelf.book.page} / 238
            </Typography>

          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" gutterBottom >
              <Link to={`/shelf/${shelf.id}`}>{shelf.book.title}</Link>
            </Typography>
            <Typography variant="subtitle2">
              <Moment format="YYYY/MM/DD">{shelf.created_at}</Moment>
            </Typography>

            <Typography variant="overline" gutterBottom >
              {shelf.status}
            </Typography>
          </Grid>
        </Grid>
          : "";

    const display = (
      (typeof this.state.id !== 'undefined')
        ? <Grid container spacing={0}>
            {display_book}
          </Grid>
        : <Grid container spacing={0}>
            {
              list_shelf.map(item => (
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

export default Shelf;
