import React, { useState } from "react";
import { Box, Typography, Grid, CardHeader, useTheme, Card, Divider, Button, Menu, MenuItem, Stack } from "@mui/material";
import { tokens } from "../../theme";
import CardLineGraph from "./CardLineGraph";
import CardBarGraph from "./CardBarGraph";
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
        height: "100vh", 
        padding: "16px" 
    }:{ 
        background: "#f6f7f9", 
        height: "100vh", 
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
        <Card elevation={3} sx={{ m:2, height: "100%" }}>
            <CardHeader title="Total cash flow"/>
            <Divider/>
            <Typography variant="h6">Card 3</Typography>
          {/* Add content for Card 3 */}
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTable/>
      </Grid>
    </Grid>
  </Box>
        )
}
export default Dashboard;