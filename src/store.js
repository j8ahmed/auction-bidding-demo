import { createStore } from 'redux';


//Redux
const reducer = (state = {loginRole: '', loginId: '', auctionItem: '', auctionItemPrice: '' }, action) => {
  switch(action.type){
    case 'LOGIN':
      return Object.assign({}, state, {loginRole: action.loginRole, loginId: action.loginId});

    case 'AUCTIONITEMPRICE':
      return Object.assign({}, state, {auctionItemPrice: action.auctionItemPrice});
    
    case 'AUCTIONITEMNAME':
      return Object.assign({}, state, {auctionItem: action.auctionItemName});

    default:
       return state;
  }
};
const store = createStore(reducer);





export default store;