import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/system"
import { ecommerceTheme } from "./"

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ ecommerceTheme }>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline */}
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
