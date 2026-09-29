'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PetLogEntry, PetEventType } from '../lib/types';
import { INITIAL_PET_LOGS, OFFICIAL_PET_STANDARDS } from '../lib/mockData';
import { 
  Activity, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Flame, 
  Medal, 
  ChevronRight,
  History,
  X
} from 'lucide-react';

export const PetTrackerComponent: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<PetLogEntry[]>(INITIAL_PET_LOGS);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>(user?.gender || 'MALE');
  const [showAddForm, setShowAddForm] = useState(false);

  // New log form state
  const [selectedEvent, setSelectedEvent] = useState<PetEventType>('RUN_1600M');
  const [metricInput, setMetricInput] = useState<string>('');
  const [logNotes, setLogNotes] = useState<string>('');

  const standards = OFFICIAL_PET_STANDARDS.filter((s) => s.gender === gender || s.eventType === 'LONG_JUMP' || s.eventType === 'SHOT_PUT');

  // Compute best recorded metrics for each event
  const bestRun1600 = logs
    .filter((l) => l.eventType === 'RUN_1600M')
    .sort((a, b) => a.metricValue - b.metricValue)[0];

  const bestLongJump = logs
    .filter((l) => l.eventType === 'LONG_JUMP')
    .sort((a, b) => b.metricValue - a.metricValue)[0];

  const bestShotPut = logs
    .filter((l) => l.eventType === 'SHOT_PUT')
    .sort((a, b) => b.metricValue - a.metricValue)[0];

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = Math.round(sec % 60);
    return `${mins}m ${remainingSec < 10 ? '0' : ''}${remainingSec}s`;
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(metricInput);
    if (isNaN(val) || val <= 0) return;

    let isQualified = false;
    let unit: 'seconds' | 'meters' = 'seconds';

    if (selectedEvent === 'RUN_1600M') {
      unit = 'seconds';
      isQualified = val <= (gender === 'MALE' ? 435 : 435);
    } else if (selectedEvent === 'RUN_800M') {
      unit = 'seconds';
      isQualified = val <= 320;
    } else if (selectedEvent === 'LONG_JUMP') {
      unit = 'meters';
      isQualified = val >= (gender === 'MALE' ? 3.80 : 2.75);
    } else if (selectedEvent === 'SHOT_PUT') {
      unit = 'meters';
      isQualified = val >= (gender === 'MALE' ? 5.60 : 3.75);
    } else if (selectedEvent === 'SPRINT_100M') {
      unit = 'seconds';
      isQualified = val <= 15.00;
    }

    const newEntry: PetLogEntry = {
      id: `pet_log_${Date.now()}`,
      userId: user?.id || 'usr_demo',
      eventType: selectedEvent,
      metricValue: val,
      unit,
      loggedDate: new Date().toISOString().split('T')[0],
      isQualified,
      notes: logNotes || 'Daily ground practice session.',
    };

    setLogs([newEntry, ...logs]);
    setMetricInput('');
    setLogNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header and Gender toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Physical Efficiency Test (PET) & Measurement Log
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mandatory TSLPRB & AP Police ground test qualifications for SI & Constable cadres.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Gender Standards Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setGender('MALE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gender === 'MALE'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Men's Standards
            </button>
            <button
              onClick={() => setGender('FEMALE')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                gender === 'FEMALE'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Women's Standards
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
            <span>{showAddForm ? 'Close Form' : 'Log Daily Metric'}</span>
          </button>
        </div>
      </div>

      {/* Add New Log Form Modal / Inline */}
      {showAddForm && (
        <form onSubmit={handleAddLog} className="bg-white border-2 border-emerald-400 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Record Ground Fitness Metric</h3>
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Standard: {gender}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value as PetEventType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-500"
              >
                <option value="RUN_1600M">1600m Run (Men: 7m 15s)</option>
                <option value="RUN_800M">800m Run (Women: 5m 20s)</option>
                <option value="LONG_JUMP">Long Jump (Men: 4.00m / Women: 2.50m)</option>
                <option value="SHOT_PUT">Shot Put (Men: 6.00m / Women: 4.00m)</option>
                <option value="SPRINT_100M">100m Sprint (15.00s)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Value ({selectedEvent.includes('RUN') || selectedEvent.includes('SPRINT') ? 'Total Seconds (e.g. 405)' : 'Meters (e.g. 4.25)'})
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={metricInput}
                onChange={(e) => setMetricInput(e.target.value)}
                placeholder={selectedEvent.includes('RUN') ? '405 (which is 6m 45s)' : '4.25'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Workout Notes</label>
              <input
                type="text"
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="e.g. Police parade grounds morning run"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              Save Metric
            </button>
          </div>
        </form>
      )}

      {/* Official Qualifying Benchmark Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1600m Run */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded">
              {gender === 'MALE' ? '1600m Run' : '800m Run'}
            </span>
            <Timer className="w-5 h-5 text-emerald-600" />
          </div>

          <div>
            <span className="text-xs text-slate-500">Official Qualifying Standard</span>
            <p className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {gender === 'MALE' ? '7m 15s (435s)' : '5m 20s (320s)'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold">Your Best Recorded:</span>
              <p className="text-sm font-black text-emerald-700 font-mono">
                {bestRun1600 ? formatSeconds(bestRun1600.metricValue) : '6m 45s'}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              QUALIFIED
            </span>
          </div>
        </div>

        {/* Long Jump */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase bg-amber-50 px-2.5 py-1 rounded">
              Long Jump (3 Attempts)
            </span>
            <Flame className="w-5 h-5 text-amber-600" />
          </div>

          <div>
            <span className="text-xs text-slate-500">Official Qualifying Standard</span>
            <p className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {gender === 'MALE' ? '4.00 Metres' : '2.50 Metres'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold">Your Best Recorded:</span>
              <p className="text-sm font-black text-amber-700 font-mono">
                {bestLongJump ? `${bestLongJump.metricValue}m` : '4.20m'}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              QUALIFIED
            </span>
          </div>
        </div>

        {/* Shot Put */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase bg-blue-50 px-2.5 py-1 rounded">
              Shot Put ({gender === 'MALE' ? '7.26 kg' : '4.00 kg'})
            </span>
            <Medal className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <span className="text-xs text-slate-500">Official Qualifying Standard</span>
            <p className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {gender === 'MALE' ? '6.00 Metres' : '4.00 Metres'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold">Your Best Recorded:</span>
              <p className="text-sm font-black text-blue-700 font-mono">
                {bestShotPut ? `${bestShotPut.metricValue}m` : '6.50m'}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              QUALIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Historical Logs Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-500" />
            <h3 className="text-base font-bold text-slate-900">Recorded Ground Sessions History</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">{logs.length} Total Logs</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Event Name</th>
                <th className="p-3">Metric Recorded</th>
                <th className="p-3">Status</th>
                <th className="p-3">Training Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{log.loggedDate}</td>
                  <td className="p-3 font-bold text-slate-900">{log.eventType.replace(/_/g, ' ')}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">
                    {log.unit === 'seconds' ? formatSeconds(log.metricValue) : `${log.metricValue} meters`}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.isQualified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {log.isQualified ? 'QUALIFIED' : 'BELOW PAR'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
