import { createStore } from 'redux';


//Redux
const reducer = (state = {title: 'Jamal Ahmed', pageContent: 'projects' }, action) => {
  switch(action.type){
    case 'PAGECONTENT':
      return Object.assign({}, state, {pageContent: action.pageContent});
    
    default:
       return state;
  }
};
const store = createStore(reducer);





export default store;