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
    fetch("http://localhost:3000/api/v1/arts")
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

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    // const email = this.props.email;
    // const password = this.props.password;
    // return (
    //   <div className="auth-page">
    //     <div className="container page">
    //       <div className="row">
    //         <div className="col-md-6 offset-md-3 col-xs-12">
    //           <h1 className="text-xs-center">Art</h1>
    //           <p className="text-xs-center">
    //               Art lives forever..
    //               {this.props.data}
    //           </p>
    //         </div>
    //       </div>
    //       <PageBodyList page_name="art" items={this.state.items} />
    //     </div>
    //   </div>
    // );

    return (
      <PageBodyList page_name="art" items={this.state.items}/>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Art);
