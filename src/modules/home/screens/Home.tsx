import FooterShared from "../../../components/shared/FooterShared"
import HeaderShared from "../../../components/shared/HeaderShared"
import { StyleContentHome } from "../styles/homeScreens.styles";
import DrawerShared from "../../../components/shared/DrawerShared";
import ClientList from "../../../components/shared/ClientListShared";

const Home = () => {

  return (
    <>
      <HeaderShared />
        <StyleContentHome>
          <div className="container">
            <h1>Desafio Front-End Sênior</h1>
            <DrawerShared />
            <h3>Listagem de Clientes:</h3>
            <ClientList />
          </div>
        </StyleContentHome>
      <FooterShared />
    </>    
  )
}

export default Home;