import React from "react";
import axios from 'axios';


import { withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import Grid from '@material-ui/core/Grid';
import MyAppBar from '../components/MyAppBar.js'


const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class BookListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onReadBook = this.onReadBook.bind(this);
    this.onDetailBook = this.onDetailBook.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      books: []
    };

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

  getBooks = (title) => {
    const url = BASE_API + '/api/book/';
    axios.get(url, {params: {title}})
      .then(response =>
            {
              this.setState({books: response.data})
            })
  }

  onSearchChange(e){
    if (e.key === 'Enter') {
      this.getBooks(e.target.value);
      e.target.blur();
    }
  }

  componentDidMount() {
    this.getBooks('python');
  }

  render(){
    const books = this.state.books;
    const display_search = <div>
                             <SearchIcon />
                             <InputBase
                               placeholder="Search…"
                               onKeyDown={this.onSearchChange}
                               inputProps={{ 'aria-label': 'search' }}
                             />
                           </div>;

    return (
      <Grid container>
        <MyAppBar title="검색" />

        <Grid>
          {display_search}
        </Grid>
        <Grid container spacing={3}>
          {books.map(item => (
            <Grid key={item.url} item xs={12} sm={6} md={3}>
              <Card >
                <CardContent>
                  <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs>
                      <img src={item.thumbnail} />
                    </Grid>
                    <Grid item xs>
                      <Typography gutterBottom >
                        {item.title}
                      </Typography>
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
      </Grid>

    )
  }
}

export default withRouter(BookListComponent)
