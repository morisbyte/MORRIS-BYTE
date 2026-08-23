import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../../types';
import { INITIAL_SITE_SETTINGS } from '../../data/initialData';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface AdminSettingsProps {
  settings?: SiteSettings | null;
  onRefresh: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onRefresh
}) => {
  const { success, error } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SiteSettings>(settings || INITIAL_SITE_SETTINGS);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(form);
      success('Settings Synchronized', 'Site metrics and corporate information updated.');
      onRefresh();
    } catch (err: any) {
      error('Update Failed', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-[#F4F1EA]">
          Global Site Metrics & Corporate Settings
        </h1>
        <p className="text-xs text-[#8B8D89]">
          Configure real-time statistics counters, corporate headlines, and international contact endpoints.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Headlines */}
        <div className="p-6 bg-[#141618] border border-[#24282D] space-y-4">
          <h3 className="text-sm font-bold font-display uppercase tracking-widest text-[#DC2626]">
            01 // Brand & Hero Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Hero Eyebrow / Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={e => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Hero Subheadline</label>
            <input
              type="text"
              value={form.subheadline}
              onChange={e => setForm({ ...form, subheadline: e.target.value })}
              className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
            />
          </div>
        </div>

        {/* Global Statistics Counters */}
        <div className="p-6 bg-[#141618] border border-[#24282D] space-y-4">
          <h3 className="text-sm font-bold font-display uppercase tracking-widest text-[#DC2626]">
            02 // Animated Homepage Key Statistical Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Years of Experience</label>
              <input
                type="text"
                value={form.stats.yearsExperience}
                onChange={e => setForm({ ...form, stats: { ...form.stats, yearsExperience: e.target.value } })}
                placeholder="25+"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Countries Served</label>
              <input
                type="text"
                value={form.stats.countriesServed}
                onChange={e => setForm({ ...form, stats: { ...form.stats, countriesServed: e.target.value } })}
                placeholder="18"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Projects Delivered</label>
              <input
                type="text"
                value={form.stats.projectsDelivered}
                onChange={e => setForm({ ...form, stats: { ...form.stats, projectsDelivered: e.target.value } })}
                placeholder="240+"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Delivered Floor Area</label>
              <input
                type="text"
                value={form.stats.areaDelivered}
                onChange={e => setForm({ ...form, stats: { ...form.stats, areaDelivered: e.target.value } })}
                placeholder="4.8M+ m²"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Global Workforce</label>
              <input
                type="text"
                value={form.stats.workforceCount}
                onChange={e => setForm({ ...form, stats: { ...form.stats, workforceCount: e.target.value } })}
                placeholder="12,400+"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Safety Index Score</label>
              <input
                type="text"
                value={form.stats.safetyScore}
                onChange={e => setForm({ ...form, stats: { ...form.stats, safetyScore: e.target.value } })}
                placeholder="99.8%"
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>
        </div>

        {/* Global Contacts */}
        <div className="p-6 bg-[#141618] border border-[#24282D] space-y-4">
          <h3 className="text-sm font-bold font-display uppercase tracking-widest text-[#DC2626]">
            03 // Global Commercial Endpoints
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Primary Inquiries Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#D9D7D0] mb-1">Global Switchboard Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={e => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full bg-[#181A1D] border border-[#2F343B] p-2.5 text-[#F4F1EA]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#DC2626] hover:bg-[#EF4444] text-[#111315] text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Synchronizing...' : 'Save Configuration Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
