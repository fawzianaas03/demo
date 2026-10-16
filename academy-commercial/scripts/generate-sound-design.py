"""
Procedural, instrument-free sound design for the commercial.

Writes two 48 kHz stereo stems aligned to src/data/timeline.json:
  public/audio/ambience.wav  – air, sub-rumble and scene "breaths"
  public/audio/sfx.wav       – whooshes, page turns, shimmer, risers, soft impacts

No musical instruments, melodies or voices are used: every sound is shaped noise
or a short, unpitched-feeling transient. Re-run after editing the "sfx" cues.

Usage:  python3 scripts/generate-sound-design.py
"""
import json
import os
import wave

import numpy as np
from scipy import signal

SR = 48000
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIMELINE = json.load(open(os.path.join(ROOT, "src/data/timeline.json"), encoding="utf-8"))
DUR = TIMELINE["durationInSeconds"]
N = int(DUR * SR)
rng = np.random.default_rng(1447)


def pink(n):
    """Voss-McCartney-ish pink noise via spectral shaping."""
    white = rng.standard_normal(n)
    spec = np.fft.rfft(white)
    f = np.fft.rfftfreq(n, 1 / SR)
    f[0] = f[1]
    spec /= np.sqrt(f)
    out = np.fft.irfft(spec, n)
    return out / np.max(np.abs(out))


def brown(n):
    out = np.cumsum(rng.standard_normal(n))
    out = signal.sosfilt(signal.butter(2, 20, "hp", fs=SR, output="sos"), out)
    return out / np.max(np.abs(out))


def filt(x, kind, freq, order=2):
    return signal.sosfilt(signal.butter(order, freq, kind, fs=SR, output="sos"), x)


def svf_sweep(x, f_start, f_peak, f_end, q=1.2, mode="bp"):
    """State-variable filter whose cutoff glides start → peak → end (log)."""
    n = len(x)
    t = np.linspace(0, 1, n)
    rise = np.minimum(t / 0.55, 1)
    fall = np.clip((t - 0.55) / 0.45, 0, 1)
    logf = np.where(t < 0.55, np.log(f_start) + (np.log(f_peak) - np.log(f_start)) * rise,
                    np.log(f_peak) + (np.log(f_end) - np.log(f_peak)) * fall)
    fc = np.exp(logf)
    g = 2 * np.sin(np.pi * np.minimum(fc, SR / 6) / SR)
    damp = 1 / q
    low = band = 0.0
    out = np.empty(n)
    for i in range(n):
        high = x[i] - low - damp * band
        band += g[i] * high
        low += g[i] * band
        out[i] = band if mode == "bp" else (high if mode == "hp" else low)
    return out


def env(n, attack, release, curve=2.0):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-3), 0, 1) ** curve
    r = np.clip((n / SR - t) / max(release, 1e-3), 0, 1) ** curve
    return a * r


def pan_sweep(mono, start=0.9, end=-0.9):
    """Equal-power pan; positive = right. Default glides right → left (RTL)."""
    p = np.linspace(start, end, len(mono))
    ang = (p + 1) * np.pi / 4
    return np.stack([mono * np.cos(ang), mono * np.sin(ang)], axis=1)


def place(buf, clip, at):
    i = int(at * SR)
    j = min(len(buf), i + len(clip))
    if j > i:
        buf[i:j] += clip[: j - i]


def stereoize(mono, width=0.25):
    d = int(0.011 * SR)
    left = mono
    right = np.concatenate([np.zeros(d), mono[:-d]])
    return np.stack([left * (1 - width / 2) + right * width / 2, right * (1 - width / 2) + left * width / 2], axis=1)


def reverb(stereo, seconds=2.2, wet=0.28):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    out = np.empty_like(stereo)
    for ch in range(2):
        ir = rng.standard_normal(n) * np.exp(-t * 6.9 / seconds)
        ir = filt(ir, "lp", 5000)
        ir /= np.sqrt(np.sum(ir ** 2))
        out[:, ch] = signal.fftconvolve(stereo[:, ch], ir)[: len(stereo)]
    return stereo * (1 - wet) + out * wet


# ---------------------------------------------------------------- ambience
def ambience():
    air = np.stack([filt(filt(pink(N), "lp", 1400), "hp", 90) for _ in range(2)], axis=1)
    t = np.arange(N) / SR
    lfo = 0.75 + 0.25 * np.sin(2 * np.pi * 0.045 * t + 1.3)
    air *= lfo[:, None] * 0.13

    rumble = filt(filt(brown(N), "lp", 110, order=4), "hp", 30, order=2)
    rumble = np.stack([rumble, rumble], axis=1) * 0.22

    # Scene intensity curve: darker at the opening, open at reveals, warm at the close.
    keys = [(0, 0.15), (3, 0.6), (10, 0.75), (20, 0.95), (31, 0.8), (44, 0.85), (57, 0.8),
            (68, 0.8), (74.6, 1.0), (79, 0.9), (85, 1.0), (90.4, 0.9), (DUR, 0.0)]
    curve = np.interp(t, [k[0] for k in keys], [k[1] for k in keys])

    # Soft "breath" swells at every scene boundary.
    breaths = np.zeros((N, 2))
    for s in TIMELINE["scenes"][1:]:
        n = int(3.0 * SR)
        b = filt(pink(n), "bp", [300, 2400]) * env(n, 1.6, 1.4) * 0.18
        place(breaths, stereoize(b), s["start"] - 1.6)

    # A high, airy sheen that opens up during the reveal, free and CTA moments.
    sheen = np.stack([filt(pink(N), "hp", 6000) for _ in range(2)], axis=1)
    sheen_curve = np.interp(t, [0, 20, 22, 30, 31, 74, 75, 79, 85, 86, DUR], [0, 0, 1, 0.7, 0, 0, 1, 0.3, 0.3, 1, 0.6])
    sheen *= sheen_curve[:, None] * 0.05

    mix = (air + rumble + sheen) * curve[:, None] + breaths
    return mix


# ---------------------------------------------------------------- sfx
def whoosh(length):
    n = int(length * SR)
    x = rng.standard_normal(n)
    y = svf_sweep(x, 250, 2800, 500, q=1.6) * env(n, length * 0.55, length * 0.45, 1.6)
    return pan_sweep(y * 0.55)


def riser(length):
    n = int(length * SR)
    x = rng.standard_normal(n)
    y = svf_sweep(x, 300, 5000, 7000, q=2.0) * (np.linspace(0, 1, n) ** 2.4) * env(n, 0.05, 0.06, 1)
    return stereoize(y * 0.5, 0.6)


def impact(length):
    n = int(length * SR)
    t = np.arange(n) / SR
    freq = 38 + 22 * np.exp(-t * 6)
    thump = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t * 3.2)
    tail = filt(rng.standard_normal(n), "lp", 900) * np.exp(-t * 1.6) * 0.25
    y = (thump * 0.8 + tail) * env(n, 0.006, 0.4, 1)
    return stereoize(y * 0.7, 0.5)


def shimmer(length):
    n = int(length * SR)
    out = np.zeros((n, 2))
    hiss = filt(rng.standard_normal(n), "hp", 7000) * env(n, length * 0.4, length * 0.5) * 0.05
    out += stereoize(hiss, 0.8)
    count = int(length * 9)
    for _ in range(count):
        at = rng.uniform(0, length * 0.85)
        g_len = rng.uniform(0.08, 0.28)
        gn = int(g_len * SR)
        gt = np.arange(gn) / SR
        f = rng.uniform(4200, 9500)
        grain = np.sin(2 * np.pi * f * gt + rng.uniform(0, 6.28)) * np.exp(-gt * rng.uniform(18, 40))
        grain *= rng.uniform(0.015, 0.05) * np.sin(np.pi * min(1, at / length + 0.1))
        p = rng.uniform(-1, 1)
        ang = (p + 1) * np.pi / 4
        place(out, np.stack([grain * np.cos(ang), grain * np.sin(ang)], axis=1), at)
    return out


def pageturn(length):
    n = int(length * SR)
    paper = filt(rng.standard_normal(n), "bp", [1400, 7000])
    crinkle = np.abs(filt(rng.standard_normal(n), "lp", 35)) ** 1.5
    crinkle /= crinkle.max()
    y = paper * crinkle * env(n, length * 0.35, length * 0.5, 1.3) * 0.35
    flap_n = int(0.12 * SR)
    flap = filt(rng.standard_normal(flap_n), "lp", 260) * env(flap_n, 0.01, 0.1) * 0.5
    place_y = np.zeros(n)
    place_y[int(n * 0.72): int(n * 0.72) + flap_n] += flap[: n - int(n * 0.72)]
    return pan_sweep(y + place_y, 0.5, -0.5)


def tick(length):
    n = int(length * SR)
    t = np.arange(n) / SR
    click = filt(rng.standard_normal(n), "bp", [2500, 6000]) * np.exp(-t * 220) * 0.25
    glint = np.sin(2 * np.pi * 3600 * t) * np.exp(-t * 26) * 0.035
    return stereoize(click + glint, 0.4)


def swell(length):
    n = int(length * SR)
    x = pink(n)
    y = svf_sweep(x, 120, 1800, 400, q=0.8, mode="lp") * env(n, length * 0.6, length * 0.4, 1.8)
    return stereoize(y * 0.4, 0.7)


MAKERS = {"whoosh": whoosh, "riser": riser, "impact": impact, "shimmer": shimmer,
          "pageturn": pageturn, "tick": tick, "swell": swell}


def sfx():
    buf = np.zeros((N, 2))
    for cue in TIMELINE["sfx"]:
        place(buf, MAKERS[cue["type"]](cue["length"]), cue["at"])
    return reverb(buf)


def write(path, x):
    pcm = np.clip(x, -1, 1)
    pcm = (pcm * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("wrote", os.path.relpath(path, ROOT))


if __name__ == "__main__":
    out = os.path.join(ROOT, "public/audio")
    os.makedirs(out, exist_ok=True)
    amb = ambience()
    fx = sfx()
    # Both stems share one gain so their balance survives; the sum peaks at -3 dBFS.
    fade = np.ones(N)
    fade[-int(1.2 * SR):] = np.linspace(1, 0, int(1.2 * SR))
    amb *= fade[:, None]
    fx *= fade[:, None]
    scale = (10 ** (-3 / 20)) / np.max(np.abs(amb + fx))
    write(os.path.join(out, "ambience.wav"), amb * scale)
    write(os.path.join(out, "sfx.wav"), fx * scale)
