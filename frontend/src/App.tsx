import { useState } from 'react';
import { Track } from '../../src/track.model';

const App = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(0);

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
          ...(result.data.getTracks as Track[]),
        ]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div className="App">
      <h1>Paginated Track List</h1>
      Page: {page}
      <>
        {tracks.map((track, index) => (
          <div key={`${track.id}-${index}`}>
            <h3>{track.name}</h3>
            <p>Price: {track.price}</p>
            <p>Genre: {track.genre}</p>
            <hr/>
          </div>
        ))}
        <button onClick={() => fetchData()}>Load More</button>
      </>
    </div>
  );
};

export default App;
