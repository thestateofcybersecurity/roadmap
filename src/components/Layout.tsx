import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
  color: #333333;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cybersecurity Roadmap Tool
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <StyledContainer maxWidth="lg">
        <Box my={4}>
          {children}
        </Box>
      </StyledContainer>
    </>
  );
};

export default Layout;
