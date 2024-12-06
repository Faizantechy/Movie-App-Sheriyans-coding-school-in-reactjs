import { loadperson, removeperson } from "../reducers/PersonSlice";
import axios from "../utils/axios";

export const asyncLoadpeoples = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    const ultimateData = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
    };

    console.log("Fetched Data:", ultimateData);

    dispatch(loadperson(ultimateData));
  } catch (error) {
    console.error("Error Fetching the Person Info:", error.response || error.message);
  }
};
