export const validateByConcept = (concepto: any) => {
  switch (concepto) {
    case 9741: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 2,
        },
      ];
    case 9742: //concepto abuelos
      return [
        {
          message: "No puede declarar más de cuatro abuelos",
          test: (values: any) => values.cantidad > 2,
        },
      ];
    case 9743: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
    case 9744: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 9745: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 9746: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 9747: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 2,
        },
      ];
      case 9748: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 2,
        },
      ];
      case 9749: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 9750: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 9751: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 10240: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
      case 10241: //concepto padres
      return [
        {
          message: "No puede declarar más de dos padres",
          test: (values: any) => values.cantidad > 10,
        },
      ];
    default:
      return []
  }
};
