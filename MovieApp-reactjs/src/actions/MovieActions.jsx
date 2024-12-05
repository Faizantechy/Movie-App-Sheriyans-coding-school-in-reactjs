import axios from "../utils/axios";
import { loadMovie, removeMovie } from "../reducers/MovieSlice";

export const asyncLoadMovies = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const external_ids = await axios.get(`/movie/${id}/external_ids`); // Corrected to lowercase
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);

    const ultimateData = {
      detail: detail.data,
      externalId: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(m=> m.type==='Trailer'),
      watchProviders: watchProviders.data,
    };

    dispatch(loadMovie(ultimateData));
  } catch (error) {
    console.log("Error Fetching the Info", error);
  }
};
