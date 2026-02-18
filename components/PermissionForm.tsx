
import React, { useState, useEffect } from 'react';
import { PermissionLetterData, EventDuration, BDE } from '../types';
import { getBDEs, saveBDE, deleteBDE, setSelectedBDEId, getBDEDetails } from '../services/storageService';

interface PermissionFormProps {
  initialData?: PermissionLetterData | null;
  onSubmit: (data: PermissionLetterData) => void;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ initialData, onSubmit }) => {
  const [bdeList, setBdeList] = useState<BDE[]>([]);
  const [showAddBDE, setShowAddBDE] = useState(false);
  const [newBDE, setNewBDE] = useState({ name: '', contact: '' });
  
  const [formData, setFormData] = useState<Partial<PermissionLetterData>>({
    societyName: '',
    eventDate: '',
    startTime: '10:00',
    endTime: '20:00',
    eventDuration: EventDuration.ONE_DAY,
    eventAmount: '',
    accountDetails: '',
    isDoorToDoor: true,
    selectedItems: [],
    plateCount: '',
    bdeName: '',
    bdeContact: '',
  });

  useEffect(() => {
    const list = getBDEs();
    setBdeList(list);

    if (initialData) {
      setFormData(initialData);
    } else {
      const savedDetails = getBDEDetails();
      setFormData(prev => ({
        ...prev,
        bdeName: savedDetails.name,
        bdeContact: savedDetails.contact,
        selectedItems: prev.selectedItems || [],
        plateCount: prev.plateCount || '',
        startTime: prev.startTime || '10:00',
        endTime: prev.endTime || '20:00'
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSelectBDE = (bde: BDE) => {
    setFormData(prev => ({
      ...prev,
      bdeName: bde.name,
      bdeContact: bde.contact
    }));
    setSelectedBDEId(bde.id);
  };

  const handleAddBDE = () => {
    if (!newBDE.name || !newBDE.contact) return;
    const bde: BDE = {
      id: Date.now().toString(),
      name: newBDE.name,
      contact: newBDE.contact
    };
    saveBDE(bde);
    const updated = getBDEs();
    setBdeList(updated);
    setNewBDE({ name: '', contact: '' });
    setShowAddBDE(false);
    handleSelectBDE(bde);
  };

  const handleDeleteBDE = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this BDE profile?")) {
      deleteBDE(id);
      setBdeList(getBDEs());
    }
  };

  const toggleDoorToDoor = () => {
    setFormData(prev => ({ ...prev, isDoorToDoor: !prev.isDoorToDoor }));
  };

  const toggleItem = (item: string) => {
    setFormData(prev => {
      const current = prev.selectedItems || [];
      if (current.includes(item)) {
        return { ...prev, selectedItems: current.filter(i => i !== item) };
      } else {
        return { ...prev, selectedItems: [...current, item] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeData: PermissionLetterData = {
      id: initialData?.id || Date.now().toString(),
      createdAt: initialData?.createdAt || Date.now(),
      isDoorToDoor: formData.isDoorToDoor ?? true,
      selectedItems: formData.selectedItems || [],
      plateCount: formData.plateCount || '',
      societyName: formData.societyName || '',
      eventDate: formData.eventDate || '',
      startTime: formData.startTime || '10:00',
      endTime: formData.endTime || '20:00',
      eventDuration: formData.eventDuration || EventDuration.ONE_DAY,
      eventAmount: formData.eventAmount || '',
      accountDetails: formData.accountDetails || '',
      bdeName: formData.bdeName || '',
      bdeContact: formData.bdeContact || '',
    };
    onSubmit(completeData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-24">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Event Details</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Society Name</label>
          <input 
            required
            name="societyName"
            value={formData.societyName}
            onChange={handleChange}
            type="text" 
            placeholder="e.g. Green Valley Apartments"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <span className="block font-bold text-gray-800 text-sm">Door-to-door activity?</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-tight">Team will visit each flat</span>
          </div>
          <button 
            type="button"
            onClick={toggleDoorToDoor}
            className={`w-12 h-6 rounded-full transition-colors relative ${formData.isDoorToDoor ? 'bg-green-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isDoorToDoor ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-600">Event Attractions</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleItem('Pani Puri Live Counter')}
              className={`flex-1 py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                formData.selectedItems?.includes('Pani Puri Live Counter')
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Pani Puri
            </button>
            <button
              type="button"
              onClick={() => toggleItem('Ice Cream Live Counter')}
              className={`flex-1 py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                formData.selectedItems?.includes('Ice Cream Live Counter')
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Ice Cream
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Plate Quantity</label>
              <div className="relative">
                <input 
                  name="plateCount"
                  value={formData.plateCount}
                  onChange={handleChange}
                  type="number"
                  placeholder="e.g. 100"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Event Fee (₹)</label>
              <div className="relative">
                <input 
                  name="eventAmount"
                  value={formData.eventAmount}
                  onChange={handleChange}
                  type="number"
                  placeholder="Manual Amount"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Event Date</label>
            <input 
              required
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
            <select 
              name="eventDuration"
              value={formData.eventDuration}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white transition-all"
            >
              <option value={EventDuration.ONE_DAY}>1 Day</option>
              <option value={EventDuration.TWO_DAYS}>2 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Select BDE</h2>
          <button 
            type="button" 
            onClick={() => setShowAddBDE(!showAddBDE)}
            className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100"
          >
            {showAddBDE ? "Cancel" : "+ Add BDE"}
          </button>
        </div>

        {showAddBDE && (
          <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 space-y-3">
            <input 
              value={newBDE.name}
              onChange={(e) => setNewBDE(prev => ({...prev, name: e.target.value}))}
              placeholder="Full Name"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
            />
            <input 
              value={newBDE.contact}
              onChange={(e) => setNewBDE(prev => ({...prev, contact: e.target.value}))}
              placeholder="Contact Number"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
            />
            <button 
              type="button"
              onClick={handleAddBDE}
              className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-bold"
            >
              Save BDE Profile
            </button>
          </div>
        )}

        {/* BDE Selection Buttons */}
        <div className="flex flex-wrap gap-2">
          {bdeList.length === 0 && !showAddBDE && (
            <p className="text-xs text-gray-400 italic">No BDE profiles saved. Add one above.</p>
          )}
          {bdeList.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => handleSelectBDE(b)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
                formData.bdeName === b.name
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              <span className="truncate max-w-[120px]">{b.name}</span>
              <div 
                onClick={(e) => handleDeleteBDE(b.id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500 rounded-md transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">BDE Name</label>
            <input 
              required
              name="bdeName"
              value={formData.bdeName}
              onChange={handleChange}
              type="text"
              placeholder="Selected Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
            <input 
              required
              name="bdeContact"
              value={formData.bdeContact}
              onChange={handleChange}
              type="tel"
              placeholder="Selected Number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg flex gap-3 z-30">
        <button 
          type="submit"
          className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg active:scale-[0.98]"
        >
          {initialData ? "Update & Preview" : "Generate Permission Letter"}
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;
