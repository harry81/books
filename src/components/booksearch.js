import React from "react";
import axios from 'axios';


import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const BASE_API = process.env.REACT_APP_API_ENDPOINT;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));


class BookListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onReadBook = this.onReadBook.bind(this);
    this.onDetailBook = this.onDetailBook.bind(this);
  }

  onReadBook(isbn){
    this.readBook(isbn);
  }

  readBook = (isbn) => {
    const url = BASE_API + '/api/shelf/';
    axios.post(url, {isbn})
      .then(response =>
            {
              console.log('read');
            })
  }

  onDetailBook(isbn){
    this.props.history.push('/shelf/')
    console.log('detail');
  }


  render(){
    const books = this.props.books;

    return (
      <Grid container spacing={3}>

        {books.map(item => (
          <Grid key={item.url} item xs={12} sm={12} md={3}>
            <Card >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  {item.title}
                </Typography>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs>
                    <img src={item.thumbnail} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" component="p">
                      {item.authors} {item.publishier}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.contents}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={()=> this.onDetailBook(item.isbn)}>
                  내용
                </Button>
                <Button size="small" color="primary" onClick={()=> this.onReadBook(item.isbn)}>
                  읽기
                </Button>
              </CardActions>
            </Card>
          </Grid>

        ))}
      </Grid>
    )
  }
}

export default withRouter(BookListComponent)
