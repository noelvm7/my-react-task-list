export const Estadisticas = ({tareas, tareasCompletadas}) => {
  const totalTareas = tareas.length
  const totalPendientes = tareas.length - tareasCompletadas
    
  
    //const totalTareas = 
    return (
      <div>
        Total de tareas:    {totalTareas }     <hr />
        Terminadas:     {tareasCompletadas }   ||
        Pendientes:      {totalPendientes }

      </div>
    );
};

  //buscar map o filter

/*   export const Estadisticas = ({tareas}) => {
    const totaltareas = tareas.length
    console.log(totaltareas)
    
      //const totalTareas = 
      return (
        <div >
          Total Tareas: {totaltareas}
        </div>
      );
  }; */
  