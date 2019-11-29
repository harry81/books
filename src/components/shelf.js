import React from "react";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import {Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MyAppBar from '../components/MyAppBar.js'

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.showAddPage = this.showAddPage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      shelf_id: "",
      shelf: {},
      page: ""
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.setState({shelf_id: id});
    this.getShelf(id);
  }

  showAddPage(){
    console.log('showAddPage');
  }

  handleClose(value){
    this.setState({page: value});
    this.addBookProgress(value);
    this.getShelf(this.state.shelf_id);
  }

  addBookProgress = (page) => {
    console.log('shelf ', this.state.shelf_id);
    const url = BASE_API + '/api/shelf/' + this.state.shelf_id + '/bookprogress/' ;

    axios.post(url, {page: page})
      .then(response =>
            {
              console.log(response.data);
            })
  }

  getShelf = (id) => {
    const shelf_id = (typeof id !== 'undefined') ? id + "/" : "";
    const url = BASE_API + '/api/shelf/' + shelf_id ;

    axios.get(url)
      .then(response =>
            {
              console.log(response.data);
              this.setState({shelf: response.data});
            })
  }

  render() {
    const {shelf} = this.state;

    const display_book =
          (typeof shelf.book !== 'undefined') ?
          <div>
            <Grid container spacing={3} direction='column'>
              <Grid item >
                <Grid container spacing={0}>
                  <Grid item xs={3} align='center'>
                    <img src={shelf.book.image} alt='{shelf.book.title}'/>
                    <br/>
                    <Typography variant="overline" gutterBottom >
                      {shelf.current_page} / 238
                    </Typography>

                  </Grid>
                  <Grid item xs >
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
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs align='center'>
                {shelf.bookprogresses.map(item => (
                  <div>
                    {item.page} /
                    <Moment format="YYYY/MM/DD">{item.created_at}</Moment>
                  </div>
                ))}

              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs align='center'>
                {this.state.selectedValue}
                <FormDialog onClose={this.handleClose}/>
              </Grid>
            </Grid>
          </div>

          : "empty";

    return (
      <div>
        <MyAppBar title="책장" />
        {display_book}
      </div>
    );
  }
}

export default Shelf;


function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const {onClose} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose(selectedValue);
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        진도기록
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">진도기록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            마지막 읽은 페이지를 기록하세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="page"
            label="Page"
            value={selectedValue}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
