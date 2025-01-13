/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Container from "../../components/container";
import Layout from "../../layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTitle } from "../../lib/utils";
import ButtonBack, { ButtonDeleteItem } from "../../components/buttons";
import { getRoomById } from "../../lib/api";

const RoomDetail = () => {
  setTitle("Room Details");

  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [statusCode, setStatusCode] = useState(0);

  const fetchRoomById = async (id) => {
    try {
      const { room } = await getRoomById(id);
      setStatusCode(200);
      setRoom(room);
    } catch (err) {
      setStatusCode(err.status);
    }
  };

  useEffect(() => {
    fetchRoomById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        {statusCode == 200 ? (
          <div className="row">
            <div className="col-6 mx-auto">
              <h4 className="display-6 text-center mb-4">Room Details</h4>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Title</th>
                    <td colSpan={3}>{room?.title}</td>
                  </tr>
                  <tr>
                    <th scope="row">Room</th>
                    <td colSpan={3}>{room?.room}</td>
                  </tr>
                  <tr>
                    <th scope="row">Created</th>
                    <td colSpan={3}>{room?.createdAt}</td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex justify-content-between">
                <ButtonBack
                  style={{ width: "25%" }}
                  text="Back"
                  className="btn-secondary"
                />

                <div className="d-flex gap-2">
                  <ButtonDeleteItem id={id} path="rooms" />
                  <Link to={`/rooms/${id}/edit`} className="btn btn-primary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          statusCode === 404 && (
            <div className="alert alert-danger text-center" role="alert">
              Unknown Room
            </div>
          )
        )}
      </Container>
    </Layout>
  );
};

export default RoomDetail;
