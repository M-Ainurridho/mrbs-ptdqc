import MyCalendar from "../components/calendar";
import Container from "../components/container";
import Layout from "../layout";
import { setTitle } from "../lib/utils";

const Home = () => {
  setTitle("Home");

  return (
    <Layout>
      <Container className="my-4">
        <MyCalendar />
      </Container>
    </Layout>
  );
};

export default Home;
