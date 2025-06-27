export const HeaderList = [
  "Name",
  "Description",
  // "Rule Category",
  // "Loan Products",
];

export const DRLRulesetList = [
  {
    name: "LHA RBP IL",
    description: "Risk Based Pricing for individual loans",
    ruleCategory: "Risk Based Pricing",
    loanProducts: ["Individual Loans"],
    href: "/loan/drl-ruleset/63b1acad-b490-4939-94c0-b782540c2ec4/basic-info",
  },
  {
    name: "LHA Credit Score",
    description: "Credit Score for LHA borrowers",
    ruleCategory: "Credit Score",
    loanProducts: ["Payroll Backed Loans"],
    href: "/loan/drl-ruleset/lha-credit-score",
  },
];
