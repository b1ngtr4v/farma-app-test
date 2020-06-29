// role definition: {id: 'farma', name: 'Farmacéutico'}
const ROLE_LIST = [
  {
    id: "admin",
    name: "Administrador de Sistema",
    description:
      "Puede descargar nuevas recetas, acopiar medicamentos de la receta, revisar las recetas como farmacéutico, empacar recetas y entregar las recetas al usuario. Además puede administrar usuarios"
  },
  {
    id: "farma",
    name: "Farmacéutico",
    description:
      "Puede descargar nuevas recetas, acopiar medicamentos de la receta, revisar las recetas como farmacéutico, empacar recetas y entregar las recetas al usuario."
  },
  {
    id: "tecnico",
    name: "Técnico en farmacia",
    description:
      "Puede descargar nuevas recetas, acopiar medicamentos de la receta, empacar recetas y entregar las recetas al usuario"
  },
  {
    id: "secretaria",
    name: "Secretaria de médicos",
    description: "Puede ver el tiempo de duración del despacho"
  }
];

const ROLE_ACTIONS = [
  { pseudo: "normal", name: "Acopio", roles: ['tecnico'] },
  { pseudo: "ventana", name: "Ventanilla recepción", roles: ['tecnico'] },
  { pseudo: "empaque", name: "Empaque", roles: ['tecnico'] },
  { pseudo: "entrega", name: "Ventanilla entrega", roles: ['tecnico'] },
  { pseudo: "waiting", name: "Revisión de recetas", roles: ['farma'] },
  { pseudo: "special", name: "Atención de estupefacientes y psicotrópicos", roles: ['farma'] },
  { pseudo: "admin", name: "Dashboard", roles: ['admin'] }
];

class UserHelper {
  getRoles() {
    return ROLE_LIST;
  }

  getRoleName(id) {
    let roleName = "";

    // eslint-disable-next-line
    ROLE_LIST.map(role => {
      if (role.id === id) {
        roleName = role.name;
      }
    });

    return roleName;
  }

  getRoleId(name) {
    let roleId = "";

    // eslint-disable-next-line
    ROLE_LIST.map(role => {
      if (role.name === name) {
        roleId = role.id;
      }
    });

    return roleId;
  }

  getActionsByRole(role) {
    return ROLE_ACTIONS.map(action => {
      if(action.roles.indexOf(role) >= 0) {
        return action;
      }

      return null;
    }).filter(x => x);
  }
}

export default new UserHelper();
