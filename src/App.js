import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import http from './services/httpService';
import config from './config/config.json';
import logger from './services/loggingService';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { 'title': 'a', body: 'b' };
    const { data: post } = await http.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    const originalPost = { ...posts[index] };

    post.title = "UPDATED";
    posts[index] = { ...post };

    this.setState({ posts });
    try {
      await http.put(config.apiEndpoint + '/' + post.id, post);
    } catch (error) {
      if (error.response && error.response.status == 404) {
        toast.error("This post does not exist.")
      }
      logger.log(error);
      posts[index] = { ...originalPost };
      this.setState({ posts });
    }
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(config.apiEndpoint + '/' + post.id);
    } catch (error) {
      if (error.response && error.response.status == 404) {
        toast.error("This post has already been deleted.");
      }
      logger.log(error);
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
