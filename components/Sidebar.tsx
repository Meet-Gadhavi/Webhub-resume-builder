import React, { useState } from 'react';
import { ResumeData, TemplateType, FieldVisibility } from '../types';
import { Check, User, Link, MapPin, FileText, Briefcase, GraduationCap, Wrench, Layout, ChevronDown, ChevronRight, Settings } from 'lucide-react';

interface SidebarProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

// Reusable Nice Toggle Component
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
      checked ? 'bg-indigo-600' : 'bg-slate-200'
    }`}
  >
    <span className="sr-only">Use setting</span>
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ data, onChange, selectedTemplate, onTemplateChange }) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSectionVisibility = (key: keyof typeof data.themeConfig.sectionVisibility) => {
    onChange({
      ...data,
      themeConfig: {
        ...data.themeConfig,
        sectionVisibility: {
          ...data.themeConfig.sectionVisibility,
          [key]: !data.themeConfig.sectionVisibility[key]
        }
      }
    });
  };

  const toggleFieldVisibility = (key: keyof FieldVisibility) => {
    onChange({
      ...data,
      themeConfig: {
        ...data.themeConfig,
        fieldVisibility: {
          ...data.themeConfig.fieldVisibility,
          [key]: !data.themeConfig.fieldVisibility[key]
        }
      }
    });
  };

  const templates: { id: TemplateType; name: string }[] = [
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'bold', name: 'Bold' },
    { id: 'tech', name: 'Tech' },
  ];

  const menuItems = [
    { 
      key: 'address', 
      label: 'Address Details', 
      icon: MapPin,
      subFields: [
        { key: 'address', label: 'Street Address' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'country', label: 'Country' },
        { key: 'postalCode', label: 'Postal Code' },
      ]
    },
    { 
      key: 'personalDetails', 
      label: 'Personal Details', 
      icon: User,
      subFields: [
        { key: 'dateOfBirth', label: 'Date of Birth' },
        { key: 'placeOfBirth', label: 'Place of Birth' },
        { key: 'nationality', label: 'Nationality' },
        { key: 'maritalStatus', label: 'Marital Status' },
        { key: 'gender', label: 'Gender' },
        { key: 'drivingLicense', label: 'Driving License' },
      ]
    },
    { 
      key: 'links', 
      label: 'Social Links', 
      icon: Link,
      subFields: [
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'linkedin', label: 'LinkedIn' },
        { key: 'website', label: 'Website' },
      ]
    },
    { key: 'summary', label: 'Summary', icon: FileText, subFields: [] },
    { key: 'experience', label: 'Experience', icon: Briefcase, subFields: [] },
    { key: 'education', label: 'Education', icon: GraduationCap, subFields: [] },
    { key: 'skills', label: 'Skills', icon: Wrench, subFields: [] },
  ];

  return (
    <div className="w-full lg:w-72 bg-white border-r border-slate-200 h-full flex flex-col sticky top-16">
      {/* Templates Section */}
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Layout className="w-4 h-4" /> Templates
        </h2>
        <div className="space-y-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all ${
                selectedTemplate === t.id 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <span>{t.name}</span>
              {selectedTemplate === t.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Visibility Section */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
           <Settings className="w-4 h-4" /> Visibility Control
        </h2>
        <p className="text-[10px] text-slate-400 mb-4">Toggle entire sections or specific fields.</p>
        
        <div className="space-y-1">
          {menuItems.map(({ key, label, icon: Icon, subFields }) => {
            const isSectionVisible = data.themeConfig.sectionVisibility[key as keyof typeof data.themeConfig.sectionVisibility];
            const hasSubFields = subFields.length > 0;
            const isExpanded = expandedMenu === key;

            return (
              <div key={key} className="rounded-xl overflow-hidden transition-all duration-200 mb-1">
                {/* Main Section Header */}
                <div 
                  className={`flex items-center justify-between p-2.5 transition-colors ${
                    isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <button 
                    onClick={() => hasSubFields ? setExpandedMenu(isExpanded ? null : key) : null}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className={`p-1.5 rounded-lg transition-colors shadow-sm border ${
                      isSectionVisible 
                        ? 'bg-indigo-100 text-indigo-600 border-indigo-200' 
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}>
                       <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-medium ${isSectionVisible ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
                    {hasSubFields && (
                       <div className="text-slate-400 ml-1">
                         {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                       </div>
                    )}
                  </button>
                  
                  {/* Master Toggle */}
                  <div className="ml-3">
                    <Toggle 
                      checked={isSectionVisible} 
                      onChange={() => toggleSectionVisibility(key as keyof typeof data.themeConfig.sectionVisibility)} 
                    />
                  </div>
                </div>

                {/* Sub Fields (Accordion Body) */}
                {hasSubFields && isExpanded && isSectionVisible && (
                  <div className="bg-slate-50 pl-12 pr-3 py-3 space-y-3 border-l-2 border-indigo-100 ml-5 mb-2 rounded-r-lg">
                     {subFields.map((field) => (
                       <div key={field.key} className="flex items-center justify-between group">
                          <span className="text-xs font-medium text-slate-600">{field.label}</span>
                          <Toggle 
                            checked={data.themeConfig.fieldVisibility[field.key as keyof FieldVisibility]} 
                            onChange={() => toggleFieldVisibility(field.key as keyof FieldVisibility)} 
                          />
                       </div>
                     ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};