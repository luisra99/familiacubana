import { Update } from "./types";

export function formReducer(state: any, update: Update): any {
  switch (update.type) {
    case "set-initial-values": {
      return update.initialFormData;
    }
    case "set-validation-schema": {
      return update.validationSchema;
    }
    case "set-data-source": {
      return update.dataSource;
    }
  }
}
