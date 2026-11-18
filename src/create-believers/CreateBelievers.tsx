/**
 * Create Believers — a managed service within Believe Studio, at /create-believers.
 *
 *   /create-believers              the public page
 *   /create-believers/host         a host tells us about a gathering
 *   /create-believers/founders     a founder's short inquiry
 *   /create-believers/brands       approved brand profiles, searchable
 *   /create-believers/g/<name>     a guest page for one gathering (unlisted)
 *   /create-believers/recap/<key>  a host's recap, by private link (unlisted)
 *   /create-believers/workspace    Believe's private workspace (sign-in required)
 *
 * How to run and look after it: docs/CREATE_BELIEVERS.md
 */
import React from 'react'
import './cb.css'
import './ws.css'
import { Landing } from './Landing'
import { HostForm } from './HostForm'
import { FounderForm } from './FounderForm'
import { BrandDiscovery } from './BrandDiscovery'
import { GuestPage } from './GuestPage'
import { RecapForm } from './RecapForm'
import { Link, useMeta, useRoute } from './ui'

const Workspace = React.lazy(() => import('./Workspace').then((m) => ({ default: m.Workspace })))

export default function CreateBelievers({ header, footer }: { header?: React.ReactNode; footer?: React.ReactNode }) {
  const { path, query } = useRoute()
  const [first, second] = path.split('/')
  const framed = (page: React.ReactNode) => <div className="cb">{header}{page}{footer}</div>

  if (path === '') return framed(<Landing />)
  if (path === 'host') return framed(<HostForm brandSlug={query.get('brand')} />)
  if (path === 'founders') return framed(<FounderForm />)
  if (path === 'brands') return framed(<BrandDiscovery />)
  if (first === 'g' && second) return <div className="cb"><GuestPage slug={decodeURIComponent(second)} /></div>
  if (first === 'recap' && second) return <div className="cb"><RecapForm token={decodeURIComponent(second)} /></div>
  if (path === 'workspace') {
    return <div className="cb"><React.Suspense fallback={<p style={{ padding: 40 }} role="status">Loading…</p>}><Workspace /></React.Suspense></div>
  }
  return framed(<NotFound />)
}

function NotFound() {
  useMeta('Page not found | Create Believers', 'This page could not be found.', { noindex: true })
  return (
    <main className="cb-page">
      <div className="cb-narrow">
        <h1>We couldn’t find that page.</h1>
        <p className="cb-lead">The address may have changed. You can start again from the beginning.</p>
        <div className="cb-actions" style={{ marginTop: 28 }}><Link to="" className="cb-btn">Go to Create Believers</Link></div>
      </div>
    </main>
  )
}
