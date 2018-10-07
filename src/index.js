import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import actions from './actions';
import store from './store';
import App from './components/App';

//react-redux
const mapStateToProps = (state) => {
  return {
		role: state.loginRole,
		id: state.loginId,
		auctionItem: state.auctionItem,
		auctionItemPrice: state.auctionItemPrice
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (role, id) =>{
			dispatch(actions.login(role, id));
		},
		updateAuctionItemName: (name) => {
			dispatch(actions.updateAuctionItemName(name))
		},
		updateAuctionItemPrice: (price) => {
			dispatch(actions.updateAuctionItemPrice(price))
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

