import React, { useState, useEffect } from "react";
import "./app.css";
import Title from "./components/Title";
import { FcPlus, FcCheckmark, FcEmptyTrash } from "react-icons/fc";
import { Estadisticas } from "./components/Estadisticas";

function App() {
  const [tareas, setTareas] = useState(() => {
    const storedTareas = localStorage.getItem("tareas"); //localstorage
    return storedTareas ? JSON.parse(storedTareas) : []; //localstorage
  });
  const [nuevaTarea, setNuevaTarea] = useState("");
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);
  const controlarCambioTarea = (event) => {
    setNuevaTarea(event.target.value);
  };

  const controlarAgregarTarea = () => {
    if (nuevaTarea !== "" && nuevaTarea.length <= 47) {
      const nuevasTareas = [
        { texto: nuevaTarea, completada: false },
        ...tareas,
      ];
      setTareas(nuevasTareas);
      setNuevaTarea("");
    } else {
      window.alert("Error: texto largo o nulo");
    }
  };

  const controlarAlternarCompletada = (index) => {
    const tareasActualizadas = [...tareas];
    tareasActualizadas[index].completada =
      !tareasActualizadas[index].completada;
    setTareas(tareasActualizadas);
  };

  function contarTareasCompletadas(tareas) {
    let contador = 0;
    for (const tarea of tareas) {
      if (tarea.completada) {
        contador++;
      }
    }
    return contador;
  }

  //ELIMINAR TAREA-----------------------------------------------------------
  const controlarEliminarTarea = (index) => {
    const tareasActualizadas = tareas.filter((tarea, i) => i !== index);
    setTareas(tareasActualizadas);
    localStorage.setItem("tareas", JSON.stringify(tareasActualizadas)); // Actualizar localStorage
  };

  const limpiarTodasLasTareas = () => {
    const confirmar = window.confirm("¿confirma que deseas eliminar todas las tareas?");
    if (confirmar) {
      setTareas([]);
      localStorage.removeItem("tareas"); // También limpia el localStorage
    }
  };
  return (
    <div class="contenedor0">
      <div></div>
      <div className="titulo">
        <Title />
      </div>
      <div class="OtrasFilas"></div>
      <div class="OtrasFilas"></div>
      <div class="box2">
        <ul>
                <input
        type="text"
        value={nuevaTarea}
        size={40}
        placeholder="Escribe una tarea..."
        onChange={controlarCambioTarea}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            controlarAgregarTarea();
          }
        }}
      />
          <button
            title="agregar nueva tarea"
            class="botonesAgregar"
            onClick={controlarAgregarTarea}
          >
            Agregar <FcPlus />
          </button>

          {tareas.map((tarea, index) => (
            <h3 class="lista" key={index}>
              <button
                class="redondo" //check buttom
                title="marcar como tarea realizada"
                onClick={() => controlarAlternarCompletada(index)}
              >
                <FcCheckmark />
              </button>
              <span
                style={{
                  textDecoration: tarea.completada
                    ? "red double line-through"
                    : "none",
                }}
                /* para marcar como hecha se hace click en el texto de la tarea||   textDecoration: tarea.completada ? 'redunderline' :  'none' */
              >
                {tarea.texto}
              </span>
              <div className="lugarIcono">
                <button //eliminar
                  title="eliminar tarea"
                  className="botonesEliminar "
                  onClick={() => controlarEliminarTarea(index)}
                >
                  <FcEmptyTrash />
                </button>
              </div>
            </h3>
          ))}
        </ul>
      </div>

      <div></div>
      <div></div>
      
      <div>
        <hr />
        <form className="estadisticas">
          <div>
          < Estadisticas
            tareas={tareas}
            tareasCompletadas={contarTareasCompletadas(tareas)}
          />
          </div>
        <hr/>
          <button
            title="Eliminar todas tareas en general?"
            className="botonesGenerales"
            onClick={limpiarTodasLasTareas}
          >
            Limpiar Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
