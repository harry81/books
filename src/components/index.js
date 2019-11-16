import React from "react";
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MyAppBar from "./MyAppBar";

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  getBooks = (title) => {
    console.log(title);
    axios.get(BASE_API + '/api/book/', {params: {title}})
      .then(response =>
            {
              this.setState({
                books: response.data
              })
            })
  }

  onSearchChange(e){
    if (e.key === 'Enter') {
      this.getBooks(e.target.value);
    }
  }

  render() {
    return <div>
             <MyAppBar onSearchChange={this.onSearchChange} />
             <BookListComponent books={this.state.books}/>
           </div>;
  }
}

export default IndexPage;


class BookListComponent extends React.Component {

  render(){
    const books = this.props.books;

    return (<div>
              {books.map(item => (
                <Card key={item.url}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={item.title}
                      height="140"
                      image={item.thumbnail}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h5">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {item.authors} {item.publishier}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.contents}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      내용
                    </Button>
                    <Button size="small" color="primary">
                      읽기
                    </Button>
                  </CardActions>
                </Card>

              ))}
            </div>
           )
  }
}
