import { useEffect } from "react";
import { updatePersonalBorrowerField, fetchPersonalBorrowerById } from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch, useSelector } from 'react-redux';

const PersonDetailsSection = () => {
    const dispatch = useDispatch();
    const { personalBorrower, loading } = useSelector((state) => state.B2CLoans)
    const { cachedBorrowerId } = personalBorrower?.cachedDetails;

    useEffect(() => {
        const uid = cachedBorrowerId;
        if (!uid) {
            
            dispatch(fetchPersonalBorrowerById(uid));
        }
    }, [cachedBorrowerId, dispatch])

    const handleInputChange = (e, section) => {
        const { name, value, type, checked } = e.target;
        dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
    };
    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <>
            <select
                className="form-input w-full py-4"
                name="title"
                value={personalBorrower.personalDetails.title}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            >
                <option value="">Select Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
            </select>
            {/* <input
                className="form-input w-full py-4"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={personalBorrower.personalDetails.firstName}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="surname"
                name="surname"
                value={personalBorrower.personalDetails.surname}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            /> */}
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={personalBorrower.personalDetails.fullName}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            />
            <select
                className="form-input w-full py-4"
                name="gender"
                value={personalBorrower.personalDetails.gender}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            >
                <option value="">SELECT GENDER</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="NON-BINARY">NON-BINARY</option>
                <option value="OTHER">OTHER</option>
                <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
            </select>
            <div className="relative">
                <input
                    type="date"
                    className="form-input w-full py-4 text-gray-900"
                    name="dateOfBirth"
                    value={personalBorrower.personalDetails.dateOfBirth}
                    onChange={(e) => handleInputChange(e, "personalDetails")}
                    required
                    onFocus={(e) => e.target.showPicker()} // Optional: shows date picker on focus
                />
                {!personalBorrower.personalDetails.dateOfBirth && (
                    <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                        Date of Birth (dd-mm-yyyy)
                    </span>
                )}
            </div>

            <select
                className="form-input w-full py-4"
                name="nationality"
                value={personalBorrower.personalDetails.nationality}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            >
                <option value="">Select Nationality</option>
                <option value="Afghan">Afghan</option>
                <option value="Albanian">Albanian</option>
                <option value="Algerian">Algerian</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Indian">Indian</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Russian">Russian</option>
                <option value="South African">South African</option>
                <option value="Spanish">Spanish</option>
                {/* Add more as needed */}
            </select>
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Place of Birth"
                name="placeOfBirth"
                value={personalBorrower.personalDetails.placeOfBirth}
                onChange={(e) => handleInputChange(e, "personalDetails")}
                required
            />
            <input
                className="form-input w-full py-4"
                type="number"
                placeholder="mobile1"
                name="mobile1"
                value={personalBorrower.contactDetails.mobile1}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            />
            {/* <input
                className="form-input w-full py-4"
                type="text"
                placeholder="House Number"
                name="houseNumber"
                value={personalBorrower.contactDetails.houseNumber}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Street"
                name="street"
                value={personalBorrower.contactDetails.street}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Residential Area"
                name="residentialArea"
                value={personalBorrower.contactDetails.residentialArea}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            /> */}
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Address"
                name="address"
                value={personalBorrower.contactDetails.address}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            />
            <select
                className="form-input w-full  py-4"
                name="country"
                value={personalBorrower.contactDetails.country}
                onChange={(e) => handleInputChange(e, "contactDetails")}
                required
            >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                {/* Add more countries as needed */}
            </select>
            <input
                className="form-input w-full py-4"
                type="number"
                placeholder="Credit Score"
                name="creditScore"
                value={personalBorrower.otherDetails.creditScore}
                onChange={(e) => handleInputChange(e, "otherDetails")}
                required
            />
        </>
    )
}

export default PersonDetailsSection