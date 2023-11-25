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

  
  return (
    <Card elevation={3} sx={{ m: 2, height: '100%' }}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
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
            <Typography variant="body1">
              Drag and drop a file here, or click to select a file.
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant={theme.palette.mode==='dark'? 'contained': 'outlined'} onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CardBarGraph;
