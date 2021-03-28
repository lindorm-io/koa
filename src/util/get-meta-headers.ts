import { IKoaAppMetadata, IKoaAppMetaHeaders } from "../typing";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export const getMetaHeaders = (metadata: IKoaAppMetadata): IKoaAppMetaHeaders => ({
  "X-Client-Environment": metadata.clientEnvironment,
  "X-Client-ID": metadata.clientId,
  "X-Client-Name": metadata.clientName,
  "X-Client-Platform": metadata.clientPlatform,
  "X-Client-Version": metadata.clientVersion,
  "X-Correlation-ID": metadata.correlationId || uuidv1(),
  "X-Device-ID": metadata.deviceId,
  "X-Installation-ID": metadata.installationId,
  "X-Session-ID": metadata.sessionId || uuidv4(),
});
