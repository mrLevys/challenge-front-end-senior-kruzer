import FooterShared from "../../../components/shared/FooterShared"
import HeaderShared from "../../../components/shared/HeaderShared"

import { Button } from 'antd';

import { StyleContentHome } from "../styles/homeScreens.styles";

const Home = () => {

  // Mock List Clients
  const clientes = {
    cliente: [
      {
        nome: 'Fulano',
        sobreNome: 'De Tal',
        cpf: '14512636565'
      },
      {
        nome: 'Siclano',
        sobreNome: 'De Tal',
        cpf: '14512636566'
      },
      {
        nome: 'Beltrano',
        sobreNome: 'De Tal',
        cpf: '14512636567'
      }
    ]  
  }

  const handleOpenDrawer = () => {
    console.log('open')
  }

  return (
    <>
      <HeaderShared />
        <StyleContentHome>
          <div className="container">
            <h1>Desafio Front-End Sênior</h1>
            <Button type="primary" onClick={handleOpenDrawer}>Abrir Drawer</Button>
            <h3>Listagem de Clientes:</h3>
            <ul>
              {clientes.cliente.length && clientes.cliente.map((cliente, index) => (
                <li key={index}>
                  {`${cliente.nome} ${cliente.sobreNome} - CPF: ${cliente.cpf}`}
                </li>
              ))}
            </ul>
          </div>
        </StyleContentHome>
      <FooterShared />
    </>    
  )
}

export default Home;