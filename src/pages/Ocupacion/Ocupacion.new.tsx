import { useEffect, useState, useCallback } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { TableView } from "@/_pwa-framework/user-solicitudes/view/user-view";
import { Typography } from "@mui/material";
import { crear } from "@/app/user-interfaces/forms/models/controllers";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useNavigate } from "react-router-dom";
import { obtenerMiembroOcupacion, tieneOcupacion } from "./utils";
import CheckHogar from "@/utils/checkHogar";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

function Ocupacion() {
    const [idMiembro, setIdMiembro] = useState<any>(null);
    const [miembros, setMiembros] = useState<any>([]);
    const [checkMiembros, setCheckMiembros] = useState<any>([]);
    const [ocupaciones, setOcupaciones] = useState<any>([]);
    const [estadoOcupacion, setEstadoOcupacion] = useState<any>([]);

    const navegar = useNavigate();
    const siguiente = () => navegar("/ocupacion/no-vinculado");
    const anterior = () => navegar("/ingresos");
    const notificar = NotificationProvider();

    useEffect(() => {
        obtenerMiembros().then(miembros => setMiembros(miembros))
        findMiembrosCheck()
    }, [])

    useEffect(() => {
        datico.nom_concepto
            .where("idpadre")
            .equals(estadoOcupacion)
            .toArray().then((ocupaciones: any) => setOcupaciones([...ocupaciones.filter((item: any) => item.idconcepto !== 9350)]));
    }, [estadoOcupacion])

    const controlMiembros = useCallback((): IGenericControls => {
        return {
            type: "select",
            name: "idmiembrohogar",
            label: "Miembro del hogar",
            validations: {
                required: {
                    message: "Este campo es obligatorio",
                },
            },
            gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
            onChange: (e: any) => {
                setIdMiembro(`${e.target.value}`);
            },
            options: miembros,
            checkValues: checkMiembros,
        }
    }, [miembros, checkMiembros])

    const controlOcupaciones = useCallback((): IGenericControls => {
        return {
            type: "component",
            component: ({ name, setFieldValue, formValue }: any) => (
                <TableView
                    values={ocupaciones}
                    disabled={false}
                    headers={[{ name: "denominacion", label: "Ocupación" }]}
                    idKey="idconcepto"
                    name={name}
                    setFieldValue={setFieldValue}
                    multiSelect={true}
                    useCheckBox={true}
                    defaultValues={formValue}
                    hideTableHead={true}
                />),
            label: "",
            name: "idtipoocupacion",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            hidden: (values: any) => {
                return (
                    values.idmiembrohogar == "" ||
                    values.idocupacion === "9350" ||
                    values.idocupacion === "" ||
                    values.idocupacion === false
                );
            },
        }
    }, [ocupaciones])

    const ocupacionControls = useCallback((): IGenericControls[] => {
        return [controlMiembros(), {
            type: "component",
            component: () => (
                <Typography>
                    Se pregunta a qué se dedican los miembros adultos del hogar,
                    sus actividades laborales, de estudios u otras, habituales y
                    tomando de referencia los últimos 6 meses
                </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            // hidden: (values: any) => values.idmiembrohogar == "",
        },
            {
                type: "radio",
                label: "",
                name: "idocupacion",
                radios: [
                    { idconcepto: "9328", denominacion: "Trabajando" },
                    { idconcepto: "9329", denominacion: "Sin Trabajar" },
                    { idconcepto: "9350", denominacion: "NTNE" },
                ],
                direction: "row",
                validations: {
                    required: { message: "Debe seleccionar una opción" },
                },
                labelPlacement: "end",
                gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                onChangeCallback: (e, ref) => {
                    ref.setFieldValue("idtipoocupacion", [], false);
                    setEstadoOcupacion(e.target.value)
                },
            }, controlOcupaciones()]
    }, [controlMiembros, controlOcupaciones])

    const findMiembrosCheck = () => {
        tieneOcupacion(miembros).then(miembrosGuardados => setCheckMiembros(miembrosGuardados))
    }
    const submitMiembroOcupacion = async (values: any) => {
        if (values.editMode) {
            await(datico as any)
              ["dat_miembroocupacion"].where("idmiembrohogar")
              .equals([values.idmiembrohogar])
              .modify({
                idocupacion: values.idocupacion,
                idtipoocupacion:
                  values.idocupacion == "9350"
                    ? ["9350"]
                    : values.idtipoocupacion,
                idmiembrohogar: [values.idmiembrohogar[0]],
                idcodigohogar: getHogar(),
              })
              .then(() =>
                notificar({
                  type: "success",
                  title:
                    "La(s) ocupación(es) del miembro han sido adicionada(s) satisfactoriamente",
                  content: "",
                })
              );
        } else {
            crear("dat_miembroocupacion", {
                idocupacion: values.idocupacion,
                idtipoocupacion:
                    values.idocupacion == "9350" ? ["9350"] : values.idtipoocupacion,
                idmiembrohogar: [values.idmiembrohogar[0]],
                idcodigohogar: getHogar(),
            });
            notificar({
                type: "success",
                title: "La(s) ocupación(es) del miembro han sido adicionada(s) satisfactoriamente",
                content: "",
            });
        }
    };



    return (
        <CheckHogar>
            <GenericForm
                name="ocupacion"
                applyButton={false}
                title="Ocupación de los miembros del hogar"
                description=""
                endpointPath="persona"
                showSpecificDescription={false}
                idForEdit={idMiembro}
                saveButton="Guardar"
                nextButton={{ text: "Siguiente", action: siguiente }}
                prevButton={{ text: "Anterior", action: anterior }}
                controls={ocupacionControls()}
                submitFunction={submitMiembroOcupacion}
                getByIdFunction={obtenerMiembroOcupacion}
            />
        </CheckHogar>
    );
}

export default Ocupacion;
