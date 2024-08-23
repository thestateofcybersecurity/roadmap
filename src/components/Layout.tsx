import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
  color: #1e3a8a;
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Cybersecurity Roadmap Tool
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/vciso-roadmap" passHref>
            <Button color="inherit">vCISO Roadmap</Button>
          </Link>
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
