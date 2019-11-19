import React from "react";
import axios from 'axios';

const BASE_API = process.env.REACT_APP_API_ENDPOINT;


class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: []
    };

  }

  componentDidMount() {
    this.getShelf();
  }

  getShelf = () => {
    const url = BASE_API + '/api/shelf/';
    axios.get(url)
      .then(response =>
            {
              this.setState({shelf: response.data});
              console.log(response.data);
            })
  }

  render() {
    const shelf = this.state.shelf;

    return (<div>
      {
        shelf.map(item => (
            <ul key={item.id}>{item.book.title}</ul>
        ))}
    </div>);
  }
}

export default Shelf;
