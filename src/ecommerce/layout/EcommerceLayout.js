import { Container, Grid, Toolbar } from "@mui/material"
import { Navbar } from "../components/ui/Navbar"

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];

export const EcommerceLayout = ({ children }) => {
  return (
    <>
   
      <Container maxWidth="lg">
        <Navbar title="Blog" sections={sections} />
        <main>
        
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          */}
          <Toolbar />
          <Grid container spacing={4} >
            { children }
          </Grid>
        </main>
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </>
  )
}
