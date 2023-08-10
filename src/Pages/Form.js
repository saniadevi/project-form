import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";

function Form() {
  // state untuk merubah dan menyimpan data
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  // proses pengambilan data pada API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // berfungsi sebagai pemilihan menggunakan select userID
  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);

    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      setSelectedUserEmail(selectedUser.email);
    }
  };
  // style untuk button
  const buttonStyle = {
    backgroundColor: "#008394",
    color: "white",
    marginTop: "16px",
  };

  return (
    <div>
      <Grid
        container
        justifyContent="left"
        alignItems="center"
        style={{ height: "50vh", marginLeft: 200 }}
      >
        <Grid item xs={5} sm={2} md={4}>
          <Paper elevation={5} style={{ padding: 20 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ color: "#008394", padding: "10px" }}
            >
              Login
            </Typography>
            <form>
              {/* select yang ber isi value username */}
              <Select
                value={selectedUserId}
                onChange={handleUserSelect}
                fullWidth
                variant="outlined"
                margin="normal"
                align="left"
              >
                <MenuItem value="">
                  <em>Pilih Pengguna</em>
                </MenuItem>
                {/* mapping untuk mengambil value username */}
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
              {/* mengambil data email sesuai dengan username yang dipilih  */}
              <TextField
                value={selectedUserEmail}
                fullWidth
                variant="filled"
                margin="normal"
                label="Email"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                variant="contained"
                style={buttonStyle}
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Form;
