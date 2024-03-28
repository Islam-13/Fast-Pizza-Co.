import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAddress = createAsyncThunk("user/fetchAdress", async () => {
  // 1) get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city}${addressObj?.postcode}, ${addressObj?.countryName}.`;

  // 3) Then return an object with the data that we are interested in
  return { position, address };
});

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = action.payload.position;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address, make sure to fill it.";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
