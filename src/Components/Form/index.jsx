import React, { useState, useEffect } from 'react';
import { Button, Card, Checkbox, NumberInput, Select } from '@mantine/core';
import { useSettings } from '../../Context/Settings';

const SettingsManagement = () => {
  const { settings, saveSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  // Effect to update local settings when the global settings change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    saveSettings(localSettings);
  };

  return (
    <div>
      <Card shadow="sm" padding="sm">
        <Checkbox
          label="Show Completed Items"
          checked={localSettings.showCompleted}
          onChange={(event) => setLocalSettings({ ...localSettings, showCompleted: event.currentTarget.checked })}
        />
        <NumberInput
          label="Items Per Page"
          value={localSettings.itemsPerPage}
          onChange={(value) => setLocalSettings({ ...localSettings, itemsPerPage: value })}
          min={1}
          max={10}
        />
        <Select
          label="Default Sort Field"
          value={localSettings.defaultSort}
          onChange={(value) => setLocalSettings({ ...localSettings, defaultSort: value })}
          data={[
            { value: 'date', label: 'Date' },
            { value: 'name', label: 'Name' },
            { value: 'priority', label: 'Priority' }
          ]}
        />
        <Button onClick={handleSave}>Save Settings</Button>
      </Card>

      <div style={{ marginTop: '20px' }}>
        <h2>Current Settings:</h2>
        <p>Show Completed Items: {localSettings.showCompleted ? 'Yes' : 'No'}</p>
        <p>Items Per Page: {localSettings.itemsPerPage}</p>
        <p>Default Sort Field: {localSettings.defaultSort}</p>
      </div>
    </div>
  );
};

export default SettingsManagement;
