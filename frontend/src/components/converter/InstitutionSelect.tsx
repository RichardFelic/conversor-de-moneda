import { memo } from 'react';
import { useConversionStore } from './stores/conversionStore';
import type { Institution } from './types';
import './ConversionControl.css';

interface InstitutionSelectProps {
  institutions: Institution[];
  selectedInstitution: string;
}

export const InstitutionSelect = memo(function InstitutionSelect({
  institutions,
  selectedInstitution,
}: InstitutionSelectProps) {
  const { setSelectedInstitution } = useConversionStore();

  const selectedInst = institutions.find(i => i._id === selectedInstitution);

  return (
    <div className="institute-selector-container">
      <div className="institute-selector">
        <div className="selector-content">
          <label>Institution (Optional)</label>
          <select
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            className="institution-select"
          >
            <option value="">Select an institution</option>
            {institutions.map((institution) => (
              <option key={institution._id} value={institution._id}>
                {institution.name}
              </option>
            ))}
          </select>
        </div>
        {selectedInst?.img && (
          <img
            src={selectedInst.img}
            alt={selectedInst.name}
            className="institution-logo"
          />
        )}
      </div>
    </div>
  );
});