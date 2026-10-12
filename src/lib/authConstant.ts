
// You cannot put server constants inside a file with leaflet. Thats why the map is rendered with SSR off.
// Only reason this constant is in a seperate file is the comment above.
import { UserAuthService } from "./class-stub/UserAuthService";

export const authService = new UserAuthService;
