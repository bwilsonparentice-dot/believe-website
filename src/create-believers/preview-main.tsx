/**
 * A self-contained review copy of Create Believers (npm run build:cb-preview).
 * It runs without the website around it and without any connection, so it always
 * shows the labelled illustrative examples and saves nothing.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import CreateBelievers from './CreateBelievers'
import { Link, useRoute } from './ui'

const PAGES: [string, string][] = [['', 'Public page'], ['host', 'Host form'], ['founders', 'Founder form'], ['brands', 'Brands'], ['g/illustrative-example', 'Guest page'], ['recap/preview', 'Recap form'], ['workspace', 'Workspace']]

function ReviewBar() {
  const { path } = useRoute()
  return (
    <nav className="cbp-bar" aria-label="Review pages">
      <span>Review copy</span>
      {PAGES.map(([to, label]) => <Link key={to} to={to} aria-current={path === to ? 'page' : undefined}>{label}</Link>)}
    </nav>
  )
}
const header = <header className="cb-mast" style={{ borderBottom: 'none', position: 'absolute', left: 0, right: 0, zIndex: 2 }}><img src="/logo/believe-horizontal.svg" alt="Believe Studio" /></header>
const footer = <footer className="cb-foot">On the website, the Believe Studio header and footer appear here.</footer>

ReactDOM.createRoot(document.getElementById('root')!).render(<><ReviewBar /><CreateBelievers header={header} footer={footer} /></>)
