import { React, useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useStyles from "./navBar.style";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBarStyle}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="./images/ar_logo.png"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            alt="logo"
            height="30"
            width="30"
          />
          {/* md and lg screen sizes */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <div className={classes.companyName}> MY APPLICATION</div>
              <KeyboardArrowDownIcon className={classes.dropdownIcon} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">LINK 1</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* small screeen sizes */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar-one"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Task 1</Typography>
                </MenuItem>
             
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/images/ankita_avtar.jpg" />
              <div className={classes.userName}>Ankita Panjwani</div>
              <KeyboardArrowDownIcon className={classes.dropdownIcon} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
             
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">LINK to TASK1</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">LINK to TASK2</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
