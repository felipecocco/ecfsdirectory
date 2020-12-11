import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { styled } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import Tabletop from "tabletop";

const ECFSBar = styled(AppBar)({
  background: "#fe5000",
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    justifyContent: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const [dept, setDept] = React.useState("");
  const [name, setName] = React.useState("");
  const [data, setData] = useState({ filteredData: [] });
  useEffect(() => {
    Tabletop.init({
      key: "187cjvjLlbjlE8VqvBXvybdB2idg27cQn0tAx0RZSXFs",
      simpleSheet: true,
    })
      .then((responseData) => {
        console.log(responseData);
        setData({ raw: responseData, filteredData: responseData });
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleChangeDept = (event) => {
    setDept(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ECFSBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="#fe5000" noWrap>
            ECFS Staff Directory
          </Typography>
        </Toolbar>
      </ECFSBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <form className={classes.formControl} noValidate autoComplete="off">
              <TextField
                style={{ minWidth: "40ch" }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={handleChangeName}
              />

              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  style={{ minWidth: "35ch" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dept}
                  onChange={handleChangeDept}
                >
                  <MenuItem value={""}>Select Department</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SearchIcon />}
                onClick={() => console.log(name + " " + dept)}
              >
                Search
              </Button>
            </form>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.filteredData.map((user) => (
              <Grid item key={user.email} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <center>
                    <Avatar
                      src={
                        "data:image/jpe;base64, " +
                        user.picture.replace(/_/g, "/").replace(/-/g, "+")
                      }
                      style={{
                        width: "96px",
                        height: "96px",
                        marginTop: "5px",
                      }}
                    />
                  </center>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    <Typography>{user.title}</Typography>
                    <Typography>{user.department}</Typography>
                    <Typography>{user.email}</Typography>
                    {user.phone.length > 1 ? (
                      <Typography>{user.phone}</Typography>
                    ) : null}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
