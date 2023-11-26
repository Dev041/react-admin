import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {
  Card,
  CardHeader,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Box,
  Typography,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { tokens } from '../../theme';
import { useDropzone } from 'react-dropzone';

const CardBarGraph = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  

  const handleNewInvoiceClick = () => {
    setUploadDialogOpen(true);
  };

  const handleDialogClose = () => {
    setUploadDialogOpen(false);
  };

  // React Dropzone configuration
  const onDrop = (acceptedFiles) => {
    // Handle the uploaded files here
    console.log('Accepted Files:', acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*, application/pdf', // Define accepted file types
    multiple: false, // Allow only one file to be uploaded
  });

  useEffect(() => {
    // Clear existing graph
    d3.select('#bar-graph-container').selectAll('*').remove();
  
    // Draw the bar graph using D3
    const data = [50, 50, 60, 70, 90, 50];
    const color = '#47b747';
  
    const svg = d3
      .select('#bar-graph-container')
      .append('svg')
      .attr('width', '200%')
      .attr('height', '100%')
      .style('background-color', 'transparent');
  
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => 35+ i * (40+30))
      .attr('y', (d) => 25+(100 - d))
      .attr('width', 12)
      .attr('height', (d) => d)
      .attr('rx', 6)
      .attr('fill', color);

      const labels = ['older', 'Jan 01-08', 'Jan 09-16', 'Jan 17-24', 'Jan 25-31', 'Future'];

svg
  .selectAll('text')
  .data(labels)
  .enter()
  .append('text')
  .text((d) => d)
  .attr('x', (d, i) => 35 + i * (40 + 30) + 5)  // Center the label below each bar
  .attr('y', 145)                               // Adjust the y position as needed
  .attr('text-anchor', 'middle')                 // Center the text
  .style('fill', 'grey')
  .style('font-size', '12px'); 
      
  }, []); 
  return (
    <Card elevation={3} sx={{ m: 2, height: '100%' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
        title="Invoices owed to you"
        action={
          <Box mt="2">
            <Button
              variant="contained"
              sx={{
                mr: 1,
                color: '#02bb7d',
                backgroundColor: '#E8EEFD',
                '&:hover': {
                  backgroundColor: '#E8EEFD',
                },
              }}
              size="small"
              onClick={handleNewInvoiceClick}
            >
              New Sales Invoice
            </Button>
          </Box>
        }
      />
      <Divider />

      {/* File Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Sales Invoice</DialogTitle>
        <DialogContent>
          {/* Modern File Upload Component */}
          <div {...getRootProps()} 
          style={{ 
            cursor: 'pointer', 
            padding: '20px', 
            border: '2px dashed #02bb7d',
            borderRadius: '8px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center'
            }}>
            <input {...getInputProps()} />
            <CloudUploadOutlinedIcon fontSize="large" sx={{ mr: 2 }} />
            <Typography variant="body1" fontWeight="bold">
              Drag and drop a file here, or click to select a file.
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant={theme.palette.mode==='dark'? 'contained': 'outlined'} onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box mt='30px' id="bar-graph-container"  />
    </Card>
  );
};

export default CardBarGraph;
