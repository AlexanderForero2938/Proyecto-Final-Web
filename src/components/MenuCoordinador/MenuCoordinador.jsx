import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const pages = [
  { label: 'Gestionar Usuarios', path: '/VistaCoordinador/VistaGestionarUsuario' },
  { label: 'Gestionar Proyectos', path: '/VistaCoordinador/VistaGestionarProyecto' },
];

function MenuCoordinador() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Menú hamburguesa en móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.path}
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menú visible en escritorio */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={page.path}
                key={page.label}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Avatar que redirige al login */}
          <Box sx={{ flexGrow: 0 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Cerrar sesión" />
              </IconButton>
            </Link>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuCoordinador;
