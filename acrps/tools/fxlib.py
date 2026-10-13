import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
rng = np.random.default_rng(11)

def lp(x, f): return sosfilt(butter(2, f, btype='low', fs=SR, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, btype='high', fs=SR, output='sos'), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], btype='band', fs=SR, output='sos'), x)
def T(d): return np.arange(int(SR * d)) / SR

class Buf:
    def __init__(self, total):
        self.N = int(SR * total); self.a = np.zeros((self.N, 2))
    def put(self, sig, at, g=1., pan=0.):
        i = int(round(at * SR))
        if i >= self.N: return
        if i < 0: sig = sig[-i:]; i = 0
        j = min(self.N, i + len(sig))
        self.a[i:j, 0] += sig[:j - i] * g * (1 - pan); self.a[i:j, 1] += sig[:j - i] * g * (1 + pan)

def rv(x, d=2.5, mix=.35):
    ir = lp(rng.standard_normal(int(SR * d)), 3500) * np.exp(-T(d) * 2.2); ir /= np.sqrt((ir ** 2).sum())
    return np.concatenate([x, np.zeros(len(ir) - 1)]) * (1 - mix) + fftconvolve(x, ir) * mix

def braam(d=3.2):
    t = T(d); o = np.zeros(len(t))
    for f in (55, 55.4, 110.3, 82.4, 41.2):
        ph = 2 * np.pi * f * t; o += sum(np.sin(k * ph) / k for k in range(1, 14))
    cut = 160 + 1100 * np.exp(-t * 1.4); y = np.zeros(len(t))
    for k in range(0, len(t), 1200): y[k:k + 1200] = lp(o[k:k + 1200], cut[k])
    sub = np.sin(2 * np.pi * np.cumsum(32 * (1 + .9 * np.exp(-t * 10))) / SR)
    return np.tanh((y * .28 + sub * .9) * np.minimum(1, t / .012) * np.exp(-t * .95) * 1.5) * .6

def drum(d=1.4, f0=62):
    t = T(d); body = np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.4 * np.exp(-t * 25))) / SR) * np.exp(-t * 4.5)
    skin = bp(rng.standard_normal(len(t)), 120, 1800) * np.exp(-t * 28) * .6
    return np.tanh((body + skin) * 1.6) * .7

def whoosh(d=.5, up=True):
    n = int(SR * d); x = rng.standard_normal(n); y = np.zeros(n)
    for k in range(0, n, 480): q = k / n; y[k:k + 480] = lp(x[k:k + 480], 250 + 4500 * (q if up else 1 - q))
    return y * np.sin(np.pi * np.arange(n) / n) ** 2 * .8

def heartbeat(gain_dub=.7, f=55):
    def thump(f, d): t = T(d); return np.sin(2 * np.pi * np.cumsum(f * (1 + .6 * np.exp(-t * 30))) / SR) * np.exp(-t * 14)
    a = thump(f, .35); b = thump(f * .87, .35) * gain_dub; out = np.zeros(int(SR * .6)); out[:len(a)] += a; i = int(SR * .22); out[i:i + len(b)] += b[:len(out) - i]
    return lp(out, 220)

def thunder(d=3.5, far=False):
    t = T(d); n = lp(rng.standard_normal(len(t)), 180 if far else 500)
    env = np.exp(-t * (1.0 if far else 1.6)) * (1 + .6 * np.sin(2 * np.pi * 3.3 * t) * np.exp(-t))
    crack_ = hp(rng.standard_normal(len(t)), 1500) * np.exp(-t * 18) * (0 if far else .7)
    return (n * env * 2.2 + crack_) * np.minimum(1, t / (.25 if far else .01))

def breath(d=1.6):
    t = T(d); return bp(rng.standard_normal(len(t)), 500, 3500) * np.sin(np.pi * t / d) ** 2 * .25

def crack(d=.8):
    t = T(d); y = np.zeros(len(t))
    for k in range(40):
        i = int(rng.uniform(0, .35) * SR); L = int(SR * rng.uniform(.004, .02))
        y[i:i + L] += bp(rng.standard_normal(L), 300, 5000) * rng.uniform(.3, 1)
    return y + lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 7) * .8

def anvil(d=1.6):
    t = T(d); return sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * dc) for f, a, dc in [(523, .5, 3), (1381, .35, 4), (2153, .25, 5), (3247, .15, 7)]) * np.minimum(1, t / .001) + hp(rng.standard_normal(len(t)), 2000) * np.exp(-t * 60) * .5

def riser(d):
    t = T(d); s = sum(np.sin(2 * np.pi * np.cumsum(f * (1 + .5 * (t / d) ** 2)) / SR) for f in (110, 165, 220)) / 3
    return lp(s, 1600) * (t / d) ** 2.4 * .3 + hp(rng.standard_normal(len(t)), 2000) * (t / d) ** 3 * .18

def subdrop(d=2.4, f=30):
    t = T(d); return np.tanh(np.sin(2 * np.pi * np.cumsum(f + 60 * np.exp(-t * 3)) / SR) * np.exp(-t * .9) * 1.7) * .8

def sub22(d=2.6):
    t = T(d); f = 22 + 30 * np.exp(-t * 5)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) + .55 * np.sin(2 * np.pi * np.cumsum(2 * f) / SR)
    return np.tanh(s * np.minimum(1, t / .008) * np.exp(-t * 1.1) * 1.6) * .8

def rumble(d=2.5):
    t = T(d); return lp(rng.standard_normal(len(t)), 90) * np.sin(np.pi * t / d) * 2.2

def tinnitus(d=2.2, f=6200):
    t = T(d); env = np.minimum(1, t / .02) * np.exp(-t * 1.3)
    return (np.sin(2 * np.pi * f * t) * .5 + np.sin(2 * np.pi * (f * 1.5 + 7) * t) * .2) * env * .35

def bell(d=4., f=196):
    t = T(d)
    parts = [(1, 1.0, 1.1), (2.0, .6, 1.6), (2.76, .5, 2.0), (4.07, .35, 3.0), (5.4, .22, 4.0), (.5, .5, .8)]
    s = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * dc) for k, a, dc in parts)
    return s * np.minimum(1, t / .002) * .35

def chime(d=1.8, f=1046):
    t = T(d); s = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * dc) for k, a, dc in [(1, .5, 2.4), (1.5, .35, 3), (2.52, .2, 4.5)])
    return s * np.minimum(1, t / .002) * .8

def snap():
    t = T(.12); return hp(rng.standard_normal(len(t)), 2500) * np.exp(-t * 70) * .9 + np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 60) * .3

def foot(d=.35):
    t = T(d); return np.tanh(lp(rng.standard_normal(len(t)), 260) * np.exp(-t * 16) * 5 + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 18)) * .8

def slap(d=.3):
    t = T(d); return (bp(rng.standard_normal(len(t)), 900, 5200) * np.exp(-t * 30) * 1.2 + lp(rng.standard_normal(len(t)), 300) * np.exp(-t * 20) * .5)

def shutter():
    a = bp(rng.standard_normal(int(SR * .012)), 1800, 6000) * np.exp(-np.arange(int(SR * .012)) / SR * 500)
    out = np.zeros(int(SR * .14)); out[:len(a)] += a * 1.3; j = int(SR * .07); out[j:j + len(a)] += a
    return out

def tick(d=.05):
    t = T(d); return bp(rng.standard_normal(len(t)), 1500, 4500) * np.exp(-t * 130) * .9

def shimmer(d=3., base=1318):
    t = T(d); y = np.zeros(len(t))
    for k, f in enumerate([base, base * 1.25, base * 1.5, base * 2, base * 2.52]):
        y += np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) * (.5 + .5 * np.sin(2 * np.pi * (.7 + .3 * k) * t + k))
    return y / 5 * np.sin(np.pi * t / d) ** 1.5 * .35

def pad(freqs, d, amp=.1, bright=900, vib=4.6):
    """Wide sustained pad (strings / choir-like) built from detuned saws"""
    t = T(d); out = np.zeros((len(t), 2))
    for fi, f in enumerate(freqs):
        for det in (-1.8, 0, 1.6):
            ff = f * (1 + det * .0016)
            ph = 2 * np.pi * np.cumsum(ff * (1 + .0025 * np.sin(2 * np.pi * vib * t + rng.uniform(0, 6)))) / SR
            s = sum(np.sin(k * ph) / k for k in range(1, 9))
            pan = rng.uniform(-.6, .6)
            out[:, 0] += s * (1 - pan); out[:, 1] += s * (1 + pan)
    env = np.minimum(1, t / min(2.0, d * .35)) * np.clip((d - t) / min(2.5, d * .4), 0, 1)
    out[:, 0] = lp(out[:, 0], bright); out[:, 1] = lp(out[:, 1], bright)
    return out * env[:, None] * amp / (len(freqs) * 1.5)

def put_stereo(buf, sig2, at, g=1.):
    i = int(round(at * SR))
    if i >= buf.N: return
    j = min(buf.N, i + len(sig2)); buf.a[i:j] += sig2[:j - i] * g
