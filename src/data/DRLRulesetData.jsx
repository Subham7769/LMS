import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const RacStats = [
  {
    id: 1,
    name: "Avg. Approval Daily",
    stat: "723",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Active RAC",
    stat: "2 / 3",
    icon: CurrencyRupeeIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Rejection / Day",
    stat: "24.57",
    icon: ClipboardDocumentListIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

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
