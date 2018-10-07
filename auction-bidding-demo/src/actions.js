
const PAGECONTENT = 'PAGECONTENT';


let actions = {
    updatePageContent: (page) => {
        return {
            type: PAGECONTENT,
            pageContent: page
        }
    },
};

export default actions;