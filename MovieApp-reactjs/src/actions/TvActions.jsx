import { loadtv, removetv } from "../reducers/TvSlice";
import axios from "../utils/axios";


export const asyncLoadMovies = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const external_ids = await axios.get(`/tv/${id}/external_ids`); // Corrected to lowercase
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

    const ultimateData = {
      detail: detail.data,
      externalId: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data,
    };
    

    dispatch(loadtv(ultimateData));
  } catch (error) {
    console.log("Error Fetching the Info", error);
  }
};
