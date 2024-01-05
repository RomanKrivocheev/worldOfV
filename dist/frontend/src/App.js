"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_infinite_scroll_component_1 = require("react-infinite-scroll-component");
const CircularProgress_1 = require("@mui/material/CircularProgress");
const TextField_1 = require("@mui/material/TextField");
const Button_1 = require("@mui/material/Button");
const Typography_1 = require("@mui/material/Typography");
const Container_1 = require("@mui/material/Container");
const Paper_1 = require("@mui/material/Paper");
const Grid_1 = require("@mui/material/Grid");
const Autocomplete_1 = require("@mui/material/Autocomplete");
require("./App.css");
const genres_1 = require("./utils/genres");
const artists_1 = require("./utils/artists");
const trackService_1 = require("./services/trackService");
const App = () => {
    const [tracks, setTracks] = (0, react_1.useState)([]);
    const [searchData, setSearchData] = (0, react_1.useState)({
        artistName: '',
        genreName: '',
    });
    const [currentSearchData, setCurrentSearchData] = (0, react_1.useState)({
        artistName: '',
        genreName: '',
    });
    const [page, setPage] = (0, react_1.useState)(0);
    const [hasMore, setHasMore] = (0, react_1.useState)(false);
    const handleLoadMore = async (firstSearch) => {
        let newTracks = [], newHasMore;
        if (firstSearch &&
            (searchData.artistName !== currentSearchData.artistName ||
                searchData.genreName !== currentSearchData.genreName)) {
            setTracks([]);
            ({ tracks: newTracks, hasMore: newHasMore } = await (0, trackService_1.trackData)(0, searchData.artistName, searchData.genreName));
            setPage(0);
            setCurrentSearchData({
                artistName: searchData.artistName,
                genreName: searchData.genreName,
            });
        }
        else {
            ({ tracks: newTracks, hasMore: newHasMore } = await (0, trackService_1.trackData)(page + 1, searchData.artistName, searchData.genreName));
        }
        if (newTracks.length > 0) {
            setTracks((prevTracks) => [...prevTracks, ...newTracks]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(newHasMore);
        }
        else {
            setHasMore(false);
        }
    };
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLoadMore(true);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Container_1.default, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "header" }, { children: (0, jsx_runtime_1.jsx)(Paper_1.default, Object.assign({ elevation: 3, style: { padding: '20px', margin: '20px 0' } }, { children: (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ container: true, spacing: 3, alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 12, md: 4 }, { children: (0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h4", gutterBottom: true }, { children: "Paginated Track List" })) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 6, md: 4 }, { children: (0, jsx_runtime_1.jsx)(Autocomplete_1.default, { options: artists_1.default, value: searchData.artistName, onChange: (e, newValue) => setSearchData(Object.assign(Object.assign({}, searchData), { artistName: newValue || '' })), renderInput: (params) => ((0, jsx_runtime_1.jsx)(TextField_1.default, Object.assign({}, params, { label: "Artist", fullWidth: true }))), onKeyDown: handleEnterKeyPress }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 6, md: 4 }, { children: (0, jsx_runtime_1.jsx)(Autocomplete_1.default, { options: genres_1.default, value: searchData.genreName, onChange: (e, newValue) => setSearchData(Object.assign(Object.assign({}, searchData), { genreName: newValue || '' })), renderInput: (params) => ((0, jsx_runtime_1.jsx)(TextField_1.default, Object.assign({}, params, { label: "Genre", fullWidth: true }))), onKeyDown: handleEnterKeyPress }) })), (0, jsx_runtime_1.jsx)(Grid_1.default, Object.assign({ item: true, xs: 6 }, { children: (0, jsx_runtime_1.jsxs)(Typography_1.default, Object.assign({ variant: "body2", color: "textSecondary" }, { children: ["Loaded pages: ", page] })) })), (0, jsx_runtime_1.jsxs)(Grid_1.default, Object.assign({ item: true, xs: 6, style: { textAlign: 'right' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "body2", color: "textSecondary" }, { children: "Hit enter to search!" })), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: "contained", onClick: () => handleLoadMore(true) }, { children: "Search" }))] }))] })) })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "body" }, { children: (0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, Object.assign({ dataLength: tracks.length, next: () => handleLoadMore(false), hasMore: hasMore, loader: (0, jsx_runtime_1.jsx)(CircularProgress_1.default, {}) }, { children: tracks.map((track, index) => ((0, jsx_runtime_1.jsxs)(Paper_1.default, Object.assign({ elevation: 3, style: { padding: '20px', margin: '20px 0' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, Object.assign({ variant: "h6" }, { children: track.name })), (0, jsx_runtime_1.jsxs)(Typography_1.default, { children: ["Price: ", track.price] }), (0, jsx_runtime_1.jsxs)(Typography_1.default, { children: ["Genre: ", track.genre] }), (0, jsx_runtime_1.jsx)(Typography_1.default, { children: `Duration: ${Math.floor(track.duration / 60000)}:${(Math.floor(track.duration / 1000) % 60)
                                    .toString()
                                    .padStart(2, '0')}` }), (0, jsx_runtime_1.jsx)("hr", { style: { margin: '10px 0' } })] }), `${track.id}-${index}`))) })) }))] }));
};
exports.default = App;
//# sourceMappingURL=App.js.map