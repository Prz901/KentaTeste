//Importacao de Componentes do Material Ui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export function CoffeHeader({
  title,
  buttom,
  buttomString,
  handleClickButtom,
}) {
  const handleClick = () => {
    handleClickButtom();
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 1000,
          marginBottom: "30px",
        }}
      >
        <Typography variant="h" component="h2">
          {title}
        </Typography>
        {buttom ? (
          <Button
            variant="contained"
            color={"primary"}
            size="medium"
            onClick={handleClick}
          >
            {buttomString}
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </ThemeProvider>
  );
}
