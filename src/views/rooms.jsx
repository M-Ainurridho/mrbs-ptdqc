import Layout from "../layout";
import Container from "../components/container";
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableColumn,
} from "../components/tables";
import { resources } from "../lib/data";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Rooms = () => {
  return (
    <Layout>
      <Container className="my-4">
        <h4 className="display-6">All Rooms</h4>
        <Table>
          <TableHead fields={["No", "Area", "Room", "Action"]} />
          <TableBody>
            {resources.map((data, i) => (
              <TableRow key={i}>
                <TableColumn>{i + 1}</TableColumn>
                <TableColumn>{data.area}</TableColumn>
                <TableColumn>{data.room}</TableColumn>
                <TableColumn className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm">
                    <PencilSquareIcon style={{ height: "18px" }} />
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <TrashIcon style={{ height: "18px" }} />
                  </button>
                </TableColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Layout>
  );
};

export default Rooms;
