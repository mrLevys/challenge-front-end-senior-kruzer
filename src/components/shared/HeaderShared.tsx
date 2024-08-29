import { Layout } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: white;
  height: 100px;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.div`
  display: flex;
  width: 100%;
  max-width: 180px;
  height: 72px !important;

  img {
    width: 100%;
    max-width: 180px;
  }
`;

const HeaderShared = () => {
 
  return (
    <StyledHeader>
      <Logo>
        <img src="./logo_kruzer.png" alt="Kruzer" />
      </Logo>
    </StyledHeader>
  )
}

export default HeaderShared;