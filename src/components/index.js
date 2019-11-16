import React from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';


import axios from 'axios';

import MyAppBar from "./MyAppBar";


class IndexPage extends React.Component {


  render() {
    return <div>
             <MyAppBar/>
             <BookListComponent/>
           </div>;
  }
}

export default IndexPage;



class BookListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
  }

  componentDidMount () {
    axios.get('https://staging-backend.hoodpub.com/api/book/',
              {params: {title: '자연어'}})
      .then(response =>
            {
              console.log(response);
              this.setState({
                isLoaded:true,
                books:response.data
              })
            })
  }

  render(){
    const { error, isLoaded, books } = this.state;

    return (<div>
              {books.map(item => (
                <Card key={item.isbn}>
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
