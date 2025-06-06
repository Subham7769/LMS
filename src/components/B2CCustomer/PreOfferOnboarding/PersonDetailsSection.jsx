import { useLocation } from 'react-router-dom';
import { useActiveTab } from '../ActiveTabContext';

const PersonDetailsSection = () => {
    const { formData, setFormData } = useActiveTab();
    const location = useLocation();
    const { pathname } = location;

    return (
        <>
            <input
                className={`form-input w-full mb-4 py-4 ${pathname.includes("loan-offers") && "hidden"}`}
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={pathname.includes("loan-offers")}
            />
            <input
                className="form-input w-full mb-4 py-4"
                type="number"
                placeholder="Basic Pay"
                value={formData.basicPay}
                onChange={e => setFormData({ ...formData, basicPay: e.target.value })}
                required
            />
        </>
    )
}

export default PersonDetailsSection