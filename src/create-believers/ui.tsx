/** Small shared pieces: in-page navigation, page metadata, and accessible form fields. */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { Errors, Values } from './types'
import type { Opt } from './options'

// ── navigation ──────────────────────────────────────────────────────────────
// On the website the pages live under /create-believers. In a single-file
// preview there are no paths, so the same pages are addressed after a #.
export const BASE = '/create-believers'
const usesPaths = () => typeof window !== 'undefined' && window.location.pathname.startsWith(BASE)

export function href(to = ''): string {
  const clean = to.replace(/^\/+/, '')
  // without paths, only a plain #name is available: host, brands, g-<name>, recap-<key>
  return usesPaths() ? BASE + (clean ? '/' + clean : '') : '#' + clean.split('?')[0].replace(/\//g, '-')
}
function read(): { path: string; query: URLSearchParams } {
  if (typeof window === 'undefined') return { path: '', query: new URLSearchParams() }
  if (usesPaths()) {
    return { path: window.location.pathname.slice(BASE.length).replace(/^\/+|\/+$/g, ''), query: new URLSearchParams(window.location.search) }
  }
  const name = window.location.hash.replace(/^#/, '')
  return { path: name.replace(/^(g|recap)-/, '$1/'), query: new URLSearchParams() }
}
export function go(to = ''): void {
  if (usesPaths()) window.history.pushState({ path: href(to) }, '', href(to))
  else window.location.hash = href(to).slice(1)
  window.dispatchEvent(new Event('cb:navigate'))
  try { window.scrollTo(0, 0) } catch { /* ignore */ }
}
export function useRoute() {
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const on = () => setRoute(read())
    for (const ev of ['popstate', 'hashchange', 'cb:navigate']) window.addEventListener(ev, on)
    return () => { for (const ev of ['popstate', 'hashchange', 'cb:navigate']) window.removeEventListener(ev, on) }
  }, [])
  return route
}
/** A real link (so it can be opened in a new tab) that moves between pages without a reload. */
export function Link({ to = '', className, children, ...rest }: { to?: string; className?: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} href={href(to)} className={className} onClick={(e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault(); go(to)
    }}>{children}</a>
  )
}

// ── page title, description, and search-engine visibility ───────────────────
export function useMeta(title: string, description: string, opts: { noindex?: boolean; path?: string } = {}) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    const undo: (() => void)[] = []
    const set = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (el) { const before = el.getAttribute('content'); el.setAttribute('content', content); undo.push(() => el && before != null && el.setAttribute('content', before)) }
      else { el = document.createElement('meta'); el.setAttribute(attr, key); el.setAttribute('content', content); document.head.appendChild(el); undo.push(() => el?.remove()) }
    }
    set('meta[name="description"]', 'name', 'description', description)
    set('meta[property="og:title"]', 'property', 'og:title', title)
    set('meta[property="og:description"]', 'property', 'og:description', description)
    set('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    set('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    if (opts.path != null) set('meta[property="og:url"]', 'property', 'og:url', 'https://believestudio.co' + BASE + opts.path)
    if (opts.noindex) set('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow')
    return () => { document.title = prevTitle; undo.forEach((u) => u()) }
  }, [title, description, opts.noindex, opts.path])
}
/** Moves keyboard and screen-reader focus to the page heading when a page opens. */
export function useHeadingFocus(dep?: unknown) {
  const ref = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)
  useEffect(() => {
    // leave focus alone on the very first paint of a direct visit; move it on every later change
    if (first.current && dep === undefined) { first.current = false; return }
    first.current = false
    try { ref.current?.focus({ preventScroll: false }) } catch { /* ignore */ }
  }, [dep])
  return ref
}

// ── forms ───────────────────────────────────────────────────────────────────
export interface Form {
  v: Values; errors: Errors
  set: (name: string, value: string | boolean | string[]) => void
  setErrors: (e: Errors) => void
  reset: (v: Values) => void
}
export function useForm(initial: Values): Form {
  const [v, setV] = useState<Values>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const set = useCallback((name: string, value: string | boolean | string[]) => {
    setV((old) => ({ ...old, [name]: value }))
    setErrors((old) => { if (!(name in old)) return old; const next = { ...old }; delete next[name]; return next })
  }, [])
  const reset = useCallback((next: Values) => { setV(next); setErrors({}) }, [])
  return { v, errors, set, setErrors, reset }
}
const s = (f: Form, name: string) => (typeof f.v[name] === 'string' ? (f.v[name] as string) : '')
const list = (f: Form, name: string) => (Array.isArray(f.v[name]) ? (f.v[name] as string[]) : [])

function Label({ label, optional }: { label: React.ReactNode; optional?: boolean }) {
  return <>{label}{optional && <span className="cb-opt"> (optional)</span>}</>
}
function Err({ f, name }: { f: Form; name: string }) {
  return f.errors[name] ? <p className="cb-err" id={`cb-${name}-err`}>{f.errors[name]}</p> : null
}
const described = (f: Form, name: string, help?: React.ReactNode) =>
  [help ? `cb-${name}-help` : '', f.errors[name] ? `cb-${name}-err` : ''].filter(Boolean).join(' ') || undefined

type Common = { f: Form; name: string; label: React.ReactNode; optional?: boolean; help?: React.ReactNode }

export function Text({ f, name, label, optional, help, type = 'text', ...rest }: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="cb-field">
      <label htmlFor={`cb-${name}`}><Label label={label} optional={optional} /></label>
      {help && <p className="cb-help" id={`cb-${name}-help`}>{help}</p>}
      <input {...rest} id={`cb-${name}`} name={name} type={type} value={s(f, name)} onChange={(e) => f.set(name, e.target.value)}
        aria-required={!optional || undefined} aria-invalid={!!f.errors[name] || undefined} aria-describedby={described(f, name, help)} />
      <Err f={f} name={name} />
    </div>
  )
}
export function Area({ f, name, label, optional, help, ...rest }: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="cb-field">
      <label htmlFor={`cb-${name}`}><Label label={label} optional={optional} /></label>
      {help && <p className="cb-help" id={`cb-${name}-help`}>{help}</p>}
      <textarea {...rest} id={`cb-${name}`} name={name} value={s(f, name)} onChange={(e) => f.set(name, e.target.value)}
        aria-required={!optional || undefined} aria-invalid={!!f.errors[name] || undefined} aria-describedby={described(f, name, help)} />
      <Err f={f} name={name} />
    </div>
  )
}
export function Select({ f, name, label, optional, help, options, placeholder = 'Choose one' }: Common & { options: Opt[]; placeholder?: string }) {
  return (
    <div className="cb-field">
      <label htmlFor={`cb-${name}`}><Label label={label} optional={optional} /></label>
      {help && <p className="cb-help" id={`cb-${name}-help`}>{help}</p>}
      <select id={`cb-${name}`} name={name} value={s(f, name)} onChange={(e) => f.set(name, e.target.value)}
        aria-required={!optional || undefined} aria-invalid={!!f.errors[name] || undefined} aria-describedby={described(f, name, help)}>
        <option value="">{placeholder}</option>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
      <Err f={f} name={name} />
    </div>
  )
}
/** Several may be chosen. */
export function Checks({ f, name, label, optional, help, options, one }: Common & { options: Opt[]; one?: boolean }) {
  const chosen = list(f, name)
  return (
    <fieldset className="cb-field" id={`cb-${name}`} tabIndex={-1} aria-describedby={described(f, name, help)}>
      <legend><Label label={label} optional={optional} /></legend>
      {help && <p className="cb-help" id={`cb-${name}-help`}>{help}</p>}
      <div className={'cb-choices' + (one ? ' one' : '')}>
        {options.map(([value, text]) => (
          <label key={value} className="cb-check">
            <input type="checkbox" name={name} value={value} checked={chosen.includes(value)}
              onChange={(e) => f.set(name, e.target.checked ? [...chosen, value] : chosen.filter((x) => x !== value))} />
            <span>{text}</span>
          </label>
        ))}
      </div>
      <Err f={f} name={name} />
    </fieldset>
  )
}
/** Exactly one may be chosen. */
export function Radios({ f, name, label, optional, help, options, one }: Common & { options: Opt[]; one?: boolean }) {
  return (
    <fieldset className="cb-field" id={`cb-${name}`} tabIndex={-1} aria-describedby={described(f, name, help)}>
      <legend><Label label={label} optional={optional} /></legend>
      {help && <p className="cb-help" id={`cb-${name}-help`}>{help}</p>}
      <div className={'cb-choices' + (one ? ' one' : '')}>
        {options.map(([value, text]) => (
          <label key={value} className="cb-check">
            <input type="radio" name={name} value={value} checked={s(f, name) === value} onChange={() => f.set(name, value)} />
            <span>{text}</span>
          </label>
        ))}
      </div>
      <Err f={f} name={name} />
    </fieldset>
  )
}
/** A single yes/no box. Never ticked for the visitor in advance. */
export function Check({ f, name, label, required }: { f: Form; name: string; label: React.ReactNode; required?: boolean }) {
  return (
    <div className="cb-field" style={{ marginTop: 14 }}>
      <label className="cb-check">
        <input id={`cb-${name}`} type="checkbox" name={name} checked={f.v[name] === true} onChange={(e) => f.set(name, e.target.checked)}
          aria-required={required || undefined} aria-invalid={!!f.errors[name] || undefined} aria-describedby={f.errors[name] ? `cb-${name}-err` : undefined} />
        <span>{label}</span>
      </label>
      <Err f={f} name={name} />
    </div>
  )
}
/** A decoy field people never see. Automated form-fillers tend to complete it, which lets the server set those aside. */
export function Decoy({ f }: { f: Form }) {
  return (
    <div className="cb-hp" aria-hidden="true">
      <label htmlFor="cb-company_website">Leave this field empty</label>
      <input id="cb-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={s(f, 'company_website')} onChange={(e) => f.set('company_website', e.target.value)} />
    </div>
  )
}
/** Lists what needs attention, with a link to each field, and takes focus so it is announced. */
export function ErrorSummary({ errors, labels, innerRef }: { errors: Errors; labels: Record<string, string>; innerRef: React.RefObject<HTMLDivElement> }) {
  const keys = Object.keys(errors)
  if (!keys.length) return null
  return (
    <div className="cb-notice error" role="alert" tabIndex={-1} ref={innerRef}>
      <h2>{errors.form ? 'We could not accept this yet' : keys.length === 1 ? 'One thing needs your attention' : `${keys.length} things need your attention`}</h2>
      {errors.form ? <p style={{ marginTop: 6 }}>{errors.form}</p> : (
        <ul>{keys.map((k) => <li key={k}><a href={`#cb-${k}`} onClick={(e) => { e.preventDefault(); document.getElementById(`cb-${k}`)?.focus() }}>{labels[k] ?? k}</a>: {errors[k]}</li>)}</ul>
      )}
    </div>
  )
}
export const newKey = (): string => {
  try { return crypto.randomUUID() } catch { /* older browsers */ }
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
}
