const Axios = require("axios").default;

module.exports = async (request, h) => {

    const LIMIT = 10;

    const params = request.query;
    const page = params.page || 1;

    let totalPosts = [];
    let posts = [];
    try {
        // Here no pagination is provided by the API so it fetches total posts
        const { data } = await Axios.get("https://jsonplaceholder.typicode.com/posts")
        totalPosts = data;
        // now split accordingly to the current page
        const first = (page - 1) * LIMIT;
        const last = 1 + page * LIMIT;
        posts = totalPosts.slice(first, last);
    } catch (error) {
        console.log(error)
    }

    // Pagination
    const start = 1;
    const end = Math.ceil(totalPosts.length / LIMIT);
    const pagination = [];
    for (let index = start; index <= end; index++) {
        pagination.push({
            page: index
        });
    }

    const result = { posts, pagination };
    return h.view('index.html', result);

};