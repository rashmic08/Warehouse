import { Box, Typography, withStyles, Paper, Table, TableRow, TableHead, TableContainer, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom'

const Product = withStyles(
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
      maxWidth: "70%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    tableHead: {
      backgroundColor: "#1976d2"
    },
    tableCell: {
      fontSize: "20px",
      color: "white",
      backgroundColor: "#1976d2"
    },
    link: {
      color: "white",
    }
  }),
  { name: "Product" }
)(props => {
  const { classes } = props;

  const [file, setFile] = useState();
  const [productData, setProductData] = useState();
  useEffect(() => {
    showProducts();
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
  };

  const showProducts = () => {
    Axios.get('http://localhost:3001/product/getProducts').then((res) => {
      console.log("sucess", res);
      console.log("response.data-getProducts-", res.data);
      setProductData(res.data);
    })
  }


  const sellProduct = (id) => {
    console.log("Click on onBuy", id);
    Axios.post(`http://localhost:3001/product/sellProduct/${id}`).then(res => {
      console.log("sucess after onBuy", res);
    })
  }


  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar><Link to="/inventory" className={classes.link}>View Articles</Link></Toolbar>
      </AppBar>
      <Box className={classes.titleContainer}>
        <Typography variant="h4" className={classes.title}>
          Products in store
        </Typography>
        <input type="file" name="file" onChange={onFileChange} />
        <Button className={classes.button} variant="contained" onClick={onFileUpload}>Upload Products</Button>
      </Box>

      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 650, maxWidth: "80%" }} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.tableCell}>Product Name</TableCell>
              <TableCell className={classes.tableCell} align="right">Price</TableCell>
              <TableCell className={classes.tableCell} align="right">Article list</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.product_name}</TableCell>
                <TableCell align="right">{row.product_price}</TableCell>
                <TableCell align="right">{row.article_list}</TableCell>
                <TableCell align="right"><Button variant="contained" onClick={(e) => sellProduct(row.product_id)}>Buy</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );
});

export default Product;
