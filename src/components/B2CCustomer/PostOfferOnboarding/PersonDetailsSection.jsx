import { useLocation } from 'react-router-dom';
import { useActiveTab } from '../ActiveTabContext';

const PersonDetailsSection = () => {
    const { formData, setFormData } = useActiveTab();
    const location = useLocation();
    const { pathname } = location;

    return (
        <>
            <select
                className="form-input w-full py-4"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Surname"
                value={formData.surname}
                onChange={e => setFormData({ ...formData, surname: e.target.value })}
                required
            />
            <select
                className="form-input w-full py-4"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <div className="relative">
                <input
                    type="date"
                    className="form-input w-full py-4 text-gray-900"
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                    onFocus={(e) => e.target.showPicker()} // Optional: shows date picker on focus
                />
                {!formData.dateOfBirth && (
                    <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                        Date of Birth (dd-mm-yyyy)
                    </span>
                )}
            </div>
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Place of Birth"
                value={formData.placeOfBirth}
                onChange={e => setFormData({ ...formData, placeOfBirth: e.target.value })}
                required
            />
            <select
                className="form-input w-full py-4"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                required
            >
                <option value="">Select Nationality</option>
                <option value="AF">Afghan</option>
                <option value="AL">Albanian</option>
                <option value="DZ">Algerian</option>
                <option value="US">American</option>
                <option value="GB">British</option>
                <option value="CN">Chinese</option>
                <option value="FR">French</option>
                <option value="DE">German</option>
                <option value="IN">Indian</option>
                <option value="ID">Indonesian</option>
                <option value="IT">Italian</option>
                <option value="JP">Japanese</option>
                <option value="NG">Nigerian</option>
                <option value="PK">Pakistani</option>
                <option value="RU">Russian</option>
                <option value="ZA">South African</option>
                <option value="ES">Spanish</option>
                {/* Add more as needed */}
            </select>

            <input
                className="form-input w-full py-4"
                type="number"
                placeholder="Mobile"
                value={formData.mobile1}
                onChange={e => setFormData({ ...formData, mobile1: e.target.value })}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="House Number"
                value={formData.houseNumber}
                onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Street"
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                required
            />
            <input
                className="form-input w-full py-4"
                type="text"
                placeholder="Residential Area"
                value={formData.residentialArea}
                onChange={e => setFormData({ ...formData, residentialArea: e.target.value })}
                required
            />
            <select
                className="form-input w-full  py-4"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
            >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                <option value="JP">Japan</option>
                {/* Add more countries as needed */}
            </select>
        </>
    )
}

export default PersonDetailsSection