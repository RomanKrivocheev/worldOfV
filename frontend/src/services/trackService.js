export const trackData = async (page) => {
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
              artistName: 'Aerosmith',
              genreName: 'Rock',
              minPrice: 0,
              maxPrice: 100,
              page,
              pageSize: 5,
            },
          },
        }),
      });
  
      const result = await response.json();
  
      if (result.data.getTracks.length > 0) {
        return {
          tracks: result.data.getTracks,
          hasMore: true,
        };
      } else {
        return {
          tracks: [],
          hasMore: false,
        };
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      return {
        tracks: [],
        hasMore: false,
      };
    }
  };