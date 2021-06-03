import React, { useEffect, useState, useRef } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabletop from "tabletop";

const DepartmentRelation = {
  Admissions: [
    "Admissions",
    "Admissions & Financial Aid",
    "Admissions Ethical Culture",
    "Admissions Fieldston",
    "Admissions Fieldston Lower",
    "Admissions Fieldston Upper",
  ],
  Athletics: ["Athletics", "Fieldston Sports"],
  "Auxiliary Programs": [
    "Auxiliary Programs",
    "FEP",
    "Related Programs",
    "Summer Programs - Fieldston YDC",
  ],
  "Campus Safety": ["Campus Safety"],
  Communications: ["Communications"],
  "Design Center/Fieldston Press": ["Design Center/Fieldston Press"],
  "Ethical Culture": ["Ethical Culture", "EC Kindergarten"],
  Facilities: ["Facilities"],
  "Fieldston Middle": [
    "Fieldston Middle / Fieldston Upper",
    "Fieldston Middle/Fieldston Upper",
    "Fieldston/Fieldston Middle",
    "Fieldston Middle",
  ],
  "Fieldston Lower": ["Fieldston Lower", "School Office - FL"],
  "Fieldston Upper": [
    "Fieldston Upper",
    "Fieldston Middle / Fieldston Upper",
    "Fieldston Middle/Fieldston Upper",
    "Fieldston",
    "FS",
  ],
  "Finance & Administration": ["Finance & Administration"],
  "Head of School": ["Head Of School"],
  "Institutional Advancement & Alumni": ["Institutional Advancement & Alumni"],

  Technology: ["Technology"],
};
var _ = require("lodash");

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
function DirPersonCard({ user }) {
  console.log(user);
  const classes = makeStyles();

  return (
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
          {user.phone.length > 1 ? <Typography>{user.phone}</Typography> : null}
        </CardContent>
      </Card>
    </Grid>
  );
}
export default function Album() {
  const SearchRef = useRef();
  const [dept, setDept] = React.useState("ECFS");
  const [name, setName] = React.useState("");
  const [data, setData] = useState({ loading: true, filteredData: [] });
  useEffect(() => {
    Tabletop.init({
      key: "187cjvjLlbjlE8VqvBXvybdB2idg27cQn0tAx0RZSXFs",
      simpleSheet: true,
    })
      .then((responseData) => {
        // console.log(responseData);
        setData({
          loading: false,
          raw: responseData,
          filteredData: _.orderBy(responseData, ["name"]),
        });
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

  const filterResults = () => {
    // console.log(SearchRef.current.value);
    // console.log(dept);
    let filteredResults = [];
    let deptQuery = dept;
    let nameQuery = name;
    if (deptQuery == "ECFS") {
      filteredResults = _.filter(
        data.raw,
        (user) =>
          user.name
            .toLowerCase()
            .indexOf(SearchRef.current.value.toLowerCase()) > -1
      );
      setData({
        ...data,
        filteredData: filteredResults,
      });
    } else {
      // if (deptQuery == "Fieldston Upper") {
      //   deptQuery = "Fieldston";
      // }
      // filteredResults = _.filter(
      //   data.raw,
      //   (user) => user.department == deptQuery
      // );

      filteredResults = _.filter(data.raw, (user) =>
        DepartmentRelation[deptQuery].includes(user.department)
      );
      filteredResults = _.filter(
        filteredResults,
        (user) =>
          user.name
            .toLowerCase()
            .indexOf(SearchRef.current.value.toLowerCase()) > -1
      );
      setData({
        ...data,
        filteredData: filteredResults,
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ECFSBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="#fe5000" noWrap>
            ECFS Employee Directory
          </Typography>
        </Toolbar>
      </ECFSBar>
      {data.loading ? (
        <CircularProgress
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      ) : (
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <form
                className={classes.formControl}
                noValidate
                autoComplete="off"
              >
                <TextField
                  style={{ minWidth: "40ch" }}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  inputRef={SearchRef}
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
                    placeholder={"Select Department"}
                  >
                    {["ECFS", ...Object.keys(DepartmentRelation)].map(
                      (item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SearchIcon />}
                  onClick={() => filterResults()}
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
                <DirPersonCard user={user} />
              ))}
            </Grid>
          </Container>
        </main>
      )}
    </React.Fragment>
  );
}
