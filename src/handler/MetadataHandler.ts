import { KoaContextAware } from "../class";
import { IKoaAppMetadataHeaders } from "../typing";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";

export class MetadataHandler extends KoaContextAware {
  getHeaders(): IKoaAppMetadataHeaders {
    return {
      "X-Client-Environment": this.metadata.clientEnvironment,
      "X-Client-ID": this.metadata.clientId,
      "X-Client-Name": this.metadata.clientName,
      "X-Client-Platform": this.metadata.clientPlatform,
      "X-Client-Version": this.metadata.clientVersion,
      "X-Correlation-ID": this.metadata.correlationId || uuidv1(),
      "X-Device-ID": this.metadata.deviceId,
      "X-Installation-ID": this.metadata.installationId,
      "X-Session-ID": this.metadata.sessionId || uuidv4(),
    };
  }
}
