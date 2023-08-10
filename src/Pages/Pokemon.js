import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  FormControl,
} from "@mui/material";
import axios from "axios";

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [loadMoreValue, setLoadMoreValue] = useState("Load More");
  

  const fetchPokemon = async (newPage) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(newPage - 1) * 10}&limit=10`
    );

    const newPokemonList = [...pokemonList, ...response.data.results, "Load More"];
    setPokemonList(newPokemonList);
    setLoading(false);

  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchPokemon(page);
}, []); 

  const handleLoadMore = async () => {
    setLoadMoreValue("Loading...");
    const newPage = page + 1;
    await fetchPokemon(newPage);
    setPage(newPage);
    setLoadMoreValue("Load More");
  };


  const getOptionLabel = (option) => option.name;

  return (
    <div>
      <Grid
        container
        justifyContent="left"
        alignItems="center"
        style={{ height: "35vh", marginLeft: 200 }}
      >
        <Grid item xs={5} sm={2} md={4}>
          <Paper elevation={5} style={{ padding: 20 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ color: "#008394", padding: "10px" }}
            >
              Selected Pokemon
            </Typography>
            <FormControl fullWidth={true}>
              <Autocomplete
                id="pokemon-autocomplete"
                options={pokemonList}
                getOptionLabel={getOptionLabel}
                loading={loading}
                multiple
                value={selectedPokemon}
                onChange={(event, newValue) => {
                  setSelectedPokemon(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Pokemon"
                    variant="outlined"
                    margin="dense"
                  />
                )}
                renderOption={(props, option) => (
                  <div>
                    <li {...props}>{getOptionLabel(option)}</li>
                    {option === "Load More" && (
                      <Button
                        fullWidth={true}
                        onClick={handleLoadMore}
                        disabled={loading}
                        style={{
                          textTransform: "none",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        <span style={{ textTransform: "uppercase" }}>
                          {loadMoreValue}
                        </span>
                      </Button>
                    )}
                  </div>
                )}
              />
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Pokemon;
	