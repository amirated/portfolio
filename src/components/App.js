import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Art from '../components/Art';
import Music from '../components/Music';
import Science from '../components/Science';
import Contact from '../components/Contact';
import { store } from '../store';
import { push } from 'react-router-redux';
import 'antd/dist/antd.css';
import '../styles/main.scss';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    // currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      theme: 'light'
    };
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  toggleTheme() {
    if (this.state.theme === 'light') {
      this.setState({
        theme: 'dark'
      });
      document.body.classList.add('dark');
    } else {
      this.setState({
        theme: 'light'
      });
      document.body.classList.remove('dark');
    }
    
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} 
            toggleTheme={this.toggleTheme.bind(this)} />
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/art" component={Art} />
            <Route path="/music" component={Music} />
            <Route path="/science" component={Science} />
            <Route path="/contact" component={Contact} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} 
          />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
