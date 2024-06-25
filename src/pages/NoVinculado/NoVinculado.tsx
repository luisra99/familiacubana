
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { datico as db} from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { Button, Stack, Typography } from "@mui/material";

import {
  obtenerMiembros,
  } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { FormMiembrosAdults } from "@/app/user-interfaces/forms/forms.config";

function NoVinculado() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const notificar = NotificationProvider();
  const [id, setid] = useState<any>(null);
  const [miembros, setMiembros] = useState<any>([]);
  const [datatable, setDataTable] = useState<any>([]);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [configuracionParentesco, setConfiguracionParentesco] = useState({});
  

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    console.log("miembros", data), setMiembros(data);
  });
  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    console.log("kakita", datos);
    setDataTable(datos);
  }
 
  async function obtenerDatos(idmiembro: any) {
     console.log(idmiembro);
    const data = await datico.dat_nvinculacionmiembro
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    console.log("data", data);
     const result = await unionNomenclador(data);
    return data;
  }

  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        // console.log(obj);
        const aditamento = await datico.nom_concepto.get(
          parseInt(obj?.idaditamento[0] ?? 0)
        );
        const disponibilidad = await datico.nom_concepto.get(
          parseInt(obj?.disponeadit[0] ?? 0)
        );
        console.log("diarrea", {
          ...obj,
          aditamento: aditamento?.denominacion,
          disponibilidad: disponibilidad?.denominacion,
        });
        return {
          ...obj,
          aditamento: aditamento?.denominacion,
          disponibilidad: disponibilidad?.denominacion,
        };
      })
    );
    return join;
  }

  const parentesco = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9740")
      .toArray();
      console.log("lololo", prueba)
    return prueba;
  });


  

  const navegar = useNavigate();

  const siguiente = () => navegar("/autonomia/discapacidad");
  const anterior = () => navegar("/ocupacion/principal");


  function getPage() {
    if (idhogar) {
    if (miembros.length) {
    return (
    <GenericForm
        name="tesst"
        controls={[
          {
            type: "select",
            name: "idmiembro",
            label: "Miembro del hogar",

            gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
           
            options: miembros,
            onChange: (e, refs) => {
              const { value } = e.target;
              setIdMiembroHogar(value);
              onChangeMiembro(value);
              refs.setFieldValue("idtiposayuda", [], true),
                refs.setFieldValue("idremuneraciones", [], true);
              refs.setFieldValue("idmotivodecision", [], true),
                refs.setFieldValue("idcausasnoremuneraciones", [], true);
                refs.setFieldValue("parentesco", [], true);
               
            },
        },
          {
            type: "radio",
            label: "Se Encuentra",
            name: "idtiposayuda",
            gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
          
            radios: [
              { idconcepto: "1", denominacion: "Apto" },
              { idconcepto: "2", denominacion: "No Apto o fuera de la edad laboral" },
            ],
            defaultValue: "1",
            direction: "row",
            labelPlacement: "end",
            
            disabled: (values) => values.idmiembro == "",
          
           
          },
          {
            type: "select",
            gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
            label: "Causas por la que no se encuentra vinculado al trabajo remunerado",
            name: "idremuneraciones",
            url:"9354",
            disabled: (values) => values.idmiembro == "" || values.idtiposayuda !="1",
          },
          {
            type: "select",
            label: "Motivo de la decisi�n",
            name: "idmotivodecision",
            gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
            url: "9360",
            disabled: (values) => values.idmiembro == "" ||  values.idtiposayuda !="1" || values.idremuneraciones!= "9357",
          },
                 {
            type: "select",
            label: "Escoja la opci�n",
            name: "idcausasnoremuneraciones",
            multiple: "check",
            gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
            url: "9363",
            disabled: (values) => values.idmiembro == "" || values.idtiposayuda !="2",
          },
          {
            type: "component",
            component: () =>
              parentesco?.map((parentesco: any) => (
                <GenericForm
                  name="parentesco"
                  controls={[
                    {
                      type: "component",
                      component: () => (
                        <Typography sx={{ mt: 2 }}>
                          {parentesco.denominacion}
                        </Typography>
                      ),
                      label: "",
                      name: "",
                      
                      gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 2 },
                    },

                    {
                      type: "number",
                      name: "cantidad",
                      label: "Cantidad de Personas",
                      format: "units",
                      
                      gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
                      onChange: (event, values) => {
                        console.log("valitoa",values)
                        //#region Raul
                        //Se actualiza una variable con la configuraci�n de los alimentos
                        setConfiguracionParentesco((prev: any) => {
                          console.log("prev", prev)
                          prev[parentesco.idconcepto] = {
                            ...prev[parentesco.idconcepto],
                           cantidad: event.value,
                                                      
                          };
                          return prev;
                        });
                        //#endregion
                      },
                                           
                    },

                    
                  ]}
                  endpointPath="/"
                  title=""
                  hideButtons={true}
                />
              )),
            gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
            name: "",
            label: "",
            disabled: (values) => values.idmiembro == "" || values.idmotivodecision !="9361" ,
          },

          //  ...FormMiembrosAdults,
        ]}
        title="Miembros adultos no vinculados al trabajo remunerado"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          Object.values(configuracionParentesco).forEach(
            (parentesco: any) =>
              crear("dat_nvinculacionmiembro", {
                ...parentesco,
                ...values,
               idmiembrohogar:values.idmiembro[0],
               idcodigohogar: getHogar(),
            })
          );
            notificar({
              type: "success",
              title: "Adicionar",
              content: "Se ha adicionado correctamente",
            });
            onChangeMiembro(idmiembrohogar);
          }
        }
      
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_nvinculacionmiembro",
            "idnvinculacionmiembro",
            id
          )
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
      />
    )
  }
}
  }
  return (
    <>
      <Meta title="Controles" />
      {getPage()}
     
    </>
  );
}

export default NoVinculado;
