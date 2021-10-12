import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";

function GallerySetup() {
  const { objLogin } = useContext(AppContext);

  return (
    <div className="mt-3">
      <Form.Group controlId="formFileMultiple">
        <Form.Label>Select your gallery photos:</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => console.log(e.target.files)}
        />
      </Form.Group>
    </div>
  );
}

export default GallerySetup;
