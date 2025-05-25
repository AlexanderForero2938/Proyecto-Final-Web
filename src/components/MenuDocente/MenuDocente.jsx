import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import supabase from '../../supabase'; // Asegúrate de importar supabase

const pages = [
  { label: 'Gestionar Proyectos', path: '/VistaDocente/VistaGestionarProyectoDocente' }
];

function MenuDocente() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // 1. Cerrar sesión en Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // 2. Limpiar el almacenamiento local
      sessionStorage.removeItem('rol');
      sessionStorage.removeItem('idUsuario');
      localStorage.clear();

      // 3. Redirigir al login
      navigate('/');
      
      // 4. Recargar para limpiar completamente el estado
      setTimeout(() => window.location.reload(), 100);
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      alert('Error al cerrar sesión. Por favor intenta nuevamente.');
    } finally {
      setIsLoggingOut(false);
      setOpenConfirm(false);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0B2559' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menú hamburguesa (mobile) */}
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.label} 
                  onClick={handleCloseNavMenu}
                  component="a"
                  href={page.path}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo móvil */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
          >
            DOCENTE
          </Typography>

          {/* Menú horizontal (desktop) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Botón de Cerrar Sesión */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ mr: 2, color: 'white' }}>
              Docente
            </Typography>
            <Button
              variant="text"
              startIcon={<ExitToAppIcon />}
              onClick={() => setOpenConfirm(true)}
              disabled={isLoggingOut}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                },
                '&.Mui-disabled': {
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Diálogo de confirmación */}
      <Dialog open={openConfirm} onClose={() => !isLoggingOut && setOpenConfirm(false)}>
        <DialogTitle>Confirmar cierre de sesión</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas cerrar la sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenConfirm(false)} 
            disabled={isLoggingOut}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleLogout} 
            color="primary"
            disabled={isLoggingOut}
            startIcon={isLoggingOut ? <CircularProgress size={20} /> : null}
          >
            {isLoggingOut ? 'Saliendo...' : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default MenuDocente;