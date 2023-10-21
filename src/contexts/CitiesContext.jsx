import { useContext } from "react";
import { useEffect } from "react";
import { createContext, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((eCity) => eCity.id !== action.payload),
        currentCity: {},
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const BASE_URL = "http://localhost:9001";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log("AD line 54!");

  useEffect(() => {
    console.log("line 57");
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const rs = await fetch(`${BASE_URL}/cities`);
        const data = await rs.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // pending id check
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      const rs = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await rs.json();
      // add the city data in currentCity
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error while loading a city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const rs = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await rs.json();

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "rejected",
        payload: "There was an error while creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error while deleting a city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
