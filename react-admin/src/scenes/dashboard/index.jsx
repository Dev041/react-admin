import React, { useState } from "react";
import { Box, Typography, Grid, CardHeader, useTheme, Card, Divider, Button, Menu, MenuItem, Stack } from "@mui/material";
import { tokens } from "../../theme";
import CardLineGraph from "./CardLineGraph";
import CardBarGraph from "./CardBarGraph";
import CardStackedBar from "./CardStackedBar";
import CardTable from "./CardTable";


const Dashboard = () => {
    const theme = useTheme ();
    const colors = tokens(theme.palette.mode);
    return (

    <Box 
    sx={
      theme.palette.mode === 'dark'?
      { 
        background: "#0C101B", 
        height: "110vh", 
        padding: "16px"
    }:{ 
        background: "#f6f7f9", 
        height: "110vh", 
        padding: "16px" 
    }
}
        >
    <Grid container spacing={2}>
      {/* First Row */}
      <Grid item xs={12} md={6}>
        <CardLineGraph/>
      </Grid>

      <Grid item xs={12} md={6}>
        <CardBarGraph />
      </Grid>

      {/* Second Row */}
      <Grid item xs={12} md={6}>
        <CardStackedBar/>
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTable/>
      </Grid>
    </Grid>
    <br/>
  </Box>
        )
}
export default Dashboard;