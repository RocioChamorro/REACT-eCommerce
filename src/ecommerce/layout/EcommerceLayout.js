import { Container, Grid, Toolbar } from "@mui/material";
import { Navbar } from "../components/ui/Navbar";


export const EcommerceLayout = ({ children }) => {
  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
        <main>
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          */}
          <Toolbar />
          <Grid container spacing={4} sx={{ mb: 1 }}>
            {children}
          </Grid>
        </main>
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </>
  );
};
