export interface singUpData extends logInData{
    name :string;
    rePassword:string;
    phone:string;
}
export interface logInData extends forgetPasswordData{
    
    password:string;
}
export interface forgetPasswordData{
    email:string;
    
}
export interface resetCodeData{
    resetCode:string;
}
export interface resetNewPasswordData extends forgetPasswordData{
    newPassword:string;
}

export interface shippingAddressData {
    details:string;
    phone:string;
    city:string;
}
export interface userToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}