import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * Лоадер сайта (в стиле MUI)
 */
export const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
    >
      <CircularProgress size={64} />
    </Box>
  );
};
