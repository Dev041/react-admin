import React, { useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, CardHeader, Typography, Divider, Button, Box, Menu, MenuItem, useTheme, CircularProgress  } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { tokens } from "../../theme";

const MonthDropdown = ({ onSelectMonth, selectedMonth }) => {
  const theme = useTheme ();
  const colors = tokens(theme.palette.mode);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (month) => {
    setAnchorEl(null);
    if (month) {
      onSelectMonth(month);
    }
  };

  return (
    <div>
      <Button 
        variant={theme.palette.mode==="dark"?"contained":"outlined" }
        onClick={handleClick} 
        size="small" 
        endIcon={<ArrowDropDownIcon 
        sx={{ color: "#47b747" }} />}>
          {selectedMonth}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        {months.map((month) => (
          <MenuItem key={month} onClick={() => handleClose(month)}>
            {month}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const CardLineGraph = () => {
  const theme = useTheme ();
  const colors = tokens(theme.palette.mode);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [yData, setYData] = useState([30, 45, 15, 24, 10, 20, 60, 40, 30, 10]);
  const [isLoading, setIsLoading] = useState(false);
  const svgRef = useRef();

  useLayoutEffect(() => {
    
    const xData = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    const margin = { top: 20, right: 10, bottom: 30, left: 20 };
    const width = 420 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([d3.min(xData), d3.max(xData)]).range([0, width]);

    const y = d3.scaleLinear().domain([0, d3.max(yData)]).range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(xData[i]))
      .y((d) => y(d))
      .curve(d3.curveCardinal);

    svg
      .append("path")
      .datum(yData)
      .attr("fill", "none")
      .attr("stroke", "#47b747")
      .attr("stroke-width", 3)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(xData.length))
      .selectAll("text")
      .attr("dy", "1em")
      .attr("dx", "-1em")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");
  }, [yData, isLoading]); 

  const handleManageClick = () => {
    setIsLoading(true);

    const newRandomData = yData.map((value) => value + Math.floor(Math.random() * 20));
    setYData(newRandomData);

    setTimeout(() => {
      // Set loading back to false
      setIsLoading(false);
    }, 1000);
  };
  return (
    <Card elevation={3} sx={{ m: 2, height: "100%" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        title="Checking Account"
        action={
          <Box display="flex">
            <Button 
                variant={theme.palette.mode === 'dark' ? "contained" : "outlined"}
                sx={{ mr: 1 }} 
                size="small" 
                endIcon={<ArrowDropDownIcon sx={{ color: "#47b747" }} />} 
                onClick={handleManageClick}
            >
                Manage
            </Button>
            <MonthDropdown
              onSelectMonth={(month) => setSelectedMonth(month)}
              selectedMonth={selectedMonth}
            />
          </Box>
        }
      />
      <Divider />
      {isLoading ? (
        // Show loader when the graph is loading
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        // Show the graph when not loading
        <svg ref={svgRef}></svg>
      )}
    </Card>
  );
};

export default CardLineGraph;