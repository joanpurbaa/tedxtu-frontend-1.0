'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Plus,
    Lock,
    Unlock,
    Pencil,
    Trash2,
    Mic,
    Upload,
    X,
    Loader2,
} from 'lucide-react';

type Speaker = {
    id: string;
    name: string;
    title: string | null;
    description: string | null;
    mainPhoto: string;
    supportingPhoto1: string | null;
    supportingPhoto2: string | null;
    supportingPhoto3: string | null;
    isLocked: boolean;
    createdAt: string;
};

const PHOTO_FIELDS = [
    { key: 'mainPhoto', label: 'Main Photo', hint: '3:4 (portrait)' },
    { key: 'supportingPhoto1', label: 'Supporting Photo 1', hint: '1:1 (square)' },
    { key: 'supportingPhoto2', label: 'Supporting Photo 2', hint: '1:1 (square)' },
    { key: 'supportingPhoto3', label: 'Supporting Photo 3', hint: '1:1 (square)' },
] as const;

type FormState = {
    name: string;
    title: string;
    description: string;
    mainPhoto: string;
    supportingPhoto1: string;
    supportingPhoto2: string;
    supportingPhoto3: string;
};

const emptyForm: FormState = {
    name: '',
    title: '',
    description: '',
    mainPhoto: '',
    supportingPhoto1: '',
    supportingPhoto2: '',
    supportingPhoto3: '',
};

type UploadState = Record<string, File | null>;

async function uploadPhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/speakers/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Upload failed');
    return data.url;
}

// Resize + compress large photos on the client before upload. When Vercel Blob is
// unreachable the server falls back to storing a base64 data URL, which can push a
// speaker with 4 photos past the 10MB request body limit. Compressing keeps those
// payloads small so the create never exceeds the limit.
async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<File> {
    try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error('Could not read image'));
            reader.readAsDataURL(file);
        });

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error('Could not read image'));
            image.src = dataUrl;
        });

        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) return file;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const outDataUrl = canvas.toDataURL('image/jpeg', quality);
        const blob = await (await fetch(outDataUrl)).blob();
        const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
        return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
    } catch {
        return file;
    }
}

function LockBadge({ locked }: { locked: boolean }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                locked
                    ? 'bg-white/10 text-white/70 border-white/10'
                    : 'bg-green-600/20 text-green-400 border-green-600/30'
            }`}
        >
            {locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            {locked ? 'LOCKED' : 'UNLOCKED'}
        </span>
    );
}

export default function SpeakersAdminPage() {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Speaker | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [uploads, setUploads] = useState<UploadState>({});
    const [actingId, setActingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

    const load = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/speakers');
            const data = await res.json().catch(() => null);
            setSpeakers(Array.isArray(data) ? data : []);
        } catch {
            setSpeakers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setUploads({});
        setError('');
        setModalOpen(true);
    };

    const openEdit = (s: Speaker) => {
        setEditing(s);
        setForm({
            name: s.name,
            title: s.title ?? '',
            description: s.description ?? '',
            mainPhoto: s.mainPhoto,
            supportingPhoto1: s.supportingPhoto1 ?? '',
            supportingPhoto2: s.supportingPhoto2 ?? '',
            supportingPhoto3: s.supportingPhoto3 ?? '',
        });
        setUploads({});
        setError('');
        setModalOpen(true);
    };

    const toggleLock = async (s: Speaker) => {
        setActingId(s.id);
        await fetch(`/api/admin/speakers/${s.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isLocked: !s.isLocked }),
        });
        await load();
        setActingId(null);
    };

    const remove = async (s: Speaker) => {
        if (!confirm(`Delete speaker "${s.name}"? Photos are not removed from storage.`)) return;
        setActingId(s.id);
        await fetch(`/api/admin/speakers/${s.id}`, { method: 'DELETE' });
        await load();
        setActingId(null);
    };

    const onPickFile = (key: string, file: File | null) => {
        setUploads((prev) => ({ ...prev, [key]: file }));
    };

    const handleSave = async () => {
        setError('');

        if (!form.name.trim()) {
            setError('Speaker name is required');
            return;
        }
        const hasMainPhoto = !!(uploads.mainPhoto || form.mainPhoto.trim());
        if (!hasMainPhoto) {
            setError('Main photo is required');
            return;
        }

        setSaving(true);
        try {
            const finalForm = { ...form };

            // Upload new photos in parallel, then merge their URLs into the form.
            const jobs = PHOTO_FIELDS.filter((field) => uploads[field.key]);
            const results = await Promise.all(
                jobs.map(async (field) => {
                    const file = uploads[field.key]!;
                    const compressed = await compressImage(file);
                    return [field.key, await uploadPhoto(compressed)] as const;
                }),
            );
            for (const [key, url] of results) {
                finalForm[key] = url;
            }

            const url = editing ? `/api/admin/speakers/${editing.id}` : '/api/admin/speakers';
            const res = await fetch(url, {
                method: editing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalForm),
            });
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setError(data?.error || 'Something went wrong, please try again');
                return;
            }

            setModalOpen(false);
            await load();
        } catch (err) {
            setError((err as Error).message || 'Upload failed, please try again');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-red-600"></div>
                    <p className="mt-4 text-white/60">Loading speakers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Speakers</h1>
                    <p className="mt-1 text-sm text-white/60">
                        Manage speakers. Locked speakers are hidden from the public event page.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Speaker
                </button>
            </div>

            <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden md:table-cell">Title / Category</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden sm:table-cell">Photo</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {speakers.map((s) => (
                                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-white">{s.name}</div>
                                        <div className="text-xs text-white/40 hidden md:hidden">{s.title ?? '—'}</div>
                                    </td>
                                    <td className="px-4 py-3 text-white/60 hidden md:table-cell">{s.title ?? '—'}</td>
                                    <td className="px-4 py-3"><LockBadge locked={s.isLocked} /></td>
                                    <td className="px-4 py-3 hidden sm:table-cell">
                                        {s.mainPhoto ? (
                                            <img src={s.mainPhoto} alt={s.name} className="h-10 w-10 rounded-lg object-cover border border-white/10" />
                                        ) : (
                                            <span className="text-xs text-white/30">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => toggleLock(s)}
                                                disabled={actingId === s.id}
                                                className={`p-1.5 rounded transition-colors border ${
                                                    s.isLocked
                                                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border-green-600/30'
                                                        : 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 border-yellow-600/30'
                                                }`}
                                                title={s.isLocked ? 'Unlock' : 'Lock'}
                                            >
                                                {actingId === s.id ? (
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                ) : s.isLocked ? (
                                                    <Unlock className="h-4 w-4" />
                                                ) : (
                                                    <Lock className="h-4 w-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => openEdit(s)}
                                                className="p-1.5 rounded border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => remove(s)}
                                                disabled={actingId === s.id}
                                                className="p-1.5 rounded border border-red-600/20 text-red-400 hover:bg-red-600/20 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {speakers.length === 0 && (
                    <div className="text-center py-12">
                        <Mic className="h-10 w-10 text-white/20 mx-auto mb-3" />
                        <p className="text-white/60">No speakers yet. Add one to get started.</p>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setModalOpen(false)}>
                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#121212] p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-5 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    {editing ? 'Edit Speaker' : 'Add Speaker'}
                                </h2>
                                <p className="text-sm text-white/40">
                                    New speakers are created {editing ? 'and remain' : 'as'} locked (hidden from public).
                                </p>
                            </div>
                            <button onClick={() => setModalOpen(false)} className="rounded-lg p-1 text-white/60 hover:bg-white/10">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/60">Name *</label>
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-600"
                                    placeholder="Speaker name"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/60">Title / Category / Topic</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-600"
                                    placeholder="e.g., Anthropology"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-white/60">Persona / Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full min-h-[80px] rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-600"
                                    placeholder="Optional"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {PHOTO_FIELDS.map((field) => (
                                    <div key={field.key}>
                                        <label className="mb-1.5 block text-sm font-medium text-white/60">
                                            {field.label}
                                            {field.key === 'mainPhoto' ? ' *' : ''}
                                            <span className="ml-1 text-xs font-normal text-white/40">
                                                ({field.hint})
                                            </span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => fileInputs.current[field.key]?.click()}
                                            className="w-full rounded-lg border border-dashed border-white/20 bg-white/5 p-3 flex flex-col items-center justify-center gap-2 text-center hover:border-red-600/50 hover:bg-white/10 transition-colors"
                                        >
                                            {uploads[field.key] ? (
                                                <>
                                                    <img
                                                        src={URL.createObjectURL(uploads[field.key]!)}
                                                        alt={field.label}
                                                        className="h-16 w-16 rounded object-cover"
                                                    />
                                                    <span className="text-xs text-white/70">{uploads[field.key]!.name}</span>
                                                </>
                                            ) : form[field.key] ? (
                                                <>
                                                    <img src={form[field.key]} alt={field.label} className="h-16 w-16 rounded object-cover" />
                                                    <span className="text-xs text-white/50">Click to replace</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-5 w-5 text-white/40" />
                                                    <span className="text-xs text-white/50">Click to upload</span>
                                                </>
                                            )}
                                        </button>
                                        <input
                                            ref={(el) => { fileInputs.current[field.key] = el; }}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => onPickFile(field.key, e.target.files?.[0] ?? null)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {editing && (
                                <p className="text-xs text-white/40">
                                    Editing does not change this speaker&apos;s lock status. Use the Lock/Unlock button in the list to change visibility.
                                </p>
                            )}

                            {error && <p className="text-sm text-red-400">{error}</p>}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 px-4 py-2 text-sm font-medium text-white transition-colors"
                                >
                                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {editing ? 'Save Changes' : 'Add Speaker'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
