// utils/eventos.ts
import { DeviceEventEmitter } from "react-native";

export const NOTIFICAR_CAMBIO_FOTO = "CAMBIO_FOTO_PERFIL";

export const emitiCambioFoto = () => {
  DeviceEventEmitter.emit(NOTIFICAR_CAMBIO_FOTO);
};
