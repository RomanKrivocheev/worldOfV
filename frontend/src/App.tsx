import React, { useState } from 'react';
import { Track } from '../../src/track.model';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import './App.css';
import genres from './utils/genres';
import artists from './utils/artists';

import { trackData } from './services/trackService';

/**
 * Main application component.
 */
const App = () => {
  // State variables
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchData, setSearchData] = useState({
    artistName: '',
    genreName: '',
  });
  const [currentSearchData, setCurrentSearchData] = useState({
    artistName: '',
    genreName: '',
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  /**
   * Handles loading more tracks based on search criteria.
   * @param {boolean} firstSearch - Indicates if it's the first search.
   */
  const handleLoadMore = async (firstSearch: boolean) => {
    let newTracks: Track[] = [],
      newHasMore;

    // Check if it's the first search and if search criteria has changed
    if (
      firstSearch &&
      (searchData.artistName !== currentSearchData.artistName ||
        searchData.genreName !== currentSearchData.genreName)
    ) {
      setTracks([]);
      ({ tracks: newTracks, hasMore: newHasMore } = await trackData(
        0,
        searchData.artistName,
        searchData.genreName
      ));
      setPage(0);
      setCurrentSearchData({
        artistName: searchData.artistName,
        genreName: searchData.genreName,
      });
    } else {
      // Load more tracks
      ({ tracks: newTracks, hasMore: newHasMore } = await trackData(
        page + 1,
        searchData.artistName,
        searchData.genreName
      ));
    }

    // Update state based on loaded tracks
    if (newTracks.length > 0) {
      setTracks((prevTracks) => [...prevTracks, ...newTracks]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newHasMore);
    } else {
      setHasMore(false);
    }
  };

  /**
   * Handles key press events, triggers search if Enter key is pressed.
   * @param {React.KeyboardEvent<HTMLDivElement>} event - The keyboard event.
   */
  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleLoadMore(true);
    }
  };

  return (
    <Container>
      <div className="header">
        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
          <Grid container spacing={3} alignItems="center">
            {/* Application header */}
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom>
                Paginated Track List
              </Typography>
            </Grid>

            {/* Artist autocomplete input */}
            <Grid item xs={6} md={4}>
              <Autocomplete
                options={artists}
                value={searchData.artistName}
                onChange={(e, newValue) =>
                  setSearchData({ ...searchData, artistName: newValue || '' })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Artist" fullWidth />
                )}
                onKeyDown={handleEnterKeyPress}
              />
            </Grid>

            {/* Genre autocomplete input */}
            <Grid item xs={6} md={4}>
              <Autocomplete
                options={genres}
                value={searchData.genreName}
                onChange={(e, newValue) =>
                  setSearchData({ ...searchData, genreName: newValue || '' })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Genre" fullWidth />
                )}
                onKeyDown={handleEnterKeyPress}
              />
            </Grid>

            {/* Loaded pages counter and search button */}
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Loaded pages: {page}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Typography variant="body2" color="textSecondary">
                Hit enter to search!
              </Typography>
              <Button variant="contained" onClick={() => handleLoadMore(true)}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>

      {/* Infinite scroll body for displaying tracks */}
      <div className="body">
        <InfiniteScroll
          dataLength={tracks.length}
          next={() => handleLoadMore(false)}
          hasMore={hasMore}
          loader={<CircularProgress />}
        >
          {tracks.map((track, index) => (
            <Paper
              elevation={3}
              style={{ padding: '20px', margin: '20px 0' }}
              key={`${track.id}-${index}`}
            >
              {/* Track details */}
              <Typography variant="h6">{track.name}</Typography>
              <Typography>Price: {track.price}</Typography>
              <Typography>Genre: {track.genre}</Typography>
              <Typography>
                {`Duration: ${Math.floor(track.duration / 60000)}:${(
                  Math.floor(track.duration / 1000) % 60
                )
                  .toString()
                  .padStart(2, '0')}`}
              </Typography>
              <hr style={{ margin: '10px 0' }} />
            </Paper>
          ))}
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default App;
