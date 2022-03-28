import { Box, Typography, withStyles, Paper, Table, TableRow, TableHead, TableContainer, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom'

const Inventory = withStyles(
  theme => ({
    root: {
      width: "100%",
      marginBottom: "16px"
    },
    titleContainer: {
      marginTop: "48px",
      marginBottom: "48px",
      textAlign: "center"
    },
    title: {
      marginTop: "48px",
      marginBottom: "48px"
    },
    table: {
      marginTop: "48px",
      marginBottom: "48px",
      maxWidth: "60%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    tableHead: {
      backgroundColor: "#1976d2"
    },
    tableCell: {
      fontSize: "20px",
      color: "white",
      backgroundColor: "#1976d2",
      textAlign: "center"
    },
    link: {
      color: "white",
    }
  }),
  { name: "Inventory" }
)(props => {
  const { classes } = props;

  const [file, setFile] = useState();
  const [inventoryData, setInventoryData] = useState();

  useEffect(() => {
    showArticles();
  }, []);

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    if (file.name === "inventory.json") {
      Axios.post("http://localhost:3001/article/uploadfile", formData, {
      }).then(res => {
        console.log(res);
      })
    } else {
      Axios.post("http://localhost:3001/product/uploadfile", formData, {
      }).then(res => {
        console.log(res);
      })
    }
    window.location.reload();
  };

  const showArticles = () => {
    console.log("Click on show showArticles");
    Axios.get('http://localhost:3001/article/getArticles').then((res) => {
      console.log("sucess", res);
      console.log("response.inventorydata--", res.data);
      setInventoryData(res.data);
    })
  }

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar><Link to="/" className={classes.link}>View Products</Link></Toolbar>
      </AppBar>
      <Box className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          Inventory
        </Typography>
        <input type="file" name="file" onChange={onFileChange} />
        <Button variant="contained" onClick={onFileUpload}>Upload Articles</Button>
      </Box>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 650, maxWidth: "80%" }} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow align="center">
              <TableCell className={classes.tableCell}>Article Name</TableCell>
              <TableCell className={classes.tableCell} align="right">In stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.in_stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default Inventory;
