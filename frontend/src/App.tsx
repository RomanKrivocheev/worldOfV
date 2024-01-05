import React, { useState, useEffect } from 'react';
import { Track } from '../../src/track.model';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { trackData } from './services/trackService';

import './App.css';

const App = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    const { tracks: newTracks, hasMore: newHasMore } = await trackData(page + 1);

    if (newTracks.length > 0) {
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newHasMore);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Paginated Track List</h1>
        <p>Page: {page}</p>
        <button onClick={() => handleLoadMore()}> asdasd</button>
      </div>
      <InfiniteScroll
        dataLength={tracks.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<CircularProgress />}
      >
        {tracks.map((track, index) => (
          <div key={`${track.id}-${index}`}>
            <h3>{track.name}</h3>
            <p>Price: {track.price}</p>
            <p>Genre: {track.genre}</p>
            <hr />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default App;
