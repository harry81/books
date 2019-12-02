import React from "react";
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

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
    this.addBookProgress(value);
  }

  addBookProgress = (page) => {
    console.log('shelf ', this.state.shelf_id);
    const url = BASE_API + '/api/shelf/' + this.state.shelf_id + '/bookprogress/' ;

    axios.post(url, {page: page})
      .then(response =>
            {
              this.getShelf(this.state.shelf_id);
              this.setState({page: ""});
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
          <ShelfCard shelf={shelf} refresh_shelf={this.getShelf}/>
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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

function ShelfCard(props) {
  const classes = useStyles();
  const {shelf, refresh_shelf} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = (shelf_id, page) => {
    addBookProgress(shelf_id, page);
  };

  const addBookProgress = (shelf_id, page) => {
    const url = BASE_API + '/api/shelf/' + shelf_id + '/bookprogress/' ;

    axios.post(url, {page: page})
      .then(response =>
            {
              refresh_shelf(shelf_id)
            })
  }


  return  (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={shelf.book.author}
        subheader={<Moment format="YYYY/MM/DD">{shelf.book.created_at}</Moment>}/>
      <div>
        <CardContent align='center'>
          <img src={shelf.book.image}/>
          <Typography variant="body2" color="textSecondary" component="p">
            {shelf.book.title}

            <br/>
            {shelf.current_page} / 238
            ({ Math.round(shelf.current_page / 238 * 100) }%)
            </Typography>
            <AddPageDialog onClose={handleClose} shelf_id={shelf.id}/>
        </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {shelf.book.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}



function AddPageDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const {onClose, shelf_id} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onClose(shelf_id, selectedValue);
    setOpen(false);
    setSelectedValue("");
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
