export const Services = {
    BaseUrl: import.meta.env.VITE_API_URL || "https://api.daoch.me",
    //BaseUrl:"https://localhost:44369",
    //BaseUrl:"http://54.235.188.31",
    Headers: {
        'Content-Type': 'application/json'
    },
    ServiceErrorConectionMessage: "Ocurrió un problema de conexión interna. Intentar nuevamente o contactar al equipo de soporte"
}; 