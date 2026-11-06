import { apiClient } from './apiConfig.js';
import { ApiException } from '../../exception/apiException.js';

export const MovieService = {
  async getAllMovies() {
    try {
      const response = await apiClient.get('/movies');
      return response.data;
    } catch (error) {
      throw new ApiException(`Failed to fetch movies: ${error.message}`, error.response?.status);
    }
  },

  async getMovieById(id) {
    try {
      const response = await apiClient.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new ApiException(`Failed to fetch movie with ID ${id}: ${error.message}`, error.response?.status);
    }
  },

  async createMovie(movieData) {
    try {
      const response = await apiClient.post('/movies', movieData);
      return response.data;
    } catch (error) {
      throw new ApiException(`Failed to create movie: ${error.message}`, error.response?.status);
    }
  },

  async updateMovie(id, movieData) {
    try {
      const response = await apiClient.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw new ApiException(`Failed to update movie with ID ${id}: ${error.message}`, error.response?.status);
    }
  },

  async deleteMovie(id) {
    try {
      await apiClient.delete(`/movies/${id}`);
      return true;
    } catch (error) {
      throw new ApiException(`Failed to delete movie with ID ${id}: ${error.message}`, error.response?.status);
    }
  },

  async toggleFavourite(id, currentStatus) {
    try {
      const response = await apiClient.patch(`/movies/${id}`, {
        isFavourite: !currentStatus
      });
      return response.data;
    } catch (error) {
      throw new ApiException(`Failed to toggle favourite for movie ID ${id}: ${error.message}`, error.response?.status);
    }
  }
};
