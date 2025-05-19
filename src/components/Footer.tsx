import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid, Link, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';
import { Link as RouterLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const path = location.pathname;

  const token = useAppSelector((state) => state.auth.token);
  const isAdmin = token === 'admin';
  const isLoggedIn = Boolean(token);

  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ mt: 6, py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid size={{ xs: 12, md: 6, }} component='div'>
            <Typography variant="h6" fontWeight="bold">
              ParaVite Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              © 2025–{currentYear}
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <Link href="https://github.com/parabutteo" target="_blank" rel="noopener" underline="hover">
                @parabutteo
              </Link>
              <Link href="https://github.com/furtivite" target="_blank" rel="noopener" underline="hover">
                @furtivite
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6, }} component='nav'>
            <Stack spacing={1} alignItems={isMobile ? 'flex-start' : 'flex-end'}>
              {path !== '/' && (
                <Link component={RouterLink} to="/" underline="hover">
                  {t('nav.catalog', 'Catalog')}
                </Link>
              )}
              {path !== '/cart' && (
                <Link component={RouterLink} to="/cart" underline="hover">
                  {t('nav.cart', 'Cart')}
                </Link>
              )}
              {isLoggedIn && (
                <>
                  {path !== '/profile' && (
                    <Link component={RouterLink} to="/profile" underline="hover">
                      {t('nav.profile', 'Profile')}
                    </Link>
                  )}
                  {path !== '/profile/orders' && (
                    <Link component={RouterLink} to="/profile/orders" underline="hover">
                      {t('nav.myOrders', 'My Orders')}
                    </Link>
                  )}
                </>
              )}
              {isAdmin && (
                <>
                  {path !== '/admin' && (
                    <Link component={RouterLink} to="/admin" underline="hover">
                      {t('nav.admin', 'Admin')}
                    </Link>
                  )}
                  {path !== '/admin/orders' && (
                    <Link component={RouterLink} to="/admin/orders" underline="hover">
                      {t('nav.adminOrders', 'Admin Orders')}
                    </Link>
                  )}
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
