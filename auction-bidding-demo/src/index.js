import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import actions from './actions';
import store from './store';
import App from './components/App';


//react-redux
const mapStateToProps = (state) => {
  return {
		title: state.title,
		pageContent: state.pageContent
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePageContent: (page) =>{
			dispatch(actions.updatePageContent(page));
		}
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

const AppContainer = () => {
	return(
		<Provider store={store}>
			<Container/>
		</Provider>
	);
};

ReactDOM.render(
	<AppContainer/>, document.getElementById('root'));
