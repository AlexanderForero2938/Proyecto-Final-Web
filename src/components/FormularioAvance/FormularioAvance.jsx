import React, { useState, useEffect } from "react";
import InputFecha from "../InputFecha/InputFecha";
import supabase from "../../supabase";
import BotonRojo from "../BotonRojo/BotonRojo";
import BotonVerde from "../BotonVerde/BotonVerde";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import './FormularioAvance.css';

const FormularioAvanceConUploader = ({ onClose, nombreUsuario, onSuccess }) => {
  const [observacionEstado, setObservacionEstado] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [objetivos, setObjetivos] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const usuario = parseInt(sessionStorage.getItem("idUsuario"));

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];

  useEffect(() => {
    const obtenerObjetivos = async () => {
      const { data, error } = await supabase.rpc("informacion_objetivos", {
        prid: nombreUsuario,
      });
      if (!error) {
        setObjetivos(data.map((obj) => obj.nombre));
      }
    };
    if (nombreUsuario) obtenerObjetivos();
  }, [nombreUsuario]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      setMessages([
        ...messages,
        { type: "error", text: "Algunos archivos no son permitidos." },
      ]);
    }

    setCurrentFiles([...currentFiles, ...validFiles]);
  };

  const enviarFormulario = async () => {
    if (!fecha || !observacionEstado || !selectedOption) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }

    const fechaParaEnviar =
      fecha instanceof Date ? fecha.toISOString().split("T")[0] : fecha;

    setLoading(true);

    try {
      const uploadedFiles = [];

      // Subir archivos seleccionados
      for (let file of currentFiles) {
        const isImage = file.type.includes("image");
        const folder = isImage ? "imagenes" : "documentos";

        // Sanitizar el nombre del archivo
        const sanitizedFileName = file.name
          .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
          .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no válidos

        const uniqueName = `${folder}_${Date.now()}_${sanitizedFileName}`;
        const filePath = `${folder}/${uniqueName}`;

        const { error } = await supabase.storage
          .from("avances")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (error) {
          console.error("Error al subir el archivo:", error);
          alert(`Ocurrió un error al subir el archivo ${sanitizedFileName}. Por favor, intente nuevamente.`);
          setLoading(false);
          return;
        }

        uploadedFiles.push(filePath);
      }

      // Enviar el array directamente, sin join
      const { error } = await supabase.rpc("registro_hito", {
        pidproyecto: nombreUsuario,
        pfecha: fechaParaEnviar,
        pdescripcion: observacionEstado,
        pobjetivo: selectedOption,
        idusuario: usuario,
        pdocumento: uploadedFiles,
      });

      if (error) {
        console.error("Error RPC registro_hito:", error);
        alert("Ocurrió un error al guardar el hito. Revisa la consola para más detalles.");
      } else {
        alert("Hito registrado exitosamente.");
        if (onSuccess) onSuccess();
      }


      if (!error) {
        alert("Hito registrado exitosamente.");
        if (onSuccess) onSuccess();
      } else {
        alert("Ocurrió un error al guardar el hito.");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div id="contenedor-formulario-avance">
      <form onSubmit={(e) => { e.preventDefault(); enviarFormulario(); }}>
        <div id="contenedor-fecha">
          <InputFecha value={fecha} onChange={(date) => setFecha(date)} />
        </div>
        <div id="contenedor-observacion">
          <textarea
            name="observacionEstado"
            value={observacionEstado}
            onChange={(e) => setObservacionEstado(e.target.value)}
            placeholder="Observación Avance"
            rows={5}
          />
        </div>
        <div id="contenedor-objetivo">
          <fieldset>
            {objetivos.length > 0 ? (
              objetivos.map((objetivo, index) => (
                <label key={index} className="objetivo">
                  <input
                    type="radio"
                    name="opciones"
                    value={objetivo}
                    checked={selectedOption === objetivo}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="texto-objetivo">{objetivo}</span>
                </label>

              ))
            ) : (
              <p>No hay objetivos para este proyecto.</p>
            )}
          </fieldset>
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.gif"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        {currentFiles.map((file, index) => (
          <p key={index} className="text-sm mt-2 text-gray-800">
            {file.name}
          </p>
        ))}

        {messages.map((msg, index) => (
          <p key={index} className={`text-sm mt-2 ${msg.type === "success" ? "text-green-700" : "text-red-700"}`}>
            {msg.text}
          </p>
        ))}

        <div id="contenedor-boton-formulario-avance">
          <BotonVerde
            label={loading ? "Guardando..." : "ACEPTAR"}
            icono={<CheckIcon />}
            type="submit"
            disabled={loading}
          />
          <BotonRojo
            onClick={onClose}
            label="CANCELAR"
            icono={<ClearIcon />}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioAvanceConUploader;
