# AI video generation prompts (optional live-action layer)

The rendered film is complete without generated footage: people appear as back-lit silhouettes.
If you want photographic plates, generate them with these prompts (Veo, Sora, Runway Gen-4, Kling,
Luma), **review every frame**, then drop the clips into `public/footage/` and register them in
`src/data/footage.ts`. Each clip appears inside its arch with the same grade and framing.

**Global style suffix (append to every prompt):**
> cinematic 4K, 24 fps, shot on a full-frame cinema camera, 35–50 mm lens, shallow depth of field, soft volumetric morning light through an Islamic geometric mashrabiya window, warm golden highlights, deep emerald-green shadows, high dynamic range, natural skin texture, modest clothing, calm and dignified mood, slow controlled camera movement, no text, no logos, no watermarks

**Global negative prompt:**
> readable text, Arabic or Quranic script on screen, fake calligraphy, subtitles, logos, distorted hands, extra fingers, warped faces, plastic skin, exaggerated expressions, glitching screens, readable phone or laptop UI, immodest clothing, music instruments, crowds, flashing lights, cartoon style

**Hard rules for review:** reject any clip that shows legible (or pseudo-legible) Quranic text, an open mushaf with mirrored or garbled script, or a mushaf placed on the floor or handled disrespectfully. Prefer angles where pages face away from camera or are fully defocused.

---

| Slot (`footage.ts`) | Scene | Prompt |
|---|---|---|
| — (plate for S01/S08) | S01, S08 | Dark traditional room at dawn; first sunlight streams through a carved wooden mashrabiya window, casting an eight-pointed-star lattice shadow on a plaster wall; a closed green leather Quran with gold-tooled cover rests upright on a carved wooden lectern; floating dust in the light beams; very slow dolly-in toward the book. |
| `womanStudying` | S02 | A woman in a modest hijab sits at a wooden desk at home, studying a book placed on a wooden rehal (X-shaped stand); back-lit by a sunlit lattice window; seen from across the desk at eye level; she turns a page gently; slow push-in. |
| `manReviewing` | S02 | A bearded man in a white kufi reviews his study books at a wooden desk, stack of bound books beside him, sunlit lattice window behind; calm focus; slow push-in. |
| `childWithParent` | S02, S06 | A mother in hijab sits beside her young son at a low desk, pointing gently to a lesson book on a wooden rehal; warm window light; tender, encouraging mood; medium shot; slow lateral move. |
| `tabletLesson` | S04 | A young woman in hijab follows an online lesson on a tablet on a stand, wearing small earphones; screen faces away from camera; soft screen glow on her face; warm window light behind; slow push-in. |
| `memorization` | S04 | A young man holds a closed small Quran against his chest, eyes gently closed as he recites from memory under his breath; lattice window light; extreme shallow depth of field; slow push-in. |
| `youngAdultNotes` | S04, S06 | A young adult reviews handwritten study notes in a notebook at a desk; notebook angled away; highlighter in hand; back-lit by a sunlit window; macro insert of pen on paper (writing illegible, out of focus). |
| `olderWomanReading` | S06 | An older woman in a soft-coloured hijab and reading glasses reads from a book held in both hands, seated by a sunlit lattice window; serene, dignified; medium close-up; slow push-in. |
| `adultOnline` | S06 | A man in his forties attends an online class on a laptop at home, laptop back to camera, attentive posture, notebook beside him; window light behind; slow lateral track. |
| — (insert, optional) | S07 | Close-up of hands holding a smartphone in a warmly lit room; screen out of focus and facing slightly away; thumb taps once; bokeh of gold window light. |
