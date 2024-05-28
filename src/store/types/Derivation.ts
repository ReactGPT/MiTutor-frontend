export type Derivation = {
  personName: string,
  
  appointmentId : number,
  programId : number,
  programName : string,
  appointmentStatus : string,
  groupBased : boolean,
  creationDate : string,
  personId : number,
  name : string,
  lastName : string,
  secondLastName : string,
  isInPerson : boolean,
  startTime : Date,
  endTime : Date,
  reason : string
}

// const formDataObject = {
//   "Marca temporal": formData["Marca temporal"],
//   "Nombre de Alumno": formData["Nombre de Alumno"],
//   "Código": formData["Código"],
//   "Correo electrónico del alumno": formData["Correo electrónico del alumno"],
//   "Derivado por": formData["Derivado por"],
//   "Cargo": formData["Cargo"],
//   "Correo electrónico de quien deriva": formData["Correo electrónico de quien deriva"],
//   "Unidad de la persona que deriva": formData["Unidad de la persona que deriva"],
//   "Fecha de derivación": formData["Fecha de derivación (día/mes/año)"],
//   "Motivo de derivación": formData["MOTIVO DE DERIVACIÓN"],
//   "A qué servicio se le deriva": formData["A QUÉ SERVICIO SE LE DERIVA  "]
// };