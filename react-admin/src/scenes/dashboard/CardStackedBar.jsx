import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';

const CardStackedBar = () => {
    useEffect(() => {
      // Clear graph
      d3.select('#stacked-bar-chart-container').selectAll('*').remove();
  
      const data = [
        { out: 30, in: 20 },
        { out: 50, in: 40 },
        { out: 40, in: 30 },
        { out: 30, in: 20 },
        { out: 50, in: 40 },
        { out: 40, in: 30 },
      ];
  
      const colorScale = d3.scaleOrdinal().domain(['out', 'in']).range(['#47b747', '#02bb7d']);
  
      const svg = d3
        .select('#stacked-bar-chart-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('background-color', 'transparent');
  
      const stack = d3.stack().keys(['out', 'in']).order(d3.stackOrderDescending);
  
      const stackedData = stack(data);
  
      svg
        .selectAll('g')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', (d) => colorScale(d.key))
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d, i) => 35+ i * (420 / data.length)) 
        .attr('y', (d) => 20+100 - d[1])
        .attr('height', (d) => d[1] - d[0])
        .attr('width', 12) // width
  
      // labels of each bar
      const labels = ['August', 'September', 'October', 'November', 'December','January'];
      svg
        .selectAll('text')
        .data(labels)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d, i) => 45+ i * (420 / data.length)) 
        .attr('y', 145) 
        .attr('text-anchor', 'middle') 
        .style('fill', 'grey')
        .style('font-size', '12px');
  
    }, []);


  return (
    <Card elevation={3} sx={{ m: 2, height: '100%' }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Total cash flow
            </Typography>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#02bb7d',
                  borderRadius: '5px',
                }}
              />
              <Typography
                variant="body1"
                sx={{ marginLeft: '5px', marginRight: '10px', fontWeight: 'bold' }}
              >
                In
              </Typography>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#47b747',
                  marginRight: '5px',
                  borderRadius: '5px',
                }}
              />
              <Typography variant="body1" sx={{ marginRight: '15px', fontWeight: 'bold' }}>
                Out
              </Typography>
            </div>
          </Box>
        }
      />
      <Divider />
      <Box mt="5px" id="stacked-bar-chart-container" />
    </Card>
  );
};

export default CardStackedBar;
