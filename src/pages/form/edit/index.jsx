//Importação de pacote
import { Formik } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState } from "react";

//Importação do Material Uis
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//Importação de componente
import { CoffeHeader } from "../../../components/CoffeHeader";
import { MenuItem } from "@mui/material";

//Importacao de constants
import { initialsCoffes } from "../../../constants";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export function FormEdit({}) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const coffeEdit = JSON.parse(
    reactLocalStorage.get("editCoffe", initialsCoffes)
  );
  const coffes = JSON.parse(reactLocalStorage.get("coffes", initialsCoffes));

  const handleBack = () => {
    navigate("/");
  };

  const handleSaveEdit = (values) => {
    const initial = reactLocalStorage.get("coffes");
    if (!initial) {
      reactLocalStorage.set("coffes", JSON.stringify([...coffes, values]));
      handleBack();
    } else {
      const edit = coffes.filter((element) => {
        return element.id != values.id;
      });
      reactLocalStorage.set("coffes", JSON.stringify([...edit, values]));
      handleBack();
    }
  };
  const handleDelete = (values) => {
    const initial = reactLocalStorage.get("coffes");
    if (!initial) {
      reactLocalStorage.set("coffes", JSON.stringify([...coffes, values]));
      handleBack();
    } else {
      const edit = coffes.filter((element) => {
        return element.id != values.id;
      });
      reactLocalStorage.set("coffes", JSON.stringify([...edit]));
      handleBack();
    }
  };

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <ArrowBackIcon
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={handleBack}
        />
        <CoffeHeader title={"Detalhes do Café"} buttom={false} />
      </Box>

      <Tabs
        variant="scrollable"
        scrollButtons={false}
        value={value}
        style={{
          cursor: "none",
          width: "200px",
          marginBottom: "40px",
        }}
      >
        <Tab
          label="Dados Gerais"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        />
      </Tabs>

      <Formik
        initialValues={coffeEdit}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Insira um nome de café"),
          type: Yup.string().required("Insira um tipo"),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
                name="title"
                style={{ marginTop: "10px", width: "50%" }}
              />
              {errors.title && touched.title && (
                <Typography
                  variant="p"
                  component="p"
                  style={{ color: "red", marginTop: "2px" }}
                >
                  {errors.title}
                </Typography>
              )}
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={values.type}
                label="Tipo"
                name="type"
                onChange={handleChange}
                style={{ marginTop: "20px", width: "50%" }}
              >
                <MenuItem value={"Selecione"}>Selecione o tipo</MenuItem>
                <MenuItem value={"hot"}>Hot</MenuItem>
                <MenuItem value={"iced"}>Iced</MenuItem>
              </Select>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  <Button
                    variant="contained"
                    color={"primary"}
                    size="medium"
                    onClick={() => {
                      handleDelete(values);
                    }}
                    style={{
                      marginTop: "10px",
                      width: "24%",
                      marginRight: "5px",
                    }}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="contained"
                    color={"primary"}
                    size="medium"
                    onClick={() => {
                      handleSaveEdit(values);
                    }}
                    style={{ marginTop: "10px", width: "24%" }}
                  >
                    Salvar
                  </Button>
                </Box>
              </ThemeProvider>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
}
