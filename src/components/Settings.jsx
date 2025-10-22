import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  User,
  Palette,
  Database,
  Check,
  AlertCircle,
  RotateCw,
  Save,
} from "lucide-react";

/* ===================== Settings Hook ===================== */
const useSettings = (initialSettings) => {
  const [settings, setSettings] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState({
    account: false,
    appearance: false,
    storage: false,
  });
  const [saveStates, setSaveStates] = useState({
    account: "idle",
    appearance: "idle",
    storage: "idle",
  });

  const setField = useCallback((section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
    setDirty((prev) => ({ ...prev, [section]: true }));
  }, []);

  const resetSection = useCallback(
    (section) => {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...initialSettings[section] },
      }));
      setErrors((prev) => ({ ...prev, [section]: {} }));
      setDirty((prev) => ({ ...prev, [section]: false }));
      setSaveStates((prev) => ({ ...prev, [section]: "idle" }));
    },
    [initialSettings],
  );

  const validateSection = useCallback(
    (section) => {
      const s = settings[section];
      const e = {};

      if (section === "account") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))
          e.email = "Enter a valid email address";
        if (!s.username?.trim() || s.username.length < 3)
          e.username = "Username must be at least 3 characters";
        if (s.username.length > 20)
          e.username = "Username must be less than 20 characters";
      }

      if (section === "appearance") {
        if (!["light", "dark", "system"].includes(s.theme))
          e.theme = "Invalid theme selection";
        if (!["small", "medium", "large"].includes(s.font_size))
          e.font_size = "Invalid font size";
        if (!["compact", "comfortable", "spacious"].includes(s.density))
          e.density = "Invalid density setting";
      }

      if (section === "storage") {
        if (!["hourly", "daily", "weekly"].includes(s.backup_interval))
          e.backup_interval = "Invalid backup interval";
        if (!["50MB", "100MB", "500MB", "1GB"].includes(s.max_file_size))
          e.max_file_size = "Invalid file size limit";
      }

      setErrors((prev) => ({ ...prev, [section]: e }));
      return Object.keys(e).length === 0;
    },
    [settings],
  );

  const saveSection = useCallback(
    async (section) => {
      if (!validateSection(section)) return false;
      setSaveStates((prev) => ({ ...prev, [section]: "saving" }));
      try {
        await new Promise((r) => setTimeout(r, 700));
        setDirty((prev) => ({ ...prev, [section]: false }));
        setSaveStates((prev) => ({ ...prev, [section]: "success" }));
        setTimeout(
          () => setSaveStates((prev) => ({ ...prev, [section]: "idle" })),
          1800,
        );
        return true;
      } catch {
        setSaveStates((prev) => ({ ...prev, [section]: "error" }));
        return false;
      }
    },
    [validateSection],
  );

  return {
    settings,
    errors,
    dirty,
    saveStates,
    setField,
    resetSection,
    saveSection,
  };
};

/* ===================== Shared Inputs (dark palette updated) ===================== */
/** Dark palette used (kept inline to avoid Tailwind config changes):
 *  bg:       #0E0F11
 *  card:     #1A1C1E
 *  input:    #0F1113
 *  border:   #2A2E31
 *  text:     #E7E9EA
 *  muted:    #9AA4AE
 *  hover:    #202326
 */

const InputField = ({
  label,
  type = "text",
  value,
  error,
  onChange,
  description,
  ...props
}) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-gray-700 dark:text-[#E7E9EA] tracking-wide uppercase">
      {label}
    </label>
    {description && (
      <p className="text-sm text-gray-500 dark:text-[#9AA4AE] mb-2">
        {description}
      </p>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-sm border bg-white text-gray-900 transition-all duration-150 focus:outline-none focus:ring-1
        dark:bg-[#0F1113] dark:text-[#E7E9EA]
        ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 dark:border-[#2A2E31] dark:hover:border-[#394045] dark:focus:border-blue-500 dark:focus:ring-blue-500"
        }`}
      {...props}
    />
    {error && (
      <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const SelectField = ({
  label,
  value,
  options,
  error,
  onChange,
  description,
  ...props
}) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-gray-700 dark:text-[#E7E9EA] tracking-wide uppercase">
      {label}
    </label>
    {description && (
      <p className="text-sm text-gray-500 dark:text-[#9AA4AE] mb-2">
        {description}
      </p>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-sm border bg-white text-gray-900 transition-all duration-150 focus:outline-none focus:ring-1
        dark:bg-[#0F1113] dark:text-[#E7E9EA]
        ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 dark:border-[#2A2E31] dark:hover:border-[#394045] dark:focus:border-blue-500 dark:focus:ring-blue-500"
        }`}
      {...props}
    >
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          className="bg-white text-gray-900 dark:bg-[#0F1113] dark:text-[#E7E9EA]"
        >
          {o.label}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const ToggleSwitch = ({ checked, onChange, label, description }) => (
  <div
    className="flex items-start justify-between py-3 px-4 border-b last:border-b-0 transition-colors
                  border-gray-100 hover:bg-gray-50
                  dark:border-[#2A2E31] dark:hover:bg-[#202326]"
  >
    <div className="flex-1 pr-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-[#E7E9EA]">
        {label}
      </h4>
      {description && (
        <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mt-0.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 rounded-full transition-all
                      bg-gray-200 peer-checked:bg-blue-600
                      dark:bg-[#2A2E31]"
      >
        <span
          className="absolute top-[2px] left-[2px] h-5 w-5 bg-white rounded-full transition-all
                         peer-checked:translate-x-5"
        />
      </div>
    </label>
  </div>
);

const RadioGroup = ({
  label,
  value,
  options,
  error,
  onChange,
  description,
}) => (
  <div className="space-y-2">
    <label className="block text-xs font-medium text-gray-700 dark:text-[#E7E9EA] tracking-wide uppercase">
      {label}
    </label>
    {description && (
      <p className="text-sm text-gray-500 dark:text-[#9AA4AE] mb-2">
        {description}
      </p>
    )}
    <div className="flex gap-4">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            name={label}
            value={o.value}
            checked={value === o.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-[#E7E9EA] group-hover:text-gray-900 dark:group-hover:text-white">
            {o.label}
          </span>
        </label>
      ))}
    </div>
    {error && (
      <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

/* ===================== Section Footer ===================== */
const SectionActions = ({ dirty, saveState, onReset, onSave }) => {
  const state = (() => {
    switch (saveState) {
      case "saving":
        return { text: "Saving", icon: RotateCw, disabled: true, spin: true };
      case "success":
        return { text: "Saved", icon: Check, disabled: true };
      case "error":
        return { text: "Retry", icon: RotateCw, disabled: false };
      default:
        return { text: "Save Changes", icon: Save, disabled: !dirty };
    }
  })();

  const Icon = state.icon;

  return (
    <div className="flex justify-end gap-2 pt-4 mt-6 border-t border-gray-200 dark:border-[#2A2E31]">
      <button
        type="button"
        onClick={onReset}
        disabled={!dirty || saveState === "saving"}
        className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors
          ${
            dirty && saveState !== "saving"
              ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-[#1A1C1E] dark:text-[#E7E9EA] dark:border-[#2A2E31] dark:hover:bg-[#202326]"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed dark:bg-[#0F1113] dark:text-[#9AA4AE] dark:border-[#2A2E31]"
          }`}
      >
        <RotateCw className="w-3.5 h-3.5 inline-block mr-2" />
        Reset
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={state.disabled}
        className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors flex items-center gap-2
          ${
            !state.disabled
              ? "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
              : saveState === "success"
                ? "bg-teal-600 text-white border border-teal-600"
                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed dark:bg-[#0F1113] dark:text-[#9AA4AE] dark:border-[#2A2E31]"
          }`}
      >
        <Icon className={`w-3.5 h-3.5 ${state.spin ? "animate-spin" : ""}`} />
        {state.text}
      </button>
    </div>
  );
};

/* ===================== Sections (unchanged structure) ===================== */
const AccountSection = ({
  settings,
  errors,
  dirty,
  saveState,
  setField,
  resetSection,
  saveSection,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Account Settings
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-4">
        Manage your account credentials and identity
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          label="Username"
          value={settings.username}
          error={errors.username}
          onChange={(e) => setField("account", "username", e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          value={settings.email}
          error={errors.email}
          onChange={(e) => setField("account", "email", e.target.value)}
        />
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Preferences
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-3">
        Configure automated behaviors
      </p>
      <div className="bg-white border border-gray-200 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <ToggleSwitch
          checked={settings.notifications}
          onChange={(v) => setField("account", "notifications", v)}
          label="Enable Notifications"
          description="Receive real-time updates and security alerts"
        />
        <ToggleSwitch
          checked={settings.auto_save}
          onChange={(v) => setField("account", "auto_save", v)}
          label="Auto-save Changes"
          description="Automatically persist modifications every 5 minutes"
        />
      </div>
    </div>

    <SectionActions
      dirty={dirty}
      saveState={saveState}
      onReset={() => resetSection("account")}
      onSave={() => saveSection("account")}
    />
  </div>
);

const AppearanceSection = ({
  settings,
  errors,
  dirty,
  saveState,
  setField,
  resetSection,
  saveSection,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Visual Theme
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-4">
        Customize interface appearance and color mode
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectField
          label="Theme Mode"
          value={settings.theme}
          error={errors.theme}
          onChange={(e) => setField("appearance", "theme", e.target.value)}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System Default" },
          ]}
        />
        <SelectField
          label="Font Size"
          value={settings.font_size}
          error={errors.font_size}
          onChange={(e) => setField("appearance", "font_size", e.target.value)}
          options={[
            { value: "small", label: "Small (12px)" },
            { value: "medium", label: "Medium (14px)" },
            { value: "large", label: "Large (16px)" },
          ]}
        />
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Interface Density
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-3">
        Adjust spacing and component sizing
      </p>
      <div className="bg-gray-50 border border-gray-200 p-4 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <RadioGroup
          label="Density Level"
          value={settings.density}
          error={errors.density}
          onChange={(v) => setField("appearance", "density", v)}
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfortable" },
            { value: "spacious", label: "Spacious" },
          ]}
        />
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Display Options
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-3">
        Configure visual aids and overlays
      </p>
      <div className="bg-white border border-gray-200 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <ToggleSwitch
          checked={settings.show_grid_lines}
          onChange={(v) => setField("appearance", "show_grid_lines", v)}
          label="Show Grid Lines"
          description="Display alignment guides in data tables and visualizations"
        />
      </div>
    </div>

    <SectionActions
      dirty={dirty}
      saveState={saveState}
      onReset={() => resetSection("appearance")}
      onSave={() => saveSection("appearance")}
    />
  </div>
);

const StorageSection = ({
  settings,
  errors,
  dirty,
  saveState,
  setField,
  resetSection,
  saveSection,
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Backup Configuration
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-3">
        Manage automated backup policies
      </p>
      <div className="bg-white border border-gray-200 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <ToggleSwitch
          checked={settings.auto_backup}
          onChange={(v) => setField("storage", "auto_backup", v)}
          label="Auto Backup"
          description="Automatically backup data to cloud storage infrastructure"
        />
        <div className="px-4 py-3 border-t border-gray-100 dark:border-[#2A2E31]">
          <SelectField
            label="Backup Frequency"
            value={settings.backup_interval}
            error={errors.backup_interval}
            onChange={(e) =>
              setField("storage", "backup_interval", e.target.value)
            }
            disabled={!settings.auto_backup}
            options={[
              { value: "hourly", label: "Hourly" },
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
            ]}
          />
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Storage Limits
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-4">
        Configure file size constraints and usage monitoring
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectField
          label="Maximum File Size"
          value={settings.max_file_size}
          error={errors.max_file_size}
          onChange={(e) => setField("storage", "max_file_size", e.target.value)}
          options={[
            { value: "50MB", label: "50 MB" },
            { value: "100MB", label: "100 MB" },
            { value: "500MB", label: "500 MB" },
            { value: "1GB", label: "1 GB" },
          ]}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-700 dark:text-[#E7E9EA] tracking-wide uppercase">
            Storage Usage
          </label>
          <div className="bg-gray-50 border border-gray-200 p-3 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
            <div className="flex justify-between text-xs text-gray-600 dark:text-[#E7E9EA] mb-1.5">
              <span className="font-mono">2.7 GB</span>
              <span className="text-gray-500 dark:text-[#9AA4AE]">
                of 6.0 GB
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-[#2A2E31]">
              <div className="h-2 bg-blue-600" style={{ width: "45%" }} />
            </div>
            <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mt-1.5 font-mono">
              45% utilized
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] mb-1">
        Optimization
      </h3>
      <p className="text-xs text-gray-500 dark:text-[#9AA4AE] mb-3">
        Enable compression and resource management
      </p>
      <div className="bg-white border border-gray-200 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <ToggleSwitch
          checked={settings.compression}
          onChange={(v) => setField("storage", "compression", v)}
          label="Enable Compression"
          description="Apply lossless compression to reduce storage footprint (CPU overhead: ~5-10ms)"
        />
      </div>
    </div>

    <SectionActions
      dirty={dirty}
      saveState={saveState}
      onReset={() => resetSection("storage")}
      onSave={() => saveSection("storage")}
    />
  </div>
);

/* ===================== Tabs ===================== */
const SettingsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "account", label: "Account Settings", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "storage", label: "Storage", icon: Database },
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-[#2A2E31]">
      {tabs.map((t) => {
        const active = activeTab === t.id;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
              ${
                active
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300 dark:text-[#9AA4AE] dark:hover:text-[#E7E9EA] dark:hover:border-[#394045]"
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="uppercase tracking-wide text-xs">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ===================== Main ===================== */
export default function Settings() {
  const [activeSetting, setActiveSetting] = useState("account");

  const initialSettings = useMemo(
    () => ({
      account: {
        username: "User",
        email: "user@safedrome.com",
        notifications: true,
        auto_save: true,
      },
      appearance: {
        theme: "dark",
        font_size: "medium",
        density: "comfortable",
        show_grid_lines: true,
      },
      storage: {
        auto_backup: true,
        backup_interval: "daily",
        max_file_size: "100MB",
        compression: true,
      },
    }),
    [],
  );

  const {
    settings,
    errors,
    dirty,
    saveStates,
    setField,
    resetSection,
    saveSection,
  } = useSettings(initialSettings);

  // Apply dark/system theme
  useEffect(() => {
    const theme = settings.appearance.theme;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (theme === "dark" || (theme === "system" && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.appearance.theme]);

  const sectionProps = (key) => ({
    settings: settings[key],
    errors: errors[key] || {},
    dirty: dirty[key],
    saveState: saveStates[key],
    setField,
    resetSection,
    saveSection,
  });

  const renderContent = () => {
    switch (activeSetting) {
      case "appearance":
        return <AppearanceSection {...sectionProps("appearance")} />;
      case "storage":
        return <StorageSection {...sectionProps("storage")} />;
      default:
        return <AccountSection {...sectionProps("account")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0E0F11]">
      <div className="bg-white border-b border-gray-200 px-6 py-3 dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-700 dark:text-[#E7E9EA]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h1 className="text-base font-semibold text-gray-900 uppercase tracking-wide dark:text-[#E7E9EA]">
            Settings
          </h1>
          <span className="text-xs text-gray-500 dark:text-[#9AA4AE]">|</span>
          <p className="text-xs text-gray-600 dark:text-[#9AA4AE]">
            Configure application parameters and preferences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white border border-gray-200 shadow-sm dark:bg-[#1A1C1E] dark:border-[#2A2E31]">
          <SettingsTabs
            activeTab={activeSetting}
            onTabChange={setActiveSetting}
          />
          <div className="p-6">{renderContent()}</div>
        </div>

        <div className="mt-4 px-4 py-2 bg-white border border-gray-200 text-xs text-gray-500 dark:bg-[#1A1C1E] dark:border-[#2A2E31] dark:text-[#9AA4AE]">
          {/* footer / version */}
        </div>
      </div>
    </div>
  );
}
