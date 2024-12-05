import { loadperson, removeperson } from "../reducers/PersonSlice";
import axios from "../utils/axios";

export const asyncLoadpeoples = (id) => async (dispatch) => {
  try {
    const [detailResponse, externalIdsResponse] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
    ]);

    const ultimateData = {
      detail: detailResponse.data,
      externalId: externalIdsResponse.data,
    };

    dispatch(loadperson(ultimateData));
  } catch (error) {
    console.error("Error Fetching the Person Info:", error.response || error.message);
  }
};
