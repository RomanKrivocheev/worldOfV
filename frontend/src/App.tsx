import React, { useState } from 'react';
import { Track } from '../../src/track.model';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { trackData } from './services/trackService';

import './App.css';

const App = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchData, setSearchData] = useState({ artistName: '', genreName: '' });
  const [currentSearchData, setCurrentSearchData] = useState({artistName: '', genreName: '' });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const handleLoadMore = async (firstSearch: boolean) => {
    let newTracks: Track[] = [], newHasMore;
  
    if (firstSearch && searchData.artistName !== currentSearchData.artistName && searchData.genreName !== currentSearchData.genreName) {
      ({ tracks: newTracks, hasMore: newHasMore } = await trackData(0, searchData.artistName, searchData.genreName));
      setPage(0);
      setCurrentSearchData({artistName: searchData.artistName , genreName: searchData.genreName});
      setTracks([]);
    } else {
      ({ tracks: newTracks, hasMore: newHasMore } = await trackData(page + 1, searchData.artistName, searchData.genreName));
    }
  
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
        <input
          type="text"
          placeholder="Artist"
          value={searchData.artistName}
          onChange={(e) => setSearchData({ ...searchData, artistName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={searchData.genreName}
          onChange={(e) => setSearchData({ ...searchData, genreName: e.target.value })}
        />
        <button onClick={() => handleLoadMore(true)}>Search!</button>
      </div>
      <InfiniteScroll
        dataLength={tracks.length}
        next={() => handleLoadMore(false)}
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
