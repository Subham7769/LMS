const [state, setState] = useState({
  residentialStatus: {
      id: "6655dc7b579d57000134853c",
      name: "residentialStatus",
      displayName: "residential status",
      racId: null,
      rules: [
          {
              ruleName: "24f8caf5-aa10-44a8-8956-ff309b646fa5",
              fieldType: "Employer",
              racId: "d51c9c2a-2968-49af-8e70-5b4da8655f14",
              availableResidentialStatus: [
                  "RENT",
                  "OWN"
              ],
              result: "1",
              error: null,
              ruleUsed: "USED"
          }
      ],
      operators: null
  },
  gender: {
      id: "6655d8a1579d57000134852e",
      name: "gender",
      displayName: "gender",
      racId: null,
      rules: [
          {
              ruleName: "a501de4e-5241-4633-9888-d7bb79802de4",
              fieldType: "Employer",
              racId: "d51c9c2a-2968-49af-8e70-5b4da8655f14",
              availableGender: [
                  "FEMALE",
                  "MALE"
              ],
              result: "1",
              error: null,
              ruleUsed: "USED"
          }
      ],
      operators: null
  },
  nationality: {
      id: "6655dbe4579d570001348536",
      name: "nationality",
      displayName: "nationality",
      racId: null,
      rules: [
          {
              ruleName: "966f9e9e-b282-4920-8d9b-3a2e71977485",
              fieldType: "Employer",
              racId: "d51c9c2a-2968-49af-8e70-5b4da8655f14",
              availableNationality: [
                  "المملكة العربية السعودية"
              ],
              result: "1",
              error: null,
              ruleUsed: "NOT_USED"
          }
      ],
      operators: null
  },
  maritalStatus: {
      id: "6655dbb6579d570001348534",
      name: "maritalStatus",
      displayName: "marital Status",
      racId: null,
      rules: [
          {
              ruleName: "21faa495-4d3b-4e87-b5d3-406c52257267",
              fieldType: "Employer",
              racId: "d51c9c2a-2968-49af-8e70-5b4da8655f14",
              availableMaritalStatus: [
                  "SINGLE",
                  "MARRIED"
              ],
              result: "1",
              error: null,
              ruleUsed: "USED"
          }
      ],
      operators: null
  },
});