export let STATIC_USER_INFORMATION = [
  {
    username: "bsalas",
    name: "Brayan",
    lastname: "Salas",
    ident: "07-0127-0441",
    phone: "8854-6234",
    mail: "bsalas@ccss.go.cr",
    job: "Software Developer",
    role: "admin",
    currentPassword: "pass"
  },
  {
    username: "mdelgado",
    name: "Mario",
    lastname: "Delgado",
    ident: "06-0230-0114",
    phone: "7429-1213",
    mail: "mdelgado@ccss.go.cr",
    job: "Farmacéutico",
    role: "farma",
    currentPassword: "pass"
  },
  {
    username: "ngranados",
    name: "Natalia",
    lastname: "Granados G",
    ident: "01-0452-0993",
    phone: "7412-6473",
    mail: "ngranados@ccss.go.cr",
    job: "Acopiador",
    role: "tecnico",
    currentPassword: "pass"
  },
  {
    username: "ehidalgo",
    name: "Emilio Jose",
    lastname: "Hidalgo Arroyo",
    ident: "02-0136-0663",
    phone: "9124-8576",
    mail: "ehidalgo@ccss.go.cr",
    job: "Acopiador",
    role: "tecnico",
    currentPassword: "pass"
  }
];

class UserService {
  validatedUser(username, password) {
    const user = {
      ...STATIC_USER_INFORMATION.find(user => user.username === username)
    };

    return user && user.currentPassword === atob(password) ? user : null;
  }

  getUsers() {
    return STATIC_USER_INFORMATION.map(user => {
      let actUser = { ...user };
      delete actUser.currentPassword;
      //actUser.role = this.getRoleDetail(actUser.role);

      return actUser;
    });
  }

  getUserName(username) {
    return STATIC_USER_INFORMATION.find(user => user.username === username)
      .name;
  }

  getUser(username) {
    let actUser = {
      ...STATIC_USER_INFORMATION.find(user => user.username === username)
    };
    delete actUser.currentPassword;

    return actUser;
  }

  isUserAdmin(username) {
    return (
      STATIC_USER_INFORMATION.find(user => user.username === username).role ===
      "admin"
    );
  }

  createUser(userCreated) {
    let index;

    try {
      userCreated.currentPassword = "pass";
      index = STATIC_USER_INFORMATION.push(userCreated);
    } catch (e) {
      index = -1;
    }

    return index;
  }

  updatePassword(username, password) {
    let result = false;
    let userUpdated = {
      ...STATIC_USER_INFORMATION.find(user => user.username === username)
    };
    userUpdated.currentPassword = atob(password);

    STATIC_USER_INFORMATION = STATIC_USER_INFORMATION.map(user => {
      let actUser;

      if (user.username !== username) {
        actUser = user;
      } else {
        actUser = userUpdated;
        result = true;
      }

      return actUser;
    });

    return result;
  }

  resetUser(username, field) {
    let result = false;
    const decodedField = atob(field);
    let user = {
      ...STATIC_USER_INFORMATION.find(user => user.username === username)
    };

    if (user.mail === decodedField || user.phone === decodedField) {
      result = true;
    }
    console.log(decodedField);
    return result;
  }

  updateUser(userUpdated) {
    let result = true;
    let actUser = {
      ...STATIC_USER_INFORMATION.find(
        user => user.username === userUpdated.username
      )
    };

    for (let key in actUser) {
      if (!userUpdated.hasOwnProperty(key) && key !== "currentPassword") {
        result = false;
        break;
      }
    }

    if (result) {
      STATIC_USER_INFORMATION[
        STATIC_USER_INFORMATION.map(user => {
          return user.username;
        }).indexOf(actUser.username)
      ] = userUpdated;
    }

    return result;
  }

  deleteUser(username) {
    let result = true
    try {
      for (let i = 0; i < STATIC_USER_INFORMATION.length; i++) {
        if (STATIC_USER_INFORMATION[i].username === username) {
          STATIC_USER_INFORMATION.splice(i, 1)
        }
      }
    } catch (e) {
      result = false
    }

    return result
  }

  getRoleDetail(role) {
    let roleName;

    switch (role) {
      case "Admin":
        roleName = "Administrador";
        break;
      case "Acopia":
        roleName = "Acopiador";
        break;
      case "Farma":
        roleName = "Farmaceutico";
        break;
      default:
        roleName = "";
    }

    return roleName;
  }
}

export default new UserService();
