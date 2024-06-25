
import { crearNomenclador } from "@/app/user-interfaces/forms/models/controllers";


// export const setToLocalStorage = async (data: any) => {
  //   const idNomencladores = Object.keys(data);
  //   for (let id of idNomencladores) {
    //     const { idPadre, idConcepto, denominacion } = data[id];
    //     await crearNomenclador(idPadre, idConcepto, denominacion);
    //   }
    // };


    export const setToLocalStorage = (data: any) => {
      const idNomencladores = Object.keys(data);
      
      // idNomencladores.forEach((id) => setItem(id, data[id]));
       console.log("Estos son los nomencladores",idNomencladores);
      idNomencladores.forEach((id) => {
        data[id].forEach((obj:any)=> {
          console.log(obj);
          crearNomenclador(id, obj.idconcepto, obj.denominacion);
        });
      });
      return idNomencladores;
    };
    
    export const setItem = async (id: string, value: any) =>
      localStorage.setItem(`/${id}`, JSON.stringify(value));
      

    