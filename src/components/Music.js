import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import PageBodyList from './PageBodyList';
import {
  UPDATE_FIELD_AUTH,
  MUSIC,
  MUSIC_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: MUSIC_PAGE_UNLOADED })
});

class Music extends React.Component {
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
    fetch("http://localhost:3000/api/v1/music")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
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
    return (
      <div className="page-container" style={{ marginTop: "5rem"}}>
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Music</h1>
              <p className="text-xs-center">
                  Music connects..
              </p>
          </div>
        </div>
        <PageBodyList page_name="music" items={this.state.items}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
