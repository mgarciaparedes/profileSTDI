import React, { useState, useEffect /*useCallback*/ } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
//import { SetChanges } from "./childComponent/SetChanges";
import userImage from "../../../assets/images/default-user-image.png";

//Está función está fuera del render porque si la dejo dentro de la func principal
//se vuelve a renderizar y no funciona.
//Es la función que me devuelve el html de las redes sociales => RRSS
//seleccionadas. Si te fijas yo decido como se está viendo con el valor de view,
//si view===1 me devuelve la vista de los campos que puedo editar
//si view===2 me devuelve la vista de las redes sociales en columna derecha
function Row({ onChange, onRemove, view, profile, socialNetwork }) {
  return (
    <>
      {view === 1 ? (
        <>
          <div className="col-sm-6">
            <label className="text-white">{socialNetwork}</label>
            <Form.Control
              name="profile"
              value={profile}
              onChange={(e) => onChange("profile", e.target.value)}
              //onClick={e => onChange("touchedField1", true)}
              placeholder="Type your value"
            />
          </div>

          <div className="col-sm-6">
            <button className="btn btn-sm btn-danger" onClick={onRemove}>
              <span>x</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="col-sm-12 text-white">
            <h6>{socialNetwork}</h6>
            <label>{profile}</label>
          </div>
        </>
      )}
    </>
  );
}

export const EditProfile = () => {
  const [nameState, setNameState] = useState("");
  const [bioState, setBioState] = useState("");

  //Esto no le pares, es la prueba del useCallback del Curso
  //const [counter,setCounter] = useState(10);

  // const increment = useCallback( () => {
  //   setCounter(c => c + 1);
  // }, [setCounter]);

  //Esta función va a guardar cada vez que se cambie algo en los campos de RRSS
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  //Declaro el estado del arreglo inicial que va a guardar las RRSS seleccionadas
  const [rows, setRows] = useState([]);

  //Función que guarda una fila nueva cada vez que se seleccione una opción nueva de RRSS
  //OJO: FALTA VALIDAR QUE UNA VEZ UNA OPCIÓN SEA SELECCIONADA NO PUEDA SELECCIONARSE NUEVAMENTE
  const handleOnAdd = (e) => {
    setRows(
      rows.concat({
        socialNetwork: e.target.value,
        profile: "",
      })
    );
  };

  //Función que elimina una fila determinada.
  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  useEffect(() => {
    console.log("Se ejecuta EditProfile");
  }, []);

  const handleNameChange = (e) => {
    setNameState(e.target.value);
  };

  const handleBioChange = (e) => {
    setBioState(e.target.value);
  };

  const [formEditProfile, setFormEditProfile] = useForm({
    button: null,
    bio: null,
    socialMedia: null,
  });

  const handleSocialMedia = (e) => {
    setFormEditProfile(e);
    console.log(formEditProfile);
  };

  const onSubmit = () => {
    console.log(rows);
  };

  return (
    <>
      <Formik
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm({ values: null });
        }}
        initialValues={{ fullName: null, bio: null, socialMedia: null }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            name="addServiceData"
            id="addServiceData"
          >
            <div className="row">
              <div className="col-sm-12 col-md-12 text-right">
                <a href="/" style={{ color: "#81BEF7" }}>
                  Sign Out
                </a>
              </div>
            </div>
            <div className="mt-5 row">
              <div
                className="p-5 
              col-sm-6 col-md-6"
              >
                <div className="form-group row">
                  <label style={{ color: "white" }}>Full Name:</label>
                  <Form.Control
                    values={values.fullName}
                    type="text"
                    placeholder="Type your profile name"
                    onChange={handleNameChange}
                  />
                  {/*<SetChanges increment={increment} />*/}
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>Pofile Photo:</label>
                  <input type="file" />
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>Bio:</label>
                  <Form.Control
                    values={values.bio}
                    type="text"
                    placeholder="Write something about yourself..."
                    onChange={handleBioChange}
                  />
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>
                    Social Media Channels
                  </label>
                  <small style={{ color: "#E6E6E6" }}>
                    click from the drop down to add the social media link
                  </small>
                  <Form.Control
                    as="select"
                    name="socialMedia"
                    values={values.socialMedia}
                    onChange={(e) => {
                      handleOnAdd(e);
                      handleSocialMedia(e);
                    }}
                    className="form-control"
                  >
                    <option value="Social Media Sites">
                      Social Media Sites
                    </option>
                    <option value="Instagram">Instagram</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Soundcloud">Soundcloud</option>
                    <option value="Linkedin">Linkedin</option>
                  </Form.Control>
                </div>
                <div className="form-group row">
                  <button type="submit" className="btn btn-primary">
                    Update changes
                  </button>
                </div>

                {
                  //Aquí se muestran las RRSS seleccionadas
                  //Si te fijas estoy dentro de la columna de Edición
                  //En esta columna hay que mostrar la vista de las RRSS
                  //seleccionadas y el campo para editarlas
                  //por eso dentro del componente Row (primera func arriba)
                  //le envío un view=1, así le estoy diciendo mira
                  //en esta parte de la vista tienes que mostrarme los campos
                  //para editar
                }
                <div className="form-group row">
                  {rows.map((row, index) => (
                    <Row
                      {...row}
                      onChange={(name, value) => {
                        handleOnChange(index, name, value);
                      }}
                      onRemove={() => handleOnRemove(index)}
                      key={index}
                      view={1}
                    />
                  ))}
                </div>
              </div>

              {/*Columna en donde se van mostrando los cambios*/}
              <div className="border-bold col-sm-6">
                <div className="p-4 form-group row">
                  <div className="col-sm-3">
                    <img
                      src={userImage}
                      className="rounded-circle"
                      alt="Cinque Terre"
                    />
                  </div>
                  <div className="col-sm-9">
                    <label style={{ color: "white" }}>{nameState}</label>
                    <br />
                    <label className="pt-1" style={{ color: "white" }}>
                      {bioState}
                    </label>
                  </div>
                </div>
                <div className="p-4 form-group row">
                  {
                    //Aquí es en donde muestro cómo va quedando el perfil
                    //Si te fijas mapeo el mismo arreglo rows pero lo único
                    //que cambia es el view=2, con esto le digo que me muestre
                    //la vista determinada para ver en tiempo real como se va
                    //mostrando el perfil
                    //en este tipo de vista no se puede modificar nada
                  }
                  {rows.map((row, index) => (
                    <Row
                      {...row}
                      onChange={(name, value) => {
                        handleOnChange(index, name, value);
                      }}
                      onRemove={() => handleOnRemove(index)}
                      key={index}
                      view={2}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
