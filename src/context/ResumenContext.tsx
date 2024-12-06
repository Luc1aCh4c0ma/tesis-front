import React, { createContext, useContext, useState, ReactNode } from "react";

interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface ResumenContextType {
  resumen: { [key: number]: Item };
  agregarItem: (item: Item) => void;
  eliminarItem: (id: number) => void;
}

const ResumenContext = createContext<ResumenContextType | undefined>(undefined);

export const useResumen = () => {
  const context = useContext(ResumenContext);
  if (!context) {
    throw new Error("useResumen debe ser usado dentro de ResumenProvider");
  }
  return context;
};

export const ResumenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumen, setResumen] = useState<{ [key: number]: Item }>({});

  const agregarItem = (item: Item) => {
    setResumen((prevResumen) => {
      const existente = prevResumen[item.id];
      if (existente) {
        return {
          ...prevResumen,
          [item.id]: {
            ...existente,
            cantidad: existente.cantidad + item.cantidad,
          },
        };
      } else {
        return {
          ...prevResumen,
          [item.id]: item,
        };
      }
    });
  };

  const eliminarItem = (id: number) => {
    setResumen((prevResumen) => {
      const newResumen = { ...prevResumen };
      delete newResumen[id];
      return newResumen;
    });
  };

  return (
    <ResumenContext.Provider value={{ resumen, agregarItem, eliminarItem }}>
      {children}
    </ResumenContext.Provider>
  );
};
