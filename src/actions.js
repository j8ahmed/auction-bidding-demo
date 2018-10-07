
const LOGIN = 'LOGIN';
const AUCTIONITEMPRICE = 'AUCTIONITEMPRICE';
const AUCTIONITEMNAME = 'AUCTIONITEMNAME';
let actions = {
    login: (loginRole, loginId) => {
        return {
            type: LOGIN,
            loginRole: loginRole,
            loginId: loginId
        }
    },
    updateAuctionItemName: (name) => {
        return {
            type: AUCTIONITEMNAME,
            auctionItemName: name
        }
    },
    updateAuctionItemPrice: (price) => {
        return {
            type: AUCTIONITEMPRICE,
            auctionItemPrice: price
        }
    }
};

export default actions;