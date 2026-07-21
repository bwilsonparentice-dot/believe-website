// Believe Studio — the sound of the house.
// All ambience is synthesized live via Web Audio — no audio files.
// A Tuscan-dawn bed (breeze, the occasional distant bird, silence-dominant),
// and a single dreamlike passage as the door is drawn open.
// Ported faithfully from the design source of truth.

export class HouseAudio {
  private ac: (AudioContext & { close(): Promise<void> }) | null = null
  private ambient: { master: GainNode } | null = null
  private breezeBed: { noise: AudioBufferSourceNode; lfo: OscillatorNode; g: GainNode } | null = null
  private doorPlayed = false
  private leafPlayed = false
  private birdTimer: ReturnType<typeof setTimeout> | null = null
  private rustleTimer: ReturnType<typeof setTimeout> | null = null

  get hasAmbient() { return !!this.ambient }
  get leafHasPlayed() { return this.leafPlayed }
  markLeafPlayed() { this.leafPlayed = true }

  resume() {
    try {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined
      if (!Ctx) return
      if (!this.ac) this.ac = new Ctx() as any
      if (this.ac && this.ac.state === 'suspended') this.ac.resume()
    } catch { /* ignore */ }
  }

  startBreezeBed() {
    try {
      const ac = this.ac; if (!ac || this.breezeBed) return
      const dur = 3, size = Math.ceil(ac.sampleRate * dur)
      const buf = ac.createBuffer(1, size, ac.sampleRate)
      const d = buf.getChannelData(0)
      let last = 0
      for (let i = 0; i < size; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2 }
      const noise = ac.createBufferSource(); noise.buffer = buf; noise.loop = true
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 0.5
      const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.4
      const g = ac.createGain(); g.gain.value = 0.0001
      const t = ac.currentTime
      g.gain.linearRampToValueAtTime(0.03, t + 3)
      const lfo = ac.createOscillator(); lfo.frequency.value = 0.06
      const lfoG = ac.createGain(); lfoG.gain.value = 0.016
      lfo.connect(lfoG); lfoG.connect(g.gain)
      noise.connect(lp); lp.connect(bp); bp.connect(g); g.connect(ac.destination)
      noise.start(); lfo.start()
      this.breezeBed = { noise, lfo, g }
    } catch { /* ignore */ }
  }

  startAmbient() {
    try {
      const ac = this.ac; if (!ac || this.ambient) return
      const now = ac.currentTime
      // hand off the opening breeze bed to the room ambience, seamlessly
      if (this.breezeBed) {
        try {
          this.breezeBed.g.gain.cancelScheduledValues(now)
          this.breezeBed.g.gain.setValueAtTime(this.breezeBed.g.gain.value, now)
          this.breezeBed.g.gain.linearRampToValueAtTime(0.0001, now + 3)
          this.breezeBed.noise.stop(now + 3.2); this.breezeBed.lfo.stop(now + 3.2)
        } catch { /* ignore */ }
        this.breezeBed = null
      }
      const master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination)
      const size = 2 * ac.sampleRate
      const buf = ac.createBuffer(1, size, ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < size; i++) d[i] = (Math.random() * 2 - 1) * 0.5
      const noise = ac.createBufferSource(); noise.buffer = buf; noise.loop = true
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 470; lp.Q.value = 0.5
      const ng = ac.createGain(); ng.gain.value = 0.055
      noise.connect(lp); lp.connect(ng); ng.connect(master); noise.start()
      const lfo = ac.createOscillator(); lfo.frequency.value = 0.035
      const lg = ac.createGain(); lg.gain.value = 0.035; lfo.connect(lg); lg.connect(ng.gain); lfo.start()
      master.gain.linearRampToValueAtTime(0.6, now + 4.5)
      this.ambient = { master }
      const birdLoop = () => { if (!this.ambient) return; this.chirp(); this.birdTimer = setTimeout(birdLoop, 24000 + Math.random() * 34000) }
      this.birdTimer = setTimeout(birdLoop, 9000 + Math.random() * 6000)
      const rustleLoop = () => { if (!this.ambient) return; this.rustle(); this.rustleTimer = setTimeout(rustleLoop, 13000 + Math.random() * 17000) }
      this.rustleTimer = setTimeout(rustleLoop, 6000 + Math.random() * 5000)
    } catch { /* ignore */ }
  }

  private chirp() {
    try {
      const ac = this.ac; if (!ac || !this.ambient) return
      const t = ac.currentTime, type = Math.random()
      const note = (f0: number, f1: number, f2: number, start: number, dur: number, peak: number) => {
        const o = ac.createOscillator(); o.type = 'sine'
        o.frequency.setValueAtTime(f0, start)
        o.frequency.linearRampToValueAtTime(f1, start + dur * 0.4)
        o.frequency.linearRampToValueAtTime(f2, start + dur)
        const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = (f0 + f1) / 2; bp.Q.value = 6
        const g = ac.createGain(); g.gain.setValueAtTime(0, start)
        g.gain.linearRampToValueAtTime(peak, start + Math.min(0.035, dur * 0.25))
        g.gain.exponentialRampToValueAtTime(0.0004, start + dur)
        const trem = ac.createOscillator(); trem.type = 'sine'; trem.frequency.value = 26 + Math.random() * 12
        const tg = ac.createGain(); tg.gain.value = peak * 0.32
        trem.connect(tg); tg.connect(g.gain); trem.start(start); trem.stop(start + dur)
        o.connect(g); g.connect(bp); bp.connect(this.ambient!.master)
        o.start(start); o.stop(start + dur + 0.05)
      }
      if (type < 0.6) {
        const f = 850 + Math.random() * 320
        note(f, f * 1.16, f * 0.9, t, 0.42, 0.02)
      } else {
        const f = 470 + Math.random() * 70
        note(f, f * 1.12, f * 1.0, t, 0.7, 0.018)
        if (Math.random() < 0.6) note(f * 0.98, f * 1.05, f * 0.9, t + 0.9, 0.6, 0.014)
      }
    } catch { /* ignore */ }
  }

  leafRustle() {
    try {
      const ac = this.ac; if (!ac) return
      const t = ac.currentTime
      for (let k = 0; k < 3; k++) {
        const dur = 1.2 + Math.random() * 1.1
        const size = Math.ceil(ac.sampleRate * dur)
        const buf = ac.createBuffer(1, size, ac.sampleRate)
        const d = buf.getChannelData(0)
        for (let i = 0; i < size; i++) d[i] = Math.random() * 2 - 1
        const src = ac.createBufferSource(); src.buffer = buf
        const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2000 + Math.random() * 1800; bp.Q.value = 0.55
        const g = ac.createGain(); const t0 = t + k * 0.4
        g.gain.setValueAtTime(0, t0)
        g.gain.linearRampToValueAtTime(0.018 + Math.random() * 0.012, t0 + dur * 0.4)
        g.gain.exponentialRampToValueAtTime(0.0004, t0 + dur)
        src.connect(bp); bp.connect(g); g.connect(ac.destination)
        src.start(t0); src.stop(t0 + dur + 0.05)
      }
    } catch { /* ignore */ }
  }

  private rustle() {
    try {
      const ac = this.ac; if (!ac || !this.ambient) return
      const t = ac.currentTime, dur = 0.5 + Math.random() * 0.7
      const size = Math.ceil(ac.sampleRate * dur)
      const buf = ac.createBuffer(1, size, ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < size; i++) d[i] = Math.random() * 2 - 1
      const src = ac.createBufferSource(); src.buffer = buf
      const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2600 + Math.random() * 1400; bp.Q.value = 0.7
      const g = ac.createGain(); g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.014 + Math.random() * 0.01, t + dur * 0.3)
      g.gain.exponentialRampToValueAtTime(0.0004, t + dur)
      src.connect(bp); bp.connect(g); g.connect(this.ambient.master)
      src.start(t); src.stop(t + dur + 0.05)
    } catch { /* ignore */ }
  }

  doorOpen() {
    try {
      if (this.doorPlayed) return
      this.doorPlayed = true
      const ac = this.ac; if (!ac) return
      const t = ac.currentTime
      const wet = ac.createGain(); wet.gain.value = 0.34
      const delay = ac.createDelay(1.5); delay.delayTime.value = 0.38
      const fb = ac.createGain(); fb.gain.value = 0.46
      const damp = ac.createBiquadFilter(); damp.type = 'lowpass'; damp.frequency.value = 2600
      delay.connect(damp); damp.connect(fb); fb.connect(delay)
      const air = ac.createGain(); air.gain.value = 1
      air.connect(delay); delay.connect(wet); wet.connect(ac.destination)

      const pad = ac.createGain()
      const padLp = ac.createBiquadFilter(); padLp.type = 'lowpass'
      padLp.frequency.setValueAtTime(500, t); padLp.frequency.linearRampToValueAtTime(1600, t + 5); padLp.Q.value = 0.4
      const padGain = ac.createGain()
      padGain.gain.setValueAtTime(0.0001, t + 0.1)
      padGain.gain.linearRampToValueAtTime(0.05, t + 2.4)
      padGain.gain.linearRampToValueAtTime(0.04, t + 8)
      padGain.gain.linearRampToValueAtTime(0.0001, t + 13)
      ;[73.42, 110.0, 146.83, 185.0, 220.0, 329.63].forEach((f, i) => {
        const o = ac.createOscillator(); o.type = i < 2 ? 'sine' : 'triangle'
        o.frequency.value = f; o.detune.value = i % 2 ? 5 : -5
        const vg = ac.createGain(); vg.gain.value = (i < 2 ? 0.5 : 0.32) / 6
        const lfo = ac.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.05 + i * 0.014
        const lg = ac.createGain(); lg.gain.value = vg.gain.value * 0.45
        lfo.connect(lg); lg.connect(vg.gain); lfo.start(t); lfo.stop(t + 13.2)
        o.connect(vg); vg.connect(pad); o.start(t + 0.1 + i * 0.08); o.stop(t + 13.2)
      })
      pad.connect(padLp); padLp.connect(padGain); padGain.connect(ac.destination); padGain.connect(air)

      const melody = [587.33, 880.0, 1174.66, 987.77, 739.99, 1108.73, 880.0, 1318.51]
      const bell = (freq: number, when: number, vel: number) => {
        const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = freq
        const o2 = ac.createOscillator(); o2.type = 'sine'; o2.frequency.value = freq * 2.01
        const g = ac.createGain(); g.gain.setValueAtTime(0.0001, when)
        g.gain.exponentialRampToValueAtTime(vel, when + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0004, when + 2.6)
        const g2 = ac.createGain(); g2.gain.value = 0.3; o2.connect(g2); g2.connect(g)
        o.connect(g); g.connect(ac.destination); g.connect(air)
        o.start(when); o.stop(when + 2.7); o2.start(when); o2.stop(when + 2.7)
      }
      melody.forEach((f, i) => bell(f, t + 1.2 + i * 0.85, 0.05 - i * 0.002))
    } catch { /* ignore */ }
  }

  fadeAmbient(sec: number) {
    try {
      if (this.birdTimer) { clearTimeout(this.birdTimer); this.birdTimer = null }
      if (this.rustleTimer) { clearTimeout(this.rustleTimer); this.rustleTimer = null }
      if (this.ambient && this.ac) {
        const m = this.ambient.master, t = this.ac.currentTime
        m.gain.cancelScheduledValues(t); m.gain.setValueAtTime(m.gain.value, t)
        m.gain.linearRampToValueAtTime(0, t + (sec || 2))
      }
      this.ambient = null
    } catch { /* ignore */ }
  }

  dispose() {
    try {
      if (this.birdTimer) clearTimeout(this.birdTimer)
      if (this.rustleTimer) clearTimeout(this.rustleTimer)
      if (this.breezeBed) { this.breezeBed.noise.stop(); this.breezeBed.lfo.stop(); this.breezeBed = null }
      if (this.ac) this.ac.close()
    } catch { /* ignore */ }
  }
}
