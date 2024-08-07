import { useDispatch, useSelector } from 'react-redux';
import { setMenus } from '../redux/Slices/sidebarSlice';
import useRACInfo from './useRACInfo';
import useAllProjectInfo from './useAllProjectInfo';
import useProductInfo from './useProductInfo';
import useDBInfo from './useDBInfo';
import useBEInfo from './useBEInfo';
import useCreditScoreEq from './useCreditScoreEq';
import useRulePolicy from './useRulePolicy';
import useTCLInfo from './useTCLInfo';
import useProdGroupInfo from './useProdGroupInfo';
import useRecoveryInfo from './useRecoveryInfo';

const useUpdateMenus = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.sidebar.menus);
  const updateMenus = (menuTitle) => {
    let submenuItems;

    switch (menuTitle) {
      case 'RAC':
        submenuItems = useRACInfo();
        break;
      case 'DBR Config':
        submenuItems = useDBInfo();
        break;
      case 'Blocked Employer':
        submenuItems = useBEInfo();
        break;
      case 'Project':
        submenuItems = useAllProjectInfo();
        break;
      case 'Product':
        submenuItems = useProductInfo();
        break;
      case 'Credit Score':
        submenuItems = useCreditScoreEq();
        break;
      case 'Rule Policy':
        submenuItems = useRulePolicy();
        break;
      case 'TCL':
        submenuItems = useTCLInfo();
        break;
      case 'Product Group':
        submenuItems = useProdGroupInfo();
        break;
      case 'Recovery':
        submenuItems = useRecoveryInfo();
        break;
      default:
        return;
    }
    const updatedMenus = menus.map((menu) => {
      if (menu.title === menuTitle) {
        return { ...menu, submenuItems };
      }
      return menu;
    });

    dispatch(setMenus(updatedMenus));
  }
  return updateMenus;
};

export default useUpdateMenus;
