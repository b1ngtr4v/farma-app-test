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
  { pseudo: "normal", name: "Línea alto volúmen", roles: ['tecnico'] }
]

const STATIC_PRESCRIPTION_STATUS = [
  { id: "Backlog", name: "Por acopiar", roles: ["farma", "tecnico", "admin"] },
  { id: "In Progress", name: "En proceso de acopio", roles: ["tecnico", "admin"] },
  { id: "Waiting", name: "Por revisar", roles: ["tecnico", "secretaria", "farma", "admin"] },
  { id: "Approved", name: "Empacable", roles: ["farma", "admin"] },
  { id: "Deliverable", name: "Entregable", roles: ["farma", "admin"] },
  { id: "Delivered", name: "Entregado", roles: ["tecnico", "admin"] }
];

class PrescriptionHelper {
  getLines() {
    return [...STATIC_QUEUE_LIST]
  }

  getStatusByRole(role) {
    const statusList = [...STATIC_PRESCRIPTION_STATUS]
    
    return statusList.map(status => {
      if (status.roles.indexOf(role) >= 0) {
        const act = { ...status };
        delete act.roles;

        return act;
      }

      return null;
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
    const queueList = [...STATIC_QUEUE_LIST]

    let queueName = queueList.find(
      queue => queue.pseudo === queuePseudo
    );

    if (queueName) {
      queueName = queueName.name;
    }

    return queueName;
  }

  getCategories() {
    return [...STATIC_CATEGORY_LIST];
  }

  getCategoryName(categoryId) {
    let name = "Indefinida";
    const categoryList = [...STATIC_CATEGORY_LIST]
    const category = categoryList.find(
      element => element.id === categoryId
    );

    if (category) {
      name = category.name;
    }

    return name;
  }

  getStatusName(statusId) {
    let result = ''
    const statusList = [...STATIC_PRESCRIPTION_STATUS]
    const statusFound = statusList.find(status => status.id = statusId)

    if (statusFound) {
      result = statusFound.name
    }

    return result
  }

  getClassTypeName(classType) {
    return STATIC_CLASSTYPE_LIST[classType];
  }
}

export default new PrescriptionHelper();
