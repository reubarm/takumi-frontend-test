import { useState } from "react";

import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Link,
  IconButton,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export const SECTION_BRANDS = "Brands";
export const SECTION_CAMPAIGNS = "Campaigns";
export const SECTION_INFLUENCERS = "Influencers";

interface Props {
  title: string;
  onChange: (section: string) => void;
  window?: () => Window;
}

const drawerWidth = 240;

export default function NavigationBar(props: Props) {
  const { window, onChange } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleChange = (value: string) => {
    onChange(value);
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Reuben Test Interview
      </Typography>
      <Divider />
      <List>
        <ListItem onClick={() => handleChange(SECTION_BRANDS)} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Brands" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => handleChange(SECTION_CAMPAIGNS)}
          disablePadding
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Campaigns" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => handleChange(SECTION_INFLUENCERS)}
          disablePadding
        >
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Influencers" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: 0 }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link
              href="https://github.com/reubarm/takumi-frontend-test"
              color="inherit"
              underline="none"
              target="_blank"
              rel="noopener"
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  letterSpacing: "-1px",
                  fontWeight: "600",
                }}
              >
                Reuben Test Interview
              </Typography>
            </Link>

            <Box sx={{ display: { xs: "none", sm: "block" }, ml: "auto" }}>
              <Button
                onClick={() => handleChange(SECTION_BRANDS)}
                sx={{ color: "#fff" }}
              >
                Brands
              </Button>
              <Button
                onClick={() => handleChange(SECTION_CAMPAIGNS)}
                sx={{ color: "#fff" }}
              >
                Campaigns
              </Button>
              <Button
                onClick={() => handleChange(SECTION_INFLUENCERS)}
                sx={{ color: "#fff" }}
              >
                Influencers
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
