/** Building blocks for the private workspace: a record editor driven by a list of fields, and small display helpers. */
import React, { useEffect, useState } from 'react'
import type { Opt } from './options'
import type { PurchaseLink } from './types'

export type FieldType = 'text' | 'area' | 'int' | 'money' | 'date' | 'select' | 'multi' | 'tags' | 'bool' | 'links'
export interface FieldDef { key: string; label: string; type: FieldType; options?: Opt[]; help?: string; max?: number; req?: boolean }
export interface Group { title: string; note?: string; fields: FieldDef[] }
type Rec = Record<string, unknown>

const toDraft = (def: FieldDef, value: unknown): unknown => {
  if (def.type === 'tags') return Array.isArray(value) ? value.join(', ') : ''
  if (def.type === 'multi') return Array.isArray(value) ? value : []
  if (def.type === 'links') return Array.isArray(value) ? value : []
  if (def.type === 'bool') return value === true
  return value == null ? '' : String(value)
}
const fromDraft = (def: FieldDef, value: unknown): unknown => {
  if (def.type === 'tags') return String(value).split(',').map((x) => x.trim()).filter(Boolean)
  if (def.type === 'multi' || def.type === 'bool') return value
  if (def.type === 'links') return (value as PurchaseLink[]).filter((l) => l.label.trim() || l.url.trim()).map((l) => ({ ...l, label: l.label.trim(), url: l.url.trim() }))
  const s = String(value).trim()
  if (def.type === 'int') return s === '' ? null : Math.max(0, Math.round(Number(s)))
  if (def.type === 'money') return s === '' ? null : Math.round(Number(s) * 100) / 100
  if (def.type === 'select') return s === '' ? (def.options?.some((o) => o[0] === '') ? '' : null) : s
  return s === '' ? null : s
}
const invalid = (def: FieldDef, value: unknown): string | null => {
  if (def.type === 'int' || def.type === 'money') {
    const s = String(value).trim()
    if (s !== '' && (!Number.isFinite(Number(s)) || Number(s) < 0)) return 'Please enter a number.'
    if (s !== '' && def.max != null && Number(s) > def.max) return `Please enter ${def.max} or less.`
  }
  if (def.type === 'links') for (const l of value as PurchaseLink[]) {
    if ((l.label.trim() || l.url.trim()) && !/^https:\/\/\S+$/.test(l.url.trim())) return 'Each link needs an address that begins with https://'
  }
  return null
}

/**
 * Shows a record's fields for editing and saves only what changed. Nothing is
 * saved until "Save changes" is pressed; a failed save keeps the edits on screen.
 */
export function Editor({ id, record, groups, onSave, saveLabel = 'Save changes' }: {
  id: string; record: Rec; groups: Group[]; onSave: (patch: Rec) => Promise<void>; saveLabel?: string
}) {
  const defs = groups.flatMap((g) => g.fields)
  const initial = () => Object.fromEntries(defs.map((d) => [d.key, toDraft(d, record[d.key])]))
  const [draft, setDraft] = useState<Rec>(initial)
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [error, setError] = useState('')
  // a different record was opened, or this one was reloaded: start from what is stored
  useEffect(() => { setDraft(initial()); setState('idle'); setError('') }, [id, record])   // eslint-disable-line react-hooks/exhaustive-deps

  const changed = defs.filter((d) => JSON.stringify(fromDraft(d, draft[d.key])) !== JSON.stringify(fromDraft(d, toDraft(d, record[d.key]))))
  const set = (key: string, value: unknown) => { setDraft((old) => ({ ...old, [key]: value })); setState('idle') }
  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    const bad = changed.map((d) => [d, invalid(d, draft[d.key])] as const).find(([, m]) => m)
    if (bad) return setError(`${bad[0].label}: ${bad[1]}`)
    setState('saving'); setError('')
    try { await onSave(Object.fromEntries(changed.map((d) => [d.key, fromDraft(d, draft[d.key])]))); setState('saved') }
    catch (err) { setError(err instanceof Error ? err.message : 'This could not be saved.'); setState('idle') }
  }

  return (
    <form className="ws-editor" onSubmit={save} noValidate>
      {groups.map((g) => (
        <fieldset key={g.title}>
          <legend>{g.title}</legend>
          {g.note && <p className="ws-note">{g.note}</p>}
          <div className="ws-fields">
            {g.fields.map((d) => <FieldInput key={d.key} id={`${id}-${d.key}`} def={d} value={draft[d.key]} onChange={(v) => set(d.key, v)} />)}
          </div>
        </fieldset>
      ))}
      <div className="ws-savebar">
        <button type="submit" className="cb-btn small" disabled={!changed.length || state === 'saving'}>{state === 'saving' ? 'Saving…' : saveLabel}</button>
        {changed.length > 0 && state !== 'saving' && <button type="button" className="cb-textlink" onClick={() => { setDraft(initial()); setError('') }}>Discard changes</button>}
        <span role="status" aria-live="polite" className="ws-saved">{state === 'saved' && !changed.length ? 'Saved.' : changed.length ? `${changed.length} unsaved ${changed.length === 1 ? 'change' : 'changes'}` : ''}</span>
      </div>
      {error && <p className="cb-err" role="alert">{error}</p>}
    </form>
  )
}

function FieldInput({ id, def, value, onChange }: { id: string; def: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const wide = def.type === 'area' || def.type === 'multi' || def.type === 'links'
  const help = def.help && <span className="ws-help">{def.help}</span>
  if (def.type === 'bool') {
    return <label className={'ws-f wide ws-bool'}><input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} /><span>{def.label}{help}</span></label>
  }
  if (def.type === 'multi') {
    const chosen = value as string[]
    return (
      <fieldset className="ws-f wide ws-multi"><legend>{def.label}</legend>{help}
        <div>{def.options!.map(([v, l]) => (
          <label key={v}><input type="checkbox" checked={chosen.includes(v)} onChange={(e) => onChange(e.target.checked ? [...chosen, v] : chosen.filter((x) => x !== v))} /> {l}</label>
        ))}</div>
      </fieldset>
    )
  }
  if (def.type === 'links') {
    const links = value as PurchaseLink[]
    const edit = (i: number, patch: Partial<PurchaseLink>) => onChange(links.map((l, j) => (j === i ? { ...l, ...patch } : l)))
    return (
      <fieldset className="ws-f wide ws-links"><legend>{def.label}</legend>{help}
        {links.map((l, i) => (
          <div key={i} className="ws-link">
            <label>Button text<input type="text" value={l.label} onChange={(e) => edit(i, { label: e.target.value })} placeholder="Shop online" /></label>
            <label>Address<input type="url" value={l.url} onChange={(e) => edit(i, { url: e.target.value })} placeholder="https://" /></label>
            <label>Verified on<input type="date" value={l.verified_on ?? ''} onChange={(e) => edit(i, { verified_on: e.target.value })} /></label>
            <button type="button" className="cb-textlink" onClick={() => onChange(links.filter((_, j) => j !== i))} aria-label={`Remove link ${i + 1}`}>Remove</button>
          </div>
        ))}
        <button type="button" className="cb-textlink" onClick={() => onChange([...links, { label: '', url: '', kind: 'online', verified_on: '' }])}>+ Add a link</button>
      </fieldset>
    )
  }
  return (
    <label className={'ws-f' + (wide ? ' wide' : '')} htmlFor={id}>
      <span>{def.label}</span>
      {def.type === 'area' ? <textarea id={id} value={value as string} onChange={(e) => onChange(e.target.value)} rows={3} />
        : def.type === 'select' ? (
          <select id={id} value={value as string} onChange={(e) => onChange(e.target.value)}>
            {!def.req && !def.options!.some((o) => o[0] === '') && <option value="">Not set</option>}
            {def.options!.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ) : <input id={id} type={def.type === 'date' ? 'date' : 'text'} inputMode={def.type === 'int' ? 'numeric' : def.type === 'money' ? 'decimal' : undefined}
            value={value as string} onChange={(e) => onChange(e.target.value)} />}
      {help}
    </label>
  )
}

/** A read-only list of label and value pairs. Empty values are shown as "Not provided" so a gap is never mistaken for "none". */
export function Facts({ rows }: { rows: [label: string, value: React.ReactNode][] }) {
  return (
    <dl className="ws-facts">
      {rows.map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value === '' || value == null || value === false ? <span className="ws-blank">Not provided</span> : value === true ? 'Yes' : value}</dd></div>
      ))}
    </dl>
  )
}
export const fmtDate = (iso: string | null | undefined): string => {
  if (!iso) return ''
  const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
export const daysUntil = (iso: string, today: string): number =>
  Math.round((Date.parse(iso + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000)
export function StatusTag({ label, tone }: { label: string; tone?: 'teal' | 'quiet' | 'alert' }) {
  return <span className={'cb-tag ' + (tone ?? '')}>{label}</span>
}
export function download(filename: string, text: string) {
  // the leading mark tells spreadsheet programs the file is UTF-8, so accents and dashes read correctly
  const blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
