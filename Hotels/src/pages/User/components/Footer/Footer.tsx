import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import BlackLogo from "../../../../assets/images/BlackLogo.png";
import WhiteLogo from "../../../../assets/images/WhiteLogo.png";
import styles from "./Footer.module.scss";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <Box
        component="footer"
        className={styles.footer}
        py={4}
        px={2}
        sx={{
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={2} className={styles.links}>
          <Grid item xs={12} md={3}>
            <Box>
              <img
                src={isDarkMode ? WhiteLogo : BlackLogo}
                alt="Logo"
                style={{ maxWidth: "250px", marginBottom: "16px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              COMPANY
            </Typography>
            <ul>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Legal Information
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Blogs
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              HELP CENTER
            </Typography>
            <ul>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Find a Property
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  How To Host?
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Why Us?
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" color={theme.palette.text.primary}>
                  Rental Guides
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              CONTACT INFO
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: 0569625164
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: muthana.aboaleez@gmail.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location: 403 Nablus,PS
            </Typography>
            <Box mt={1} display="flex" gap={2}>
              <Link
                href="https://www.facebook.com/muthane.aboalez"
                color={theme.palette.primary.main}
              >
                <Facebook />
              </Link>
              <Link
                href="https://www.instagram.com/muthana_abo_alez"
                color={theme.palette.primary.main}
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.linkedin.com/in/muthana-abo-alez"
                color={theme.palette.primary.main}
              >
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.bottom} py={2} sx={{borderTop: `1px solid ${theme.palette.divider}`}}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Muthana Abo Aleez | All rights reserved
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
