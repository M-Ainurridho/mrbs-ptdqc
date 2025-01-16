import axios from "axios";
import Container from "../../components/container";
import Layout from "../../layout";
import { useState } from "react";
import currentDate from "../../lib/utils";

const Report = () => {
  const [selectDate, setSelectDate] = useState(currentDate);
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/bookings/generate-pdf?date=${selectDate}`,
        {
          responseType: "arraybuffer",
        }
      );

      const pdfData = new Uint8Array(response.data);

      const blob = new Blob([pdfData.buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `booking-schedule-${selectDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectDate(e.target.value);
  };

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6">
            <div className="row mb-3">
              <div className="col-12">
                <h1 className="display-6">Print Booking Schedule</h1>
              </div>
            </div>

            <div className="row mb-3">
              <div className="mb-3 row">
                <label htmlFor="selectdate" className="col-4 col-form-label">
                  Select date :
                </label>
                <div className="col-8">
                  <input
                    type="date"
                    className="form-control"
                    id="selectdate"
                    defaultValue={selectDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <button className="btn btn-secondary" disabled="disabled">
                Downloading...
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handlePrint}>
                Print PDF
              </button>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Report;
