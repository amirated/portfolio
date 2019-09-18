import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import PageBodyList from './PageBodyList';
// import { Card } from 'antd';

import {
  UPDATE_FIELD_AUTH,
  ART,
  ART_PAGE_UNLOADED
} from '../constants/actionTypes';
const rails_url = "http://localhost:3000/api/v1/arts";
const node_url = "http://localhost:3000/art"
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: ART_PAGE_UNLOADED })
});

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    // this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    // this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    // this.submitForm = (email, password) => ev => {
    //   ev.preventDefault();
    //   this.props.onSubmit(email, password);
    // };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  getData() {
    fetch(node_url)
    // fetch(rails_url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
          console.log(result.data);
          console.log(this.state.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="page-container" style={{ marginTop: "5rem"}}>
        <div className="">
          <div className="">
            <h1 className="">Art</h1>
            <p className="">
                If you understand this.. you are really paying attention!
            </p>
          </div>
        </div>
        <PageBodyList page_name="art" items={this.state.items}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Art);
