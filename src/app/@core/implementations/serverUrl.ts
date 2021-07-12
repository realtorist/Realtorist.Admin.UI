import { environment } from '../../../environments/environment';

export const apiServerUrl = () => environment.externalApi  || `${window.location.protocol}//${window.location.host}`