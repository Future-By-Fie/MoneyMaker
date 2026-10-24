import { useMemo, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, CalendarDays, Check, ChevronRight, CircleHelp, Clock3, CreditCard, Flame, Goal, House, Plus, RefreshCw, ShieldCheck, Sparkles, Wallet } from 'lucide-react'

type Tab = 'today' | 'goal' | 'check'
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export default function App() {
  const [tab, setTab] = useState<Tab>('today')
  const [balance, setBalance] = useState('640')
  const [bills, setBills] = useState('120')
  const [buffer, setBuffer] = useState('100')
  const [reserved, setReserved] = useState('150')
  const [days, setDays] = useState('15')
  const [goalName, setGoalName] = useState('Weekend escape')
  const [goalTarget, setGoalTarget] = useState('350')
  const [goalSaved, setGoalSaved] = useState('150')
  const [checkedAt, setCheckedAt] = useState(new Date())
  const [showSettings, setShowSettings] = useState(false)

  const calc = useMemo(() => {
    const b = Math.max(0, Number(balance) || 0)
    const obligations = Math.max(0, Number(bills) || 0)
    const safety = Math.max(0, Number(buffer) || 0)
    const goal = Math.max(0, Number(reserved) || 0)
    const d = Math.max(0, Number(days) || 0)
    const available = b - obligations - safety - goal
    return { available, daily: d > 0 ? Math.max(0, available) / d : 0, shortfall: Math.max(0, -available), days: d }
  }, [balance, bills, buffer, reserved, days])

  const checkedLabel = () => {
    const age = Math.floor((Date.now() - checkedAt.getTime()) / 86400000)
    return age === 0 ? 'Just checked' : age === 1 ? 'Checked yesterday' : `Checked ${age} days ago`
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setTab('today') }}>
          <span className="brand-mark"><Wallet size={19} strokeWidth={2.5} /></span>
          <span>MoneyMaker<span className="tm">™</span></span>
        </a>
        <button className="demo-pill" onClick={() => setShowSettings(!showSettings)}><span className="demo-dot" /> DEMO MODE <ChevronRight size={13}/></button>
      </header>

      <main>
        <div className="eyebrow"><Sparkles size={14} /> YOUR MONEY, YOUR MOVE</div>
        <section className="hero">
          <div className="hero-copy">
            <p className="muted-label">{tab === 'today' ? 'YOUR SPENDABLE TODAY' : tab === 'goal' ? 'YOUR NEXT BIG THING' : 'A QUICK MONEY CHECK'}</p>
            {tab === 'today' ? <>
              <h1>{calc.shortfall > 0 ? money(calc.shortfall) : money(calc.daily)}<span className="hero-period">{calc.shortfall > 0 ? ' shortfall' : '/ day'}</span></h1>
              <p className="hero-sub">{calc.shortfall > 0 ? 'Your plans need more money than your current balance covers.' : 'Spend today. Still feel good tomorrow.'}</p>
            </> : tab === 'goal' ? <>
              <h1 className="goal-hero">{goalName || 'Your next big thing'}<span className="hero-period"> ✨</span></h1>
              <p className="hero-sub">You’re building towards something. That’s the point.</p>
            </> : <>
              <h1 className="goal-hero">Know your number.</h1>
              <p className="hero-sub">A quick update keeps your daily picture useful.</p>
            </>}
          </div>
          <div className="hero-icon"><Wallet size={31}/><span className="spark">✦</span></div>
          <div className="hero-footer"><span><span className="live-dot" /> {checkedLabel()}</span><button className="text-button" onClick={() => setTab('check')}><RefreshCw size={13}/> Update balance</button></div>
        </section>

        {tab === 'today' && <>
          <section className="section-heading"><div><h2>The full picture</h2><p>Money with a plan feels different.</p></div><span className="section-icon"><ShieldCheck size={18}/></span></section>
          <section className="breakdown-card">
            <div className="breakdown-row"><span className="row-icon income"><ArrowDownLeft size={17}/></span><span className="row-name">Current balance</span><strong>{money(Number(balance)||0)}</strong></div>
            <div className="breakdown-row"><span className="row-icon bills"><CalendarDays size={17}/></span><span className="row-name">Upcoming bills</span><strong className="subtract">− {money(Number(bills)||0)}</strong></div>
            <div className="breakdown-row"><span className="row-icon safety"><ShieldCheck size={17}/></span><span className="row-name">Safety buffer</span><strong className="subtract">− {money(Number(buffer)||0)}</strong></div>
            <div className="breakdown-row"><span className="row-icon goal"><Goal size={17}/></span><span className="row-name">Saved for your goal</span><strong className="subtract">− {money(Number(reserved)||0)}</strong></div>
            <div className="breakdown-total"><span>Money you can plan with</span><strong>{money(Math.max(0,calc.available))}</strong></div>
            {calc.shortfall > 0 && <p className="warning-note">You’re {money(calc.shortfall)} over your current plan. Try adjusting your buffer or goal reservation.</p>}
            <p className="calculation-note">Split across <strong>{calc.days || '—'} days</strong> until payday. This is a planning estimate, not a bank balance.</p>
          </section>
          <section className="goal-card">
            <div className="goal-top"><span className="goal-emoji">🌴</span><span className="goal-tag">YOUR GOAL</span><button className="icon-button" onClick={() => setTab('goal')} aria-label="Edit goal"><ChevronRight size={18}/></button></div>
            <div className="goal-title">{goalName}</div>
            <div className="goal-amounts"><strong>{money(Number(goalSaved)||0)}</strong><span>of {money(Number(goalTarget)||0)}</span><span className="goal-percent">{Number(goalTarget)>0 ? Math.min(100,Math.round((Number(goalSaved)||0)/Number(goalTarget)*100)) : 0}%</span></div>
            <div className="progress-track"><div className="progress-fill" style={{width: `${Number(goalTarget)>0 ? Math.min(100,(Number(goalSaved)||0)/Number(goalTarget)*100) : 0}%`}}/></div>
            <button className="goal-link" onClick={() => setTab('goal')}>Keep your goal in sight <ChevronRight size={15}/></button>
          </section>
          <section className="tip-card"><span className="tip-icon"><Flame size={18}/></span><div><strong>Little choices. Bigger plans.</strong><p>Your daily number makes room for today without forgetting what matters next.</p></div></section>
        </>}

        {tab === 'goal' && <section className="editor-card">
          <div className="editor-heading"><span className="section-icon"><Goal size={18}/></span><div><h2>Your goal, your rules</h2><p>Virtual savings — no money moves.</p></div></div>
          <label>What are you saving for?<input value={goalName} onChange={e=>setGoalName(e.target.value)} placeholder="e.g. Weekend escape"/></label>
          <div className="field-grid"><label>Goal amount ($)<input type="number" min="0" value={goalTarget} onChange={e=>setGoalTarget(e.target.value)}/></label><label>Already set aside ($)<input type="number" min="0" value={goalSaved} onChange={e=>{setGoalSaved(e.target.value);setReserved(e.target.value)}}/></label></div>
          <div className="goal-preview"><span>Progress</span><strong>{Number(goalTarget)>0?Math.min(100,Math.round((Number(goalSaved)||0)/Number(goalTarget)*100)):0}%</strong><div className="progress-track"><div className="progress-fill" style={{width:`${Number(goalTarget)>0?Math.min(100,(Number(goalSaved)||0)/Number(goalTarget)*100):0}%`}}/></div></div>
          <button className="primary-button" onClick={()=>setTab('today')}><Check size={17}/> Back to my day</button>
        </section>}

        {tab === 'check' && <section className="editor-card">
          <div className="editor-heading"><span className="section-icon"><RefreshCw size={18}/></span><div><h2>Money Check</h2><p>Update the numbers. Keep it simple.</p></div></div>
          <div className="field-grid"><label>Current balance ($)<input type="number" min="0" value={balance} onChange={e=>setBalance(e.target.value)}/></label><label>Days until payday<input type="number" min="0" value={days} onChange={e=>setDays(e.target.value)}/></label><label>Unpaid bills ($)<input type="number" min="0" value={bills} onChange={e=>setBills(e.target.value)}/></label><label>Safety buffer ($)<input type="number" min="0" value={buffer} onChange={e=>setBuffer(e.target.value)}/></label><label>Goal reservation ($)<input type="number" min="0" value={reserved} onChange={e=>setReserved(e.target.value)}/></label></div>
          <div className="privacy-note"><ShieldCheck size={17}/><span>Your numbers stay in this demo session. Nothing is connected to your bank.</span></div>
          <button className="primary-button" onClick={()=>{setCheckedAt(new Date());setTab('today')}}><Check size={17}/> Save my check</button>
        </section>}

        {showSettings && <div className="demo-note"><CircleHelp size={16}/><span><strong>Demo data — not connected to a bank.</strong> Values are examples and changes are only held in this browser session.</span></div>}
        <div className="bottom-note"><ShieldCheck size={14}/> No bank connection. No judgement. Just clarity.</div>
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button className={tab==='today'?'active':''} onClick={()=>setTab('today')}><House size={19}/><span>Today</span></button>
        <button className={tab==='goal'?'active':''} onClick={()=>setTab('goal')}><Goal size={19}/><span>My Goal</span></button>
        <button className={tab==='check'?'active':''} onClick={()=>setTab('check')}><RefreshCw size={19}/><span>Money Check</span></button>
      </nav>
      <footer><span>MoneyMaker™</span><span>WHEN YOUR MONEY TALKS, EVERYONE LISTENS.</span></footer>
    </div>
  )
}