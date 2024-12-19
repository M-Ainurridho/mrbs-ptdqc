import MyCalendar from "../components/calendar";
import Container from "../components/container";
import Layout from "../layout";

const Home = () => {
  return (
    <Layout>
      <Container className="my-4">
        <MyCalendar />
      </Container>
    </Layout>
  );
};

export default Home;
