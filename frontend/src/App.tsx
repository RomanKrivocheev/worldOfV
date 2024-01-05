import { useState, useEffect } from 'react';
import { Track } from '../../src/track.model';

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for page:', page);

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
                maxPrice: 1,
                page,
                pageSize: 5,
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

        setLoading(false);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setLoading(false);
      }
    };
    if (loading && tracks.length === 0) {
      fetchData();
    }
  }, [loading, page, tracks]);

  return (
    <div className="App">
      <h1>Paginated Track List</h1>
      Page: {page}
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {tracks.map((track, index) => (
            <div key={`${track.id}-${index}`}>
              <h3>{track.name}</h3>
              <p>Price: {track.price}</p>
              <p>Genre: {track.genre}</p>
              <hr />
            </div>
          ))}
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Load More
          </button>
        </>
      )}
    </div>
  );
}

export default App;
