"""Writes public/assets/grain.png: a tileable monochrome film-grain texture."""
import numpy as np
from PIL import Image

rng = np.random.default_rng(7)
size = 384
noise = rng.normal(0.5, 0.18, (size, size)).clip(0, 1)
rgba = np.zeros((size, size, 4), dtype=np.uint8)
rgba[..., 0:3] = (noise[..., None] * 255).astype(np.uint8)
rgba[..., 3] = 255
Image.fromarray(rgba, "RGBA").save("public/assets/grain.png", optimize=True)
print("grain.png written")
