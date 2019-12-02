import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles} from '@material-ui/core/styles';

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


    return (
      <div>
        <MyAppBar title="책장" />
        <br/>
        <BookGridList list_shelf={list_shelf}/>
      </div>
    );
  }
}

export default ListShelf;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);


function BookGridList(props) {
  const {list_shelf} = props;
  const classes = useStyles();
  return (

    <Grid container spacing={0}>
      {
        list_shelf.map(item => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={3} align='center'>
                <img src={item.book.image} alt=""/>

              </Grid>
              <Grid item xs>
                <Typography variant="subtitle2"  >
                  <Link to={`/shelf/${item.id}`} style={{ textDecoration: 'none' }}>{item.book.title}</Link>
                </Typography>
                <Typography variant="overline">
                  <Moment format="YYYY/MM/DD">{item.created_at}</Moment>
                </Typography>

                <br/>
                <Typography variant="overline" gutterBottom >
                  {item.current_page} / 238 ({ Math.round(item.current_page / 100 * 100) }%)
                </Typography>
                <Typography variant="overline" gutterBottom >
                  {item.status}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
