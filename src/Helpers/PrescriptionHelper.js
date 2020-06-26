const STATIC_CATEGORY_LIST = [
  { id: "urgent", name: "Urgente" },
  { id: "normal", name: "No urgente" }
];

const STATIC_CLASSTYPE_LIST = {
  normal: "Regular",
  special: "Estupefacientes y psicotrópicos"
};

const STATIC_QUEUE_LIST = [
  { pseudo: "fast", name: "Línea rápida", roles: ['tecnico',] },
  { pseudo: "normal", name: "Línea alto volúmen", roles: ['tecnico'] },
  { pseudo: "waiting", name: "Revisión de recetas", roles: ['farma'] },
  { pseudo: "special", name: "Atención de estupefacientes y psicotrópicos", roles: ['farma'] },
  { pseudo: "admin", name: "Dashboard", roles: ['ventana', 'admin'] }
];

const STATIC_PRESCRIPTION_STATUS = [
  { id: "Backlog", name: "En proceso de acopio", roles: ["tecnico", "admin"] },
  {
    id: "In Progress",
    name: "Revisión",
    roles: ["farma", "tecnico", "admin"]
  },
  {
    id: "Waiting",
    name: "En proceso de revisión",
    roles: ["tecnico", "secretaria", "farma", "admin"]
  },
  { id: "Approved", name: "Empacable", roles: ["farma", "admin"] },
  { id: "Deliverable", name: "Entregable", roles: ["secretaria", "admin"] },
  { id: "Delivered", name: "Entregado", roles: ["secretaria", "admin"] }
];

class PrescriptionHelper {
  getLines(role) {
    let lines = []

    STATIC_QUEUE_LIST.map(queue => {
      if (queue.roles.indexOf(role) >= 0) {
        lines.push(queue)
      }

      return queue
    })

    return lines;
  }

  getStatusByRole(role) {
    // eslint-disable-next-line
    return STATIC_PRESCRIPTION_STATUS.map(status => {
      if (status.roles.indexOf(role) >= 0) {
        const act = { ...status };
        delete act.roles;

        return act;
      }
    }).filter(x => x);
  }

  getDate(date) {
    const actDate = new Date(date);
    const day =
      actDate.getDate() < 10 ? "0" + actDate.getDate() : actDate.getDate();
    const month =
      actDate.getMonth() < 10
        ? "0" + (actDate.getMonth() + 1)
        : actDate.getMonth() + 1;
    const hour =
      actDate.getHours() > 12 ? actDate.getHours() - 12 : actDate.getHours();
    const minutes =
      actDate.getMinutes() < 10
        ? "0" + actDate.getMinutes()
        : actDate.getMinutes();
    const time = actDate.getHours() > 11 ? "PM" : "AM";

    return (
      day +
      "/" +
      month +
      "/" +
      actDate.getFullYear() +
      " " +
      hour +
      ":" +
      minutes +
      " " +
      time
    );
  }

  getQueueName(queuePseudo) {
    let queueName = STATIC_QUEUE_LIST.find(
      queue => queue.pseudo === queuePseudo
    );

    if (queueName) {
      queueName = queueName.name;
    }

    return queueName;
  }

  getCategories() {
    return STATIC_CATEGORY_LIST;
  }

  getCategoryName(categoryId) {
    let name = "Indefinida";
    const category = STATIC_CATEGORY_LIST.find(
      element => element.id === categoryId
    );

    if (category) {
      name = category.name;
    }

    return name;
  }

  getStatusName(statusId) {
    let result = ''
    const status = STATIC_PRESCRIPTION_STATUS.find(status => status.id = statusId)

    if (status) {
      result = status.name
    }

    return result
  }

  getClassTypeName(classType) {
    return STATIC_CLASSTYPE_LIST[classType];
  }
}

export default new PrescriptionHelper();
