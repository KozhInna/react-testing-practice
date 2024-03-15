import { configureStore } from "@reduxjs/toolkit";
import countriesServices from "../services/countries";
import countriesSlice, { initializeCountries } from "../store/countriesSlice";

//will mark the function/s (coming from services) for componets (input, return), but won't implement the function logic
jest.mock("../services/countries");

describe("countriesSlice tests", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        countries: countriesSlice,
      },
    });
  });
  it("should handle the initialState", () => {
    // getState (show what is in slice state) is like useSelector, but is not so accurate
    const { countries, isLoading } = store.getState().countries;

    // testing for this
    //initialState: {
    //countries: [],
    //isLoading: true,}

    expect(countries).toEqual([]);
    expect(isLoading).toBe(true);
  });

  it("should handle getCountries", () => {
    store.dispatch({
      type: "countries/getCountries",
      payload: ["Country 1", "Country 2"],
    });
    expect(store.getState().countries.countries).toEqual([
      "Country 1",
      "Country 2",
    ]);
    expect(store.getState().countries.isLoading).toEqual(false);
  });

  it("Should handle initializeCountries", async () => {
    const mockCountries = ["Country 1", "Country 2"];

    countriesServices.getAll.mockResolvedValue(mockCountries);

    await store.dispatch(initializeCountries());

    expect(store.getState().countries.countries).toEqual(mockCountries);
    expect(store.getState().countries.isLoading).toEqual(false);
  });
});
