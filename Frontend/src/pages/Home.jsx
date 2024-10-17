import styled from "styled-components";
import Leftside from "../components/Leftside";
import Main from "../components/Main";
import Rightside from "../components/Rightside";

const Home = () => {
  return (
    <Container>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 52px;
  max-width: 85%;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Layout = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0px, 12fr) minmax(0, 5fr) minmax(0px, 5fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
