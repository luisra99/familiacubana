import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { MuiFileInput } from "mui-file-input";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";

function SubirDatos() {
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  const formInput = (
    <GenericForm
      name="formularioSubirDatos"
      controls={[
        {
          type: "component",
          component: () => (
            <>
              <Typography>
                <b>Seleccione el fichero:</b>
              </Typography>
              <MuiFileInput
                value={value}
                onChange={handleChange}
                fullWidth={true}
                inputProps={{ accept: ".json" }}
                clearIconButtonProps={{
                  title: "Remove",
                  children: <CloseIcon fontSize="small" />,
                }}
              />
              <Stack
                spacing={2}
                direction="row"
                mx={"auto"}
                my={1}
                display={"inline-list-item"}
                justifyContent="flex-end"
                sx={{ width: "100%" }}
              >
                <Button
                  onClick={async () => {
                    if (value) {
                      let formData = new FormData();
                      formData.append("archivo", value);
                      axios
                        .post(
                          `${import.meta.env.ENV_SERVER_URL}/gw/subirdatos`,
                          formData,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          }
                        )
                        .then((response) => {})
                        .catch((error) => {
                          console.error(error);
                        });
                    }
                  }}
                  variant="contained"
                >
                  Aceptar
                </Button>
              </Stack>
            </>
          ),
          label: "",
          name: "",
          gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        },
      ]}
      title="Subir datos"
      endpointPath=""
      hideButtons={true}
    />
  );

  return (
    <>
      <Meta title="Subir datos" />
      {formInput}
    </>
  );
}

export default SubirDatos;
