export const HeaderList = [
  "Name",
  "Rule Category",
  "Description",
  "Loan Products",
];

export const DRLRulesetList = [
  {
    name: "LHA RBP IL",
    ruleCategory: "Risk Based Pricing",
    description: "Risk Based Pricing for individual loans",
    loanProducts: ["Individual Loans"],
    href: "/loan/drl-ruleset/63b1acad-b490-4939-94c0-b782540c2ec4/basic-info",
  },
  {
    name: "LHA Credit Score",
    ruleCategory: "Credit Score",
    description: "Credit Score for LHA borrowers",
    loanProducts: ["Payroll Backed Loans"],
    href: "/loan/drl-ruleset/lha-credit-score",
  },
];
