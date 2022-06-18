//Importacao de pacote
import { useNavigate } from "react-router-dom";

//Importação de componente do Material Ui
import Container from "@mui/material/Container";

//Importação de componente
import { CoffeHeader } from "../../components/CoffeHeader";
import { CoffeTable } from "../../components/CoffeTable";

export function HomePage({ coffes }) {
  const navigate = useNavigate();

  const handleFormNew = () => {
    navigate("/new");
  };

  return (
    <Container fixed>
      <CoffeHeader
        title={"Cafés"}
        buttom={true}
        buttomString={"Novo Café"}
        handleClickButtom={handleFormNew}
      />
      <CoffeTable coffes={coffes} />
    </Container>
  );
}
