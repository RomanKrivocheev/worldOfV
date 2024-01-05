import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { GetTracksInput } from './track.model';
import { Track } from './track.model';

/**
 * Service responsible for handling track-related operations.
 */
@Injectable()
export class TrackService {
  constructor(private readonly db: Database) {}

  /**
   * Retrieves tracks based on the provided criteria.
   * @param artistName - The name of the artist associated with the tracks.
   * @param genreName - The genre name for filtering tracks.
   * @param minPrice - The minimum price for filtering tracks.
   * @param maxPrice - The maximum price for filtering tracks.
   * @param page - The page number for pagination.
   * @param pageSize - The number of tracks to be included in each page.
   * @returns A promise that resolves to an array of tracks.
   */
  getTracks({
    artistName,
    genreName,
    minPrice,
    maxPrice,
    page,
    pageSize,
  }: GetTracksInput): Promise<Track[]> {
    const query = `
      SELECT
        t.TrackId AS id,
        t.Name AS name,
        t.UnitPrice AS price,
        t.Milliseconds AS duration,
        g.Name AS genre
      FROM Track t
      JOIN Genre g ON t.GenreId = g.GenreId
      JOIN Album a ON t.AlbumId = a.AlbumId
      JOIN Artist ar ON a.ArtistId = ar.ArtistId
      WHERE
        ar.Name = ?
        AND g.Name = ?
        AND t.UnitPrice >= ?
        AND t.UnitPrice < ?
      LIMIT ? OFFSET ?
    `;

    const offset = page * pageSize;

    return new Promise<Track[]>((resolve, reject) => {
      this.db.all(
        query,
        [artistName, genreName, minPrice, maxPrice, pageSize, offset],
        (error, data: Track[]) => {
          if (error) reject(error);
          else resolve(data);
        },
      );
    });
  }

  /**
   * Retrieves tracks by their IDs.
   * @param ids - An array of track IDs.
   * @returns A promise that resolves to an array of tracks.
   */
  async getTracksByIds(ids: number[]): Promise<Track[]> {
    const query = `
      SELECT
        t.TrackId AS id,
        t.Name AS name,
        t.UnitPrice AS price,
        t.Milliseconds AS duration,
        g.Name AS genre
      FROM Track t
      JOIN Genre g ON t.GenreId = g.GenreId
      WHERE t.TrackId IN (${ids.join(',')})
    `;

    return new Promise<Track[]>((resolve, reject) => {
      this.db.all(query, (error, data: Track[]) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  }
}
