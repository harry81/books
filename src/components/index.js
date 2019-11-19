import React from "react";
import axios from 'axios';


import MyAppBar from "./MyAppBar";
import BookListComponent from "./booksearch";

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
    }
  }

  componentDidMount() {
    this.getBooks('python');
  }

  render() {
    return <div>
             <MyAppBar onSearchChange={this.onSearchChange} />
             <BookListComponent books={this.state.books}/>
           </div>;
  }
}

export default IndexPage;
