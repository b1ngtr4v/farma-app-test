//import PrescriptionHelper from "../Helpers/PrescriptionHelper";

const STATIC_PRESCRIPTION_LIST = [
  {
    id: 1,
    category: "urgent",
    classType: "special",
    queue: "fast",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "",
    status: "Waiting",
    medicates: [
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 2,
    category: "normal",
    classType: "normal",
    queue: "normal",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "",
    status: "Waiting",
    medicates: [
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 3,
    category: "urgent",
    classType: "special",
    queue: "fast",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "",
    status: "Waiting",
    medicates: [
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 4,
    category: "normal",
    classType: "normal",
    queue: "normal",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "",
    status: "Waiting",
    medicates: [
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 5,
    category: "urgent",
    classType: "special",
    queue: "fast",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "ehidalgo",
    status: "Waiting",
    medicates: [
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 6,
    category: "normal",
    classType: "special",
    queue: "normal",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "bsalas",
    status: "Waiting",
    medicates: [
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 7,
    category: "urgent",
    classType: "normal",
    queue: "fast",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "ehidalgo",
    status: "Waiting",
    medicates: [
      {
        id: 4,
        name: "Ibuprofeno",
        quantity: 10,
        methric: "Pastillas",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      }
    ],
    comments: null
  },
  {
    id: 8,
    category: "normal",
    classType: "normal",
    queue: "normal",
    createdDate: "2020-06-09T16:13:33.366+00:00",
    dueDate: "2020-06-09T16:13:33.366+00:00",
    owner: "ehidalgo",
    status: "Waiting",
    medicates: [
      {
        id: 3,
        name: "Salbutamol",
        quantity: 2,
        methric: "Bombita",
        checked: false
      },
      {
        id: 2,
        name: "Salbutamol",
        quantity: 1,
        methric: "Bombita",
        checked: false
      },
      {
        id: 1,
        name: "Ibuprofeno",
        quantity: 30,
        methric: "Pastillas",
        checked: false
      }
    ],
    comments: null
  }
];

class PrescriptionService {
  getAllPrescriptionList() {
    return STATIC_PRESCRIPTION_LIST;
  }

  getPrescriptionListById(id) {
    return {
      ...STATIC_PRESCRIPTION_LIST.find(prescription => prescription.id === id)
    };
  }

  getPrescriptionListByUser(username) {
    return STATIC_PRESCRIPTION_LIST.map(prescription => {
      if (prescription.owner === username) {
        return prescription;
      } else {
        return null;
      }
    }).filter(x => x);
  }

  getPrescriptionListByLine(line) {
    let lineType = line;

    return STATIC_PRESCRIPTION_LIST.map(prescription => {
      if (prescription.queue === lineType) {
        return prescription;
      } else {
        return null;
      }
    }).filter(x => x);
  }

  // Change by amount
  getRecordsLogByStatus(status) {
    let records;

    if (status === "completed") {
      records = 13;
    } else {
      records = 47;
    }

    return records;
  }

  // Change for time taken by each prescription
  getTimeByLine(line) {
    let time;

    if (line === "fast") {
      time = "27m";
    } else {
      time = "1h 30m";
    }
    return time;
  }
}

export default new PrescriptionService();
