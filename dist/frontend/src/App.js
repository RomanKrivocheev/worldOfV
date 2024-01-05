"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const App = () => {
    const [tracks, setTracks] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(0);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
              query GetTracks($input: GetTracksInput!) {
                getTracks(input: $input) {
                  id
                  name
                  price
                  duration
                  genre
                }
              }
            `,
                    variables: {
                        input: {
                            artistName: 'AC/DC',
                            genreName: 'Rock',
                            minPrice: 0,
                            maxPrice: 100,
                            page,
                            pageSize: 2,
                        },
                    },
                }),
            });
            const result = await response.json();
            if (result.data.getTracks.length > 0) {
                setTracks((prevTracks) => [
                    ...prevTracks,
                    ...result.data.getTracks,
                ]);
                setPage((prevPage) => prevPage + 1);
            }
        }
        catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Paginated Track List" }), "Page: ", page, (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [tracks.map((track, index) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: track.name }), (0, jsx_runtime_1.jsxs)("p", { children: ["Price: ", track.price] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Genre: ", track.genre] }), (0, jsx_runtime_1.jsx)("hr", {})] }, `${track.id}-${index}`))), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => fetchData() }, { children: "Load More" }))] })] })));
};
exports.default = App;
//# sourceMappingURL=App.js.map