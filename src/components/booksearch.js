import React from "react";
import axios from 'axios';


import { withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Grid from '@material-ui/core/Grid';
import MyAppBar from '../components/MyAppBar.js'


const BASE_API = process.env.REACT_APP_API_ENDPOINT;

toast.configure({
  autoClose: 2000,
  draggable: false,
  //etc you get the idea
});

class BookListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onReadBook = this.onReadBook.bind(this);
    this.onDetailBook = this.onDetailBook.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.notify = this.notify.bind(this);

    this.state = {
      books: []
    };

  }

  onReadBook(isbn){
    this.readBook(isbn);
  }

  readBook = (book) => {
    const url = BASE_API + '/api/shelf/';

    axios.post(url, {isbn: book.isbn})
      .then(response =>
            {
              const message = "등록 - " + book.title;
              this.notify(message);
              this.props.history.push('/shelf/')
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
    this.getBooks('인문학');
  }

  notify(message) {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true
    });
  }

  render(){
    const books = this.state.books;

    const paper_search =
          <Paper component="form" width="100%" >
            <InputBase
              placeholder="   책검색"
              inputProps={{ 'aria-label': 'search google maps' }}
              onKeyDown={this.onSearchChange}
            />
            <IconButton type="submit"  aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider orientation="vertical" />
          </Paper>

    return (
      <Grid container spacing={1}>
        <MyAppBar title={paper_search} />

        {books.map(item => (
          <Grid key={item.url} item direction="row" container xs={12} sm={6} md={3} spacing={3}>
            <Grid item xs={3}>
              <img src={item.thumbnail} alt={item.title} width="100%"/>
            </Grid>

            <Grid item xs>
              <Grid item container direction='column'>
                <Grid item>
                  <Typography>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item.authors} {item.publishier}
                  </Typography>
                </Grid>

                <Button size="small" color="primary" onClick={()=> this.onReadBook(item)}>
                  책장추가
                </Button>

              </Grid>
            </Grid>
          </Grid>

        ))}
      </Grid>

    )
  }
}

export default withRouter(BookListComponent)
