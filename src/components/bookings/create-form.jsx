import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";
// import { useContext, useState } from "react";
// import { UserContext } from "../lib/context";

const AddEventButton = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addEvent"
      >
        Add Event
      </button>
      <EventModal />
    </>
  );
};

export const EventModal = () => {
  return (
    <div
      className="modal fade"
      id="addEvent"
      tabIndex="-1"
      aria-labelledby="addEvent"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Event
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                />
                {/* <small className="text-danger">Username isn't registered</small> */}
              </div>
              <div className="mb-3">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Full Description"
                ></textarea>
                {/* <small className="text-danger">Username isn't registered</small> */}
              </div>
              <div className="mb-3">
                <input
                  type="time"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Start Date"
                />
                {/* <small className="text-danger">Username isn't registered</small> */}
              </div>
              <button
                className="d-block btn-login btn btn-primary w-full"
                style={{ width: "100%" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventButton;
