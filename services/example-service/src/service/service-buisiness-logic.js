import ExampleRepository from "../dba/repository/exampleRepository";
// All Business logic will be here

class ExampleBusinessService {
  constructor() {
    this.repository = new ExampleRepository();
  }

  // controller functions
}

export default ExampleBusinessService;
