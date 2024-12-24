import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const registerBorrower = createAsyncThunk(
  "borrowers/register", // action type
  async (addBorrowerData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BORROWERS_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(addBorrowerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register borrower");
      }

      const data = await response.json();
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const initialState = {
  addBorrowerData: {
    personalDetails: {
      title: "",
      surname: "",
      otherName: "",//optional
      uniqueIDType: "",
      uniqueID: "",
      gender: "",
      maritalStatus: "",
      nationality: "Zambia",
      dateOfBirth: "",
      placeOfBirth: "",
      loanOfficer: localStorage.getItem("username"),
    },
    contactDetails: {
      mobile1: "",
      mobile2: "",//optional
      landlinePhone: "",//optional
      houseNumber: "",//optional
      street: "",
      residentialArea: "",
      country: "Zambia",
      province: "",//optional
      district: "",//optional
      email: "",
      postBox: "",//optional
    },
    employmentDetails: {
      employer: "",
      occupation: "",
      employmentDistrict: "",//optional
      employmentLocation: "",
      workStartDate: "",
      workPhoneNumber: "",//optional
      workPhysicalAddress: "",//optional
      employeeNo: "",
      workType: "",
    },
    bankDetails: {
      bankName: "",
      accountName: "",
      accountType: "",
      branch: "",
      branchCode: "",
      sortCode: "",
      accountNo: "",
    },
    nextOfKinDetails: {
      kinTitle: "",
      kinSurname: "",
      kinOtherName: "",//optional
      kinNrcNo: "",
      kinGender: "",
      kinMobile1: "",
      kinMobile2: "",//optional
      kinEmail: "",
      kinHouseNo: "",//optional
      kinStreet: "",
      kinResidentialArea: "",
      kinDistrict: "",//optional
      kinCountry: "",
      kinProvince: "",//optional
      kinEmployer: "",
      kinOccupation: "",
      kinLocation: "",//optional
      kinWorkPhoneNumber: "",//optional
    },
    otherDetails: {
      reasonForBorrowing: "",//optional
      sourceOfRepayment: "",//optional
      groupId: "",
      creditScore: 0,
      freeCashInHand: 0,
      grossSalary: 0,
    },
  },
  borrowers: [
    {
      personalDetails: {
        title: "Mr.",
        surname: "Smith",
        otherName: "John",
        uniqueIDType: "Passport",
        uniqueID: "A1234567",
        gender: "Male",
        maritalStatus: "Single",
        nationality: "Zambia",
        dateOfBirth: "1994-01-01",
        placeOfBirth: "Lusaka",
        loanOfficer: localStorage.getItem("username"),
      },
      contactDetails: {
        mobile1: "123456789",
        mobile2: "987654321",
        landlinePhone: "012345678",
        houseNumber: "123",
        street: "Main Street",
        residentialArea: "Downtown",
        country: "Zambia",
        province: "Lusaka",
        district: "Central",
        email: "john.smith@example.com",
        postBox: "PO Box 123",
      },
      employmentDetails: {
        employer: "TechCorp",
        occupation: "Software Engineer",
        employmentDistrict: "Central",
        employmentLocation: "Lusaka",
        workStartDate: "2020-01-15",
        workPhoneNumber: "0123456789",
        workPhysicalAddress: "Tech Park, Lusaka",
        employeeNo: "EMP001",
        workType: "Full-Time",
      },
      bankDetails: {
        bankName: "Zambia Bank",
        accountName: "John Smith",
        accountType: "Savings",
        branch: "Lusaka Central",
        branchCode: "001",
        sortCode: "1001",
        accountNo: "1234567890",
      },
      nextOfKinDetails: {
        kinTitle: "Mrs.",
        kinSurname: "Smith",
        kinOtherName: "Jane",
        kinNrcNo: "NRC12345",
        kinGender: "Female",
        kinMobile1: "987654321",
        kinMobile2: "123456789",
        kinEmail: "jane.smith@example.com",
        kinHouseNo: "124",
        kinStreet: "Main Street",
        kinResidentialArea: "Downtown",
        kinDistrict: "Central",
        kinCountry: "Zambia",
        kinProvince: "Lusaka",
        kinEmployer: "HealthCorp",
        kinOccupation: "Doctor",
        kinLocation: "Lusaka",
        kinWorkPhoneNumber: "0987654321",
      },
      otherDetails: {
        reasonForBorrowing: "Home Renovation",
        sourceOfRepayment: "Salary",
        groupId: "GRP001",
        creditScore: 750,
        freeCashInHand: 2000,
        grossSalary: 5000,
      },
    },
    {
      personalDetails: {
        title: "Mrs.",
        surname: "Brown",
        otherName: "Emily",
        uniqueIDType: "NRC",
        uniqueID: "NRC987654",
        gender: "Female",
        maritalStatus: "Married",
        nationality: "Zambia",
        dateOfBirth: "1996-02-14",
        placeOfBirth: "Kitwe",
        loanOfficer: localStorage.getItem("username"),
      },
      contactDetails: {
        mobile1: "987654321",
        mobile2: "123456789",
        landlinePhone: "045678912",
        houseNumber: "456",
        street: "Highway Road",
        residentialArea: "Suburb",
        country: "Zambia",
        province: "Copperbelt",
        district: "Kitwe",
        email: "emily.brown@example.com",
        postBox: "PO Box 456",
      },
      employmentDetails: {
        employer: "EduCorp",
        occupation: "Teacher",
        employmentDistrict: "Kitwe",
        employmentLocation: "Copperbelt",
        workStartDate: "2018-09-01",
        workPhoneNumber: "045678912",
        workPhysicalAddress: "School Lane, Kitwe",
        employeeNo: "EMP002",
        workType: "Part-Time",
      },
      bankDetails: {
        bankName: "Copperbelt Bank",
        accountName: "Emily Brown",
        accountType: "Checking",
        branch: "Kitwe Branch",
        branchCode: "002",
        sortCode: "2002",
        accountNo: "0987654321",
      },
      nextOfKinDetails: {
        kinTitle: "Mr.",
        kinSurname: "Brown",
        kinOtherName: "David",
        kinNrcNo: "NRC56789",
        kinGender: "Male",
        kinMobile1: "123456789",
        kinMobile2: "987654321",
        kinEmail: "david.brown@example.com",
        kinHouseNo: "457",
        kinStreet: "Highway Road",
        kinResidentialArea: "Suburb",
        kinDistrict: "Kitwe",
        kinCountry: "Zambia",
        kinProvince: "Copperbelt",
        kinEmployer: "TransportCorp",
        kinOccupation: "Driver",
        kinLocation: "Kitwe",
        kinWorkPhoneNumber: "045123678",
      },
      otherDetails: {
        reasonForBorrowing: "Education",
        sourceOfRepayment: "Business Income",
        groupId: "GRP002",
        creditScore: 720,
        freeCashInHand: 1500,
        grossSalary: 3000,
      },
    },
    {
      personalDetails: {
        title: "Dr.",
        surname: "Green",
        otherName: "Alice",
        uniqueIDType: "Passport",
        uniqueID: "P4567890",
        gender: "Female",
        maritalStatus: "Single",
        nationality: "Zambia",
        dateOfBirth: "1989-11-11",
        placeOfBirth: "Ndola",
        loanOfficer: localStorage.getItem("username"),
      },
      contactDetails: {
        mobile1: "0981234567",
        mobile2: "0765432109",
        landlinePhone: "021234567",
        houseNumber: "789",
        street: "University Avenue",
        residentialArea: "Campus Area",
        country: "Zambia",
        province: "Copperbelt",
        district: "Ndola",
        email: "alice.green@example.com",
        postBox: "PO Box 789",
      },
      employmentDetails: {
        employer: "HealthCare Zambia",
        occupation: "Doctor",
        employmentDistrict: "Ndola",
        employmentLocation: "Copperbelt",
        workStartDate: "2015-03-20",
        workPhoneNumber: "021234567",
        workPhysicalAddress: "Hospital Road, Ndola",
        employeeNo: "EMP003",
        workType: "Full-Time",
      },
      bankDetails: {
        bankName: "Zambia National Bank",
        accountName: "Alice Green",
        accountType: "Savings",
        branch: "Ndola Branch",
        branchCode: "003",
        sortCode: "3003",
        accountNo: "1230984567",
      },
      nextOfKinDetails: {
        kinTitle: "Ms.",
        kinSurname: "Green",
        kinOtherName: "Sophia",
        kinNrcNo: "NRC654321",
        kinGender: "Female",
        kinMobile1: "0987654321",
        kinMobile2: "1234567890",
        kinEmail: "sophia.green@example.com",
        kinHouseNo: "790",
        kinStreet: "University Avenue",
        kinResidentialArea: "Campus Area",
        kinDistrict: "Ndola",
        kinCountry: "Zambia",
        kinProvince: "Copperbelt",
        kinEmployer: "Education Zambia",
        kinOccupation: "Lecturer",
        kinLocation: "Ndola",
        kinWorkPhoneNumber: "021234567",
      },
      otherDetails: {
        reasonForBorrowing: "Medical Equipment",
        sourceOfRepayment: "Savings",
        groupId: "GRP003",
        creditScore: 780,
        freeCashInHand: 5000,
        grossSalary: 10000,
      },
    },
  ],
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "borrowers",
  initialState,
  reducers: {
    updateBorrowerField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.addBorrowerData[section]) {
        state.addBorrowerData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in addBorrowerData
        state.addBorrowerData[field] = type === "checkbox" ? checked : value;
      }
    },
    resetBorrowerData: (state) => {
      state.addBorrowerData = initialState.addBorrowerData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerBorrower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBorrower.fulfilled, (state, action) => {
        state.loading = false;
        state.borrower = action.payload; // Store the borrower data
        toast.success("Borrower Registered Successfully");
      })
      .addCase(registerBorrower.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      });
  },
});

export const { updateBorrowerField, resetBorrowerData } =
  borrowersSlice.actions;

export default borrowersSlice.reducer;
