//Importacao de pacote
import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

//Importacao de componente Material Ui
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Importacao de Modulo
import api from "../../services";

//Importacao de constants
import { initialsCoffes } from "../../constants";

export function CoffeTable() {
  const [type, setTypes] = useState("hot");
  const [dataTable, setDataTable] = useState([]);
  const coffes = reactLocalStorage.get("coffes", initialsCoffes);
  const navigate = useNavigate();

  const handleType = (event) => {
    setTypes(event.target.value);
  };

  // async function fetchCoffe() {
  //   const { data } = await api.get(`/${type}`);
  //   setDataTable(data);
  // }

  const handleSetData = (values) => {
    const parsed = JSON.parse(values);
    const coffesFiltred = parsed.filter((element) => {
      if (element.type === type) {
        return element;
      }
    });
    setDataTable(coffesFiltred);
  };

  useEffect(() => {
    const initial = reactLocalStorage.get("coffes");
    if (!initial) {
      reactLocalStorage.set("coffes", JSON.stringify(initialsCoffes));
      handleSetData(JSON.stringify(initialsCoffes));
    } else {
      handleSetData(initial);
    }
  }, [type]);

  useEffect(() => {
    if (!reactLocalStorage.get("coffes")) {
      reactLocalStorage.set("coffes", JSON.stringify(initialsCoffes));
    }
  }, []);

  const handleEdit = (value) => {
    reactLocalStorage.set("editCoffe", JSON.stringify(value));
    navigate("/edit");
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
        <InputLabel id="demo-select-small">Tipo</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={type}
          label="Tipo"
          onChange={handleType}
        >
          <MenuItem value={"hot"}>Hot</MenuItem>
          <MenuItem value={"iced"}>Iced</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableBody>
            {dataTable.map((data) => (
              <TableRow key={data.id}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    handleEdit(data);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {data.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
