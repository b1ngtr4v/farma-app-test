import PrescriptionLineService from "./PrescriptionLineService";

export const USERNAME_SESSION_ATTRIBUTE_NAME = btoa("authenticatedUser");

export const NAME_SESSION_ATTRIBUTE_NAME = btoa("authenticatedUserName");

export const ROLE_SESSION_ATTRIBUTE_NAME = btoa("authenticatedUserRole");

class AuthenticationService {
  registerSuccessfullLogin(username, name, role) {
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, btoa(username));
    this.registerSuccessfullLoginUserName(name);
    this.registerSuccessfullLoginUserRole(role);
  }

  registerSuccessfullLogout() {
    PrescriptionLineService.unregisterPrescriptionLine();
    this.registerSuccessfullLogoutUserRole();
    this.registerSuccessfullLogoutUserName();
    sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME) !== null;
  }

  getLoggedInUser() {
    const user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);

    return user.length > 0 ? atob(user) : "";
  }

  registerSuccessfullLoginUserName(name) {
    sessionStorage.setItem(NAME_SESSION_ATTRIBUTE_NAME, btoa(name));
  }

  registerSuccessfullLogoutUserName() {
    sessionStorage.removeItem(NAME_SESSION_ATTRIBUTE_NAME);
  }

  getLoggedInUserName() {
    const name = sessionStorage.getItem(NAME_SESSION_ATTRIBUTE_NAME);

    return name.length > 0 ? atob(name) : "";
  }

  registerSuccessfullLoginUserRole(role) {
    sessionStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, btoa(role));
  }

  registerSuccessfullLogoutUserRole() {
    sessionStorage.removeItem(ROLE_SESSION_ATTRIBUTE_NAME);
  }

  getLoggedInUserRole() {
    let role = ''
    
    if(sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME) !== null) {
      role = sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME)
    }

    return role.length > 0 ? atob(role) : "";
  }
}

export default new AuthenticationService();
