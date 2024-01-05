"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_infinite_scroll_component_1 = require("react-infinite-scroll-component");
const CircularProgress_1 = require("@mui/material/CircularProgress");
const trackService_1 = require("./services/trackService");
require("./App.css");
const App = () => {
    const [tracks, setTracks] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(0);
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const handleLoadMore = async () => {
        const { tracks: newTracks, hasMore: newHasMore } = await (0, trackService_1.trackData)(page + 1);
        if (newTracks.length > 0) {
            setTracks((prevTracks) => [...prevTracks, ...newTracks]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(newHasMore);
        }
        else {
            setHasMore(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "header" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Paginated Track List" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Page: ", page] }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleLoadMore() }, { children: " asdasd" }))] })), (0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, Object.assign({ dataLength: tracks.length, next: handleLoadMore, hasMore: hasMore, loader: (0, jsx_runtime_1.jsx)(CircularProgress_1.default, {}) }, { children: tracks.map((track, index) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: track.name }), (0, jsx_runtime_1.jsxs)("p", { children: ["Price: ", track.price] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Genre: ", track.genre] }), (0, jsx_runtime_1.jsx)("hr", {})] }, `${track.id}-${index}`))) }))] })));
};
exports.default = App;
//# sourceMappingURL=App.js.map