import { Button, Grid } from "@mui/material";

export const ProductModalFooterUser = ({ onCloseAndReset }) => {
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown")
      onCloseAndReset();
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
      <Grid item xs={2}>
        <Button onClick={handleClose}>Cerrar</Button>
      </Grid>
    </Grid>
  );
};
