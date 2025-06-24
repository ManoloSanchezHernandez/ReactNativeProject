import React, { createContext } from "react";

// export const counterContext = createContext()
// export const contadorGlobal = createContext()

//esto estaremos usandolo solo por hoy, los demas solo son de adorno por asi decirlo al menos por ahora
export const estadoGlobal = createContext()
// export const estadoSeting = createContext()
// export const estadoTema = createContext()

//ahora usaremos este para poder anotar el estado del usuario si esta logeado
export const estadoLoginGlobal = createContext()