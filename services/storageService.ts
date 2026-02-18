
import { PermissionLetterData, BDE } from '../types';

const STORAGE_KEY = 'uc_permission_letters';
const BDE_LIST_KEY = 'uc_bde_list';
const SELECTED_BDE_ID_KEY = 'uc_selected_bde_id';

export const saveLetter = (data: PermissionLetterData) => {
  const letters = getLetters();
  letters.unshift(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
};

export const getLetters = (): PermissionLetterData[] => {
  const letters = localStorage.getItem(STORAGE_KEY);
  return letters ? JSON.parse(letters) : [];
};

export const deleteLetter = (id: string) => {
  const letters = getLetters().filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
};

// BDE Profile Management
export const getBDEs = (): BDE[] => {
  const bdes = localStorage.getItem(BDE_LIST_KEY);
  return bdes ? JSON.parse(bdes) : [];
};

export const saveBDE = (bde: BDE) => {
  const bdes = getBDEs();
  const index = bdes.findIndex(b => b.id === bde.id);
  if (index >= 0) {
    bdes[index] = bde;
  } else {
    bdes.push(bde);
  }
  localStorage.setItem(BDE_LIST_KEY, JSON.stringify(bdes));
};

export const deleteBDE = (id: string) => {
  const bdes = getBDEs().filter(b => b.id !== id);
  localStorage.setItem(BDE_LIST_KEY, JSON.stringify(bdes));
};

export const setSelectedBDEId = (id: string) => {
  localStorage.setItem(SELECTED_BDE_ID_KEY, id);
};

export const getSelectedBDEId = () => {
  return localStorage.getItem(SELECTED_BDE_ID_KEY);
};

export const getBDEDetails = () => {
  const bdes = getBDEs();
  const id = getSelectedBDEId();
  const selected = bdes.find(b => b.id === id);
  return selected || { name: '', contact: '' };
};
