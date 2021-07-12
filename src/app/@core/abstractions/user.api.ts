import { Observable } from "rxjs";
import { ChangePasswordModel } from '../models/user/changePassword';
import { Profile } from '../models/user/profile';
import { UserCurrentState } from '../models/user/userState';

export abstract class  IUserApi {
    abstract getProfile(): Observable<Profile>;
    abstract getState(): Observable<UserCurrentState>;
    abstract changePassword(model: ChangePasswordModel): Observable<any>;
}