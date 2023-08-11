import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
} from "@mui/material";
import axios from "axios";

function Pokemon() {
  // menyimpan dan merubah data dengan state
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [loadMoreValue, setLoadMoreValue] = useState("Load More");

  // Berfungsi untuk mengambil data Pokemon dari API berdasarkan nomor halaman
  const fetchPokemon = async (newPage) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${
          (newPage - 1) * 10
        }&limit=10`
      );

      let newPokemonList = [...pokemonList, ...response.data.results];
      console.log(...pokemonList);

      // Tambahkan "Load More" hanya jika belum ada dalam daftar
      if (!pokemonList.includes("Load More")) {
        newPokemonList.push("Load More");
      }

      setPokemonList(newPokemonList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Berfungsi untuk menangani klik tombol "Load More".
  const handleLoadMore = async () => {
    setLoadMoreValue("Loading...");
    const newPage = page + 1;
    await fetchPokemon(newPage);
    setPage(newPage);
    setLoadMoreValue("Load More");
  };

  // Berfungsi untuk menyesuaikan bagaimana opsi ditampilkan di komponen Pelengkapan Otomatis
  const getOptionLabel = (option) => {
    if (typeof option === "Load More") {
      return option; // Mengembalikan String secara langsung
    }
    return option.name; // Mengembalikan properti nama untuk opsi Pokemon lainnya
  };

  useEffect(() => {
    fetchPokemon(page);
  }, []);

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
              <div style={{ position: "relative" }}>
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
                  // option pada Autocomplete
                  renderOption={(props, option) => (
                    <div>
                      <li {...props}>{getOptionLabel(option)}</li>
                      {option === "Load More" && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "16px",
                          }}
                        >
                          {/* tombol button untuk menambahkan 10 data baru */}
                          <Button
                            fullWidth={true}
                            onClick={handleLoadMore}
                            disabled={loading}
                            style={{
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            <span style={{ textTransform: "uppercase" }}>
                              {loadMoreValue}
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Pokemon;
